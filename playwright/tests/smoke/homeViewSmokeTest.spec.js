const { test, expect } = require('@playwright/test');
const HomePage = require('../../page-objects/HomePage.js');

test('Smoke Test: Search Functionality', async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate to the homepage
  await homePage.navigate();

  // Perform a search query
  const searchQuery = 'Developer';
  await homePage.performSearch(searchQuery);

  // Verify search results are displayed
  const resultsCount = await homePage.getSearchResultsCount();
  expect(resultsCount).toBeGreaterThan(0);
});
