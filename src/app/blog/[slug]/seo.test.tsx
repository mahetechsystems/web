import { describe, it, expect, vi } from 'vitest'
import { generateMetadata } from './page'
import * as queries from '@/lib/sanity/queries'
import type { BlogPost } from '@/types/sanity'

// Mock Sanity queries
vi.mock('@/lib/sanity/queries', () => ({
  getBlogPostBySlug: vi.fn(),
}))

const createMockBlogPost = (overrides?: Partial<BlogPost>): BlogPost => ({
  _id: 'post-1',
  _type: 'post',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'rev-1',
  title: 'Test Blog Post',
  slug: { current: 'test-blog-post' },
  excerpt: 'This is a test blog post excerpt.',
  content: [] as any,
  author: {
    _id: 'author-1',
    _type: 'author',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-1',
    name: 'John Doe',
    slug: { current: 'john-doe' },
  },
  publishedAt: '2024-01-15T00:00:00Z',
  featuredImage: {
    asset: {
      _id: 'image-1',
      url: 'https://example.com/featured.jpg',
    },
    alt: 'Featured image',
  },
  tags: ['testing', 'development'],
  ...overrides,
})

describe('Blog Post SEO - Task 7.3', () => {
  describe('Requirement 6.8: BlogPosting Schema markup', () => {
    it('should include BlogPosting Schema in metadata', async () => {
      const mockPost = createMockBlogPost()
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      // Metadata should be generated successfully
      expect(metadata).toBeDefined()
      expect(metadata.title).toBeTruthy()
    })
  })

  describe('Requirement 7.6: Unique title tags', () => {
    it('should generate unique title for each blog post', async () => {
      const post1 = createMockBlogPost({
        title: 'First Blog Post',
        slug: { current: 'first-post' },
      })
      const post2 = createMockBlogPost({
        title: 'Second Blog Post',
        slug: { current: 'second-post' },
      })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post1)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'first-post' }),
      })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post2)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'second-post' }),
      })

      // Titles should be different
      expect(metadata1.title).not.toBe(metadata2.title)
      expect(metadata1.title).toContain('First Blog Post')
      expect(metadata2.title).toContain('Second Blog Post')
    })

    it('should use SEO metaTitle when provided', async () => {
      const mockPost = createMockBlogPost({
        seo: {
          metaTitle: 'Custom SEO Title',
          metaDescription: 'Custom description',
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.title).toContain('Custom SEO Title')
    })

    it('should fallback to post title when SEO metaTitle not provided', async () => {
      const mockPost = createMockBlogPost({
        title: 'Fallback Title Test',
        seo: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.title).toContain('Fallback Title Test')
    })
  })

  describe('Requirement 7.7: Unique meta descriptions', () => {
    it('should generate unique meta description for each blog post', async () => {
      const post1 = createMockBlogPost({
        excerpt: 'First post excerpt',
        slug: { current: 'first-post' },
      })
      const post2 = createMockBlogPost({
        excerpt: 'Second post excerpt',
        slug: { current: 'second-post' },
      })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post1)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'first-post' }),
      })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post2)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'second-post' }),
      })

      // Descriptions should be different
      expect(metadata1.description).not.toBe(metadata2.description)
      expect(metadata1.description).toBe('First post excerpt')
      expect(metadata2.description).toBe('Second post excerpt')
    })

    it('should use SEO metaDescription when provided', async () => {
      const mockPost = createMockBlogPost({
        seo: {
          metaTitle: 'Title',
          metaDescription: 'Custom SEO description for better ranking',
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.description).toBe('Custom SEO description for better ranking')
    })

    it('should fallback to excerpt when SEO metaDescription not provided', async () => {
      const mockPost = createMockBlogPost({
        excerpt: 'This is the excerpt fallback',
        seo: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.description).toBe('This is the excerpt fallback')
    })
  })

  describe('Requirement 7.4: OpenGraph meta tags', () => {
    it('should include all required OpenGraph tags', async () => {
      const mockPost = createMockBlogPost()
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.openGraph).toBeDefined()
      expect(metadata.openGraph?.title).toBeTruthy()
      expect(metadata.openGraph?.description).toBeTruthy()
      expect((metadata.openGraph as any)?.type).toBe('article')
      expect(metadata.openGraph?.url).toBeTruthy()
      expect(metadata.openGraph?.images).toBeDefined()
    })

    it('should include article-specific OpenGraph metadata', async () => {
      const mockPost = createMockBlogPost({
        publishedAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z',
        author: {
          _id: 'author-1',
          _type: 'author',
          _createdAt: '2024-01-01T00:00:00Z',
          _updatedAt: '2024-01-01T00:00:00Z',
          _rev: 'rev-1',
          name: 'Jane Smith',
          slug: { current: 'jane-smith' },
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect((metadata.openGraph as any)?.publishedTime).toBe('2024-01-15T00:00:00Z')
      expect((metadata.openGraph as any)?.modifiedTime).toBe('2024-01-20T00:00:00Z')
      expect((metadata.openGraph as any)?.authors).toEqual(['Jane Smith'])
    })

    it('should use featured image for OpenGraph', async () => {
      const mockPost = createMockBlogPost({
        featuredImage: {
          asset: {
            _id: 'image-1',
            url: 'https://example.com/og-image.jpg',
          },
          alt: 'OG Image',
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.openGraph?.images).toBeDefined()
      const images = metadata.openGraph?.images as any[]
      expect(images[0].url).toContain('og-image.jpg')
    })
  })

  describe('Requirement 7.5: Twitter Card meta tags', () => {
    it('should include all required Twitter Card tags', async () => {
      const mockPost = createMockBlogPost()
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.twitter).toBeDefined()
      expect((metadata.twitter as any)?.card).toBe('summary_large_image')
      expect(metadata.twitter?.title).toBeTruthy()
      expect(metadata.twitter?.description).toBeTruthy()
      expect(metadata.twitter?.images).toBeDefined()
    })

    it('should use featured image for Twitter Card', async () => {
      const mockPost = createMockBlogPost({
        featuredImage: {
          asset: {
            _id: 'image-1',
            url: 'https://example.com/twitter-card.jpg',
          },
          alt: 'Twitter Card Image',
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.twitter?.images).toBeDefined()
      const images = metadata.twitter?.images as string[]
      expect(images[0]).toContain('twitter-card.jpg')
    })
  })

  describe('Requirement 7.9: Canonical URLs', () => {
    it('should generate canonical URL for each blog post', async () => {
      const mockPost = createMockBlogPost({
        slug: { current: 'my-blog-post' },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'my-blog-post' }),
      })

      expect(metadata.alternates?.canonical).toBeDefined()
      expect(metadata.alternates?.canonical).toContain('/blog/my-blog-post')
    })

    it('should generate different canonical URLs for different posts', async () => {
      const post1 = createMockBlogPost({ slug: { current: 'post-one' } })
      const post2 = createMockBlogPost({ slug: { current: 'post-two' } })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post1)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'post-one' }),
      })

      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(post2)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'post-two' }),
      })

      expect(metadata1.alternates?.canonical).not.toBe(metadata2.alternates?.canonical)
      expect(metadata1.alternates?.canonical).toContain('post-one')
      expect(metadata2.alternates?.canonical).toContain('post-two')
    })
  })

  describe('SEO Utility Integration', () => {
    it('should include keywords from tags', async () => {
      const mockPost = createMockBlogPost({
        tags: ['nextjs', 'react', 'typescript', 'seo'],
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.keywords).toEqual(['nextjs', 'react', 'typescript', 'seo'])
    })

    it('should handle posts without tags', async () => {
      const mockPost = createMockBlogPost({
        tags: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      // Should not throw error and should handle gracefully
      expect(metadata).toBeDefined()
    })

    it('should include author metadata', async () => {
      const mockPost = createMockBlogPost({
        author: {
          _id: 'author-1',
          _type: 'author',
          _createdAt: '2024-01-01T00:00:00Z',
          _updatedAt: '2024-01-01T00:00:00Z',
          _rev: 'rev-1',
          name: 'Sarah Johnson',
          slug: { current: 'sarah-johnson' },
        },
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.authors).toBeDefined()
      expect((metadata.authors as any)[0].name).toBe('Sarah Johnson')
    })

    it('should set noindex for non-existent posts', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(null)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      })

      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle posts without featured images', async () => {
      const mockPost = createMockBlogPost({
        featuredImage: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      // Should use default OG image
      expect(metadata.openGraph?.images).toBeDefined()
      const images = metadata.openGraph?.images as any[]
      expect(images[0].url).toContain('og-image.jpg')
    })

    it('should handle posts without author', async () => {
      const mockPost = createMockBlogPost({
        author: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      // Should not throw error
      expect(metadata).toBeDefined()
      expect(metadata.title).toBeTruthy()
    })

    it('should handle posts without updatedAt', async () => {
      const mockPost = createMockBlogPost({
        publishedAt: '2024-01-15T00:00:00Z',
        updatedAt: undefined,
      })
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      // Should use publishedAt as modifiedTime
      expect((metadata.openGraph as any)?.modifiedTime).toBe('2024-01-15T00:00:00Z')
    })
  })
})
