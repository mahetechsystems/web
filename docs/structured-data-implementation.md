# Structured Data Implementation

## Overview

This document describes the Schema.org structured data implementation across the Mahe Tech Systems website. Structured data helps search engines understand the content and context of our pages, improving SEO and enabling rich search results.

**Task:** 12.3 - Implement structured data across pages  
**Requirements:** 7.8  
**Status:** ✅ Complete

## Implementation Summary

All pages now include appropriate Schema.org markup using JSON-LD format:

- ✅ **Home Page**: Organization + WebSite schemas
- ✅ **Services Page**: Service schemas (ItemList)
- ✅ **Blog Posts**: BlogPosting schema
- ✅ **Case Studies**: Article schema

## Schema Types Implemented

### 1. Organization Schema (Home Page)

**Location:** `src/app/page.tsx`  
**Function:** `generateOrganizationSchema()` in `src/lib/seo.ts`

Provides information about Mahe Tech Systems as an organization.

```typescript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mahe Tech Systems",
  "url": "https://mahetechsystems.com",
  "logo": "https://mahetechsystems.com/logo.png",
  "description": "Structured execution partner for startups...",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressLocality": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  }
}
```

**Benefits:**
- Enables Knowledge Graph panel in search results
- Displays organization information in rich snippets
- Improves brand recognition in search

### 2. WebSite Schema (Home Page)

**Location:** `src/app/page.tsx`  
**Function:** `generateWebSiteSchema()` in `src/lib/seo.ts`

Defines the website and enables sitelinks search box.

```typescript
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mahe Tech Systems",
  "url": "https://mahetechsystems.com",
  "description": "...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://mahetechsystems.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Benefits:**
- Enables sitelinks search box in Google search results
- Improves site navigation from search results

### 3. Service Schema (Services Page)

**Location:** `src/app/services/page.tsx`  
**Data:** `SERVICES` array in `src/lib/services-data.ts`

Each service includes Schema.org Service markup, wrapped in an ItemList.

```typescript
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Startup Execution",
        "description": "...",
        "provider": {
          "@type": "Organization",
          "name": "Mahe Tech Systems",
          "url": "https://mahetechsystems.com"
        },
        "areaServed": "India",
        "serviceType": "Startup Execution Partnership"
      }
    }
    // ... 4 more services
  ]
}
```

**Services Included:**
1. Startup Execution
2. SaaS Development
3. Digital Transformation
4. Growth & Automation
5. CRM & Sales Systems

**Benefits:**
- Services appear in rich search results
- Improves local SEO for "services in India" queries
- Enables service-specific rich snippets

### 4. BlogPosting Schema (Blog Posts)

**Location:** `src/app/blog/[slug]/page.tsx`  
**Function:** `generateBlogPostingSchema()` in `src/lib/seo.ts`

Applied to all blog post pages dynamically.

```typescript
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Blog Post Title",
  "description": "Post excerpt...",
  "image": "https://mahetechsystems.com/images/blog/post.jpg",
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-02T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mahe Tech Systems",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mahetechsystems.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mahetechsystems.com/blog/post-slug"
  }
}
```

**Benefits:**
- Enables article rich snippets with author and date
- Improves visibility in Google News and Discover
- Shows featured images in search results

### 5. Article Schema (Case Studies)

**Location:** `src/app/case-studies/[slug]/page.tsx`  
**Function:** `generateArticleSchema()` in `src/lib/seo.ts`

Applied to all case study pages dynamically.

```typescript
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study Title",
  "description": "Problem statement...",
  "image": "https://mahetechsystems.com/images/case-studies/study.jpg",
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-01T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Mahe Tech Systems"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mahe Tech Systems",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mahetechsystems.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mahetechsystems.com/case-studies/study-slug"
  }
}
```

**Benefits:**
- Case studies appear as articles in search results
- Enables rich snippets with images and dates
- Improves content discoverability

## Implementation Details

### StructuredData Component

All structured data is rendered using the `StructuredData` component:

**Location:** `src/components/seo/StructuredData.tsx`

```typescript
interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
```

**Usage Example:**

```typescript
import { StructuredData } from "@/components/seo";
import { generateOrganizationSchema } from "@/lib/seo";

