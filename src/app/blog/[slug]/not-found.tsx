import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-[#1F3A5F] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#111827] mb-4">Blog Post Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1F3A5F] text-white rounded-lg hover:bg-[#2d5080] transition-colors font-semibold"
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
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1F3A5F] border-2 border-[#1F3A5F] rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
