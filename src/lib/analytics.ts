/**
 * Analytics Utility Functions
 * 
 * Provides helper functions for tracking events in Google Analytics 4.
 * Handles page views, CTA clicks, form submissions, and outbound links.
 * 
 * Requirements: 12.1, 12.4, 12.5, 12.6, 12.7
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a page view in Google Analytics
 * @param path - The page path to track
 */
export function trackPageView(path: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
    });
  }
}

/**
 * Track a CTA button click
 * @param ctaId - Identifier for the CTA button
 * @param ctaText - Text content of the CTA
 * @param destination - Where the CTA leads
 */
export function trackCTAClick(
  ctaId: string,
  ctaText: string,
  destination?: string
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "CTA",
      event_label: ctaText,
      cta_id: ctaId,
      destination: destination,
    });
  }
}

/**
 * Track a form submission
 * @param formType - Type of form (e.g., "contact", "newsletter")
 * @param formId - Identifier for the form
 */
export function trackFormSubmission(formType: string, formId?: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submission", {
      event_category: "Form",
      event_label: formType,
      form_id: formId,
    });
  }
}

/**
 * Track an outbound link click
 * @param url - The destination URL
 * @param linkText - Text content of the link
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "outbound_link_click", {
      event_category: "Outbound Link",
      event_label: linkText || url,
      destination_url: url,
    });
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param params - Additional parameters for the event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Update consent preferences
 * @param analyticsConsent - Whether analytics storage is granted
 */
export function updateConsent(analyticsConsent: boolean): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: analyticsConsent ? "granted" : "denied",
    });
  }
}
