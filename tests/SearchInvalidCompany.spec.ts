import { test } from '@playwright/test';
import { WDLandingPage_ex2_invalid_data_check } from '../src/WDLandingPage_ex2_invalid_data_check';

test.describe('Invalid Company Search', () => {
    let landingPage: WDLandingPage_ex2_invalid_data_check;
    const invalidCompany = "NONEXISTENT_COMPANY_XYZ_123";

    test.beforeEach(async ({ page }) => {
        landingPage = new WDLandingPage_ex2_invalid_data_check(page);
        await landingPage.goto();
    });

    test('Search for invalid company shows no results', async () => {
        await landingPage.searchForCompany(invalidCompany);
        await landingPage.verifyInvalidSearch();
    });
});
