# Microsoft Clarity Integration

This document describes the Microsoft Clarity integration implemented for the Mahe Tech Systems website.

## Overview

The website integrates Microsoft Clarity for session recording, heatmaps, and user behavior analytics. The implementation includes:

- Clarity tracking script
- Session recording
- Heatmaps and click tracking
- User behavior insights
- Privacy-respecting analytics

## Requirements

**Validates:** Requirements 12.2, 12.7

## Implementation

### 1. MicrosoftClarity Component

Location: `src/components/analytics/MicrosoftClarity.tsx`

A client-side component that loads the Microsoft Clarity tracking script and initializes session recording.

**Features:**
- Loads Clarity script using Next.js Script component with `afterInteractive` strategy
- Only loads when project ID is configured
- Non-blocking script loading for optimal performance
- Privacy-respecting implementation

**Usage:**
```tsx
import { MicrosoftClarity } from "@/components/analytics";

<MicrosoftClarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
```

### 2. Integration Points

#### Root Layout
The MicrosoftClarity component is integrated in the root layout (`src/app/layout.tsx`) to track all pages:

```tsx
<MicrosoftClarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
```

## Configuration

### Environment Variables

Add your Microsoft Clarity project ID to `.env.local`:

```env
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id_here
```

**Note:** The project ID must start with `NEXT_PUBLIC_` to be accessible in client-side code.

### Getting Your Project ID

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with your Microsoft account
3. Create a new project or select an existing one
4. Navigate to Settings > Setup
5. Copy the Project ID from the tracking code

## Features

### Session Recording

Microsoft Clarity automatically records user sessions, including:

- Mouse movements and clicks
- Scroll behavior
- Page navigation
- Form interactions (with privacy masking)
- Rage clicks and dead clicks

### Heatmaps

Clarity generates heatmaps showing:

- Click patterns
- Scroll depth
- Area attention
- User engagement zones

### Insights

Clarity provides automatic insights:

- Rage clicks (repeated clicks on non-interactive elements)
- Dead clicks (clicks that don't result in action)
- Quick backs (users leaving quickly)
- JavaScript errors
- Excessive scrolling

## Privacy Considerations

The implementation respects user privacy:

1. **Automatic Masking:** Clarity automatically masks sensitive data (passwords, credit cards, etc.)
2. **No PII Storage:** Does not store personally identifiable information
3. **GDPR Compliant:** Meets GDPR requirements for user data
4. **IP Anonymization:** IP addresses are anonymized
5. **User Control:** Respects Do Not Track browser settings

### Additional Privacy Configuration

To mask additional elements, add the `clarity-mask` class:

```html
<div className="clarity-mask">
  Sensitive content that should be masked in recordings
</div>
```

To exclude elements from recordings entirely, add the `clarity-exclude` class:

```html
<div className="clarity-exclude">
  Content that should not be recorded
</div>
```

## Performance Impact

The Microsoft Clarity integration is optimized for performance:

1. **Lazy Loading:** Script loads with `afterInteractive` strategy
2. **No Blocking:** Does not block page rendering
3. **Minimal Size:** Clarity script is ~45KB gzipped
4. **CDN Delivery:** Served from Microsoft's CDN
5. **Async Loading:** Loads asynchronously without impacting page load time

## Using Clarity Dashboard

### Viewing Sessions

1. Log in to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Select your project
3. Navigate to Recordings
4. Filter by date, device, location, or behavior
5. Click on a session to watch the replay

### Analyzing Heatmaps

1. Navigate to Heatmaps in the Clarity dashboard
2. Select a page to analyze
3. Choose between Click, Scroll, or Area heatmaps
4. Filter by device type, date range, or user segment
5. Identify patterns and optimization opportunities

### Reviewing Insights

1. Navigate to Insights in the Clarity dashboard
2. Review automatic insights:
   - Rage clicks: Areas causing user frustration
   - Dead clicks: Non-interactive elements users try to click
   - Quick backs: Pages users leave immediately
   - JavaScript errors: Technical issues affecting users
3. Click on insights to see related sessions

## Testing

### Development Environment

Microsoft Clarity is disabled in development by default (when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is not set). To test in development:

1. Add your project ID to `.env.local`
2. Open your site in a browser
3. Check browser console for Clarity initialization
4. Verify in Clarity dashboard that sessions are being recorded

### Production Testing

1. Deploy to production with project ID configured
2. Visit your site and perform various interactions
3. Wait 2-3 minutes for data to process
4. Check Clarity dashboard for recorded sessions

## Troubleshooting

### Sessions Not Appearing

1. Check that `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set correctly
2. Verify the project ID format (no quotes or extra characters)
3. Check browser console for errors
4. Ensure ad blockers are disabled for testing
5. Wait 2-3 minutes for sessions to appear in dashboard
6. Verify the project is active in Clarity dashboard

### Recording Quality Issues

1. Check network connection during session
2. Verify JavaScript is enabled
3. Check for browser compatibility issues
4. Review Clarity status page for service issues

### Privacy Masking Issues

1. Add `clarity-mask` class to sensitive elements
2. Use `clarity-exclude` for elements that shouldn't be recorded
3. Review masking settings in Clarity dashboard
4. Test with different types of sensitive data

## Best Practices

### 1. Respect User Privacy

- Always inform users about session recording in your privacy policy
- Mask sensitive information appropriately
- Respect Do Not Track settings
- Provide opt-out mechanisms if required by regulations

### 2. Optimize Performance

- Keep the script loading strategy as `afterInteractive`
- Don't add custom Clarity code that blocks rendering
- Monitor performance impact in production

### 3. Analyze Regularly

- Review sessions weekly to identify usability issues
- Monitor rage clicks and dead clicks for UX problems
- Use heatmaps to optimize page layouts
- Track JavaScript errors and fix them promptly

### 4. Segment Your Data

- Filter sessions by device type to optimize mobile experience
- Analyze sessions by traffic source to understand user intent
- Review sessions with errors separately
- Focus on high-value pages (contact, services, case studies)

## Integration with Other Analytics

Microsoft Clarity complements Google Analytics:

- **GA4:** Provides quantitative data (page views, conversions, metrics)
- **Clarity:** Provides qualitative data (how users interact, where they struggle)

Use both together for comprehensive insights:

1. Identify issues in GA4 (high bounce rate, low conversion)
2. Use Clarity to understand why (watch sessions, review heatmaps)
3. Make improvements based on insights
4. Measure impact in GA4

## Future Enhancements

Potential improvements for the Clarity implementation:

1. **Custom Tags:** Add custom tags to sessions for better filtering
2. **API Integration:** Use Clarity API for custom reporting
3. **Automated Alerts:** Set up alerts for critical issues (high rage clicks, errors)
4. **A/B Testing Integration:** Combine with A/B testing tools
5. **User Feedback:** Integrate with user feedback tools for context

## References

- [Microsoft Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Setup Guide](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)
- [Privacy and Security](https://docs.microsoft.com/en-us/clarity/privacy-and-security)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)

