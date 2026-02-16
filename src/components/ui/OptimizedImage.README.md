# OptimizedImage Component

A production-ready wrapper around Next.js Image component that provides automatic format optimization, lazy loading, responsive sizing, and error handling with fallback placeholders.

## Features

- ✅ **Automatic Format Optimization**: WebP/AVIF format support with automatic fallbacks (Requirement 1.5)
- ✅ **Smart Lazy Loading**: Lazy loading for below-fold images, eager for priority images (Requirement 1.6)
- ✅ **Responsive Images**: Automatic srcset and sizes configuration (Requirement 13.4)
- ✅ **Error Handling**: Graceful fallback placeholders when images fail to load (Requirement 16.4)
- ✅ **Accessibility**: Proper alt text and ARIA labels
- ✅ **Loading States**: Smooth opacity transitions on load
- ✅ **Flexible Layouts**: Support for fixed dimensions and fill layouts

## Usage

### Basic Usage

```tsx
import { OptimizedImage } from "@/components/ui";

export function MyComponent() {
  return (
    <OptimizedImage
      src="/images/hero.jpg"
      alt="Hero image"
      width={1200}
      height={800}
    />
  );
}
```

### Priority Images (Above the Fold)

For images that should load immediately (like hero images):

```tsx
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  priority // Loads eagerly, no lazy loading
/>
```

### Fill Layout (Responsive Container)

For images that should fill their container:

```tsx
<div className="relative w-full h-96">
  <OptimizedImage
    src="/images/background.jpg"
    alt="Background"
    width={1200}
    height={800}
    fill
    objectFit="cover"
  />
</div>
```

### Custom Responsive Sizes

Control how the image scales at different breakpoints:

```tsx
<OptimizedImage
  src="/images/product.jpg"
  alt="Product image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

### With Blur Placeholder

Provide a better loading experience with blur placeholders:

```tsx
import { OptimizedImage } from "@/components/ui";
import { generateBlurDataURL } from "@/lib/image-utils";

// Generate blur data URL on the server side (Server Component)
const blurDataURL = generateBlurDataURL(800, 600);

<OptimizedImage
  src="/images/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

### With Callbacks

Handle load and error events:

```tsx
<OptimizedImage
  src="/images/avatar.jpg"
  alt="User avatar"
  width={200}
  height={200}
  onLoad={() => console.log("Image loaded")}
  onError={() => console.log("Image failed to load")}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Image source URL |
| `alt` | `string` | Required | Alternative text for accessibility |
| `width` | `number` | Required | Image width in pixels |
| `height` | `number` | Required | Image height in pixels |
| `priority` | `boolean` | `false` | Load image eagerly (for above-fold images) |
| `quality` | `number` | `85` | Image quality (1-100) |
| `formats` | `("webp" \| "avif")[]` | `["avif", "webp"]` | Supported image formats |
| `sizes` | `string` | Auto-generated | Responsive sizes attribute |
| `loading` | `"lazy" \| "eager"` | Auto | Loading strategy (overrides priority) |
| `className` | `string` | `undefined` | Additional CSS classes |
| `fill` | `boolean` | `false` | Fill parent container |
| `objectFit` | `string` | `"cover"` | CSS object-fit value |
| `objectPosition` | `string` | `"center"` | CSS object-position value |
| `placeholder` | `"blur" \| "empty"` | `"empty"` | Placeholder type |
| `blurDataURL` | `string` | `undefined` | Base64 blur placeholder data |
| `onLoad` | `() => void` | `undefined` | Callback when image loads |
| `onError` | `() => void` | `undefined` | Callback when image fails |

## Automatic Behaviors

### Lazy Loading (Requirement 1.6)

- **Non-priority images**: Automatically lazy loaded (loads when entering viewport)
- **Priority images**: Eagerly loaded (loads immediately)
- **Explicit control**: Use `loading` prop to override

### Format Optimization (Requirement 1.5)

Next.js automatically serves:
1. AVIF format (best compression) if browser supports it
2. WebP format (good compression) if browser supports it
3. Original format as fallback

### Responsive Sizing (Requirement 13.4)

Auto-generated sizes for fixed dimensions:
```
(max-width: 640px) 100vw, (max-width: 1024px) 50vw, {width}px
```

For fill layout:
```
100vw
```

### Error Handling (Requirement 16.4)

When an image fails to load:
- Displays a fallback placeholder with an icon
- Shows the alt text in the placeholder
- Maintains the specified dimensions
- Calls `onError` callback if provided

## Utility Functions

### generateBlurDataURL

Generates a simple gray blur placeholder for better loading experience. This function should be called on the server side (in Server Components):

```tsx
import { generateBlurDataURL } from "@/lib/image-utils";

// In a Server Component
const blurDataURL = generateBlurDataURL(800, 600);
// Returns: "data:image/svg+xml;base64,..."
```

**Note:** This function uses Node.js `Buffer` API and must be called on the server side. Import it from `@/lib/image-utils`, not from the component file.

## Examples

### Hero Image (Above the Fold)

```tsx
<OptimizedImage
  src="/images/hero.jpg"
  alt="Welcome to our platform"
  width={1920}
  height={1080}
  priority
  quality={90}
  className="w-full h-auto"
/>
```

### Product Gallery

```tsx
<div className="grid grid-cols-3 gap-4">
  {products.map((product) => (
    <OptimizedImage
      key={product.id}
      src={product.image}
      alt={product.name}
      width={400}
      height={400}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
    />
  ))}
</div>
```

### Background Image

```tsx
<section className="relative h-screen">
  <OptimizedImage
    src="/images/background.jpg"
    alt=""
    width={1920}
    height={1080}
    fill
    objectFit="cover"
    priority
    className="z-0"
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### Avatar with Fallback

```tsx
<div className="relative w-24 h-24 rounded-full overflow-hidden">
  <OptimizedImage
    src={user.avatar}
    alt={user.name}
    width={96}
    height={96}
    fill
    objectFit="cover"
    onError={() => console.log("Avatar failed to load")}
  />
</div>
```

## Performance Considerations

1. **Use `priority` for above-the-fold images** to ensure fast LCP
2. **Avoid `priority` for below-the-fold images** to reduce initial load
3. **Provide accurate dimensions** to prevent layout shift (CLS)
4. **Use appropriate quality** (85 is a good default, 90+ for hero images)
5. **Customize sizes** for better responsive performance

## Accessibility

- Always provide descriptive `alt` text
- Use empty `alt=""` for decorative images
- Fallback placeholder includes ARIA labels
- Supports keyboard navigation and screen readers

## Browser Support

- Modern browsers: Full support (AVIF, WebP)
- Older browsers: Automatic fallback to original format
- Next.js handles format detection automatically

## Related Components

- `CTAButton` - Call-to-action buttons
- `StickyCTA` - Sticky call-to-action component
- `SEO` - SEO meta tags component

## Requirements Satisfied

- ✅ **1.5**: WebP/AVIF format support with fallbacks
- ✅ **1.6**: Lazy loading for below-fold images
- ✅ **13.4**: Responsive srcset and sizes configuration
- ✅ **16.4**: Error handling with fallback placeholders
