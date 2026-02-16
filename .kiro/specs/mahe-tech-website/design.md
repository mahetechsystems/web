# Design Document: Mahe Tech Systems Website

## Overview

The Mahe Tech Systems website is a high-performance, SEO-optimized Next.js application that serves as both a portfolio showcase and lead generation engine. The architecture prioritizes performance (sub-1.5s load times), SEO dominance (targeting "Startup Execution Partner in India" keywords), and conversion optimization (multiple CTAs, Calendly integration).

The system follows a modern JAMstack architecture with server-side rendering for SEO, static generation for performance, and a headless CMS for content management. The design emphasizes progressive enhancement, ensuring core functionality works without JavaScript while providing enhanced experiences for modern browsers.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   React    │  │  Framer      │  │   Analytics      │   │
│  │ Components │  │  Motion      │  │   (GA4, Clarity) │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Next.js 14 App Router                  │    │
│  │  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │ SSR Pages    │  │ SSG Pages    │               │    │
│  │  │ (Blog Posts) │  │ (Static)     │               │    │
│  │  └──────────────┘  └──────────────┘               │    │
│  │  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │ API Routes   │  │ Middleware   │               │    │
│  │  └──────────────┘  └──────────────┘               │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Sanity     │  │   Calendly   │  │   Email      │     │
│  │     CMS      │  │   Embed      │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend Framework:**

- Next.js 14 with App Router for SSR/SSG capabilities
- React 18 for component architecture
- TypeScript for type safety

**Styling:**

- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles when needed
- Custom design tokens for brand colors and typography

**Animation:**

- Framer Motion for declarative animations
- CSS transitions for simple interactions
- Intersection Observer API for scroll-triggered animations

**Content Management:**

- Sanity CMS for blog and dynamic content
- GROQ for content queries
- Incremental Static Regeneration (ISR) for content updates

**Performance Optimization:**

- Next.js Image component for automatic optimization
- Dynamic imports for code splitting
- Edge caching via Vercel
- WebP/AVIF image formats with fallbacks

**SEO:**

- Next.js Metadata API for meta tags
- next-sitemap for sitemap generation
- Schema.org structured data via JSON-LD
- OpenGraph and Twitter Card meta tags

**Analytics:**

- Google Analytics 4 via gtag.js
- Microsoft Clarity for session recording
- Custom event tracking for conversions

**Forms and Integration:**

- React Hook Form for form management
- Zod for validation schemas
- Calendly embed SDK
- Resend or SendGrid for email delivery

## Components and Interfaces

### Core Page Components

#### HomePage Component

```typescript
interface HomePageProps {
  caseStudies: CaseStudy[];
  recentPosts: BlogPost[];
}

interface HeroSection {
  headline: string;
  subheadline: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
}

interface ProblemSection {
  problems: Problem[];
}

interface Problem {
  title: string;
  description: string;
  icon: string;
}

interface ExecutionBlock {
  title: string;
  description: string;
  outcomes: string[];
}

interface SystemFramework {
  title: string;
  steps: FrameworkStep[];
  visual: string; // SVG or image path
}

interface FrameworkStep {
  number: number;
  title: string;
  description: string;
}
```

#### ServicesPage Component

```typescript
interface ServicesPageProps {
  services: Service[];
}

interface Service {
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

interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: Organization;
  areaServed: string;
  serviceType: string;
}
```

#### CaseStudyPage Component

```typescript
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  systemDesign: string;
  execution: ExecutionDetail[];
  outcomes: Outcome[];
  images: Image[];
  publishedAt: Date;
  schema: ArticleSchema;
}

interface ExecutionDetail {
  phase: string;
  description: string;
  duration: string;
}

interface Outcome {
  metric: string;
  value: string;
  description: string;
}
```

#### BlogPage Component

