# SEO Components

This directory contains SEO-related components and utilities for the Mahe Tech Systems website.

## Components

### StructuredData

Renders JSON-LD structured data for search engines.

**Usage:**

```tsx
import { StructuredData } from "@/components/seo";
import { generateBlogPostingSchema } from "@/lib/seo";

export default function BlogPost({ post }) {
  const schema = generateBlogPostingSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    publishedAt: post.publishedAt,
    image: post.featuredImage.src,
    url: `https://mahetechsystems.com/blog/${post.slug}`,
  });

  return (
    <>
      <StructuredData data={schema} />
      <article>{/* Post content */}</article>
    </>
  );
}
```

## SEO Utilities

The main SEO utilities are located in `@/lib/seo`. Import them as needed:

```tsx
import {
  generateMetadata,
  generateOrganizationSchema,
  generateBlogPostingSchema,
  generateArticleSchema,
  generateServiceSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
```

### generateMetadata

Generates Next.js 14 Metadata object for pages.

**Usage:**

```tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About Us",
  description: "Learn about Mahe Tech Systems and our mission",
  canonical: "/about",
  ogType: "website",
  keywords: ["startup execution", "SaaS development", "digital transformation"],
});
```

**Options:**

- `title` - Page title (will be appended with site name)
- `description` - Meta description
- `canonical` - Canonical URL path (will be prefixed with site URL)
- `ogImage` - OpenGraph image URL or path
- `ogType` - OpenGraph type: "website" or "article"
- `twitterCard` - Twitter card type: "summary" or "summary_large_image"
- `noindex` - Set to true to prevent indexing
- `keywords` - Array of keywords
- `publishedTime` - ISO date string for articles
- `modifiedTime` - ISO date string for articles
- `authors` - Array of author names
- `section` - Article section/category

### Schema Generators

Generate JSON-LD structured data for different content types:

#### generateOrganizationSchema()

Use on the homepage to define the organization.

```tsx
import { StructuredData } from "@/components/seo";
import { generateOrganizationSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <StructuredData data={generateOrganizationSchema()} />
      {/* Page content */}
    </>
  );
}
```

#### generateBlogPostingSchema(post)

Use on blog post pages.

```tsx
const schema = generateBlogPostingSchema({
  title: "How to Build a Startup",
  description: "A comprehensive guide...",
  author: "John Doe",
  publishedAt: "2024-01-15T10:00:00Z",
  modifiedAt: "2024-01-20T15:30:00Z",
  image: "/images/blog/startup-guide.jpg",
  url: "https://mahetechsystems.com/blog/how-to-build-a-startup",
});
```

#### generateArticleSchema(article)

Use on case study pages.

```tsx
const schema = generateArticleSchema({
  title: "SaaS Platform for E-commerce",
  description: "How we built a scalable platform...",
  author: "Mahe Tech Systems",
  publishedAt: "2024-01-10T09:00:00Z",
  image: "/images/case-studies/ecommerce-platform.jpg",
  url: "https://mahetechsystems.com/case-studies/ecommerce-platform",
});
```

#### generateServiceSchema(service)

Use on service pages.

```tsx
const schema = generateServiceSchema({
  name: "Startup Execution Services",
  description: "End-to-end execution support for startups",
  serviceType: "Business Consulting",
  areaServed: "India",
});
```

#### generateWebSiteSchema()

Use on the homepage to define the website.

```tsx
<StructuredData data={generateWebSiteSchema()} />
```

#### generateBreadcrumbSchema(items)

Use on pages with breadcrumb navigation.

```tsx
const schema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Article Title", url: "/blog/article-slug" },
]);
```

## Requirements Coverage

This SEO implementation covers the following requirements:

- **7.4**: OpenGraph meta tags for social sharing
- **7.5**: Twitter Card meta tags
- **7.6**: Unique, keyword-optimized title tags
- **7.7**: Unique, compelling meta descriptions
- **7.8**: Schema.org structured data (JSON-LD)
- **7.9**: Canonical URLs for all pages

## Best Practices

1. **Always use generateMetadata** for page metadata instead of manually creating Metadata objects
2. **Include structured data** on all content pages (blog posts, case studies, services)
3. **Use canonical URLs** to prevent duplicate content issues
4. **Optimize images** for OpenGraph (1200x630px recommended)
5. **Keep titles under 60 characters** for optimal display in search results
6. **Keep descriptions between 150-160 characters** for optimal display
7. **Use descriptive, keyword-rich titles** that accurately represent the page content
8. **Test structured data** using Google's Rich Results Test tool

## Testing

To validate your SEO implementation:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Schema.org Validator**: https://validator.schema.org/

## Examples

See the following pages for implementation examples:

- Homepage: Organization and WebSite schemas
- Blog posts: BlogPosting schema with full metadata
- Case studies: Article schema with full metadata
- Services: Service schema with full metadata
