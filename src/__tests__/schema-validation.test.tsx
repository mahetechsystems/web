/**
 * Schema Validation Tests
 *
 * Validates that all pages have proper Schema.org structured data markup.
 * Tests cover Organization, Service, BlogPosting, and Article schemas.
 *
 * Requirements: 7.8
 * Task: 12.3 - Implement structured data across pages
 */

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBlogPostingSchema,
  generateArticleSchema,
  generateServiceSchema,
} from '@/lib/seo'
import { SERVICES } from '@/lib/services-data'

describe('Schema Validation Tests', () => {
  describe('Organization Schema', () => {
    it('should generate valid Organization schema', () => {
      const schema = generateOrganizationSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Organization')
      expect(schema.name).toBeDefined()
      expect(schema.url).toBeDefined()
      expect(schema.description).toBeDefined()
      expect(schema.address).toBeDefined()
      expect(schema.address['@type']).toBe('PostalAddress')
      expect(schema.contactPoint).toBeDefined()
      expect(schema.contactPoint['@type']).toBe('ContactPoint')
    })

    it('should have required Organization properties', () => {
      const schema = generateOrganizationSchema()

      // Required properties for Organization schema
      expect(schema).toHaveProperty('name')
      expect(schema).toHaveProperty('url')
      expect(schema).toHaveProperty('logo')
      expect(schema).toHaveProperty('description')
    })
  })

  describe('WebSite Schema', () => {
    it('should generate valid WebSite schema', () => {
      const schema = generateWebSiteSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('WebSite')
      expect(schema.name).toBeDefined()
      expect(schema.url).toBeDefined()
      expect(schema.description).toBeDefined()
    })

    it('should include SearchAction', () => {
      const schema = generateWebSiteSchema()

      expect(schema.potentialAction).toBeDefined()
      expect(schema.potentialAction['@type']).toBe('SearchAction')
      expect(schema.potentialAction.target).toBeDefined()
      expect(schema.potentialAction['query-input']).toBeDefined()
    })
  })

  describe('Service Schema', () => {
    it('should generate valid Service schema for all services', () => {
      SERVICES.forEach((service) => {
        const schema = service.schema

        expect(schema['@context']).toBe('https://schema.org')
        expect(schema['@type']).toBe('Service')
        expect(schema.name).toBeDefined()
        expect(schema.description).toBeDefined()
        expect(schema.provider).toBeDefined()
        expect(schema.provider['@type']).toBe('Organization')
        expect(schema.areaServed).toBeDefined()
        expect(schema.serviceType).toBeDefined()
      })
    })

    it('should have unique service names', () => {
      const serviceNames = SERVICES.map((s) => s.schema.name)
      const uniqueNames = new Set(serviceNames)

      expect(uniqueNames.size).toBe(serviceNames.length)
    })

    it('should generate Service schema with custom data', () => {
      const schema = generateServiceSchema({
        name: 'Test Service',
        description: 'Test description',
        serviceType: 'Test Type',
        areaServed: 'India',
      })

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Service')
      expect(schema.name).toBe('Test Service')
      expect(schema.description).toBe('Test description')
      expect(schema.serviceType).toBe('Test Type')
      expect(schema.areaServed).toBe('India')
    })
  })

  describe('BlogPosting Schema', () => {
    it('should generate valid BlogPosting schema', () => {
      const schema = generateBlogPostingSchema({
        title: 'Test Blog Post',
        description: 'Test description',
        author: 'Test Author',
        publishedAt: '2024-01-01T00:00:00Z',
        image: '/test-image.jpg',
        url: 'https://example.com/blog/test',
      })

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('BlogPosting')
      expect(schema.headline).toBe('Test Blog Post')
      expect(schema.description).toBe('Test description')
      expect(schema.datePublished).toBe('2024-01-01T00:00:00Z')
      expect(schema.author).toBeDefined()
      expect(schema.author['@type']).toBe('Person')
      expect(schema.author.name).toBe('Test Author')
      expect(schema.publisher).toBeDefined()
      expect(schema.publisher['@type']).toBe('Organization')
      expect(schema.mainEntityOfPage).toBeDefined()
    })

    it('should use modifiedAt if provided', () => {
      const schema = generateBlogPostingSchema({
        title: 'Test',
        description: 'Test',
        author: 'Test',
        publishedAt: '2024-01-01T00:00:00Z',
        modifiedAt: '2024-01-02T00:00:00Z',
        image: '/test.jpg',
        url: 'https://example.com/test',
      })

      expect(schema.dateModified).toBe('2024-01-02T00:00:00Z')
    })

    it('should default modifiedAt to publishedAt if not provided', () => {
      const schema = generateBlogPostingSchema({
        title: 'Test',
        description: 'Test',
        author: 'Test',
        publishedAt: '2024-01-01T00:00:00Z',
        image: '/test.jpg',
        url: 'https://example.com/test',
      })

      expect(schema.dateModified).toBe('2024-01-01T00:00:00Z')
    })
  })

  describe('Article Schema', () => {
    it('should generate valid Article schema', () => {
      const schema = generateArticleSchema({
        title: 'Test Case Study',
        description: 'Test description',
        author: 'Test Author',
        publishedAt: '2024-01-01T00:00:00Z',
        image: '/test-image.jpg',
        url: 'https://example.com/case-studies/test',
      })

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Article')
      expect(schema.headline).toBe('Test Case Study')
      expect(schema.description).toBe('Test description')
      expect(schema.datePublished).toBe('2024-01-01T00:00:00Z')
      expect(schema.author).toBeDefined()
      expect(schema.author['@type']).toBe('Person')
      expect(schema.author.name).toBe('Test Author')
      expect(schema.publisher).toBeDefined()
      expect(schema.publisher['@type']).toBe('Organization')
      expect(schema.mainEntityOfPage).toBeDefined()
    })

    it('should handle absolute image URLs', () => {
      const schema = generateArticleSchema({
        title: 'Test',
        description: 'Test',
        author: 'Test',
        publishedAt: '2024-01-01T00:00:00Z',
        image: 'https://cdn.example.com/image.jpg',
        url: 'https://example.com/test',
      })

      expect(schema.image).toBe('https://cdn.example.com/image.jpg')
    })
  })

  describe('Schema Structure Validation', () => {
    it('should have valid JSON-LD structure', () => {
      const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateBlogPostingSchema({
          title: 'Test',
          description: 'Test',
          author: 'Test',
          publishedAt: '2024-01-01',
          image: '/test.jpg',
          url: 'https://example.com',
        }),
        generateArticleSchema({
          title: 'Test',
          description: 'Test',
          author: 'Test',
          publishedAt: '2024-01-01',
          image: '/test.jpg',
          url: 'https://example.com',
        }),
      ]

      schemas.forEach((schema) => {
        // Should be serializable to JSON
        expect(() => JSON.stringify(schema)).not.toThrow()

        // Should have @context and @type
        expect(schema['@context']).toBe('https://schema.org')
        expect(schema['@type']).toBeDefined()
      })
    })

    it('should not have undefined or null values in required fields', () => {
      const schema = generateOrganizationSchema()

      // Check that required fields are not undefined or null
      expect(schema.name).not.toBeUndefined()
      expect(schema.name).not.toBeNull()
      expect(schema.url).not.toBeUndefined()
      expect(schema.url).not.toBeNull()
    })
  })

  describe('Services ItemList Schema', () => {
    it('should generate valid ItemList schema for services', () => {
      const servicesSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: SERVICES.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: service.schema,
        })),
      }

      expect(servicesSchema['@context']).toBe('https://schema.org')
      expect(servicesSchema['@type']).toBe('ItemList')
      expect(servicesSchema.itemListElement).toHaveLength(SERVICES.length)

      servicesSchema.itemListElement.forEach((item, index) => {
        expect(item['@type']).toBe('ListItem')
        expect(item.position).toBe(index + 1)
        expect(item.item).toBeDefined()
        expect(item.item['@type']).toBe('Service')
      })
    })
  })
})
