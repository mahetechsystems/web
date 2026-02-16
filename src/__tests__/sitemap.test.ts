import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Sitemap Generation', () => {
  it('should generate sitemap.xml file', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    
    // Check if sitemap file exists
    expect(() => readFileSync(sitemapPath, 'utf-8')).not.toThrow()
  })

  it('should include all required static pages in sitemap', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Required pages according to Requirements 7.2
    const requiredPages = [
      '/',           // Home page
      '/about',      // About page
      '/services',   // Services page
      '/case-studies', // Case studies listing
      '/blog',       // Blog listing
      '/contact',    // Contact page
    ]

    for (const page of requiredPages) {
      // Check if the page URL is in the sitemap
      // Handle both root path and other paths
      const urlPattern = page === '/' 
        ? /<loc>[^<]*<\/loc>/
        : new RegExp(`<loc>[^<]*${page.replace(/\//g, '\\/')}[^<]*<\\/loc>`)
      
      expect(sitemapContent).toMatch(urlPattern)
    }
  })

  it('should have valid XML structure', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Check for XML declaration
    expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    
    // Check for urlset element with proper namespace
    expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    
    // Check for closing urlset tag
    expect(sitemapContent).toContain('</urlset>')
  })

  it('should include proper priority values', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Homepage should have priority 1.0
    const homepageMatch = sitemapContent.match(/<url>.*?<loc>[^<]*\/<\/loc>.*?<priority>([\d.]+)<\/priority>.*?<\/url>/s)
    if (homepageMatch) {
      expect(parseFloat(homepageMatch[1])).toBe(1.0)
    }

    // Main pages should have priority 0.9
    const mainPages = ['about', 'services', 'contact']
    for (const page of mainPages) {
      const pageRegex = new RegExp(`<url>.*?<loc>[^<]*\\/${page}<\\/loc>.*?<priority>([\\d.]+)<\\/priority>.*?<\\/url>`, 's')
      const match = sitemapContent.match(pageRegex)
      if (match) {
        expect(parseFloat(match[1])).toBe(0.9)
      }
    }
  })

  it('should include changefreq values', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Check that changefreq is present
    expect(sitemapContent).toContain('<changefreq>')
    
    // Valid changefreq values according to sitemap protocol
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    const changefreqMatches = sitemapContent.match(/<changefreq>([^<]+)<\/changefreq>/g)
    
    if (changefreqMatches) {
      for (const match of changefreqMatches) {
        const frequency = match.replace(/<\/?changefreq>/g, '')
        expect(validFrequencies).toContain(frequency)
      }
    }
  })

  it('should include lastmod timestamps', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Check that lastmod is present
    expect(sitemapContent).toContain('<lastmod>')
    
    // Check that lastmod values are valid ISO 8601 dates
    const lastmodMatches = sitemapContent.match(/<lastmod>([^<]+)<\/lastmod>/g)
    
    if (lastmodMatches) {
      for (const match of lastmodMatches) {
        const dateString = match.replace(/<\/?lastmod>/g, '')
        // Should be a valid date
        expect(new Date(dateString).toString()).not.toBe('Invalid Date')
      }
    }
  })

  it('should exclude API routes and admin pages', () => {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')

    // Should not include API routes
    expect(sitemapContent).not.toContain('/api/')
    
    // Should not include Sanity Studio
    expect(sitemapContent).not.toContain('/studio')
    
    // Should not include demo pages
    expect(sitemapContent).not.toContain('/demo')
  })
})
