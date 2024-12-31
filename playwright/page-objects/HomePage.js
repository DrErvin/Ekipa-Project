class HomePage {
  constructor(page) {
    this.page = page;
    this.searchForm = '.search-form';
    this.searchInput = '.search-form input[type="text"]';
    this.searchButton = '.search-form button[type="submit"]';
    this.resultsContainer = '.container-opp-list';
  }

  async navigate() {
    await this.page.goto('/'); // Assuming '/' routes to your home page
  }

  async performSearch(query) {
    await this.page.fill(this.searchInput, query);
    await this.page.click(this.searchButton);
  }

  async getSearchResultsCount() {
    return await this.page.locator(this.resultsContainer).count();
  }
}

module.exports = HomePage;
