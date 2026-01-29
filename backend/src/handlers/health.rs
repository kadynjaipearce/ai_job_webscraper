use crate::database::database::Database;
use crate::database::models::HealthCheckResponse;
use crate::error::error::Error;
use crate::response::ApiResponse;
use actix_web::{get, web, HttpResponse};
use chrono::Utc;

/// Health check endpoint
///
/// Returns the health status of the API and database connection.
#[tracing::instrument(name = "GET /api/health", skip(db))]
#[get("/health")]
pub async fn health_check(db: web::Data<Database>) -> Result<HttpResponse, Error> {
    // Check database connection
    let db_healthy = db.db.health().await.is_ok();

    let status = if db_healthy {
        "healthy".to_string()
    } else {
        "unhealthy".to_string()
    };

    let response = HealthCheckResponse {
        status: status.clone(),
        database: if db_healthy { "connected".to_string() } else { "disconnected".to_string() },
        timestamp: Utc::now(),
    };

    if db_healthy {
        Ok(ApiResponse::ok(response))
    } else {
        Ok(HttpResponse::ServiceUnavailable().json(response))
    }
}

/// Liveness check endpoint
///
/// Returns 200 if the service is alive.
#[tracing::instrument(name = "GET /api/live")]
#[get("/live")]
pub async fn liveness_check() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "alive",
        "timestamp": Utc::now()
    }))
}
