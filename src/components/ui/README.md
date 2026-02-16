# UI Components

This directory contains reusable UI components for the Mahe Tech Systems website.

## CTAButton Component

A versatile call-to-action button component with multiple variants, sizes, and built-in analytics tracking.

### Features

- **Three Variants**: primary, secondary, outline
- **Three Sizes**: sm, md, lg
- **Touch-Friendly**: Minimum 44x44px touch targets (WCAG compliant)
- **Hover States**: Smooth opacity and scale animations
- **Analytics Tracking**: Built-in Google Analytics event tracking
- **Accessibility**: Focus indicators, keyboard navigation, ARIA attributes
- **Flexible**: Can render as button or link

### Usage

```tsx
import { CTAButton } from "@/components/ui";

// Primary button with link
<CTAButton variant="primary" size="md" href="/contact">
  Contact Us
</CTAButton>

// Secondary button with icon
<CTAButton variant="secondary" size="lg" href="/services" icon="→">
  View Services
</CTAButton>

// Outline button with analytics tracking
<CTAButton
  variant="outline"
  size="sm"
  href="/blog"
  trackingEvent="blog_cta_click"
>
  Read More
</CTAButton>

// Button with custom onClick handler
<CTAButton
  variant="primary"
  size="md"
  href=""
  onClick={() => console.log("Clicked!")}
>
  Custom Action
</CTAButton>

// Full width button
<CTAButton variant="primary" size="md" href="/signup" fullWidth>
  Get Started
</CTAButton>

// Disabled button
<CTAButton variant="primary" size="md" href="" disabled>
  Coming Soon
</CTAButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content (required) |
| `href` | `string` | - | Link destination (required) |
| `variant` | `"primary" \| "secondary" \| "outline"` | `"primary"` | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `icon` | `string` | - | Optional icon to display after text |
| `onClick` | `() => void` | - | Custom click handler |
| `trackingEvent` | `string` | - | Google Analytics event name |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the button |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Button type (when not a link) |
| `fullWidth` | `boolean` | `false` | Make button full width |

### Variants

#### Primary
- Background: Primary Dark (#1F3A5F)
- Text: White
- Use for: Main CTAs, primary actions

#### Secondary
- Background: Secondary Blue (#5F8FB4)
- Text: White
- Use for: Secondary actions, alternative CTAs

#### Outline
- Border: Primary Dark (#1F3A5F)
- Text: Primary Dark
- Hover: Filled with Primary Dark
- Use for: Tertiary actions, less prominent CTAs

### Sizes

All sizes meet WCAG touch target requirements (minimum 44x44px):

- **Small (sm)**: 44px height, smaller padding
- **Medium (md)**: 44px height, standard padding
- **Large (lg)**: 48px height, larger padding

### Analytics Tracking

The component automatically fires Google Analytics events when `trackingEvent` is provided:

```tsx
<CTAButton
  variant="primary"
  size="md"
  href="/contact"
  trackingEvent="contact_cta_click"
>
  Contact Us
</CTAButton>
```

Event structure:
```javascript
gtag('event', 'contact_cta_click', {
  event_category: 'CTA',
  event_label: 'Contact Us'
});
```

### Accessibility

The component includes:
- Focus ring indicators with proper contrast
- Keyboard navigation support
- ARIA attributes for disabled state
- ARIA-hidden for decorative icons
- Minimum touch target sizes (44x44px)

### Requirements Satisfied

- **3.6**: Prominent CTAs on home page
- **10.2**: Hover states and visual feedback
- **13.2**: Touch-friendly sizing (44x44px minimum)

### Testing

Run tests with:
```bash
npm run test src/components/ui/CTAButton.test.tsx
```

The component has comprehensive test coverage including:
- Rendering variants and sizes
- Touch target sizing
- Hover states and animations
- Analytics tracking
- Accessibility features
- Disabled state
- Custom styling

---

## StickyCTA Component

A sticky call-to-action button that appears when users scroll past the hero section, providing a persistent conversion opportunity without being intrusive.

### Features

- **Scroll Detection**: Appears after scrolling past a configurable threshold (default: 600px)
- **Smooth Animations**: Fade-in and slide-up effects with opacity and transform transitions
- **No Layout Shift**: Uses fixed positioning to prevent CLS (Cumulative Layout Shift)
- **Accessibility**: Includes aria-hidden attribute, respects prefers-reduced-motion
- **Performance**: Passive scroll listeners for optimal performance
- **Analytics Tracking**: Built-in event tracking support
- **Responsive**: Adapts to mobile and desktop viewports
- **Customizable**: Supports all CTAButton variants, sizes, and options

### Usage

```tsx
import { StickyCTA } from "@/components/ui";

