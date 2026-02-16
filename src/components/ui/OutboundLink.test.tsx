import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OutboundLink } from "./OutboundLink";
import * as analytics from "@/lib/analytics";

// Mock the analytics module
vi.mock("@/lib/analytics", () => ({
  trackOutboundLink: vi.fn(),
}));

describe("OutboundLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders link with correct href", () => {
    render(
      <OutboundLink href="https://example.com">Visit Example</OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("opens link in new tab with security attributes", () => {
    render(
      <OutboundLink href="https://example.com">Visit Example</OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("tracks outbound link click with link text", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");

    render(
      <OutboundLink href="https://example.com">Visit Example</OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalledWith(
      "https://example.com",
      "Visit Example"
    );
  });

  it("tracks outbound link click with custom tracking label", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");

    render(
      <OutboundLink
        href="https://github.com/mahetech"
        trackingLabel="GitHub Profile"
      >
        View on GitHub
      </OutboundLink>
    );

    const link = screen.getByText("View on GitHub");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalledWith(
      "https://github.com/mahetech",
      "GitHub Profile"
    );
  });

  it("uses href as fallback when children is not a string", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");

    render(
      <OutboundLink href="https://example.com">
        <span>Complex Content</span>
      </OutboundLink>
    );

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalledWith(
      "https://example.com",
      "https://example.com"
    );
  });

  it("calls custom onClick handler after tracking", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");
    const customOnClick = vi.fn();

    render(
      <OutboundLink href="https://example.com" onClick={customOnClick}>
        Visit Example
      </OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalled();
    expect(customOnClick).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <OutboundLink href="https://example.com" className="custom-class">
        Visit Example
      </OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    expect(link).toHaveClass("custom-class");
  });

  it("applies custom aria-label", () => {
    render(
      <OutboundLink
        href="https://example.com"
        aria-label="Visit our partner site"
      >
        Visit Example
      </OutboundLink>
    );

    const link = screen.getByLabelText("Visit our partner site");
    expect(link).toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");

    render(
      <OutboundLink href="https://example.com">Visit Example</OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    
    // Focus the link
    link.focus();
    expect(link).toHaveFocus();

    // Simulate Enter key press
    fireEvent.click(link);
    expect(trackOutboundLinkMock).toHaveBeenCalled();
  });

  it("handles WhatsApp links correctly", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");
    const whatsappNumber = "919876543210";

    render(
      <OutboundLink
        href={`https://wa.me/${whatsappNumber}`}
        trackingLabel="WhatsApp Contact"
      >
        Chat on WhatsApp
      </OutboundLink>
    );

    const link = screen.getByText("Chat on WhatsApp");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalledWith(
      `https://wa.me/${whatsappNumber}`,
      "WhatsApp Contact"
    );
  });

  it("handles social media links correctly", () => {
    const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");

    render(
      <OutboundLink
        href="https://twitter.com/mahetech"
        trackingLabel="Twitter Profile"
      >
        Follow on Twitter
      </OutboundLink>
    );

    const link = screen.getByText("Follow on Twitter");
    fireEvent.click(link);

    expect(trackOutboundLinkMock).toHaveBeenCalledWith(
      "https://twitter.com/mahetech",
      "Twitter Profile"
    );
  });

  it("preserves all standard anchor attributes", () => {
    render(
      <OutboundLink
        href="https://example.com"
        id="test-link"
        data-testid="outbound-link"
        title="Visit Example Site"
      >
        Visit Example
      </OutboundLink>
    );

    const link = screen.getByText("Visit Example");
    expect(link).toHaveAttribute("id", "test-link");
    expect(link).toHaveAttribute("data-testid", "outbound-link");
    expect(link).toHaveAttribute("title", "Visit Example Site");
  });
});
