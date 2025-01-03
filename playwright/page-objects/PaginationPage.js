const { expect } = require('@playwright/test');

class PaginationPage {
  constructor(page) {
    this.page = page;
    this.searchButton = '.btn-search';
    this.paginationContainer = '.pagination';
    this.prevButton = '.pagination__btn--prev';
    this.nextButton = '.pagination__btn--next';
    this.resultsContainer = '.container-opp-list';
    this.homeButton = '#homeBtn';
  }

  async navigate() {
    await this.page.goto('/');
  }

  async performSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.paginationContainer, {
      state: 'visible',
    });
  }

  async navigateToNextPage() {
    if (await this.page.locator(this.nextButton).isVisible()) {
      await this.page.click(this.nextButton);
      await this.page.waitForSelector(this.resultsContainer, {
        state: 'visible',
      });
    } else {
      throw new Error('Next button is not visible');
    }
  }

  async navigateToPreviousPage() {
    if (await this.page.locator(this.prevButton).isVisible()) {
      await this.page.click(this.prevButton);
      await this.page.waitForSelector(this.resultsContainer, {
        state: 'visible',
      });
    } else {
      throw new Error('Previous button is not visible');
    }
  }

  async verifyFirstPage() {
    const prevButtonExists = await this.page.locator(this.prevButton).count();
    expect(prevButtonExists).toBe(0); // No "Previous" button on the first page
  }

  async verifyLastPage() {
    const nextButtonExists = await this.page.locator(this.nextButton).count();
    expect(nextButtonExists).toBe(0); // No "Next" button on the last page
  }

  async clickHomeButton() {
    await this.page.click(this.homeButton);
  }

  async verifyPaginationReset() {
    const nextPageExists = await this.page.locator(this.nextButton).count();
    expect(nextPageExists).toBe(1); // Ensure the "Next" button is available
  }
}

module.exports = PaginationPage;
