import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StructuredData } from "./StructuredData";

describe("StructuredData Component", () => {
  it("should render JSON-LD script tag", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Test Organization",
    };

    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();
  });

  it("should render correct JSON content", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Test Blog Post",
      author: {
        "@type": "Person",
        name: "John Doe",
      },
    };

    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toBe(JSON.stringify(data));
  });

  it("should handle array of schema objects", () => {
    const data = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Org",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Site",
      },
    ];

    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toBe(JSON.stringify(data));
  });

  it("should handle nested objects", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      author: {
        "@type": "Person",
        name: "Jane Smith",
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
        },
      },
    };

    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toBe(JSON.stringify(data));
  });

  it("should handle special characters in data", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: 'Test "Article" with <special> & characters',
    };

    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    // JSON.stringify should properly escape special characters
    expect(script?.textContent).toContain('\\"Article\\"');
  });
});
