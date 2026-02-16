import type { NextConfig } from "next";

// Bundle analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    // Enable modern image formats with automatic fallbacks (Requirement 1.5)
    formats: ["image/avif", "image/webp"],
    
    // Responsive image sizes for different device breakpoints (Requirement 13.4)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache optimized images for 60 seconds minimum
    minimumCacheTTL: 60,
    
    // Allow SVG images with security restrictions
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Configure allowed image domains for external sources
    remotePatterns: [
      {
        // Sanity CDN images
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        // Placeholder images for development
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        // Unsplash images (if used for case studies/blog)
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  // Headers for security and caching (Requirement 18.6)
  async headers() {
    return [
      // Static assets - 1 year cache with immutable flag
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // JavaScript and CSS bundles - 1 year cache with immutable flag
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
  },
};

export default withBundleAnalyzer(nextConfig);
