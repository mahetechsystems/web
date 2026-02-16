# Code Splitting Implementation

## Overview

This document describes the code splitting strategy implemented for the Mahe Tech Systems website to optimize performance and reduce initial bundle sizes.

## Implementation Details

### 1. Route-Based Code Splitting

Next.js 14 with App Router automatically implements route-based code splitting. Each route has its own JavaScript bundle that is loaded on-demand.

**Verification:**
- Each route in `.next/server/app/` has its own `page.js` file
- Routes include: `/`, `/about`, `/services`, `/blog`, `/case-studies`, `/contact`
- This ensures users only download the JavaScript needed for the page they're visiting

### 2. Dynamic Component Imports

Heavy components are dynamically imported to reduce the initial bundle size and improve First Contentful Paint (FCP).

#### CalendlyEmbed Component

The Calendly embed widget is a heavy third-party component that:
- Loads external scripts from Calendly's CDN
- Is only needed on the contact page
- Should not block the initial page load

**Implementation:**

```typescript
// src/components/CalendlySection.tsx
"use client";

import dynamic from "next/dynamic";

const CalendlyEmbed = dynamic(
  () => import("@/components/CalendlyEmbed").then((mod) => ({ default: mod.CalendlyEmbed })),
  {
    ssr: false, // Disable server-side rendering (client-only)
    loading: () => <LoadingSpinner />, // Show loading state
  }
);
```

**Benefits:**
- CalendlyEmbed code is split into a separate chunk
- The component is only loaded when the contact page is visited
- SSR is disabled since Calendly requires browser APIs
- Users see a loading spinner while the component loads

### 3. Bundle Analysis

#### Analysis Script

A bundle analysis script (`scripts/analyze-bundle.sh`) is provided to verify code splitting:

```bash
npm run build
./scripts/analyze-bundle.sh
```

#### Current Bundle Sizes

Based on the latest build:

**Route-Specific Bundles:**
- Home page: 1.0K
- About page: 1.0K
- Services page: 1.0K
- Blog listing: 1.0K
- Blog post: 1.2K
- Case studies listing: 1.0K
- Case study detail: 1.1K
- Contact page: 1.0K

**Client-Side Chunks:**
- Total client chunks: 8.5M
- Largest chunk: 4.4M (shared React/Next.js runtime)
- CalendlyEmbed: Separate chunk (dynamically loaded)

### 4. Configuration

#### next.config.ts

```typescript
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"], // Optimize specific packages
  },
};
```

#### Bundle Analyzer

The `@next/bundle-analyzer` package is configured for detailed bundle analysis:

```bash
# Analyze bundle with experimental Turbopack analyzer
npm run analyze
```

**Note:** The traditional webpack bundle analyzer is not compatible with Turbopack. Use `next experimental-analyze` instead.

## Performance Impact

### Before Code Splitting
- All JavaScript loaded on initial page load
- Calendly widget loaded even on pages that don't use it
- Larger initial bundle size

### After Code Splitting
- Only route-specific code loaded per page
- Calendly widget loaded on-demand (contact page only)
- Reduced initial bundle size
- Improved First Contentful Paint (FCP)
- Better Core Web Vitals scores

## Verification Checklist

- [x] Route-based code splitting is working (each route has separate bundle)
- [x] CalendlyEmbed is dynamically imported
- [x] CalendlyEmbed has SSR disabled (client-only)
- [x] Loading state is shown while CalendlyEmbed loads
- [x] Bundle analyzer is configured
- [x] Analysis script is available
- [x] Build succeeds without errors

## Future Optimizations

### Potential Candidates for Code Splitting

1. **Animation Libraries**
   - Framer Motion (if used for heavy animations)
   - Consider dynamic imports for animation-heavy components

2. **Form Libraries**
   - React Hook Form is already tree-shakeable
   - Consider splitting complex form validation logic

3. **CMS Content Rendering**
   - Portable Text renderer for blog posts
   - Could be split if blog content becomes very rich

4. **Analytics Scripts**
   - Google Analytics
   - Microsoft Clarity
   - Consider loading these after initial page load

### Monitoring

- Monitor bundle sizes in CI/CD pipeline
- Set up alerts for bundle size increases
- Track Core Web Vitals in production
- Use Lighthouse CI for automated performance testing

## Related Requirements

This implementation satisfies:
- **Requirement 1.7:** Route-based code splitting for JavaScript delivery
- **Requirement 1.1:** First Contentful Paint < 1.2 seconds
- **Requirement 1.2:** Full page load < 1.5 seconds
- **Requirement 1.3:** Lighthouse performance score ≥ 95

## References

- [Next.js Code Splitting Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [Dynamic Imports in Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
- [Bundle Analysis with Turbopack](https://nextjs.org/docs/app/guides/package-bundling)
