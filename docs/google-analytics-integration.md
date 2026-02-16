# Google Analytics 4 Integration

This document describes the Google Analytics 4 (GA4) integration implemented for the Mahe Tech Systems website.

## Overview

The website integrates GA4 for tracking user behavior, conversions, and page views. The implementation includes:

- GA4 gtag.js tracking code
- Automatic page view tracking
- Event tracking for CTAs, forms, and outbound links
- Consent management support
- Privacy-respecting analytics

## Requirements

**Validates:** Requirements 12.1, 12.4, 12.5, 12.6, 12.7

## Implementation

### 1. GoogleAnalytics Component

Location: `src/components/analytics/GoogleAnalytics.tsx`

A client-side component that loads the GA4 tracking script and initializes analytics with consent management.

**Features:**
- Loads gtag.js script using Next.js Script component with `afterInteractive` strategy
- Implements consent mode for GDPR compliance
- Only loads when measurement ID is configured
- Sets default consent to denied, then grants analytics storage

**Usage:**
```tsx
import { GoogleAnalytics } from "@/components/analytics";

<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
```

### 2. Analytics Utility Functions

Location: `src/lib/analytics.ts`

Provides helper functions for tracking various events:

**Functions:**
- `trackPageView(path)` - Track page views
- `trackCTAClick(ctaId, ctaText, destination)` - Track CTA button clicks
- `trackFormSubmission(formType, formId)` - Track form submissions
- `trackOutboundLink(url, linkText)` - Track external link clicks
- `trackEvent(eventName, params)` - Track custom events
- `updateConsent(analyticsConsent)` - Update consent preferences

**Usage:**
```typescript
import { trackCTAClick, trackFormSubmission } from "@/lib/analytics";

// Track CTA click
trackCTAClick("hero-cta", "Get Started", "/contact");

// Track form submission
trackFormSubmission("contact", "contact-form");
```

### 3. Integration Points

#### Root Layout
The GoogleAnalytics component is integrated in the root layout (`src/app/layout.tsx`) to track all pages:

```tsx
<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
```

#### CTAButton Component
CTA buttons automatically track clicks when a `trackingEvent` prop is provided:

```tsx
<CTAButton trackingEvent="hero_cta" href="/contact">
  Get Started
</CTAButton>
```

#### ContactForm Component
The contact form tracks successful submissions:

```typescript
trackFormSubmission("contact", "contact-form");
```

## Configuration

### Environment Variables

Add your GA4 measurement ID to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** The measurement ID must start with `NEXT_PUBLIC_` to be accessible in client-side code.

### Getting Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or select an existing one
3. Navigate to Admin > Data Streams
4. Select your web data stream
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Consent Management

The implementation includes basic consent management:

1. **Default State:** Analytics storage is denied by default
2. **Consent Grant:** Analytics storage is granted after initialization
3. **User Control:** The `updateConsent()` function allows updating consent based on user preferences

### Implementing a Consent Banner

To implement a full consent banner:

1. Create a consent banner component
2. Store user preference in localStorage or cookies
3. Call `updateConsent(true/false)` based on user choice
4. Update the GoogleAnalytics component to respect stored preferences

Example:
```typescript
import { updateConsent } from "@/lib/analytics";

// When user accepts analytics
updateConsent(true);

// When user declines analytics
updateConsent(false);
```

## Event Tracking

### Tracked Events

The following events are automatically tracked:

1. **Page Views** - Automatic on every page load
2. **CTA Clicks** - When CTA buttons with `trackingEvent` prop are clicked
3. **Form Submissions** - When contact form is successfully submitted
4. **Outbound Links** - When external links are clicked (requires implementation)

### Event Parameters

Each event includes relevant parameters:

**CTA Click:**
- `event_category`: "CTA"
- `event_label`: Button text
- `cta_id`: Tracking event ID
- `destination`: Link destination

**Form Submission:**
- `event_category`: "Form"
- `event_label`: Form type
- `form_id`: Form identifier

**Outbound Link:**
- `event_category`: "Outbound Link"
- `event_label`: Link text or URL
- `destination_url`: Destination URL

## Testing

### Development Environment

GA4 tracking is disabled in development by default (when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set). To test in development:

1. Add your measurement ID to `.env.local`
2. Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension
3. Check browser console for gtag events

### Production Testing

1. Deploy to production with measurement ID configured
2. Use GA4 DebugView in Google Analytics
3. Verify events appear in real-time reports

## Privacy Considerations

The implementation respects user privacy:

1. **Consent Mode:** Implements Google's consent mode
2. **No PII:** Does not track personally identifiable information
3. **IP Anonymization:** GA4 anonymizes IP addresses by default
4. **User Control:** Allows users to opt-out via consent management

## Performance Impact

The GA4 integration is optimized for performance:

1. **Lazy Loading:** Scripts load with `afterInteractive` strategy
2. **No Blocking:** Does not block page rendering
3. **Minimal Size:** gtag.js is ~17KB gzipped
4. **CDN Delivery:** Served from Google's CDN

## Troubleshooting

### Events Not Appearing

1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify the measurement ID format (G-XXXXXXXXXX)
3. Check browser console for errors
4. Use GA4 DebugView to see real-time events
5. Ensure ad blockers are disabled for testing

### Consent Issues

1. Verify consent is granted: Check `window.gtag` calls in console
2. Test with different consent states
3. Clear cookies and test fresh consent flow

## Future Enhancements

Potential improvements for the analytics implementation:

1. **Enhanced E-commerce Tracking** - Track product views, add to cart, purchases
2. **User ID Tracking** - Track authenticated users across sessions
3. **Custom Dimensions** - Add custom dimensions for user segments
4. **Scroll Tracking** - Track scroll depth on key pages
5. **Video Tracking** - Track video plays and engagement
6. **Download Tracking** - Track PDF and file downloads
7. **Search Tracking** - Track internal site search queries

## References

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Consent Mode Documentation](https://developers.google.com/tag-platform/security/guides/consent)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs/reference)
