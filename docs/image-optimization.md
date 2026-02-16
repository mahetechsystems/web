# Image Optimization Guide

This document explains the image optimization configuration for the Mahe Tech Systems website, covering Next.js Image component setup, format optimization, and responsive image delivery.

## Overview

The website implements comprehensive image optimization to meet performance requirements:
- **Requirement 1.5**: WebP/AVIF format delivery with fallbacks
- **Requirement 1.6**: Lazy loading for below-fold images
- **Requirement 13.4**: Responsive image sizes for mobile optimization

## Configuration

### Next.js Image Configuration

Located in `next.config.ts`:

```typescript
images: {
  // Modern image formats with automatic fallbacks
  formats: ["image/avif", "image/webp"],
  
  // Device-specific sizes for responsive images
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Cache optimized images for 60 seconds
  minimumCacheTTL: 60,
  
  // Allowed image domains
  remotePatterns: [
    { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    { protocol: "https", hostname: "via.placeholder.com" },
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
}
```

### Image Format Optimization

The configuration automatically serves images in the optimal format:

1. **AVIF** (first choice): Best compression, modern browsers
2. **WebP** (fallback): Good compression, wider browser support
3. **Original format** (final fallback): For older browsers

Browsers automatically select the best supported format.

## OptimizedImage Component

### Basic Usage

```tsx
import { OptimizedImage } from "@/components/ui/OptimizedImage";

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true} // For above-the-fold images
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Image source URL |
| `alt` | string | required | Alt text for accessibility |
| `width` | number | required | Image width in pixels |
| `height` | number | required | Image height in pixels |
| `priority` | boolean | false | Load eagerly (for above-fold images) |
| `quality` | number | 85 | Image quality (1-100) |
| `formats` | array | ["avif", "webp"] | Supported formats |
| `sizes` | string | auto | Responsive sizes attribute |
| `loading` | string | auto | "lazy" or "eager" |
| `fill` | boolean | false | Fill parent container |
| `className` | string | - | CSS classes |

### Responsive Sizes

The component automatically generates responsive `sizes` attributes based on image width:

**Large images (> 1200px):**
```
(max-width: 640px) 100vw,
(max-width: 768px) 90vw,
(max-width: 1024px) 80vw,
(max-width: 1280px) 70vw,
1200px
```

**Medium images (> 768px):**
```
(max-width: 640px) 100vw,
(max-width: 1024px) 90vw,
(max-width: 1280px) 80vw,
768px
```

**Small images:**
```
(max-width: 640px) 100vw,
(max-width: 1024px) 50vw,
{width}px
```

You can override with custom `sizes` prop if needed.

## Usage Patterns

### Hero Images (Above the Fold)

```tsx
<OptimizedImage
  src="/images/hero.jpg"
  alt="Mahe Tech Systems - Structured Execution Partner"
  width={1920}
  height={1080}
  priority={true}  // Eager loading for LCP optimization
  quality={90}     // Higher quality for hero
/>
```

### Blog Featured Images

```tsx
<OptimizedImage
  src={post.featuredImage.src}
  alt={post.featuredImage.alt}
  width={800}
  height={450}
  loading="lazy"   // Lazy load below-fold images
  quality={85}
/>
```

### Case Study Images

```tsx
<OptimizedImage
  src={caseStudy.images[0].src}
  alt={caseStudy.images[0].alt}
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>
```

### Sanity CMS Images

```tsx
import { urlFor } from "@/lib/sanity/client";

const imageUrl = urlFor(sanityImage)
  .width(1200)
  .height(800)
  .quality(85)
  .format('webp')
  .url();

<OptimizedImage
  src={imageUrl}
  alt={sanityImage.alt}
  width={1200}
  height={800}
/>
```

### Fill Container Images

```tsx
<div className="relative w-full h-96">
  <OptimizedImage
    src="/images/background.jpg"
    alt="Background"
    fill={true}
    objectFit="cover"
    objectPosition="center"
    quality={80}
  />
