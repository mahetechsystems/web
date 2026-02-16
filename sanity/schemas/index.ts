// Schema types for Sanity Studio
// Task 6.2: Blog and case study schemas

import author from './author'
import category from './category'
import seo from './seo'
import post from './post'
import caseStudy from './caseStudy'

export const schemaTypes = [
  // Document types
  author,
  category,
  post,
  caseStudy,
  
  // Object types
  seo,
]
