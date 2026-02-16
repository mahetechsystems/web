'use client'

/**
 * Sanity Studio embedded in Next.js
 * This route makes the Sanity Studio accessible at /studio
 * 
 * Access the studio at: http://localhost:3000/studio
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