```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: PortableText;
  author: Author;
  publishedAt: Date;
  updatedAt: Date;
  featuredImage: Image;
  categories: Category[];
  tags: string[];
  seo: SEOMetadata;
  schema: BlogPostingSchema;
}

interface Author {
  name: string;
  bio: string;
  image: Image;
  social: SocialLinks;
}

interface PortableText {
  // Sanity Portable Text format
  _type: "block";
  children: any[];
}
```

#### ContactPage Component

```typescript
interface ContactPageProps {
  calendlyUrl: string;
  whatsappNumber: string;
  location: Location;
}

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  consent: boolean;
}

interface ContactFormValidation {
  validate: (data: ContactForm) => ValidationResult;
  sanitize: (data: ContactForm) => ContactForm;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface Location {
  address: string;
  city: string;
  country: string;
  mapUrl: string;
}
```

### Shared Components

#### Navigation Component

```typescript
interface NavigationProps {
  items: NavItem[];
  currentPath: string;
  isMobile: boolean;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface MobileMenu {
  isOpen: boolean;
  toggle: () => void;
  items: NavItem[];
}
```

#### CTA Component

```typescript
interface CTAButton {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  icon?: string;
  onClick?: () => void;
  trackingEvent?: string;
}

interface StickyCTA {
  isVisible: boolean;
  scrollThreshold: number;
  cta: CTAButton;
}
```

#### SEO Component

```typescript
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  schema?: any; // JSON-LD structured data
  noindex?: boolean;
}
```

#### Image Component

```typescript
interface OptimizedImage {
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
```

### Data Layer

#### Sanity CMS Integration

```typescript
interface SanityClient {
  fetch: <T>(query: string, params?: any) => Promise<T>;
  getClient: () => SanityClientInstance;
}

interface ContentQueries {
  getAllBlogPosts: () => Promise<BlogPost[]>;
  getBlogPostBySlug: (slug: string) => Promise<BlogPost | null>;
  getRecentPosts: (limit: number) => Promise<BlogPost[]>;
  getAllCaseStudies: () => Promise<CaseStudy[]>;
  getCaseStudyBySlug: (slug: string) => Promise<CaseStudy | null>;
}

interface ContentCache {
  revalidate: number; // ISR revalidation time in seconds
  tags: string[]; // Cache tags for on-demand revalidation
}
```

#### Analytics Integration

```typescript
interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface ConversionTracking {
  trackCTAClick: (ctaId: string) => void;
  trackFormSubmission: (formType: string) => void;
  trackOutboundLink: (url: string) => void;
  trackPageView: (path: string) => void;
}
```

### Performance Optimization Layer

#### Image Optimization

```typescript
interface ImageOptimizer {
  generateSrcSet: (src: string, widths: number[]) => string;
  generateSources: (src: string, formats: string[]) => Source[];
  calculateSizes: (breakpoints: Breakpoint[]) => string;
}

interface Source {
  srcSet: string;
  type: string;
  sizes?: string;
}

interface Breakpoint {
  minWidth: number;
  imageWidth: number;
}
```

#### Code Splitting Strategy

```typescript
interface DynamicImport {
  component: () => Promise<any>;
  loading?: React.ComponentType;
  ssr?: boolean;
}

// Route-based splitting
const routes = {
  "/": () => import("./pages/home"),
  "/about": () => import("./pages/about"),
  "/services": () => import("./pages/services"),
  "/case-studies": () => import("./pages/case-studies"),
  "/blog": () => import("./pages/blog"),
  "/contact": () => import("./pages/contact"),
};

// Component-based splitting
const heavyComponents = {
  Calendly: dynamic(() => import("./components/CalendlyEmbed"), { ssr: false }),
  AnimatedFramework: dynamic(() => import("./components/AnimatedFramework")),
  CaseStudyGallery: dynamic(() => import("./components/CaseStudyGallery")),
};
```

#### Caching Strategy

