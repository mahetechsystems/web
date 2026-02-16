// Constants for Mahe Tech Systems Website

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG = {
  name: "Mahe Tech Systems",
  description: "Structured execution partner for founders",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mahetechsystems.com",
  author: "Mahe Tech Systems",
  locale: "en_US",
} as const;

// ============================================================================
// Navigation Items
// ============================================================================

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// ============================================================================
// Social Media Links
// ============================================================================

export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
} as const;

// ============================================================================
// Contact Information
// ============================================================================

export const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@mahetechsystems.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  location: {
    address: "India",
    city: "Bangalore",
    country: "India",
    mapUrl: "",
  },
} as const;

// ============================================================================
// Performance Thresholds
// ============================================================================

export const PERFORMANCE_THRESHOLDS = {
  fcp: 1200, // First Contentful Paint in ms
  lcp: 2500, // Largest Contentful Paint in ms
  fid: 100, // First Input Delay in ms
  cls: 0.1, // Cumulative Layout Shift score
  lighthouseScore: 95, // Minimum Lighthouse performance score
} as const;

// ============================================================================
// SEO Configuration
// ============================================================================

export const SEO_CONFIG = {
  defaultTitle: "Mahe Tech Systems - Structured Execution Partner for Founders",
  titleTemplate: "%s | Mahe Tech Systems",
  defaultDescription:
    "Structured execution partner for founders. We build systems that work - from startup execution to SaaS development and digital transformation.",
  defaultOgImage: "/og-image.jpg",
  twitterHandle: "@mahetechsystems",
} as const;

// ============================================================================
// CMS Configuration
// ============================================================================

export const CMS_CONFIG = {
  revalidateTime: 60, // ISR revalidation time in seconds
  previewMode: process.env.NODE_ENV === "development",
} as const;
