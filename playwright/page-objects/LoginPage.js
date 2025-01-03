const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = '#logInSignUp'; // Button to open login form
    this.emailInput = '#loginEmail'; // Email input field
    this.passwordInput = '#loginPassword'; // Password input field
    this.submitButton = '.login__btn'; // Submit button
    this.successMessage = '.message'; // Success message
  }

  async navigate() {
    // Use the baseURL defined in the Playwright configuration
    await this.page.goto('/');
  }

  async openLoginForm() {
    await this.page.click(this.loginButton);
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async verifyLogin() {
    await expect(this.page.locator(this.successMessage)).toHaveText(
      'You have been successfully logged in :)'
    );
    await expect(this.page.locator(this.loginButton)).toHaveText('Log Out');
  }

  async checkSessionPersistence() {
    await expect(this.page.locator(this.loginButton)).toHaveText('Log Out');
  }
}

module.exports = LoginPage;
