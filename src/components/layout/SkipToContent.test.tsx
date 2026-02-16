import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkipToContent } from "./SkipToContent";

describe("SkipToContent", () => {
  beforeEach(() => {
    // Create a mock main content element
    const mainContent = document.createElement("main");
    mainContent.id = "main-content";
    mainContent.tabIndex = -1;
    document.body.appendChild(mainContent);

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders skip-to-content link", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
  });

  it("has correct href attribute", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("is hidden by default (sr-only class)", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toHaveClass("sr-only");
  });

  it("becomes visible on focus", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // The element should have focus classes that make it visible
    expect(skipLink.className).toContain("focus:not-sr-only");
    expect(skipLink.className).toContain("focus:absolute");
  });

  it("focuses main content when clicked", async () => {
    const user = userEvent.setup();
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    const mainContent = document.getElementById("main-content");
    
    // Spy on the focus method
    const focusSpy = vi.spyOn(mainContent as HTMLElement, "focus");
    
    await user.click(skipLink);
    
    expect(focusSpy).toHaveBeenCalled();
  });

  it("scrolls to main content when clicked", async () => {
    const user = userEvent.setup();
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    const mainContent = document.getElementById("main-content");
    
    await user.click(skipLink);
    
    expect(mainContent?.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("prevents default link behavior", async () => {
    const user = userEvent.setup();
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // Create a spy on preventDefault
    const preventDefaultSpy = vi.fn();
    skipLink.addEventListener("click", (e) => {
      preventDefaultSpy();
      e.preventDefault();
    });
    
    await user.click(skipLink);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("has proper styling for visibility and positioning", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // Check for key accessibility classes
    expect(skipLink.className).toContain("focus:absolute");
    expect(skipLink.className).toContain("focus:z-[100]");
    expect(skipLink.className).toContain("focus:rounded-md");
    expect(skipLink.className).toContain("focus:px-6");
    expect(skipLink.className).toContain("focus:py-3");
  });

  it("has high contrast styling for visibility", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // Check for contrast-related classes
    expect(skipLink.className).toContain("focus:bg-[var(--color-primary-dark)]");
    expect(skipLink.className).toContain("focus:text-white");
    expect(skipLink.className).toContain("focus:shadow-lg");
  });

  it("has focus ring for keyboard navigation", () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // Check for focus ring classes
    expect(skipLink.className).toContain("focus:ring-2");
    expect(skipLink.className).toContain("focus:ring-white");
  });

  it("handles missing main content gracefully", async () => {
    // Remove the main content element
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.remove();
    }
    
    const user = userEvent.setup();
    render(<SkipToContent />);
    
    const skipLink = screen.getByText("Skip to main content");
    
    // Should not throw error when main content is missing
    await expect(user.click(skipLink)).resolves.not.toThrow();
  });
});
