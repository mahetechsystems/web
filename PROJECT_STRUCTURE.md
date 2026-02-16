# Mahe Tech Systems Website - Project Structure

This document outlines the directory structure and organization of the Mahe Tech Systems website.

## Directory Structure

```
mahe-tech-website/
├── .kiro/                      # Kiro specs and configuration
│   └── specs/
│       └── mahe-tech-website/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── public/                     # Static assets
│   ├── images/
│   └── fonts/
├── src/                        # Source code
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── about/              # About page
│   │   ├── services/           # Services page
│   │   ├── case-studies/       # Case studies pages
│   │   ├── blog/               # Blog pages
│   │   └── contact/            # Contact page
│   ├── components/             # React components
│   │   ├── ui/                 # Basic UI components
│   │   ├── layout/             # Layout components
│   │   ├── sections/           # Page sections
│   │   ├── forms/              # Form components
│   │   └── seo/                # SEO components
│   ├── lib/                    # Utilities and helpers
│   │   ├── constants.ts        # Site constants
│   │   ├── utils.ts            # Utility functions
│   │   ├── analytics.ts        # Analytics tracking
│   │   └── sanity.ts           # CMS client
│   ├── types/                  # TypeScript types
│   │   └── index.ts            # Type definitions
│   └── styles/                 # Additional styles
│       └── README.md
├── .env.local                  # Environment variables (local)
├── .env.local.example          # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .prettierignore             # Prettier ignore rules
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Key Directories

### `/src/app`
Next.js 14 App Router pages. Each directory represents a route in the application.

### `/src/components`
Reusable React components organized by category:
- `ui/` - Basic UI elements (buttons, inputs, cards)
- `layout/` - Layout components (header, footer, navigation)
- `sections/` - Page sections (hero, features, testimonials)
- `forms/` - Form components (contact form, newsletter)
- `seo/` - SEO components (metadata, structured data)

### `/src/lib`
Utility functions, helpers, and configuration:
- `constants.ts` - Site-wide constants
- `utils.ts` - Utility functions
- `analytics.ts` - Analytics tracking (to be added)
- `sanity.ts` - Sanity CMS client (to be added)

### `/src/types`
TypeScript type definitions and interfaces used across the application.

### `/src/styles`
Additional CSS files and modules (global styles are in `src/app/globals.css`).

## Configuration Files

- `.env.local` - Environment variables for local development
- `.env.local.example` - Template for environment variables
- `eslint.config.mjs` - ESLint configuration for code quality
- `.prettierrc` - Prettier configuration for code formatting
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS design tokens
- `tsconfig.json` - TypeScript compiler options

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Development Workflow

1. Create components in `/src/components`
2. Add pages in `/src/app`
3. Define types in `/src/types`
4. Add utilities in `/src/lib`
5. Configure environment variables in `.env.local`
6. Run `npm run lint` and `npm run format` before committing

## Next Steps

- Implement shared components (Navigation, Footer, CTA, SEO)
- Create page layouts for all routes
- Integrate Sanity CMS
- Add analytics tracking
- Implement forms and validation
- Add animations with Framer Motion
