use crate::database::models::JobListing;
use crate::response::ApiResponse;
use actix_web::{
    get, post,
    web::{self, ServiceConfig},
    HttpResponse, ResponseError,
};
use chrono::Utc;
use serde_json::json;
use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;

use tracing::{debug, error, event, info, trace, warn};
use tracing_subscriber::filter::{EnvFilter, LevelFilter};

mod chrome;
mod database;
mod error;
mod response;

#[tracing::instrument(name = "/")]
#[get("")]
async fn hello_world() -> HttpResponse {
    let message = "Hello, world!";
    ApiResponse::ok(message)
}

#[tracing::instrument(name = "/create_listing", skip(db))]
#[post("/listings")]
async fn create_listing(db: web::Data<database::database::Database>) -> HttpResponse {
    let listing = JobListing {
        id: "1".to_string(),
        title: "Software Engineer".to_string(),
        company: "Google".to_string(),
        location: "San Francisco, CA".to_string(),
        salary: 100000.0,
        description:
            "We are looking for a Software Engineer with 3 years of experience in the field."
                .to_string(),
        url: "https://www.google.com".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };

    match db.create_listing(listing).await {
        Ok(created_listing) => ApiResponse::created(created_listing),
        Err(e) => e.error_response(),
    }
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .from_env_lossy(),
        )
        .init();

    let db = database::database::Database::new(&secrets).await.unwrap();
    let chrome = chrome::driver::Driver::new().await;

    let config = move |cfg: &mut ServiceConfig| {
        let chrome = web::Data::new(chrome);
        let secrets = web::Data::new(secrets);
        let db = web::Data::new(db);

        cfg.service(
            web::scope("/api")
                .service(hello_world)
                .service(create_listing)
                .app_data(secrets)
                .app_data(db)
                .app_data(chrome),
        );
    };

    Ok(config.into())
}
