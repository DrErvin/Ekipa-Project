const { test } = require('@playwright/test');
const OpportunityDetailsPage = require('../../page-objects/OpportunityDetailsPage.js');
const { expect } = require('@playwright/test');

test.describe('Opportunity Details Navigation', () => {
  test('should navigate to opportunity details and back to the list', async ({
    page,
  }) => {
    const detailsPage = new OpportunityDetailsPage(page);

    // Wait for the page to load and the search button to appear
    await page.goto('/'); // Ensure you are on the correct base URL
    await page.waitForSelector('.btn-search', { state: 'visible' });

    // Click search to display opportunities
    await page.click('.btn-search');
    await page.waitForSelector('.opportunities-list', { state: 'visible' });

    // Navigate to an existing opportunity
    const validOpportunityId = 1; // Replace with a valid opportunity ID
    const expectedTitle = 'Frontend Developer'; // Replace with the expected title for the ID
    await detailsPage.navigateToOpportunity(validOpportunityId);
    await detailsPage.verifyOpportunityDetails(expectedTitle);

    // Navigate back to the home page
    await detailsPage.navigateBackToHome();

    // Verify that the opportunities list is visible again
    const listVisible = await page.isVisible('.opportunities-list');
    expect(listVisible).toBeTruthy();
  });

  test('should display an error for a non-existent opportunity', async ({
    page,
  }) => {
    const detailsPage = new OpportunityDetailsPage(page);

    // Wait for the page to load and the search button to appear
    await page.goto('/'); // Ensure you are on the correct base URL
    await page.waitForSelector('.btn-search', { state: 'visible' });

    // Click search to display opportunities
    await page.click('.btn-search');
    await page.waitForSelector('.opportunities-list', { state: 'visible' });

    // Navigate to a non-existent opportunity
    const invalidOpportunityId = 99999; // Use an invalid ID
    await detailsPage.navigateToOpportunity(invalidOpportunityId);

    // Verify error message is displayed
    await detailsPage.verifyErrorMessage();
  });
});
