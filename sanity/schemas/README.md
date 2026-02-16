# Sanity Schemas

This directory contains all Sanity CMS schema definitions for the Mahe Tech Systems website.

## Schema Types

### Document Types

#### Author (`author.ts`)
Represents blog post authors and contributors.

**Fields:**
- `name` (string, required): Author's full name
- `slug` (slug, required): URL-friendly identifier
- `bio` (text): Author biography
- `image` (image): Author profile photo with alt text
- `social` (object): Social media links (Twitter, LinkedIn, GitHub)

#### Category (`category.ts`)
Blog post categories for content organization.

**Fields:**
- `title` (string, required): Category name
- `slug` (slug, required): URL-friendly identifier
- `description` (text): Category description

#### Blog Post (`post.ts`)
Main blog post content type.

**Fields:**
- `title` (string, required): Post title
- `slug` (slug, required): URL-friendly identifier
- `excerpt` (text, required): Brief summary (150-160 characters)
- `content` (array, required): Rich text content with images
- `author` (reference, required): Reference to author document
- `publishedAt` (datetime, required): Publication date
- `updatedAt` (datetime): Last update date
- `featuredImage` (image): Main post image with alt text
- `categories` (array): Array of category references
- `tags` (array): Array of tag strings
- `seo` (object): SEO metadata override

**Content Blocks:**
- Text blocks with H2, H3, H4, blockquote styles
- Bullet and numbered lists
- Strong, emphasis, and code formatting
- Links with optional "open in new tab"
- Images with required alt text and optional captions

#### Case Study (`caseStudy.ts`)
Client case studies showcasing project work.

**Fields:**
- `title` (string, required): Case study title
- `slug` (slug, required): URL-friendly identifier
- `client` (string, required): Client name
- `industry` (string, required): Client industry
- `problem` (text, required): Problem statement
- `systemDesign` (text, required): System design approach
- `execution` (array, required): Execution phases with:
  - `phase` (string): Phase name
  - `description` (text): Phase description
  - `duration` (string): Time duration
- `outcomes` (array, required): Measurable outcomes with:
  - `metric` (string): Metric name
  - `value` (string): Metric value
  - `description` (text): Outcome description
- `images` (array): Project images with alt text
- `publishedAt` (datetime, required): Publication date
- `seo` (object): SEO metadata override

### Object Types

#### SEO (`seo.ts`)
Reusable SEO metadata object for posts and case studies.

**Fields:**
- `metaTitle` (string): Custom meta title (50-60 characters optimal)
- `metaDescription` (text): Custom meta description (150-160 characters optimal)
- `ogImage` (image): Custom Open Graph image for social sharing (1200x630px recommended)

## Usage in Sanity Studio

All schemas are automatically loaded into Sanity Studio through `index.ts`. The Studio will be available at:

- **Local**: `http://localhost:3000/studio`
- **Production**: `https://your-domain.com/studio`

## Validation Rules

### Blog Posts
- Title: Required
- Slug: Required, auto-generated from title
- Excerpt: Required, max 160 characters
- Content: Required
- Author: Required reference
- Published date: Required
- Featured image alt text: Required when image is present

### Case Studies
- All text fields: Required
- Execution: At least 1 phase required
- Outcomes: At least 1 outcome required
- Image alt text: Required for all images

### SEO Fields
- Meta title: Warning if over 60 characters
- Meta description: Warning if over 160 characters

## Best Practices

### Images
- Always provide descriptive alt text for accessibility and SEO
- Use hotspot feature to control image cropping
- Recommended sizes:
  - Featured images: 1200x630px
  - Author images: 400x400px
  - Case study images: 1200x800px

### SEO
- Keep meta titles between 50-60 characters
- Keep meta descriptions between 150-160 characters
- Use descriptive, keyword-rich content
- Always provide Open Graph images for social sharing

### Content
- Use proper heading hierarchy (H2 → H3 → H4)
- Write descriptive link text
- Keep excerpts concise and compelling
- Tag content appropriately for discoverability

## Testing

Run schema tests:
```bash
npm test -- sanity/schemas/schemas.test.ts
```

## Related Files

- `sanity/sanity.config.ts` - Sanity Studio configuration
- `src/types/sanity.ts` - TypeScript type definitions
- `src/lib/sanity.ts` - Sanity client and queries (Task 6.3)
