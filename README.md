# Mahe Tech Systems Website

A high-performance, SEO-optimized portfolio and authority showcase website built with Next.js 14, TypeScript, and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Testing**: Vitest
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mahetechsystems/web.git
cd web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Site Configuration
SITE_URL=http://localhost:3000

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com

# Calendly
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Run Sanity Studio (Optional)

```bash
npm run sanity
```

Access the CMS at [http://localhost:3000/studio](http://localhost:3000/studio)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run sanity` - Start Sanity Studio
- `npm run validate-schemas` - Validate structured data

## Project Structure

```
├── src/
│   ├── app/              # Next.js pages and routes
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   └── types/            # TypeScript type definitions
├── sanity/               # Sanity CMS schemas and configuration
├── public/               # Static assets
└── scripts/              # Build and utility scripts
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m "feat: add your feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Commit Convention

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier)
- Write tests for new features
- Ensure all tests pass before submitting PR
- Keep components small and focused

### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Request review from maintainers
4. Address review feedback
5. Squash commits if requested

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the `main` branch.

## License

All rights reserved - Mahe Tech Systems

## Support

For questions or issues, please open an issue on GitHub or contact us at contact@mahetechsystems.com