// Basic usage
<StickyCTA
  text="Get Started"
  href="/contact"
/>

// With custom threshold and tracking
<StickyCTA
  text="Schedule a Call"
  href="/contact"
  variant="primary"
  size="md"
  scrollThreshold={800}
  trackingEvent="home_sticky_cta_click"
/>

// With icon
<StickyCTA
  text="Book Now"
  href="/calendly"
  variant="secondary"
  size="lg"
  icon="→"
/>

// Custom styling
<StickyCTA
  text="Learn More"
  href="/about"
  variant="outline"
  className="custom-class"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Button text (required) |
| `href` | `string` | - | Link destination (required) |
| `variant` | `"primary" \| "secondary" \| "outline"` | `"primary"` | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `icon` | `string` | - | Optional icon to display |
| `trackingEvent` | `string` | `"sticky_cta_click"` | Analytics event name |
| `scrollThreshold` | `number` | `600` | Pixels from top before showing |
| `className` | `string` | - | Additional CSS classes |

### Behavior

1. **Initial State**: Hidden when page loads (opacity: 0)
2. **Scroll Detection**: Monitors scroll position using passive event listener
3. **Threshold Check**: Compares scroll position to threshold (default: 600px)
4. **Show Animation**: Fades in and slides up when threshold is exceeded
5. **Hide Animation**: Fades out and slides down when scrolling back above threshold
6. **Cleanup**: Removes event listener on component unmount

### Animations

The component uses CSS transitions for smooth animations:

- **Opacity**: 0 → 1 (fade-in)
- **Transform**: translateY(16px) → translateY(0) (slide-up)
- **Duration**: 300ms
- **Easing**: ease-in-out

Animations respect the user's `prefers-reduced-motion` setting for accessibility.

### Layout and Positioning

The component uses fixed positioning to prevent layout shift:

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 50;
```

A gradient background overlay ensures the button is always readable:

```css
background: linear-gradient(to top, white, white/95%, transparent);
```

### Accessibility

The component includes:
- `aria-hidden` attribute (true when hidden, false when visible)
- Respects `prefers-reduced-motion` setting
- Keyboard navigation support (inherited from CTAButton)
- Focus indicators (inherited from CTAButton)
- Semantic HTML structure

### Performance Considerations

- **Passive Scroll Listener**: Uses `{ passive: true }` for better scroll performance
- **No Layout Shift**: Always in DOM with fixed positioning (CLS score: 0)
- **Efficient Re-renders**: Only updates state when visibility changes
- **Cleanup**: Properly removes event listeners on unmount

### Requirements Satisfied

- **3.7**: Sticky CTA button appears after scrolling past hero
- **10.5**: Animations don't negatively impact CLS scores

### Testing

Run tests with:
```bash
npm run test src/components/ui/StickyCTA.test.tsx
```

The component has comprehensive test coverage including:
- Scroll threshold detection
- Visibility state changes
- Custom threshold values
- Fixed positioning for CLS prevention
- ARIA attributes
- Event listener cleanup
- Prefers-reduced-motion support
- Custom styling and props

### Demo

View the component in action:
```
/demo/sticky-cta
```

The demo page includes:
- Long scrollable content
- Hero section simulation
- Usage examples and documentation
- Customization options


---

## OptimizedImage Component

A production-ready wrapper around Next.js Image component that provides automatic format optimization, lazy loading, responsive sizing, and error handling with fallback placeholders.

### Features

- **Automatic Format Optimization**: WebP/AVIF format support with automatic fallbacks
- **Smart Lazy Loading**: Lazy loading for below-fold images, eager for priority images
- **Responsive Images**: Automatic srcset and sizes configuration
- **Error Handling**: Graceful fallback placeholders when images fail to load
- **Accessibility**: Proper alt text and ARIA labels
- **Loading States**: Smooth opacity transitions on load
- **Flexible Layouts**: Support for fixed dimensions and fill layouts

### Usage

```tsx
import { OptimizedImage } from "@/components/ui";

// Basic usage
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
/>

// Priority image (above the fold)
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  priority
/>

// Fill layout (responsive container)
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

// Custom responsive sizes
<OptimizedImage
  src="/images/product.jpg"
  alt="Product image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

// With blur placeholder
import { generateBlurDataURL } from "@/lib/image-utils";

const blurDataURL = generateBlurDataURL(800, 600);

