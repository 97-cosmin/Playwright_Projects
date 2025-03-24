/**
 * Verification Steps:
 * 
 * Given the user is on the landing page for the WD site,
 * And the Country filter is available,
 * When the user selects “Belgium” from the Country filter list on the left panel,
 * And clicks on the Update button for the country filter list,
 * Then the grid displays all meetings that are associated with the country “Belgium,”
 * And no meetings associated with any other country appear on the list.
 */

import { Page, Locator } from '@playwright/test';

export class WDLandingPage {
    readonly page: Page;
    readonly countryFilter: Locator;
    readonly updateButton: Locator;
    readonly meetingsGrid: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryFilter = page.locator('#multiselect-static-target-CountryFilter');  // Selector for the country dropdown
        this.updateButton = page.locator('//*[@id="btn-update" and not(contains(@class, "disabled"))]');  // Selector for the active "Update" button
        this.meetingsGrid = page.locator('.meeting-row'); // Selector for the meetings list
    }

    // **Given the user is on the landing page for the WD site**
    async goto(): Promise<void> {
        await this.page.goto(process.env.WD_URL || 'https://viewpoint.glasslewis.com/WD/?siteId=DemoClient');
        console.log('Navigated to the landing page of the WD site');
    }

    // **When the user selects “Belgium” from the Country filter list on the left panel**
    // **And clicks on the Update button for the country filter list**
    async filterByCountry(country: string): Promise<void> {
        await this.countryFilter.click();  
        console.log('The country dropdown has been opened successfully');
        await this.page.locator(`text=${country}`).click();  
        console.log(`The country ${country} has been selected from the dropdown`);

        const updateButtonLocator = this.page.locator('//*[@id="btn-update" and not(contains(@class, "disabled"))]');
        await updateButtonLocator.waitFor({ state: 'visible', timeout: 60000 });  
        console.log('The update button became visible after waiting');
        await updateButtonLocator.scrollIntoViewIfNeeded();  
        await updateButtonLocator.click();  
        console.log('The update button was clicked successfully');
    }

    // **Then the grid displays all meetings that are associated with the country “Belgium,”**
    // **And no meetings associated with any other country appear on the list.**
    async verifyMeetingsCountry(expectedCountry: string): Promise<boolean> {
        // Wait for the page to fully load
        await this.page.waitForLoadState('load');
        console.log('Page has fully loaded.');

        try {
            // Wait for the table to update after clicking the "Update" button
            await this.page.waitForSelector('tr[data-uid] td:nth-child(5)', { state: 'visible', timeout: 60000 });
            console.log('Meetings grid has been updated.');

            // Check all rows in the table
            const countryCells = this.page.locator('tr[data-uid] td:nth-child(5)');  // Selector for all cells in column 5
            const countCountryCells = await countryCells.count();
            console.log(`Found ${countCountryCells} entries in the "Country" column.`);

            if (countCountryCells === 0) {
                console.log('No entries found in the "Country" column.');
                return false;
            }

            // Wait until all rows contain the expected country
            let allCountriesMatch = false;
            const maxAttempts = 10;  // Maximum number of attempts
            let attempts = 0;

            while (!allCountriesMatch && attempts < maxAttempts) {
                const countries = await countryCells.allInnerTexts();
                const invalidCountries = countries.filter(country => !country.includes(expectedCountry));

                if (invalidCountries.length === 0) {
                    allCountriesMatch = true;
                    console.log(`All ${countries.length} countries are ${expectedCountry}.`);
                } else {
                    console.log(`Found ${invalidCountries.length} invalid countries. Retrying...`);
                    await this.page.waitForTimeout(2000);  // Wait for 2 seconds before checking again
                    attempts++;
                }
            }

            if (!allCountriesMatch) {
                console.log(`Not all countries are ${expectedCountry} after ${maxAttempts} attempts.`);
                return false;
            }

            return true;
        } catch (error) {
            console.log('An error occurred while verifying the countries.');
            console.error(error);
            return false;
        }
    }
}