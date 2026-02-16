# Sanity CMS Setup Guide - Task 6.1 Complete

## What Was Done

Task 6.1 has been completed successfully. The following components have been set up:

### 1. Dependencies Installed
- `@sanity/client` - Client for fetching data from Sanity
- `@sanity/image-url` - Image URL builder for optimized images
- `next-sanity` - Next.js integration for Sanity
- `@sanity/cli` - CLI tools for managing Sanity projects
- `sanity` - Sanity Studio

### 2. Configuration Files Created

**Sanity Configuration:**
- `sanity/sanity.config.ts` - Studio configuration
- `sanity/sanity.cli.ts` - CLI configuration
- `sanity/schemas/index.ts` - Schema exports (placeholder for task 6.2)

**Next.js Integration:**
- `src/lib/sanity/client.ts` - Sanity client setup with image URL builder
- `src/lib/sanity/queries.ts` - GROQ query functions (placeholder for task 6.3)
- `src/types/sanity.ts` - TypeScript types for Sanity content
- `src/app/studio/[[...tool]]/page.tsx` - Embedded Studio route

**Documentation:**
- `sanity/README.md` - Detailed setup instructions

### 3. NPM Scripts Added
- `npm run sanity:init` - Initialize a new Sanity project
- `npm run sanity:manage` - Open project management dashboard
- `npm run sanity:deploy` - Deploy Studio separately (optional)

## What You Need to Do Next

### Step 1: Create a Sanity Project

Choose one of these methods:

**Method A: Using the CLI (Recommended)**
```bash
npm run sanity:init
```

Follow the prompts to:
1. Log in to Sanity (or create an account)
2. Create a new project named "Mahe Tech Systems"
3. Create a dataset named "production"
4. Confirm the configuration

**Method B: Using the Web Dashboard**
1. Go to https://www.sanity.io/manage
2. Click "Create project"
3. Name it "Mahe Tech Systems"
4. Create a dataset named "production"

### Step 2: Configure Environment Variables

After creating your project, update `.env.local` with your project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

**To get your Project ID:**
- It's shown after running `sanity:init`, or
- Find it at https://www.sanity.io/manage → Select your project → Settings

**To get your API Token:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to "API" → "Tokens"
4. Click "Add API token"
5. Name it "Next.js App"
6. Select "Editor" permissions
7. Copy the token to your `.env.local`

### Step 3: Configure CORS

Allow your Next.js app to access the Sanity API:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to "API" → "CORS Origins"
4. Click "Add CORS origin"
5. Add these origins:
   - `http://localhost:3000` (for development)
   - Your production domain when ready
6. Check "Allow credentials"
7. Save

### Step 4: Verify Setup

Once configured, start your development server:

```bash
npm run dev
```

Then visit:
```
http://localhost:3000/studio
```

You should see the Sanity Studio interface (it will be empty until schemas are added in task 6.2).

## Project Structure

```
mahe-tech-website/
├── sanity/                          # Sanity Studio configuration
│   ├── schemas/                     # Content schemas (task 6.2)
│   │   └── index.ts
│   ├── sanity.config.ts            # Studio config
│   ├── sanity.cli.ts               # CLI config
│   └── README.md                    # Setup instructions
├── src/
│   ├── app/
│   │   └── studio/[[...tool]]/     # Embedded Studio route
│   │       └── page.tsx
│   ├── lib/
│   │   └── sanity/                  # Sanity integration
│   │       ├── client.ts            # Client setup
│   │       └── queries.ts           # GROQ queries (task 6.3)
│   └── types/
│       └── sanity.ts                # TypeScript types
└── .env.local                       # Environment variables
```

## Next Tasks

- **Task 6.2**: Create Sanity schemas for blog posts, case studies, authors, and categories
- **Task 6.3**: Implement GROQ queries for fetching content with ISR
- **Task 7.x**: Build blog pages that consume Sanity content
- **Task 8.x**: Build case study pages that consume Sanity content

## Troubleshooting

### "Project ID not found" error
- Make sure you've added `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`
- Restart your dev server after adding environment variables

### "CORS error" when accessing Studio
- Verify you've added `http://localhost:3000` to CORS origins in Sanity dashboard
- Make sure "Allow credentials" is checked

### Studio shows blank page
- This is normal until schemas are added in task 6.2
- The Studio is working correctly if you see the Sanity interface

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/nextjs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Management Dashboard](https://www.sanity.io/manage)

---

**Status**: Task 6.1 Complete ✓
**Next**: Task 6.2 - Create Sanity schemas
