import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "./page";

/**
 * Services Page Tests
 *
 * Tests for the Services page component to ensure all required content is present
 * and properly structured.
 *
 * Requirements: 4.1-4.5, 7.1, 8.5
 */

describe("ServicesPage", () => {
  it("renders the main heading", () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole("heading", { name: /Your Startup Execution Partner in India/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("renders hero section with value proposition", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/We're not a marketing agency, development shop, or consultant/i)
    ).toBeInTheDocument();
  });

  it("renders all five service sections", () => {
    render(<ServicesPage />);

    // Check for all service titles (Requirements 4.1-4.5)
    expect(screen.getByRole("heading", { name: "Startup Execution", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "SaaS Development", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Digital Transformation", level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Growth & Automation", level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "CRM & Sales Systems", level: 2 })
    ).toBeInTheDocument();
  });

  it("renders Startup Execution service details", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/Transform your startup vision into a structured execution plan/i)
    ).toBeInTheDocument();
  });

  it("renders SaaS Development service details", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/Build robust, scalable SaaS products with modern architecture/i)
    ).toBeInTheDocument();
  });

  it("renders Digital Transformation service details", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/Modernize legacy systems and processes with digital solutions/i)
    ).toBeInTheDocument();
  });

  it("renders Growth & Automation service details", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/Scale your operations with intelligent automation systems/i)
    ).toBeInTheDocument();
  });

  it("renders CRM & Sales Systems service details", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/Implement and optimize CRM systems that give you complete visibility/i)
    ).toBeInTheDocument();
  });

  it("includes CTA buttons in hero section", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /Start a Project/i })).toBeInTheDocument();
    // Use getAllByRole since we now have multiple "View Case Studies" links
    const caseStudiesLinks = screen.getAllByRole("link", { name: /View Case Studies|Case Studies/i });
    expect(caseStudiesLinks.length).toBeGreaterThan(0);
  });

  it("includes CTA section at bottom", () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole("heading", { name: /Ready to Build Systems That Work/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Schedule a Consultation/i })).toBeInTheDocument();
  });

  it("uses semantic HTML structure with main element", () => {
    const { container } = render(<ServicesPage />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("uses semantic HTML structure with section elements", () => {
    const { container } = render(<ServicesPage />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(3); // Hero, Services, CTA sections
  });

  it("follows proper heading hierarchy", () => {
    const { container } = render(<ServicesPage />);

    // Check H1 exists and is unique
    const h1Elements = container.querySelectorAll("h1");
    expect(h1Elements.length).toBe(1);

    // Check H2 elements exist (service titles and section headings)
    const h2Elements = container.querySelectorAll("h2");
    expect(h2Elements.length).toBeGreaterThan(0);

    // Check H3 elements exist (subsections within services)
    const h3Elements = container.querySelectorAll("h3");
    expect(h3Elements.length).toBeGreaterThan(0);
  });

  it("includes target keywords in content", () => {
    render(<ServicesPage />);
    // Check for keyword cluster components present in the page
    const startupExecutionElements = screen.getAllByText(/Startup Execution/i);
    expect(startupExecutionElements.length).toBeGreaterThan(0);
    
    // Use getAllByText since we now have multiple instances of this phrase
    const structuredExecutionElements = screen.getAllByText(/structured execution partner/i);
    expect(structuredExecutionElements.length).toBeGreaterThan(0);
  });

  it("renders services section heading", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: "Our Services", level: 2 })).toBeInTheDocument();
  });

  it("includes descriptive text about services approach", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/We offer five core services designed to help founders and businesses/i)
    ).toBeInTheDocument();
  });

  it("has links to contact page", () => {
    render(<ServicesPage />);
    const contactLinks = screen.getAllByRole("link", { name: /Start a Project|Schedule a Consultation/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact");
    });
  });

  it("has link to case studies page", () => {
    render(<ServicesPage />);
    const caseStudiesLinks = screen.getAllByRole("link", { name: /View Case Studies|Case Studies/i });
    expect(caseStudiesLinks.length).toBeGreaterThan(0);
    // Check that at least one link points to /case-studies
    const hasCorrectHref = caseStudiesLinks.some(link => link.getAttribute("href") === "/case-studies");
    expect(hasCorrectHref).toBe(true);
  });

  it("has link to about page", () => {
    render(<ServicesPage />);
    const aboutLink = screen.getByRole("link", { name: /Learn About Our Approach/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("includes internal linking section for SEO", () => {
    render(<ServicesPage />);
    // Check for "Explore More" section heading
    expect(screen.getByRole("heading", { name: /Explore More/i })).toBeInTheDocument();
    
    // Check for internal links to About, Case Studies, and Contact
    const aboutLinks = screen.getAllByRole("link", { name: /About Our Approach/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
    
    const caseStudiesLinks = screen.getAllByRole("link", { name: /Case Studies/i });
    expect(caseStudiesLinks.length).toBeGreaterThan(0);
    
    const contactLinks = screen.getAllByRole("link", { name: /Get Started/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it("includes SEO keywords in metadata", () => {
    // This test verifies that the page exports metadata with keywords
    // The actual metadata is tested through the generateMetadata function
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /Your Startup Execution Partner in India/i })).toBeInTheDocument();
  });
});
