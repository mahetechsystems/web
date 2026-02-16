import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { CalendlyEmbed } from "./CalendlyEmbed";

describe("CalendlyEmbed", () => {
  const mockUrl = "https://calendly.com/test-user/30min";

  beforeEach(() => {
    // Clear any existing scripts
    document.body.innerHTML = "";
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<CalendlyEmbed url={mockUrl} />);
    expect(screen.getByText(/loading calendar/i)).toBeInTheDocument();
  });

  it("loads Calendly script on mount", () => {
    render(<CalendlyEmbed url={mockUrl} />);

    const scripts = document.querySelectorAll('script[src*="calendly"]');
    expect(scripts.length).toBeGreaterThan(0);
    expect(scripts[0]).toHaveAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
  });

  it("renders Calendly widget after script loads", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script load
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("load"));
    }

    await waitFor(() => {
      const widget = document.querySelector(".calendly-inline-widget");
      expect(widget).toBeInTheDocument();
      expect(widget).toHaveAttribute("data-url", mockUrl);
    });
  });

  it("displays error fallback when script fails to load", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script error
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("error"));
    }

    await waitFor(() => {
      expect(screen.getByText(/unable to load calendar/i)).toBeInTheDocument();
      expect(
        screen.getByText(/we're having trouble loading the scheduling widget/i)
      ).toBeInTheDocument();
    });
  });

  it("displays fallback link when error occurs", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script error
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("error"));
    }

    await waitFor(() => {
      const fallbackLink = screen.getByRole("link", {
        name: /open scheduling page/i,
      });
      expect(fallbackLink).toBeInTheDocument();
      expect(fallbackLink).toHaveAttribute("href", mockUrl);
      expect(fallbackLink).toHaveAttribute("target", "_blank");
      expect(fallbackLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("applies custom className to widget container", async () => {
    const customClass = "custom-calendly-class";
    render(<CalendlyEmbed url={mockUrl} className={customClass} />);

    // Simulate script load
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("load"));
    }

    await waitFor(() => {
      const container = document.querySelector(`.${customClass}`);
      expect(container).toBeInTheDocument();
    });
  });

  it("cleans up script on unmount", () => {
    const { unmount } = render(<CalendlyEmbed url={mockUrl} />);

    const scriptsBefore = document.querySelectorAll('script[src*="calendly"]');
    expect(scriptsBefore.length).toBeGreaterThan(0);

    unmount();

    // Script should be removed after unmount
    const scriptsAfter = document.querySelectorAll('script[src*="calendly"]');
    expect(scriptsAfter.length).toBe(0);
  });

  it("sets correct widget height", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script load
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("load"));
    }

    await waitFor(() => {
      const widget = document.querySelector(".calendly-inline-widget");
      expect(widget).toHaveStyle({ height: "700px" });
    });
  });

  it("sets correct widget minimum width", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script load
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("load"));
    }

    await waitFor(() => {
      const widget = document.querySelector(".calendly-inline-widget");
      expect(widget).toHaveStyle({ minWidth: "320px" });
    });
  });

  it("logs error to console when script fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script error
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("error"));
    }

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to load Calendly script");
    });

    consoleErrorSpy.mockRestore();
  });

  it("has accessible error state", async () => {
    render(<CalendlyEmbed url={mockUrl} />);

    // Simulate script error
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.dispatchEvent(new Event("error"));
    }

    await waitFor(() => {
      // Check that heading is present
      const heading = screen.getByText(/unable to load calendar/i);
      expect(heading).toBeInTheDocument();

      // Check that error message is present
      const errorMessage = screen.getByText(
        /we're having trouble loading the scheduling widget/i
      );
      expect(errorMessage).toBeInTheDocument();

      // Check that fallback link is accessible
      const fallbackLink = screen.getByRole("link", {
        name: /open scheduling page/i,
      });
      expect(fallbackLink).toBeInTheDocument();
    });
  });
}); 
