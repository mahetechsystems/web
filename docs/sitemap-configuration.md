# Sitemap Configuration

This document describes the sitemap generation setup for the Mahe Tech Systems website.

## Overview

The website uses `next-sitemap` to automatically generate a sitemap.xml file that includes all public pages. The sitemap is generated during the build process and helps search engines discover and index all pages on the site.

## Configuration

The sitemap configuration is defined in `next-sitemap.config.js` at the root of the project.

### Key Features

1. **Automatic Static Page Discovery**: All static pages are automatically included
2. **Dynamic Content Integration**: Blog posts and case studies from Sanity CMS are dynamically fetched and included
3. **Priority and Change Frequency**: Pages are assigned appropriate priority and change frequency values
4. **Exclusions**: API routes, admin pages, and demo pages are excluded from the sitemap

### Priority Levels

- **Homepage (/)**: Priority 1.0, updated daily
- **Main Pages (/about, /services, /contact)**: Priority 0.9, updated weekly
- **Listing Pages (/blog, /case-studies)**: Priority 0.8, updated daily
- **Individual Posts (/blog/[slug], /case-studies/[slug])**: Priority 0.7, updated monthly

### Excluded Paths

The following paths are excluded from the sitemap:

- `/api/*` - API routes
- `/studio` and `/studio/*` - Sanity Studio admin interface
- `/demo` and `/demo/*` - Demo/development pages

## Build Process

The sitemap is generated automatically during the build process:

```bash
npm run build
```

This command:
1. Builds the Next.js application
2. Runs `next-sitemap` to generate the sitemap
3. Outputs the sitemap to `public/sitemap.xml`

The `postbuild` script also runs `next-sitemap` as a safety measure to ensure the sitemap is always generated.

## Dynamic Content

The sitemap configuration dynamically fetches blog post and case study slugs from Sanity CMS:

- **Blog Posts**: Fetched using `getAllBlogPostSlugs()` from `src/lib/sanity/queries.ts`
- **Case Studies**: Fetched using `getAllCaseStudySlugs()` from `src/lib/sanity/queries.ts`

If Sanity CMS is unavailable or not configured, the sitemap will still be generated with static pages only, and a warning will be logged.

## Environment Variables

The sitemap uses the `SITE_URL` environment variable to determine the base URL:

- **Development**: `http://localhost:3000` (from `.env.local`)
- **Production**: Should be set to `https://mahetechsystems.com`

Make sure to set the correct `SITE_URL` in your production environment variables.

## Accessing the Sitemap

Once generated, the sitemap is available at:

- **Development**: `http://localhost:3000/sitemap.xml`
- **Production**: `https://mahetechsystems.com/sitemap.xml`

## Validation

The sitemap follows the [Sitemaps XML protocol](https://www.sitemaps.org/protocol.html) and includes:

- XML declaration
- Proper namespace declarations
- URL entries with:
  - `<loc>` - The page URL
  - `<lastmod>` - Last modification date (ISO 8601 format)
  - `<changefreq>` - How frequently the page changes
  - `<priority>` - Relative priority (0.0 to 1.0)

## Testing

Unit tests for sitemap generation are located in `src/__tests__/sitemap.test.ts`. Run tests with:

```bash
npm test -- src/__tests__/sitemap.test.ts
```

The tests verify:
- Sitemap file is generated
- All required pages are included
- Valid XML structure
- Proper priority values
- Valid changefreq values
- Valid lastmod timestamps
- Excluded paths are not included

## Submitting to Search Engines

After deployment, submit the sitemap to search engines:

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to "Sitemaps" in the left sidebar
4. Enter `sitemap.xml` and click "Submit"

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Select your site
3. Navigate to "Sitemaps"
4. Enter the full sitemap URL and click "Submit"

## Troubleshooting

### Sitemap Not Generated

If the sitemap is not generated after build:

1. Check that `next-sitemap` is installed: `npm list next-sitemap`
2. Verify the build script includes `next-sitemap`: Check `package.json`
3. Look for errors in the build output

### Dynamic Pages Missing

If blog posts or case studies are missing from the sitemap:

1. Verify Sanity CMS is properly configured with valid credentials
2. Check that blog posts/case studies exist in the CMS
3. Verify the query functions return valid slugs
4. Check the build output for warnings about fetching slugs

### Wrong Base URL

If the sitemap URLs have the wrong domain:

1. Check the `SITE_URL` environment variable
2. For production, ensure it's set to `https://mahetechsystems.com`
3. Rebuild the site after changing environment variables

## References

- [next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)
- [Sitemaps XML Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)

## Requirements Validation

This implementation validates **Requirement 7.2**:

> THE Website SHALL include a sitemap.xml file listing all public pages

The sitemap includes:
- All static pages (home, about, services, case studies, blog, contact)
- Dynamic blog post pages (when CMS is configured)
- Dynamic case study pages (when CMS is configured)
- Proper XML structure following the Sitemaps protocol
- Automatic generation during the build process
