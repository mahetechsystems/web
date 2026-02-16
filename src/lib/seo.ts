import { Metadata } from "next";
import { SITE_CONFIG, SEO_CONFIG } from "./constants";

/**
 * SEO Utility Functions for Mahe Tech Systems Website
 *
 * This module provides utilities for generating SEO metadata using Next.js 14's Metadata API.
 * It supports OpenGraph tags, Twitter Cards, and JSON-LD structured data.
 *
 * Requirements: 7.4, 7.5, 7.6, 7.7, 7.8, 7.9
 */

export interface SEOOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  noindex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

/**
 * Generate Next.js Metadata object for SEO
 *
 * This function creates a complete Metadata object that includes:
 * - Basic meta tags (title, description)
 * - OpenGraph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL
 * - Robots directives
 *
 * @param options - SEO configuration options
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * export const metadata = generateMetadata({
 *   title: "About Us",
 *   description: "Learn about Mahe Tech Systems",
 *   ogType: "website"
 * });
 * ```
 */
export function generateMetadata(options: SEOOptions = {}): Metadata {
  const {
    title,
    description = SEO_CONFIG.defaultDescription,
    canonical,
    ogImage = SEO_CONFIG.defaultOgImage,
    ogType = "website",
    twitterCard = "summary_large_image",
    noindex = false,
    keywords = [],
    publishedTime,
    modifiedTime,
    authors,
    section,
  } = options;

  // Generate full title with template
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SEO_CONFIG.defaultTitle;

  // Generate canonical URL
  const canonicalUrl = canonical
    ? `${SITE_CONFIG.url}${canonical}`
    : SITE_CONFIG.url;

  // Generate full image URL
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_CONFIG.url}${ogImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: authors ? authors.map((name) => ({ name })) : undefined,
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title || SEO_CONFIG.defaultTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: ogType,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(section && ogType === "article" && { section }),
    },
    twitter: {
      card: twitterCard,
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: title || SEO_CONFIG.defaultTitle,
      description,
      images: [fullOgImage],
    },
  };

  return metadata;
}

/**
 * Generate Organization JSON-LD structured data
 *
 * This creates Schema.org Organization markup for the website.
 * Should be included on the homepage.
 *
 * Requirements: 7.8
 *
 * @returns JSON-LD script object
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: [
      // Social media URLs will be added from environment variables
    ].filter(Boolean),
  };
}

/**
 * Generate BlogPosting JSON-LD structured data
 *
 * This creates Schema.org BlogPosting markup for blog articles.
 *
 * Requirements: 7.8
 *
 * @param post - Blog post data
 * @returns JSON-LD script object
 */
export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http")
      ? post.image
      : `${SITE_CONFIG.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

/**
 * Generate Article JSON-LD structured data
 *
 * This creates Schema.org Article markup for case studies.
 *
 * Requirements: 7.8
 *
 * @param article - Article data
 * @returns JSON-LD script object
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${SITE_CONFIG.url}${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * Generate Service JSON-LD structured data
 *
 * This creates Schema.org Service markup for service pages.
 *
 * Requirements: 7.8
 *
 * @param service - Service data
 * @returns JSON-LD script object
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: service.areaServed || "India",
  };
}

/**
 * Generate WebSite JSON-LD structured data
 *
 * This creates Schema.org WebSite markup with search action.
 * Should be included on the homepage.
 *
 * Requirements: 7.8
 *
 * @returns JSON-LD script object
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD structured data
 *
 * This creates Schema.org BreadcrumbList markup for navigation breadcrumbs.
 *
 * Requirements: 7.8
 *
 * @param items - Breadcrumb items
 * @returns JSON-LD script object
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generate Person JSON-LD structured data
 *
 * This creates Schema.org Person markup for founder/author pages.
 *
 * Requirements: 7.8
 *
 * @param person - Person data
 * @returns JSON-LD script object
 */
export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: person.url.startsWith("http")
      ? person.url
      : `${SITE_CONFIG.url}${person.url}`,
    ...(person.image && {
      image: person.image.startsWith("http")
        ? person.image
        : `${SITE_CONFIG.url}${person.image}`,
    }),
    ...(person.sameAs && { sameAs: person.sameAs }),
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}
