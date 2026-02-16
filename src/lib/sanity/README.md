# Sanity CMS Integration

This directory contains the Sanity CMS client configuration and GROQ queries for fetching blog posts and case studies.

## Files

- **client.ts** - Sanity client configuration with ISR support and error handling
- **queries.ts** - GROQ queries for blog posts and case studies
- **index.ts** - Barrel export for easy imports
- **queries.test.ts** - Unit tests for query functions

## Features

### Client Configuration

The Sanity client is configured with:

- **CDN Usage**: Enabled in production for faster reads
- **API Version**: Uses latest API features (2024-01-01)
- **Perspective**: Only fetches published documents by default
- **Preview Mode**: Supports draft content preview with authentication token
- **Error Handling**: Comprehensive error handling with fallback values

### ISR (Incremental Static Regeneration)

All queries implement ISR with **60-second revalidation** as specified in the requirements:

```typescript
const posts = await client.fetch(query, params, {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
})
```

This ensures:
- Content updates appear within 60 seconds
- Optimal performance with cached content
- Reduced load on Sanity CMS

### Error Handling

All query functions include comprehensive error handling:

1. **Try-Catch Blocks**: Wrap all fetch operations
2. **Console Logging**: Log errors with context for debugging
3. **Graceful Fallbacks**: Return empty arrays or null instead of throwing
4. **Null Safety**: Handle null/undefined responses from CMS

This prevents page crashes when:
- Sanity CMS is unavailable
- Network errors occur
- Invalid data is returned
- Environment variables are missing

## Usage

### Import Queries

```typescript
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRecentBlogPosts,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
} from '@/lib/sanity'
```

### Fetch Blog Posts

```typescript
// Get all blog posts
const posts = await getAllBlogPosts()

// Get a single post by slug
const post = await getBlogPostBySlug('my-post-slug')

// Get recent posts for homepage
const recentPosts = await getRecentBlogPosts(3)

// Get posts by category
const categoryPosts = await getBlogPostsByCategory('startup-execution')

// Get all slugs for static generation
const slugs = await getAllBlogPostSlugs()
```

### Fetch Case Studies

```typescript
// Get all case studies
const caseStudies = await getAllCaseStudies()

// Get a single case study by slug
const caseStudy = await getCaseStudyBySlug('my-case-study')

// Get featured case studies for homepage
const featured = await getFeaturedCaseStudies(3)

// Get all slugs for static generation
const slugs = await getAllCaseStudySlugs()
```

### Check CMS Connection

```typescript
// Check if Sanity CMS is available
const isConnected = await checkSanityConnection()

if (!isConnected) {
  // Show fallback content
}
```

### Image Optimization

```typescript
import { urlFor } from '@/lib/sanity'

// Generate optimized image URL
const imageUrl = urlFor(post.featuredImage)
  .width(800)
  .height(600)
  .format('webp')
  .quality(90)
  .url()
```

## GROQ Query Fragments

The queries use reusable fragments for consistency:

- **authorFragment**: Fetches author details with image and social links
- **categoryFragment**: Fetches category references
- **seoFragment**: Fetches SEO metadata including OG images

## Next.js Integration

### Static Generation with ISR

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostContent post={post} />
}
```

### Server Components

All queries are designed for Next.js Server Components:

```typescript
// app/page.tsx
export default async function HomePage() {
  const [recentPosts, featuredCases] = await Promise.all([
    getRecentBlogPosts(3),
    getFeaturedCaseStudies(3),
  ])
  
  return (
    <>
      <RecentPosts posts={recentPosts} />
      <FeaturedCases cases={featuredCases} />
    </>
  )
}
```

## Environment Variables

Required environment variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token (for preview mode)
```

## Testing

Run tests with:

```bash
npm test src/lib/sanity/queries.test.ts
```

Tests cover:
- Successful data fetching
- Error handling
- Null/undefined responses
- ISR configuration
- Parameter passing

## Requirements Validation

This implementation validates:

- **Requirement 6.1**: Sanity CMS integration with proper client configuration
- **Requirement 6.7**: ISR with 60-second revalidation for content updates
- **Requirement 16.3**: Error handling for CMS failures with graceful fallbacks

## Performance Considerations

1. **CDN Usage**: Enabled in production for faster reads
2. **ISR**: 60-second revalidation balances freshness and performance
3. **Parallel Fetching**: Use `Promise.all()` for multiple queries
4. **Selective Fields**: Queries only fetch required fields
5. **Image Optimization**: Use `urlFor()` for responsive images

## Future Enhancements

Potential improvements for future tasks:

- Add pagination support for large content sets
- Implement search functionality with GROQ
- Add content filtering by tags
- Support for draft content preview
- Cache invalidation on-demand with webhooks
