import { test, expect } from '@playwright/test';
import { WDLandingPage } from '../src/WDLandingPage';

test.describe('Country Filter Functionality', () => {
    test('Verify that the meeting grid displays only Belgium-related meetings when the Country filter is set to Belgium.', async ({ page }) => {
        const landingPage = new WDLandingPage(page);

        console.log('Accessing the page...');  // Success message
        await landingPage.goto();  // Navigate to the landing page

        console.log('Applying the filter for Belgium...');  // Success message
        await landingPage.filterByCountry('Belgium');  // Apply the country filter

        console.log('Verifying meetings for Belgium...');  // Success message
        // Verify if all meetings are for Belgium
        const result = await landingPage.verifyMeetingsCountry('Belgium');
        expect(result).toBe(true);
        console.log('Test passed, all meetings are for Belgium!');  // Success message
    });
});
