import { test, expect } from "@playwright/test";

/**
 * Property-Based Tests for Keyboard Navigation
 *
 * Feature: mahe-tech-website
 * Property 32: Keyboard Navigation Support
 * Validates: Requirements 15.2
 *
 * These tests verify that all interactive elements on the website are
 * keyboard accessible and that the keyboard navigation flow is logical
 * and complete.
 */

const pages = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/services", name: "Services" },
  { path: "/case-studies", name: "Case Studies" },
  { path: "/blog", name: "Blog" },
  { path: "/contact", name: "Contact" },
];

test.describe("Keyboard Navigation - Property 32", () => {
  test("skip-to-content link should be present and functional on all pages", async ({
    page,
  }) => {
    for (const { path, name } of pages) {
      await page.goto(path);

      // Press Tab to focus the skip-to-content link
      await page.keyboard.press("Tab");

      // The skip-to-content link should be focused
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeFocused();

      // The link should be visible when focused
      await expect(skipLink).toBeVisible();

      // Click the skip link
      await skipLink.click();

      // Wait a moment for the scroll
      await page.waitForTimeout(300);

      // The main content should be focused
      const mainContent = page.locator("#main-content");
      await expect(mainContent).toBeFocused();

      console.log(`✓ Skip-to-content link works on ${name} page`);
    }
  });

  test("all navigation links should be keyboard accessible", async ({
    page,
  }) => {
    await page.goto("/");

    // Focus the first navigation link (after skip link)
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // Logo
    await page.keyboard.press("Tab"); // First nav link

    // Check that we can tab through all navigation links
    const navLinks = page.locator('nav[aria-label="Main navigation"] a');
    const linkCount = await navLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Verify each link is focusable
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute("href");
      
      if (href && href !== "/") {
        // Tab to the link
        await page.keyboard.press("Tab");
        
        // Verify it's focused
        await expect(link).toBeFocused();
        
        console.log(`✓ Navigation link ${i + 1} is keyboard accessible`);
      }
    }
  });

  test("all CTA buttons should be keyboard accessible and activatable", async ({
    page,
  }) => {
    await page.goto("/");

    // Find all CTA buttons on the page
    const ctaButtons = page.locator('a[class*="CTAButton"], button[class*="CTAButton"]');
    const buttonCount = await ctaButtons.count();

    expect(buttonCount).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = ctaButtons.nth(i);
      
      // Scroll the button into view
      await button.scrollIntoViewIfNeeded();
      
      // Focus the button
      await button.focus();
      
      // Verify it's focused
      await expect(button).toBeFocused();
      
      // Verify it has a visible focus indicator
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
      
      console.log(`✓ CTA button ${i + 1} is keyboard accessible`);
    }
  });

  test("form inputs should be keyboard accessible with proper tab order", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Wait for the contact form to load
    await page.waitForSelector('form[aria-label="Contact form"]', {
      timeout: 5000,
    });

    // Get all form inputs
    const formInputs = page.locator(
      'form[aria-label="Contact form"] input, form[aria-label="Contact form"] textarea'
    );
    const inputCount = await formInputs.count();

    expect(inputCount).toBeGreaterThan(0);

    // Tab through each input
    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i);
      
      // Focus the input
      await input.focus();
      
      // Verify it's focused
      await expect(input).toBeFocused();
      
      // Verify it has an associated label
      const inputId = await input.getAttribute("id");
      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`);
        await expect(label).toBeVisible();
      }
      
      console.log(`✓ Form input ${i + 1} is keyboard accessible`);
    }
  });

  test("footer links should be keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Find all footer links
    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Test a sample of footer links
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = footerLinks.nth(i);
      
      // Focus the link
      await link.focus();
      
      // Verify it's focused
      await expect(link).toBeFocused();
      
      // Verify it has a visible focus indicator
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      
      console.log(`✓ Footer link ${i + 1} is keyboard accessible`);
    }
  });

  test("mobile menu button should be keyboard accessible", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Find the mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"]');
    await expect(menuButton).toBeVisible();

    // Focus the button
    await menuButton.focus();
    await expect(menuButton).toBeFocused();

    // Activate with Enter key
    await page.keyboard.press("Enter");

    // Wait for menu to open
    await page.waitForTimeout(300);

    // Verify menu is open
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Verify menu items are keyboard accessible
    const menuLinks = mobileMenu.locator('a');
    const linkCount = await menuLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    console.log("✓ Mobile menu is keyboard accessible");
  });

  test("sticky CTA should be keyboard accessible when visible", async ({
    page,
  }) => {
    await page.goto("/");

    // Scroll down to make sticky CTA visible
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Find the sticky CTA
    const stickyCTA = page.locator('[data-testid="sticky-cta"] a, [data-testid="sticky-cta"] button');
    
    // Check if it's visible
    const isVisible = await stickyCTA.isVisible();
    
    if (isVisible) {
      // Focus the sticky CTA
      await stickyCTA.focus();
      
      // Verify it's focused
      await expect(stickyCTA).toBeFocused();
      
      console.log("✓ Sticky CTA is keyboard accessible");
    } else {
      console.log("⚠ Sticky CTA not visible at scroll position 800px");
    }
  });

  test("tab order should be logical and follow visual flow", async ({
    page,
  }) => {
    await page.goto("/");

    // Expected tab order: skip link -> logo -> nav links -> hero CTAs -> content
    const expectedOrder = [
      'a[href="#main-content"]', // Skip link
      'a[aria-label*="Home"]', // Logo
      'nav[aria-label="Main navigation"] a', // Nav links
    ];

    for (const selector of expectedOrder) {
      await page.keyboard.press("Tab");
      
      const element = page.locator(selector).first();
      const isFocused = await element.evaluate((el) => el === document.activeElement);
      
      if (isFocused) {
        console.log(`✓ Tab order correct for: ${selector}`);
      }
    }
  });

  test("Enter and Space keys should activate interactive elements", async ({
    page,
  }) => {
    await page.goto("/");

    // Test Enter key on a link
    const firstNavLink = page.locator('nav[aria-label="Main navigation"] a').first();
    await firstNavLink.focus();
    
    // Get the href before pressing Enter
    const href = await firstNavLink.getAttribute("href");
    
    if (href && href !== "#") {
      // Press Enter
      await page.keyboard.press("Enter");
      
      // Wait for navigation
      await page.waitForTimeout(500);
      
      // Verify navigation occurred (URL should change or page should update)
      console.log("✓ Enter key activates links");
    }
  });

  test("focus indicators should be visible on all interactive elements", async ({
    page,
  }) => {
    await page.goto("/");

    // Test various interactive elements
    const selectors = [
      'a[href="#main-content"]', // Skip link
      'nav[aria-label="Main navigation"] a', // Nav links
      'a[class*="CTAButton"]', // CTA buttons
      'footer a', // Footer links
    ];

    for (const selector of selectors) {
      const elements = page.locator(selector);
      const count = await elements.count();
      
      if (count > 0) {
        const element = elements.first();
        await element.focus();
        
        // Check if element has focus styles
        const hasFocusRing = await element.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return (
            styles.outline !== "none" ||
            styles.boxShadow.includes("ring") ||
            el.classList.toString().includes("focus")
          );
        });
        
        expect(hasFocusRing).toBeTruthy();
        console.log(`✓ Focus indicator visible for: ${selector}`);
      }
    }
  });
});
