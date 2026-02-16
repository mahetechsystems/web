/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mahetechsystems.com',
  generateRobotsTxt: false, // We'll handle robots.txt separately in task 12.2
  generateIndexSitemap: false, // Single sitemap for now, can enable if we exceed 50k URLs
  exclude: [
    '/api/*', // Exclude API routes
    '/studio', // Exclude Sanity Studio
    '/studio/*', // Exclude Sanity Studio routes
    '/demo', // Exclude demo pages
    '/demo/*', // Exclude demo routes
  ],
  // Transform function to add additional metadata
  transform: async (config, path) => {
    // Default priority and changefreq
    let priority = 0.7
    let changefreq = 'weekly'

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    }
    // Main pages get high priority
    else if (['/about', '/services', '/contact'].includes(path)) {
      priority = 0.9
      changefreq = 'weekly'
    }
    // Blog and case studies listing pages
    else if (['/blog', '/case-studies'].includes(path)) {
      priority = 0.8
      changefreq = 'daily'
    }
    // Individual blog posts and case studies
    else if (path.startsWith('/blog/') || path.startsWith('/case-studies/')) {
      priority = 0.7
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  // Additional paths to include (will be merged with Next.js routes)
  additionalPaths: async (config) => {
    const result = []

    // Add blog listing page explicitly
    result.push(
      await config.transform(config, '/blog')
    )

    // Dynamically fetch blog post slugs from Sanity
    try {
      // Use dynamic import for ES modules with proper URL
      const queriesModule = await import('./src/lib/sanity/queries.js')
      const { getAllBlogPostSlugs } = queriesModule
      const blogSlugs = await getAllBlogPostSlugs()
      
      if (blogSlugs && blogSlugs.length > 0) {
        for (const slug of blogSlugs) {
          result.push(
            await config.transform(config, `/blog/${slug}`)
          )
        }
      }
    } catch (error) {
      console.warn('Could not fetch blog post slugs for sitemap:', error.message)
    }

    // Dynamically fetch case study slugs from Sanity
    try {
      // Use dynamic import for ES modules with proper URL
      const queriesModule = await import('./src/lib/sanity/queries.js')
      const { getAllCaseStudySlugs } = queriesModule
      const caseStudySlugs = await getAllCaseStudySlugs()
      
      if (caseStudySlugs && caseStudySlugs.length > 0) {
        for (const slug of caseStudySlugs) {
          result.push(
            await config.transform(config, `/case-studies/${slug}`)
          )
        }
      }
    } catch (error) {
      console.warn('Could not fetch case study slugs for sitemap:', error.message)
    }

    return result
  },
}
