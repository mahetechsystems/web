import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage, { metadata } from "./page";

/**
 * Unit tests for About page
 *
 * Validates: Requirements 20.1, 20.2, 20.3, 20.4, 20.5, 7.4, 7.5, 7.6, 7.7
 */

describe("AboutPage", () => {
  it("renders the page hero section with main heading", () => {
    render(<AboutPage />);

    const heading = screen.getByRole("heading", {
      name: /Built on Systems Thinking, Driven by Execution/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it("includes founder story section", () => {
    render(<AboutPage />);

    // Check for founder story heading
    const storyHeading = screen.getByRole("heading", {
      name: /The Story Behind Mahe Tech Systems/i,
    });
    expect(storyHeading).toBeInTheDocument();

    // Check for key story content
    expect(
      screen.getByText(/most startups don't fail because of bad ideas/i)
    ).toBeInTheDocument();
  });

  it("includes founder credentials and background section", () => {
    render(<AboutPage />);

    // Check for credentials heading
    const credentialsHeading = screen.getByRole("heading", {
      name: /Background & Expertise/i,
    });
    expect(credentialsHeading).toBeInTheDocument();

    // Check for technical foundation
    expect(
      screen.getByText(/10\+ years in software architecture/i)
    ).toBeInTheDocument();

    // Check for business acumen
    expect(screen.getByText(/Advised 50\+ startups/i)).toBeInTheDocument();
  });

  it("includes vision section", () => {
    render(<AboutPage />);

    // Check for vision heading
    const visionHeading = screen.getByRole("heading", {
      name: /Our Vision/i,
    });
    expect(visionHeading).toBeInTheDocument();

    // Check for vision content
    expect(
      screen.getByText(/most trusted execution partner for ambitious founders/i)
    ).toBeInTheDocument();
  });

  it("includes mission section", () => {
    render(<AboutPage />);

    // Check for mission heading
    const missionHeading = screen.getByRole("heading", {
      name: /Our Mission/i,
    });
    expect(missionHeading).toBeInTheDocument();

    // Check for mission content
    expect(
      screen.getByText(/empower founders with structured execution systems/i)
    ).toBeInTheDocument();
  });

  it("includes systems thinking philosophy section", () => {
    render(<AboutPage />);

    // Check for philosophy heading
    const philosophyHeading = screen.getByRole("heading", {
      name: /Our Systems Thinking Philosophy/i,
    });
    expect(philosophyHeading).toBeInTheDocument();

    // Check for all 5 philosophy points
    expect(
      screen.getByRole("heading", { name: /1\. Everything is a System/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /2\. Structure Enables Speed/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /3\. Measure What Matters/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /4\. Execution is Everything/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /5\. Scalability by Design/i })
    ).toBeInTheDocument();
  });

  it("includes CTA button linking to contact page", () => {
    render(<AboutPage />);

    const ctaButton = screen.getByRole("link", {
      name: /Schedule a Consultation/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/contact");
  });

  it("uses semantic HTML structure", () => {
    const { container } = render(<AboutPage />);

    // Check for semantic sections
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);

    // Check for proper heading hierarchy
    const h1 = container.querySelector("h1");
    const h2s = container.querySelectorAll("h2");
    const h3s = container.querySelectorAll("h3");

    expect(h1).toBeInTheDocument();
    expect(h2s.length).toBeGreaterThan(0);
    expect(h3s.length).toBeGreaterThan(0);
  });

  it("has responsive layout classes", () => {
    const { container } = render(<AboutPage />);

    // Check for responsive container classes
    const containers = container.querySelectorAll(".container");
    expect(containers.length).toBeGreaterThan(0);

    // Check for responsive grid classes
    const grids = container.querySelectorAll('[class*="grid"]');
    expect(grids.length).toBeGreaterThan(0);
  });
});

/**
 * SEO Metadata Tests
 *
 * Validates: Requirements 7.4, 7.5, 7.6, 7.7
 */
describe("AboutPage SEO Metadata", () => {
  it("has unique title tag", () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.title).toContain("About Us");
    expect(metadata.title).toContain("Mahe Tech Systems");
  });

  it("has unique meta description", () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toContain("Mahe Tech Systems");
    expect(metadata.description).toContain("structured execution");
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(50);
    expect((metadata.description as string).length).toBeLessThan(160);
  });

  it("has canonical URL configured", () => {
    expect(metadata.alternates?.canonical).toBeDefined();
    expect(metadata.alternates?.canonical).toContain("/about");
  });

  it("has OpenGraph tags configured", () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBeDefined();
    expect(metadata.openGraph?.description).toBeDefined();
    expect(metadata.openGraph?.url).toBeDefined();
    expect(metadata.openGraph?.siteName).toBe("Mahe Tech Systems");
    expect(metadata.openGraph?.images).toBeDefined();
    expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
    
    // Check type through the metadata object structure
    const ogData = metadata.openGraph as any;
    expect(ogData?.type).toBe("website");
  });

  it("has Twitter Card tags configured", () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.title).toBeDefined();
    expect(metadata.twitter?.description).toBeDefined();
    expect(metadata.twitter?.images).toBeDefined();
    
    // Check card type through the metadata object structure
    const twitterData = metadata.twitter as any;
    expect(twitterData?.card).toBe("summary_large_image");
  });

  it("has relevant keywords", () => {
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords)).toBe(true);
    const keywords = metadata.keywords as string[];
    expect(keywords.length).toBeGreaterThan(0);
    expect(keywords.some((k) => k.includes("execution"))).toBe(true);
  });

  it("includes structured data scripts", () => {
    const { container } = render(<AboutPage />);

    // Check for JSON-LD script tags
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    // Parse and validate the structured data
    const scriptContent = scripts[0].textContent;
    expect(scriptContent).toBeTruthy();

    if (scriptContent) {
      const structuredData = JSON.parse(scriptContent);

      // Should be an array with Person and Organization schemas
      expect(Array.isArray(structuredData)).toBe(true);
      expect(structuredData.length).toBe(2);

      // Check for Person schema
      const personSchema = structuredData.find((s: any) => s["@type"] === "Person");
      expect(personSchema).toBeDefined();
      expect(personSchema?.["@context"]).toBe("https://schema.org");
      expect(personSchema?.name).toBeDefined();
      expect(personSchema?.jobTitle).toBeDefined();
      expect(personSchema?.description).toBeDefined();

      // Check for Organization schema
      const orgSchema = structuredData.find((s: any) => s["@type"] === "Organization");
      expect(orgSchema).toBeDefined();
      expect(orgSchema?.["@context"]).toBe("https://schema.org");
      expect(orgSchema?.name).toBe("Mahe Tech Systems");
      expect(orgSchema?.url).toBeDefined();
    }
  });
});
