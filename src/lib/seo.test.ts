import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  generateMetadata,
  generateOrganizationSchema,
  generateBlogPostingSchema,
  generateArticleSchema,
  generateServiceSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from "./seo";

// Mock environment variables
vi.mock("./constants", () => ({
  SITE_CONFIG: {
    name: "Mahe Tech Systems",
    description: "Structured execution partner for founders",
    url: "https://mahetechsystems.com",
    author: "Mahe Tech Systems",
    locale: "en_US",
  },
  SEO_CONFIG: {
    defaultTitle: "Mahe Tech Systems - Structured Execution Partner for Founders",
    titleTemplate: "%s | Mahe Tech Systems",
    defaultDescription:
      "Structured execution partner for founders. We build systems that work.",
    defaultOgImage: "/og-image.jpg",
    twitterHandle: "@mahetechsystems",
  },
}));

describe("SEO Utilities", () => {
  describe("generateMetadata", () => {
    it("should generate basic metadata with defaults", () => {
      const metadata = generateMetadata();

      expect(metadata.title).toBe(
        "Mahe Tech Systems - Structured Execution Partner for Founders"
      );
      expect(metadata.description).toBe(
        "Structured execution partner for founders. We build systems that work."
      );
      expect(metadata.alternates?.canonical).toBe("https://mahetechsystems.com");
    });

    it("should generate metadata with custom title", () => {
      const metadata = generateMetadata({
        title: "About Us",
      });

      expect(metadata.title).toBe("About Us | Mahe Tech Systems");
    });

    it("should generate metadata with custom description", () => {
      const metadata = generateMetadata({
        description: "Custom description for testing",
      });

      expect(metadata.description).toBe("Custom description for testing");
    });

    it("should generate canonical URL correctly", () => {
      const metadata = generateMetadata({
        canonical: "/about",
      });

      expect(metadata.alternates?.canonical).toBe(
        "https://mahetechsystems.com/about"
      );
    });

    it("should generate OpenGraph tags", () => {
      const metadata = generateMetadata({
        title: "Test Page",
        description: "Test description",
        ogType: "article",
      });

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe("Test Page");
      expect(metadata.openGraph?.description).toBe("Test description");
      expect(metadata.openGraph?.type).toBe("article");
      expect(metadata.openGraph?.siteName).toBe("Mahe Tech Systems");
      expect(metadata.openGraph?.locale).toBe("en_US");
    });

    it("should generate Twitter Card tags", () => {
      const metadata = generateMetadata({
        title: "Test Page",
        description: "Test description",
        twitterCard: "summary_large_image",
      });

      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe("summary_large_image");
      expect(metadata.twitter?.site).toBe("@mahetechsystems");
      expect(metadata.twitter?.title).toBe("Test Page");
      expect(metadata.twitter?.description).toBe("Test description");
    });

    it("should handle custom OG image URL", () => {
      const metadata = generateMetadata({
        ogImage: "/custom-image.jpg",
      });

      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.openGraph?.images?.[0]).toMatchObject({
        url: "https://mahetechsystems.com/custom-image.jpg",
        width: 1200,
        height: 630,
      });
    });

    it("should handle absolute OG image URL", () => {
      const metadata = generateMetadata({
        ogImage: "https://example.com/image.jpg",
      });

      expect(metadata.openGraph?.images?.[0].url).toBe(
        "https://example.com/image.jpg"
      );
    });

    it("should set noindex when specified", () => {
      const metadata = generateMetadata({
        noindex: true,
      });

      expect(metadata.robots).toMatchObject({
        index: false,
        follow: false,
      });
    });

    it("should set index by default", () => {
      const metadata = generateMetadata();

      expect(metadata.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it("should include keywords when provided", () => {
      const metadata = generateMetadata({
        keywords: ["startup", "execution", "SaaS"],
      });

      expect(metadata.keywords).toEqual(["startup", "execution", "SaaS"]);
    });

    it("should include article metadata when provided", () => {
      const metadata = generateMetadata({
        title: "Blog Post",
        ogType: "article",
        publishedTime: "2024-01-15T10:00:00Z",
        modifiedTime: "2024-01-20T15:00:00Z",
        authors: ["John Doe"],
        section: "Technology",
      });

      expect(metadata.openGraph?.type).toBe("article");
      expect(metadata.openGraph?.publishedTime).toBe("2024-01-15T10:00:00Z");
      expect(metadata.openGraph?.modifiedTime).toBe("2024-01-20T15:00:00Z");
      expect(metadata.openGraph?.authors).toEqual(["John Doe"]);
      expect(metadata.openGraph?.section).toBe("Technology");
    });

    it("should not include section for non-article types", () => {
      const metadata = generateMetadata({
        title: "Home Page",
        ogType: "website",
        section: "Technology",
      });

      expect(metadata.openGraph?.section).toBeUndefined();
    });
  });

  describe("generateOrganizationSchema", () => {
    it("should generate valid Organization schema", () => {
      const schema = generateOrganizationSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("Mahe Tech Systems");
      expect(schema.url).toBe("https://mahetechsystems.com");
      expect(schema.description).toBe("Structured execution partner for founders");
    });

    it("should include address information", () => {
      const schema = generateOrganizationSchema();

      expect(schema.address).toMatchObject({
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "India",
      });
    });

    it("should include contact point", () => {
      const schema = generateOrganizationSchema();

      expect(schema.contactPoint).toMatchObject({
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English"],
      });
    });
  });

  describe("generateBlogPostingSchema", () => {
    it("should generate valid BlogPosting schema", () => {
      const schema = generateBlogPostingSchema({
        title: "Test Blog Post",
        description: "Test description",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "/images/blog/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("BlogPosting");
      expect(schema.headline).toBe("Test Blog Post");
      expect(schema.description).toBe("Test description");
      expect(schema.datePublished).toBe("2024-01-15T10:00:00Z");
    });

    it("should handle relative image URLs", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "/images/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.image).toBe("https://mahetechsystems.com/images/test.jpg");
    });

    it("should handle absolute image URLs", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "https://example.com/image.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.image).toBe("https://example.com/image.jpg");
    });

    it("should use publishedAt for modifiedAt if not provided", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.dateModified).toBe("2024-01-15T10:00:00Z");
    });

    it("should use modifiedAt when provided", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        modifiedAt: "2024-01-20T15:00:00Z",
        image: "/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.dateModified).toBe("2024-01-20T15:00:00Z");
    });

    it("should include author information", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "Jane Smith",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.author).toMatchObject({
        "@type": "Person",
        name: "Jane Smith",
      });
    });

    it("should include publisher information", () => {
      const schema = generateBlogPostingSchema({
        title: "Test",
        description: "Test",
        author: "John Doe",
        publishedAt: "2024-01-15T10:00:00Z",
        image: "/test.jpg",
        url: "https://mahetechsystems.com/blog/test",
      });

      expect(schema.publisher).toMatchObject({
        "@type": "Organization",
        name: "Mahe Tech Systems",
      });
    });
  });

  describe("generateArticleSchema", () => {
    it("should generate valid Article schema", () => {
      const schema = generateArticleSchema({
        title: "Test Article",
        description: "Test description",
        author: "Mahe Tech Systems",
        publishedAt: "2024-01-10T09:00:00Z",
        image: "/images/article.jpg",
        url: "https://mahetechsystems.com/case-studies/test",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Article");
      expect(schema.headline).toBe("Test Article");
      expect(schema.description).toBe("Test description");
    });
  });

  describe("generateServiceSchema", () => {
    it("should generate valid Service schema", () => {
      const schema = generateServiceSchema({
        name: "Startup Execution",
        description: "End-to-end execution support",
        serviceType: "Business Consulting",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Service");
      expect(schema.name).toBe("Startup Execution");
      expect(schema.description).toBe("End-to-end execution support");
      expect(schema.serviceType).toBe("Business Consulting");
    });

    it("should use default areaServed if not provided", () => {
      const schema = generateServiceSchema({
        name: "Test Service",
        description: "Test",
        serviceType: "Consulting",
      });

      expect(schema.areaServed).toBe("India");
    });

    it("should use custom areaServed when provided", () => {
      const schema = generateServiceSchema({
        name: "Test Service",
        description: "Test",
        serviceType: "Consulting",
        areaServed: "Global",
      });

      expect(schema.areaServed).toBe("Global");
    });

    it("should include provider information", () => {
      const schema = generateServiceSchema({
        name: "Test Service",
        description: "Test",
        serviceType: "Consulting",
      });

      expect(schema.provider).toMatchObject({
        "@type": "Organization",
        name: "Mahe Tech Systems",
        url: "https://mahetechsystems.com",
      });
    });
  });

  describe("generateWebSiteSchema", () => {
    it("should generate valid WebSite schema", () => {
      const schema = generateWebSiteSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.name).toBe("Mahe Tech Systems");
      expect(schema.url).toBe("https://mahetechsystems.com");
    });

    it("should include search action", () => {
      const schema = generateWebSiteSchema();

      expect(schema.potentialAction).toMatchObject({
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://mahetechsystems.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      });
    });
  });

  describe("generateBreadcrumbSchema", () => {
    it("should generate valid BreadcrumbList schema", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Article", url: "/blog/article" },
      ]);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
    });

    it("should set correct positions", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
      ]);

      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[1].position).toBe(2);
    });

    it("should handle relative URLs", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]);

      expect(schema.itemListElement[0].item).toBe("https://mahetechsystems.com/");
      expect(schema.itemListElement[1].item).toBe(
        "https://mahetechsystems.com/about"
      );
    });

    it("should handle absolute URLs", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "https://mahetechsystems.com/" },
        { name: "External", url: "https://example.com/page" },
      ]);

      expect(schema.itemListElement[0].item).toBe("https://mahetechsystems.com/");
      expect(schema.itemListElement[1].item).toBe("https://example.com/page");
    });

    it("should include item names", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]);

      expect(schema.itemListElement[0].name).toBe("Home");
      expect(schema.itemListElement[1].name).toBe("Services");
    });
  });
});
