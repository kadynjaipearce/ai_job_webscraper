use crate::error::error::Error;
use thirtyfour::prelude::*;
use std::time::Duration;

/// Represents a job scraped from Indeed before saving to database
#[derive(Debug, Clone)]
pub struct ScrapedJob {
    pub title: String,
    pub company: String,
    pub location: String,
    pub salary: Option<String>,
    pub description_snippet: String,
    pub url: String,
    pub indeed_job_key: String,
}

pub struct IndeedScraper<'a> {
    driver: &'a WebDriver,
}

impl<'a> IndeedScraper<'a> {
    pub fn new(driver: &'a WebDriver) -> Self {
        Self { driver }
    }

    /// Build the Indeed search URL from job title and location
    fn build_url(job_title: &str, location: &str) -> String {
        let encoded_job = urlencoding::encode(job_title);
        let encoded_location = urlencoding::encode(location);
        format!(
            "https://www.indeed.com/jobs?q={}&l={}",
            encoded_job, encoded_location
        )
    }

    /// Scrape the first page of Indeed job listings
    pub async fn scrape(&self, job_title: &str, location: &str) -> Result<Vec<ScrapedJob>, Error> {
        let url = Self::build_url(job_title, location);

        // Navigate to Indeed
        self.driver.goto(&url).await?;

        // Wait for page to load
        tokio::time::sleep(Duration::from_secs(2)).await;

        // Wait a bit more for any dynamic content
        tokio::time::sleep(Duration::from_secs(1)).await;

        // Find all job cards
        let job_cards = match self.driver.find_all(By::Css("div.job_seen_beacon")).await {
            Ok(cards) => cards,
            Err(e) => {
                let html = self.get_page_html().await;
                tracing::error!("Error finding job cards: {}\nPage HTML:\n{}", e, html);
                return Err(Error::Scraper(format!("Error finding job cards: {}\n\nPage HTML:\n{}", e, html)));
            }
        };

        if job_cards.is_empty() {
            // Try alternative selector
            let job_cards = self.driver.find_all(By::ClassName("div.jobsearch-ResultsList > div")).await?;
            if job_cards.is_empty() {
                let html = self.get_page_html().await;
                tracing::error!("No job cards found on page: {}\nPage HTML:\n{}", url, html);
                return Err(Error::Scraper(format!("No job cards found on page: {}\n\nPage HTML:\n{}", url, html)));
            }
        }

        let mut jobs = Vec::new();

        for card in &job_cards {
            match self.extract_job_data(card).await {
                Ok(job) => jobs.push(job),
                Err(e) => {
                    tracing::warn!("Failed to extract job data: {}", e);
                    // Continue processing other jobs
                }
            }
        }

        Ok(jobs)
    }

    /// Try to dismiss cookie consent or other popups
    async fn dismiss_popups(&self) {
        // Try common cookie consent button selectors
        let selectors = [
            "button#onetrust-accept-btn-handler",
            "button[data-testid='close-button']",
            "button.icl-CloseButton",
        ];

        for selector in selectors {
            if let Ok(btn) = self.driver.find(By::Css(selector)).await {
                let _ = btn.click().await;
                tokio::time::sleep(Duration::from_millis(500)).await;
            }
        }
    }

    /// Extract job data from a single job card element
    async fn extract_job_data(&self, card: &WebElement) -> Result<ScrapedJob, Error> {
        // Extract title
        let title = self.get_text_or_default(card, "h2.jobTitle a span", "h2.jobTitle span").await
            .ok_or_else(|| Error::Scraper("Could not find job title".into()))?;

        // Extract company name
        let company = self.get_text_or_default(
            card,
            "span[data-testid='company-name']",
            "span.companyName"
        ).await.unwrap_or_else(|| "Unknown Company".to_string());

        // Extract location
        let location = self.get_text_or_default(
            card,
            "div[data-testid='text-location']",
            "div.companyLocation"
        ).await.unwrap_or_else(|| "Unknown Location".to_string());

        // Extract salary (optional)
        let salary = self.get_text_optional(card, "div.salary-snippet-container").await
            .or_else(|| self.get_text_optional_sync(card, "div.metadata.salary-snippet-container"));

        // Extract description snippet
        let description_snippet = self.get_text_or_default(
            card,
            "div.job-snippet",
            "div.underShelfFooter"
        ).await.unwrap_or_default();

        // Get job key from data attribute or link
        let indeed_job_key = self.extract_job_key(card).await?;

        // Build full URL
        let url = format!("https://www.indeed.com/viewjob?jk={}", indeed_job_key);

        Ok(ScrapedJob {
            title,
            company,
            location,
            salary,
            description_snippet,
            url,
            indeed_job_key,
        })
    }

