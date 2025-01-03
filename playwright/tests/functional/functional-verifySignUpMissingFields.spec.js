const { test, expect } = require('@playwright/test');
const SignUpPage = require('../../page-objects/SignUpPage.js');

test.describe('Sign-Up Form Validation - Missing Fields', () => {
  test('should not submit the form when mandatory fields are missing', async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    // Step 1: Navigate to the application URL
    await page.goto('http://localhost:8080');

    // Step 2: Open the Sign-Up form
    await signUpPage.openSignUpForm();

    // Step 3: Attempt to submit the form without filling out the required fields
    await signUpPage.submitSignUpForm();

    // Step 4: Verify that the form did not submit
    const urlAfterSubmit = page.url();
    expect(urlAfterSubmit).toBe('http://localhost:8080/'); // The URL should not change

    // Verify that the Sign-Up form is still visible
    const isSignUpFormVisible = await page.isVisible('#signUpEmail');
    expect(isSignUpFormVisible).toBe(true);
  });
});
