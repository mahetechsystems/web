import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseExampleCard, CaseExample } from "./CaseExampleCard";

describe("CaseExampleCard", () => {
  const mockCaseExample: CaseExample = {
    slug: "test-case-study",
    title: "Revolutionizing E-commerce Platform",
    client: "TechCorp Inc.",
    problem: "Legacy system causing slow checkout and high cart abandonment rates",
    outcome: "40% increase in conversion rate, 60% faster checkout process",
    image: {
      src: "/images/case-studies/test-case.jpg",
      alt: "TechCorp e-commerce platform",
      width: 600,
      height: 400,
    },
  };

  it("renders case example card with all content", () => {
    render(<CaseExampleCard caseExample={mockCaseExample} index={0} />);

    expect(screen.getByText("TechCorp Inc.")).toBeInTheDocument();
    expect(screen.getByText("Revolutionizing E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();
    expect(
      screen.getByText(/Legacy system causing slow checkout/)
    ).toBeInTheDocument();
    expect(screen.getByText("Outcome")).toBeInTheDocument();
    expect(screen.getByText(/40% increase in conversion rate/)).toBeInTheDocument();
  });

  it("renders link to full case study", () => {
    render(<CaseExampleCard caseExample={mockCaseExample} index={0} />);

    const link = screen.getByRole("link", { name: /Read Full Case Study/i });
    expect(link).toHaveAttribute("href", "/case-studies/test-case-study");
  });

  it("renders image with correct attributes", () => {
    render(<CaseExampleCard caseExample={mockCaseExample} index={0} />);

    const image = screen.getByAltText("TechCorp e-commerce platform");
    expect(image).toBeInTheDocument();
  });

  it("applies animation delay based on index", () => {
    const { container } = render(<CaseExampleCard caseExample={mockCaseExample} index={2} />);

    const article = container.querySelector("article");
    expect(article).toHaveStyle({ animationDelay: "200ms" });
  });

  it("renders with semantic HTML structure", () => {
    render(<CaseExampleCard caseExample={mockCaseExample} index={0} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: "Revolutionizing E-commerce Platform",
    });
    expect(heading).toBeInTheDocument();
  });
});
