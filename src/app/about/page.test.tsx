import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from './page'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
}))

// Mock SEO components
vi.mock('@/components/seo', () => ({
  StructuredData: ({ data }: { data: any }) => (
    <script type="application/ld+json" data-testid="structured-data">
      {JSON.stringify(data)}
    </script>
  ),
}))

// Mock SEO utilities
vi.mock('@/lib/seo', () => ({
  generatePersonSchema: vi.fn((person) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
  })),
  generateOrganizationSchema: vi.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mahe Tech Systems',
  })),
}))

// Mock CTAButton component
vi.mock('@/components/ui', () => ({
  CTAButton: ({ children, href, trackingEvent }: any) => (
    <a href={href} data-tracking={trackingEvent}>
      {children}
    </a>
  ),
}))

// Mock animations
vi.mock('@/lib/animations', () => ({
  fadeInUp: {},
  staggerContainer: {},
  staggerItem: {},
  getViewportAnimation: vi.fn(() => ({})),
}))

/**
 * Unit Tests for About Page Content
 * 
 * **Validates: Requirements 20.1, 20.2, 20.3, 20.4**
 * 
 * These tests verify that the About page contains all required sections:
 * - Founder story (Requirement 20.1)
 * - Vision (Requirement 20.2)
 * - Mission (Requirement 20.3)
 * - Systems thinking philosophy (Requirement 20.4)
 * - Founder credentials/background (Requirement 20.5)
 */
