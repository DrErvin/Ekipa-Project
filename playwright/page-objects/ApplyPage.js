// playwright/page-objects/ApplyPage.js
const { expect } = require('@playwright/test');

class ApplyPage {
  constructor(page) {
    this.page = page;
    this.applyTopButton = '#apply-top-btn'; // Top "Apply Now" button
    this.applyFormWindow = '.apply-form-window'; // Form container
    this.fileUploadInput = '#cvUpload'; // File upload input
    this.submitButton = '.apply__btn'; // Submit button
    this.overlay = '.overlay--apply'; // Overlay element
  }

  async openForm() {
    // Ensure the page is fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    this.applyTopButton = '#apply-top-btn'; // Top "Apply Now" button
    this.applyFormWindow = '.apply-form-window'; // Form container
    this.fileUploadInput = '#cvUpload'; // File upload input
    this.submitButton = '.apply__btn'; // Submit button
    this.overlay = '.overlay--apply'; // Overlay element

    // Wait for the Apply Now button to be visible
    await this.page.waitForSelector(this.applyTopButton, { state: 'visible' });

    // Click the button and ensure the form becomes visible
    await this.page.click(this.applyTopButton);
    // await this.page.waitForSelector(this.applyFormWindow, { state: 'visible' });
  }

  async uploadFile(filePath) {
    await this.page.setInputFiles(this.fileUploadInput, filePath);
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async assertFormClosed() {
    const isHidden = await this.page.locator(this.applyFormWindow).isHidden();
    expect(isHidden).toBe(true);
  }
}

module.exports = { ApplyPage };
