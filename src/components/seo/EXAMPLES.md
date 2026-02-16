# SEO Component Usage Examples

This document provides practical examples of using the SEO utilities and components in different page types.

## Homepage Example

```tsx
// src/app/page.tsx
import { StructuredData } from "@/components/seo";
import {
  generateMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

// Generate metadata for the page
export const metadata = generateMetadata({
  title: undefined, // Use default title
  description: undefined, // Use default description
  canonical: "/",
  ogType: "website",
  keywords: [
    "startup execution",
    "SaaS development",
    "digital transformation",
    "India",
  ],
});

export default function HomePage() {
  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* Add structured data to the page */}
      <StructuredData data={[organizationSchema, websiteSchema]} />

      {/* Page content */}
      <main>
        <h1>Welcome to Mahe Tech Systems</h1>
        {/* ... rest of the page */}
      </main>
    </>
  );
}
```

## Blog Listing Page Example

```tsx
// src/app/blog/page.tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Insights on startup execution, SaaS development, and digital transformation from Mahe Tech Systems.",
  canonical: "/blog",
  ogType: "website",
  keywords: ["startup blog", "SaaS insights", "tech articles"],
});

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      {/* Blog listing content */}
    </main>
  );
}
```

## Blog Post Page Example

```tsx
// src/app/blog/[slug]/page.tsx
import { StructuredData } from "@/components/seo";
import { generateMetadata, generateBlogPostingSchema } from "@/lib/seo";
import { getBlogPost } from "@/lib/cms";

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return generateMetadata({
      title: "Post Not Found",
      noindex: true,
    });
  }

  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    ogImage: post.featuredImage.src,
    ogType: "article",
    publishedTime: post.publishedAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: [post.author.name],
    section: post.categories[0]?.name,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Generate structured data
  const schema = generateBlogPostingSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    publishedAt: post.publishedAt.toISOString(),
    modifiedAt: post.updatedAt.toISOString(),
    image: post.featuredImage.src,
    url: `https://mahetechsystems.com/blog/${post.slug}`,
  });

  return (
    <>
      <StructuredData data={schema} />
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        {/* ... rest of the post content */}
      </article>
    </>
  );
}
```

## Case Study Page Example

```tsx
// src/app/case-studies/[slug]/page.tsx
import { StructuredData } from "@/components/seo";
import {
  generateMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { getCaseStudy } from "@/lib/cms";

interface CaseStudyPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return generateMetadata({
      title: "Case Study Not Found",
      noindex: true,
    });
  }

  return generateMetadata({
    title: caseStudy.title,
    description: caseStudy.problem.substring(0, 160),
    canonical: `/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.images[0]?.src,
    ogType: "article",
    publishedTime: caseStudy.publishedAt.toISOString(),
    keywords: [caseStudy.industry, "case study", "success story"],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: caseStudy.title,
    description: caseStudy.problem,
    author: "Mahe Tech Systems",
    publishedAt: caseStudy.publishedAt.toISOString(),
    image: caseStudy.images[0]?.src || "/og-image.jpg",
    url: `https://mahetechsystems.com/case-studies/${caseStudy.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}` },
  ]);

  return (
    <>
      <StructuredData data={[articleSchema, breadcrumbSchema]} />
      <article>
        <h1>{caseStudy.title}</h1>
        <p>Client: {caseStudy.client}</p>
        <p>Industry: {caseStudy.industry}</p>
        {/* ... rest of the case study content */}
      </article>
    </>
  );
}
```

## Services Page Example

```tsx
// src/app/services/page.tsx
import { StructuredData } from "@/components/seo";
import { generateMetadata, generateServiceSchema } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Services - Startup Execution Partner in India",
  description:
    "Expert startup execution, SaaS development, digital transformation, and growth automation services for Indian founders.",
  canonical: "/services",
  ogType: "website",
  keywords: [
    "startup execution partner India",
    "SaaS development",
    "digital transformation",
    "growth automation",
    "CRM systems",
  ],
});

export default function ServicesPage() {
  // Generate structured data for each service
  const services = [
    {
      name: "Startup Execution Services",
      description:
        "End-to-end execution support for startups from ideation to launch",
      serviceType: "Business Consulting",
    },
    {
      name: "SaaS Development",
      description: "Custom SaaS platform development with scalable architecture",
      serviceType: "Software Development",
    },
    {
      name: "Digital Transformation",
      description: "Modernize your business with digital solutions",
      serviceType: "Technology Consulting",
    },
  ];

  const serviceSchemas = services.map((service) =>
    generateServiceSchema(service)
  );

  return (
    <>
      <StructuredData data={serviceSchemas} />
      <main>
        <h1>Our Services</h1>
        {/* Services content */}
      </main>
    </>
  );
}
```

## About Page Example

```tsx
// src/app/about/page.tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About Us",
  description:
    "Learn about Mahe Tech Systems, our mission to empower founders with structured execution, and our systems thinking philosophy.",
  canonical: "/about",
  ogType: "website",
  keywords: ["about mahe tech", "systems thinking", "startup execution"],
});

export default function AboutPage() {
  return (
    <main>
      <h1>About Mahe Tech Systems</h1>
      {/* About content */}
    </main>
  );
}
```

## Contact Page Example

```tsx
// src/app/contact/page.tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Mahe Tech Systems. Schedule a consultation or send us a message about your startup execution needs.",
  canonical: "/contact",
  ogType: "website",
});

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      {/* Contact form and information */}
    </main>
  );
}
```

## Dynamic Route with Multiple Schemas Example

```tsx
// Example: Product page with multiple schema types
import { StructuredData } from "@/components/seo";
import {
  generateMetadata,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";

export default function ProductPage({ product }) {
  // Generate multiple schemas
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const article = generateArticleSchema({
    title: product.name,
    description: product.description,
    author: "Mahe Tech Systems",
    publishedAt: product.createdAt,
    image: product.image,
    url: `https://mahetechsystems.com/products/${product.slug}`,
  });

  return (
    <>
      {/* Pass array of schemas */}
      <StructuredData data={[breadcrumbs, article]} />
      <main>{/* Product content */}</main>
    </>
  );
}
```

## Error Page Example (404)

```tsx
// src/app/not-found.tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  noindex: true, // Don't index error pages
});

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </main>
  );
}
```

## Best Practices Summary

1. **Always use generateMetadata** for consistent SEO across pages
2. **Include structured data** on content pages (blog, case studies, services)
3. **Use canonical URLs** to prevent duplicate content
4. **Set noindex** on error pages and pages you don't want indexed
5. **Include keywords** relevant to the page content
6. **Use descriptive titles** that accurately represent the page
7. **Keep descriptions concise** (150-160 characters)
8. **Use appropriate OG types** (website for static pages, article for content)
9. **Include breadcrumbs** on deep pages for better navigation
10. **Test your implementation** using Google's Rich Results Test
