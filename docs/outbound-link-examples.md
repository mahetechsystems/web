# Outbound Link Tracking - Usage Examples

This document provides practical examples of implementing outbound link tracking across the Mahe Tech Systems website.

## Table of Contents

1. [Social Media Links](#social-media-links)
2. [WhatsApp Contact Links](#whatsapp-contact-links)
3. [Social Sharing Buttons](#social-sharing-buttons)
4. [Author Profile Links](#author-profile-links)
5. [External Resource Links](#external-resource-links)
6. [Partner Links](#partner-links)
7. [Calendly Links](#calendly-links)
8. [Privacy Policy Links](#privacy-policy-links)

## Social Media Links

### Footer Social Links

```tsx
import { OutboundLink } from "@/components/ui";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/mahetech",
    icon: <TwitterIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/mahetech",
    icon: <LinkedInIcon />,
  },
  {
    name: "GitHub",
    href: "https://github.com/mahetech",
    icon: <GitHubIcon />,
  },
];

export function Footer() {
  return (
    <footer>
      <div className="social-links">
        {socialLinks.map((link) => (
          <OutboundLink
            key={link.name}
            href={link.href}
            trackingLabel={`${link.name} - Footer`}
            className="social-link"
            aria-label={`Follow us on ${link.name}`}
          >
            {link.icon}
          </OutboundLink>
        ))}
      </div>
    </footer>
  );
}
```

### Navigation Social Links

```tsx
import { OutboundLink } from "@/components/ui";

export function Navigation() {
  return (
    <nav>
      <OutboundLink
        href="https://twitter.com/mahetech"
        trackingLabel="Twitter - Navigation"
        className="nav-social-link"
      >
        <TwitterIcon className="w-5 h-5" />
      </OutboundLink>
    </nav>
  );
}
```

## WhatsApp Contact Links

### Contact Page WhatsApp Button

```tsx
import { OutboundLink } from "@/components/ui";

export function ContactPage() {
  const whatsappNumber = "919876543210";
  const whatsappMessage = "Hi, I'd like to discuss a project";

  return (
    <div className="contact-methods">
      <OutboundLink
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        trackingLabel="WhatsApp - Contact Page"
        className="whatsapp-button"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span>Chat on WhatsApp</span>
      </OutboundLink>
    </div>
  );
}
```

### Footer WhatsApp Link

```tsx
import { OutboundLink } from "@/components/ui";

export function Footer() {
  return (
    <footer>
      <div className="contact-info">
        <OutboundLink
          href="https://wa.me/919876543210"
          trackingLabel="WhatsApp - Footer"
          className="whatsapp-link"
        >
          <WhatsAppIcon /> +91 98765 43210
        </OutboundLink>
      </div>
    </footer>
  );
}
```

## Social Sharing Buttons

### Blog Post Sharing

```tsx
import { OutboundLink } from "@/components/ui";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-buttons">
      <h3>Share this article</h3>
      
      {/* Twitter Share */}
      <OutboundLink
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        trackingLabel="Share on Twitter - Blog Post"
        className="share-button twitter"
      >
        <TwitterIcon /> Share on Twitter
      </OutboundLink>

      {/* LinkedIn Share */}
      <OutboundLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        trackingLabel="Share on LinkedIn - Blog Post"
        className="share-button linkedin"
      >
        <LinkedInIcon /> Share on LinkedIn
      </OutboundLink>

      {/* Facebook Share */}
      <OutboundLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        trackingLabel="Share on Facebook - Blog Post"
        className="share-button facebook"
      >
        <FacebookIcon /> Share on Facebook
      </OutboundLink>
    </div>
  );
}
```

### Case Study Sharing

```tsx
import { OutboundLink } from "@/components/ui";

export function CaseStudyShare({ url, title }: { url: string; title: string }) {
  return (
    <div className="share-section">
      <OutboundLink
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        trackingLabel="Share on Twitter - Case Study"
        className="share-button"
      >
        <TwitterIcon /> Share this case study
      </OutboundLink>
    </div>
  );
}
```

## Author Profile Links

### Blog Post Author Section

```tsx
import { OutboundLink } from "@/components/ui";
import type { Author } from "@/types";

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="author-bio">
      <h3>{author.name}</h3>
      <p>{author.bio}</p>
      
      <div className="author-social-links">
        {author.social.twitter && (
          <OutboundLink
            href={author.social.twitter}
            trackingLabel={`Author Twitter - ${author.name}`}
            className="author-social-link"
            aria-label={`${author.name}'s Twitter profile`}
          >
            <TwitterIcon />
          </OutboundLink>
        )}
        
        {author.social.linkedin && (
          <OutboundLink
            href={author.social.linkedin}
            trackingLabel={`Author LinkedIn - ${author.name}`}
            className="author-social-link"
            aria-label={`${author.name}'s LinkedIn profile`}
          >
            <LinkedInIcon />
          </OutboundLink>
        )}
        
        {author.social.github && (
          <OutboundLink
            href={author.social.github}
            trackingLabel={`Author GitHub - ${author.name}`}
            className="author-social-link"
            aria-label={`${author.name}'s GitHub profile`}
          >
            <GitHubIcon />
          </OutboundLink>
        )}
      </div>
    </div>
  );
}
```

## External Resource Links

### Blog Content Links

```tsx
import { OutboundLink } from "@/components/ui";

export function BlogContent() {
  return (
    <article>
      <p>
        For more information, check out the{" "}
        <OutboundLink
          href="https://nextjs.org/docs"
          trackingLabel="Next.js Documentation - Blog Content"
          className="content-link"
        >
          Next.js documentation
        </OutboundLink>
        .
      </p>
      
      <p>
        You can also read about{" "}
        <OutboundLink
          href="https://react.dev/learn"
          trackingLabel="React Documentation - Blog Content"
          className="content-link"
        >
          React fundamentals
        </OutboundLink>
        .
      </p>
    </article>
  );
}
```

### Resource List

```tsx
import { OutboundLink } from "@/components/ui";

const resources = [
  {
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Official Next.js documentation",
  },
  {
    title: "React Documentation",
    url: "https://react.dev",
    description: "Official React documentation",
  },
  {
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/",
    description: "Official TypeScript documentation",
  },
];

export function ResourceList() {
  return (
    <div className="resource-list">
      <h2>Helpful Resources</h2>
      {resources.map((resource) => (
        <div key={resource.url} className="resource-item">
          <h3>
            <OutboundLink
              href={resource.url}
              trackingLabel={`Resource - ${resource.title}`}
              className="resource-link"
            >
              {resource.title}
            </OutboundLink>
          </h3>
          <p>{resource.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Partner Links

### Partner Showcase

```tsx
import { OutboundLink } from "@/components/ui";

const partners = [
  {
    name: "Partner Company A",
    url: "https://partnera.com",
    logo: "/images/partners/partner-a.png",
  },
  {
    name: "Partner Company B",
    url: "https://partnerb.com",
    logo: "/images/partners/partner-b.png",
  },
];

export function PartnerShowcase() {
  return (
    <section className="partners">
      <h2>Our Partners</h2>
      <div className="partner-grid">
        {partners.map((partner) => (
          <OutboundLink
            key={partner.name}
            href={partner.url}
            trackingLabel={`Partner - ${partner.name}`}
            className="partner-link"
            aria-label={`Visit ${partner.name} website`}
          >
            <img src={partner.logo} alt={partner.name} />
          </OutboundLink>
        ))}
      </div>
    </section>
  );
}
```

## Calendly Links

### Calendly Embed Fallback

```tsx
import { OutboundLink } from "@/components/ui";

export function CalendlyEmbed({ url }: { url: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="calendly-fallback">
        <p>Unable to load scheduling widget.</p>
        <OutboundLink
          href={url}
          trackingLabel="Calendly - Fallback Link"
          className="calendly-fallback-link"
        >
          Open scheduling page in new tab
        </OutboundLink>
      </div>
    );
  }

  return (
    <CalendlyWidget
      url={url}
      onError={() => setHasError(true)}
    />
  );
}
```

### Direct Calendly Link

```tsx
import { OutboundLink } from "@/components/ui";

export function BookingCTA() {
  return (
    <div className="booking-cta">
      <h2>Ready to get started?</h2>
      <OutboundLink
        href="https://calendly.com/mahetech/consultation"
        trackingLabel="Calendly - Direct Link CTA"
        className="booking-button"
      >
        Schedule a consultation
      </OutboundLink>
    </div>
  );
}
```

## Privacy Policy Links

### Contact Form Privacy Link

```tsx
import { OutboundLink } from "@/components/ui";

export function ContactForm() {
  return (
    <form>
      {/* Form fields... */}
      
      <div className="consent-checkbox">
        <input type="checkbox" id="consent" />
        <label htmlFor="consent">
          I agree to the{" "}
          <OutboundLink
            href="/privacy"
            trackingLabel="Privacy Policy - Contact Form"
            className="privacy-link"
          >
            privacy policy
          </OutboundLink>
          {" "}and consent to being contacted.
        </label>
      </div>
    </form>
  );
}
```

### Footer Privacy Link

```tsx
import { OutboundLink } from "@/components/ui";

export function Footer() {
  return (
    <footer>
      <div className="legal-links">
        <OutboundLink
          href="/privacy"
          trackingLabel="Privacy Policy - Footer"
          className="legal-link"
        >
          Privacy Policy
        </OutboundLink>
        
        <OutboundLink
          href="/terms"
          trackingLabel="Terms of Service - Footer"
          className="legal-link"
        >
          Terms of Service
        </OutboundLink>
      </div>
    </footer>
  );
}
```

## Advanced Patterns

### Conditional Tracking

```tsx
import { OutboundLink } from "@/components/ui";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  context: string;
}

export function SmartLink({ href, children, context }: SmartLinkProps) {
  const isExternal = href.startsWith("http");
  
  if (isExternal) {
    return (
      <OutboundLink
        href={href}
        trackingLabel={`External Link - ${context}`}
        className="external-link"
      >
        {children}
      </OutboundLink>
    );
  }
  
  return (
    <Link href={href} className="internal-link">
      {children}
    </Link>
  );
}
```

### Dynamic Tracking Labels

```tsx
import { OutboundLink } from "@/components/ui";

interface DynamicLinkProps {
  href: string;
  children: React.ReactNode;
  category: string;
  location: string;
}

export function DynamicLink({ href, children, category, location }: DynamicLinkProps) {
  const trackingLabel = `${category} - ${location}`;
  
  return (
    <OutboundLink
      href={href}
      trackingLabel={trackingLabel}
      className="dynamic-link"
    >
      {children}
    </OutboundLink>
  );
}

// Usage
<DynamicLink
  href="https://twitter.com/mahetech"
  category="Social Media"
  location="Blog Sidebar"
>
  Follow us
</DynamicLink>
```

### Link with Icon

```tsx
import { OutboundLink } from "@/components/ui";

export function ExternalLinkWithIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <OutboundLink
      href={href}
      trackingLabel={`External Resource - ${children}`}
      className="inline-flex items-center gap-1"
    >
      {children}
      <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
    </OutboundLink>
  );
}
```

## Testing Examples

### Unit Test Example

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { OutboundLink } from "@/components/ui";
import * as analytics from "@/lib/analytics";

vi.mock("@/lib/analytics");

test("tracks social media link click", () => {
  const trackOutboundLinkMock = vi.spyOn(analytics, "trackOutboundLink");
  
  render(
    <OutboundLink
      href="https://twitter.com/mahetech"
      trackingLabel="Twitter - Footer"
    >
      Follow us on Twitter
    </OutboundLink>
  );
  
  const link = screen.getByText("Follow us on Twitter");
  fireEvent.click(link);
  
  expect(trackOutboundLinkMock).toHaveBeenCalledWith(
    "https://twitter.com/mahetech",
    "Twitter - Footer"
  );
});
```

## Best Practices Summary

1. **Always use descriptive tracking labels** that include context
2. **Include location information** in tracking labels (Footer, Navigation, Blog, etc.)
3. **Use semantic link text** for accessibility and analytics
4. **Track all external links** consistently across the site
5. **Test tracking** in development before deploying
6. **Monitor analytics** regularly to identify popular external resources
7. **Update tracking labels** when restructuring the site

## Related Documentation

- [Outbound Link Tracking Implementation](./outbound-link-tracking.md)
- [OutboundLink Component README](../src/components/ui/OutboundLink.README.md)
- [Analytics Setup Guide](./analytics-setup.md)
