-- Run this SQL in your Supabase SQL Editor
-- This adds the design selection columns to the projects table

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS selected_design_id TEXT,
ADD COLUMN IF NOT EXISTS selected_design_title TEXT,
ADD COLUMN IF NOT EXISTS selected_design_category TEXT,
ADD COLUMN IF NOT EXISTS selected_design_image_url TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
ORDER BY ordinal_position;
