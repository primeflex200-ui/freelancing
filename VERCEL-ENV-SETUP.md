# Vercel Environment Variables Setup

## Production Domain
**Live Website**: https://www.stackweb.net

## Required Environment Variables

When deploying to Vercel, make sure to set these environment variables in your Vercel dashboard:

### 1. Supabase Configuration
```
SUPABASE_URL=https://hvfpectylmzscymvsytw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZnBlY3R5bG16c2N5bXZzeXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMTcwMTAsImV4cCI6MjA4MzU5MzAxMH0.s_SD9WP2StK0fSkait5KMn2FYFVQDqna_fM_0oNE3cY
```

### 2. Admin Configuration
```
ADMIN_CODE=freelancing.2025pjct
```

### 3. Environment
```
NODE_ENV=production
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable with its value
5. Make sure to set them for **Production**, **Preview**, and **Development** environments
6. Redeploy your project after adding the variables

## API Endpoints (Production)

After deployment, these endpoints will be available:
- `https://www.stackweb.net/api/projects` - Project submission
- `https://www.stackweb.net/api/admin/verify` - Admin panel access
- `https://www.stackweb.net/admin` - Admin panel UI

## Testing

Test these features on your live site:
1. **Project Submission**: Go to https://www.stackweb.net → Start Project → Fill form → Submit
2. **Admin Panel**: Go to https://www.stackweb.net/admin → Enter code: `freelancing.2025pjct`
3. **Design Selection**: Test the circular gallery and design selection flow

## Troubleshooting

If you're still getting errors:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set correctly
3. Make sure Supabase database is accessible
4. Check that the API endpoints return proper CORS headers
5. Test API endpoints directly:
   - `https://www.stackweb.net/api/projects` (POST request)
   - `https://www.stackweb.net/api/admin/verify` (POST request)