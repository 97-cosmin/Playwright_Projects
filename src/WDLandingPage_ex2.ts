
/**
 * Verification Steps:
 * 
 * Given the user is on the landing page for the WD site,
 * When the user searches for the company “Activision Blizzard Inc” in the top right search bar,
 * And the user clicks on the Company Name hyperlink from the search results,
 * Then the user lands on the “Activision Blizzard Inc.” vote card page,
 * And “Activision Blizzard Inc” should appear in the top banner.
 */

import { Page, Locator, expect } from '@playwright/test';

export class WDLandingPage_ex2 {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly voteCardPageBanner: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator('#kendo-Search-for-company'); 
        this.voteCardPageBanner = page.locator('#detail-issuer-name');
        this.searchResults = page.locator('ul.k-list li');
    }

    // Criteria: Given the user is on the landing page for the WD site
    async goto(): Promise<void> {
        await this.page.goto(process.env.WD_URL || 'https://viewpoint.glasslewis.com/WD/?siteId=DemoClient');
        await expect(this.searchBar).toBeVisible();
        console.log('[LANDING PAGE] Loaded successfully - search bar visible');
    }

    // Criteria: When the user searches for the company in the top right search bar
    async searchForCompany(companyName: string): Promise<void> {
        await this.searchBar.waitFor({ state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.fill(companyName);
        
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500);
        
        try {
            await expect(this.searchResults.first()).toBeVisible({ timeout: 8000 });
            console.log(`[SEARCH] Results displayed for "${companyName}"`);
        } catch (error) {
            console.error(`[SEARCH ERROR] No results found for "${companyName}"`);
            throw error;
        }
    }

    // Criteria: And the user clicks on the Company Name hyperlink from the search results
    async selectCompanyFromResults(companyName: string): Promise<void> {
        const resultOption = this.searchResults.filter({ hasText: companyName }).first();
        await expect(resultOption).toBeVisible();
        await resultOption.click();
        console.log(`[SELECTION] "${companyName}" chosen from results`);
    }

    // Criteria: Then the user lands on the vote card page
    // Criteria: And company name should appear in the top banner
    async verifyOnVoteCardPage(companyName: string): Promise<void> {
        await expect(this.voteCardPageBanner).toBeVisible();
        const bannerText = await this.voteCardPageBanner.innerText();
        
        if (bannerText.trim() === companyName) {
            console.log(`[VERIFICATION] Correct vote card displayed for "${companyName}"`);
        } else {
            console.error(`[VERIFICATION FAILED] Expected "${companyName}" but found "${bannerText}"`);
            throw new Error('Banner text mismatch');
        }
    }
}