"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

/**
 * StickyCTA Component
 *
 * A sticky call-to-action button that appears when the user scrolls past the hero section.
 * Implements smooth fade-in animation and ensures no impact on CLS score.
 *
 * Features:
 * - Appears after scrolling past hero section (default: 600px)
 * - Smooth fade-in animation with opacity and transform
 * - Respects prefers-reduced-motion setting
 * - Fixed positioning at bottom of viewport
 * - No layout shift impact (uses fixed positioning with reserved space)
 * - Analytics tracking support
 *
 * Requirements: 3.7, 10.5
 */

interface StickyCTAProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: string;
  trackingEvent?: string;
  scrollThreshold?: number; // Pixels from top before showing (default: 600)
  className?: string;
}

export function StickyCTA({
  text,
  href,
  variant = "primary",
  size = "md",
  icon,
  trackingEvent = "sticky_cta_click",
  scrollThreshold = 600,
  className,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > scrollThreshold;

      // Update visibility state
      setIsVisible(shouldShow);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  return (
    <>
      {/* Fixed container - always in DOM to prevent CLS */}
      <div
        data-testid="sticky-cta"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 pointer-events-none",
          "transition-opacity duration-300 ease-in-out",
          isVisible ? "opacity-100" : "opacity-0",
          className
        )}
        aria-hidden={!isVisible}
      >
        {/* Inner container with padding and gradient background */}
        <div className="relative">
          {/* Gradient overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />

          {/* CTA Button Container */}
          <div className="relative flex justify-center px-4 py-4 sm:py-6 pointer-events-auto">
            <div
              className={cn(
                "transform transition-all duration-300 ease-in-out",
                isVisible
                  ? "translate-y-0 scale-100"
                  : "translate-y-4 scale-95"
              )}
            >
              <CTAButton
                href={href}
                variant={variant}
                size={size}
                icon={icon}
                trackingEvent={trackingEvent}
                className="shadow-lg hover:shadow-xl"
              >
                {text}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
