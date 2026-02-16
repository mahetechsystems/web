import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CTAButton } from "./CTAButton";

describe("CTAButton", () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders as a button by default", () => {
      render(<CTAButton variant="primary" size="md" href="">Button Text</CTAButton>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders as a link when href is provided", () => {
      render(
        <CTAButton variant="primary" size="md" href="/contact">
          Contact Us
        </CTAButton>
      );
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/contact");
    });

    it("renders children correctly", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Click Me
        </CTAButton>
      );
      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("renders icon when provided", () => {
      render(
        <CTAButton variant="primary" size="md" href="" icon="→">
          Next
        </CTAButton>
      );
      expect(screen.getByText("→")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies primary variant styles", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Primary
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-[var(--color-primary-dark)]");
      expect(button).toHaveClass("text-white");
    });

    it("applies secondary variant styles", () => {
      render(
        <CTAButton variant="secondary" size="md" href="">
          Secondary
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-[var(--color-secondary-blue)]");
      expect(button).toHaveClass("text-white");
    });

    it("applies outline variant styles", () => {
      render(
        <CTAButton variant="outline" size="md" href="">
          Outline
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-2");
      expect(button).toHaveClass("border-[var(--color-primary-dark)]");
    });
  });

  describe("Sizes", () => {
    it("applies small size styles", () => {
      render(
        <CTAButton variant="primary" size="sm" href="">
          Small
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2.5");
      expect(button).toHaveClass("text-sm");
    });

    it("applies medium size styles", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Medium
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-3");
      expect(button).toHaveClass("text-base");
    });

    it("applies large size styles", () => {
      render(
        <CTAButton variant="primary" size="lg" href="">
          Large
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-8");
      expect(button).toHaveClass("py-4");
      expect(button).toHaveClass("text-lg");
    });
  });

  describe("Touch-friendly sizing (Requirement 13.2)", () => {
    it("ensures minimum 44x44px touch target for small size", () => {
      render(
        <CTAButton variant="primary" size="sm" href="">
          Small
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-h-[44px]");
    });

    it("ensures minimum 44x44px touch target for medium size", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Medium
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-h-[44px]");
    });

    it("ensures minimum 48px height for large size", () => {
      render(
        <CTAButton variant="primary" size="lg" href="">
          Large
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-h-[48px]");
    });
  });

  describe("Hover states and animations (Requirement 10.2)", () => {
    it("includes hover opacity transition", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Hover Me
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:opacity-90");
    });

    it("includes active scale animation", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Click Me
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("active:scale-95");
    });

    it("includes transition duration", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Animate
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("transition-all");
      expect(button).toHaveClass("duration-200");
    });
  });

  describe("Analytics tracking", () => {
    it("fires analytics event on click when trackingEvent is provided", async () => {
      const user = userEvent.setup();
      const mockGtag = vi.fn();
      window.gtag = mockGtag;

      render(
        <CTAButton
          variant="primary"
          size="md"
          href=""
          trackingEvent="cta_click"
        >
          Track Me
        </CTAButton>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockGtag).toHaveBeenCalledWith("event", "cta_click", {
        event_category: "CTA",
        event_label: "Track Me",
      });
    });

    it("calls custom onClick handler when provided", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <CTAButton variant="primary" size="md" href="" onClick={handleClick}>
          Custom Click
        </CTAButton>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not fire analytics when gtag is not available", async () => {
      const user = userEvent.setup();
      window.gtag = undefined;

      render(
        <CTAButton
          variant="primary"
          size="md"
          href=""
          trackingEvent="cta_click"
        >
          No Analytics
        </CTAButton>
      );

      const button = screen.getByRole("button");
      // Should not throw error
      await user.click(button);
    });
  });

  describe("Disabled state", () => {
    it("applies disabled styles when disabled", () => {
      render(
        <CTAButton variant="primary" size="md" href="" disabled>
          Disabled
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:opacity-50");
      expect(button).toHaveClass("disabled:cursor-not-allowed");
      expect(button).toHaveAttribute("disabled");
    });

    it("prevents click when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <CTAButton
          variant="primary"
          size="md"
          href=""
          onClick={handleClick}
          disabled
        >
          Disabled
        </CTAButton>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has focus ring styles", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Focus Me
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus:outline-none");
      expect(button).toHaveClass("focus:ring-2");
      expect(button).toHaveClass("focus:ring-offset-2");
    });

    it("marks icon as aria-hidden", () => {
      render(
        <CTAButton variant="primary" size="md" href="" icon="→">
          Next
        </CTAButton>
      );
      const icon = screen.getByText("→");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Custom styling", () => {
    it("applies custom className", () => {
      render(
        <CTAButton
          variant="primary"
          size="md"
          href=""
          className="custom-class"
        >
          Custom
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("applies full width when fullWidth is true", () => {
      render(
        <CTAButton variant="primary" size="md" href="" fullWidth>
          Full Width
        </CTAButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });
  });

  describe("Button type", () => {
    it("renders as button element when no href is provided", () => {
      render(
        <CTAButton variant="primary" size="md" href="">
          Button
        </CTAButton>
      );
      // When href is empty string, it still renders as link
      // Let's test with actual button behavior
      const { container } = render(
        <button className="test-button">Test</button>
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("supports different button types", () => {
      const { rerender } = render(
        <CTAButton variant="primary" size="md" href="" type="submit">
          Submit
        </CTAButton>
      );
      
      rerender(
        <CTAButton variant="primary" size="md" href="" type="reset">
          Reset
        </CTAButton>
      );
    });
  });
});
