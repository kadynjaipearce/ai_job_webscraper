use crate::chrome::driver::Driver;
use crate::database::database::Database;
use crate::database::models::{JobListing, JobQueryParams, ScrapeJobResponse};
use crate::error::error::Error;
use crate::response::ApiResponse;
use crate::scrapers::indeed::IndeedScraper;
use actix_web::{get, post, web, HttpResponse};
use chrono::Utc;

/// Scrape jobs from Indeed
///
/// # Request Body
/// ```json
/// {
///   "job_title": "software engineer",
///   "location": "san francisco"
/// }
/// ```
///
/// # Response
/// Returns the list of newly scraped job listings
#[tracing::instrument(name = "POST /api/jobs/scrape/indeed", skip(db, driver))]
#[post("/jobs/scrape/indeed")]
pub async fn scrape_indeed(
    db: web::Data<Database>,
    driver: web::Data<Driver>,
    request: web::Json<crate::database::models::ScrapeJobRequest>,
) -> Result<HttpResponse, Error> {
    // Validate request
    if request.job_title.trim().is_empty() {
        return Err(Error::BadRequest("job_title is required".into()));
    }
    if request.location.trim().is_empty() {
        return Err(Error::BadRequest("location is required".into()));
    }

    tracing::info!(
        "Scraping Indeed for job_title='{}', location='{}'",
        request.job_title,
        request.location
    );

    // Perform scraping
    let scraper = IndeedScraper::new(&driver.driver);
    let scraped_jobs = scraper
        .scrape(&request.job_title, &request.location)
        .await?;

    let total_scraped = scraped_jobs.len();
    let mut new_listings = 0;
    let mut duplicates_skipped = 0;
    let mut saved_listings = Vec::new();

    // Save each job to database
    for job in scraped_jobs {
        let now = Utc::now();

        // Check for existing listing by job key and source
        let job_key = job.indeed_job_key.clone();
        let existing: Option<JobListing> = db
            .db
            .query("SELECT * FROM listing WHERE indeed_job_key = $key AND source = $source LIMIT 1")
            .bind(("key", job_key))
            .bind(("source", "indeed".to_string()))
            .await?
            .take(0)?;

        if existing.is_some() {
            duplicates_skipped += 1;
            tracing::debug!(
                "Skipping duplicate job: {} at {}",
                job.title,
                job.company
            );
            continue;
        }

        // Create new listing
        let listing = JobListing {
            id: None,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description_snippet: job.description_snippet,
            url: job.url,
            indeed_job_key: job.indeed_job_key,
            source: "indeed".to_string(),
            scraped_at: now,
            created_at: now,
            updated_at: now,
        };

        let created: Option<JobListing> = db.db.create("listing").content(listing).await?;

        if let Some(saved) = created {
            tracing::info!("Saved job: {} at {}", saved.title, saved.company);
            saved_listings.push(saved);
            new_listings += 1;
        }
    }

    let response = ScrapeJobResponse {
        total_scraped,
        new_listings,
        duplicates_skipped,
        listings: saved_listings,
    };

    tracing::info!(
        "Scrape complete: {} total, {} new, {} duplicates",
        total_scraped,
        new_listings,
        duplicates_skipped
    );

    Ok(ApiResponse::ok(response))
}

