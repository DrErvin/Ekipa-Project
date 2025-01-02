const { test } = require('@playwright/test');
const SearchPage = require('../../page-objects/SearchPage.js');

test.describe('Search Functionality - Edge Cases', () => {
  test('should display no results message for invalid queries', async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);

    // Define edge cases
    const edgeCases = [
      { location: 'Atlantis', keyword: '' }, // Non-existent location
      { location: '', keyword: 'Underwater Basket Weaving' }, // Non-existent keyword
      { location: '!@#$%^&*', keyword: '(){}[]' }, // Special characters
      { location: 'a'.repeat(256), keyword: 'b'.repeat(256) }, // Excessively long input
    ];

    // Loop through edge cases
    for (const { location, keyword } of edgeCases) {
      // Reload the page for each test
      await searchPage.navigate();

      // Perform the search and verify no results
      await searchPage.performSearch(location, keyword);
      await searchPage.verifyNoResults();
    }
  });
});
