use actix_web::{HttpResponse, ResponseError};
use serde::Serialize;
use tracing::{error, info, warn};

/// Standard API response wrapper for all endpoints
#[derive(Debug, Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<ErrorResponse>,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub code: u16,
    pub message: String,
}

impl<T> ApiResponse<T>
where
    T: Serialize,
{
    /// Create a successful response with data
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    /// Create an error response
    pub fn error(code: u16, message: String) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(ErrorResponse { code, message }),
        }
    }

    /// Convert to HttpResponse with the given status code
    pub fn to_http_response(&self, status: actix_web::http::StatusCode) -> HttpResponse
    where
        T: Serialize,
    {
        HttpResponse::build(status).json(self)
    }
}

impl<T> ApiResponse<T>
where
    T: Serialize,
{
    /// Success response with 200 OK
    pub fn ok(data: T) -> HttpResponse {
        info!("API Response: 200 OK - Success");
        Self::success(data).to_http_response(actix_web::http::StatusCode::OK)
    }

    /// Success response with 201 Created
    pub fn created(data: T) -> HttpResponse {
        info!("API Response: 201 Created - Success");
        Self::success(data).to_http_response(actix_web::http::StatusCode::CREATED)
    }
}

impl ApiResponse<()> {
    /// Success response with 204 No Content
    pub fn no_content() -> HttpResponse {
        info!("API Response: 204 No Content - Success");
        HttpResponse::NoContent().finish()
    }

    /// Bad Request (400)
    pub fn bad_request(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        warn!("API Response: 400 Bad Request - {}", msg);
        Self::error(400, msg).to_http_response(actix_web::http::StatusCode::BAD_REQUEST)
    }

    /// Unauthorized (401)
    pub fn unauthorized(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        warn!("API Response: 401 Unauthorized - {}", msg);
        Self::error(401, msg).to_http_response(actix_web::http::StatusCode::UNAUTHORIZED)
    }

    /// Forbidden (403)
    pub fn forbidden(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        warn!("API Response: 403 Forbidden - {}", msg);
        Self::error(403, msg).to_http_response(actix_web::http::StatusCode::FORBIDDEN)
    }

    /// Not Found (404)
    pub fn not_found(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        warn!("API Response: 404 Not Found - {}", msg);
        Self::error(404, msg).to_http_response(actix_web::http::StatusCode::NOT_FOUND)
    }

    /// Conflict (409)
    pub fn conflict(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        warn!("API Response: 409 Conflict - {}", msg);
        Self::error(409, msg).to_http_response(actix_web::http::StatusCode::CONFLICT)
    }

    /// Internal Server Error (500)
    pub fn internal_error(message: impl Into<String>) -> HttpResponse {
        let msg = message.into();
        error!("API Response: 500 Internal Server Error - {}", msg);
        Self::error(500, msg).to_http_response(actix_web::http::StatusCode::INTERNAL_SERVER_ERROR)
    }
}

/// Helper function to convert Result<T, Error> to HttpResponse
pub fn handle_result<T>(result: Result<T, crate::error::error::Error>) -> HttpResponse
where
    T: Serialize,
{
    match result {
        Ok(data) => ApiResponse::ok(data),
        Err(e) => {
            // The error will be automatically converted via ResponseError trait
            e.error_response()
        }
    }
}