```typescript
interface CacheConfig {
  staticAssets: {
    maxAge: number; // 1 year for immutable assets
    immutable: boolean;
  };
  pages: {
    static: number; // Cache duration for static pages
    dynamic: number; // Cache duration for dynamic pages
  };
  api: {
    default: number;
    byEndpoint: Record<string, number>;
  };
}

const cacheHeaders = {
  staticAssets: "public, max-age=31536000, immutable",
  staticPages: "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
  dynamicPages: "public, max-age=0, s-maxage=60, stale-while-revalidate",
};
```

## Data Models

### Content Models (Sanity Schema)

#### Blog Post Schema

```typescript
const blogPostSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text", validation: (Rule) => Rule.max(160) },
    { name: "content", type: "array", of: [{ type: "block" }] },
    { name: "author", type: "reference", to: [{ type: "author" }] },
    { name: "publishedAt", type: "datetime" },
    { name: "featuredImage", type: "image" },
    { name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "seo", type: "seo" },
  ],
};
```

#### Case Study Schema

```typescript
const caseStudySchema = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug" },
    { name: "client", type: "string" },
    { name: "industry", type: "string" },
    { name: "problem", type: "text" },
    { name: "systemDesign", type: "text" },
    { name: "execution", type: "array", of: [{ type: "executionDetail" }] },
    { name: "outcomes", type: "array", of: [{ type: "outcome" }] },
    { name: "images", type: "array", of: [{ type: "image" }] },
    { name: "publishedAt", type: "datetime" },
  ],
};
```

### Form Data Models

#### Contact Form Model

```typescript
interface ContactFormData {
  name: string; // Required, 2-100 characters
  email: string; // Required, valid email format
  company?: string; // Optional, max 100 characters
  message: string; // Required, 10-1000 characters
  consent: boolean; // Required, must be true
  timestamp: Date; // Auto-generated
  source: string; // Page where form was submitted
}

interface ContactFormSubmission {
  data: ContactFormData;
  metadata: {
    userAgent: string;
    ipAddress: string;
    referrer: string;
  };
}
```

### SEO Data Models

#### Meta Tags Model

```typescript
interface MetaTags {
  title: string; // 50-60 characters optimal
  description: string; // 150-160 characters optimal
  canonical: string;
  robots: string; // "index,follow" | "noindex,nofollow"
  openGraph: OpenGraphTags;
  twitter: TwitterCardTags;
}

interface OpenGraphTags {
  title: string;
  description: string;
  type: "website" | "article";
  url: string;
  image: string;
  siteName: string;
}

interface TwitterCardTags {
  card: "summary" | "summary_large_image";
  site: string;
  creator: string;
  title: string;
  description: string;
  image: string;
}
```

#### Structured Data Model

```typescript
interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: PostalAddress;
  contactPoint: ContactPoint;
  sameAs: string[]; // Social media URLs
}

interface PostalAddress {
  "@type": "PostalAddress";
  addressCountry: string;
  addressLocality: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  contactType: string;
  email: string;
  availableLanguage: string[];
}
```

### Performance Metrics Model

```typescript
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint in ms
  lcp: number; // Largest Contentful Paint in ms
  fid: number; // First Input Delay in ms
  cls: number; // Cumulative Layout Shift score
  ttfb: number; // Time to First Byte in ms
  tti: number; // Time to Interactive in ms
}

interface LighthouseScore {
  performance: number; // 0-100
  accessibility: number; // 0-100
  bestPractices: number; // 0-100
  seo: number; // 0-100
}
```

## Data Models

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Performance Properties

**Property 1: First Contentful Paint Performance**
_For any_ page on the website, when requested under normal network conditions, the First Contentful Paint metric should be less than 1.2 seconds.
**Validates: Requirements 1.1**

**Property 2: Full Page Load Performance**
_For any_ page on the website, when requested from any global location, the complete page load time should be less than 1.5 seconds.
**Validates: Requirements 1.2**

