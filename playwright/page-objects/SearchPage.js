const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchForm = '.search-form';
    this.locationInput = 'input[placeholder="Location"]';
    this.keywordInput = 'input[placeholder="Title or Keyword"]';
    this.searchButton = '.btn-search';
    this.resultsContainer = '.container-opp-list';
    this.introSection = '.intro-section';
    this.errorMessage = '.error'; // Selector for error message
  }

  async navigate() {
    await this.page.goto('/');
  }

  async performSearch(location, keyword) {
    await this.page.fill(this.locationInput, location || '');
    await this.page.fill(this.keywordInput, keyword || '');
    await this.page.click(this.searchButton);
  }

  async verifyNoResults() {
    // Wait for the error message to appear
    const error = await this.page.locator(this.errorMessage);
    await error.waitFor({ state: 'visible' });

    // Verify the error message is correct
    const errorText = await error.innerText();
    expect(errorText).toContain('No opportunities found for your query!');
  }

  async verifySearchResults(location, keyword) {
    const results = this.page
      .locator(this.resultsContainer)
      .locator('.opportunity-card');

    // Wait for at least one result to be visible
    await results.first().waitFor({ state: 'visible' });

    // Ensure results are visible (greater than 0)
    const resultCount = await results.count();
    expect(resultCount).toBeGreaterThan(0);

    // Check each result contains the location and keyword
    for (let i = 0; i < resultCount; i++) {
      const resultText = await results.nth(i).innerText();
      expect(resultText.toLowerCase()).toContain(location.toLowerCase());
      expect(resultText.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyIntroSection(location, keyword) {
    const introText = await this.page.locator(this.introSection).innerText();
    console.log('Intro Section Text:', introText);

    expect(introText.toLowerCase()).toContain(location.toLowerCase());
    expect(introText.toLowerCase()).toContain(keyword.toLowerCase());
  }
}

module.exports = SearchPage;
