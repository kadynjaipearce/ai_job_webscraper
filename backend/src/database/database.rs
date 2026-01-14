use shuttle_runtime::SecretStore;
use surrealdb::opt::auth::Root;
use surrealdb::Surreal;
use surrealdb::{engine::remote::ws::Client, engine::remote::ws::Ws};

use crate::error::error::Error;

#[derive(Clone)]
pub struct Database {
    pub db: Surreal<Client>,
}

impl Database {
    pub async fn new(secrets: &SecretStore) -> Result<Self, Error> {
        let db = Surreal::new::<Ws>(&secrets.get("DATABASE_URL").unwrap()).await?;
        db.signin(Root {
            username: "root",
            password: "root",
        })
        .await?;

        Ok(Self { db })
    }
}
