# Lib Directory

This directory contains utility functions, helpers, and configuration for the Mahe Tech Systems website.

## Files

- `constants.ts` - Site-wide constants and configuration
- `utils.ts` - Utility functions (formatting, validation, etc.)
- `analytics.ts` - Analytics tracking functions (to be added)
- `sanity.ts` - Sanity CMS client and queries (to be added)

## Usage

Import utilities as needed:

```typescript
import { cn, formatDate, slugify } from "@/lib/utils";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
```

## Guidelines

1. Keep functions pure and testable
2. Add JSDoc comments for complex functions
3. Export functions individually for tree-shaking
4. Use TypeScript for type safety
