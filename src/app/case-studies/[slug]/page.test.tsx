import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CaseStudyPage, { generateMetadata, generateStaticParams } from './page'
import * as queries from '@/lib/sanity/queries'
import type { CaseStudy } from '@/types/sanity'

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock Sanity queries
vi.mock('@/lib/sanity/queries', () => ({
  getCaseStudyBySlug: vi.fn(),
  getAllCaseStudySlugs: vi.fn(),
}))

// Mock OptimizedImage component
vi.mock('@/components/ui/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}))

// Mock SEO utilities
vi.mock('@/lib/seo', () => ({
  generateMetadata: vi.fn((options) => ({
    title: options.title,
    description: options.description,
  })),
  generateArticleSchema: vi.fn((article) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
  })),
}))

// Mock constants
vi.mock('@/lib/constants', () => ({
  SITE_CONFIG: {
    url: 'https://mahetechsystems.com',
    name: 'Mahe Tech Systems',
    author: 'Mahe Tech Systems',
  },
}))

describe('CaseStudyPage', () => {
  const mockCaseStudy: CaseStudy = {
    _id: '1',
    _type: 'caseStudy',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev1',
    title: 'E-Commerce Platform Transformation',
    slug: {
      current: 'ecommerce-transformation',
    },
    client: 'TechCorp Inc.',
    industry: 'E-Commerce',
    problem: 'The client faced scalability issues with their legacy platform, resulting in slow page loads and frequent downtime during peak traffic.',
    systemDesign: 'We designed a microservices architecture with cloud-native infrastructure, implementing CDN caching and database optimization.',
    execution: [
      {
        phase: 'Discovery & Planning',
        description: 'Conducted comprehensive audit of existing systems and defined migration strategy.',
        duration: '2 weeks',
      },
      {
        phase: 'Infrastructure Setup',
        description: 'Set up cloud infrastructure with auto-scaling capabilities.',
        duration: '3 weeks',
      },
      {
        phase: 'Migration & Testing',
        description: 'Migrated services incrementally with zero downtime.',
        duration: '4 weeks',
      },
    ],
    outcomes: [
      {
        metric: 'Page Load Time',
        value: '70% Faster',
        description: 'Average page load time reduced from 4.5s to 1.3s',
      },
      {
        metric: 'Uptime',
        value: '99.9%',
        description: 'Achieved 99.9% uptime during peak shopping season',
      },
      {
        metric: 'Cost Savings',
        value: '40%',
        description: 'Reduced infrastructure costs through optimization',
      },
    ],
    images: [
      {
        asset: {
          _id: 'img1',
          url: 'https://example.com/image1.jpg',
        },
        alt: 'Dashboard screenshot',
        caption: 'New dashboard interface',
      },
      {
        asset: {
          _id: 'img2',
          url: 'https://example.com/image2.jpg',
        },
        alt: 'Architecture diagram',
        caption: 'System architecture overview',
      },
    ],
    publishedAt: '2024-01-15T00:00:00Z',
    seo: {
      metaTitle: 'E-Commerce Platform Transformation Case Study',
      metaDescription: 'How we helped TechCorp achieve 70% faster page loads',
      ogImage: {
        asset: {
          _id: 'og1',
          url: 'https://example.com/og-image.jpg',
        },
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('should return array of slug params', async () => {
      vi.mocked(queries.getAllCaseStudySlugs).mockResolvedValue([
        'ecommerce-transformation',
        'saas-development',
      ])

      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'ecommerce-transformation' },
        { slug: 'saas-development' },
      ])
    })

    it('should handle empty slugs array', async () => {
      vi.mocked(queries.getAllCaseStudySlugs).mockResolvedValue([])

      const params = await generateStaticParams()

      expect(params).toEqual([])
    })
  })

  describe('generateMetadata', () => {
    it('should generate metadata with SEO fields when available', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.title).toBe('E-Commerce Platform Transformation Case Study')
      expect(metadata.description).toBe('How we helped TechCorp achieve 70% faster page loads')
    })

    it('should fallback to case study fields when SEO fields are missing', async () => {
      const caseStudyWithoutSEO = { ...mockCaseStudy, seo: undefined }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutSEO)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.title).toContain('E-Commerce Platform Transformation')
      expect(metadata.title).toContain('TechCorp Inc.')
    })

    it('should return not found metadata when case study does not exist', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(null)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      })

      expect(metadata.title).toBe('Case Study Not Found')
      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      })
    })
  })

  describe('CaseStudyPage Component', () => {
    it('should render all required sections', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      // Check title (using role to be more specific)
      expect(screen.getByRole('heading', { name: 'E-Commerce Platform Transformation', level: 1 })).toBeInTheDocument()

      // Check client and industry
      expect(screen.getByText('TechCorp Inc.')).toBeInTheDocument()
      expect(screen.getByText('E-Commerce')).toBeInTheDocument()

      // Check section headings
      expect(screen.getByText('The Challenge')).toBeInTheDocument()
      expect(screen.getByText('System Design Approach')).toBeInTheDocument()
      expect(screen.getByText('Execution Process')).toBeInTheDocument()
      expect(screen.getByText('Measurable Outcomes')).toBeInTheDocument()
    })

    it('should render problem statement section', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(
        screen.getByText(/The client faced scalability issues/)
      ).toBeInTheDocument()
    })

    it('should render system design approach section', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(
        screen.getByText(/We designed a microservices architecture/)
      ).toBeInTheDocument()
    })

    it('should render execution phases with duration', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Discovery & Planning')).toBeInTheDocument()
      expect(screen.getByText('2 weeks')).toBeInTheDocument()
      expect(screen.getByText('Infrastructure Setup')).toBeInTheDocument()
      expect(screen.getByText('3 weeks')).toBeInTheDocument()
      expect(screen.getByText('Migration & Testing')).toBeInTheDocument()
      expect(screen.getByText('4 weeks')).toBeInTheDocument()
    })

    it('should render measurable outcomes', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Page Load Time')).toBeInTheDocument()
      expect(screen.getByText('70% Faster')).toBeInTheDocument()
      expect(screen.getByText('Uptime')).toBeInTheDocument()
      expect(screen.getByText('99.9%')).toBeInTheDocument()
      expect(screen.getByText('Cost Savings')).toBeInTheDocument()
      expect(screen.getByText('40%')).toBeInTheDocument()
    })

    it('should render featured image when available', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
      expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg')
      expect(images[0]).toHaveAttribute('alt', 'Dashboard screenshot')
    })

    it('should render additional images in gallery', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Project Visuals')).toBeInTheDocument()
      expect(screen.getByText('System architecture overview')).toBeInTheDocument()
    })

    it('should render social sharing buttons', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Share this case study')).toBeInTheDocument()
      expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument()
      expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument()
      expect(screen.getByLabelText('Share on Facebook')).toBeInTheDocument()
      expect(screen.getByLabelText('Copy link')).toBeInTheDocument()
    })

    it('should render breadcrumb navigation', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getAllByText('Case Studies').length).toBeGreaterThan(0)
    })

    it('should render call to action section', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('Ready to Transform Your Business?')).toBeInTheDocument()
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
      expect(screen.getByText('View More Case Studies')).toBeInTheDocument()
    })

    it('should handle case study without execution phases', async () => {
      const caseStudyWithoutExecution = { ...mockCaseStudy, execution: [] }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutExecution)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.queryByText('Execution Process')).not.toBeInTheDocument()
    })

    it('should handle case study without outcomes', async () => {
      const caseStudyWithoutOutcomes = { ...mockCaseStudy, outcomes: [] }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutOutcomes)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.queryByText('Measurable Outcomes')).not.toBeInTheDocument()
    })

    it('should handle case study without images', async () => {
      const caseStudyWithoutImages = { ...mockCaseStudy, images: undefined }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutImages)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.queryByText('Project Visuals')).not.toBeInTheDocument()
    })

    it('should handle case study with only one image', async () => {
      const caseStudyWithOneImage = {
        ...mockCaseStudy,
        images: [mockCaseStudy.images![0]],
      }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithOneImage)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      // Should not render gallery section if only one image (used as featured)
      expect(screen.queryByText('Project Visuals')).not.toBeInTheDocument()
    })

    it('should format publish date correctly', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      render(component)

      expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    })

    it('should include JSON-LD structured data', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const component = await CaseStudyPage({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      const { container } = render(component)

      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
    })
  })
})
