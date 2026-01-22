pub mod error {
    use crate::response::ApiResponse;
    use actix_web::{http::StatusCode, HttpResponse, ResponseError};
    use thiserror::Error;
    use tracing::error;

    #[derive(Error, Debug)]
    pub enum Error {
        #[error("Database error: {0}")]
        Database(String),

        #[error("API error: {0}")]
        Api(String),

        #[error("Not found: {0}")]
        NotFound(String),

        #[error("Bad request: {0}")]
        BadRequest(String),

        #[error("Unauthorized: {0}")]
        Unauthorized(String),

        #[error("Conflict: {0}")]
        Conflict(String),
    }

    impl ResponseError for Error {
        fn error_response(&self) -> HttpResponse {
            match self {
                Error::Database(e) => {
                    error!("Error Response: Database error - {}", e);
                    ApiResponse::<()>::internal_error(e.clone())
                }
                Error::Api(e) => {
                    error!("Error Response: API error - {}", e);
                    ApiResponse::<()>::internal_error(e.clone())
                }
                Error::NotFound(e) => ApiResponse::<()>::not_found(e.clone()),
                Error::BadRequest(e) => ApiResponse::<()>::bad_request(e.clone()),
                Error::Unauthorized(e) => ApiResponse::<()>::unauthorized(e.clone()),
                Error::Conflict(e) => ApiResponse::<()>::conflict(e.clone()),
            }
        }

        fn status_code(&self) -> StatusCode {
            match self {
                Error::Database(_) | Error::Api(_) => StatusCode::INTERNAL_SERVER_ERROR,
                Error::NotFound(_) => StatusCode::NOT_FOUND,
                Error::BadRequest(_) => StatusCode::BAD_REQUEST,
                Error::Unauthorized(_) => StatusCode::UNAUTHORIZED,
                Error::Conflict(_) => StatusCode::CONFLICT,
            }
        }
    }

    impl From<surrealdb::Error> for Error {
        fn from(error: surrealdb::Error) -> Self {
            Error::Database(error.to_string())
        }
    }
}
