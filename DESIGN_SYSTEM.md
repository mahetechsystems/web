# Mahe Tech Systems - Design System Configuration

## Overview

This document describes the Tailwind CSS v4 design system configuration for the Mahe Tech Systems website. The design system implements a mobile-first approach with custom brand colors, typography, and responsive breakpoints.

## Technology Stack

- **Tailwind CSS**: v4 (CSS-based configuration using `@theme` directive)
- **Fonts**: Inter (primary), DM Sans (alternative)
- **Framework**: Next.js 14 with App Router

## Brand Colors

The color palette is defined in `src/app/globals.css` using CSS custom properties:

### Primary Colors

- **Primary Dark**: `#1F3A5F` - Used for primary elements, headings, and brand identity
- **Secondary Blue**: `#5F8FB4` - Used for secondary elements and accents
- **Background**: `#F8FAFC` - Light gray background for pages
- **Text**: `#111827` - Dark gray for body text
- **White**: `#FFFFFF` - Pure white for contrast

### Accent Colors

- **Accent Blue**: `#5F8FB4` - Gradient start color
- **Accent Light**: `#A8C5E0` - Gradient end color

### Usage in Code

```tsx
// Using CSS variables
<div className="bg-[var(--color-primary-dark)]">
<h1 className="text-[var(--color-text)]">
```

## Typography

### Font Families

**Inter** - Primary font for headings and body text

- Variable: `--font-inter`
- Usage: Headings, body text, UI elements
- Loaded via Google Fonts with `display: swap`

**DM Sans** - Alternative font for variety

- Variable: `--font-dm-sans`
- Usage: Alternative body text, special sections
- Loaded via Google Fonts with `display: swap`

### Font Sizes (Mobile-First)

| Size | Value    | Pixels | Usage                  |
| ---- | -------- | ------ | ---------------------- |
| xs   | 0.75rem  | 12px   | Small labels, captions |
| sm   | 0.875rem | 14px   | Secondary text         |
| base | 1rem     | 16px   | Body text              |
| lg   | 1.125rem | 18px   | Large body text        |
| xl   | 1.25rem  | 20px   | Small headings         |
| 2xl  | 1.5rem   | 24px   | Subheadings            |
| 3xl  | 1.875rem | 30px   | Section headings       |
| 4xl  | 2.25rem  | 36px   | Page headings          |
| 5xl  | 3rem     | 48px   | Hero headings          |
| 6xl  | 3.75rem  | 60px   | Large hero headings    |

### Usage in Code

```tsx
<h1 className="text-5xl font-bold">Hero Heading</h1>
<p className="text-lg">Body text</p>
```

## Responsive Breakpoints

Mobile-first breakpoints defined in the design system:

| Breakpoint | Value  | Description    |
| ---------- | ------ | -------------- |
| sm         | 640px  | Small tablets  |
| md         | 768px  | Tablets        |
| lg         | 1024px | Small desktops |
| xl         | 1280px | Desktops       |
| 2xl        | 1536px | Large desktops |

### Usage in Code

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## Spacing Scale

Consistent spacing using a scale from 1-24:

| Token      | Value   | Pixels |
| ---------- | ------- | ------ |
| spacing-1  | 0.25rem | 4px    |
| spacing-2  | 0.5rem  | 8px    |
| spacing-3  | 0.75rem | 12px   |
| spacing-4  | 1rem    | 16px   |
| spacing-6  | 1.5rem  | 24px   |
| spacing-8  | 2rem    | 32px   |
| spacing-12 | 3rem    | 48px   |
| spacing-16 | 4rem    | 64px   |
| spacing-24 | 6rem    | 96px   |

## Border Radius

| Token       | Value   | Pixels        |
| ----------- | ------- | ------------- |
| radius-sm   | 0.25rem | 4px           |
| radius-md   | 0.5rem  | 8px           |
| radius-lg   | 0.75rem | 12px          |
| radius-xl   | 1rem    | 16px          |
| radius-2xl  | 1.5rem  | 24px          |
| radius-full | 9999px  | Fully rounded |

## Shadows

Pre-defined shadow utilities for depth and elevation:

- **shadow-sm**: Subtle shadow for cards
- **shadow-md**: Medium shadow for elevated elements
- **shadow-lg**: Large shadow for modals
- **shadow-xl**: Extra large shadow for prominent elements

## Transitions

Consistent animation timing:

- **transition-fast**: 150ms - Quick interactions
- **transition-base**: 200ms - Standard transitions
- **transition-slow**: 300ms - Smooth, noticeable transitions

All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` easing.

## Base Styles & CSS Reset

The design system includes a comprehensive CSS reset in `src/app/globals.css`:

- Box-sizing reset for all elements
- Smooth scrolling behavior
- Optimized font rendering (antialiasing)
- Responsive image defaults
- Form element normalization
- Accessibility support for reduced motion preference

### Reduced Motion Support

The design system respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled or minimized */
}
```

## File Structure

```
src/
├── app/
│   ├── globals.css          # Design system configuration
│   ├── layout.tsx           # Font loading and root layout
│   └── page.tsx             # Test page showcasing design system
```

## Configuration Files

### globals.css

Contains the complete design system configuration using Tailwind CSS v4's `@theme` directive:

- Color palette
- Typography scale
- Spacing system
- Border radius
- Shadows
- Transitions
- Breakpoints
- CSS reset and base styles

### layout.tsx

Loads Google Fonts and applies them globally:

- Inter font (primary)
- DM Sans font (alternative)
- Font display optimization with `swap`

## Testing the Design System

A test page is available at the root route (`/`) that showcases:

- Color palette with all brand colors
- Typography hierarchy (H1-H4, body text)
- Button styles (primary, secondary, outline)
- Responsive grid layout
- Mobile-first breakpoint behavior

To view the test page:

```bash
npm run dev
# Visit http://localhost:3000
```

## Requirements Validated

This configuration satisfies the following requirements from the spec:

- **9.1**: Primary Dark color (#1F3A5F) ✓
- **9.2**: Secondary Blue color (#5F8FB4) ✓
- **9.3**: Accent Gradient (Blue to Light Blue) ✓
- **9.4**: Background color (#F8FAFC) ✓
- **9.5**: Text color (#111827) ✓
- **9.6**: Heading fonts (Inter) ✓
- **9.7**: Body fonts (Inter, DM Sans) ✓
- **13.1**: Mobile-first responsive design ✓

## Next Steps

With the design system configured, you can now:

1. Create reusable UI components (buttons, cards, forms)
2. Build page layouts using the design tokens
3. Implement responsive designs with confidence
4. Maintain visual consistency across the entire website

## Usage Examples

### Creating a Primary Button

```tsx
<button className="rounded-lg bg-[var(--color-primary-dark)] px-6 py-3 text-white transition-opacity hover:opacity-90">
  Click Me
</button>
```

### Creating a Responsive Card Grid

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h3 className="mb-2 text-xl font-bold">Card Title</h3>
    <p className="text-gray-600">Card content</p>
  </div>
</div>
```

### Using the Accent Gradient

```tsx
<div className="bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-light)]">
  Gradient Background
</div>
```

## Notes

- Tailwind CSS v4 uses CSS-based configuration instead of JavaScript config files
- The `@theme` directive may show warnings in some editors but works correctly
- All design tokens are accessible via CSS custom properties
- Font loading is optimized with `display: swap` for better performance
