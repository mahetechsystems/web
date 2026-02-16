/**
 * Caching Strategy Configuration
 * 
 * This module defines the caching strategy for the Mahe Tech Systems website
 * according to the design document specifications (Requirement 18.6).
 * 
 * Caching Layers:
 * 1. Static Assets: 1 year cache with immutable flag
 * 2. Static Pages: 1 hour cache, 24 hour stale-while-revalidate
 * 3. Dynamic Pages: ISR with 60 second revalidation
 * 4. API Routes: Custom cache headers per endpoint
 */

/**
 * Cache configuration for different content types
 */
export const CACHE_CONFIG = {
  // Static assets (images, fonts, etc.) - immutable, 1 year cache
  staticAssets: {
    maxAge: 31536000, // 1 year in seconds
    immutable: true,
    header: "public, max-age=31536000, immutable",
  },

  // Static pages (home, about, services, etc.) - 1 hour cache, 24 hour stale-while-revalidate
  staticPages: {
    maxAge: 3600, // 1 hour in seconds
    sMaxAge: 86400, // 24 hours in seconds (CDN cache)
    staleWhileRevalidate: true,
    header: "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
  },

  // Dynamic pages (blog posts, case studies) - ISR with 60 second revalidation
  dynamicPages: {
    revalidate: 60, // ISR revalidation time in seconds
    maxAge: 0, // No browser cache
    sMaxAge: 60, // 60 seconds CDN cache
    staleWhileRevalidate: true,
    header: "public, max-age=0, s-maxage=60, stale-while-revalidate",
  },

  // API routes - custom per endpoint
  api: {
    default: {
      maxAge: 0,
      header: "no-cache, no-store, must-revalidate",
    },
    contact: {
      maxAge: 0,
      header: "no-cache, no-store, must-revalidate",
    },
  },
} as const;

/**
 * ISR (Incremental Static Regeneration) configuration
 * 
 * These values are used in page components with `export const revalidate = X`
 */
export const ISR_CONFIG = {
  // Blog posts - revalidate every 60 seconds
  blogPosts: 60,
  
  // Case studies - revalidate every 60 seconds
  caseStudies: 60,
  
  // Blog listing page - revalidate every 60 seconds
  blogListing: 60,
  
  // Case studies listing page - revalidate every 60 seconds
  caseStudiesListing: 60,
} as const;

/**
 * Generate cache control header for static pages
 */
export function getStaticPageCacheHeader(): string {
  return CACHE_CONFIG.staticPages.header;
}

/**
 * Generate cache control header for dynamic pages
 */
export function getDynamicPageCacheHeader(): string {
  return CACHE_CONFIG.dynamicPages.header;
}

/**
 * Generate cache control header for API routes
 */
export function getApiCacheHeader(endpoint: keyof typeof CACHE_CONFIG.api = 'default'): string {
  return CACHE_CONFIG.api[endpoint].header;
}

/**
 * Cache tags for on-demand revalidation
 * 
 * These tags can be used with Next.js revalidateTag() for on-demand cache invalidation
 */
export const CACHE_TAGS = {
  blogPosts: 'blog-posts',
  caseStudies: 'case-studies',
  allContent: 'all-content',
} as const;

/**
 * Stale-While-Revalidate Strategy
 * 
 * This strategy allows serving stale content while fetching fresh data in the background.
 * Benefits:
 * - Improved perceived performance (instant response)
 * - Reduced server load (background updates)
 * - Better user experience (no loading states)
 * 
 * Implementation:
 * - Static pages: 1 hour fresh, 24 hours stale
 * - Dynamic pages: 0 seconds fresh, 60 seconds stale
 * - CDN serves stale content while revalidating in background
 */

/**
 * Cache Strategy Documentation
 * 
 * 1. Static Assets (images, fonts, JS, CSS):
 *    - Cache-Control: public, max-age=31536000, immutable
 *    - Cached for 1 year, never revalidated (content-addressed)
 *    - Served from CDN edge locations
 * 
 * 2. Static Pages (home, about, services, contact):
 *    - Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate
 *    - Browser cache: 1 hour
 *    - CDN cache: 24 hours
 *    - Stale content served while revalidating
 * 
 * 3. Dynamic Pages (blog posts, case studies):
 *    - ISR with 60 second revalidation
 *    - Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate
 *    - No browser cache (always fresh from CDN)
 *    - CDN cache: 60 seconds
 *    - Background regeneration on access after 60 seconds
 * 
 * 4. API Routes:
 *    - Cache-Control: no-cache, no-store, must-revalidate
 *    - No caching (always fresh data)
 *    - Used for form submissions and dynamic data
 * 
 * Performance Impact:
 * - First visit: Full page load from server
 * - Subsequent visits: Instant load from cache
 * - Background updates: Fresh content without user waiting
 * - CDN edge caching: Global performance optimization
 */
