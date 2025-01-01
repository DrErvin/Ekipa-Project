const { test, expect } = require('@playwright/test');
const ApplyPage = require('../../page-objects/ApplyPage.js');

test('Verify application submission functionality', async ({ page }) => {
  const applyPage = new ApplyPage(page);

  // Precondition: Navigate to the opportunity page
  const opportunityId = 1; // Replace with the correct opportunity ID
  await applyPage.navigateToOpportunity(opportunityId);

  // Step 1: Click the "Apply Now" button
  await applyPage.clickApplyNow();

  // Step 2: Upload a file (optional)
  const filePath = './test-files/test-file.pdf';
  await applyPage.uploadFile(filePath);

  // Step 3: Submit the form
  await applyPage.submitApplication();

  // Step 4: Verify success message
  const successMessage = await applyPage.getSuccessMessage();
  expect(successMessage).toContain(
    'You have successfully applied for this opportunity :)'
  );
});
