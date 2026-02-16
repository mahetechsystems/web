# Outbound Link Tracking Implementation

This document describes the outbound link tracking implementation for the Mahe Tech Systems website.

## Overview

The website tracks all external link clicks using the `OutboundLink` component, which automatically sends events to Google Analytics 4. This helps understand user behavior, identify popular external resources, and measure engagement with partner sites.

## Requirements

**Validates:** Requirements 12.6

## Implementation

### 1. OutboundLink Component

Location: `src/components/ui/OutboundLink.tsx`

A client-side component that wraps external links and automatically tracks clicks in Google Analytics 4.

**Features:**
- Automatic click tracking for all external links
- Custom tracking labels for better analytics insights
- Security best practices (noopener noreferrer)
- Full TypeScript support
- Accessible keyboard navigation
- Preserves all standard anchor attributes

**Usage:**
```tsx
import { OutboundLink } from "@/components/ui";

<OutboundLink href="https://example.com" trackingLabel="Partner Site">
  Visit our partner
</OutboundLink>
```

### 2. Analytics Utility Function

Location: `src/lib/analytics.ts`

The `trackOutboundLink()` function sends outbound link events to Google Analytics 4:

```typescript
export function trackOutboundLink(url: string, linkText?: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "outbound_link_click", {
      event_category: "Outbound Link",
      event_label: linkText || url,
      destination_url: url,
    });
  }
}
```

## Integration Points

The `OutboundLink` component should be used for all external links across the website:

### 1. Social Media Links (Footer)

Location: `src/components/layout/Footer.tsx`

```tsx
import { OutboundLink } from "@/components/ui";

<OutboundLink 
  href="https://twitter.com/mahetech"
  trackingLabel="Twitter - Footer"
  className="social-link"
>
  <TwitterIcon />
</OutboundLink>
```

### 2. WhatsApp Contact Links

Location: `src/app/contact/page.tsx`, `src/components/layout/Footer.tsx`

```tsx
<OutboundLink 
  href={`https://wa.me/${whatsappNumber}`}
  trackingLabel="WhatsApp Contact"
  className="whatsapp-link"
>
  <WhatsAppIcon /> Chat on WhatsApp
</OutboundLink>
```

### 3. Social Sharing Links

Location: `src/app/blog/[slug]/page.tsx`, `src/app/case-studies/[slug]/page.tsx`

```tsx
<OutboundLink
  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`}
  trackingLabel="Share on Twitter"
  className="share-button"
>
  <TwitterIcon /> Share on Twitter
</OutboundLink>
```

### 4. Author Social Links

Location: `src/app/blog/[slug]/page.tsx`

```tsx
<OutboundLink
  href={author.social.twitter}
  trackingLabel={`Author Twitter - ${author.name}`}
  className="author-social-link"
>
  <TwitterIcon />
</OutboundLink>
```

### 5. External Content Links

Location: Blog post content, case study content

```tsx
<OutboundLink
  href="https://docs.example.com"
  trackingLabel="Documentation Link"
>
  Read the documentation
</OutboundLink>
```

### 6. Calendly Fallback Link

Location: `src/components/CalendlyEmbed.tsx`

```tsx
<OutboundLink
  href={calendlyUrl}
  trackingLabel="Calendly Fallback"
  className="calendly-fallback-link"
>
  Open scheduling page in new tab
</OutboundLink>
```

### 7. Privacy Policy Link

Location: `src/components/ContactForm.tsx`

```tsx
<OutboundLink
  href="/privacy"
  trackingLabel="Privacy Policy - Contact Form"
>
  privacy policy
</OutboundLink>
```

## Analytics Events

### Event Structure

**Event Name:** `outbound_link_click`

**Event Parameters:**
- `event_category`: "Outbound Link"
- `event_label`: Link text or custom tracking label
- `destination_url`: The destination URL

### Example Events

**Social Media Click:**
```javascript
{
  event: "outbound_link_click",
  event_category: "Outbound Link",
  event_label: "Twitter - Footer",
  destination_url: "https://twitter.com/mahetech"
}
```

**WhatsApp Contact:**
```javascript
{
  event: "outbound_link_click",
  event_category: "Outbound Link",
  event_label: "WhatsApp Contact",
  destination_url: "https://wa.me/919876543210"
}
```

**Social Sharing:**
```javascript
{
  event: "outbound_link_click",
  event_category: "Outbound Link",
  event_label: "Share on Twitter",
  destination_url: "https://twitter.com/intent/tweet?url=..."
}
```

## Viewing Analytics Data

### Google Analytics 4 Dashboard

1. Navigate to **Reports** > **Engagement** > **Events**
2. Look for the `outbound_link_click` event
3. Click on the event to see details
4. View event parameters:
   - `event_label` - Shows which links are clicked most
   - `destination_url` - Shows where users are going

### Custom Reports

Create custom reports to analyze outbound link performance:

1. **Most Clicked External Links**
   - Dimension: `event_label`
   - Metric: Event count
   - Filter: Event name = `outbound_link_click`

2. **Outbound Links by Page**
   - Dimension: `page_path`, `event_label`
   - Metric: Event count
   - Filter: Event name = `outbound_link_click`

