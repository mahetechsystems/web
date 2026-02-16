# Sanity CMS Setup

This directory contains the Sanity Studio configuration for the Mahe Tech Systems website.

## Initial Setup

### 1. Create a Sanity Project

If you haven't already created a Sanity project, you have two options:

**Option A: Using the Sanity CLI (Recommended)**

```bash
npm run sanity:init
```

This will guide you through:
- Creating a new Sanity project
- Setting up a dataset (use "production" as the name)
- Configuring authentication

**Option B: Using the Sanity Dashboard**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create project"
3. Name your project "Mahe Tech Systems"
4. Create a dataset named "production"

### 2. Configure Environment Variables

After creating your project, add the following to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

To get your API token:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Editor" permissions
5. Copy the token to your `.env.local` file

### 3. Configure CORS

To allow your Next.js app to access the Sanity API:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add the following origins:
   - `http://localhost:3000` (for local development)
   - `https://your-production-domain.com` (for production)
5. Check "Allow credentials"

### 4. Access the Studio

Once configured, you can access the Sanity Studio at:

**Local Development:**
```
http://localhost:3000/studio
```

**Production:**
```
https://your-domain.com/studio
```

## Managing Your Sanity Project

### View Project Dashboard
```bash
npm run sanity:manage
```

This opens your project dashboard in the browser where you can:
- Manage API tokens
- Configure CORS
- View usage statistics
- Manage team members

### Deploy Studio (Optional)

If you want to deploy the Studio separately from your Next.js app:

```bash
npm run sanity:deploy
```

This creates a standalone Studio at `https://your-project.sanity.studio`

## Project Structure

```
sanity/
├── schemas/           # Content schemas (to be added in task 6.2)
│   └── index.ts      # Schema exports
├── sanity.config.ts  # Studio configuration
├── sanity.cli.ts     # CLI configuration
└── README.md         # This file
```

## Next Steps

- **Task 6.2**: Create Sanity schemas for blog posts and case studies
- **Task 6.3**: Implement GROQ queries for fetching content
- **Task 7.x**: Build blog pages that consume Sanity content
- **Task 8.x**: Build case study pages that consume Sanity content

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js Integration](https://www.sanity.io/docs/nextjs)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)
