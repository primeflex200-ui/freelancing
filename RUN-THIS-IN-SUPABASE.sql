-- ============================================
-- RUN THIS SQL IN YOUR SUPABASE SQL EDITOR
-- ============================================

-- Step 1: Add the missing columns to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS selected_design_id TEXT,
ADD COLUMN IF NOT EXISTS selected_design_title TEXT,
ADD COLUMN IF NOT EXISTS selected_design_category TEXT,
ADD COLUMN IF NOT EXISTS selected_design_image_url TEXT;

-- Step 2: Verify the columns were added (this will show all columns)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- You should see these new columns in the results:
-- selected_design_id | text | YES
-- selected_design_title | text | YES
-- selected_design_category | text | YES
-- selected_design_image_url | text | YES
