import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

/**
 * Unit tests for Home page hero section
 * 
 * Tests verify:
 * - Hero section renders with correct content
 * - Primary and secondary CTAs are present above the fold
 * - Headline and subheadline are displayed
 * 
 * Requirements: 3.1, 3.6, 1.1
 */

describe("Home Page Hero Section", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    
    const headline = screen.getByRole("heading", {
      name: /your structured execution partner for startup success/i,
      level: 1,
    });
    
    expect(headline).toBeInTheDocument();
  });

  it("renders the hero subheadline", () => {
    render(<Home />);
    
    const subheadline = screen.getByText(
      /we don't just build software/i
    );
    
    expect(subheadline).toBeInTheDocument();
  });

  it("renders primary CTA button with correct link", () => {
    render(<Home />);
    
    const primaryCTA = screen.getByRole("link", {
      name: /schedule a call/i,
    });
    
    expect(primaryCTA).toBeInTheDocument();
    expect(primaryCTA).toHaveAttribute("href", "/contact");
  });

  it("renders secondary CTA button with correct link", () => {
    render(<Home />);
    
    const secondaryCTA = screen.getByRole("link", {
      name: /explore services/i,
    });
    
    expect(secondaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toHaveAttribute("href", "/services");
  });

  it("renders both CTAs above the fold in hero section", () => {
    render(<Home />);
    
    const primaryCTA = screen.getByRole("link", { name: /schedule a call/i });
    const secondaryCTA = screen.getByRole("link", { name: /explore services/i });
    
    // Both CTAs should be present
    expect(primaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toBeInTheDocument();
    
    // Verify they're within the hero section (have gradient background parent)
    const heroSection = screen.getByRole("heading", { level: 1 }).closest("section");
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toContainElement(primaryCTA);
    expect(heroSection).toContainElement(secondaryCTA);
  });

  it("applies gradient background to hero section", () => {
    render(<Home />);
    
    const heroSection = screen.getByRole("heading", { level: 1 }).closest("section");
    
    expect(heroSection).toHaveClass("bg-gradient-to-br");
  });
});

/**
 * Unit tests for Home page problem section
 * 
 * Tests verify:
 * - Problem section renders with correct heading
 * - All 4 problem cards are displayed
 * - Each card has title, description, and icon
 * - Responsive grid layout is applied
 * 
 * Requirements: 3.2, 10.1
 */