**Property 3: Lighthouse Performance Score**
_For any_ page on the website, when audited with Lighthouse, the performance score should be 95 or higher.
**Validates: Requirements 1.3**

**Property 4: Core Web Vitals Compliance**
_For any_ page on the website, when Core Web Vitals are measured, all three metrics should meet their thresholds: LCP < 2.5s, FID < 100ms, and CLS < 0.1.
**Validates: Requirements 1.4**

**Property 5: Image Format Optimization**
_For any_ image served by the website, the image should be delivered in WebP or AVIF format with appropriate fallbacks for older browsers.
**Validates: Requirements 1.5**

**Property 6: Lazy Loading Implementation**
_For any_ image that is positioned below the initial viewport, the image element should have lazy loading attributes enabled.
**Validates: Requirements 1.6**

**Property 7: Route-Based Code Splitting**
_For any_ route in the application, the JavaScript bundle should be split such that each route has its own chunk, and shared code is extracted into common chunks.
**Validates: Requirements 1.7**

### SEO Properties

**Property 8: Semantic HTML Usage**
_For any_ page on the website, the HTML structure should use semantic HTML5 elements (header, nav, main, article, section, footer) appropriately.
**Validates: Requirements 7.1**

**Property 9: OpenGraph Meta Tags**
_For any_ page on the website, the page should include all required OpenGraph meta tags (og:title, og:description, og:image, og:url, og:type).
**Validates: Requirements 7.4**

**Property 10: Twitter Card Meta Tags**
_For any_ page on the website, the page should include all required Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image).
**Validates: Requirements 7.5**

**Property 11: Unique Page Titles**
_For any_ two distinct pages on the website, their title tags should be unique and not identical.
**Validates: Requirements 7.6**

**Property 12: Unique Meta Descriptions**
_For any_ two distinct pages on the website, their meta descriptions should be unique and not identical.
**Validates: Requirements 7.7**

**Property 13: Canonical URL Implementation**
_For any_ page on the website, the page should include a canonical link tag pointing to its authoritative URL.
**Validates: Requirements 7.9**

**Property 14: Heading Hierarchy**
_For any_ page on the website, heading elements should follow proper hierarchical structure (single H1, H2s under H1, H3s under H2s, etc.) without skipping levels.
**Validates: Requirements 8.5**

**Property 15: Image Alt Text Presence**
_For any_ image element on the website, the image should have an alt attribute with descriptive text (or empty alt for decorative images).
**Validates: Requirements 8.6, 15.3**

**Property 16: Clean URL Structure**
_For any_ dynamically generated URL on the website, the URL slug should contain only lowercase letters, numbers, and hyphens, without special characters or spaces.
**Validates: Requirements 8.7**

### Content and CMS Properties

**Property 17: Blog Post Slug Uniqueness**
_For any_ two blog posts in the CMS, their URL slugs should be unique and not identical.
**Validates: Requirements 6.2**

### Interaction and Animation Properties

**Property 18: Sticky CTA Visibility**
_For any_ scroll position beyond the hero section on the home page, the sticky CTA button should be visible in the viewport.
**Validates: Requirements 3.7**

**Property 19: CTA Link Destinations**
_For any_ CTA button on the website, clicking it should navigate to either the Calendly booking page or the contact form.
**Validates: Requirements 3.8**

**Property 20: Viewport Animation Triggers**
_For any_ animated element on the website, the animation should only trigger when the element enters the viewport.
**Validates: Requirements 10.1**

**Property 21: Hover State Feedback**
_For any_ interactive element (button, link, form input) on the website, hovering over it should produce a visible style change.
**Validates: Requirements 10.2**

**Property 22: Reduced Motion Respect**
_For any_ animated element on the website, when the user has enabled prefers-reduced-motion, animations should be disabled or significantly reduced.
**Validates: Requirements 10.3**

### Analytics and Tracking Properties

