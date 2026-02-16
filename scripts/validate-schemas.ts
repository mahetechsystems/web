#!/usr/bin/env tsx
/**
 * Schema Validation Script
 *
 * This script validates all Schema.org structured data implementations
 * by checking that they conform to Schema.org specifications.
 *
 * Usage: npm run validate-schemas
 */

import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBlogPostingSchema,
  generateArticleSchema,
  generateServiceSchema,
} from '../src/lib/seo'
import { SERVICES } from '../src/lib/services-data'

interface ValidationResult {
  schema: string
  valid: boolean
  errors: string[]
  warnings: string[]
}

const results: ValidationResult[] = []

function validateSchema(
  name: string,
  schema: Record<string, unknown>
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check required properties
  if (!schema['@context']) {
    errors.push('Missing @context property')
  } else if (schema['@context'] !== 'https://schema.org') {
    errors.push(`Invalid @context: ${schema['@context']}`)
  }

  if (!schema['@type']) {
    errors.push('Missing @type property')
  }

  // Check for undefined or null values
  Object.entries(schema).forEach(([key, value]) => {
    if (value === undefined) {
      errors.push(`Property "${key}" is undefined`)
    }
    if (value === null) {
      warnings.push(`Property "${key}" is null`)
    }
  })

  // Validate JSON serialization
  try {
    JSON.stringify(schema)
  } catch (error) {
    errors.push(`Schema is not JSON serializable: ${error}`)
  }

  return {
    schema: name,
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

console.log('🔍 Validating Schema.org Structured Data...\n')

// Validate Organization Schema
console.log('1️⃣  Validating Organization Schema...')
const orgSchema = generateOrganizationSchema()
results.push(validateSchema('Organization', orgSchema))

// Validate WebSite Schema
console.log('2️⃣  Validating WebSite Schema...')
const websiteSchema = generateWebSiteSchema()
results.push(validateSchema('WebSite', websiteSchema))

// Validate Service Schemas
console.log('3️⃣  Validating Service Schemas...')
SERVICES.forEach((service, index) => {
  results.push(
    validateSchema(`Service ${index + 1}: ${service.title}`, service.schema)
  )
})

// Validate BlogPosting Schema
console.log('4️⃣  Validating BlogPosting Schema...')
const blogSchema = generateBlogPostingSchema({
  title: 'Test Blog Post',
  description: 'Test description',
  author: 'Test Author',
  publishedAt: '2024-01-01T00:00:00Z',
  image: '/test-image.jpg',
  url: 'https://example.com/blog/test',
})
results.push(validateSchema('BlogPosting', blogSchema))

// Validate Article Schema
console.log('5️⃣  Validating Article Schema...')
const articleSchema = generateArticleSchema({
  title: 'Test Case Study',
  description: 'Test description',
  author: 'Test Author',
  publishedAt: '2024-01-01T00:00:00Z',
  image: '/test-image.jpg',
  url: 'https://example.com/case-studies/test',
})
results.push(validateSchema('Article', articleSchema))

// Validate custom Service Schema
console.log('6️⃣  Validating Custom Service Schema...')
const customServiceSchema = generateServiceSchema({
  name: 'Test Service',
  description: 'Test description',
  serviceType: 'Test Type',
  areaServed: 'India',
})
results.push(validateSchema('Custom Service', customServiceSchema))

// Print results
console.log('\n' + '='.repeat(60))
console.log('📊 VALIDATION RESULTS')
console.log('='.repeat(60) + '\n')

let totalValid = 0
let totalInvalid = 0

results.forEach((result) => {
  const status = result.valid ? '✅' : '❌'
  console.log(`${status} ${result.schema}`)

  if (result.valid) {
    totalValid++
  } else {
    totalInvalid++
    result.errors.forEach((error) => {
      console.log(`   ❌ Error: ${error}`)
    })
  }

  if (result.warnings.length > 0) {
    result.warnings.forEach((warning) => {
      console.log(`   ⚠️  Warning: ${warning}`)
    })
  }
})

console.log('\n' + '='.repeat(60))
console.log(`✅ Valid: ${totalValid}`)
console.log(`❌ Invalid: ${totalInvalid}`)
console.log(`📝 Total: ${results.length}`)
console.log('='.repeat(60) + '\n')

if (totalInvalid > 0) {
  console.log('❌ Validation failed! Please fix the errors above.')
  process.exit(1)
} else {
  console.log('✅ All schemas are valid!')
  console.log('\n💡 Next steps:')
  console.log('   1. Test with Google Rich Results Test')
  console.log('   2. Validate with Schema.org Validator')
  console.log('   3. Monitor Google Search Console')
  process.exit(0)
}
