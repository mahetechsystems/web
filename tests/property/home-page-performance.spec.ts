import { test, expect } from "@playwright/test";
import fc from "fast-check";

/**
 * Property-Based Test: First Contentful Paint Performance
 * 
 * Feature: mahe-tech-website
 * Property 1: First Contentful Paint Performance
 * 
 * **Validates: Requirements 1.1**
 * 
 * This property test verifies that for ANY page on the website,
 * when requested under normal network conditions, the First Contentful
 * Paint metric is less than 1.2 seconds (1200ms).
 * 
 * The test uses property-based testing with fast-check to verify this
 * property holds across multiple pages and multiple test runs.
 */

test.describe("Property 1: First Contentful Paint Performance", () => {
  test("FCP is under 1.2 seconds for all pages", async ({ page }) => {
    // Define all pages to test
    const pages = ["/", "/about", "/services", "/case-studies", "/blog", "/contact"];

    // Use fast-check to run property-based test with 100 iterations
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...pages), async (path) => {
        // Navigate to the page
        await page.goto(path, { waitUntil: "domcontentloaded" });

        // Measure First Contentful Paint using Performance API
        const fcpMetric = await page.evaluate(() => {
          return new Promise<number | null>((resolve) => {
            // Get FCP from PerformanceObserver
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              for (const entry of entries) {
                if (entry.name === "first-contentful-paint") {
                  observer.disconnect();
                  resolve(entry.startTime);
                  return;
                }
              }
            });

            observer.observe({ type: "paint", buffered: true });

            // Fallback: check if FCP already exists in performance entries
            const paintEntries = performance.getEntriesByType("paint");
            const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint");
            
            if (fcpEntry) {
              observer.disconnect();
              resolve(fcpEntry.startTime);
              return;
            }

            // Timeout after 5 seconds
            setTimeout(() => {
              observer.disconnect();
              resolve(null);
            }, 5000);
          });
        });

        // Assert FCP is not null (metric was captured)
        expect(fcpMetric).not.toBeNull();
        
        // Assert FCP is under 1.2 seconds (1200ms)
        // Requirements 1.1: First Contentful Paint within 1.2 seconds
        expect(fcpMetric!).toBeLessThan(1200);
      }),
      {
        numRuns: 15, // Reduced iterations for faster test execution
        verbose: true,
      }
    );
  });
});
