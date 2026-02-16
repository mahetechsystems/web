# OutboundLink Component

A wrapper component for external links that automatically tracks clicks in Google Analytics 4.

## Purpose

The `OutboundLink` component provides automatic analytics tracking for external links, helping you understand which outbound links users click and where they navigate to from your site.

## Features

- ✅ Automatic outbound link click tracking in GA4
- ✅ Preserves all standard anchor element attributes
- ✅ Security best practices (noopener noreferrer)
- ✅ Accessible keyboard navigation
- ✅ Custom tracking labels support
- ✅ TypeScript support with full type safety

## Requirements

**Validates:** Requirements 12.6

## Usage

### Basic Usage

```tsx
import { OutboundLink } from "@/components/ui";

<OutboundLink href="https://example.com">
  Visit Example
</OutboundLink>
```

### With Custom Tracking Label

```tsx
<OutboundLink 
  href="https://github.com/mahetech" 
  trackingLabel="GitHub Profile"
>
  View on GitHub
</OutboundLink>
```

### With Additional Props

```tsx
<OutboundLink 
  href="https://example.com"
  className="text-blue-600 hover:underline"
  aria-label="Visit our partner site"
>
  Partner Site
</OutboundLink>
```

### With Custom Click Handler

```tsx
<OutboundLink 
  href="https://example.com"
  onClick={(e) => {
    console.log("Link clicked!");
    // Analytics tracking happens automatically
  }}
>
  Click Me
</OutboundLink>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `href` | `string` | Yes | - | The destination URL (external link) |
| `children` | `ReactNode` | Yes | - | Link content (text, icons, etc.) |
| `trackingLabel` | `string` | No | Link text or href | Custom label for analytics event |
| `onClick` | `function` | No | - | Custom click handler (called after tracking) |
| `...props` | `HTMLAnchorElement` | No | - | All standard anchor element attributes |

## Analytics Events

When a user clicks an outbound link, the following event is sent to Google Analytics 4:

**Event Name:** `outbound_link_click`

**Event Parameters:**
- `event_category`: "Outbound Link"
- `event_label`: Link text or custom tracking label
- `destination_url`: The destination URL

### Example Event in GA4

```javascript
{
  event: "outbound_link_click",
  event_category: "Outbound Link",
  event_label: "GitHub Profile",
  destination_url: "https://github.com/mahetech"
}
```

## Security

The component automatically applies security best practices:

- `target="_blank"` - Opens link in new tab
- `rel="noopener noreferrer"` - Prevents security vulnerabilities

These attributes protect against:
- **Tabnabbing attacks** - Prevents the new page from accessing `window.opener`
- **Referrer leakage** - Prevents sending referrer information to external sites

## Accessibility

The component maintains full accessibility:

- ✅ Keyboard navigation (Tab, Enter)
- ✅ Screen reader support
- ✅ Focus indicators (inherited from parent styles)
- ✅ ARIA attributes support

## Examples

### Social Media Links

```tsx
<OutboundLink 
  href="https://twitter.com/mahetech"
  trackingLabel="Twitter Profile"
  className="text-blue-500 hover:text-blue-700"
>
  <TwitterIcon /> Follow us on Twitter
</OutboundLink>
```

### External Resources

```tsx
<OutboundLink 
  href="https://docs.example.com"
  trackingLabel="Documentation"
>
  Read the documentation
</OutboundLink>
```

### Partner Links

```tsx
<OutboundLink 
  href="https://partner.com"
  trackingLabel="Partner Site - Homepage"
  className="font-semibold"
>
  Visit our partner
</OutboundLink>
```

### WhatsApp Links

```tsx
<OutboundLink 
  href={`https://wa.me/${whatsappNumber}`}
  trackingLabel="WhatsApp Contact"
  className="inline-flex items-center gap-2"
>
  <WhatsAppIcon /> Chat on WhatsApp
</OutboundLink>
```

## Migration Guide

### Before (Manual Tracking)

```tsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackOutboundLink("https://example.com", "Example")}
>
  Visit Example
</a>
```

### After (Automatic Tracking)

```tsx
<OutboundLink href="https://example.com" trackingLabel="Example">
  Visit Example
</OutboundLink>
```

## Testing

The component can be tested using standard React testing practices:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { OutboundLink } from "./OutboundLink";
import * as analytics from "@/lib/analytics";

// Mock the analytics module
jest.mock("@/lib/analytics");

test("tracks outbound link click", () => {
  const trackOutboundLinkMock = jest.spyOn(analytics, "trackOutboundLink");
  
  render(
    <OutboundLink href="https://example.com">
      Visit Example
    </OutboundLink>
  );
  
  const link = screen.getByText("Visit Example");
  fireEvent.click(link);
  
  expect(trackOutboundLinkMock).toHaveBeenCalledWith(
    "https://example.com",
    "Visit Example"
  );
});
```

## Performance

The component has minimal performance impact:

- **Bundle Size:** ~1KB (minified)
- **Runtime Overhead:** Negligible (single function call on click)
- **No Re-renders:** Pure component with no internal state

## Best Practices

### 1. Use Descriptive Tracking Labels

```tsx
// ❌ Not descriptive
<OutboundLink href="https://example.com">Click here</OutboundLink>

// ✅ Descriptive
<OutboundLink href="https://example.com" trackingLabel="Partner Homepage">
  Visit our partner
</OutboundLink>
```

### 2. Track All External Links

Replace all external `<a>` tags with `<OutboundLink>` for consistent tracking:

```tsx
// ❌ Untracked external link
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>

// ✅ Tracked external link
<OutboundLink href="https://example.com">
  External Link
</OutboundLink>
```

### 3. Use Semantic Link Text

```tsx
// ❌ Non-semantic
<OutboundLink href="https://docs.example.com">here</OutboundLink>

// ✅ Semantic
<OutboundLink href="https://docs.example.com">
  Read the documentation
</OutboundLink>
```

### 4. Combine with Icons

```tsx
<OutboundLink 
  href="https://github.com/mahetech"
  className="inline-flex items-center gap-2"
>
  <GitHubIcon className="w-5 h-5" />
  View on GitHub
</OutboundLink>
```

## Troubleshooting

### Events Not Appearing in GA4

1. Check that Google Analytics is properly initialized
2. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
3. Use GA4 DebugView to see real-time events
4. Check browser console for errors
5. Disable ad blockers for testing

### Links Not Opening

1. Verify the `href` is a valid URL
2. Check for JavaScript errors in console
3. Ensure the link is not disabled by CSS

### Custom onClick Not Firing

The custom `onClick` handler fires after analytics tracking. If you need to prevent default behavior:

```tsx
<OutboundLink 
  href="https://example.com"
  onClick={(e) => {
    e.preventDefault();
    // Your custom logic
  }}
>
  Custom Behavior
</OutboundLink>
```

## Related Components

- **CTAButton** - For call-to-action buttons with tracking
- **ContactForm** - For form submission tracking
- **GoogleAnalytics** - For GA4 integration

## References

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Outbound Link Tracking Best Practices](https://support.google.com/analytics/answer/7478520)
- [Next.js Link Component](https://nextjs.org/docs/app/api-reference/components/link)
