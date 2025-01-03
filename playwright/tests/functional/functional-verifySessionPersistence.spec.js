const { test } = require('@playwright/test');
const LoginPage = require('../../page-objects/LoginPage.js');

test.describe('Session Persistence', () => {
  test('should retain login state after page reload', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the homepage
    await loginPage.navigate();

    // Open the login form
    await loginPage.openLoginForm();

    // Perform login with valid credentials
    await loginPage.login('newuser@gmail.com', 'SecurePassword123');

    // Verify successful login
    await loginPage.verifyLogin();

    // Reload the page
    await page.reload();

    // Check that session is persisted
    await loginPage.checkSessionPersistence();
  });
});
