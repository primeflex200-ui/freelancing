# Netlify Deployment Guide

## Quick Deploy (1 Hour Preview)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Deploy to Netlify
```bash
netlify deploy --prod
```

Follow the prompts:
1. Authorize with Netlify (opens browser)
2. Choose "Create & configure a new site"
3. Choose your team
4. Enter site name (or leave blank for random)
5. Publish directory: `dist/public`

You'll get a live URL immediately!

## Alternative: Drag & Drop Deploy

1. Build the project: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist/public` folder
4. Get instant preview link!

## Environment Variables

If you need database/API features, add these in Netlify dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `SESSION_SECRET`
- `NODE_ENV=production`

## Notes

- Free tier includes: 100GB bandwidth, 300 build minutes
- Preview deploys last indefinitely (not just 1 hour)
- Can delete site anytime from dashboard
- Automatic HTTPS included