</div>
```

## Performance Best Practices

### 1. Use Priority for Above-the-Fold Images

Set `priority={true}` for images visible on initial page load to optimize LCP (Largest Contentful Paint):

```tsx
// Hero image - always priority
<OptimizedImage src="/hero.jpg" priority={true} />
```

### 2. Lazy Load Below-the-Fold Images

Let images below the fold load lazily (default behavior):

```tsx
// Blog post images - lazy by default
<OptimizedImage src="/blog-image.jpg" />
```

### 3. Optimize Image Dimensions

Always provide exact dimensions to prevent layout shift (CLS):

```tsx
// Good - prevents CLS
<OptimizedImage width={800} height={600} />

// Bad - causes layout shift
<OptimizedImage /> // Missing dimensions
```

### 4. Use Appropriate Quality Settings

- **Hero images**: 90-95 quality
- **Content images**: 80-85 quality
- **Thumbnails**: 75-80 quality
- **Background images**: 70-75 quality

### 5. Provide Descriptive Alt Text

Always include meaningful alt text for accessibility and SEO:

```tsx
// Good
<OptimizedImage alt="Startup founder reviewing execution framework on laptop" />

// Bad
<OptimizedImage alt="image" />
```

## Error Handling

The OptimizedImage component includes built-in error handling:

1. **Image Load Failure**: Displays fallback placeholder with icon
2. **Missing Alt Text**: Uses src as fallback for accessibility
3. **Invalid Dimensions**: Gracefully handles with default sizing

Example fallback display:
```
┌─────────────────┐
│       📷        │
│ Image failed    │
│   to load       │
└─────────────────┘
```

## Sanity CMS Integration

### Image URL Builder

Use the `urlFor` helper to generate optimized Sanity image URLs:

```typescript
import { urlFor } from "@/lib/sanity/client";

// Basic usage
const url = urlFor(image).url();

// With transformations
const url = urlFor(image)
  .width(800)
  .height(600)
  .quality(85)
  .format('webp')
  .fit('crop')
  .crop('center')
  .url();
```

### Responsive Sanity Images

```typescript
// Generate multiple sizes for srcset
const sizes = [400, 800, 1200];
const srcset = sizes
  .map(size => `${urlFor(image).width(size).url()} ${size}w`)
  .join(', ');
```

## Testing Image Optimization

### Verify Format Delivery

1. Open DevTools Network tab
2. Load a page with images
3. Check image requests show `.avif` or `.webp` extensions
4. Verify older browsers receive fallback formats

### Check Lazy Loading

1. Open DevTools Network tab
2. Load a page with below-fold images
3. Verify images only load when scrolling into view
4. Check `loading="lazy"` attribute in HTML

### Measure Performance Impact

Run Lighthouse audit and verify:
- ✅ Properly sized images
- ✅ Efficient image formats (WebP/AVIF)
- ✅ Offscreen images deferred
- ✅ No layout shifts from images

## Troubleshooting

### Images Not Loading

**Problem**: Images from external domains fail to load

**Solution**: Add domain to `remotePatterns` in `next.config.ts`:

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "your-domain.com",
    pathname: "/images/**",
  },
],
```

### Poor Image Quality

**Problem**: Images appear blurry or pixelated

**Solution**: Increase quality setting or provide larger source images:

```tsx
<OptimizedImage quality={90} width={1200} />
```

### Layout Shift Issues

**Problem**: Images cause content to jump during load

**Solution**: Always provide exact width and height:

```tsx
<OptimizedImage width={800} height={600} />
```

### Slow Image Loading

**Problem**: Images take too long to load

**Solution**: 
1. Use priority for above-fold images
2. Reduce image quality if acceptable
3. Ensure CDN is properly configured
4. Check image source file sizes

## Related Documentation

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Performance Optimization Guide](./performance-optimization.md)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
