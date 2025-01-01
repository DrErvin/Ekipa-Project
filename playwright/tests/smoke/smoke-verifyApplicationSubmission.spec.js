// playwright/tests/smoke/smoke-directApplyFormTrigger.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Directly Trigger Apply Form Visibility', () => {
  test('should ensure the Apply Form becomes visible', async ({ page }) => {
    // Navigate to the opportunity page
    await page.goto('http://127.0.0.1:8080/#1');

    // Wait for the Apply Now button to load
    const applyNowButtonSelector = '#apply-top-btn';
    await page.waitForSelector(applyNowButtonSelector, { state: 'visible' });

    // Directly invoke the JavaScript handler for toggling the form
    await page.evaluate(() => {
      const applyView = window.applyView; // Ensure this is accessible globally
      if (applyView && typeof applyView.toggleWindow === 'function') {
        applyView.toggleWindow();
      } else {
        throw new Error('applyView or toggleWindow not found.');
      }
    });

    // Wait and check if the form is visible
    const applyFormSelector = '.apply-form-window';
    await page.waitForSelector(applyFormSelector, { state: 'visible' });

    // Assert the form is visible
    const isFormVisible = await page.isVisible(applyFormSelector);
    console.log('Is Apply Form Visible:', isFormVisible);
    expect(isFormVisible).toBe(true);
  });
});

// also add this to applyView.js for this to work.
// Expose the instance of applyView globally for debugging
// if (typeof window !== 'undefined') {
//   window.applyView = new applyView(); // Use the instance, not the class
// }
// export default window.applyView; // Ensure consistency in the exported value
