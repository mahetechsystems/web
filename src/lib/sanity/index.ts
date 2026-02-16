// Export all Sanity client utilities and queries
export { client, getClient, urlFor, sanityFetch } from './client'
export {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRecentBlogPosts,
  getAllBlogPostSlugs,
  getBlogPostsByCategory,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
  getAllCaseStudySlugs,
  checkSanityConnection,
} from './queries'
