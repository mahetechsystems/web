import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "./ServiceCard";
import { type Service } from "@/types";

describe("ServiceCard", () => {
  const mockService: Service = {
    id: "test-service",
    title: "Test Service",
    slug: "test-service",
    description: "This is a test service description",
    longDescription: "This is a longer description of the test service with more details.",
    keyFeatures: [
      "Feature one with details",
      "Feature two with benefits",
      "Feature three with outcomes",
    ],
    outcomes: [
      "Outcome one that delivers value",
      "Outcome two that shows results",
    ],
    targetKeywords: ["test", "service", "keywords"],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Test Service",
      description: "Test service description",
      provider: {
        "@type": "Organization",
        name: "Test Organization",
        url: "https://test.com",
      },
      areaServed: "India",
      serviceType: "Test Service Type",
    },
  };

  it("renders service title correctly", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByRole("heading", { name: "Test Service", level: 2 })).toBeInTheDocument();
  });

  it("renders short description", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("This is a test service description")).toBeInTheDocument();
  });

  it("renders long description", () => {
    render(<ServiceCard service={mockService} />);
    expect(
      screen.getByText("This is a longer description of the test service with more details.")
    ).toBeInTheDocument();
  });

  it("renders all key features", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Feature one with details")).toBeInTheDocument();
    expect(screen.getByText("Feature two with benefits")).toBeInTheDocument();
    expect(screen.getByText("Feature three with outcomes")).toBeInTheDocument();
  });

  it("renders key features section heading", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByRole("heading", { name: "What We Deliver", level: 3 })).toBeInTheDocument();
  });

  it("renders all outcomes", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Outcome one that delivers value")).toBeInTheDocument();
    expect(screen.getByText("Outcome two that shows results")).toBeInTheDocument();
  });

  it("renders outcomes section heading", () => {
    render(<ServiceCard service={mockService} />);
    expect(
      screen.getByRole("heading", { name: "Expected Outcomes", level: 3 })
    ).toBeInTheDocument();
  });

  it("uses semantic HTML with article element", () => {
    const { container } = render(<ServiceCard service={mockService} />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("includes id attribute matching service slug", () => {
    const { container } = render(<ServiceCard service={mockService} />);
    const article = container.querySelector("article");
    expect(article).toHaveAttribute("id", "test-service");
  });

  it("does not render key features section when empty", () => {
    const serviceWithoutFeatures = { ...mockService, keyFeatures: [] };
    render(<ServiceCard service={serviceWithoutFeatures} />);
    expect(screen.queryByRole("heading", { name: "What We Deliver" })).not.toBeInTheDocument();
  });

  it("does not render outcomes section when empty", () => {
    const serviceWithoutOutcomes = { ...mockService, outcomes: [] };
    render(<ServiceCard service={serviceWithoutOutcomes} />);
    expect(
      screen.queryByRole("heading", { name: "Expected Outcomes" })
    ).not.toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<ServiceCard service={mockService} className="custom-class" />);
    const article = container.querySelector("article");
    expect(article).toHaveClass("custom-class");
  });

  it("has hover effect classes for interactivity", () => {
    const { container } = render(<ServiceCard service={mockService} />);
    const article = container.querySelector("article");
    expect(article).toHaveClass("hover:border-[var(--color-secondary-blue)]");
    expect(article).toHaveClass("hover:shadow-lg");
  });
});
