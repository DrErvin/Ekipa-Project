const { test } = require('@playwright/test');
const SearchPage = require('../../page-objects/SearchPage.js');

test.describe('Search Functionality', () => {
  test('should display relevant opportunities and update intro section', async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);

    // Navigate to the homepage
    await searchPage.navigate();

    // Perform search
    const location = 'Berlin';
    const keyword = 'Frontend Developer';
    await searchPage.performSearch(location, keyword);

    // Verify search results
    await searchPage.verifySearchResults(location, keyword);

    // Verify intro section update
    await searchPage.verifyIntroSection(location, keyword);
  });
});
