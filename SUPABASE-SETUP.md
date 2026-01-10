# Supabase Setup Guide

This guide will help you set up Supabase as the backend database for your freelancing website.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: freelancing-website (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to initialize (takes ~2 minutes)

## Step 2: Create Database Tables

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL and create your tables

## Step 3: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: This is your `SUPABASE_URL`
   - **anon public key**: This is your `SUPABASE_ANON_KEY`

## Step 4: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from Step 3

## Step 5: Verify the Connection

1. Restart your development server
2. You should see this message in the console:
   ```
   ✅ Using Supabase for data storage
   ```
3. If you see a warning about missing credentials, double-check your `.env` file

## Step 6: Test the Integration

1. Go to your website and submit a test project through the form
2. Go to your Supabase dashboard → **Table Editor** → **projects** table
3. You should see your test submission appear in the table
4. Access the admin panel with code: `freelancing.2025pjct`
5. Verify that the submitted project appears in the admin panel

## Security Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The `SUPABASE_ANON_KEY` is safe to use in client-side code
- Row Level Security (RLS) is enabled on all tables
- Current policies allow all operations - customize them based on your needs

## Troubleshooting

### "Using in-memory storage" message
- Check that your `.env` file exists and has the correct variable names
- Restart your server after adding environment variables

### "Error inserting project"
- Verify your SQL schema was executed successfully
- Check the Supabase dashboard logs for detailed error messages
- Ensure all required fields are being sent from the form

### Projects not appearing in admin panel
- Check the Supabase Table Editor to see if data is being saved
- Verify the API route is correctly fetching from Supabase
- Check browser console for any error messages

## Next Steps

Once everything is working:
1. Customize the RLS policies in Supabase for better security
2. Set up email notifications for new project submissions
3. Add data backup and export functionality
4. Consider adding authentication for the admin panel

## Support

If you encounter any issues:
- Check Supabase documentation: https://supabase.com/docs
- Review the Supabase logs in your dashboard
- Verify your environment variables are correctly set
