const { expect } = require('@playwright/test');

class ApplyPage {
  constructor(page) {
    this.page = page;
    this.applyNowButtonSelector = '.apply-now-btn';
    this.fileInputSelector = '#cvUpload';
    this.submitButtonSelector = '.apply__btn';
    this.successMessageSelector = '.message';
    this.applyFormSelector = '.apply-form';
  }

  async navigateToOpportunity(opportunityId) {
    await this.page.goto(`http://localhost:8080/#${opportunityId}`);
  }

  async clickApplyNow() {
    // Wait for at least one Apply Now button to load
    const buttons = await this.page.locator(this.applyNowButtonSelector);
    const count = await buttons.count();

    if (count === 0)
      throw new Error("No 'Apply Now' buttons found on the page.");

    // Click the first visible Apply Now button
    for (let i = 0; i < count; i++) {
      if (await buttons.nth(i).isVisible()) {
        await buttons.nth(i).click();
        break;
      }
    }

    // Wait for the form to become visible
    await this.page.waitForSelector(this.applyFormSelector, {
      state: 'visible',
    });
  }

  async uploadFile(filePath) {
    await this.page.waitForSelector(this.fileInputSelector, {
      state: 'visible',
    });
    await this.page.setInputFiles(this.fileInputSelector, filePath);
  }

  async submitApplication() {
    await this.page.waitForSelector(this.submitButtonSelector, {
      state: 'visible',
    });
    await this.page.click(this.submitButtonSelector);
  }

  async getSuccessMessage() {
    await this.page.waitForSelector(this.successMessageSelector, {
      state: 'visible',
    });
    return this.page.textContent(this.successMessageSelector);
  }
}

module.exports = ApplyPage;
