# Hover States and Transitions

This document describes the hover states and transitions implemented across the Mahe Tech Systems website, ensuring consistent interactive feedback for all user interactions.

## Overview

All interactive elements on the website implement smooth hover states and transitions to provide visual feedback and enhance user experience. The implementation follows these principles:

1. **Consistency**: All similar elements use consistent hover effects
2. **Performance**: Transitions are optimized to avoid layout shifts and maintain 60fps
3. **Accessibility**: Respects `prefers-reduced-motion` setting
4. **Mobile-friendly**: Includes touch feedback with active states
5. **Smooth transitions**: All transitions use consistent timing functions

## Transition Standards

### Duration
- **Fast**: 150ms - For subtle changes (color, opacity)
- **Base**: 200ms - For most interactions (default)
- **Slow**: 300ms - For complex animations (transform + multiple properties)

### Timing Function
- Default: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- Defined in `globals.css` as CSS variables:
  - `--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)`
  - `--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)`
  - `--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)`

## Component Hover States

### Buttons (CTAButton)

**Hover Effects:**
- Opacity reduction to 90% for primary and secondary variants
- Background color change for outline variant (fills with primary color)
- Shadow enhancement on StickyCTA

**Active State:**
- Scale down to 95% (`active:scale-95`)

**Transition:**
- Duration: 200ms
- Properties: `all` (opacity, background, transform)

**Implementation:**
```tsx
className="transition-all duration-200 hover:opacity-90 active:scale-95"
```

### Links

#### Navigation Links
**Hover Effects:**
- Background color change to light gray
- Text color change to primary dark
- Active page has primary dark background with white text

**Transition:**
- Duration: 200ms
- Properties: `colors`

**Implementation:**
```tsx
className="transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-primary-dark)]"
```

#### Footer Links
**Hover Effects:**
- Text color change to white
- Underline appears

**Transition:**
- Duration: 200ms
- Properties: `colors`

**Implementation:**
```tsx
className="transition-colors hover:text-white hover:underline"
```

#### Outbound Links
**Hover Effects:**
- Text color change to secondary blue
- Focus ring on keyboard navigation

**Transition:**
- Duration: 200ms
- Properties: `colors`

**Implementation:**
```tsx
className="transition-colors duration-200 hover:text-[var(--color-secondary-blue)]"
```

### Cards

#### Service Cards
**Hover Effects:**
- Border color change to secondary blue
- Shadow enhancement (from `shadow-sm` to `shadow-lg`)

**Transition:**
- Duration: 200ms
- Properties: `all`

**Implementation:**
```tsx
className="transition-all duration-200 hover:border-[var(--color-secondary-blue)] hover:shadow-lg"
```

#### Problem Cards
**Hover Effects:**
- Border color change to secondary blue
- Shadow enhancement
- Slight upward movement (-4px translate)
- Icon scale increase (110%)
- Title color change to primary dark

**Active State:**
- Scale down to 98% (`active:scale-[0.98]`)

**Transition:**
- Duration: 700ms for entrance animation
- Duration: 300ms for hover effects

**Implementation:**
```tsx
className="group transition-all duration-700 hover:border-[var(--color-secondary-blue)] hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
```

#### Execution Blocks
**Hover Effects:**
- Border color change to secondary blue
- Shadow enhancement
- Title color change to primary dark
- Icon color change to accent blue

**Transition:**
- Duration: 700ms for entrance animation
- Duration: 300ms for hover effects

**Implementation:**
```tsx
className="group transition-all duration-700 hover:border-[var(--color-secondary-blue)] hover:shadow-lg"
```

#### Case Example Cards
**Hover Effects:**
- Shadow enhancement (from `shadow-md` to `shadow-xl`)
- Image scale increase (105%)
- Title color change to primary dark
- Arrow icon translation (moves right)

**Transition:**
- Duration: 300ms
- Properties: `all`

