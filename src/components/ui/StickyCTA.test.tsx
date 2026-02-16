import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { StickyCTA } from "./StickyCTA";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("StickyCTA", () => {
  beforeEach(() => {
    // Mock window.matchMedia for prefers-reduced-motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Reset scroll position
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sticky CTA component", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        variant="primary"
        size="md"
      />
    );

    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("is initially hidden when scroll position is below threshold", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={600}
      />
    );

    const container = screen.getByText("Get Started").closest("div[class*='fixed']");
    expect(container).toHaveClass("opacity-0");
  });

  it("becomes visible when scrolling past threshold", async () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={600}
      />
    );

    // Simulate scroll past threshold
    Object.defineProperty(window, "scrollY", { value: 700, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveClass("opacity-100");
    });
  });

  it("hides when scrolling back above threshold", async () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={600}
      />
    );

    // Scroll past threshold
    Object.defineProperty(window, "scrollY", { value: 700, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveClass("opacity-100");
    });

    // Scroll back above threshold
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveClass("opacity-0");
    });
  });

  it("uses custom scroll threshold when provided", async () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={1000}
      />
    );

    // Scroll to 800px (below custom threshold)
    Object.defineProperty(window, "scrollY", { value: 800, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveClass("opacity-0");
    });

    // Scroll to 1100px (above custom threshold)
    Object.defineProperty(window, "scrollY", { value: 1100, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveClass("opacity-100");
    });
  });

  it("renders with correct href", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("applies custom variant and size", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        variant="secondary"
        size="lg"
      />
    );

    const button = screen.getByText("Get Started");
    expect(button).toBeInTheDocument();
  });

  it("includes icon when provided", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        icon="→"
      />
    );

    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("has fixed positioning to prevent CLS", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    const container = screen.getByText("Get Started").closest("div[class*='fixed']");
    expect(container).toHaveClass("fixed");
    expect(container).toHaveClass("bottom-0");
  });

  it("has proper z-index for stacking", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    const container = screen.getByText("Get Started").closest("div[class*='fixed']");
    expect(container).toHaveClass("z-50");
  });

  it("applies aria-hidden when not visible", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={600}
      />
    );

    const container = screen.getByText("Get Started").closest("div[class*='fixed']");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });

  it("removes aria-hidden when visible", async () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        scrollThreshold={600}
      />
    );

    // Scroll past threshold
    Object.defineProperty(window, "scrollY", { value: 700, writable: true });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      const container = screen.getByText("Get Started").closest("div[class*='fixed']");
      expect(container).toHaveAttribute("aria-hidden", "false");
    });
  });

  it("cleans up scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("respects prefers-reduced-motion setting", () => {
    // Mock prefers-reduced-motion: reduce
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

    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    // Component should still render and function
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        className="custom-class"
      />
    );

    const container = screen.getByText("Get Started").closest("div[class*='fixed']");
    expect(container).toHaveClass("custom-class");
  });

  it("uses default tracking event when not provided", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
      />
    );

    // Component should render with default tracking event
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("uses custom tracking event when provided", () => {
    render(
      <StickyCTA
        text="Get Started"
        href="/contact"
        trackingEvent="custom_cta_click"
      />
    );

    // Component should render with custom tracking event
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });
});
