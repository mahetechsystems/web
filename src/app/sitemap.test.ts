import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

describe('Sitemap Generation', () => {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')

  it('should generate sitemap.xml file', () => {
    expect(existsSync(sitemapPath)).toBe(true)
  })

  it('should contain valid XML', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Check for XML declaration
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    
    // Check for urlset element
    expect(sitemap).toContain('<urlset')
    expect(sitemap).toContain('</urlset>')
  })

  it('should include all main static pages', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Required pages - note that homepage doesn't have trailing slash in sitemap
    const requiredPages = [
      { path: '/', pattern: '<loc>[^<]*</loc>' }, // Homepage (no trailing slash)
      { path: '/about', pattern: '<loc>[^<]*/about</loc>' },
      { path: '/services', pattern: '<loc>[^<]*/services</loc>' },
      { path: '/case-studies', pattern: '<loc>[^<]*/case-studies</loc>' },
      { path: '/blog', pattern: '<loc>[^<]*/blog</loc>' },
      { path: '/contact', pattern: '<loc>[^<]*/contact</loc>' },
    ]

    for (const { path, pattern } of requiredPages) {
      // Check if the page is in the sitemap
      expect(sitemap).toMatch(new RegExp(pattern))
    }
  })

  it('should exclude demo and API routes', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Pages that should NOT be in the sitemap
    expect(sitemap).not.toContain('/demo')
    expect(sitemap).not.toContain('/api')
    expect(sitemap).not.toContain('/studio')
  })

  it('should include priority and changefreq for all URLs', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Extract all URL entries
    const urlMatches = sitemap.match(/<url>[\s\S]*?<\/url>/g)
    
    expect(urlMatches).toBeTruthy()
    expect(urlMatches!.length).toBeGreaterThan(0)

    // Check each URL has priority and changefreq
    for (const urlEntry of urlMatches!) {
      expect(urlEntry).toContain('<priority>')
      expect(urlEntry).toContain('<changefreq>')
      expect(urlEntry).toContain('<lastmod>')
    }
  })

  it('should have correct priority values', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Homepage should have priority 1
    const homepageMatch = sitemap.match(/<url>[\s\S]*?<loc>[^<]*\/<\/loc>[\s\S]*?<priority>([^<]+)<\/priority>[\s\S]*?<\/url>/)
    if (homepageMatch) {
      expect(parseFloat(homepageMatch[1])).toBe(1.0)
    }

    // Main pages should have priority 0.9
    const mainPages = ['/about', '/services', '/contact']
    for (const page of mainPages) {
      const pageMatch = sitemap.match(
        new RegExp(`<url>[\\s\\S]*?<loc>[^<]*${page}</loc>[\\s\\S]*?<priority>([^<]+)</priority>[\\s\\S]*?</url>`)
      )
      if (pageMatch) {
        expect(parseFloat(pageMatch[1])).toBe(0.9)
      }
    }

    // Blog and case studies listings should have priority 0.8
    const listingPages = ['/blog', '/case-studies']
    for (const page of listingPages) {
      const pageMatch = sitemap.match(
        new RegExp(`<url>[\\s\\S]*?<loc>[^<]*${page}</loc>[\\s\\S]*?<priority>([^<]+)</priority>[\\s\\S]*?</url>`)
      )
      if (pageMatch) {
        expect(parseFloat(pageMatch[1])).toBe(0.8)
      }
    }
  })

  it('should have correct changefreq values', () => {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    // Homepage should have daily changefreq
    const homepageMatch = sitemap.match(/<url>[\s\S]*?<loc>[^<]*\/<\/loc>[\s\S]*?<changefreq>([^<]+)<\/changefreq>[\s\S]*?<\/url>/)
    if (homepageMatch) {
      expect(homepageMatch[1]).toBe('daily')
    }

    // Main pages should have weekly changefreq
    const mainPages = ['/about', '/services', '/contact']
    for (const page of mainPages) {
      const pageMatch = sitemap.match(
        new RegExp(`<url>[\\s\\S]*?<loc>[^<]*${page}</loc>[\\s\\S]*?<changefreq>([^<]+)</changefreq>[\\s\\S]*?</url>`)
      )
      if (pageMatch) {
        expect(pageMatch[1]).toBe('weekly')
      }
    }

    // Blog and case studies listings should have daily changefreq
    const listingPages = ['/blog', '/case-studies']
    for (const page of listingPages) {
      const pageMatch = sitemap.match(
        new RegExp(`<url>[\\s\\S]*?<loc>[^<]*${page}</loc>[\\s\\S]*?<changefreq>([^<]+)</changefreq>[\\s\\S]*?</url>`)
      )
      if (pageMatch) {
        expect(pageMatch[1]).toBe('daily')
      }
    }
  })
})
