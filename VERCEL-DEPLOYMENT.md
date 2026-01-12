# Vercel Deployment Guide

## Prerequisites
- GitHub repository connected to Vercel
- Supabase project set up with database

## Deployment Steps

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository: `primeflex200-ui/freelancing`

### 2. Configure Build Settings
Vercel should auto-detect these settings, but verify:
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Add Environment Variables
In Vercel project settings, add these environment variables:

```
NODE_ENV=production
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SESSION_SECRET=your_random_secret_key
```

**How to get Supabase credentials:**
1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Go to "API" section
4. Copy:
   - Project URL → `SUPABASE_URL`
   - anon/public key → `SUPABASE_ANON_KEY`
5. Go to "Database" section
6. Copy the connection string → `DATABASE_URL`

**Generate SESSION_SECRET:**
Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Troubleshooting

### Issue: File downloads instead of showing website
**Solution**: The `vercel.json` file has been configured to route all requests through the Express server. Make sure it's committed to your repository.

### Issue: 404 errors on routes
**Solution**: The Express server handles all routes. Ensure the build completed successfully and `dist/index.cjs` exists.

### Issue: Database connection errors
**Solution**: 
1. Verify all environment variables are set correctly in Vercel
2. Check that your Supabase database is accessible
3. Ensure the connection string includes the password

### Issue: Build fails
**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Try building locally first: `npm run build`

## Local Testing Before Deploy
Test the production build locally:
```bash
npm run build
npm start
```
Visit `http://localhost:5000` to verify everything works.

## Post-Deployment
1. Test all routes on your live site
2. Check that forms submit correctly
3. Verify database connections work
4. Test the design selection flow

## Automatic Deployments
Every push to the `main` branch will automatically trigger a new deployment on Vercel.

## Custom Domain (Optional)
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
