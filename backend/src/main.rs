use actix_web::{get, web::{self, ServiceConfig}};
use shuttle_actix_web::ShuttleActixWeb;

mod error;
mod database;
mod chrome;

#[get("")]
async fn hello_world() -> &'static str {
    "Hello, world!"
}

#[shuttle_runtime::main]
async fn main() -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(
            web::scope("/api").service(hello_world)
        );
    };

    Ok(config.into())
}
