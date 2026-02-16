# Sanity CMS Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Initialize Sanity Project
```bash
npm run sanity:init
```

### 2. Add Environment Variables
Copy your project ID and create an API token, then add to `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
```

### 3. Configure CORS
Go to https://www.sanity.io/manage → Your Project → API → CORS Origins

Add: `http://localhost:3000` ✓ Allow credentials

### 4. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000/studio

## 📝 Key Files

| File | Purpose |
|------|---------|
| `sanity/sanity.config.ts` | Studio configuration |
| `src/lib/sanity/client.ts` | API client setup |
| `src/lib/sanity/queries.ts` | Content queries |
| `src/types/sanity.ts` | TypeScript types |
| `src/app/studio/[[...tool]]/page.tsx` | Studio route |

## 🔗 Useful Commands

```bash
npm run sanity:init      # Create new project
npm run sanity:manage    # Open dashboard
npm run sanity:deploy    # Deploy Studio
```

## 📚 Next Steps

1. ✅ Task 6.1 Complete - Sanity setup
2. ⏭️ Task 6.2 - Create content schemas
3. ⏭️ Task 6.3 - Implement GROQ queries

## 🆘 Need Help?

See `sanity/README.md` for detailed instructions or visit https://www.sanity.io/docs
