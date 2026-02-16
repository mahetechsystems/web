import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CaseStudiesPage from './page'
import type { CaseStudy } from '@/types/sanity'

// Mock the Sanity queries module
vi.mock('@/lib/sanity/queries', () => ({
  getAllCaseStudies: vi.fn(),
}))

// Mock the OptimizedImage component
vi.mock('@/components/ui/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const { getAllCaseStudies } = await import('@/lib/sanity/queries')

describe('CaseStudiesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the hero section with title and description', async () => {
    vi.mocked(getAllCaseStudies).mockResolvedValue([])

    const page = await CaseStudiesPage()
    render(page)

    expect(screen.getByRole('heading', { name: /case studies/i })).toBeInTheDocument()
    expect(screen.getByText(/real-world examples of structured execution/i)).toBeInTheDocument()
  })

  it('displays empty state when no case studies are available', async () => {
    vi.mocked(getAllCaseStudies).mockResolvedValue([])

    const page = await CaseStudiesPage()
    render(page)

    expect(screen.getByText(/no case studies available yet/i)).toBeInTheDocument()
  })

  it('displays case studies in a card-based layout', async () => {
    const mockCaseStudies: CaseStudy[] = [
      {
        _id: '1',
        _type: 'caseStudy',
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: 'rev1',
        title: 'E-commerce Platform Transformation',
        slug: { current: 'ecommerce-transformation' },
        client: 'TechCorp Inc',
        industry: 'E-commerce',
        problem: 'Scaling issues with legacy system',
        systemDesign: 'Microservices architecture',
        execution: [
          {
            phase: 'Phase 1',
            description: 'Assessment and planning',
            duration: '2 weeks',
          },
        ],
        outcomes: [
          {
            metric: 'Performance',
            value: '300% improvement',
            description: 'Reduced page load time by 300%',
          },
        ],
        publishedAt: '2024-01-15',
      },
      {
        _id: '2',
        _type: 'caseStudy',
        _createdAt: '2024-02-01',
        _updatedAt: '2024-02-01',
        _rev: 'rev2',
        title: 'SaaS Product Launch',
        slug: { current: 'saas-product-launch' },
        client: 'StartupXYZ',
        industry: 'SaaS',
        problem: 'Need to launch MVP quickly',
        systemDesign: 'Serverless architecture',
        execution: [
          {
            phase: 'Phase 1',
            description: 'MVP development',
            duration: '4 weeks',
          },
        ],
        outcomes: [
          {
            metric: 'Time to Market',
            value: '6 weeks',
            description: 'Launched MVP in 6 weeks',
          },
        ],
        publishedAt: '2024-02-15',
      },
    ]

    vi.mocked(getAllCaseStudies).mockResolvedValue(mockCaseStudies)

    const page = await CaseStudiesPage()
    render(page)

    // Check that both case studies are displayed
    expect(screen.getByText('E-commerce Platform Transformation')).toBeInTheDocument()
    expect(screen.getByText('SaaS Product Launch')).toBeInTheDocument()

    // Check that client names are displayed
    expect(screen.getByText(/client: techcorp inc/i)).toBeInTheDocument()
    expect(screen.getByText(/client: startupxyz/i)).toBeInTheDocument()

    // Check that industries are displayed
    expect(screen.getByText('E-commerce')).toBeInTheDocument()
    expect(screen.getByText('SaaS')).toBeInTheDocument()

    // Check that outcomes are displayed
    expect(screen.getByText(/reduced page load time by 300%/i)).toBeInTheDocument()
    expect(screen.getByText(/launched mvp in 6 weeks/i)).toBeInTheDocument()
  })

  it('displays industry tags for each case study', async () => {
    const mockCaseStudies: CaseStudy[] = [
      {
        _id: '1',
        _type: 'caseStudy',
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: 'rev1',
        title: 'Test Case Study',
        slug: { current: 'test-case-study' },
        client: 'Test Client',
        industry: 'FinTech',
        problem: 'Test problem',
        systemDesign: 'Test design',
        execution: [],
        outcomes: [],
        publishedAt: '2024-01-15',
      },
    ]

    vi.mocked(getAllCaseStudies).mockResolvedValue(mockCaseStudies)

    const page = await CaseStudiesPage()
    render(page)

    expect(screen.getByText('FinTech')).toBeInTheDocument()
  })

  it('links to individual case study detail pages', async () => {
    const mockCaseStudies: CaseStudy[] = [
      {
        _id: '1',
        _type: 'caseStudy',
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: 'rev1',
        title: 'Test Case Study',
        slug: { current: 'test-case-study' },
        client: 'Test Client',
        industry: 'Technology',
        problem: 'Test problem',
        systemDesign: 'Test design',
        execution: [],
        outcomes: [],
        publishedAt: '2024-01-15',
      },
    ]

    vi.mocked(getAllCaseStudies).mockResolvedValue(mockCaseStudies)

    const page = await CaseStudiesPage()
    render(page)

    const link = screen.getByRole('link', { name: /test case study/i })
    expect(link).toHaveAttribute('href', '/case-studies/test-case-study')
  })

  it('displays fallback gradient when no image is available', async () => {
    const mockCaseStudies: CaseStudy[] = [
      {
        _id: '1',
        _type: 'caseStudy',
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: 'rev1',
        title: 'Test Case Study',
        slug: { current: 'test-case-study' },
        client: 'Test Client',
        industry: 'Technology',
        problem: 'Test problem',
        systemDesign: 'Test design',
        execution: [],
        outcomes: [],
        publishedAt: '2024-01-15',
      },
    ]

    vi.mocked(getAllCaseStudies).mockResolvedValue(mockCaseStudies)

    const page = await CaseStudiesPage()
    render(page)

    // The client name should be displayed in the fallback gradient
    const fallbackElements = screen.getAllByText('Test Client')
    expect(fallbackElements.length).toBeGreaterThan(0)
  })

  it('displays case study image when available', async () => {
    const mockCaseStudies: CaseStudy[] = [
      {
        _id: '1',
        _type: 'caseStudy',
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: 'rev1',
        title: 'Test Case Study',
        slug: { current: 'test-case-study' },
        client: 'Test Client',
        industry: 'Technology',
        problem: 'Test problem',
        systemDesign: 'Test design',
        execution: [],
        outcomes: [],
        images: [
          {
            asset: {
              _id: 'img1',
              url: 'https://example.com/image.jpg',
            },
            alt: 'Case study image',
          },
        ],
        publishedAt: '2024-01-15',
      },
    ]

    vi.mocked(getAllCaseStudies).mockResolvedValue(mockCaseStudies)

    const page = await CaseStudiesPage()
    render(page)

    const image = screen.getByAltText('Case study image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })
})
