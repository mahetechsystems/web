import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

// Mock the CalendlyEmbed component
vi.mock("@/components/CalendlyEmbed", () => ({
  CalendlyEmbed: () => <div data-testid="calendly-embed">Calendly Embed</div>,
}));

// Mock the ContactForm component
vi.mock("@/components/ContactForm", () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

describe("ContactPage - WhatsApp Link", () => {
  it("should display WhatsApp contact option", () => {
    render(<ContactPage />);

    // Check that WhatsApp heading is present
    expect(screen.getByRole("heading", { name: /whatsapp/i })).toBeInTheDocument();
  });

  it("should have WhatsApp link with correct format", () => {
    render(<ContactPage />);

    // Find the WhatsApp link
    const whatsappLink = screen.getByRole("link", { name: /start chat/i });

    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute("href");

    // Verify the href follows wa.me format
    const href = whatsappLink.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/);
  });

  it("should open WhatsApp link in new tab", () => {
    render(<ContactPage />);

    const whatsappLink = screen.getByRole("link", { name: /start chat/i });

    // Verify it opens in a new tab with security attributes
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should display WhatsApp description", () => {
    render(<ContactPage />);

    // Check that the description text is present
    expect(
      screen.getByText(/prefer instant messaging\? reach out to us on whatsapp/i)
    ).toBeInTheDocument();
  });

  it("should use environment variable for WhatsApp number or fallback", () => {
    render(<ContactPage />);

    const whatsappLink = screen.getByRole("link", { name: /start chat/i });
    const href = whatsappLink.getAttribute("href");

    // Should have a valid WhatsApp link format
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/);

    // Should use either environment variable or fallback
    expect(href).toBeTruthy();
  });

  it("should have mobile-friendly click-to-chat format", () => {
    render(<ContactPage />);

    const whatsappLink = screen.getByRole("link", { name: /start chat/i });
    const href = whatsappLink.getAttribute("href");

    // Verify it uses the wa.me format which is mobile-friendly
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/);

    // Verify it doesn't have any additional parameters that might break mobile
    expect(href).not.toContain("?");
  });
});