describe("Home Page Problem Section", () => {
  it("renders the problem section heading", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", {
      name: /the founder's execution gap/i,
      level: 2,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it("renders the problem section description", () => {
    render(<Home />);
    
    const description = screen.getByText(
      /you have the vision\. you know what needs to be done/i
    );
    
    expect(description).toBeInTheDocument();
  });

  it("renders all 4 problem cards", () => {
    render(<Home />);
    
    // Check for all 4 problem card titles
    expect(screen.getByText("Scattered Priorities")).toBeInTheDocument();
    expect(screen.getByText("Technical Debt")).toBeInTheDocument();
    expect(screen.getByText("Execution Bottlenecks")).toBeInTheDocument();
    expect(screen.getByText("No Measurable Progress")).toBeInTheDocument();
  });

  it("renders problem card descriptions", () => {
    render(<Home />);
    
    // Check for at least one complete description
    expect(
      screen.getByText(/too many ideas, not enough focus/i)
    ).toBeInTheDocument();
  });

  it("applies responsive grid layout to problem cards", () => {
    const { container } = render(<Home />);
    
    // Find the grid container by looking for the element with grid classes
    const gridContainer = container.querySelector(".grid");
    
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("md:grid-cols-2", "lg:grid-cols-4");
  });

  it("renders icons for each problem card", () => {
    const { container } = render(<Home />);
    
    // Count SVG elements within problem cards (excluding hero section SVGs)
    const problemSection = screen.getByRole("heading", {
      name: /the founder's execution gap/i,
    }).closest("section");
    
    const svgs = problemSection?.querySelectorAll("svg");
    
    // Should have 4 SVG icons (one per problem card)
    expect(svgs?.length).toBeGreaterThanOrEqual(4);
  });
});

/**
 * Unit tests for Home page execution blocks section
 * 
 * Tests verify:
 * - Execution blocks section renders with correct heading
 * - All 3 execution blocks are displayed
 * - Each block has title, description, and outcomes
 * - Responsive grid layout is applied
 * - Hover effects are present
 * 
 * Requirements: 3.3, 10.2
 */

describe("Home Page Execution Blocks Section", () => {
  it("renders the execution blocks section heading", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", {
      name: /how we execute/i,
      level: 2,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it("renders the execution blocks section description", () => {
    render(<Home />);
    
    const description = screen.getByText(
      /we bring structure to chaos/i
    );
    
    expect(description).toBeInTheDocument();
  });

  it("renders all 3 execution blocks", () => {
    render(<Home />);
    
    // Check for all 3 execution block titles (using getAllByRole since SystemFramework also has "System Design")
    const systemDesignHeadings = screen.getAllByRole("heading", { name: /^system design$/i, level: 3 });
    expect(systemDesignHeadings.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /^structured execution$/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^measurable outcomes$/i, level: 3 })).toBeInTheDocument();
  });

  it("renders execution block descriptions", () => {
    render(<Home />);
    
    // Check for descriptions
    expect(
      screen.getByText(/we architect scalable systems that grow with your business/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we break down complex projects into manageable phases/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we define success metrics upfront and track them relentlessly/i)
    ).toBeInTheDocument();
  });

  it("renders outcomes for each execution block", () => {
    render(<Home />);
    
    // Check for sample outcomes from each block
    expect(screen.getByText(/clear technical roadmap aligned with business goals/i)).toBeInTheDocument();
    expect(screen.getByText(/predictable delivery timelines/i)).toBeInTheDocument();
    expect(screen.getByText(/data-driven decision making/i)).toBeInTheDocument();
  });

  it("renders 'Key Outcomes' label for each block", () => {
    render(<Home />);
    
    // Should have 3 "Key Outcomes" labels (one per block)
    const keyOutcomesLabels = screen.getAllByText(/key outcomes/i);
    expect(keyOutcomesLabels).toHaveLength(3);
  });

  it("applies responsive grid layout to execution blocks", () => {
    const { container } = render(<Home />);
    
    // Find the execution blocks section
    const executionSection = screen.getByRole("heading", {
      name: /how we execute/i,
    }).closest("section");
    
    // Find the grid container within the execution section
    const gridContainer = executionSection?.querySelector(".grid");
    
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("md:grid-cols-2", "lg:grid-cols-3");
  });

  it("applies hover effect classes to execution blocks", () => {
    const { container } = render(<Home />);
    
    // Find the execution blocks section
    const executionSection = screen.getByRole("heading", {
      name: /how we execute/i,
    }).closest("section");
    
    // Find all execution block containers (they have the group class for hover effects)
    const blocks = executionSection?.querySelectorAll(".group");
    
    // Should have 3 execution blocks
    expect(blocks?.length).toBe(3);
    
    // Each block should have hover classes
    blocks?.forEach((block) => {
      expect(block).toHaveClass("hover:border-[var(--color-secondary-blue)]");
      expect(block).toHaveClass("hover:shadow-lg");
    });
  });

  it("renders checkmark icons for outcomes", () => {
    const { container } = render(<Home />);
    
    // Find the execution blocks section
    const executionSection = screen.getByRole("heading", {
      name: /how we execute/i,
    }).closest("section");
    
    // Count SVG elements within execution blocks (checkmarks)
    const svgs = executionSection?.querySelectorAll("svg");
    
    // Should have 9 SVG icons (3 outcomes per block × 3 blocks)
    expect(svgs?.length).toBe(9);
  });

  it("applies gradient background to execution blocks section", () => {
    render(<Home />);
    
    const executionSection = screen.getByRole("heading", {
      name: /how we execute/i,
    }).closest("section");
    
    expect(executionSection).toHaveClass("bg-gradient-to-b");
  });
});

/**
 * Unit tests for Home page case examples section
 * 
 * Tests verify:
 * - Case examples section renders with correct heading
 * - All 3 featured case studies are displayed
 * - Each case card shows client, problem, and outcome
 * - Links to full case studies are present
 * - "View All Case Studies" CTA is present
 * 
 * Requirements: 3.5
 */

