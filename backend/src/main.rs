use std::sync::LazyLock;
use actix_web::{get, web::ServiceConfig};
use shuttle_actix_web::ShuttleActixWeb;

mod error;
mod database;
mod chrome;

#[get("/")]
async fn hello_world() -> String {
    let driver = chrome::driver::Driver::new().await;

    driver.driver.goto("https://www.pleasehireme.app/").await.unwrap();

    let html = driver.driver.source().await.unwrap();

    driver.driver.quit().await.unwrap();
    
    html
}

#[shuttle_runtime::main]
async fn main() -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(hello_world);
    };

    Ok(config.into())
}
