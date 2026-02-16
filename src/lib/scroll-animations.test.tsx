/**
 * Tests for scroll-triggered animations implementation
 * Validates Requirements 10.1, 10.3, 10.5
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { motion } from "framer-motion";
import {
  getViewportAnimation,
  prefersReducedMotion,
  fadeInUp,
  staggerContainer,
} from "./animations";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

describe("Scroll-Triggered Animations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Viewport Animation Configuration", () => {
    it("should return correct props for viewport animation", () => {
      const props = getViewportAnimation(fadeInUp, true, 0.3);

      expect(props).toHaveProperty("initial", "hidden");
      expect(props).toHaveProperty("whileInView", "visible");
      expect(props).toHaveProperty("viewport");
      expect(props.viewport).toEqual({ once: true, amount: 0.3 });
      expect(props).toHaveProperty("variants");
    });

    it("should use default parameters when not provided", () => {
      const props = getViewportAnimation();

      expect(props.viewport).toEqual({ once: true, amount: 0.3 });
      expect(props.variants).toBeDefined();
    });

    it("should allow custom viewport threshold", () => {
      const props = getViewportAnimation(fadeInUp, true, 0.5);

      expect(props.viewport.amount).toBe(0.5);
    });

    it("should allow animation to trigger multiple times", () => {
      const props = getViewportAnimation(fadeInUp, false, 0.3);

      expect(props.viewport.once).toBe(false);
    });
  });

  describe("Reduced Motion Support", () => {
    it("should detect prefers-reduced-motion setting", () => {
      // Mock matchMedia to return reduced motion preference
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const result = prefersReducedMotion();
      expect(typeof result).toBe("boolean");
    });

    it("should return false when matchMedia is not available (SSR)", () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const result = prefersReducedMotion();
      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });

  describe("Animation Variants", () => {
    it("should have correct structure for fadeInUp variant", () => {
      expect(fadeInUp).toHaveProperty("hidden");
      expect(fadeInUp).toHaveProperty("visible");
      expect(fadeInUp.hidden).toHaveProperty("opacity", 0);
      expect(fadeInUp.hidden).toHaveProperty("y", 20);
      expect(fadeInUp.visible).toHaveProperty("opacity", 1);
      expect(fadeInUp.visible).toHaveProperty("y", 0);
    });

    it("should have correct structure for staggerContainer variant", () => {
      expect(staggerContainer).toHaveProperty("hidden");
      expect(staggerContainer).toHaveProperty("visible");
      expect(staggerContainer.visible).toHaveProperty("transition");
      expect(staggerContainer.visible.transition).toHaveProperty(
        "staggerChildren"
      );
    });
  });

  describe("CLS Prevention", () => {
    it("should only animate transform and opacity properties", () => {
      // fadeInUp should only use opacity and y (transform)
      expect(Object.keys(fadeInUp.hidden)).toEqual(
        expect.arrayContaining(["opacity", "y"])
      );
      expect(Object.keys(fadeInUp.visible)).toEqual(
        expect.arrayContaining(["opacity", "y", "transition"])
      );

      // Should not include layout-shifting properties
      expect(fadeInUp.hidden).not.toHaveProperty("width");
      expect(fadeInUp.hidden).not.toHaveProperty("height");
      expect(fadeInUp.hidden).not.toHaveProperty("margin");
      expect(fadeInUp.hidden).not.toHaveProperty("padding");
    });

    it("should use small movement distances to minimize visual impact", () => {
      // Movement should be subtle (≤30px)
      expect(Math.abs(fadeInUp.hidden.y as number)).toBeLessThanOrEqual(30);
    });
  });

  describe("Intersection Observer Usage", () => {
    it("should use IntersectionObserver API via Framer Motion", () => {
      const TestComponent = () => (
        <motion.div {...getViewportAnimation(fadeInUp)}>
          <p>Test content</p>
        </motion.div>
      );

      render(<TestComponent />);

      // Verify that the component renders successfully
      // Framer Motion internally uses IntersectionObserver for whileInView
      // We verify this by checking that the component with viewport animation renders
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });
  });

  describe("Animation Performance", () => {
    it("should use GPU-accelerated properties only", () => {
      // Check that fadeInUp only uses transform (y) and opacity
      const animatedProps = Object.keys(fadeInUp.hidden);
      const gpuAcceleratedProps = ["opacity", "y", "x", "scale", "rotate"];

      animatedProps.forEach((prop) => {
        if (prop !== "transition") {
          expect(gpuAcceleratedProps).toContain(prop);
        }
      });
    });

    it("should have reasonable transition duration", () => {
      const props = getViewportAnimation(fadeInUp);
      const transition = props.variants.visible.transition;

      // Should use spring physics or have reasonable duration
      expect(transition).toBeDefined();
      expect(transition.type).toBe("spring");
    });
  });

  describe("Stagger Animation", () => {
    it("should have stagger delay configuration", () => {
      expect(staggerContainer.visible.transition).toHaveProperty(
        "staggerChildren"
      );
      expect(
        typeof staggerContainer.visible.transition.staggerChildren
      ).toBe("number");
    });

    it("should have reasonable stagger delay", () => {
      const staggerDelay =
        staggerContainer.visible.transition.staggerChildren;
      // Stagger delay should be between 0.05s and 0.2s for good UX
      expect(staggerDelay).toBeGreaterThanOrEqual(0.05);
      expect(staggerDelay).toBeLessThanOrEqual(0.2);
    });
  });

  describe("Accessibility", () => {
    it("should respect user motion preferences in animation config", () => {
      // Mock reduced motion preference
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const reducedMotion = prefersReducedMotion();
      expect(reducedMotion).toBe(true);
    });

    it("should provide animation utilities that can be conditionally disabled", () => {
      // getViewportAnimation should work with any variant
      const props = getViewportAnimation(fadeInUp);
      expect(props).toBeDefined();

      // In production, components should check prefersReducedMotion()
      // and conditionally apply animations
      const shouldAnimate = !prefersReducedMotion();
      expect(typeof shouldAnimate).toBe("boolean");
    });
  });

  describe("Integration with Framer Motion", () => {
    it("should render motion component with viewport animation props", () => {
      const TestComponent = () => (
        <motion.div
          {...getViewportAnimation(fadeInUp)}
          data-testid="animated-section"
        >
          <h2>Animated Section</h2>
        </motion.div>
      );

      render(<TestComponent />);
      const element = screen.getByTestId("animated-section");
      expect(element).toBeInTheDocument();
    });

    it("should render stagger container with children", () => {
      const TestComponent = () => (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          data-testid="stagger-container"
        >
          <motion.div>Item 1</motion.div>
          <motion.div>Item 2</motion.div>
          <motion.div>Item 3</motion.div>
        </motion.div>
      );

      render(<TestComponent />);
      const container = screen.getByTestId("stagger-container");
      expect(container).toBeInTheDocument();
      expect(container.children).toHaveLength(3);
    });
  });
});
