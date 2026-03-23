import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000, // 30000ms (30 secs)
  testDir: './tests',
  fullyParallel: true,
  // retries: process.env.CI ? 2 : 0,
  retries: 1,
  // workers: process.env.CI ? 1 : undefined,
  workers: 2,

  reporter: [
    ['html' , {outputFolder: '../reports/html-report'}],
    ['allure-playwright' , {outputFolder: '../reports/allure-results'}],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // headless: false,
    viewport: { width: 1280, height: 720 }, // Default viewport size for consistency
    ignoreHTTPSErrors: true,                 // Ignore SSL errors if necessary
    permissions: ['geolocation'],            // Permissions for geolocation-based tests
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});