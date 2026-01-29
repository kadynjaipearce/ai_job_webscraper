use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use surrealdb::sql::Thing;

/// Pagination parameters for list queries
#[derive(Debug, Deserialize, Default)]
pub struct PaginationParams {
    #[serde(default)]
    pub page: Option<usize>,
    #[serde(default)]
    pub limit: Option<usize>,
}

/// Query parameters for job listings
#[derive(Debug, Deserialize, Default)]
pub struct JobQueryParams {
    #[serde(default)]
    pub page: Option<usize>,
    #[serde(default)]
    pub limit: Option<usize>,
    pub title: Option<String>,
    pub company: Option<String>,
    pub location: Option<String>,
    pub source: Option<String>,
    pub salary_min: Option<String>,
    pub salary_max: Option<String>,
    #[serde(default)]
    pub sort_by: Option<String>,
    #[serde(default)]
    pub sort_order: Option<String>,
}

/// Pagination metadata
#[derive(Debug, Serialize)]
pub struct PaginationMeta {
    pub page: usize,
    pub limit: usize,
    pub total: usize,
    pub total_pages: usize,
}

/// Paginated response wrapper
#[derive(Debug, Serialize)]
pub struct PaginatedJobResponse {
    pub data: Vec<JobListing>,
    pub pagination: PaginationMeta,
}

#[derive(Debug, Serialize)]
pub struct PaginatedUserResponse {
    pub data: Vec<User>,
    pub pagination: PaginationMeta,
}

/// User model
#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Option<Thing>,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserRequest {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserRequest {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: String,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// Job scraping request
#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeJobRequest {
    pub job_title: String,
    pub location: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeMultipleRequest {
    pub sources: Vec<String>,
    pub job_title: String,
    pub location: String,
}

/// Job listing stored in database
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JobListing {
    pub id: Option<Thing>,
    pub title: String,
    pub company: String,
    pub location: String,
    pub salary: Option<String>,
    pub description_snippet: String,
    pub url: String,
    pub indeed_job_key: String,
    pub source: String,
    pub scraped_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// Response from scrape endpoint
#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeJobResponse {
    pub total_scraped: usize,
    pub new_listings: usize,
    pub duplicates_skipped: usize,
    pub listings: Vec<JobListing>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeMultipleResponse {
    pub total_scraped: usize,
    pub new_listings: usize,
    pub duplicates_skipped: usize,
    pub by_source: std::collections::HashMap<String, ScrapeSourceResult>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeSourceResult {
    pub source: String,
    pub scraped: usize,
    pub new: usize,
    pub duplicates: usize,
}

/// Health check response
#[derive(Debug, Serialize)]
pub struct HealthCheckResponse {
    pub status: String,
    pub database: String,
    pub timestamp: DateTime<Utc>,
}
