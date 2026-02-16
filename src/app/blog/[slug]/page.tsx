import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/sanity/queries'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata, generateBlogPostingSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  // Use SEO fields if available, otherwise fall back to post fields
  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || post.excerpt
  const ogImage = post.seo?.ogImage?.asset?.url || post.featuredImage?.asset?.url || `${SITE_CONFIG.url}/og-image.jpg`

  // Generate canonical URL
  const canonicalUrl = `/blog/${slug}`

  // Generate full metadata using SEO utility
  return generateSEOMetadata({
    title: metaTitle,
    description: metaDescription,
    canonical: canonicalUrl,
    ogImage: ogImage,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: post.author?.name ? [post.author.name] : undefined,
    keywords: post.tags || [],
  })
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const currentUrl = `${SITE_CONFIG.url}/blog/${slug}`
  
  // Generate BlogPosting schema using SEO utility
  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author?.name || 'Mahe Tech Systems',
    publishedAt: post.publishedAt,
    modifiedAt: post.updatedAt || post.publishedAt,
    image: post.featuredImage?.asset?.url || `${SITE_CONFIG.url}/og-image.jpg`,
    url: currentUrl,
  })

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* JSON-LD Structured Data for BlogPosting */}
      <StructuredData data={blogPostingSchema} />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#1F3A5F] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[#1F3A5F] transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#111827]">{post.title}</span>
        </nav>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span
                key={category._id}
                className="text-sm font-medium text-[#5F8FB4] bg-[#5F8FB4]/10 px-3 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image?.asset?.url && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <OptimizedImage
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-[#111827]">{post.author.name}</p>
                <time dateTime={post.publishedAt} className="text-sm text-gray-600">
                  {publishDate}
                </time>
              </div>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {post.featuredImage?.asset?.url && (
          <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden bg-gray-200">
            <OptimizedImage
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
            {post.featuredImage.caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {post.featuredImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText
            value={post.content}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-[#111827] mt-12 mb-6">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-[#111827] mt-10 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold text-[#111827] mt-8 mb-3">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-bold text-[#111827] mt-6 mb-2">{children}</h4>
                ),
                normal: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#5F8FB4] pl-6 py-2 my-8 italic text-gray-700 bg-gray-50 rounded-r">
                    {children}
                  </blockquote>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li className="ml-4">{children}</li>,
                number: ({ children }) => <li className="ml-4">{children}</li>,
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-bold text-[#111827]">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-100 text-[#1F3A5F] px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                link: ({ children, value }) => (
                  <a
                    href={value?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5F8FB4] hover:text-[#1F3A5F] underline transition-colors"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Sharing Buttons */}
        <div className="border-t border-b border-gray-200 py-8 mb-12">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Share this article</h3>
          <div className="flex flex-wrap gap-3">
            {/* Twitter/X Share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
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

        {/* Author Bio */}
        {post.author && post.author.bio && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">About the Author</h3>
            <div className="flex gap-4">
              {post.author.image?.asset?.url && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <OptimizedImage
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-[#111827] mb-2">{post.author.name}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{post.author.bio}</p>
                {post.author.social && (
                  <div className="flex gap-3">
                    {post.author.social.twitter && (
                      <a
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1F3A5F] transition-colors"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1F3A5F] transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {post.author.social.github && (
                      <a
                        href={post.author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1F3A5F] transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
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
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  )
}
