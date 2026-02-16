import { groq } from 'next-sanity'
import { client } from './client'
import type { BlogPost, CaseStudy } from '@/types/sanity'

// ============================================================================
// GROQ Query Fragments
// ============================================================================

// Author fragment for reuse across queries
const authorFragment = groq`
  author->{
    _id,
    _type,
    name,
    slug,
    bio,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    social
  }
`

// Category fragment for reuse across queries
const categoryFragment = groq`
  categories[]->{
    _id,
    _type,
    title,
    slug,
    description
  }
`

// SEO fragment for reuse across queries
const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`

// ============================================================================
// Blog Post Queries
// ============================================================================

/**
 * Get all published blog posts
 * Ordered by publish date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Return empty array if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return []
  }

  try {
    const query = groq`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        excerpt,
        content,
        ${authorFragment},
        publishedAt,
        updatedAt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        ${categoryFragment},
        tags,
        ${seoFragment}
      }
    `

    const posts = await client.fetch<BlogPost[]>(query, {}, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Return empty array on error to prevent page crashes
    return []
  }
}

/**
 * Get a single blog post by slug
 * @param slug - The post slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Return null if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null
  }

  try {
    const query = groq`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        excerpt,
        content,
        ${authorFragment},
        publishedAt,
        updatedAt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        ${categoryFragment},
        tags,
        ${seoFragment}
      }
    `

    const post = await client.fetch<BlogPost | null>(query, { slug }, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return post
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Get recent blog posts
 * @param limit - Number of posts to return (default: 3)
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const query = groq`
      *[_type == "post"] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        excerpt,
        ${authorFragment},
        publishedAt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        ${categoryFragment},
        tags
      }
    `

    const posts = await client.fetch<BlogPost[]>(query, { limit: limit - 1 }, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return posts || []
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return []
  }
}

/**
 * Get all blog post slugs for static generation
 * Used for generateStaticParams in Next.js
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  // Return empty array if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return []
  }

  try {
    const query = groq`
      *[_type == "post" && defined(slug.current)].slug.current
    `

    const slugs = await client.fetch<string[]>(query)
    return slugs || []
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

/**
 * Get blog posts by category
 * @param categorySlug - The category slug
 */
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const query = groq`
      *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        excerpt,
        ${authorFragment},
        publishedAt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        ${categoryFragment},
        tags
      }
    `

    const posts = await client.fetch<BlogPost[]>(query, { categorySlug }, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return posts || []
  } catch (error) {
    console.error(`Error fetching blog posts for category "${categorySlug}":`, error)
    return []
  }
}

// ============================================================================
// Case Study Queries
// ============================================================================

/**
 * Get all published case studies
 * Ordered by publish date (newest first)
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const query = groq`
      *[_type == "caseStudy"] | order(publishedAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        client,
        industry,
        problem,
        systemDesign,
        execution[] {
          phase,
          description,
          duration
        },
        outcomes[] {
          metric,
          value,
          description
        },
        images[] {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        publishedAt,
        ${seoFragment}
      }
    `

    const caseStudies = await client.fetch<CaseStudy[]>(query, {}, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return caseStudies || []
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
}

/**
 * Get a single case study by slug
 * @param slug - The case study slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const query = groq`
      *[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        client,
        industry,
        problem,
        systemDesign,
        execution[] {
          phase,
          description,
          duration
        },
        outcomes[] {
          metric,
          value,
          description
        },
        images[] {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        publishedAt,
        ${seoFragment}
      }
    `

    const caseStudy = await client.fetch<CaseStudy | null>(query, { slug }, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return caseStudy
  } catch (error) {
    console.error(`Error fetching case study with slug "${slug}":`, error)
    return null
  }
}

/**
 * Get featured case studies for homepage
 * @param limit - Number of case studies to return (default: 3)
 */
export async function getFeaturedCaseStudies(limit: number = 3): Promise<CaseStudy[]> {
  try {
    const query = groq`
      *[_type == "caseStudy"] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        client,
        industry,
        problem,
        outcomes[] {
          metric,
          value,
          description
        },
        images[0] {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        publishedAt
      }
    `

    const caseStudies = await client.fetch<CaseStudy[]>(query, { limit: limit - 1 }, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    return caseStudies || []
  } catch (error) {
    console.error('Error fetching featured case studies:', error)
    return []
  }
}

/**
 * Get all case study slugs for static generation
 * Used for generateStaticParams in Next.js
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const query = groq`
      *[_type == "caseStudy" && defined(slug.current)].slug.current
    `

    const slugs = await client.fetch<string[]>(query)
    return slugs || []
  } catch (error) {
    console.error('Error fetching case study slugs:', error)
    return []
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if Sanity CMS is available
 * Used for error handling and fallback content
 */
export async function checkSanityConnection(): Promise<boolean> {
  try {
    await client.fetch(groq`*[_type == "post"][0]._id`)
    return true
  } catch (error) {
    console.error('Sanity CMS connection failed:', error)
    return false
  }
}
