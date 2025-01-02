const { test } = require('@playwright/test');
const SignUpPage = require('../../page-objects/SignUpPage');

test('Verify email domain validation during sign-up', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  // Step 1: Navigate to the application URL
  await page.goto('http://localhost:8080'); // Replace with the correct base URL if different

  // Step 2: Open the Sign-Up form
  await signUpPage.openSignUpForm();

  // Step 3: Enter invalid email domain and other valid details
  await signUpPage.enterSignUpDetails(
    'John Doe',
    'user@gmail.com', // Invalid domain
    'Password123'
  );
  await signUpPage.submitSignUpForm();

  // Step 4: Verify validation error for email
  await signUpPage.verifyEmailValidationError();

  // Step 5: Enter valid email domain and submit
  await signUpPage.enterSignUpDetails(
    'John Doe',
    'user@telekom.com', // Valid domain
    'Password123'
  );
  await signUpPage.submitSignUpForm();

  // Step 6: Verify successful sign-up
  await signUpPage.verifySuccessfulSignUp();
});
