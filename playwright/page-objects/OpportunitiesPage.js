class OpportunitiesPage {
  constructor(page) {
    this.page = page;
    this.cardSelector = '.opportunity-card';
    this.deadlineSelector = '.card-detail-item:last-child p';
  }

  async getExpiredOpportunities() {
    const opportunities = await this.page.$$(this.cardSelector);

    // Filter opportunities with "Deadline Passed"
    const expiredOpportunities = [];
    for (const opportunity of opportunities) {
      const deadlineText = await opportunity.$eval(
        this.deadlineSelector,
        (el) => el.textContent
      );
      if (deadlineText.includes('Deadline Passed')) {
        expiredOpportunities.push(deadlineText);
      }
    }

    return expiredOpportunities;
  }
}

module.exports = OpportunitiesPage;