**Property 23: CTA Click Tracking**
_For any_ CTA button click event, an analytics event should be fired with the appropriate event category and action.
**Validates: Requirements 12.4**

**Property 24: Form Submission Tracking**
_For any_ successful form submission, an analytics conversion event should be fired.
**Validates: Requirements 12.5**

**Property 25: Outbound Link Tracking**
_For any_ external link click, an analytics event should be fired tracking the destination URL.
**Validates: Requirements 12.6**

### Mobile Responsiveness Properties

**Property 26: Mobile Layout Adaptation**
_For any_ page on the website, when viewed at mobile viewport widths (< 768px), all content should be displayed in a single-column layout without horizontal overflow.
**Validates: Requirements 13.1, 13.3**

**Property 27: Touch Target Sizing**
_For any_ interactive element on mobile viewports, the element should have a minimum touch target size of 44x44 pixels.
**Validates: Requirements 13.2**

**Property 28: Responsive Image Optimization**
_For any_ image on the website, when viewed on mobile devices, the image should have appropriate srcset and sizes attributes for responsive loading.
**Validates: Requirements 13.4**

**Property 29: Tablet Layout Adaptation**
_For any_ page on the website, when viewed at tablet viewport widths (768px - 1024px), the layout should adapt to an intermediate design between mobile and desktop.
**Validates: Requirements 13.5**

**Property 30: Viewport Resize Handling**
_For any_ page on the website, when the viewport is resized from mobile to desktop or vice versa, the layout should adapt smoothly without breaking or causing layout shifts.
**Validates: Requirements 13.6**

### Accessibility Properties

**Property 31: WCAG 2.1 AA Compliance**
_For any_ page on the website, when audited with automated accessibility tools, the page should pass WCAG 2.1 Level AA criteria.
**Validates: Requirements 15.1**

**Property 32: Keyboard Navigation Support**
_For any_ interactive element on the website, the element should be reachable and operable using only keyboard navigation (Tab, Enter, Space, Arrow keys).
**Validates: Requirements 15.2**

**Property 33: Form Label Association**
_For any_ form input element on the website, the input should have an associated label element properly linked via for/id attributes or implicit nesting.
**Validates: Requirements 15.5**

**Property 34: Focus Indicator Visibility**
_For any_ focusable element on the website, when focused via keyboard, the element should display a visible focus indicator with sufficient contrast.
**Validates: Requirements 15.6**

**Property 35: Dynamic Content Announcements**
_For any_ dynamically updated content region on the website, the region should have appropriate ARIA live region attributes to announce changes to screen readers.
**Validates: Requirements 15.7**

### Security Properties

**Property 36: HTTPS Protocol Enforcement**
_For any_ page or resource on the website, the URL should use the HTTPS protocol.
**Validates: Requirements 17.1**

**Property 37: Input Validation and Sanitization**
_For any_ form submission, all user input should be validated against expected formats and sanitized to remove potentially malicious content before processing.
**Validates: Requirements 17.2**

**Property 38: Subresource Integrity**
_For any_ third-party script loaded from an external CDN, the script tag should include an integrity attribute with the appropriate hash.
**Validates: Requirements 17.4**

## Error Handling

### Error Handling Strategy

The website implements a comprehensive error handling strategy across multiple layers:

**Client-Side Error Handling:**

- React Error Boundaries to catch component rendering errors
- Try-catch blocks around async operations (API calls, CMS queries)
- Graceful degradation for failed external service loads (Calendly, analytics)
- Image loading error handlers with fallback placeholders

**Form Validation and Error Handling:**

- Client-side validation using Zod schemas before submission
- Server-side validation as a second layer of defense
- Clear, actionable error messages displayed inline with form fields
- Form state preservation on validation errors
- Network error handling with retry mechanisms

**CMS Integration Error Handling:**

- Fallback content when Sanity CMS is unavailable
- Stale-while-revalidate caching to serve cached content during CMS outages
- Error logging for failed content fetches
- Graceful handling of missing or malformed content

