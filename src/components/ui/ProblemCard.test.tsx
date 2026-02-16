import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProblemCard } from "./ProblemCard";

describe("ProblemCard", () => {
  const mockIcon = <svg data-testid="test-icon" />;

  it("renders title, description, and icon", () => {
    render(
      <ProblemCard
        title="Test Problem"
        description="Test description"
        icon={mockIcon}
      />
    );

    expect(screen.getByText("Test Problem")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(
      <ProblemCard
        title="Test Problem"
        description="Test description"
        icon={mockIcon}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("rounded-lg", "border", "bg-white", "p-6");
  });

  it("applies staggered animation delay based on index", () => {
    const { container } = render(
      <ProblemCard
        title="Test Problem"
        description="Test description"
        icon={mockIcon}
        index={2}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ transitionDelay: "300ms" });
  });

  it("has default index of 0 when not provided", () => {
    const { container } = render(
      <ProblemCard
        title="Test Problem"
        description="Test description"
        icon={mockIcon}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ transitionDelay: "0ms" });
  });
});
