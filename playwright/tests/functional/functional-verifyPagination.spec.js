const { test } = require('@playwright/test');
const PaginationPage = require('../../page-objects/PaginationPage.js');

test.describe('Pagination Functionality', () => {
  test('should navigate through pages and handle edge cases', async ({
    page,
  }) => {
    const paginationPage = new PaginationPage(page);

    // Navigate to the homepage and perform a search
    await paginationPage.navigate();
    await paginationPage.performSearch();

    // Verify first page (no "Previous" button)
    await paginationPage.verifyFirstPage();

    // Navigate to the next page and verify results
    await paginationPage.navigateToNextPage();

    // Verify last page (no "Next" button after reaching the end)
    await paginationPage.verifyLastPage();

    // Navigate back to the previous page and verify results
    await paginationPage.navigateToPreviousPage();

    // Verify first page again
    await paginationPage.verifyFirstPage();
  });
});
