use actix_web::{
    get,
    web::{self, ServiceConfig},
};
use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;

mod chrome;
mod database;
mod error;

#[get("")]
async fn hello_world() -> &'static str {
    "Hello, world!"
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let db = database::database::Database::new(&secrets).await.unwrap();
    let chrome = chrome::driver::Driver::new().await;

    let config = move |cfg: &mut ServiceConfig| {
        let chrome = web::Data::new(chrome);
        let secrets = web::Data::new(secrets);
        let db = web::Data::new(db);

        cfg.service(
            web::scope("/api")
                .service(hello_world)
                .app_data(secrets)
                .app_data(db)
                .app_data(chrome),
        );
    };

    Ok(config.into())
}
