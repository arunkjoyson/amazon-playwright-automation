// playwright.config.ts

import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;  // Detect CI environment

export default defineConfig({
  testDir: './tests', // Ensure tests are picked from ./tests folder
  timeout: 60000,     // Increase test timeout to 60s for reliability
  expect: {
    timeout: 5000,    // Timeout for expect assertions
  },
  fullyParallel: true, // Run tests in parallel for speed
  retries: 1,         // Retry failed tests once
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    headless: isCI ? true : false,  // Force headless on CI, keep headed locally
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
