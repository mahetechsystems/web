# Animation Utilities

This module provides animation utilities and variants for Framer Motion, implementing subtle animations that enhance the user experience while respecting accessibility preferences and performance requirements.

## Features

- **Viewport-triggered animations**: Elements animate when they enter the viewport
- **Reduced motion support**: Respects `prefers-reduced-motion` user preference
- **Performance optimized**: Animations designed to not impact CLS scores
- **Reusable variants**: Pre-configured animation variants for common patterns
- **Customizable**: Utility functions to create custom animations

## Requirements Validation

- **Requirement 10.1**: Subtle fade-in and slide-in animations when elements enter viewport
- **Requirement 10.3**: Respects user's prefers-reduced-motion setting
- **Requirement 10.5**: Animations don't negatively impact CLS scores

## Basic Usage

### Simple Fade In Animation

```tsx
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function MyComponent() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <h2>This fades in when scrolled into view</h2>
    </motion.div>
  );
}
```

### Using Viewport Animation Helper

```tsx
import { motion } from "framer-motion";
import { getViewportAnimation, fadeInUp } from "@/lib/animations";

export function MyComponent() {
  return (
    <motion.div {...getViewportAnimation(fadeInUp)}>
      <h2>This fades in and slides up when scrolled into view</h2>
    </motion.div>
  );
}
```

### Accessible Animation (with Reduced Motion Support)

```tsx
import { motion } from "framer-motion";
import { getAccessibleAnimation, fadeInUp } from "@/lib/animations";

export function MyComponent() {
  return (
    <motion.div {...getAccessibleAnimation(fadeInUp)}>
      <h2>This respects prefers-reduced-motion</h2>
    </motion.div>
  );
}
```

## Available Animation Variants

### Fade Animations

- **`fadeIn`**: Simple opacity fade
- **`fadeInUp`**: Fade with upward movement (20px)
- **`fadeInDown`**: Fade with downward movement (20px)

### Slide Animations

- **`slideInLeft`**: Slide from left with fade (30px)
- **`slideInRight`**: Slide from right with fade (30px)

### Scale Animations

- **`scaleIn`**: Subtle scale up with fade (0.95 to 1.0)

### Stagger Animations

- **`staggerContainer`**: Container for staggered children
- **`staggerItem`**: Individual items in stagger group

Example:

```tsx
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function MyList() {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={staggerItem}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Hover Animations

- **`hoverScale`**: Subtle scale on hover (1.0 to 1.05)
- **`hoverLift`**: Upward movement on hover (4px)
- **`tapScale`**: Scale down on tap/click (0.98)

Example:

```tsx
import { motion } from "framer-motion";
import { hoverScale, tapScale } from "@/lib/animations";

export function MyButton() {
  return (
    <motion.button
      variants={hoverScale}
      initial="rest"
      whileHover="hover"
      whileTap={tapScale}
    >
      Click me
    </motion.button>
  );
}
```

### Page Transitions

- **`pageTransition`**: Smooth page transition with fade

## Utility Functions

### `getViewportAnimation(variant, once, amount)`

Returns props to spread on a motion component for viewport-triggered animations.

**Parameters:**

- `variant` (Variants): Animation variant to use (default: `fadeInUp`)
- `once` (boolean): Animate only once (default: `true`)
- `amount` (number): Visibility threshold 0-1 (default: `0.3`)

**Returns:** Object with `initial`, `whileInView`, `viewport`, and `variants` props

### `getAccessibleAnimation(variant)`

Returns animation props that respect `prefers-reduced-motion` setting.

**Parameters:**

- `variant` (Variants): Animation variant to use (default: `fadeInUp`)

**Returns:** Object with animation props (disabled if reduced motion preferred)

### `prefersReducedMotion()`

Checks if user prefers reduced motion.

**Returns:** `boolean` - `true` if reduced motion is preferred

### `createStaggerContainer(staggerDelay, delayChildren)`

Creates a custom stagger container variant.

**Parameters:**

- `staggerDelay` (number): Delay between each child (default: `0.1`)
- `delayChildren` (number): Initial delay (default: `0`)

**Returns:** Variants object for stagger container

### `createFadeAnimation(distance, direction)`

Creates a custom fade animation with configurable distance and direction.

**Parameters:**

- `distance` (number): Distance to move in pixels (default: `20`)
- `direction` ('up' | 'down' | 'left' | 'right'): Direction to move (default: `'up'`)

**Returns:** Variants object for fade animation

## Custom Animations

### Creating Custom Fade Distance

```tsx
import { motion } from "framer-motion";
import { createFadeAnimation } from "@/lib/animations";

const customFade = createFadeAnimation(40, "up"); // 40px upward movement

export function MyComponent() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={customFade}
    >
      <h2>Custom fade animation</h2>
    </motion.div>
  );
}
```

### Creating Custom Stagger Timing

```tsx
import { motion } from "framer-motion";
import { createStaggerContainer, staggerItem } from "@/lib/animations";

const customStagger = createStaggerContainer(0.2, 0.1); // 0.2s between items, 0.1s initial delay

export function MyList() {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={customStagger}
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={staggerItem}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## Best Practices

### 1. Use Viewport Animations for Below-the-Fold Content

```tsx
// Good: Animates when scrolled into view
<motion.div {...getViewportAnimation(fadeInUp)}>
  <Content />
</motion.div>

// Avoid: Animating above-the-fold content (impacts FCP)
<motion.div initial="hidden" animate="visible" variants={fadeIn}>
  <HeroSection />
</motion.div>
```

### 2. Always Respect Reduced Motion

```tsx
// Good: Uses accessible animation helper
<motion.div {...getAccessibleAnimation(fadeInUp)}>
  <Content />
</motion.div>

// Or check manually
const shouldAnimate = !prefersReducedMotion();
```

### 3. Use `once: true` for Performance

```tsx
// Good: Animates once, better performance
<motion.div {...getViewportAnimation(fadeInUp, true)}>
  <Content />
</motion.div>

// Avoid: Re-animates every time (unless needed)
<motion.div {...getViewportAnimation(fadeInUp, false)}>
  <Content />
</motion.div>
```

### 4. Avoid Layout Shifts

```tsx
// Good: Only animates opacity and transform (no layout shift)
<motion.div variants={fadeInUp}>
  <Content />
</motion.div>

// Avoid: Animating width/height causes layout shifts
<motion.div
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
>
  <Content />
</motion.div>
```

### 5. Use Stagger for Lists

```tsx
// Good: Smooth stagger effect
<motion.ul variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

## Performance Considerations

1. **Transform and Opacity Only**: All animations use `transform` and `opacity` properties which are GPU-accelerated and don't cause layout recalculations.

2. **Spring Physics**: Default transitions use spring physics for natural motion without complex easing calculations.

3. **Viewport Detection**: Uses Intersection Observer API (via Framer Motion) for efficient viewport detection.

4. **Once Animation**: Default behavior is to animate once to reduce unnecessary re-renders.

5. **Reduced Motion**: Automatically disables animations for users who prefer reduced motion.

## Testing

When testing components with animations:

```tsx
import { render } from "@testing-library/react";
import { prefersReducedMotion } from "@/lib/animations";

// Mock reduced motion preference
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test("respects reduced motion", () => {
  expect(prefersReducedMotion()).toBe(true);
});
```

## Related Documentation

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations Performance](https://web.dev/animations/)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
