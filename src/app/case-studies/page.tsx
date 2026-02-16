import { getAllCaseStudies } from '@/lib/sanity/queries'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies | Mahe Tech Systems - Real-World Execution Results',
  description: 'Explore detailed case studies showcasing our structured execution approach. See how we help startups and businesses achieve measurable outcomes through systems thinking.',
  openGraph: {
    title: 'Case Studies | Mahe Tech Systems',
    description: 'Explore detailed case studies showcasing our structured execution approach and measurable outcomes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Mahe Tech Systems',
    description: 'Explore detailed case studies showcasing our structured execution approach and measurable outcomes.',
  },
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Real-world examples of structured execution. See how we transform challenges into 
            measurable outcomes through systems thinking and strategic implementation.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          {caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No case studies available yet. Check back soon to see our work in action!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <article
                  key={caseStudy._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/case-studies/${caseStudy.slug.current}`} className="block">
                    {/* Featured Image */}
                    {caseStudy.images?.[0]?.asset && 'url' in caseStudy.images[0].asset && caseStudy.images[0].asset.url ? (
                      <div className="relative w-full h-48 bg-gray-200">
                        <OptimizedImage
                          src={caseStudy.images[0].asset.url}
                          alt={caseStudy.images[0].alt || caseStudy.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {caseStudy.client}
                        </span>
                      </div>
                    )}

                    {/* Case Study Content */}
                    <div className="p-6">
                      {/* Industry Tag */}
                      <div className="mb-3">
                        <span className="text-xs font-medium text-[#5F8FB4] bg-[#5F8FB4]/10 px-2 py-1 rounded">
                          {caseStudy.industry}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-[#111827] mb-2 line-clamp-2 hover:text-[#1F3A5F] transition-colors">
                        {caseStudy.title}
                      </h2>

                      {/* Client */}
                      <p className="text-sm font-medium text-[#5F8FB4] mb-3">
                        Client: {caseStudy.client}
                      </p>

                      {/* Brief Outcome */}
                      {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Key Outcome:</p>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {caseStudy.outcomes[0].description || 
                             `${caseStudy.outcomes[0].metric}: ${caseStudy.outcomes[0].value}`}
                          </p>
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-[#1F3A5F] font-medium text-sm hover:underline">
                          View Case Study →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
