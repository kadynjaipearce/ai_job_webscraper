
use crate::response::ApiResponse;
use actix_web::{
    get,
    web::{self, ServiceConfig},
    HttpResponse,
};
use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;

use tracing_subscriber::filter::{EnvFilter, LevelFilter};

mod chrome;
mod database;
mod error;
mod handlers;
mod response;
mod scrapers;

#[tracing::instrument(name = "/")]
#[get("")]
async fn index() -> HttpResponse {
    let message = "Hello, world!";
    ApiResponse::ok(message)
}

/// Default handler for routes that don't exist
async fn not_found_handler() -> HttpResponse {
    ApiResponse::<()>::not_found("Not Found")
}

#[shuttle_runtime::main]
async fn main(#[shuttle_runtime::Secrets] secrets: SecretStore) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::builder().with_default_directive(LevelFilter::INFO.into()).from_env_lossy())
        .init();
    let db = database::database::Database::new(&secrets).await.unwrap();
    let chrome = chrome::driver::Driver::new().await;

    let config = move |cfg: &mut ServiceConfig| {
        let chrome = web::Data::new(chrome);
        let secrets = web::Data::new(secrets);
        let db = web::Data::new(db);

        cfg.service(
            web::scope("/api")
                .service(index)
                .service(handlers::jobs::scrape_indeed)
                .default_service(web::route().to(not_found_handler))
                .app_data(secrets)
                .app_data(db)
                .app_data(chrome),
        );   
    };

    Ok(config.into())
}
