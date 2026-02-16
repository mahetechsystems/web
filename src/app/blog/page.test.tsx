import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPage from './page'
import * as queries from '@/lib/sanity/queries'
import type { BlogPost } from '@/types/sanity'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock Sanity queries
vi.mock('@/lib/sanity/queries', () => ({
  getAllBlogPosts: vi.fn(),
}))

// Mock OptimizedImage component
vi.mock('@/components/ui/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="optimized-image" />
  ),
}))

const mockBlogPosts: BlogPost[] = [
  {
    _id: 'post-1',
    _type: 'post',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-1',
    title: 'First Blog Post',
    slug: { current: 'first-blog-post' },
    excerpt: 'This is the first blog post excerpt.',
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
        url: 'https://example.com/image1.jpg',
      },
      alt: 'First post image',
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
    tags: ['testing'],
  },
  {
    _id: 'post-2',
    _type: 'post',
    _createdAt: '2024-01-02T00:00:00Z',
    _updatedAt: '2024-01-02T00:00:00Z',
    _rev: 'rev-2',
    title: 'Second Blog Post',
    slug: { current: 'second-blog-post' },
    excerpt: 'This is the second blog post excerpt.',
    content: [] as any,
    author: {
      _id: 'author-2',
      _type: 'author',
      _createdAt: '2024-01-02T00:00:00Z',
      _updatedAt: '2024-01-02T00:00:00Z',
      _rev: 'rev-2',
      name: 'Jane Smith',
      slug: { current: 'jane-smith' },
    },
    publishedAt: '2024-01-20T00:00:00Z',
    featuredImage: {
      asset: {
        _id: 'image-2',
        url: 'https://example.com/image2.jpg',
      },
      alt: 'Second post image',
    },
    categories: [
      {
        _id: 'cat-2',
        _type: 'category',
        _createdAt: '2024-01-02T00:00:00Z',
        _updatedAt: '2024-01-02T00:00:00Z',
        _rev: 'rev-2',
        title: 'Business',
        slug: { current: 'business' },
      },
    ],
    tags: ['startup'],
  },
  {
    _id: 'post-3',
    _type: 'post',
    _createdAt: '2024-01-03T00:00:00Z',
    _updatedAt: '2024-01-03T00:00:00Z',
    _rev: 'rev-3',
    title: 'Third Blog Post',
    slug: { current: 'third-blog-post' },
    excerpt: 'This is the third blog post excerpt.',
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
    publishedAt: '2024-01-25T00:00:00Z',
    categories: [],
    tags: [],
  },
]

/**
 * Unit Tests for Blog Listing Page
 * 
 * **Validates: Requirements 6.3**
 * 
 * These tests verify that the blog listing page:
 * - Displays articles with title, excerpt, and date (Requirement 6.3)
 * - Shows featured images when available
 * - Displays author information
 * - Shows categories and tags
 * - Handles empty state correctly
 * - Implements pagination for scalability
 */