describe("Home Page Case Examples Section", () => {
  it("renders the case examples section heading", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", {
      name: /proven results, real impact/i,
      level: 2,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it("renders the case examples section description", () => {
    render(<Home />);
    
    const description = screen.getByText(
      /we measure success by outcomes, not outputs/i
    );
    
    expect(description).toBeInTheDocument();
  });

  it("renders all 3 featured case studies", () => {
    render(<Home />);
    
    // Check for all 3 case study titles
    expect(screen.getByText("SaaS Platform Transformation")).toBeInTheDocument();
    expect(screen.getByText("CRM & Sales Automation")).toBeInTheDocument();
    expect(screen.getByText("Digital Transformation for Retail")).toBeInTheDocument();
  });

  it("renders client names for each case study", () => {
    render(<Home />);
    
    // Check for client names
    expect(screen.getByText("FinTech Startup")).toBeInTheDocument();
    expect(screen.getByText("B2B Services Company")).toBeInTheDocument();
    expect(screen.getByText("Multi-Brand Retailer")).toBeInTheDocument();
  });

  it("renders challenge section for each case study", () => {
    render(<Home />);
    
    // Should have 3 "Challenge" labels (one per case study)
    const challengeLabels = screen.getAllByText(/challenge/i);
    expect(challengeLabels).toHaveLength(3);
  });

  it("renders outcome section for each case study", () => {
    render(<Home />);
    
    // Should have 3 "Outcome" labels (one per case study)
    const outcomeLabels = screen.getAllByText(/^outcome$/i);
    expect(outcomeLabels).toHaveLength(3);
  });

  it("renders problem descriptions for case studies", () => {
    render(<Home />);
    
    // Check for sample problem descriptions
    expect(
      screen.getByText(/struggling with a monolithic architecture/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sales team spending 60% of time on manual data entry/i)
    ).toBeInTheDocument();
  });

  it("renders outcome descriptions for case studies", () => {
    render(<Home />);
    
    // Check for sample outcome descriptions
    expect(
      screen.getByText(/reduced onboarding time to 2 hours/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/automated 80% of manual tasks/i)
    ).toBeInTheDocument();
  });

  it("renders links to full case studies", () => {
    render(<Home />);
    
    // Should have 3 "Read Full Case Study" links
    const caseStudyLinks = screen.getAllByRole("link", {
      name: /read full case study/i,
    });
    
    expect(caseStudyLinks).toHaveLength(3);
    
    // Verify links point to correct case study pages
    expect(caseStudyLinks[0]).toHaveAttribute("href", "/case-studies/saas-platform-transformation");
    expect(caseStudyLinks[1]).toHaveAttribute("href", "/case-studies/crm-automation-system");
    expect(caseStudyLinks[2]).toHaveAttribute("href", "/case-studies/digital-transformation-retail");
  });

  it("renders 'View All Case Studies' CTA button", () => {
    render(<Home />);
    
    const viewAllCTA = screen.getByRole("link", {
      name: /view all case studies/i,
    });
    
    expect(viewAllCTA).toBeInTheDocument();
    expect(viewAllCTA).toHaveAttribute("href", "/case-studies");
  });

  it("applies responsive grid layout to case examples", () => {
    const { container } = render(<Home />);
    
    // Find the case examples section
    const caseExamplesSection = screen.getByRole("heading", {
      name: /proven results, real impact/i,
    }).closest("section");
    
    // Find the grid container within the case examples section
    const gridContainer = caseExamplesSection?.querySelector(".grid");
    
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("md:grid-cols-2", "lg:grid-cols-3");
  });

  it("renders images for each case study", () => {
    render(<Home />);
    
    // Check for case study images by alt text
    expect(
      screen.getByAltText(/saas platform dashboard showing improved performance metrics/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/crm automation dashboard with sales pipeline visualization/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/retail analytics dashboard showing unified business metrics/i)
    ).toBeInTheDocument();
  });
});

/**
 * Unit tests for Home page final CTA section
 * 
 * Tests verify:
 * - Final CTA section renders with correct heading
 * - CTA button links to contact page
 * - Gradient background is applied
 * 
 * Requirements: 3.6
 */

describe("Home Page Final CTA Section", () => {
  it("renders the final CTA section heading", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", {
      name: /ready to transform your execution/i,
      level: 2,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it("renders the final CTA section description", () => {
    render(<Home />);
    
    const description = screen.getByText(
      /let's discuss how structured execution can help you achieve your goals/i
    );
    
    expect(description).toBeInTheDocument();
  });

  it("renders final CTA button with correct link", () => {
    render(<Home />);
    
    const finalCTA = screen.getByRole("link", {
      name: /schedule a free consultation/i,
    });
    
    expect(finalCTA).toBeInTheDocument();
    expect(finalCTA).toHaveAttribute("href", "/contact");
  });

  it("applies gradient background to final CTA section", () => {
    render(<Home />);
    
    const finalCTASection = screen.getByRole("heading", {
      name: /ready to transform your execution/i,
    }).closest("section");
    
    expect(finalCTASection).toHaveClass("bg-gradient-to-br");
  });
});