/// List all job listings with pagination, filtering, and sorting
///
/// # Query Parameters
/// - `page`: Page number (default: 1)
/// - `limit`: Items per page (default: 10, max: 100)
/// - `title`: Filter by job title (partial match)
/// - `company`: Filter by company name (partial match)
/// - `location`: Filter by location (partial match)
/// - `source`: Filter by job board source
/// - `sort_by`: Sort field (created_at, title, company)
/// - `sort_order`: Sort order (asc, desc)
#[tracing::instrument(name = "GET /api/jobs", skip(db))]
#[get("/jobs")]
pub async fn list_jobs(
    db: web::Data<Database>,
    query: web::Query<JobQueryParams>,
) -> Result<HttpResponse, Error> {
    let params = query.into_inner();
    let page = params.page.unwrap_or(1);
    let limit = std::cmp::min(params.limit.unwrap_or(10), 100);
    let start = (page - 1) * limit;

    // Build query
    let mut query_str = String::from("SELECT * FROM listing");
    let mut conditions = Vec::new();

    if let Some(title) = &params.title {
        conditions.push(format!("title CONTAINS '{}'", title));
    }
    if let Some(company) = &params.company {
        conditions.push(format!("company CONTAINS '{}'", company));
    }
    if let Some(location) = &params.location {
        conditions.push(format!("location CONTAINS '{}'", location));
    }
    if let Some(source) = &params.source {
        conditions.push(format!("source = '{}'", source));
    }

    if !conditions.is_empty() {
        query_str.push_str(" WHERE ");
        query_str.push_str(&conditions.join(" AND "));
    }

    // Add sorting
    let sort_by = params.sort_by.as_deref().unwrap_or("created_at");
    let sort_order = params.sort_order.as_deref().unwrap_or("desc");
    query_str.push_str(&format!(" ORDER BY {} {}", sort_by, sort_order));

    // Add pagination
    query_str.push_str(&format!(" LIMIT {} START {}", limit, start));

    tracing::info!("Fetching jobs with query: {}", query_str);

    let jobs: Vec<JobListing> = db.db.query(query_str).await?.take(0)?;

    // Get total count
    let count_query = String::from("SELECT count() as total FROM listing");
    let count_result: Vec<serde_json::Value> = db.db.query(count_query).await?.take(0)?;
    let total = count_result
        .first()
        .and_then(|v| v.get("total"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);

    let response = crate::database::models::PaginatedJobResponse {
        data: jobs,
        pagination: crate::database::models::PaginationMeta {
            page,
            limit,
            total: total as usize,
            total_pages: ((total as f64) / (limit as f64)).ceil() as usize,
        },
    };

    Ok(ApiResponse::ok(response))
}

/// Get a single job listing by ID
#[tracing::instrument(name = "GET /api/jobs/{id}", skip(db))]
#[get("/jobs/{id}")]
pub async fn get_job(
    db: web::Data<Database>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();

    let job: Option<JobListing> = db.db.select(("listing", &id)).await?;

    match job {
        Some(listing) => Ok(ApiResponse::ok(listing)),
        None => Err(Error::NotFound(format!("Job listing with ID '{}' not found", id))),
    }
}

/// Delete a job listing by ID
#[tracing::instrument(name = "DELETE /api/jobs/{id}", skip(db))]
#[post("/jobs/{id}/delete")]
pub async fn delete_job(
    db: web::Data<Database>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();

    // Check if job exists
    let existing: Option<JobListing> = db.db.select(("listing", &id)).await?;
    if existing.is_none() {
        return Err(Error::NotFound(format!("Job listing with ID '{}' not found", id)));
    }

    // Delete the job
    let _: Option<JobListing> = db.db.delete(("listing", &id)).await?;

    Ok(ApiResponse::ok(serde_json::json!({
        "message": "Job listing deleted successfully",
        "id": id
    })))
}

/// Search jobs by keyword across title and company
#[tracing::instrument(name = "GET /api/jobs/search", skip(db))]
#[get("/jobs/search")]
pub async fn search_jobs(
    db: web::Data<Database>,
    query: web::Query<JobQueryParams>,
) -> Result<HttpResponse, Error> {
    let params = query.into_inner();

    // If no keyword provided, return empty response
    let has_keyword = params.title.is_some() || params.company.is_some();
    if !has_keyword {
        return Ok(ApiResponse::ok(crate::database::models::PaginatedJobResponse {
            data: Vec::new(),
            pagination: crate::database::models::PaginationMeta {
                page: 1,
                limit: 10,
                total: 0,
                total_pages: 0,
            },
        }));
    }

    // Build query and execute search
    let page = params.page.unwrap_or(1);
    let limit = std::cmp::min(params.limit.unwrap_or(10), 100);
    let start = (page - 1) * limit;

    let mut conditions = Vec::new();
    if let Some(title) = &params.title {
        conditions.push(format!("title CONTAINS '{}'", title));
    }
    if let Some(company) = &params.company {
        conditions.push(format!("company CONTAINS '{}'", company));
    }
    if let Some(location) = &params.location {
        conditions.push(format!("location CONTAINS '{}'", location));
    }
    if let Some(source) = &params.source {
        conditions.push(format!("source = '{}'", source));
    }

    let mut query_str = String::from("SELECT * FROM listing");
    if !conditions.is_empty() {
        query_str.push_str(" WHERE ");
        query_str.push_str(&conditions.join(" AND "));
    }

    let sort_by = params.sort_by.as_deref().unwrap_or("created_at");
    let sort_order = params.sort_order.as_deref().unwrap_or("desc");
    query_str.push_str(&format!(" ORDER BY {} {}", sort_by, sort_order));
    query_str.push_str(&format!(" LIMIT {} START {}", limit, start));

    let jobs: Vec<JobListing> = db.db.query(query_str).await?.take(0)?;

    let count_query = String::from("SELECT count() as total FROM listing");
    let count_result: Vec<serde_json::Value> = db.db.query(count_query).await?.take(0)?;
    let total = count_result.first().and_then(|v| v.get("total")).and_then(|v| v.as_u64()).unwrap_or(0);

    let response = crate::database::models::PaginatedJobResponse {
        data: jobs,
        pagination: crate::database::models::PaginationMeta {
            page,
            limit,
            total: total as usize,
            total_pages: ((total as f64) / (limit as f64)).ceil() as usize,
        },
    };

    Ok(ApiResponse::ok(response))
}

/// Get available job sources
#[tracing::instrument(name = "GET /api/jobs/sources", skip(db))]
#[get("/jobs/sources")]
pub async fn get_job_sources(
    db: web::Data<Database>,
) -> Result<HttpResponse, Error> {
    let sources: Vec<serde_json::Value> = db
        .db
        .query("SELECT DISTINCT source FROM listing")
        .await?
        .take(0)?;

    let source_list: Vec<String> = sources
        .iter()
        .filter_map(|s| s.get("source").and_then(|v| v.as_str().map(String::from)))
        .collect();

    Ok(ApiResponse::ok(serde_json::json!({
        "sources": source_list
    })))
}

/// Get job statistics
#[tracing::instrument(name = "GET /api/jobs/stats", skip(db))]
#[get("/jobs/stats")]
pub async fn get_job_stats(
    db: web::Data<Database>,
) -> Result<HttpResponse, Error> {
    let stats: Vec<serde_json::Value> = db
        .db
        .query("SELECT count() as total_jobs FROM listing")
        .await?
        .take(0)?;

    let total_jobs: usize = stats
        .iter()
        .filter_map(|s| s.get("total_jobs").and_then(|v| v.as_u64().map(|u| u as usize)))
        .sum();

    // Get jobs by source
    let by_source: Vec<serde_json::Value> = db
        .db
        .query("SELECT source, count() as count FROM listing GROUP BY source")
        .await?
        .take(0)?;

    let mut jobs_by_source = std::collections::HashMap::new();
    for item in by_source {
        if let (Some(source), Some(count)) = (
            item.get("source").and_then(|v| v.as_str()),
            item.get("count").and_then(|v| v.as_u64()),
        ) {
            jobs_by_source.insert(source.to_string(), count as usize);
        }
    }

    Ok(ApiResponse::ok(serde_json::json!({
        "total_jobs": total_jobs,
        "jobs_by_source": jobs_by_source
    })))
}
