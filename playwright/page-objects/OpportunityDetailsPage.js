const { expect } = require('@playwright/test');

class OpportunityDetailsPage {
  constructor(page) {
    this.page = page;
    this.detailsSection = '.details-opportunity';
    this.homeButton = '#homeBtn';
    this.errorMessage = '.error';
    this.opportunityTitle = '.opportunity-title';
  }

  async navigateToOpportunity(opportunityId) {
    await this.page.goto(`/#${opportunityId}`);
    await this.page.waitForSelector(this.detailsSection, { state: 'visible' });
  }

  async verifyOpportunityDetails(expectedTitle) {
    const title = await this.page.textContent(this.opportunityTitle);
    expect(title.trim()).toBe(expectedTitle);
  }

  async navigateBackToHome() {
    // Click the home button to navigate back
    await this.page.click(this.homeButton);

    // Wait for the home page to fully load
    await this.page.waitForLoadState('load');

    // Wait for the search button to be visible and clickable
    await this.page.waitForSelector('.btn-search', { state: 'visible' });

    // Click the search button to reload the opportunities list
    await this.page.click('.btn-search');

    // Ensure the opportunities list is displayed
    await this.page.waitForSelector('.opportunities-list:not(.hidden)', {
      state: 'visible',
    });
  }

  async verifyErrorMessage() {
    const errorText = await this.page.textContent(this.errorMessage);
    expect(errorText.trim()).toBe(
      'We could not find that Opportunity. Please try another one!'
    );
  }
}

module.exports = OpportunityDetailsPage;
