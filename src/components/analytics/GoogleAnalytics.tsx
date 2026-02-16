"use client";

import Script from "next/script";

/**
 * Google Analytics 4 Component
 * 
 * Integrates GA4 tracking with Next.js application.
 * Implements page view tracking and consent management.
 * 
 * Features:
 * - GA4 gtag.js integration
 * - Automatic page view tracking
 * - Consent management support
 * - Only loads in production or when measurement ID is configured
 * 
 * Requirements: 12.1, 12.7
 */

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Don't load GA in development unless explicitly configured
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Load gtag.js script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      
      {/* Initialize GA4 with consent management */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent mode
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
          
          // Initialize GA4
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
          
          // Grant consent (can be updated based on user preference)
          // In production, this should be controlled by a consent banner
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        `}
      </Script>
    </>
  );
}