    /// Try primary selector, then fallback selector
    async fn get_text_or_default(&self, parent: &WebElement, primary: &str, fallback: &str) -> Option<String> {
        if let Ok(el) = parent.find(By::Css(primary)).await {
            if let Ok(text) = el.text().await {
                if !text.trim().is_empty() {
                    return Some(text.trim().to_string());
                }
            }
        }

        if let Ok(el) = parent.find(By::Css(fallback)).await {
            if let Ok(text) = el.text().await {
                if !text.trim().is_empty() {
                    return Some(text.trim().to_string());
                }
            }
        }

        None
    }

    /// Try to get text from an element, returns None if not found or empty
    async fn get_text_optional(&self, parent: &WebElement, selector: &str) -> Option<String> {
        if let Ok(el) = parent.find(By::Css(selector)).await {
            if let Ok(text) = el.text().await {
                let text = text.trim();
                if !text.is_empty() {
                    return Some(text.to_string());
                }
            }
        }
        None
    }

    /// Synchronous version for chaining with or_else
    fn get_text_optional_sync(&self, _parent: &WebElement, _selector: &str) -> Option<String> {
        // This would need to be async, so we'll skip it for now
        None
    }

    /// Get the entire page HTML for debugging
    async fn get_page_html(&self) -> String {
        match self.driver.source().await {
            Ok(html) => html,
            Err(e) => format!("[Failed to get page HTML: {}]", e),
        }
    }

    /// Extract the Indeed job key from the card element
    async fn extract_job_key(&self, card: &WebElement) -> Result<String, Error> {
        // Try data-jk attribute first
        if let Ok(Some(jk)) = card.attr("data-jk").await {
            if !jk.is_empty() {
                return Ok(jk);
            }
        }

        // Try to find it in a link
        if let Ok(link) = card.find(By::Css("h2.jobTitle a")).await {
            if let Ok(Some(href)) = link.attr("href").await {
                // Extract jk parameter from URL like /rc/clk?jk=abc123
                if let Some(jk) = Self::extract_jk_from_url(&href) {
                    return Ok(jk);
                }
            }

            // Try data-jk on the link itself
            if let Ok(Some(jk)) = link.attr("data-jk").await {
                if !jk.is_empty() {
                    return Ok(jk);
                }
            }
        }

        // Try finding any element with data-jk
        if let Ok(el) = card.find(By::Css("[data-jk]")).await {
            if let Ok(Some(jk)) = el.attr("data-jk").await {
                if !jk.is_empty() {
                    return Ok(jk);
                }
            }
        }

        Err(Error::Scraper("Could not find job key".into()))
    }

    /// Extract jk parameter from Indeed URL
    fn extract_jk_from_url(url: &str) -> Option<String> {
        // Parse URLs like /rc/clk?jk=abc123&... or /viewjob?jk=abc123
        if let Some(pos) = url.find("jk=") {
            let start = pos + 3;
            let rest = &url[start..];
            let end = rest.find('&').unwrap_or(rest.len());
            let jk = &rest[..end];
            if !jk.is_empty() {
                return Some(jk.to_string());
            }
        }
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_build_url() {
        let url = IndeedScraper::build_url("Software Engineer", "San Francisco, CA");
        assert_eq!(
            url,
            "https://www.indeed.com/jobs?q=Software%20Engineer&l=San%20Francisco%2C%20CA"
        );
    }

    #[test]
    fn test_extract_jk_from_url() {
        assert_eq!(
            IndeedScraper::extract_jk_from_url("/rc/clk?jk=abc123&from=web"),
            Some("abc123".to_string())
        );
        assert_eq!(
            IndeedScraper::extract_jk_from_url("/viewjob?jk=xyz789"),
            Some("xyz789".to_string())
        );
        assert_eq!(
            IndeedScraper::extract_jk_from_url("/some/other/url"),
            None
        );
    }
}
