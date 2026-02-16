import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateMetadata } from './page'
import * as queries from '@/lib/sanity/queries'
import type { CaseStudy } from '@/types/sanity'

// Mock Sanity queries
vi.mock('@/lib/sanity/queries', () => ({
  getCaseStudyBySlug: vi.fn(),
}))

// Mock SEO utilities
vi.mock('@/lib/seo', () => ({
  generateMetadata: vi.fn((options) => ({
    title: options.title,
    description: options.description,
    alternates: {
      canonical: options.canonical,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      type: options.ogType,
      images: [{ url: options.ogImage }],
      // Conditionally add article-specific properties
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.section && { section: options.section }),
    },
    twitter: {
      card: options.twitterCard,
      title: options.title,
      description: options.description,
      images: [options.ogImage],
    },
  })),
  generateArticleSchema: vi.fn(),
}))

// Mock constants
vi.mock('@/lib/constants', () => ({
  SITE_CONFIG: {
    url: 'https://mahetechsystems.com',
    name: 'Mahe Tech Systems',
    author: 'Mahe Tech Systems',
  },
}))

describe('Case Study SEO', () => {
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
    problem: 'The client faced scalability issues with their legacy platform.',
    systemDesign: 'We designed a microservices architecture.',
    execution: [],
    outcomes: [],
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

  describe('Meta Tags', () => {
    it('should generate unique title for case study', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.title).toBe('E-Commerce Platform Transformation Case Study')
    })

    it('should generate unique meta description', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.description).toBe('How we helped TechCorp achieve 70% faster page loads')
    })

    it('should generate canonical URL', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.alternates?.canonical).toBe('/case-studies/ecommerce-transformation')
    })

    it('should use fallback title when SEO title is not provided', async () => {
      const caseStudyWithoutSEO = { ...mockCaseStudy, seo: undefined }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutSEO)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.title).toContain('E-Commerce Platform Transformation')
      expect(metadata.title).toContain('TechCorp Inc.')
    })

    it('should use fallback description when SEO description is not provided', async () => {
      const caseStudyWithoutSEO = { ...mockCaseStudy, seo: undefined }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutSEO)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      // Should use first 160 characters of problem statement
      expect(metadata.description).toBe('The client faced scalability issues with their legacy platform.')
    })
  })

  describe('OpenGraph Tags', () => {
    it('should include OpenGraph title', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.openGraph?.title).toBe('E-Commerce Platform Transformation Case Study')
    })

    it('should include OpenGraph description', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.openGraph?.description).toBe('How we helped TechCorp achieve 70% faster page loads')
    })

    it('should set OpenGraph type to article', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      // Type assertion to access the type property
      expect((metadata.openGraph as any)?.type).toBe('article')
    })

    it('should include OpenGraph image', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.openGraph?.images).toEqual([
        { url: 'https://example.com/og-image.jpg' },
      ])
    })

    it('should include published time', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      // Type assertion to access the publishedTime property
      expect((metadata.openGraph as any)?.publishedTime).toBe('2024-01-15T00:00:00Z')
    })

    it('should include section (industry)', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      // Type assertion to access the section property
      expect((metadata.openGraph as any)?.section).toBe('E-Commerce')
    })

    it('should use fallback OG image when not provided', async () => {
      const caseStudyWithoutOGImage = {
        ...mockCaseStudy,
        seo: undefined,
        images: [
          {
            asset: {
              _id: 'img1',
              url: 'https://example.com/case-study-image.jpg',
            },
          },
        ],
      }
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(caseStudyWithoutOGImage)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.openGraph?.images).toEqual([
        { url: 'https://example.com/case-study-image.jpg' },
      ])
    })
  })

  describe('Twitter Card Tags', () => {
    it('should include Twitter card type', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      // Type assertion to access the card property
      expect((metadata.twitter as any)?.card).toBe('summary_large_image')
    })

    it('should include Twitter title', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.twitter?.title).toBe('E-Commerce Platform Transformation Case Study')
    })

    it('should include Twitter description', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.twitter?.description).toBe('How we helped TechCorp achieve 70% faster page loads')
    })

    it('should include Twitter image', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(mockCaseStudy)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      expect(metadata.twitter?.images).toEqual(['https://example.com/og-image.jpg'])
    })
  })

  describe('Robots Directives', () => {
    it('should set noindex for non-existent case study', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValue(null)

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      })

      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      })
    })
  })

  describe('Title Uniqueness', () => {
    it('should generate different titles for different case studies', async () => {
      const caseStudy1: CaseStudy = {
        ...mockCaseStudy,
        title: 'E-Commerce Platform Transformation',
        slug: { current: 'ecommerce-transformation' },
        seo: {
          metaTitle: 'E-Commerce Platform Transformation Case Study',
        },
      }

      const caseStudy2: CaseStudy = {
        ...mockCaseStudy,
        title: 'SaaS Application Development',
        slug: { current: 'saas-development' },
        seo: {
          metaTitle: 'SaaS Application Development Case Study',
        },
      }

      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(caseStudy1)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(caseStudy2)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'saas-development' }),
      })

      expect(metadata1.title).not.toBe(metadata2.title)
    })
  })

  describe('Description Uniqueness', () => {
    it('should generate different descriptions for different case studies', async () => {
      const caseStudy1: CaseStudy = {
        ...mockCaseStudy,
        problem: 'Problem statement for case study 1',
        seo: {
          metaDescription: 'Description for case study 1',
        },
      }

      const caseStudy2: CaseStudy = {
        ...mockCaseStudy,
        problem: 'Problem statement for case study 2',
        seo: {
          metaDescription: 'Description for case study 2',
        },
      }

      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(caseStudy1)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'case-study-1' }),
      })

      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(caseStudy2)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'case-study-2' }),
      })

      expect(metadata1.description).not.toBe(metadata2.description)
    })
  })

  describe('Canonical URL Uniqueness', () => {
    it('should generate different canonical URLs for different case studies', async () => {
      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(mockCaseStudy)
      const metadata1 = await generateMetadata({
        params: Promise.resolve({ slug: 'ecommerce-transformation' }),
      })

      vi.mocked(queries.getCaseStudyBySlug).mockResolvedValueOnce(mockCaseStudy)
      const metadata2 = await generateMetadata({
        params: Promise.resolve({ slug: 'saas-development' }),
      })

      expect(metadata1.alternates?.canonical).toBe('/case-studies/ecommerce-transformation')
      expect(metadata2.alternates?.canonical).toBe('/case-studies/saas-development')
      expect(metadata1.alternates?.canonical).not.toBe(metadata2.alternates?.canonical)
    })
  })
})
