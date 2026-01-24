use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use surrealdb::sql::Thing;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
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

// Job scraping request
#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeJobRequest {
    pub job_title: String,
    pub location: String,
}

// Job listing stored in database
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

// Response from scrape endpoint
#[derive(Debug, Serialize, Deserialize)]
pub struct ScrapeJobResponse {
    pub total_scraped: usize,
    pub new_listings: usize,
    pub duplicates_skipped: usize,
    pub listings: Vec<JobListing>,
}
