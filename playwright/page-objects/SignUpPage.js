const { expect } = require('@playwright/test');

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.loginSignUpButtonSelector = '#logInSignUp';
    this.signUpButtonSelector = '#openSignUpForm';
    this.emailInputSelector = '#signUpEmail';
    this.nameInputSelector = '#name';
    this.passwordInputSelector = '#signUpPassword';
    this.submitButtonSelector = '.signup__btn';
    this.emailErrorSelector = '.signup__emailError';
  }

  async openSignUpForm() {
    await this.page.click(this.loginSignUpButtonSelector);
    await this.page.click(this.signUpButtonSelector);
    await this.page.waitForSelector(this.emailInputSelector, {
      state: 'visible',
    });
  }

  async enterSignUpDetails(name, email, password) {
    await this.page.fill(this.nameInputSelector, name);
    await this.page.fill(this.emailInputSelector, email);
    await this.page.fill(this.passwordInputSelector, password);
  }

  async submitSignUpForm() {
    await this.page.click(this.submitButtonSelector);
  }

  async verifyEmailValidationError() {
    const isVisible = await this.page.isVisible(this.emailErrorSelector);
    expect(isVisible).toBe(true);
    const errorMessage = await this.page.textContent(this.emailErrorSelector);
    expect(errorMessage).toContain('Invalid email domain');
  }

  async verifySuccessfulSignUp() {
    await this.page.waitForSelector('.message', { state: 'visible' });
    const successMessage = await this.page.textContent('.message');
    expect(successMessage).toContain('You have been successfully signed up!');
  }
}

module.exports = SignUpPage;
