const { expect } = require('@playwright/test');

class HomeNavigationPage {
  constructor(page) {
    this.page = page;
    this.homeButton = '#homeBtn';
    this.searchButton = '.btn-search';
    this.opportunityList = '.opportunities-list';
  }

  async clickSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.opportunityList, { state: 'visible' });
  }

  async clickHomeButton() {
    await this.page.click(this.homeButton);
  }

  async isSearchResultsCleared() {
    return !(await this.page.isVisible(this.opportunityList));
  }

  async navigateToOpportunity(id) {
    await this.page.goto(`/#${id}`);
    await this.page.waitForSelector('.details-opportunity', {
      state: 'visible',
    });
  }
}

module.exports = HomeNavigationPage;