describe('AboutPage', () => {
  describe('Required Sections', () => {
    it('should render the founder story section', () => {
      render(<AboutPage />)

      // Check for founder story heading
      expect(
        screen.getByRole('heading', { name: /The Story Behind Mahe Tech Systems/i })
      ).toBeInTheDocument()

      // Check for key founder story content
      expect(
        screen.getByText(/Mahe Tech Systems was born from a simple observation/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/most startups don't fail because of bad ideas/i)
      ).toBeInTheDocument()
    })

    it('should render the vision section', () => {
      render(<AboutPage />)

      // Check for vision heading
      expect(screen.getByRole('heading', { name: /Our Vision/i })).toBeInTheDocument()

      // Check for vision content
      expect(
        screen.getByText(/To become the most trusted execution partner/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/transforming vision into measurable outcomes/i)
      ).toBeInTheDocument()
    })

    it('should render the mission section', () => {
      render(<AboutPage />)

      // Check for mission heading
      expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument()

      // Check for mission content
      expect(
        screen.getByText(/To empower founders with structured execution systems/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/bridge the gap between vision and reality/i)
      ).toBeInTheDocument()
    })

    it('should render the systems thinking philosophy section', () => {
      render(<AboutPage />)

      // Check for systems thinking heading
      expect(
        screen.getByRole('heading', { name: /Our Systems Thinking Philosophy/i })
      ).toBeInTheDocument()

      // Check for all 5 philosophy points
      expect(
        screen.getByRole('heading', { name: /1\. Everything is a System/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /2\. Structure Enables Speed/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /3\. Measure What Matters/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /4\. Execution is Everything/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /5\. Scalability by Design/i })
      ).toBeInTheDocument()
    })

    it('should render founder credentials and background', () => {
      render(<AboutPage />)

      // Check for credentials section heading
      expect(
        screen.getByRole('heading', { name: /Background & Expertise/i })
      ).toBeInTheDocument()

      // Check for technical foundation
      expect(
        screen.getByRole('heading', { name: /Technical Foundation/i })
      ).toBeInTheDocument()
      expect(
        screen.getByText(/10\+ years in software architecture and system design/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Built and scaled SaaS platforms serving 100K\+ users/i)
      ).toBeInTheDocument()

      // Check for business acumen
      expect(
        screen.getByRole('heading', { name: /Business Acumen/i })
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Advised 50\+ startups on execution strategy/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Deep understanding of Indian startup ecosystem/i)
      ).toBeInTheDocument()
    })

    it('should render all required sections in correct order', () => {
      render(<AboutPage />)

      const headings = screen.getAllByRole('heading')
      const headingTexts = headings.map((h) => h.textContent)

      // Verify key sections appear in order
      const storyIndex = headingTexts.findIndex((text) =>
        text?.includes('The Story Behind')
      )
      const visionIndex = headingTexts.findIndex((text) => text?.includes('Our Vision'))
      const missionIndex = headingTexts.findIndex((text) => text?.includes('Our Mission'))
      const philosophyIndex = headingTexts.findIndex((text) =>
        text?.includes('Systems Thinking Philosophy')
      )

      expect(storyIndex).toBeGreaterThan(-1)
      expect(visionIndex).toBeGreaterThan(storyIndex)
      expect(missionIndex).toBeGreaterThan(storyIndex)
      expect(philosophyIndex).toBeGreaterThan(visionIndex)
    })
  })

  describe('Content Validation', () => {
    it('should include hero section with value proposition', () => {
      render(<AboutPage />)

      expect(
        screen.getByRole('heading', {
          name: /Built on Systems Thinking, Driven by Execution/i,
        })
      ).toBeInTheDocument()
      expect(
        screen.getByText(/We're not a marketing agency/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/your structured execution partner/i)
      ).toBeInTheDocument()
    })

    it('should include call to action section', () => {
      render(<AboutPage />)

      expect(
        screen.getByRole('heading', { name: /Ready to Work Together\?/i })
      ).toBeInTheDocument()
      expect(screen.getByText(/Schedule a Consultation/i)).toBeInTheDocument()
    })

    it('should include structured data for SEO', () => {
      const { container } = render(<AboutPage />)

      const structuredData = container.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(structuredData).toBeInTheDocument()
    })
  })

  describe('Responsive Layout', () => {
    it('should render with responsive container classes', () => {
      const { container } = render(<AboutPage />)

      // Check for responsive container classes
      const containers = container.querySelectorAll('.container')
      expect(containers.length).toBeGreaterThan(0)

      // Check for responsive padding classes
      const responsiveElements = container.querySelectorAll('[class*="px-"]')
      expect(responsiveElements.length).toBeGreaterThan(0)
    })

    it('should have responsive grid layout for vision and mission', () => {
      const { container } = render(<AboutPage />)

      // Check for grid layout classes
      const gridElements = container.querySelectorAll('[class*="grid"]')
      expect(gridElements.length).toBeGreaterThan(0)

      // Check for responsive grid columns
      const responsiveGrids = container.querySelectorAll('[class*="md:grid-cols"]')
      expect(responsiveGrids.length).toBeGreaterThan(0)
    })

    it('should have responsive text sizing', () => {
      const { container } = render(<AboutPage />)

      // Check for responsive text classes
      const responsiveText = container.querySelectorAll(
        '[class*="md:text"], [class*="lg:text"]'
      )
      expect(responsiveText.length).toBeGreaterThan(0)
    })

    it('should have responsive spacing', () => {
      const { container } = render(<AboutPage />)

      // Check for responsive padding/margin classes
      const responsiveSpacing = container.querySelectorAll(
        '[class*="md:py"], [class*="md:px"], [class*="md:mb"]'
      )
      expect(responsiveSpacing.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AboutPage />)

      // Check for h1
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements.length).toBeGreaterThan(0)

      // Check for h2 elements
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBeGreaterThan(0)

      // Check for h3 elements
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements.length).toBeGreaterThan(0)
    })

    it('should have semantic HTML structure', () => {
      const { container } = render(<AboutPage />)

      // Check for semantic section elements
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })
  })

  describe('Brand Messaging', () => {
    it('should position as structured execution partner', () => {
      render(<AboutPage />)

      const elements = screen.getAllByText(/structured execution partner/i)
      expect(elements.length).toBeGreaterThan(0)
    })

    it('should avoid positioning as marketing agency', () => {
      render(<AboutPage />)

      expect(screen.getByText(/We're not a marketing agency/i)).toBeInTheDocument()
    })

    it('should avoid positioning as development shop', () => {
      render(<AboutPage />)

      expect(screen.getByText(/We're not a development shop/i)).toBeInTheDocument()
    })

    it('should emphasize systems thinking and execution', () => {
      render(<AboutPage />)

      const systemsThinkingElements = screen.getAllByText(/Systems Thinking/i)
      expect(systemsThinkingElements.length).toBeGreaterThan(0)
      expect(screen.getByText(/Execution is Everything/i)).toBeInTheDocument()
      const measurableOutcomesElements = screen.getAllByText(/measurable outcomes/i)
      expect(measurableOutcomesElements.length).toBeGreaterThan(0)
    })
  })
})
