use crate::database::models::JobListing;
use crate::error::error::Error;
use shuttle_runtime::SecretStore;
use surrealdb::opt::auth::Root;
use surrealdb::Surreal;
use surrealdb::{engine::remote::ws::Client, engine::remote::ws::Ws};

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

        db.use_ns("main").use_db("main").await?;

        db.query(
            "
        
        DEFINE TABLE user SCHEMAFULL;
        DEFINE FIELD firstname ON TABLE user TYPE string;
        DEFINE FIELD lastname ON TABLE user TYPE string;
        DEFINE FIELD email ON TABLE user TYPE string;
        DEFINE FIELD created_at ON TABLE user TYPE datetime;
        DEFINE FIELD updated_at ON TABLE user TYPE datetime;

        DEFINE TABLE listing SCHEMAFULL;
        DEFINE FIELD title ON TABLE listing TYPE string;
        DEFINE FIELD company ON TABLE listing TYPE string;
        DEFINE FIELD salary ON TABLE listing TYPE number;
        DEFINE FIELD location ON TABLE listing TYPE string;
        DEFINE FIELD description ON TABLE listing TYPE string;
        DEFINE FIELD url ON TABLE listing TYPE string;
        DEFINE FIELD created_at ON TABLE listing TYPE datetime;
        DEFINE FIELD updated_at ON TABLE listing TYPE datetime;
        
        ",
        )
        .await?;

        Ok(Self { db })
    }

    pub async fn create_listing(&self, listing: JobListing) -> Result<Option<JobListing>, Error> {
        let result = self.db.create("listing").content(listing).await.map_err(|e| {
            tracing::error!("Failed to create listing: {}", e);
            Error::from(e)
        })?;
        if result.is_some() {
            Ok(result)
        } else {
            tracing::error!("Failed to create listing: database returned None");
            Err(Error::Db("Failed to create listing".to_string()))
        }
    }
}
