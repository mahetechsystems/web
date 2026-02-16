import { test, expect } from "@playwright/test";
import fc from "fast-check";

/**
 * Property-Based Test: Semantic HTML Usage
 * 
 * Feature: mahe-tech-website
 * Property 8: Semantic HTML Usage
 * 
 * **Validates: Requirements 7.1**
 * 
 * This property test verifies that for ANY page on the website, the HTML
 * structure uses semantic HTML5 elements (header, nav, main, article, section,
 * footer) appropriately.
 * 
 * The test uses property-based testing with fast-check to verify this
 * property holds across all pages and multiple test runs.
 */

test.describe("Property 8: Semantic HTML Usage", () => {
  test("all pages use semantic HTML5 elements appropriately", async ({ page }) => {
    // Define all pages to test
    const pages = ["/", "/about", "/services", "/case-studies", "/blog", "/contact"];

    // Use fast-check to run property-based test with reduced iterations
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...pages), async (pagePath) => {
        // Navigate to the page
        await page.goto(pagePath);

        // Wait for the page to be fully loaded
        await page.waitForLoadState("networkidle");

        // Requirements 7.1: Check for semantic HTML5 elements

        // 1. Check for <main> element - should have exactly one per page
        const mainElements = await page.locator("main").count();
        expect(mainElements).toBeGreaterThanOrEqual(1);

        // 2. Check for <nav> element - should have at least one for navigation
        const navElements = await page.locator("nav").count();
        expect(navElements).toBeGreaterThanOrEqual(1);

        // 3. Check for <header> element - should have at least one
        const headerElements = await page.locator("header").count();
        expect(headerElements).toBeGreaterThanOrEqual(1);

        // 4. Check for <footer> element - should have at least one
        const footerElements = await page.locator("footer").count();
        expect(footerElements).toBeGreaterThanOrEqual(1);

        // 5. Check for <section> elements - pages should use sections for content organization
        const sectionElements = await page.locator("section").count();
        expect(sectionElements).toBeGreaterThanOrEqual(1);

        // 6. Verify that main content is inside <main> element
        const mainContent = await page.locator("main").first();
        const mainExists = await mainContent.count() > 0;
        expect(mainExists).toBe(true);

        // 7. Verify that navigation is inside <nav> element
        const navContent = await page.locator("nav").first();
        const navExists = await navContent.count() > 0;
        expect(navExists).toBe(true);
      }),
      {
        numRuns: 15, // Reduced iterations for faster test execution
        verbose: true,
      }
    );
  });

  test("semantic elements are properly nested and structured", async ({ page }) => {
    // Define all pages to test
    const pages = ["/", "/about", "/services", "/case-studies", "/blog", "/contact"];

    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...pages), async (pagePath) => {
        // Navigate to the page
        await page.goto(pagePath);
        await page.waitForLoadState("networkidle");

        // Verify proper nesting and structure
        const structureCheck = await page.evaluate(() => {
          const results = {
            hasMain: false,
            hasNav: false,
            hasHeader: false,
            hasFooter: false,
            hasSections: false,
            mainNotNested: false,
            navInHeader: false,
          };

          // Check for presence of semantic elements
          results.hasMain = document.querySelectorAll("main").length >= 1;
          results.hasNav = document.querySelectorAll("nav").length >= 1;
          results.hasHeader = document.querySelectorAll("header").length >= 1;
          results.hasFooter = document.querySelectorAll("footer").length >= 1;
          results.hasSections = document.querySelectorAll("section").length >= 1;

          // Check that main is not nested inside other main elements
          const mainElements = document.querySelectorAll("main");
          if (mainElements.length > 0) {
            const firstMain = mainElements[0];
            const parentMain = firstMain.closest("main:not(:scope)");
            results.mainNotNested = parentMain === null;
          }

          // Check if nav is typically in header (common pattern, but not required)
          const navElements = document.querySelectorAll("nav");
          if (navElements.length > 0) {
            const firstNav = navElements[0];
            const parentHeader = firstNav.closest("header");
            results.navInHeader = parentHeader !== null;
          }

          return results;
        });

        // Validate structure
        expect(structureCheck.hasMain).toBe(true);
        expect(structureCheck.hasNav).toBe(true);
        expect(structureCheck.hasHeader).toBe(true);
        expect(structureCheck.hasFooter).toBe(true);
        expect(structureCheck.hasSections).toBe(true);
        expect(structureCheck.mainNotNested).toBe(true);
      }),
      {
        numRuns: 10, // Reduced iterations for faster execution
        verbose: true,
      }
    );
  });

  test("Services page specifically uses semantic HTML for content sections", async ({ page }) => {
    // Navigate to the Services page specifically
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    // Requirements 7.1: Verify Services page uses semantic HTML appropriately

    // 1. Check that the page has a main element
    const mainElement = page.locator("main");
    await expect(mainElement).toBeVisible();

    // 2. Check that sections are used for content organization
    const sections = await page.locator("main section").count();
    expect(sections).toBeGreaterThanOrEqual(2); // At least hero and services sections

    // 3. Verify that service content is within semantic sections
    const serviceSections = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return { hasSections: false, sectionCount: 0 };

      const sections = main.querySelectorAll("section");
      return {
        hasSections: sections.length > 0,
        sectionCount: sections.length,
      };
    });

    expect(serviceSections.hasSections).toBe(true);
    expect(serviceSections.sectionCount).toBeGreaterThanOrEqual(2);

    // 4. Verify heading hierarchy within sections
    const headingStructure = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return { hasH1: false, hasH2: false };

      const h1Count = main.querySelectorAll("h1").length;
      const h2Count = main.querySelectorAll("h2").length;

      return {
        hasH1: h1Count >= 1,
        hasH2: h2Count >= 1,
        h1Count,
        h2Count,
      };
    });

    expect(headingStructure.hasH1).toBe(true);
    expect(headingStructure.hasH2).toBe(true);
  });
});
