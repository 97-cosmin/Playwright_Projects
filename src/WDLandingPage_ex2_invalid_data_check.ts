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

export class WDLandingPage_ex2_invalid_data_check {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly voteCardPageBanner: Locator;
    readonly searchResults: Locator;
    readonly resultsContainer: Locator;
    readonly noDataMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator('#kendo-Search-for-company');
        this.voteCardPageBanner = page.locator('#detail-issuer-name');
        this.searchResults = page.locator('#header-search-input_listbox .k-item');
        this.resultsContainer = page.locator('#header-search-input-list');
        this.noDataMessage = page.locator('#header-search-input-list .k-nodata');
    }

    // Navighează la pagina de start a site-ului WD
    async goto(): Promise<void> {
        await this.page.goto(process.env.WD_URL || 'https://viewpoint.glasslewis.com/WD/?siteId=DemoClient');
        await expect(this.searchBar).toBeVisible();
    }

    // Căutare companie
    async searchForCompany(companyName: string): Promise<void> {
        await this.searchBar.click();
        await this.searchBar.fill(companyName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    // Verifică că există rezultate valide după o căutare
    async verifyValidSearch(): Promise<void> {
        // Așteaptă să fie vizibile fie containerul de rezultate, fie primele rezultate
        await expect(
            Promise.race([
                this.resultsContainer.waitFor({ state: 'visible' }),
                this.searchResults.first().waitFor({ state: 'visible' })
            ])
        ).resolves.toBeTruthy();
    }

    // Verifică că nu există rezultate după o căutare invalidă
    async verifyInvalidSearch(): Promise<void> {
        // Așteaptă să fie vizibil un mesaj de "No data found"
        await this._waitForNoResults();
        console.log('[SUCCESS] Invalid search handled correctly');
    }

    // Funcție privată pentru a aștepta și verifica lipsa rezultatelor
    private async _waitForNoResults(): Promise<void> {
        await expect(async () => {
            const hasNoData = await this.noDataMessage.isVisible() &&
                (await this.noDataMessage.textContent()).includes('No data found');
            const hasNoResults = await this.searchResults.count() === 0;

            if (!hasNoData && !hasNoResults) {
                throw new Error('Neither no data message nor empty results list found');
            }
        }).toPass({ timeout: 5000 });
    }

    // Selectează compania din rezultate
    async selectCompanyFromResults(companyName: string): Promise<void> {
        const resultOption = this.searchResults.filter({ hasText: companyName }).first();
        await expect(resultOption).toBeVisible();
        await resultOption.click();
    }

    // Verifică dacă pagina votului conține numele companiei
    async verifyOnVoteCardPage(companyName: string): Promise<void> {
        await expect(this.voteCardPageBanner).toHaveText(companyName);
    }
}
