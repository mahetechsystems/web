import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SystemFramework, type FrameworkStep } from "./SystemFramework";

describe("SystemFramework", () => {
  const mockSteps: FrameworkStep[] = [
    {
      number: 1,
      title: "Discovery & Analysis",
      description: "We start by understanding your business goals, technical constraints, and success metrics.",
    },
    {
      number: 2,
      title: "System Design",
      description: "We architect a scalable solution with clear documentation and technical specifications.",
    },
    {
      number: 3,
      title: "Phased Execution",
      description: "We build in structured phases with regular checkpoints and transparent progress tracking.",
    },
    {
      number: 4,
      title: "Measurement & Optimization",
      description: "We track outcomes, gather data, and continuously optimize for better results.",
    },
  ];

  it("renders the framework title", () => {
    render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    expect(screen.getByText("Our Execution Framework")).toBeInTheDocument();
  });

  it("renders all framework steps", () => {
    render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    mockSteps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      expect(screen.getByText(step.number.toString())).toBeInTheDocument();
    });
  });

  it("renders steps with correct numbers", () => {
    render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders SVG connection lines", () => {
    const { container } = render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    // Should have n-1 lines for n steps
    const lines = container.querySelectorAll("line");
    expect(lines).toHaveLength(mockSteps.length - 1);
  });

  it("renders with empty steps array", () => {
    render(
      <SystemFramework
        title="Our Execution Framework"
        steps={[]}
      />
    );

    expect(screen.getByText("Our Execution Framework")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    // Check for gradient circles
    const circles = container.querySelectorAll(".bg-gradient-to-br");
    expect(circles.length).toBeGreaterThan(0);

    // Check for decorative gradient bars
    const gradientBars = container.querySelectorAll(".bg-gradient-to-b");
    expect(gradientBars.length).toBeGreaterThan(0);
  });

  it("renders step content cards with hover effects", () => {
    const { container } = render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    const cards = container.querySelectorAll(".rounded-lg.border");
    expect(cards.length).toBe(mockSteps.length);

    // Each card should have hover transition classes
    cards.forEach((card) => {
      expect(card.className).toContain("transition-all");
      expect(card.className).toContain("hover:border-[var(--color-secondary-blue)]");
    });
  });

  it("alternates step layout (left-right pattern)", () => {
    const { container } = render(
      <SystemFramework
        title="Our Execution Framework"
        steps={mockSteps}
      />
    );

    const stepContainers = container.querySelectorAll(".flex.items-center.gap-8");
    
    // First step should be flex-row (even index)
    expect(stepContainers[0].className).toContain("flex-row");
    expect(stepContainers[0].className).not.toContain("flex-row-reverse");

    // Second step should be flex-row-reverse (odd index)
    expect(stepContainers[1].className).toContain("flex-row-reverse");
  });

  it("renders with single step", () => {
    const singleStep: FrameworkStep[] = [
      {
        number: 1,
        title: "Single Step",
        description: "This is a single step framework.",
      },
    ];

    render(
      <SystemFramework
        title="Simple Framework"
        steps={singleStep}
      />
    );

    expect(screen.getByText("Single Step")).toBeInTheDocument();
    expect(screen.getByText("This is a single step framework.")).toBeInTheDocument();
  });
});
