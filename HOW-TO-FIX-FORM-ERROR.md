# How to Fix "Failed to submit project" Error

## The Problem
The form is failing because 4 database columns are missing from your Supabase `projects` table.

## The Solution - Run This SQL

### Step-by-Step Instructions:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Login to your account
   - Select your project: `hvfpectylmzscymvsytw`

2. **Open SQL Editor**
   - Look in the left sidebar
   - Click on "SQL Editor"
   - Click the "+ New query" button

3. **Copy and Paste This SQL**

```sql
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS selected_design_id TEXT,
ADD COLUMN IF NOT EXISTS selected_design_title TEXT,
ADD COLUMN IF NOT EXISTS selected_design_category TEXT,
ADD COLUMN IF NOT EXISTS selected_design_image_url TEXT;
```

4. **Run the SQL**
   - Click the "Run" button (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

5. **Verify It Worked**
   - Run this query to check:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name LIKE 'selected_design%';
```
   - You should see 4 rows returned

6. **Refresh Your Website**
   - Go back to http://localhost:5000
   - Try submitting the form again
   - It should work now!

## What These Columns Do
- `selected_design_id` - Stores which design the user selected
- `selected_design_title` - Stores the design name
- `selected_design_category` - Stores the category (Professional, Gaming, etc.)
- `selected_design_image_url` - Stores the design preview image

## Still Having Issues?
If you still get an error after running the SQL:
1. Make sure you're logged into the correct Supabase project
2. Check that the SQL ran without errors
3. Restart the development server (I can do this for you)

## Alternative: I Can Help
If you share your Supabase credentials, I can help run this SQL for you. But for security, it's better if you run it yourself in the Supabase dashboard.