**External Service Error Handling:**

- Calendly embed failure: Display alternative contact methods
- Analytics failure: Silent failure, don't block page functionality
- Email service failure: Queue for retry, display user-friendly error message

**HTTP Error Responses:**

- Custom 404 page with navigation and search
- Custom 500 page with contact information
- Appropriate HTTP status codes for all error scenarios
- Error logging to monitoring service (e.g., Sentry)

### Error Handling Implementation

```typescript
// Error Boundary Component
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Form Validation Error Handling
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  consent: z.boolean().refine((val) => val === true, "You must accept the privacy policy"),
});

async function handleFormSubmit(data: ContactFormData) {
  try {
    // Client-side validation
    const validated = contactFormSchema.parse(data);

    // Server-side submission
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(validated),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, errors: { _form: "An unexpected error occurred. Please try again." } };
  }
}

// CMS Error Handling
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
    return posts;
  } catch (error) {
    logError("Failed to fetch blog posts", error);
    // Return cached posts or empty array
    return getCachedPosts() || [];
  }
}

// External Service Error Handling
function CalendlyEmbed({ url }: { url: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="calendly-fallback">
        <p>Unable to load scheduling widget.</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open scheduling page in new tab
        </a>
      </div>
    );
  }

  return (
    <CalendlyWidget
      url={url}
      onError={() => setHasError(true)}
    />
  );
}

// Progressive Enhancement for JavaScript Failures
// Ensure forms work without JavaScript
<form action="/api/contact" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Error Logging and Monitoring

```typescript
interface ErrorLog {
  timestamp: Date;
  error: Error;
  context: {
    url: string;
    userAgent: string;
    userId?: string;
  };
  severity: "low" | "medium" | "high" | "critical";
}

function logErrorToService(error: Error, context: any) {
  // Send to error monitoring service (e.g., Sentry)
  if (typeof window !== "undefined" && window.Sentry) {
    window.Sentry.captureException(error, { extra: context });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error, "Context:", context);
  }
}
```

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests** focus on:

- Specific examples that demonstrate correct behavior
- Edge cases and boundary conditions
- Error handling scenarios
- Integration points between components
- Specific user interactions and workflows

**Property-Based Tests** focus on:

- Universal properties that hold across all inputs
- Performance characteristics across different pages
- SEO compliance across all content
- Accessibility standards across all components
- Responsive behavior across viewport ranges

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and regressions, while property tests verify general correctness across the input space.

### Property-Based Testing Configuration

**Testing Library:** fast-check (for JavaScript/TypeScript)

**Configuration:**

- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: `Feature: mahe-tech-website, Property {number}: {property_text}`

**Example Property Test:**

```typescript
import fc from "fast-check";
import { test, expect } from "@playwright/test";

// Feature: mahe-tech-website, Property 11: Unique Page Titles
test("all pages have unique title tags", async ({ page }) => {
  const pages = ["/", "/about", "/services", "/case-studies", "/blog", "/contact"];
  const titles = new Set<string>();

  for (const path of pages) {
    await page.goto(path);
    const title = await page.title();
    expect(titles.has(title)).toBe(false); // Title should be unique
    titles.add(title);
  }
});

// Feature: mahe-tech-website, Property 15: Image Alt Text Presence
test("all images have alt text", async ({ page }) => {
  await fc.assert(
    fc.asyncProperty(fc.constantFrom("/", "/about", "/services", "/blog"), async (path) => {
      await page.goto(path);
      const images = await page.locator("img").all();

      for (const img of images) {
        const alt = await img.getAttribute("alt");
        expect(alt).not.toBeNull(); // Alt attribute must exist
      }
    }),
    { numRuns: 100 }
  );
});

