import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/sanity/queries'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  // Use SEO fields if available, otherwise fall back to case study fields
  const metaTitle = caseStudy.seo?.metaTitle || `${caseStudy.title} - ${caseStudy.client}`
  const metaDescription = caseStudy.seo?.metaDescription || caseStudy.problem.substring(0, 160)
  const ogImage = caseStudy.seo?.ogImage?.asset?.url || caseStudy.images?.[0]?.asset?.url || `${SITE_CONFIG.url}/og-image.jpg`

  // Generate canonical URL
  const canonicalUrl = `/case-studies/${slug}`

  // Generate full metadata using SEO utility
  return generateSEOMetadata({
    title: metaTitle,
    description: metaDescription,
    canonical: canonicalUrl,
    ogImage: ogImage,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    publishedTime: caseStudy.publishedAt,
    section: caseStudy.industry,
  })
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const publishDate = new Date(caseStudy.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const currentUrl = `${SITE_CONFIG.url}/case-studies/${slug}`
  
  // Generate Article schema using SEO utility
  const articleSchema = generateArticleSchema({
    title: caseStudy.title,
    description: caseStudy.problem,
    author: SITE_CONFIG.author,
    publishedAt: caseStudy.publishedAt,
    image: caseStudy.images?.[0]?.asset?.url || `${SITE_CONFIG.url}/og-image.jpg`,
    url: currentUrl,
  })

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* JSON-LD Structured Data for Article */}
      <StructuredData data={articleSchema} />

      {/* Case Study Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#1F3A5F] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/case-studies" className="hover:text-[#1F3A5F] transition-colors">
            Case Studies
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#111827]">{caseStudy.title}</span>
        </nav>

        {/* Industry Tag */}
        <div className="mb-4">
          <span className="text-sm font-medium text-[#5F8FB4] bg-[#5F8FB4]/10 px-3 py-1 rounded-full">
            {caseStudy.industry}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
          {caseStudy.title}
        </h1>

        {/* Client and Date */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Client</p>
            <p className="font-semibold text-[#111827]">{caseStudy.client}</p>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div>
            <p className="text-sm text-gray-600">Published</p>
            <time dateTime={caseStudy.publishedAt} className="font-semibold text-[#111827]">
              {publishDate}
            </time>
          </div>
        </div>

        {/* Featured Image */}
        {caseStudy.images && caseStudy.images.length > 0 && caseStudy.images[0].asset?.url && (
          <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden bg-gray-200">
            <OptimizedImage
              src={caseStudy.images[0].asset.url}
              alt={caseStudy.images[0].alt || caseStudy.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
            {caseStudy.images[0].caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {caseStudy.images[0].caption}
              </p>
            )}
          </div>
        )}

        {/* Problem Statement Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A5F] text-white text-lg font-bold">
              1
            </span>
            The Challenge
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {caseStudy.problem}
            </p>
          </div>
        </section>

        {/* System Design Approach Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A5F] text-white text-lg font-bold">
              2
            </span>
            System Design Approach
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {caseStudy.systemDesign}
            </p>
          </div>
        </section>

        {/* Execution Process Section */}
        {caseStudy.execution && caseStudy.execution.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A5F] text-white text-lg font-bold">
                3
              </span>
              Execution Process
            </h2>
            <div className="space-y-6">
              {caseStudy.execution.map((phase, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5F8FB4] text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#111827]">{phase.phase}</h3>
                        <span className="text-sm font-medium text-[#5F8FB4] bg-[#5F8FB4]/10 px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Measurable Outcomes Section */}
        {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A5F] text-white text-lg font-bold">
                4
              </span>
              Measurable Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.outcomes.map((outcome, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] rounded-lg p-6 text-white shadow-lg">
                  <div className="mb-3">
                    <p className="text-sm font-medium opacity-90">{outcome.metric}</p>
                    <p className="text-4xl font-bold mt-2">{outcome.value}</p>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">
                    {outcome.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Images Gallery */}
        {caseStudy.images && caseStudy.images.length > 1 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-6">Project Visuals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.images.slice(1).map((image, index) => (
                image.asset?.url && (
                  <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200">
                    <OptimizedImage
                      src={image.asset.url}
                      alt={image.alt || `${caseStudy.title} - Image ${index + 2}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    {image.caption && (
                      <p className="text-sm text-gray-600 text-center mt-2 italic">
                        {image.caption}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Social Sharing Buttons */}
        <div className="border-t border-b border-gray-200 py-8 mb-12">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Share this case study</h3>
          <div className="flex flex-wrap gap-3">
            {/* Twitter/X Share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(caseStudy.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </a>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#0C63D4] transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(currentUrl)
                alert('Link copied to clipboard!')
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              aria-label="Copy link"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Business?</h3>
          <p className="text-lg mb-6 opacity-90">
            Let's discuss how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-[#1F3A5F] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/case-studies"
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View More Case Studies
            </Link>
          </div>
        </div>

        {/* Back to Case Studies Link */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#5F8FB4] hover:text-[#1F3A5F] font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Case Studies
          </Link>
        </div>
      </article>
    </main>
  )
}
