-- Migration: Add design selection fields to projects table
-- Run this in your Supabase SQL Editor

-- Add new columns for design selection
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS selected_design_id TEXT,
ADD COLUMN IF NOT EXISTS selected_design_title TEXT,
ADD COLUMN IF NOT EXISTS selected_design_category TEXT,
ADD COLUMN IF NOT EXISTS selected_design_image_url TEXT;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;
