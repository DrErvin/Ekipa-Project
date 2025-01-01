const { test } = require('@playwright/test');
const LoginPage = require('../../page-objects/LoginPage.js');

test.describe('Login Functionality', () => {
  test('should allow a user to log in with valid credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the homepage
    await loginPage.navigate();

    // Open the login form
    await loginPage.openLoginForm();

    // Perform login with valid credentials
    await loginPage.login('newuser@gmail.com', 'SecurePassword123');

    // Verify successful login
    await loginPage.verifyLogin();
  });
});
