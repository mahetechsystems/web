import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for property-based tests
 * 
 * This configuration is specifically for property-based tests that require
 * real browser performance metrics (FCP, LCP, CLS, etc.)
 */
export default defineConfig({
  testDir: "./tests/property",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: 60000, // Increase timeout to 60 seconds for property-based tests
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
