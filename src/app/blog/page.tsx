import { getAllBlogPosts } from '@/lib/sanity/queries'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Mahe Tech Systems - Insights on Startup Execution & Systems',
  description: 'Expert insights on startup execution, systems thinking, SaaS development, and digital transformation. Learn from real-world case studies and proven frameworks.',
  openGraph: {
    title: 'Blog | Mahe Tech Systems',
    description: 'Expert insights on startup execution, systems thinking, SaaS development, and digital transformation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Mahe Tech Systems',
    description: 'Expert insights on startup execution, systems thinking, SaaS development, and digital transformation.',
  },
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

const POSTS_PER_PAGE = 12

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const allPosts = await getAllBlogPosts()
  
  // Calculate pagination
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Insights on startup execution, systems thinking, and building scalable solutions.
            Learn from real-world case studies and proven frameworks.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No blog posts available yet. Check back soon for insights and updates!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link href={`/blog/${post.slug.current}`} className="block">
                      {/* Featured Image */}
                      {post.featuredImage?.asset && 'url' in post.featuredImage.asset && post.featuredImage.asset.url ? (
                        <div className="relative w-full h-48 bg-gray-200">
                          <OptimizedImage
                            src={post.featuredImage.asset.url}
                            alt={post.featuredImage.alt || post.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover"
                            priority={false}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#1F3A5F] to-[#5F8FB4] flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            Mahe Tech Systems
                          </span>
                        </div>
                      )}

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories.slice(0, 2).map((category) => (
                              <span
                                key={category._id}
                                className="text-xs font-medium text-[#5F8FB4] bg-[#5F8FB4]/10 px-2 py-1 rounded"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-[#111827] mb-2 line-clamp-2 hover:text-[#1F3A5F] transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {post.author?.name && (
                              <span className="font-medium">{post.author.name}</span>
                            )}
                          </div>
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  {currentPage > 1 ? (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 rounded-lg bg-white text-[#1F3A5F] border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed">
                      Previous
                    </span>
                  )}

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)

                      if (!showPage) {
                        // Show ellipsis for skipped pages
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-3 py-2 text-gray-500">
                              ...
                            </span>
                          )
                        }
                        return null
                      }

                      return page === currentPage ? (
                        <span
                          key={page}
                          className="px-4 py-2 rounded-lg bg-[#1F3A5F] text-white font-semibold"
                        >
                          {page}
                        </span>
                      ) : (
                        <Link
                          key={page}
                          href={`/blog?page=${page}`}
                          className="px-4 py-2 rounded-lg bg-white text-[#1F3A5F] border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          {page}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-4 py-2 rounded-lg bg-white text-[#1F3A5F] border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
