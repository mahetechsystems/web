"use client";

import Link from "next/link";
import { type CTAButton as CTAButtonProps } from "@/types";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";

/**
 * CTAButton Component
 *
 * A reusable call-to-action button component with multiple variants and sizes.
 * Implements hover states, animations, analytics tracking, and touch-friendly sizing.
 *
 * Features:
 * - Three variants: primary, secondary, outline
 * - Three sizes: sm, md, lg
 * - Touch-friendly sizing (minimum 44x44px)
 * - Hover states and animations
 * - Analytics tracking support
 * - Accessible keyboard navigation
 *
 * Requirements: 3.6, 10.2, 13.2
 */

interface CTAButtonComponentProps extends Omit<CTAButtonProps, "text"> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  trackingEvent,
  className,
  disabled = false,
  type = "button",
  fullWidth = false,
}: CTAButtonComponentProps) {
  // Handle analytics tracking
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Fire analytics event if tracking is enabled
    if (trackingEvent) {
      trackCTAClick(
        trackingEvent,
        typeof children === "string" ? children : "CTA Button",
        href
      );
    }

    // Call custom onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  // Base styles for all buttons
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-[var(--color-primary-dark)] text-white hover:opacity-90 focus:ring-[var(--color-primary-dark)] active:scale-95",
    secondary:
      "bg-[var(--color-secondary-blue)] text-white hover:opacity-90 focus:ring-[var(--color-secondary-blue)] active:scale-95",
    outline:
      "border-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)] hover:text-white focus:ring-[var(--color-primary-dark)] active:scale-95",
  };

  // Size styles - ensuring minimum 44x44px for touch targets (Requirement 13.2)
  const sizeStyles = {
    sm: "px-4 py-2.5 text-sm rounded-md min-h-[44px]", // 44px minimum height
    md: "px-6 py-3 text-base rounded-lg min-h-[44px]", // 44px minimum height
    lg: "px-8 py-4 text-lg rounded-lg min-h-[48px]", // Larger for emphasis
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className
  );

  // Render as link if href is provided and not empty
  if (href && href.trim() !== "") {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={handleClick}
        aria-disabled={disabled}
      >
        {children}
        {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
    </button>
  );
}
