import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  tapScale,
  pageTransition,
  getViewportAnimation,
  prefersReducedMotion,
  getAccessibleAnimation,
  createStaggerContainer,
  createFadeAnimation,
  defaultTransition,
} from "./animations";

describe("Animation Variants", () => {
  it("should have fadeIn variant with correct structure", () => {
    expect(fadeIn).toHaveProperty("hidden");
    expect(fadeIn).toHaveProperty("visible");
    expect(fadeIn.hidden).toEqual({ opacity: 0 });
    expect(fadeIn.visible).toHaveProperty("opacity", 1);
  });

  it("should have fadeInUp variant with correct structure", () => {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 20 });
    expect(fadeInUp.visible).toMatchObject({ opacity: 1, y: 0 });
  });

  it("should have fadeInDown variant with correct structure", () => {
    expect(fadeInDown.hidden).toEqual({ opacity: 0, y: -20 });
    expect(fadeInDown.visible).toMatchObject({ opacity: 1, y: 0 });
  });

  it("should have slideInLeft variant with correct structure", () => {
    expect(slideInLeft.hidden).toEqual({ opacity: 0, x: -30 });
    expect(slideInLeft.visible).toMatchObject({ opacity: 1, x: 0 });
  });

  it("should have slideInRight variant with correct structure", () => {
    expect(slideInRight.hidden).toEqual({ opacity: 0, x: 30 });
    expect(slideInRight.visible).toMatchObject({ opacity: 1, x: 0 });
  });

  it("should have scaleIn variant with correct structure", () => {
    expect(scaleIn.hidden).toEqual({ opacity: 0, scale: 0.95 });
    expect(scaleIn.visible).toMatchObject({ opacity: 1, scale: 1 });
  });

  it("should have staggerContainer variant with correct structure", () => {
    expect(staggerContainer.hidden).toEqual({ opacity: 0 });
    expect(staggerContainer.visible).toHaveProperty("opacity", 1);
    expect(staggerContainer.visible).toHaveProperty("transition");
  });

  it("should have staggerItem variant with correct structure", () => {
    expect(staggerItem.hidden).toEqual({ opacity: 0, y: 10 });
    expect(staggerItem.visible).toMatchObject({ opacity: 1, y: 0 });
  });

  it("should have hoverScale variant with correct structure", () => {
    expect(hoverScale.rest).toEqual({ scale: 1 });
    expect(hoverScale.hover).toHaveProperty("scale", 1.05);
  });

  it("should have hoverLift variant with correct structure", () => {
    expect(hoverLift.rest).toEqual({ y: 0 });
    expect(hoverLift.hover).toHaveProperty("y", -4);
  });

  it("should have tapScale with correct value", () => {
    expect(tapScale).toEqual({ scale: 0.98 });
  });

  it("should have pageTransition variant with correct structure", () => {
    expect(pageTransition).toHaveProperty("hidden");
    expect(pageTransition).toHaveProperty("visible");
    expect(pageTransition).toHaveProperty("exit");
  });
});

