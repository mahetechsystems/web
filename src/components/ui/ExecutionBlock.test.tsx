import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExecutionBlock } from "./ExecutionBlock";

describe("ExecutionBlock", () => {
  const mockProps = {
    title: "System Design",
    description: "We architect scalable systems that grow with your business.",
    outcomes: [
      "Clear technical roadmap",
      "Scalable architecture",
      "Reduced technical debt",
    ],
  };

  it("renders the title correctly", () => {
    render(<ExecutionBlock {...mockProps} />);
    expect(screen.getByText("System Design")).toBeInTheDocument();
  });

  it("renders the description correctly", () => {
    render(<ExecutionBlock {...mockProps} />);
    expect(
      screen.getByText("We architect scalable systems that grow with your business.")
    ).toBeInTheDocument();
  });

  it("renders all outcomes", () => {
    render(<ExecutionBlock {...mockProps} />);
    expect(screen.getByText("Clear technical roadmap")).toBeInTheDocument();
    expect(screen.getByText("Scalable architecture")).toBeInTheDocument();
    expect(screen.getByText("Reduced technical debt")).toBeInTheDocument();
  });

  it("renders the outcomes section header", () => {
    render(<ExecutionBlock {...mockProps} />);
    expect(screen.getByText("Key Outcomes")).toBeInTheDocument();
  });

  it("renders checkmark icons for each outcome", () => {
    const { container } = render(<ExecutionBlock {...mockProps} />);
    const checkmarks = container.querySelectorAll("svg");
    // Should have 3 checkmark icons (one per outcome)
    expect(checkmarks.length).toBe(3);
  });

  it("applies hover styles on mouse enter", () => {
    const { container } = render(<ExecutionBlock {...mockProps} />);
    const block = container.firstChild as HTMLElement;
    
    expect(block).toHaveClass("group");
    expect(block).toHaveClass("hover:border-[var(--color-secondary-blue)]");
    expect(block).toHaveClass("hover:shadow-lg");
  });

  it("applies staggered animation delay based on index", () => {
    const { container } = render(<ExecutionBlock {...mockProps} index={2} />);
    const block = container.firstChild as HTMLElement;
    
    expect(block).toHaveStyle({ transitionDelay: "300ms" });
  });

  it("renders with default index of 0 when not provided", () => {
    const { container } = render(<ExecutionBlock {...mockProps} />);
    const block = container.firstChild as HTMLElement;
    
    expect(block).toHaveStyle({ transitionDelay: "0ms" });
  });

  it("has proper accessibility structure with headings", () => {
    render(<ExecutionBlock {...mockProps} />);
    
    const mainHeading = screen.getByRole("heading", { level: 3 });
    expect(mainHeading).toHaveTextContent("System Design");
    
    const subHeading = screen.getByRole("heading", { level: 4 });
    expect(subHeading).toHaveTextContent("Key Outcomes");
  });

  it("renders outcomes in a list structure", () => {
    const { container } = render(<ExecutionBlock {...mockProps} />);
    const list = container.querySelector("ul");
    
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(3);
  });
});
