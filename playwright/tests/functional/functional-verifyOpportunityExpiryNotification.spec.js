const { test, expect } = require('@playwright/test');
const OpportunitiesPage = require('../../page-objects/OpportunitiesPage.js');

test.describe('Opportunity Expiry Notification', () => {
  test('should display "Deadline Passed" for expired opportunities', async ({
    page,
  }) => {
    const opportunitiesPage = new OpportunitiesPage(page);

    // Navigate to the home page and click the search button
    await page.goto('/');
    await page.click('.btn-search');

    // Wait for opportunities list to load
    await page.waitForSelector('.opportunity-card');

    // Get all opportunities with "Deadline Passed"
    const expiredOpportunities =
      await opportunitiesPage.getExpiredOpportunities();

    // Assert that at least one opportunity has "Deadline Passed"
    expect(expiredOpportunities.length).toBeGreaterThan(0);

    // Verify all displayed expired opportunities have "Deadline Passed"
    for (const opportunity of expiredOpportunities) {
      expect(opportunity).toContain('Deadline Passed');
    }
  });
});
