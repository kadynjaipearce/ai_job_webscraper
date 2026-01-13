use thirtyfour::prelude::*;
pub struct Driver {
    pub driver: WebDriver,
}

impl Driver {
    pub async fn new() -> Self {
        let mut capabilities = DesiredCapabilities::chrome();

        capabilities.add_arg("--headless").unwrap();
        capabilities.add_arg("--disable-gpu").unwrap();
        capabilities.add_arg("--no-sandbox").unwrap();
        capabilities.add_arg("--disable-dev-shm-usage").unwrap();

        let driver = WebDriver::new("http://localhost:34277", capabilities).await.unwrap();
        Self { driver }
    }
}