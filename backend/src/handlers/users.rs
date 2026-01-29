use crate::database::database::Database;
use crate::database::models::{CreateUserRequest, JobQueryParams, PaginationMeta, PaginatedUserResponse, UpdateUserRequest, User, UserResponse};
use crate::error::error::Error;
use crate::response::ApiResponse;
use actix_web::{get, post, web, HttpResponse, patch};
use chrono::Utc;
use surrealdb::sql::Thing;

/// List all users with pagination
#[tracing::instrument(name = "GET /api/users", skip(db))]
#[get("/users")]
pub async fn list_users(
    db: web::Data<Database>,
    query: web::Query<JobQueryParams>,
) -> Result<HttpResponse, Error> {
    let params = query.into_inner();
    let page = params.page.unwrap_or(1);
    let limit = std::cmp::min(params.limit.unwrap_or(10), 100);
    let start = (page - 1) * limit;

    let users: Vec<User> = db
        .db
        .query(format!("SELECT * FROM user LIMIT {} START {}", limit, start))
        .await?
        .take(0)?;

    let count_result: Vec<serde_json::Value> = db
        .db
        .query("SELECT count() as total FROM user")
        .await?
        .take(0)?;
    let total = count_result
        .first()
        .and_then(|v| v.get("total"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);

    let response = PaginatedUserResponse {
        data: users,
        pagination: PaginationMeta {
            page,
            limit,
            total: total as usize,
            total_pages: ((total as f64) / (limit as f64)).ceil() as usize,
        },
    };

    Ok(ApiResponse::ok(response))
}

/// Get a single user by ID
#[tracing::instrument(name = "GET /api/users/{id}", skip(db))]
#[get("/users/{id}")]
pub async fn get_user(
    db: web::Data<Database>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();

    let user: Option<User> = db.db.select(("user", &id)).await?;

    match user {
        Some(u) => {
            let response = UserResponse {
                id: u.id.map(|t| t.id.to_string()).unwrap_or_default(),
                first_name: u.first_name,
                last_name: u.last_name,
                email: u.email,
                created_at: u.created_at,
                updated_at: u.updated_at,
            };
            Ok(ApiResponse::ok(response))
        }
        None => Err(Error::NotFound(format!("User with ID '{}' not found", id))),
    }
}

/// Create a new user
#[tracing::instrument(name = "POST /api/users", skip(db))]
#[post("/users")]
pub async fn create_user(
    db: web::Data<Database>,
    request: web::Json<CreateUserRequest>,
) -> Result<HttpResponse, Error> {
    if request.first_name.trim().is_empty() {
        return Err(Error::BadRequest("first_name is required".into()));
    }
    if request.last_name.trim().is_empty() {
        return Err(Error::BadRequest("last_name is required".into()));
    }
    if request.email.trim().is_empty() {
        return Err(Error::BadRequest("email is required".into()));
    }

    // Check if email already exists
    let existing: Option<User> = db
        .db
        .query("SELECT * FROM user WHERE email = $email LIMIT 1")
        .bind(("email", request.email.clone()))
        .await?
        .take(0)?;

    if existing.is_some() {
        return Err(Error::Conflict("User with this email already exists".into()));
    }

    let now = Utc::now();
    let user = User {
        id: None,
        first_name: request.first_name.clone(),
        last_name: request.last_name.clone(),
        email: request.email.clone(),
        created_at: now,
        updated_at: now,
    };

    let created: Option<User> = db.db.create("user").content(user).await?;

    match created {
        Some(u) => {
            let response = UserResponse {
                id: u.id.map(|t| t.id.to_string()).unwrap_or_default(),
                first_name: u.first_name,
                last_name: u.last_name,
                email: u.email,
                created_at: u.created_at,
                updated_at: u.updated_at,
            };
            Ok(ApiResponse::created(response))
        }
        None => Err(Error::InternalServerError("Failed to create user".into())),
    }
}

/// Update a user by ID
#[tracing::instrument(name = "PATCH /api/users/{id}", skip(db))]
#[patch("/users/{id}")]
pub async fn update_user(
    db: web::Data<Database>,
    path: web::Path<String>,
    request: web::Json<UpdateUserRequest>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();

    // Check if user exists
    let existing: Option<User> = db.db.select(("user", &id)).await?;
    if existing.is_none() {
        return Err(Error::NotFound(format!("User with ID '{}' not found", id)));
    }

    let now = Utc::now();
    let mut updates = Vec::new();

    if let Some(first_name) = &request.first_name {
        if !first_name.trim().is_empty() {
            updates.push(format!("first_name = '{}'", first_name));
        }
    }
    if let Some(last_name) = &request.last_name {
        if !last_name.trim().is_empty() {
            updates.push(format!("last_name = '{}'", last_name));
        }
    }
    updates.push(format!("updated_at = {}", now.timestamp_millis()));

    if updates.is_empty() {
        return Ok(ApiResponse::ok(existing.unwrap()));
    }

    let query = format!(
        "UPDATE user SET {} WHERE id = '{}'",
        updates.join(", "),
        id
    );
    let _: Option<User> = db.db.query(query).await?.take(0)?;

    // Fetch updated user
    let updated: Option<User> = db.db.select(("user", &id)).await?;
    let u = updated.unwrap();

    let response = UserResponse {
        id: u.id.map(|t| t.id.to_string()).unwrap_or_default(),
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        created_at: u.created_at,
        updated_at: u.updated_at,
    };

    Ok(ApiResponse::ok(response))
}

/// Delete a user by ID
#[tracing::instrument(name = "DELETE /api/users/{id}", skip(db))]
#[post("/users/{id}/delete")]
pub async fn delete_user(
    db: web::Data<Database>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();

    // Check if user exists
    let existing: Option<User> = db.db.select(("user", &id)).await?;
    if existing.is_none() {
        return Err(Error::NotFound(format!("User with ID '{}' not found", id)));
    }

    let _: Option<User> = db.db.delete(("user", &id)).await?;

    Ok(ApiResponse::ok(serde_json::json!({
        "message": "User deleted successfully",
        "id": id
    })))
}
