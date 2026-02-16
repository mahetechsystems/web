# Analytics Setup Guide

This guide walks you through setting up analytics for the Mahe Tech Systems website.

## Overview

The website uses two analytics platforms:

1. **Google Analytics 4 (GA4)** - For quantitative data (page views, conversions, traffic sources)
2. **Microsoft Clarity** - For qualitative data (session recordings, heatmaps, user behavior)

## Quick Setup

### 1. Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com/)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

**Documentation:** See [google-analytics-integration.md](./google-analytics-integration.md) for detailed setup.

### 2. Microsoft Clarity

1. Create a project at [clarity.microsoft.com](https://clarity.microsoft.com/)
2. Get your Project ID from Settings > Setup
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id_here
   ```

**Documentation:** See [microsoft-clarity-integration.md](./microsoft-clarity-integration.md) for detailed setup.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your analytics IDs:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id_here
```

## Verification

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your site in a browser

3. Check browser console for analytics initialization

4. For GA4: Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) extension

5. For Clarity: Check Clarity dashboard after 2-3 minutes

### Production

1. Deploy to production with environment variables configured

2. Visit your site and perform various interactions

3. Check analytics dashboards:
   - GA4: Real-time reports
   - Clarity: Recordings (wait 2-3 minutes)

## Privacy Compliance

Both analytics implementations respect user privacy:

- **Consent Management:** GA4 implements consent mode
- **Data Masking:** Clarity automatically masks sensitive data
- **IP Anonymization:** Both platforms anonymize IP addresses
- **No PII:** Neither platform tracks personally identifiable information

**Important:** Update your privacy policy to inform users about analytics tracking.

## Performance Impact

Both analytics implementations are optimized for performance:

- Scripts load with `afterInteractive` strategy (after page is interactive)
- Non-blocking loading (doesn't delay page rendering)
- CDN delivery (fast loading from global edge locations)
- Minimal size (GA4: ~17KB, Clarity: ~45KB gzipped)

## Troubleshooting

### Analytics Not Loading

1. Check environment variables are set correctly
2. Verify variable names start with `NEXT_PUBLIC_`
3. Restart development server after changing `.env.local`
4. Check browser console for errors
5. Disable ad blockers for testing

### Data Not Appearing

**GA4:**
- Wait 24-48 hours for data to appear in standard reports
- Use Real-time reports for immediate verification
- Check measurement ID format (must start with `G-`)

**Clarity:**
- Wait 2-3 minutes for sessions to process
- Check project is active in Clarity dashboard
- Verify project ID is correct (no quotes or spaces)

## Best Practices

### 1. Use Both Platforms Together

- **GA4:** Identify what's happening (metrics, conversions)
- **Clarity:** Understand why it's happening (user behavior)

### 2. Regular Monitoring

- Review GA4 weekly for traffic trends
- Watch Clarity sessions monthly for UX issues
- Monitor rage clicks and dead clicks
- Track JavaScript errors

### 3. Privacy First

- Always inform users about tracking
- Respect Do Not Track settings
- Mask sensitive information
- Provide opt-out mechanisms

### 4. Performance Monitoring

- Monitor analytics impact on page load time
- Keep scripts loading asynchronously
- Don't add blocking analytics code

## Event Tracking

The website automatically tracks:

- **Page Views** - All page loads
- **CTA Clicks** - Call-to-action button clicks (via CTAButton component)
- **Form Submissions** - Contact form submissions (via ContactForm component)
- **Outbound Links** - External link clicks (via OutboundLink component)

See the following guides for detailed information:
- [Google Analytics Integration](./google-analytics-integration.md) - Custom event tracking
- [Outbound Link Tracking](./outbound-link-tracking.md) - External link tracking implementation

## Support

For detailed documentation:

- [Google Analytics Integration](./google-analytics-integration.md)
- [Microsoft Clarity Integration](./microsoft-clarity-integration.md)

For platform-specific help:

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)

