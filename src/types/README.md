# Types Directory

This directory contains TypeScript type definitions and interfaces for the Mahe Tech Systems website.

## Files

- `index.ts` - Core types and interfaces used across the application

## Type Categories

### Navigation Types

- `NavItem` - Navigation menu items

### CTA Types

- `CTAButton` - Call-to-action button configuration

### SEO Types

- `SEOProps` - SEO metadata
- `OpenGraphTags` - Open Graph meta tags
- `TwitterCardTags` - Twitter Card meta tags

### Content Types

- `BlogPost` - Blog post data structure
- `CaseStudy` - Case study data structure
- `Service` - Service offering data structure

### Form Types

- `ContactForm` - Contact form data
- `ValidationResult` - Form validation results

### Schema.org Types

- `ServiceSchema` - Service structured data
- `ArticleSchema` - Article structured data
- `BlogPostingSchema` - Blog posting structured data

## Usage

Import types as needed:

```typescript
import type { BlogPost, CaseStudy, SEOProps } from "@/types";
```

## Guidelines

1. Use interfaces for object shapes
2. Use types for unions and complex types
3. Export all types for reusability
4. Document complex types with JSDoc comments
