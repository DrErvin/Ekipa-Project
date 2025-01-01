const { devices } = require('@playwright/test');

module.exports = {
  timeout: 60000,
  retries: 1,
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    baseURL: 'http://127.0.0.1:8080', // Update this to match your frontend's local server URL
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
};