3. **Social Media Engagement**
   - Dimension: `event_label`
   - Metric: Event count
   - Filter: Event name = `outbound_link_click` AND event_label contains "Twitter" OR "LinkedIn" OR "Facebook"

## Best Practices

### 1. Use Descriptive Tracking Labels

Always provide meaningful tracking labels that help identify the link's context:

```tsx
// ❌ Not descriptive
<OutboundLink href="https://twitter.com/mahetech">
  Twitter
</OutboundLink>

// ✅ Descriptive with context
<OutboundLink 
  href="https://twitter.com/mahetech"
  trackingLabel="Twitter - Footer Social Links"
>
  <TwitterIcon /> Follow us
</OutboundLink>
```

### 2. Include Location Context

Add location context to tracking labels for better insights:

```tsx
// Footer social links
<OutboundLink trackingLabel="Twitter - Footer">...</OutboundLink>

// Blog author links
<OutboundLink trackingLabel="Twitter - Blog Author">...</OutboundLink>

// Share buttons
<OutboundLink trackingLabel="Twitter - Blog Share">...</OutboundLink>
```

### 3. Track All External Links

Replace all external `<a>` tags with `<OutboundLink>`:

```tsx
// ❌ Untracked external link
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>

// ✅ Tracked external link
<OutboundLink href="https://example.com" trackingLabel="Example Link">
  External Link
</OutboundLink>
```

### 4. Use Semantic Link Text

Provide meaningful link text for accessibility and analytics:

```tsx
// ❌ Non-semantic
<OutboundLink href="https://docs.example.com">click here</OutboundLink>

// ✅ Semantic
<OutboundLink href="https://docs.example.com" trackingLabel="Documentation">
  Read the documentation
</OutboundLink>
```

## Testing

### Development Testing

1. Add your GA4 measurement ID to `.env.local`
2. Open your site in a browser
3. Click on external links
4. Check browser console for gtag events:
   ```javascript
   gtag('event', 'outbound_link_click', {...})
   ```

### Production Testing

1. Deploy to production with GA4 configured
2. Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) extension
3. Click external links and verify events in GA4 DebugView
4. Check real-time reports in GA4 dashboard

### Automated Testing

Run the test suite to verify tracking functionality:

```bash
npm test -- OutboundLink.test.tsx
```

## Troubleshooting

### Events Not Appearing in GA4

1. **Check GA4 Configuration**
   - Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
   - Ensure GoogleAnalytics component is loaded in root layout
   - Check measurement ID format (G-XXXXXXXXXX)

2. **Check Browser Console**
   - Look for JavaScript errors
   - Verify gtag is defined: `console.log(window.gtag)`
   - Check if events are being called

3. **Disable Ad Blockers**
   - Ad blockers may prevent analytics scripts from loading
   - Disable for testing purposes

4. **Use GA4 DebugView**
   - Navigate to Admin > DebugView in GA4
   - Click external links
   - Verify events appear in real-time

### Links Not Tracking

1. **Verify Component Usage**
   - Ensure you're using `<OutboundLink>` not `<a>`
   - Check that href is provided
   - Verify component is imported correctly

2. **Check Analytics Initialization**
   - Ensure Google Analytics is loaded before link clicks
   - Check that gtag is available in window object

3. **Review Console Errors**
   - Check for JavaScript errors
   - Verify analytics.ts is imported correctly

## Performance Impact

The outbound link tracking has minimal performance impact:

- **Bundle Size:** ~1KB per component (minified)
- **Runtime Overhead:** Single function call on click (negligible)
- **No Re-renders:** Pure component with no internal state
- **No Blocking:** Analytics calls are asynchronous

## Privacy Considerations

The implementation respects user privacy:

1. **No PII Tracking:** Only tracks URLs and link text
2. **Consent Management:** Respects GA4 consent mode
3. **User Control:** Users can opt-out via browser settings
4. **Transparent:** Disclosed in privacy policy

## Migration Checklist

To implement outbound link tracking across the site:

- [ ] Replace all external `<a>` tags with `<OutboundLink>`
- [ ] Add descriptive tracking labels to all links
- [ ] Test tracking in development
- [ ] Verify events in GA4 DebugView
- [ ] Update privacy policy to mention outbound link tracking
- [ ] Create custom reports in GA4 for analysis
- [ ] Document any custom tracking patterns

## Future Enhancements

Potential improvements for outbound link tracking:

1. **Link Categories:** Add category parameter for better segmentation
2. **Click Position:** Track position of link on page (header, footer, content)
3. **User Segment Tracking:** Track outbound clicks by user segment
4. **Conversion Attribution:** Link outbound clicks to conversions
5. **A/B Testing:** Test different link placements and text
6. **Heatmap Integration:** Combine with Microsoft Clarity for visual analysis

## Related Documentation

- [Analytics Setup Guide](./analytics-setup.md)
- [Google Analytics Integration](./google-analytics-integration.md)
- [OutboundLink Component README](../src/components/ui/OutboundLink.README.md)

## References

- [Google Analytics 4 - Outbound Link Tracking](https://support.google.com/analytics/answer/7478520)
- [GA4 Event Tracking Best Practices](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
