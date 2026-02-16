import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "./Navigation";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navigation", () => {
  it("renders all navigation items", () => {
    render(<Navigation />);

    // Each navigation item appears twice (desktop and mobile)
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Case Studies").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blog").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the logo with correct link", () => {
    render(<Navigation />);

    const logo = screen.getByLabelText("Mahe Tech Systems - Home");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("highlights the active link", () => {
    render(<Navigation />);

    // Home should be active (mocked pathname is "/")
    const homeLinks = screen.getAllByText("Home");
    // Desktop link should have active styling
    expect(homeLinks[0]).toHaveClass("bg-[var(--color-primary-dark)]");
    expect(homeLinks[0]).toHaveClass("text-white");
  });

  it("has keyboard accessible mobile menu button", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("type", "button");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    // Mobile menu should be visible
    const mobileMenu = screen.getByRole("menu");
    expect(mobileMenu).not.toHaveClass("hidden");
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(<Navigation />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");

    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toHaveAttribute("aria-controls", "mobile-menu");
  });

  it("displays screen reader text for menu button", () => {
    render(<Navigation />);

    const srText = screen.getByText("Open menu", { selector: ".sr-only" });
    expect(srText).toBeInTheDocument();
  });
});
