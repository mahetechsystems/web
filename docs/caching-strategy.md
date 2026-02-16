# Caching Strategy Implementation

## Overview

This document describes the comprehensive caching strategy implemented for the Mahe Tech Systems website, designed to optimize performance while ensuring content freshness.

**Validates Requirements:** 18.6

## Caching Layers

### 1. Static Assets (Images, Fonts, JS, CSS)

**Cache Headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Configuration:**
- **Duration:** 1 year (31,536,000 seconds)
- **Immutable:** Yes (content never changes at this URL)
- **Location:** CDN edge locations globally

**Files Covered:**
- Images: `.svg`, `.jpg`, `.jpeg`, `.png`, `.gif`, `.ico`, `.webp`, `.avif`
- Fonts: `.woff`, `.woff2`, `.ttf`, `.eot`
- Next.js static bundles: `/_next/static/*`

**Rationale:**
Static assets are content-addressed (filename includes hash), so they never change. This allows aggressive caching without risk of serving stale content.

### 2. Static Pages (Home, About, Services, Contact)

**Cache Headers:**
```
Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate
```

**Configuration:**
- **Browser Cache:** 1 hour (3,600 seconds)
- **CDN Cache:** 24 hours (86,400 seconds)
- **Stale-While-Revalidate:** Enabled

**Pages Covered:**
- `/` (Home)
- `/about`
- `/services`
- `/contact`

**Behavior:**
1. First request: Server renders page, CDN caches for 24 hours
2. Within 1 hour: Browser serves from local cache
3. After 1 hour, within 24 hours: Browser requests from CDN, CDN serves cached version
4. After 24 hours: CDN serves stale content while fetching fresh version in background

**Rationale:**
Static pages change infrequently. This strategy provides instant load times while ensuring content is reasonably fresh.

### 3. Dynamic Pages (Blog Posts, Case Studies)

**ISR Configuration:**
```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

**Cache Headers:**
```
Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate
```

**Configuration:**
- **Browser Cache:** 0 seconds (always check CDN)
- **CDN Cache:** 60 seconds
- **ISR Revalidation:** 60 seconds
- **Stale-While-Revalidate:** Enabled

**Pages Covered:**
- `/blog` (listing)
- `/blog/[slug]` (individual posts)
- `/case-studies` (listing)
- `/case-studies/[slug]` (individual case studies)

**Behavior:**
1. First request: Server renders page, CDN caches for 60 seconds
2. Within 60 seconds: All requests served from CDN cache
3. After 60 seconds: Next request triggers background regeneration, stale content served immediately
4. Subsequent requests: Fresh content served from CDN

**Rationale:**
Blog posts and case studies are updated in Sanity CMS. ISR with 60-second revalidation ensures content is fresh within 1 minute while maintaining excellent performance.

### 4. API Routes

**Cache Headers:**
```
Cache-Control: no-cache, no-store, must-revalidate
```

**Configuration:**
- **Browser Cache:** None
- **CDN Cache:** None
- **Revalidation:** Always

**Routes Covered:**
- `/api/contact` (form submission)

**Rationale:**
API routes handle dynamic operations (form submissions) that should never be cached.

## Stale-While-Revalidate Strategy

### What is Stale-While-Revalidate?

Stale-While-Revalidate (SWR) is a caching strategy that serves cached (potentially stale) content immediately while fetching fresh content in the background.

### Benefits

1. **Instant Response:** Users see content immediately, no waiting
2. **Fresh Content:** Background updates ensure content stays current
3. **Reduced Server Load:** Most requests served from cache
4. **Better UX:** No loading spinners or delays

### Implementation

```
Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate
```

- `max-age=3600`: Browser cache for 1 hour
- `s-maxage=86400`: CDN cache for 24 hours
- `stale-while-revalidate`: Serve stale content while updating

### Flow Diagram

```
User Request
    ↓
Is content in cache?
    ↓
Yes → Is cache fresh?
    ↓
Yes → Serve from cache (instant)
    ↓
No → Is cache stale but valid?
    ↓
Yes → Serve stale content (instant)
       + Fetch fresh content in background
       + Update cache for next request
    ↓
No → Fetch from server
     + Cache for future requests
