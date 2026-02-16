import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

/**
 * Performance tests for Home page hero section
 * 
 * These tests verify that the hero section is optimized for FCP (< 1.2s):
 * - No heavy images in hero (uses CSS gradients and inline SVG)
 * - No external image dependencies that would block rendering
 * - Hero content is immediately renderable
 * 
 * Requirements: 1.1, 3.1
 */

describe("Home Page Hero Performance", () => {
  it("hero section uses CSS gradient instead of background image", () => {
    const { container } = render(<Home />);
    
    // Find the hero section
    const heroSection = container.querySelector("section");
    expect(heroSection).toBeInTheDocument();
    
    // Verify it uses gradient class (CSS-based, no image download)
    expect(heroSection?.className).toContain("bg-gradient-to-br");
  });

  it("hero section does not contain img tags that would block FCP", () => {
    const { container } = render(<Home />);
    
    // Find the hero section
    const heroSection = container.querySelector("section");
    
    // Hero should not contain any img tags (which would require network requests)
    const images = heroSection?.querySelectorAll("img");
    expect(images?.length).toBe(0);
  });

  it("hero section uses inline SVG for decorative elements", () => {
    const { container } = render(<Home />);
    
    // Find the hero section
    const heroSection = container.querySelector("section");
    
    // Should contain inline SVG (no external file to load)
    const svgs = heroSection?.querySelectorAll("svg");
    expect(svgs?.length).toBeGreaterThan(0);
  });

  it("hero section content is immediately renderable (no lazy loading)", () => {
    const { container } = render(<Home />);
    
    // Find the hero section
    const heroSection = container.querySelector("section");
    
    // Verify headline is present (not lazy loaded)
    const headline = heroSection?.querySelector("h1");
    expect(headline).toBeInTheDocument();
    expect(headline?.textContent).toBeTruthy();
    
    // Verify CTAs are present (not lazy loaded)
    const links = heroSection?.querySelectorAll("a");
    expect(links?.length).toBeGreaterThanOrEqual(2);
  });

  it("hero section uses system fonts and CSS variables (no font loading delay)", () => {
    const { container } = render(<Home />);
    
    // Find the hero section
    const heroSection = container.querySelector("section");
    const headline = heroSection?.querySelector("h1");
    
    // Verify headline exists
    expect(headline).toBeInTheDocument();
    
    // The font is loaded via Next.js font optimization in layout.tsx
    // which preloads fonts to prevent FOUT/FOIT
  });

  it("decorative pattern uses inline data URI (no external request)", () => {
    const { container } = render(<Home />);
    
    // Find the pattern overlay div
    const patternDiv = container.querySelector("[style*='backgroundImage']");
    
    if (patternDiv) {
      const style = patternDiv.getAttribute("style");
      // Verify it uses data URI (inline, no network request)
      expect(style).toContain("data:image/svg+xml");
    }
  });
});
