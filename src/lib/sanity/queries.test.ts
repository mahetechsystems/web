import { describe, it, expect, vi, beforeEach } from 'vitest'
import { client } from './client'
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRecentBlogPosts,
  getAllBlogPostSlugs,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
  getAllCaseStudySlugs,
  checkSanityConnection,
} from './queries'

// Mock the Sanity client
vi.mock('./client', () => ({
  client: {
    fetch: vi.fn(),
  },
}))

describe('Sanity Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Blog Post Queries', () => {
    it('getAllBlogPosts returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getAllBlogPosts()

      expect(result).toEqual([])
    })

    it('getAllBlogPosts returns posts on success', async () => {
      const mockPosts = [
        { _id: '1', title: 'Test Post', slug: { current: 'test-post' } },
      ]
      vi.mocked(client.fetch).mockResolvedValueOnce(mockPosts)

      const result = await getAllBlogPosts()

      expect(result).toEqual(mockPosts)
      expect(client.fetch).toHaveBeenCalledTimes(1)
    })

    it('getBlogPostBySlug returns null on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getBlogPostBySlug('test-slug')

      expect(result).toBeNull()
    })

    it('getBlogPostBySlug returns post on success', async () => {
      const mockPost = { _id: '1', title: 'Test Post', slug: { current: 'test-slug' } }
      vi.mocked(client.fetch).mockResolvedValueOnce(mockPost)

      const result = await getBlogPostBySlug('test-slug')

      expect(result).toEqual(mockPost)
      expect(client.fetch).toHaveBeenCalledWith(
        expect.any(String),
        { slug: 'test-slug' },
        expect.any(Object)
      )
    })

    it('getRecentBlogPosts returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getRecentBlogPosts(3)

      expect(result).toEqual([])
    })

    it('getRecentBlogPosts uses correct limit parameter', async () => {
      const mockPosts = [
        { _id: '1', title: 'Post 1' },
        { _id: '2', title: 'Post 2' },
      ]
      vi.mocked(client.fetch).mockResolvedValueOnce(mockPosts)

      await getRecentBlogPosts(3)

      expect(client.fetch).toHaveBeenCalledWith(
        expect.any(String),
        { limit: 2 }, // limit - 1
        expect.any(Object)
      )
    })

    it('getAllBlogPostSlugs returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getAllBlogPostSlugs()

      expect(result).toEqual([])
    })

    it('getAllBlogPostSlugs returns slugs on success', async () => {
      const mockSlugs = ['post-1', 'post-2', 'post-3']
      vi.mocked(client.fetch).mockResolvedValueOnce(mockSlugs)

      const result = await getAllBlogPostSlugs()

      expect(result).toEqual(mockSlugs)
    })
  })

  describe('Case Study Queries', () => {
    it('getAllCaseStudies returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getAllCaseStudies()

      expect(result).toEqual([])
    })

    it('getAllCaseStudies returns case studies on success', async () => {
      const mockCaseStudies = [
        { _id: '1', title: 'Case Study 1', slug: { current: 'case-1' } },
      ]
      vi.mocked(client.fetch).mockResolvedValueOnce(mockCaseStudies)

      const result = await getAllCaseStudies()

      expect(result).toEqual(mockCaseStudies)
    })

    it('getCaseStudyBySlug returns null on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getCaseStudyBySlug('test-slug')

      expect(result).toBeNull()
    })

    it('getCaseStudyBySlug returns case study on success', async () => {
      const mockCaseStudy = { _id: '1', title: 'Case Study', slug: { current: 'test-slug' } }
      vi.mocked(client.fetch).mockResolvedValueOnce(mockCaseStudy)

      const result = await getCaseStudyBySlug('test-slug')

      expect(result).toEqual(mockCaseStudy)
      expect(client.fetch).toHaveBeenCalledWith(
        expect.any(String),
        { slug: 'test-slug' },
        expect.any(Object)
      )
    })

    it('getFeaturedCaseStudies returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getFeaturedCaseStudies(3)

      expect(result).toEqual([])
    })

    it('getFeaturedCaseStudies uses correct limit parameter', async () => {
      const mockCaseStudies = [
        { _id: '1', title: 'Case 1' },
        { _id: '2', title: 'Case 2' },
      ]
      vi.mocked(client.fetch).mockResolvedValueOnce(mockCaseStudies)

      await getFeaturedCaseStudies(3)

      expect(client.fetch).toHaveBeenCalledWith(
        expect.any(String),
        { limit: 2 }, // limit - 1
        expect.any(Object)
      )
    })

    it('getAllCaseStudySlugs returns empty array on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await getAllCaseStudySlugs()

      expect(result).toEqual([])
    })

    it('getAllCaseStudySlugs returns slugs on success', async () => {
      const mockSlugs = ['case-1', 'case-2', 'case-3']
      vi.mocked(client.fetch).mockResolvedValueOnce(mockSlugs)

      const result = await getAllCaseStudySlugs()

      expect(result).toEqual(mockSlugs)
    })
  })

  describe('Utility Functions', () => {
    it('checkSanityConnection returns false on error', async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error('Connection failed'))

      const result = await checkSanityConnection()

      expect(result).toBe(false)
    })

    it('checkSanityConnection returns true on success', async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce('some-id')

      const result = await checkSanityConnection()

      expect(result).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('all query functions handle null/undefined responses gracefully', async () => {
      vi.mocked(client.fetch).mockResolvedValue(null)

      const blogPosts = await getAllBlogPosts()
      const caseStudies = await getAllCaseStudies()
      const recentPosts = await getRecentBlogPosts()
      const featuredCases = await getFeaturedCaseStudies()

      expect(blogPosts).toEqual([])
      expect(caseStudies).toEqual([])
      expect(recentPosts).toEqual([])
      expect(featuredCases).toEqual([])
    })

    it('all query functions log errors to console', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(client.fetch).mockRejectedValue(new Error('Test error'))

      await getAllBlogPosts()
      await getBlogPostBySlug('test')
      await getAllCaseStudies()
      await getCaseStudyBySlug('test')

      expect(consoleErrorSpy).toHaveBeenCalledTimes(4)
      consoleErrorSpy.mockRestore()
    })
  })

  describe('ISR Configuration', () => {
    it('queries include revalidate option for ISR', async () => {
      vi.mocked(client.fetch).mockResolvedValue([])

      await getAllBlogPosts()

      expect(client.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          next: expect.objectContaining({
            revalidate: 60,
          }),
        })
      )
    })
  })
})
