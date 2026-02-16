# Layout Components

This directory contains layout components that are used across the entire website.

## Navigation Component

The Navigation component provides a responsive header with navigation links for all pages.

### Features

- **Responsive Design**: Desktop horizontal menu and mobile hamburger menu
- **Active Link Highlighting**: Current page is highlighted with primary color
- **Mobile Menu Animation**: Smooth hamburger icon animation
- **Keyboard Navigation**: Full keyboard accessibility support
- **Sticky Header**: Navigation stays at the top of the viewport
- **ARIA Attributes**: Proper accessibility attributes for screen readers

### Usage

```tsx
import { Navigation } from "@/components/layout";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

### Navigation Items

The component includes links to all main pages:

- Home (/)
- About (/about)
- Services (/services)
- Case Studies (/case-studies)
- Blog (/blog)
- Contact (/contact)

### Accessibility Features

- **Keyboard Navigation**: All links and buttons are keyboard accessible
- **ARIA Labels**: Proper labels for screen readers
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Screen Reader Text**: Hidden text for icon-only buttons
- **Semantic HTML**: Uses `<nav>` element with proper role

### Mobile Behavior

- Hamburger menu button appears on screens < 768px (md breakpoint)
- Menu slides in with smooth animation
- Body scroll is prevented when menu is open
- Menu closes automatically when navigating to a new page

### Styling

The component uses Tailwind CSS with design system tokens:

- Primary Dark color for active links
- Background color for hover states
- Smooth transitions for all interactive elements
- Shadow for depth

### Testing

Unit tests are included in `Navigation.test.tsx`:

- Renders all navigation items
- Highlights active link correctly
- Mobile menu toggle functionality
- Keyboard accessibility
- ARIA attributes

Run tests with:

```bash
npm test
```

### Requirements Validated

This component satisfies the following requirements:

- **2.7**: Consistent navigation across all pages ✓
- **2.8**: Responsive navigation menu ✓
- **2.9**: Mobile-optimized navigation experience ✓
- **15.2**: Keyboard navigation support ✓

### Future Enhancements

- Add dropdown menus for nested navigation
- Add search functionality
- Add language switcher
- Add theme toggle (dark mode)