export default function Page() {
  const schema = generateOrganizationSchema();
  
  return (
    <>
      <StructuredData data={schema} />
      <main>{/* Page content */}</main>
    </>
  );
}
```

### SEO Utility Functions

All schema generation functions are centralized in `src/lib/seo.ts`:

- `generateOrganizationSchema()` - Organization markup
- `generateWebSiteSchema()` - WebSite markup with SearchAction
- `generateServiceSchema(service)` - Service markup
- `generateBlogPostingSchema(post)` - BlogPosting markup
- `generateArticleSchema(article)` - Article markup
- `generateBreadcrumbSchema(items)` - BreadcrumbList markup
- `generatePersonSchema(person)` - Person markup

## Validation

### Automated Tests

Comprehensive test suite validates all schemas:

**Location:** `src/__tests__/schema-validation.test.tsx`

Tests cover:
- ✅ Valid JSON-LD structure
- ✅ Required properties present
- ✅ Correct @context and @type
- ✅ No undefined/null values
- ✅ Unique service names
- ✅ Proper date handling
- ✅ Image URL handling (relative/absolute)

**Run tests:**
```bash
npm test -- src/__tests__/schema-validation.test.tsx
```

### Manual Validation Tools

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test each page type after deployment

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Validates JSON-LD syntax and structure

3. **Google Search Console**
   - Monitor "Enhancements" section
   - Check for structured data errors

## Best Practices Followed

1. ✅ **JSON-LD Format**: Using JSON-LD (not Microdata or RDFa) as recommended by Google
2. ✅ **Single Source of Truth**: All schema generation centralized in `src/lib/seo.ts`
3. ✅ **Type Safety**: TypeScript interfaces for all schema parameters
4. ✅ **Reusable Component**: `StructuredData` component for consistent rendering
5. ✅ **Dynamic Data**: Schemas generated from CMS data (blog posts, case studies)
6. ✅ **Required Properties**: All required Schema.org properties included
7. ✅ **Proper Nesting**: Related entities properly nested (e.g., Organization in Service)
8. ✅ **Absolute URLs**: All URLs converted to absolute format
9. ✅ **Date Formats**: ISO 8601 format for all dates
10. ✅ **Testing**: Comprehensive automated tests for all schemas

## SEO Impact

### Expected Benefits

1. **Rich Search Results**
   - Organization Knowledge Graph
   - Service listings with details
   - Article cards with images
   - Author attribution

2. **Improved CTR**
   - More prominent search listings
   - Visual elements (images, ratings)
   - Additional information displayed

3. **Better Indexing**
   - Search engines understand content better
   - Proper categorization of pages
   - Improved content relationships

4. **Voice Search**
   - Structured data helps voice assistants
   - Better answers to "near me" queries
   - Service information easily accessible

### Monitoring

Track these metrics in Google Search Console:

1. **Rich Results Report**
   - Valid items count
   - Error rate
   - Warning rate

2. **Performance Report**
   - Impressions for rich results
   - CTR comparison (rich vs. regular)
   - Position changes

3. **Coverage Report**
   - Pages with structured data
   - Indexing status
   - Errors and warnings

## Maintenance

### Adding New Schema Types

To add a new schema type:

1. Create generation function in `src/lib/seo.ts`
2. Add TypeScript interface for parameters
3. Use `StructuredData` component to render
4. Add tests in `src/__tests__/schema-validation.test.tsx`
5. Validate with Google Rich Results Test

### Updating Existing Schemas

When updating schemas:

1. Update generation function in `src/lib/seo.ts`
2. Update tests if structure changes
3. Run test suite to ensure no regressions
4. Validate with Schema.org validator
5. Monitor Search Console for errors

## References

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Specification](https://json-ld.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Conclusion

The structured data implementation is complete and follows best practices. All pages have appropriate Schema.org markup that will improve search visibility and enable rich search results. The implementation is maintainable, testable, and ready for production deployment.