<OptimizedImage
  src="/images/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>

// With callbacks
<OptimizedImage
  src="/images/avatar.jpg"
  alt="User avatar"
  width={200}
  height={200}
  onLoad={() => console.log("Image loaded")}
  onError={() => console.log("Image failed to load")}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL (required) |
| `alt` | `string` | - | Alternative text for accessibility (required) |
| `width` | `number` | - | Image width in pixels (required) |
| `height` | `number` | - | Image height in pixels (required) |
| `priority` | `boolean` | `false` | Load image eagerly (for above-fold images) |
| `quality` | `number` | `85` | Image quality (1-100) |
| `formats` | `("webp" \| "avif")[]` | `["avif", "webp"]` | Supported image formats |
| `sizes` | `string` | Auto-generated | Responsive sizes attribute |
| `loading` | `"lazy" \| "eager"` | Auto | Loading strategy (overrides priority) |
| `className` | `string` | - | Additional CSS classes |
| `fill` | `boolean` | `false` | Fill parent container |
| `objectFit` | `string` | `"cover"` | CSS object-fit value |
| `objectPosition` | `string` | `"center"` | CSS object-position value |
| `placeholder` | `"blur" \| "empty"` | `"empty"` | Placeholder type |
| `blurDataURL` | `string` | - | Base64 blur placeholder data |
| `onLoad` | `() => void` | - | Callback when image loads |
| `onError` | `() => void` | - | Callback when image fails |

### Automatic Behaviors

#### Lazy Loading (Requirement 1.6)

- **Non-priority images**: Automatically lazy loaded (loads when entering viewport)
- **Priority images**: Eagerly loaded (loads immediately)
- **Explicit control**: Use `loading` prop to override

#### Format Optimization (Requirement 1.5)

Next.js automatically serves:
1. AVIF format (best compression) if browser supports it
2. WebP format (good compression) if browser supports it
3. Original format as fallback

#### Responsive Sizing (Requirement 13.4)

Auto-generated sizes for fixed dimensions:
```
(max-width: 640px) 100vw, (max-width: 1024px) 50vw, {width}px
```

For fill layout:
```
100vw
```

#### Error Handling (Requirement 16.4)

When an image fails to load:
- Displays a fallback placeholder with an icon
- Shows the alt text in the placeholder
- Maintains the specified dimensions
- Calls `onError` callback if provided

### Utility Functions

#### generateBlurDataURL

Generates a simple gray blur placeholder for better loading experience. This function should be called on the server side (in Server Components):

```tsx
import { generateBlurDataURL } from "@/lib/image-utils";

// In a Server Component
const blurDataURL = generateBlurDataURL(800, 600);
// Returns: "data:image/svg+xml;base64,..."
```

**Note:** This function uses Node.js `Buffer` API and must be called on the server side. Import it from `@/lib/image-utils`, not from the component file.

### Examples

#### Hero Image (Above the Fold)

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

#### Product Gallery

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

#### Background Image

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

### Performance Considerations

1. **Use `priority` for above-the-fold images** to ensure fast LCP
2. **Avoid `priority` for below-the-fold images** to reduce initial load
3. **Provide accurate dimensions** to prevent layout shift (CLS)
4. **Use appropriate quality** (85 is a good default, 90+ for hero images)
5. **Customize sizes** for better responsive performance

### Accessibility

- Always provide descriptive `alt` text
- Use empty `alt=""` for decorative images
- Fallback placeholder includes ARIA labels
- Supports keyboard navigation and screen readers

### Browser Support

- Modern browsers: Full support (AVIF, WebP)
- Older browsers: Automatic fallback to original format
- Next.js handles format detection automatically

### Requirements Satisfied

- **1.5**: WebP/AVIF format support with fallbacks
- **1.6**: Lazy loading for below-fold images
- **13.4**: Responsive srcset and sizes configuration
- **16.4**: Error handling with fallback placeholders

### Testing

Run tests with:
```bash
npm run test src/components/ui/OptimizedImage.test.tsx
```

The component has comprehensive test coverage including:
- Rendering with various props
- Lazy loading behavior
- Format optimization
- Responsive sizing
- Error handling with fallbacks
- Loading states
- Quality and priority settings
- Placeholder support
- Object fit and position
- Accessibility features

### Demo

View the component in action:
```
/demo/optimized-image
```

The demo page includes:
- Priority images (above the fold)
- Lazy loaded images (below the fold)
- Responsive sizing examples
- Error handling demonstrations
- Blur placeholder examples
- Different object-fit options
- Performance features overview
