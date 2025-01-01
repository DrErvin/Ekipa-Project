const { expect } = require('@playwright/test');

class LogoutPage {
  constructor(page) {
    this.page = page;
    this.logoutButtonSelector = '#logInSignUp'; // Button for logout
    this.confirmLogoutButtonSelector = '.logout__btn'; // Logout confirmation button
    this.loginSignUpButtonSelector = '#logInSignUp'; // Button text changes to "Log In/Sign Up"
  }

  async navigateToHomePage() {
    await this.page.goto('http://localhost:8080');
  }

  async clickLogout() {
    // Wait for the "Log Out" button to be visible
    await this.page.waitForSelector(this.logoutButtonSelector, {
      state: 'visible',
    });
    const buttonText = await this.page.textContent(this.logoutButtonSelector);

    if (buttonText.trim() === 'Log Out') {
      await this.page.click(this.logoutButtonSelector);

      // Wait for the logout confirmation modal to appear
      await this.page.waitForSelector(this.confirmLogoutButtonSelector, {
        state: 'visible',
      });
      await this.page.click(this.confirmLogoutButtonSelector);
    } else {
      throw new Error('Logout button not available');
    }
  }

  async verifyStateCleared() {
    // Check global state by examining localStorage
    const localStorageData = await this.page.evaluate(() => {
      return JSON.stringify(localStorage);
    });
    expect(localStorageData).toBe('{}'); // Local storage should be empty
  }

  async verifyLoginSignUpVisible() {
    // Ensure the button text has reverted to "Log In/Sign Up"
    await this.page.waitForSelector(this.loginSignUpButtonSelector, {
      state: 'visible',
    });
    const buttonText = await this.page.textContent(
      this.loginSignUpButtonSelector
    );
    expect(buttonText.trim()).toBe('Log In/Sign Up');
  }
}

module.exports = LogoutPage;
