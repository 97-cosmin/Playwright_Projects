# Playwright_Projects

Instructions to Run Tests
To run the automated tests for this project using Playwright, follow the steps below:.

**1. Install Node.js and NPM**

Ensure you have Node.js and NPM (Node Package Manager) installed. You can check if they are installed by running the following commands in your terminal:

     node -v
     npm -v
If they are not installed, you can download and install them from the official Node.js website: https://nodejs.org/.

**2. Clone the Repository**
 First, clone this repository to your local machine using Git:
 
        git clone https://github.com/97-cosmin/Playwright_Projects.git
        cd Playwright_Projects

**3. Install Dependencies**
Navigate to the project directory and run the following command to install the required dependencies:

        npm install

This will install all necessary packages, including Playwright.

**4. Run Tests in Headless Mode**
By **default**, Playwright runs tests in **headless** mode, meaning the browser runs in the background without a visible UI.
This makes tests run faster and is useful for CI/CD pipelines.

To execute tests in headless mode, use:

       npx playwright test

If you want to run tests in headed mode (with a visible browser window for debugging), add the --headed flagL**(Optional)**

     npx playwright test --headed


**6. Run Specific Tests (Optional)**
If you want to run specific tests or files, you can provide the test file path as an argument. For example:

        npx playwright test tests/filterMeetingsByCountry_Belgium.spec.ts

**7. Capture Screenshots on Test Failure**

Playwright is configured to automatically capture screenshots whenever a test fails.
This is enabled in the Playwright configuration **(playwright.config.ts https://github.com/97-cosmin/Playwright_Projects/blob/main/playwright.config.ts )** in the use section:
     
     use: {
       screenshot: 'only-on-failure',
       screenshotPath: './screenshots',
     },
**8. HTML Test Report Generation**
Playwright automatically generates an HTML test report after running the tests. The report provides a detailed summary of test execution, including passed and failed tests.
This report is enabled in the Playwright configuration file **(playwright.config.ts https://github.com/97-cosmin/Playwright_Projects/blob/main/playwright.config.ts )**, specifically in the reporter section:

        reporter: 'html',

**9. Cross-Browser Testing**
The tests are configured to run on multiple browsers to ensure compatibility. The following browsers are included in the Playwright configuration (playwright.config.ts):
     -Chromium (Google Chrome)
     -Firefox
     -WebKit (Safari)
     -Microsoft Edge

     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
       },
       {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] },
       },
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] },
       },
       {
         name: 'Microsoft Edge',
         use: { ...devices['Desktop Edge'], channel: 'msedge' },
       },
     ],
