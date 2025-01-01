const { test } = require('@playwright/test');
const LoginPage = require('../../page-objects/LoginPage.js');
const LogoutPage = require('../../page-objects/LogoutPage.js');

test('Verify logout functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);

  // Step 1: Navigate to the homepage and log in
  await loginPage.navigate();
  await loginPage.openLoginForm();
  await loginPage.login('newuser@gmail.com', 'SecurePassword123');
  await loginPage.verifyLogin();

  // Step 2: Perform logout
  await logoutPage.clickLogout();

  // Step 3: Verify global state is cleared
  await logoutPage.verifyStateCleared();

  // Step 4: Verify "Log In/Sign Up" button is visible
  await logoutPage.verifyLoginSignUpVisible();
});
