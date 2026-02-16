"use client";

/**
 * SkipToContent Component
 *
 * Provides a skip-to-content link for keyboard users to bypass navigation
 * and jump directly to the main content. This is a critical accessibility
 * feature for keyboard and screen reader users.
 *
 * Features:
 * - Hidden by default, visible on keyboard focus
 * - Positioned at the top of the page
 * - High contrast and clear visual design
 * - Smooth scroll to main content
 *
 * Requirements: 15.2 (Keyboard Navigation Support)
 */

export function SkipToContent() {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-primary-dark)] focus:px-6 focus:py-3 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
    >
      Skip to main content
    </a>
  );
}