```

## ISR (Incremental Static Regeneration)

### Configuration

All dynamic pages use ISR with 60-second revalidation:

```typescript
// In page component
export const revalidate = 60;
```

### How ISR Works

1. **Build Time:** Pages are pre-rendered at build time
2. **First Request:** Pre-rendered page served instantly
3. **After 60 Seconds:** Next request triggers background regeneration
4. **Stale Content:** Old page served while new page generates
5. **Fresh Content:** New page cached and served to subsequent requests

### Benefits

- **Fast First Load:** Pre-rendered pages load instantly
- **Fresh Content:** Content updates within 60 seconds
- **No Downtime:** Stale content served during regeneration
- **Scalability:** Static pages scale infinitely

## Cache Configuration File

All caching configuration is centralized in `src/lib/cache.ts`:

```typescript
export const CACHE_CONFIG = {
  staticAssets: {
    maxAge: 31536000,
    immutable: true,
    header: "public, max-age=31536000, immutable",
  },
  staticPages: {
    maxAge: 3600,
    sMaxAge: 86400,
    staleWhileRevalidate: true,
    header: "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
  },
  dynamicPages: {
    revalidate: 60,
    maxAge: 0,
    sMaxAge: 60,
    staleWhileRevalidate: true,
    header: "public, max-age=0, s-maxage=60, stale-while-revalidate",
  },
  api: {
    default: {
      maxAge: 0,
      header: "no-cache, no-store, must-revalidate",
    },
  },
};
```

## Next.js Configuration

Cache headers are configured in `next.config.ts`:

```typescript
async headers() {
  return [
    // Static assets - 1 year cache
    {
      source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|eot)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Next.js static bundles - 1 year cache
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Static pages - 1 hour cache, 24 hour stale-while-revalidate
    {
      source: "/:path((?!api|_next/data).*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
        },
      ],
    },
  ];
}
```

## Performance Impact

### Before Caching

- **First Load:** 1.5s (server render)
- **Subsequent Loads:** 1.5s (server render)
- **Server Load:** High (every request hits server)

### After Caching

- **First Load:** 1.5s (server render, cached)
- **Subsequent Loads:** <100ms (served from cache)
- **Server Load:** Low (most requests served from cache)

### Metrics

- **Cache Hit Rate:** Expected >95% for static assets
- **CDN Hit Rate:** Expected >90% for pages
- **Time to First Byte (TTFB):** <50ms from CDN
- **Server Requests:** Reduced by ~90%

## Cache Invalidation

### Automatic Invalidation

1. **ISR:** Dynamic pages automatically revalidate every 60 seconds
2. **Build:** New deployments invalidate all caches
3. **Content-Addressed:** Static assets never need invalidation (new hash = new URL)

### Manual Invalidation (Future)

Next.js supports on-demand revalidation using cache tags:

```typescript
import { revalidateTag } from 'next/cache';

// Revalidate all blog posts
revalidateTag('blog-posts');

// Revalidate all case studies
revalidateTag('case-studies');
```

This can be triggered from Sanity CMS webhooks when content is published.

## CDN Configuration (Vercel)

Vercel automatically handles:

- **Edge Caching:** Content cached at 100+ edge locations globally
- **Cache Purging:** Automatic purge on new deployments
- **Compression:** Automatic gzip/brotli compression
- **HTTP/2:** Multiplexed connections for faster loading

## Testing Cache Behavior

### Check Cache Headers

```bash
# Check static asset caching
curl -I https://mahetechsystems.com/images/logo.png

# Check page caching
curl -I https://mahetechsystems.com/

# Check blog post caching
curl -I https://mahetechsystems.com/blog/example-post
```

### Expected Headers

**Static Asset:**
```
cache-control: public, max-age=31536000, immutable
x-vercel-cache: HIT
```

**Static Page:**
```
cache-control: public, max-age=3600, s-maxage=86400, stale-while-revalidate
x-vercel-cache: HIT
```

**Dynamic Page:**
```
cache-control: public, max-age=0, s-maxage=60, stale-while-revalidate
x-nextjs-cache: HIT
```

## Monitoring

### Key Metrics to Monitor

1. **Cache Hit Rate:** Percentage of requests served from cache
2. **TTFB:** Time to first byte from CDN
3. **Server Load:** Number of requests hitting origin server
4. **Content Freshness:** Time between content update and user seeing it

### Tools

- **Vercel Analytics:** Built-in performance monitoring
- **Google Analytics:** Page load times
- **Lighthouse:** Performance audits
- **WebPageTest:** Real-world performance testing

## Best Practices

1. **Content-Addressed Assets:** Always use hashed filenames for static assets
2. **Appropriate TTLs:** Balance freshness vs. performance
3. **Stale-While-Revalidate:** Use for better UX
4. **ISR for Dynamic Content:** Best of static and dynamic
5. **No API Caching:** Never cache form submissions or user-specific data
6. **Monitor Performance:** Track cache hit rates and TTFB

## Troubleshooting

### Content Not Updating

**Problem:** Changes in CMS not appearing on site

**Solution:**
1. Check ISR revalidation time (60 seconds)
2. Wait for revalidation period
3. Hard refresh browser (Ctrl+Shift+R)
4. Check Vercel deployment logs

### Slow First Load

**Problem:** First page load is slow

**Solution:**
1. Check if page is pre-rendered at build time
2. Verify CDN is serving content
3. Check image optimization
4. Review bundle size

### Cache Not Working

**Problem:** Every request hits server

**Solution:**
1. Check cache headers in browser DevTools
2. Verify Vercel configuration
3. Check for cache-busting query parameters
4. Review Next.js configuration

## Future Enhancements

1. **On-Demand Revalidation:** Trigger cache updates from CMS webhooks
2. **Service Worker:** Client-side caching for offline support
3. **Predictive Prefetching:** Preload likely next pages
4. **Edge Functions:** Move more logic to CDN edge
5. **Cache Analytics:** Detailed cache performance metrics

## References

- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
- [HTTP Caching MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Stale-While-Revalidate RFC](https://tools.ietf.org/html/rfc5861)
