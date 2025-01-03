const { test, expect } = require('@playwright/test');
const PaginationPage = require('../../page-objects/PaginationPage.js');

test.describe('Pagination Reset After Search', () => {
  test('should reset pagination to first page after navigating back home', async ({
    page,
  }) => {
    const paginationPage = new PaginationPage(page);

    // Step 1: Navigate to the homepage and perform a search
    await paginationPage.navigate();
    await paginationPage.performSearch();

    // Step 2: Navigate to the second page
    await paginationPage.navigateToNextPage();

    // Step 3: Click the Home button to reset the search
    await paginationPage.clickHomeButton();

    // Step 4: Perform a new search and verify that the pagination is reset
    await paginationPage.performSearch();
    await paginationPage.verifyPaginationReset();
  });
});
