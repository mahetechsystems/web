// TypeScript types for Sanity CMS content
// These types will be expanded in task 6.2 when schemas are created

import type { PortableTextBlock } from '@sanity/types'

// Base types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Image asset after dereferencing
export interface SanityImageAsset {
  _id: string
  url: string
}

// Image type (dereferenced format from queries)
export interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
  caption?: string
}

// Author type
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  bio?: string
  image?: SanityImage
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

// Category type
export interface Category extends SanityDocument {
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
}

// Blog post type
export interface BlogPost extends SanityDocument {
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  author: Author
  publishedAt: string
  updatedAt?: string
  featuredImage?: SanityImage
  categories?: Category[]
  tags?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}

// Case study types
export interface ExecutionDetail {
  phase: string
  description: string
  duration: string
}

export interface Outcome {
  metric: string
  value: string
  description: string
}

export interface CaseStudy extends SanityDocument {
  _type: 'caseStudy'
  title: string
  slug: {
    current: string
  }
  client: string
  industry: string
  problem: string
  systemDesign: string
  execution: ExecutionDetail[]
  outcomes: Outcome[]
  images?: SanityImage[]
  publishedAt: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}
