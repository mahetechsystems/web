import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPostPage, { generateMetadata, generateStaticParams } from './page'
import * as queries from '@/lib/sanity/queries'
import type { BlogPost } from '@/types/sanity'

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))

// Mock Sanity queries
vi.mock('@/lib/sanity/queries', () => ({
  getBlogPostBySlug: vi.fn(),
  getAllBlogPostSlugs: vi.fn(),
}))

// Mock OptimizedImage component
vi.mock('@/components/ui/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="optimized-image" />
  ),
}))

// Mock PortableText component
vi.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: any }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}))

const mockBlogPost: BlogPost = {
  _id: 'post-1',
  _type: 'post',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'rev-1',
  title: 'Test Blog Post',
  slug: { current: 'test-blog-post' },
  excerpt: 'This is a test blog post excerpt.',
  content: [
    {
      _key: 'block-1',
      _type: 'block',
      children: [{ _key: 'span-1', _type: 'span', text: 'Test content', marks: [] }],
      markDefs: [],
      style: 'normal',
    },
  ] as any,
  author: {
    _id: 'author-1',
    _type: 'author',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-1',
    name: 'John Doe',
    slug: { current: 'john-doe' },
    bio: 'Test author bio',
    image: {
      asset: {
        _id: 'image-1',
        url: 'https://example.com/author.jpg',
      },
      alt: 'John Doe',
    },
    social: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  },
  publishedAt: '2024-01-15T00:00:00Z',
  featuredImage: {
    asset: {
      _id: 'image-2',
      url: 'https://example.com/featured.jpg',
    },
    alt: 'Featured image',
  },
  categories: [
    {
      _id: 'cat-1',
      _type: 'category',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      _rev: 'rev-1',
      title: 'Technology',
      slug: { current: 'technology' },
    },
  ],
  tags: ['testing', 'development'],
  seo: {
    metaTitle: 'Test Blog Post - SEO Title',
    metaDescription: 'Test blog post SEO description',
  },
}

describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('should return array of slugs', async () => {
      vi.mocked(queries.getAllBlogPostSlugs).mockResolvedValue([
        'post-1',
        'post-2',
        'post-3',
      ])

      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'post-1' },
        { slug: 'post-2' },
        { slug: 'post-3' },
      ])
    })

    it('should return empty array when no slugs', async () => {
      vi.mocked(queries.getAllBlogPostSlugs).mockResolvedValue([])

      const params = await generateStaticParams()

      expect(params).toEqual([])
    })
  })

  describe('generateMetadata', () => {
    it('should generate metadata from blog post with canonical URL', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.title).toBe('Test Blog Post - SEO Title | Mahe Tech Systems')
      expect(metadata.description).toBe('Test blog post SEO description')
      expect(metadata.openGraph?.title).toBe('Test Blog Post - SEO Title')
      expect((metadata.openGraph as any)?.type).toBe('article')
      expect(metadata.alternates?.canonical).toContain('/blog/test-blog-post')
    })

    it('should use default metadata when post not found', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(null)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      })

      expect(metadata.title).toBe('Post Not Found')
      expect(metadata.description).toBe('The requested blog post could not be found.')
      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      })
    })

    it('should fallback to post title when SEO title not provided', async () => {
      const postWithoutSEO = { ...mockBlogPost, seo: undefined }
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(postWithoutSEO)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.title).toBe('Test Blog Post | Mahe Tech Systems')
      expect(metadata.description).toBe('This is a test blog post excerpt.')
    })

    it('should include article metadata for OpenGraph', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect((metadata.openGraph as any)?.publishedTime).toBe('2024-01-15T00:00:00Z')
      expect((metadata.openGraph as any)?.authors).toEqual(['John Doe'])
    })

    it('should include keywords from tags', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      expect(metadata.keywords).toEqual(['testing', 'development'])
    })
  })

  describe('BlogPostPage component', () => {
    it('should render blog post with all required elements', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check title is rendered (use getByRole for h1)
      expect(screen.getByRole('heading', { level: 1, name: 'Test Blog Post' })).toBeInTheDocument()

      // Check excerpt is rendered
      expect(screen.getByText('This is a test blog post excerpt.')).toBeInTheDocument()

      // Check author name is rendered
      expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument()

      // Check publish date is rendered
      expect(screen.getByText('January 15, 2024')).toBeInTheDocument()

      // Check categories are rendered
      expect(screen.getByText('Technology')).toBeInTheDocument()

      // Check tags are rendered
      expect(screen.getByText('#testing')).toBeInTheDocument()
      expect(screen.getByText('#development')).toBeInTheDocument()
    })

    it('should render social sharing buttons', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check social sharing section exists
      expect(screen.getByText('Share this article')).toBeInTheDocument()

      // Check social sharing buttons
      expect(screen.getByText('Twitter')).toBeInTheDocument()
      expect(screen.getByText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByText('Facebook')).toBeInTheDocument()
      expect(screen.getByText('Copy Link')).toBeInTheDocument()
    })

    it('should render author bio when available', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check author bio section
      expect(screen.getByText('About the Author')).toBeInTheDocument()
      expect(screen.getByText('Test author bio')).toBeInTheDocument()
    })

    it('should render featured image when available', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check featured image is rendered
      const images = screen.getAllByTestId('optimized-image')
      const featuredImage = images.find((img) =>
        img.getAttribute('alt')?.includes('Featured image')
      )
      expect(featuredImage).toBeInTheDocument()
    })

    it('should render breadcrumb navigation', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check breadcrumb links
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getAllByText('Blog')[0]).toBeInTheDocument()
    })

    it('should render back to blog link', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check back to blog link
      expect(screen.getByText('Back to Blog')).toBeInTheDocument()
    })

    it('should render portable text content', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      render(page)

      // Check portable text is rendered
      expect(screen.getByTestId('portable-text')).toBeInTheDocument()
    })

    it('should include JSON-LD structured data', async () => {
      vi.mocked(queries.getBlogPostBySlug).mockResolvedValue(mockBlogPost)

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: 'test-blog-post' }),
      })

      const { container } = render(page)

      // Check for JSON-LD script tag
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()

      if (script) {
        const jsonLd = JSON.parse(script.textContent || '{}')
        expect(jsonLd['@type']).toBe('BlogPosting')
        expect(jsonLd.headline).toBe('Test Blog Post')
        expect(jsonLd.author.name).toBe('John Doe')
      }
    })
  })
})
