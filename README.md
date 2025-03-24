# Playwright_Projects

Instructions to Run Tests
To run the automated tests for this project using Playwright, follow the steps below:.

1. Install Node.js and NPM

Ensure you have Node.js and NPM (Node Package Manager) installed. You can check if they are installed by running the following commands in your terminal:

     node -v
     npm -v
If they are not installed, you can download and install them from the official Node.js website: https://nodejs.org/.

2. Clone the Repository
 First, clone this repository to your local machine using Git:
 
        git clone https://github.com/97-cosmin/Playwright_Projects.git
        cd Playwright_Projects

3. Install Dependencies
Navigate to the project directory and run the following command to install the required dependencies:

        npm install

This will install all necessary packages, including Playwright.

4. Run Tests in Headless Mode
By **default**, Playwright runs tests in headless mode, meaning the browser runs in the background without a visible UI. This makes tests run faster and is useful for CI/CD pipelines.

To execute tests in headless mode, use:

       npx playwright test

6. Run Specific Tests (Optional)
If you want to run specific tests or files, you can provide the test file path as an argument. For example:

        npx playwright test tests/filterMeetingsByCountry_Belgium.spec.ts
