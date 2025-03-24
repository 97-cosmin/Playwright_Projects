import { test } from '@playwright/test';
import { WDLandingPage_ex2 } from '../src/WDLandingPage_ex2';

test.describe('WD Landing Page - Company Search Navigation', () => {
    let landingPage: WDLandingPage_ex2;
    const companyName = "Activision Blizzard Inc";

    // CRITERIA: Given the user is on the landing page for the WD site
    test.beforeEach(async ({ page }) => {
        console.log('[SETUP] Initializing test - navigating to landing page');
        landingPage = new WDLandingPage_ex2(page);
        await landingPage.goto();
        console.log('[SETUP COMPLETE] Landing page loaded successfully');
    });

    test('Complete company search and navigation flow', async ({ page }) => {
        // Mark test as potentially slow (doubles default timeout)
        test.slow();
        console.log('[TEST START] Beginning test execution with extended timeout');

        try {
            // PHASE 1: SEARCH EXECUTION
            // CRITERIA: When the user searches for the company in the top right search bar
            console.log('[PHASE 1] Executing company search');
            console.log(`[ACTION] Searching for: "${companyName}"`);
            await landingPage.searchForCompany(companyName);
            console.log('[STATUS] Company search completed successfully');

            // PHASE 2: RESULT SELECTION
            // CRITERIA: And the user clicks on the Company Name hyperlink from the search results
            console.log('[PHASE 2] Selecting company from results');
            console.log(`[ACTION] Selecting "${companyName}" from dropdown`);
            await landingPage.selectCompanyFromResults(companyName);
            console.log('[STATUS] Company selection completed');

            // PHASE 3: VERIFICATION
            // CRITERIA: Then the user lands on the "Activision Blizzard Inc." vote card page
            // CRITERIA: And "Activision Blizzard Inc" should appear in the top banner
            console.log('[PHASE 3] Verifying vote card page');
            console.log(`[VERIFICATION] Checking banner for "${companyName}"`);
            await landingPage.verifyOnVoteCardPage(companyName);
            console.log('[SUCCESS] All acceptance criteria verified successfully');

        } catch (error) {
            // ERROR HANDLING
            console.error('[FAILURE] Test execution failed - capturing diagnostics');
            
            // Capture visual evidence
            const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
            await page.screenshot({ 
                path: `test-failure-${timestamp}.png`, 
                fullPage: true 
            });
            console.log('[DIAGNOSTIC] Screenshot captured');

            // Log detailed failure context
            console.error('[FAILURE ANALYSIS]', {
                currentUrl: page.url(),
                searchBarVisible: await landingPage.searchBar.isVisible(),
                resultsCount: await landingPage.searchResults.count(),
                errorMessage: error.message
            });

            throw new Error(`Test failed: ${error.message}`);
        }
    });
});