describe("Utility Functions", () => {
  describe("getViewportAnimation", () => {
    it("should return correct props with default parameters", () => {
      const props = getViewportAnimation();
      expect(props).toHaveProperty("initial", "hidden");
      expect(props).toHaveProperty("whileInView", "visible");
      expect(props.viewport).toEqual({ once: true, amount: 0.3 });
      expect(props).toHaveProperty("variants");
    });

    it("should accept custom variant", () => {
      const props = getViewportAnimation(fadeIn);
      expect(props.variants).toBe(fadeIn);
    });

    it("should accept custom once parameter", () => {
      const props = getViewportAnimation(fadeIn, false);
      expect(props.viewport.once).toBe(false);
    });

    it("should accept custom amount parameter", () => {
      const props = getViewportAnimation(fadeIn, true, 0.5);
      expect(props.viewport.amount).toBe(0.5);
    });
  });

  describe("prefersReducedMotion", () => {
    beforeEach(() => {
      // Reset matchMedia mock before each test
      vi.stubGlobal("matchMedia", undefined);
    });

    it("should return false when window is undefined (SSR)", () => {
      const originalWindow = global.window;
      // @ts-expect-error - Testing SSR scenario
      delete global.window;
      expect(prefersReducedMotion()).toBe(false);
      global.window = originalWindow;
    });

    it("should return true when user prefers reduced motion", () => {
      vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(prefersReducedMotion()).toBe(true);
    });

    it("should return false when user does not prefer reduced motion", () => {
      vi.stubGlobal("matchMedia", (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe("getAccessibleAnimation", () => {
    it("should return visible state when reduced motion is preferred", () => {
      vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const props = getAccessibleAnimation(fadeIn);
      expect(props.initial).toBe("visible");
      expect(props.animate).toBe("visible");
    });

    it("should return normal animation when reduced motion is not preferred", () => {
      vi.stubGlobal("matchMedia", (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const props = getAccessibleAnimation(fadeIn);
      expect(props.initial).toBe("hidden");
      expect(props.animate).toBe("visible");
    });
  });

  describe("createStaggerContainer", () => {
    it("should create stagger container with default parameters", () => {
      const variant = createStaggerContainer();
      expect(variant.hidden).toEqual({ opacity: 0 });
      expect(variant.visible).toHaveProperty("opacity", 1);
      expect(variant.visible).toHaveProperty("transition");
      // @ts-expect-error - Accessing transition properties
      expect(variant.visible.transition.staggerChildren).toBe(0.1);
      // @ts-expect-error - Accessing transition properties
      expect(variant.visible.transition.delayChildren).toBe(0);
    });

    it("should create stagger container with custom parameters", () => {
      const variant = createStaggerContainer(0.2, 0.5);
      // @ts-expect-error - Accessing transition properties
      expect(variant.visible.transition.staggerChildren).toBe(0.2);
      // @ts-expect-error - Accessing transition properties
      expect(variant.visible.transition.delayChildren).toBe(0.5);
    });
  });

  describe("createFadeAnimation", () => {
    it("should create fade up animation with default parameters", () => {
      const variant = createFadeAnimation();
      expect(variant.hidden).toEqual({ opacity: 0, y: 20 });
      expect(variant.visible).toMatchObject({ opacity: 1, y: 0 });
    });

    it("should create fade down animation", () => {
      const variant = createFadeAnimation(20, "down");
      expect(variant.hidden).toEqual({ opacity: 0, y: -20 });
      expect(variant.visible).toMatchObject({ opacity: 1, y: 0 });
    });

    it("should create fade left animation", () => {
      const variant = createFadeAnimation(30, "left");
      expect(variant.hidden).toEqual({ opacity: 0, x: 30 });
      expect(variant.visible).toMatchObject({ opacity: 1, x: 0 });
    });

    it("should create fade right animation", () => {
      const variant = createFadeAnimation(30, "right");
      expect(variant.hidden).toEqual({ opacity: 0, x: -30 });
      expect(variant.visible).toMatchObject({ opacity: 1, x: 0 });
    });

    it("should create fade animation with custom distance", () => {
      const variant = createFadeAnimation(50, "up");
      expect(variant.hidden).toEqual({ opacity: 0, y: 50 });
      expect(variant.visible).toMatchObject({ opacity: 1, y: 0 });
    });
  });
});

describe("Transition Configuration", () => {
  it("should have defaultTransition with spring configuration", () => {
    expect(defaultTransition).toHaveProperty("type", "spring");
    expect(defaultTransition).toHaveProperty("stiffness", 100);
    expect(defaultTransition).toHaveProperty("damping", 15);
    expect(defaultTransition).toHaveProperty("mass", 0.5);
  });
});

describe("Animation Performance", () => {
  it("should only animate transform and opacity properties", () => {
    // Verify that animations only use GPU-accelerated properties
    const variants = [
      fadeIn,
      fadeInUp,
      fadeInDown,
      slideInLeft,
      slideInRight,
      scaleIn,
    ];

    variants.forEach((variant) => {
      const hiddenKeys = Object.keys(variant.hidden);
      const visibleKeys = Object.keys(variant.visible).filter(
        (key) => key !== "transition"
      );

      // All animated properties should be opacity, x, y, or scale
      const allowedProps = ["opacity", "x", "y", "scale"];
      hiddenKeys.forEach((key) => {
        expect(allowedProps).toContain(key);
      });
      visibleKeys.forEach((key) => {
        expect(allowedProps).toContain(key);
      });
    });
  });

  it("should use small movement distances to avoid layout shifts", () => {
    // Verify movement distances are small enough to not cause CLS issues
    expect(Math.abs(fadeInUp.hidden.y as number)).toBeLessThanOrEqual(30);
    expect(Math.abs(fadeInDown.hidden.y as number)).toBeLessThanOrEqual(30);
    expect(Math.abs(slideInLeft.hidden.x as number)).toBeLessThanOrEqual(30);
    expect(Math.abs(slideInRight.hidden.x as number)).toBeLessThanOrEqual(30);
  });

  it("should use subtle scale values", () => {
    // Verify scale changes are subtle
    expect(scaleIn.hidden.scale).toBeGreaterThanOrEqual(0.9);
    expect(scaleIn.hidden.scale).toBeLessThanOrEqual(1.0);
    expect(hoverScale.hover.scale).toBeLessThanOrEqual(1.1);
  });
});
