"use client";

import { trackOutboundLink } from "@/lib/analytics";

/**
 * OutboundLink Component
 *
 * A wrapper component for external links that automatically tracks clicks in analytics.
 * Implements outbound link tracking for Google Analytics 4.
 *
 * Features:
 * - Automatic outbound link click tracking
 * - Preserves all standard link attributes
 * - Security best practices (noopener noreferrer)
 * - Accessible keyboard navigation
 *
 * Requirements: 12.6
 */

interface OutboundLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  trackingLabel?: string; // Optional custom label for analytics
}

export function OutboundLink({
  href,
  children,
  trackingLabel,
  onClick,
  ...props
}: OutboundLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the outbound link click
    const linkText = trackingLabel || (typeof children === "string" ? children : href);
    trackOutboundLink(href, linkText);

    // Call custom onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`transition-colors duration-200 hover:text-[var(--color-secondary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-blue)] focus:ring-offset-2 ${props.className || ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
