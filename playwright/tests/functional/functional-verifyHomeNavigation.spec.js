const { test, expect } = require('@playwright/test');
const HomeNavigationPage = require('../../page-objects/HomeNavigationPage');

test.describe('Home Button Navigation', () => {
  test('should reset search form and results when clicking Home', async ({
    page,
  }) => {
    const homePage = new HomeNavigationPage(page);

    // Navigate to home page
    await page.goto('/');

    // Perform a search to display opportunities
    await homePage.clickSearch();

    // Click the Home button to reset
    await homePage.clickHomeButton();

    // Verify search results are cleared
    const cleared = await homePage.isSearchResultsCleared();
    expect(cleared).toBeTruthy();
  });

  test('should navigate back to home from opportunity details', async ({
    page,
  }) => {
    const homePage = new HomeNavigationPage(page);

    // Navigate to a specific opportunity
    await page.goto('/');
    await homePage.navigateToOpportunity(1);

    // Click the Home button to return
    await homePage.clickHomeButton();

    // Verify search results are cleared
    const cleared = await homePage.isSearchResultsCleared();
    expect(cleared).toBeTruthy();
  });
});
