use actix_web::{post, web, HttpResponse};
use chrono::Utc;

use crate::chrome::driver::Driver;
use crate::database::database::Database;
use crate::database::models::{JobListing, ScrapeJobRequest, ScrapeJobResponse};
use crate::error::error::Error;
use crate::response::ApiResponse;
use crate::scrapers::indeed::IndeedScraper;

#[tracing::instrument(name = "POST /api/jobs/scrape/indeed", skip(db, driver))]
#[post("/jobs/scrape/indeed")]
pub async fn scrape_indeed(
    db: web::Data<Database>,
    driver: web::Data<Driver>,
    request: web::Json<ScrapeJobRequest>,
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
        // Clone values for the query bind (requires 'static)
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
