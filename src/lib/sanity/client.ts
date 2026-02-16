import { createClient, type ClientConfig, type QueryParams } from '@sanity/client'
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Sanity client will not work properly.'
  )
}

// Base client configuration
const config: ClientConfig = {
  projectId: projectId || 'placeholder', // Use placeholder to prevent errors during build
  dataset,
  apiVersion: '2024-01-01', // Use current date for latest API features
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster reads
  perspective: 'published', // Only fetch published documents
}

// Sanity client configuration
export const client = createClient(config)

// Image URL builder for optimized image URLs
const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URL from Sanity image source
 * @param source - Sanity image source
 * @returns Image URL builder instance
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Helper function to get Sanity client (for server-side usage)
 * @param preview - Enable preview mode to fetch draft content
 * @returns Configured Sanity client
 */
export function getClient(preview?: boolean) {
  return createClient({
    ...config,
    useCdn: !preview && process.env.NODE_ENV === 'production',
    perspective: preview ? 'previewDrafts' : 'published',
    token: preview ? process.env.SANITY_API_TOKEN : undefined,
  })
}

/**
 * Fetch data from Sanity with error handling and ISR support
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param options - Fetch options including revalidation settings
 * @returns Query result or null on error
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: QueryParams = {},
  options: { next?: { revalidate?: number; tags?: string[] } } = {}
): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params, options)
    return result
  } catch (error) {
    console.error('Sanity fetch error:', error)
    console.error('Query:', query)
    console.error('Params:', params)
    return null
  }
}
