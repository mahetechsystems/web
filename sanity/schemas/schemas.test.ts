import { describe, it, expect } from 'vitest'
import { schemaTypes } from './index'
import author from './author'
import category from './category'
import post from './post'
import caseStudy from './caseStudy'
import seo from './seo'

describe('Sanity Schemas', () => {
  describe('Schema Exports', () => {
    it('should export all schema types', () => {
      expect(schemaTypes).toBeDefined()
      expect(schemaTypes.length).toBe(5)
    })

    it('should include author schema', () => {
      expect(schemaTypes).toContain(author)
    })

    it('should include category schema', () => {
      expect(schemaTypes).toContain(category)
    })

    it('should include post schema', () => {
      expect(schemaTypes).toContain(post)
    })

    it('should include caseStudy schema', () => {
      expect(schemaTypes).toContain(caseStudy)
    })

    it('should include seo schema', () => {
      expect(schemaTypes).toContain(seo)
    })
  })

  describe('Author Schema', () => {
    it('should have correct name and type', () => {
      expect(author.name).toBe('author')
      expect(author.type).toBe('document')
    })

    it('should have required fields', () => {
      const fieldNames = author.fields.map((f) => f.name)
      expect(fieldNames).toContain('name')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('bio')
      expect(fieldNames).toContain('image')
      expect(fieldNames).toContain('social')
    })
  })

  describe('Category Schema', () => {
    it('should have correct name and type', () => {
      expect(category.name).toBe('category')
      expect(category.type).toBe('document')
    })

    it('should have required fields', () => {
      const fieldNames = category.fields.map((f) => f.name)
      expect(fieldNames).toContain('title')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('description')
    })
  })

  describe('Blog Post Schema', () => {
    it('should have correct name and type', () => {
      expect(post.name).toBe('post')
      expect(post.type).toBe('document')
    })

    it('should have all required fields', () => {
      const fieldNames = post.fields.map((f) => f.name)
      expect(fieldNames).toContain('title')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('excerpt')
      expect(fieldNames).toContain('content')
      expect(fieldNames).toContain('author')
      expect(fieldNames).toContain('publishedAt')
      expect(fieldNames).toContain('featuredImage')
      expect(fieldNames).toContain('categories')
      expect(fieldNames).toContain('tags')
      expect(fieldNames).toContain('seo')
    })

    it('should have author as reference field', () => {
      const authorField = post.fields.find((f) => f.name === 'author')
      expect(authorField?.type).toBe('reference')
    })

    it('should have categories as array of references', () => {
      const categoriesField = post.fields.find((f) => f.name === 'categories')
      expect(categoriesField?.type).toBe('array')
    })
  })

  describe('Case Study Schema', () => {
    it('should have correct name and type', () => {
      expect(caseStudy.name).toBe('caseStudy')
      expect(caseStudy.type).toBe('document')
    })

    it('should have all required fields', () => {
      const fieldNames = caseStudy.fields.map((f) => f.name)
      expect(fieldNames).toContain('title')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('client')
      expect(fieldNames).toContain('industry')
      expect(fieldNames).toContain('problem')
      expect(fieldNames).toContain('systemDesign')
      expect(fieldNames).toContain('execution')
      expect(fieldNames).toContain('outcomes')
      expect(fieldNames).toContain('images')
      expect(fieldNames).toContain('publishedAt')
      expect(fieldNames).toContain('seo')
    })

    it('should have execution as array field', () => {
      const executionField = caseStudy.fields.find((f) => f.name === 'execution')
      expect(executionField?.type).toBe('array')
    })

    it('should have outcomes as array field', () => {
      const outcomesField = caseStudy.fields.find((f) => f.name === 'outcomes')
      expect(outcomesField?.type).toBe('array')
    })
  })

  describe('SEO Schema', () => {
    it('should have correct name and type', () => {
      expect(seo.name).toBe('seo')
      expect(seo.type).toBe('object')
    })

    it('should have SEO fields', () => {
      const fieldNames = seo.fields.map((f) => f.name)
      expect(fieldNames).toContain('metaTitle')
      expect(fieldNames).toContain('metaDescription')
      expect(fieldNames).toContain('ogImage')
    })
  })
})