// Feature: mahe-tech-website, Property 1: First Contentful Paint Performance
test("FCP is under 1.2 seconds for all pages", async ({ page }) => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom("/", "/about", "/services", "/case-studies", "/blog", "/contact"),
      async (path) => {
        await page.goto(path);
        const metrics = await page.evaluate(() => {
          const paint = performance.getEntriesByType("paint");
          const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
          return fcp ? fcp.startTime : null;
        });

        expect(metrics).not.toBeNull();
        expect(metrics!).toBeLessThan(1200); // 1.2 seconds in milliseconds
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Testing Framework:** Vitest for unit tests, Playwright for E2E tests

**Unit Test Coverage:**

1. **Component Tests:**
   - Navigation component renders correctly
   - CTA buttons have correct links
   - Forms validate input correctly
   - Error states display appropriately
   - Loading states work as expected

2. **Integration Tests:**
   - Sanity CMS integration fetches content correctly
   - Form submission sends data to API
   - Analytics events fire on user actions
   - Calendly embed loads successfully

3. **Edge Case Tests:**
   - Empty blog post list displays correctly
   - Missing images show fallback content
   - Form submission with network error preserves input
   - CMS unavailable shows cached content

4. **Accessibility Tests:**
   - Keyboard navigation works for all interactive elements
   - Focus indicators are visible
   - ARIA labels are present where needed
   - Color contrast meets WCAG standards

**Example Unit Tests:**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("displays validation errors for invalid email", async () => {
    const { getByLabelText, getByRole } = render(<ContactForm />);

    const emailInput = getByLabelText("Email");
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = getByRole("button", { name: "Send Message" });
    await userEvent.click(submitButton);

    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("preserves form input on submission error", async () => {
    const { getByLabelText, getByRole } = render(<ContactForm />);

    const nameInput = getByLabelText("Name");
    const messageInput = getByLabelText("Message");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(messageInput, "Test message");

    // Simulate network error
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const submitButton = getByRole("button", { name: "Send Message" });
    await userEvent.click(submitButton);

    expect(nameInput).toHaveValue("John Doe");
    expect(messageInput).toHaveValue("Test message");
  });
});
```

### Performance Testing

**Tools:**

- Lighthouse CI for automated performance audits
- WebPageTest for real-world performance testing
- Chrome DevTools Performance panel for profiling

**Performance Test Suite:**

- Run Lighthouse audits on all pages in CI/CD pipeline
- Fail build if performance score drops below 95
- Monitor Core Web Vitals in production using Google Analytics
- Set up alerts for performance regressions

### SEO Testing

**Tools:**

- Google Search Console for crawl errors
- Screaming Frog for technical SEO audits
- Schema.org validator for structured data

**SEO Test Suite:**

- Validate sitemap.xml contains all pages
- Check robots.txt allows appropriate crawling
- Verify all pages have unique titles and descriptions
- Validate Schema markup on all applicable pages
- Check for broken internal links
- Verify canonical URLs are correct

### Accessibility Testing

**Tools:**

- axe-core for automated accessibility testing
- WAVE for visual accessibility review
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)

**Accessibility Test Suite:**

- Run axe-core audits in CI/CD pipeline
- Manual keyboard navigation testing for all interactive flows
- Screen reader testing for critical user journeys
- Color contrast validation for all text
- Focus indicator visibility testing

### Continuous Integration Testing

**CI/CD Pipeline:**

1. Run unit tests on every commit
2. Run property-based tests on every PR
3. Run Lighthouse audits on preview deployments
4. Run accessibility audits on preview deployments
5. Run E2E tests before production deployment
6. Monitor performance and errors in production

**Test Execution Strategy:**

- Fast feedback: Unit tests run in < 30 seconds
- Comprehensive coverage: Property tests run in < 5 minutes
- Pre-deployment validation: E2E tests run in < 10 minutes
- Post-deployment monitoring: Synthetic tests run every 15 minutes

This comprehensive testing strategy ensures the website maintains high performance, SEO effectiveness, accessibility compliance, and functional correctness throughout its lifecycle.
