import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the company name", () => {
    render(<Footer />);
    expect(screen.getByText("Mahe Tech Systems")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Footer />);
    const navLinks = ["Home", "About", "Services", "Case Studies", "Blog", "Contact"];
    
    navLinks.forEach((linkText) => {
      const links = screen.getAllByText(linkText);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("Bangalore, India")).toBeInTheDocument();
    expect(screen.getByText("hello@mahetechsystems.com")).toBeInTheDocument();
  });

  it("renders email link with correct href", () => {
    render(<Footer />);
    const emailLink = screen.getByText("hello@mahetechsystems.com");
    expect(emailLink).toHaveAttribute("href", "mailto:hello@mahetechsystems.com");
  });

  it("renders WhatsApp link with correct attributes", () => {
    render(<Footer />);
    const whatsappLink = screen.getByText(/WhatsApp:/);
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/919876543210");
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Visit our LinkedIn page")).toBeInTheDocument();
    expect(screen.getByLabelText("Visit our Twitter page")).toBeInTheDocument();
    expect(screen.getByLabelText("Visit our GitHub page")).toBeInTheDocument();
  });

  it("renders social media links with correct attributes", () => {
    render(<Footer />);
    const linkedinLink = screen.getByLabelText("Visit our LinkedIn page");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/company/mahe-tech-systems");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders privacy policy and terms links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("renders privacy policy link with correct href", () => {
    render(<Footer />);
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders terms link with correct href", () => {
    render(<Footer />);
    const termsLink = screen.getByText("Terms of Service");
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Mahe Tech Systems`))).toBeInTheDocument();
  });

  it("has proper semantic HTML structure", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe("FOOTER");
  });

  it("has proper ARIA labels for navigation sections", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Site footer")).toBeInTheDocument();
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Social media links")).toBeInTheDocument();
    expect(screen.getByLabelText("Legal links")).toBeInTheDocument();
  });

  it("renders company tagline", () => {
    render(<Footer />);
    expect(
      screen.getByText(/A structured execution partner for founders/)
    ).toBeInTheDocument();
  });

  it("has proper heading hierarchy", () => {
    render(<Footer />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Mahe Tech Systems" });
    const h3s = screen.getAllByRole("heading", { level: 3 });
    
    expect(h2).toBeInTheDocument();
    expect(h3s.length).toBe(3); // Navigation, Contact, Follow Us
  });

  it("renders address element with not-italic class", () => {
    const { container } = render(<Footer />);
    const address = container.querySelector("address");
    expect(address).toBeInTheDocument();
    expect(address).toHaveClass("not-italic");
  });

  it("all external links have security attributes", () => {
    render(<Footer />);
    const externalLinks = [
      screen.getByLabelText("Visit our LinkedIn page"),
      screen.getByLabelText("Visit our Twitter page"),
      screen.getByLabelText("Visit our GitHub page"),
      screen.getByText(/WhatsApp:/),
    ];

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders responsive grid layout classes", () => {
    const { container } = render(<Footer />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-2");
    expect(gridContainer).toHaveClass("lg:grid-cols-4");
  });

  it("has focus styles for keyboard navigation", () => {
    render(<Footer />);
    const firstLink = screen.getAllByRole("link")[0];
    expect(firstLink).toHaveClass("focus:outline-none");
    expect(firstLink).toHaveClass("focus:ring-2");
  });
});
