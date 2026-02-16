// Core Types and Interfaces for Mahe Tech Systems Website

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================================================
// CTA Types
// ============================================================================

export interface CTAButton {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  icon?: string;
  onClick?: () => void;
  trackingEvent?: string;
}

export interface StickyCTA {
  isVisible: boolean;
  scrollThreshold: number;
  cta: CTAButton;
}

// ============================================================================
// SEO Types
// ============================================================================

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  schema?: Record<string, unknown>;
  noindex?: boolean;
}

export interface OpenGraphTags {
  title: string;
  description: string;
  type: "website" | "article";
  url: string;
  image: string;
  siteName: string;
}

export interface TwitterCardTags {
  card: "summary" | "summary_large_image";
  site: string;
  creator: string;
  title: string;
  description: string;
  image: string;
}

// ============================================================================
// Image Types
// ============================================================================

export interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  formats?: ("webp" | "avif")[];
  sizes?: string;
  loading?: "lazy" | "eager";
}

// ============================================================================
// Blog Types
// ============================================================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: PortableText;
  author: Author;
  publishedAt: Date;
  updatedAt: Date;
  featuredImage: OptimizedImage;
  categories: Category[];
  tags: string[];
  seo: SEOMetadata;
  schema: BlogPostingSchema;
}

export interface Author {
  name: string;
  bio: string;
  image: OptimizedImage;
  social: SocialLinks;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface PortableText {
  _type: "block";
  children: unknown[];
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

// ============================================================================
// Case Study Types
// ============================================================================

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  systemDesign: string;
  execution: ExecutionDetail[];
  outcomes: Outcome[];
  images: OptimizedImage[];
  publishedAt: Date;
  schema: ArticleSchema;
}

export interface ExecutionDetail {
  phase: string;
  description: string;
  duration: string;
}

export interface Outcome {
  metric: string;
  value: string;
  description: string;
}

// ============================================================================
// Service Types
// ============================================================================

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  keyFeatures: string[];
  outcomes: string[];
  targetKeywords: string[];
  schema: ServiceSchema;
}

// ============================================================================
// Contact Types
// ============================================================================

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  consent: boolean;
}

export interface ContactFormData extends ContactForm {
  timestamp: Date;
  source: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface Location {
  address: string;
  city: string;
  country: string;
  mapUrl: string;
}

// ============================================================================
// Schema.org Types
// ============================================================================

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: Organization;
  areaServed: string;
  serviceType: string;
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  author: Person;
  datePublished: string;
  dateModified: string;
  image: string;
}

export interface BlogPostingSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: Person;
  datePublished: string;
  dateModified: string;
  image: string;
}

export interface Organization {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
}

export interface Person {
  "@type": "Person";
  name: string;
  url?: string;
}

export interface PostalAddress {
  "@type": "PostalAddress";
  addressCountry: string;
  addressLocality: string;
}

export interface ContactPoint {
  "@type": "ContactPoint";
  contactType: string;
  email: string;
  availableLanguage: string[];
}

// ============================================================================
// SEO Metadata Types
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// ============================================================================
// Performance Types
// ============================================================================

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint in ms
  lcp: number; // Largest Contentful Paint in ms
  fid: number; // First Input Delay in ms
  cls: number; // Cumulative Layout Shift score
  ttfb: number; // Time to First Byte in ms
  tti: number; // Time to Interactive in ms
}
