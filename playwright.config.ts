import { defineConfig, devices } from '@playwright/test';

const config = {
  testDir: './tests',
  timeout: 30 * 1000, // 40 seconds for all actions
  expect: {
    timeout: 5000, // 40 seconds for assertions
  },
  reporter: 'html', // Use HTML reporter

  use: {
    browserName: 'chromium', // Default browser
    headless: false, // Run tests in headless mode
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};
module.exports = config;