**Implementation:**
```tsx
className="group transition-all duration-300 hover:shadow-xl"
```

### Form Inputs

#### Text Inputs & Textareas
**Hover Effects:**
- Border color change to secondary blue

**Focus Effects:**
- Border color change to secondary blue
- Ring appears (2px, secondary blue)

**Transition:**
- Duration: 200ms
- Properties: `all`

**Implementation:**
```tsx
className="transition-all duration-200 hover:border-[var(--color-secondary-blue)] focus:border-[var(--color-secondary-blue)] focus:ring-2 focus:ring-[var(--color-secondary-blue)]"
```

#### Checkboxes
**Hover Effects:**
- Border color change to secondary blue

**Focus Effects:**
- Ring appears (2px, secondary blue with offset)

**Transition:**
- Duration: 200ms
- Properties: `all`

**Implementation:**
```tsx
className="transition-all duration-200 hover:border-[var(--color-secondary-blue)] focus:ring-2 focus:ring-[var(--color-secondary-blue)] focus:ring-offset-2"
```

#### Submit Buttons
**Hover Effects:**
- Shadow enhancement
- Scale increase to 102%

**Active State:**
- Scale down to 98%

**Disabled State:**
- No scale change on hover

**Transition:**
- Duration: 200ms
- Properties: `all`

**Implementation:**
```tsx
className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
```

### Social Media Icons (Footer)
**Hover Effects:**
- Background opacity increase (from 10% to 20%)

**Transition:**
- Duration: 200ms
- Properties: `colors`

**Implementation:**
```tsx
className="transition-colors hover:bg-white/20"
```

## Mobile Touch Feedback

All interactive elements include active states for touch feedback on mobile devices:

### Buttons
- Scale down to 95% on press: `active:scale-95`

### Cards
- Scale down to 98% on press: `active:scale-[0.98]`

### Form Submit Button
- Scale down to 98% on press: `active:scale-[0.98]`

## Accessibility Considerations

### Reduced Motion Support
All animations and transitions respect the user's `prefers-reduced-motion` setting through the global CSS rule in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Focus Indicators
All interactive elements include visible focus indicators for keyboard navigation:
- Focus ring: 2px solid, using component's primary color
- Focus ring offset: 2px (where appropriate)
- Outline removed in favor of ring for better visual consistency

## Performance Optimization

### GPU Acceleration
Transform properties (`scale`, `translate`) are used for animations as they are GPU-accelerated and don't trigger layout recalculation.

### Will-Change Property
Not used by default to avoid memory overhead. Only applied when necessary for complex animations.

### Layout Shift Prevention
- Fixed positioning used for StickyCTA to prevent CLS
- Transform used instead of margin/padding for movement
- Opacity used for fade effects instead of display changes

## Testing Hover States

### Manual Testing Checklist
- [ ] All buttons show hover feedback
- [ ] All links show hover feedback
- [ ] All cards show hover feedback
- [ ] Form inputs show hover and focus feedback
- [ ] Touch feedback works on mobile (active states)
- [ ] Transitions are smooth (no jank)
- [ ] Reduced motion setting is respected
- [ ] Focus indicators are visible for keyboard navigation

### Automated Testing
Hover states are tested in component unit tests using `@testing-library/react` and `@testing-library/user-event`:

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("button shows hover state", async () => {
  const user = userEvent.setup();
  render(<CTAButton>Click me</CTAButton>);
  
  const button = screen.getByRole("button");
  await user.hover(button);
  
  // Assert hover styles are applied
  expect(button).toHaveClass("hover:opacity-90");
});
```

## Requirements Validation

This implementation validates **Requirement 10.2**:
> WHEN a user hovers over interactive elements, THE Website SHALL provide visual feedback

All interactive elements now provide clear visual feedback through:
- Color changes
- Shadow enhancements
- Scale transformations
- Border color changes
- Icon animations

The implementation ensures a consistent, performant, and accessible user experience across all devices and user preferences.