describe('BlogPage - Blog Listing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Blog Post Display', () => {
    it('should display blog posts with title, excerpt, and date', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check that all post titles are displayed
      expect(screen.getByText('First Blog Post')).toBeInTheDocument()
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument()
      expect(screen.getByText('Third Blog Post')).toBeInTheDocument()

      // Check that excerpts are displayed
      expect(screen.getByText('This is the first blog post excerpt.')).toBeInTheDocument()
      expect(screen.getByText('This is the second blog post excerpt.')).toBeInTheDocument()
      expect(screen.getByText('This is the third blog post excerpt.')).toBeInTheDocument()

      // Check that dates are displayed
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
      expect(screen.getByText('Jan 20, 2024')).toBeInTheDocument()
      expect(screen.getByText('Jan 25, 2024')).toBeInTheDocument()
    })

    it('should display author names for each post', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check that author names are displayed
      const johnDoeElements = screen.getAllByText('John Doe')
      expect(johnDoeElements.length).toBeGreaterThan(0)
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('should display featured images when available', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check that images are rendered
      const images = screen.getAllByTestId('optimized-image')
      expect(images.length).toBeGreaterThanOrEqual(2) // At least 2 posts have images

      // Check specific image alt texts
      expect(screen.getByAltText('First post image')).toBeInTheDocument()
      expect(screen.getByAltText('Second post image')).toBeInTheDocument()
    })

    it('should display categories when available', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check that categories are displayed
      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Business')).toBeInTheDocument()
    })

    it('should display fallback image for posts without featured image', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check for fallback gradient background
      const fallbackElements = container.querySelectorAll('.bg-gradient-to-br')
      expect(fallbackElements.length).toBeGreaterThan(0)
    })

    it('should link each post to its detail page', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check that links to blog posts exist
      const links = container.querySelectorAll('a[href^="/blog/"]')
      expect(links.length).toBeGreaterThanOrEqual(3)

      // Check specific links
      const firstPostLink = container.querySelector('a[href="/blog/first-blog-post"]')
      expect(firstPostLink).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should display message when no blog posts are available', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue([])

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check for empty state message
      expect(
        screen.getByText(/No blog posts available yet/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Check back soon for insights and updates!/i)
      ).toBeInTheDocument()
    })

    it('should not display pagination when no posts', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue([])

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check that pagination is not rendered
      expect(screen.queryByText('Previous')).not.toBeInTheDocument()
      expect(screen.queryByText('Next')).not.toBeInTheDocument()
    })
  })

  describe('Page Structure', () => {
    it('should render hero section with title and description', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check hero section
      expect(screen.getByRole('heading', { name: 'Blog' })).toBeInTheDocument()
      expect(
        screen.getByText(/Insights on startup execution, systems thinking/i)
      ).toBeInTheDocument()
    })

    it('should use semantic HTML structure', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check for semantic elements
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()

      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)

      const articles = container.querySelectorAll('article')
      expect(articles.length).toBe(3) // 3 blog posts
    })

    it('should render posts in a responsive grid layout', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check for grid layout classes
      const gridContainer = container.querySelector('.grid')
      expect(gridContainer).toBeInTheDocument()

      // Check for responsive grid columns
      const responsiveGrid = container.querySelector('[class*="md:grid-cols"]')
      expect(responsiveGrid).toBeInTheDocument()
    })
  })

  describe('Pagination', () => {
    it('should display pagination when there are more than 12 posts', async () => {
      // Create 15 mock posts to trigger pagination
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        _id: `post-${i + 1}`,
        title: `Blog Post ${i + 1}`,
        slug: { current: `blog-post-${i + 1}` },
      }))

      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(manyPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      render(page)

      // Check that pagination controls are present
      expect(screen.getByText('Next')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('should display correct page number as active', async () => {
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        _id: `post-${i + 1}`,
        title: `Blog Post ${i + 1}`,
        slug: { current: `blog-post-${i + 1}` },
      }))

      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(manyPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({ page: '2' }),
      })

      const { container } = render(page)

      // Check that page 2 has active styling
      const activePage = container.querySelector('.bg-\\[\\#1F3A5F\\]')
      expect(activePage).toBeInTheDocument()
      expect(activePage?.textContent).toBe('2')
    })

    it('should disable Previous button on first page', async () => {
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        _id: `post-${i + 1}`,
        title: `Blog Post ${i + 1}`,
        slug: { current: `blog-post-${i + 1}` },
      }))

      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(manyPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check that Previous button is disabled
      const previousButton = container.querySelector('span.cursor-not-allowed')
      expect(previousButton?.textContent).toBe('Previous')
    })

    it('should disable Next button on last page', async () => {
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        _id: `post-${i + 1}`,
        title: `Blog Post ${i + 1}`,
        slug: { current: `blog-post-${i + 1}` },
      }))

      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(manyPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({ page: '2' }),
      })

      const { container } = render(page)

      // Check that Next button is disabled on last page
      const disabledButtons = container.querySelectorAll('span.cursor-not-allowed')
      const nextButton = Array.from(disabledButtons).find(
        (btn) => btn.textContent === 'Next'
      )
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding classes', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check for responsive padding
      const responsivePadding = container.querySelectorAll('[class*="sm:px"], [class*="lg:px"]')
      expect(responsivePadding.length).toBeGreaterThan(0)
    })

    it('should have responsive text sizing', async () => {
      vi.mocked(queries.getAllBlogPosts).mockResolvedValue(mockBlogPosts)

      const page = await BlogPage({
        searchParams: Promise.resolve({}),
      })

      const { container } = render(page)

      // Check for responsive text classes
      const responsiveText = container.querySelectorAll('[class*="sm:text"], [class*="lg:text"]')
      expect(responsiveText.length).toBeGreaterThan(0)
    })
  })
})
