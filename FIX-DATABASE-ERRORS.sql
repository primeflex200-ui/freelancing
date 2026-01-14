-- ============================================
-- COMPLETE DATABASE FIX FOR STACKWEB PROJECT
-- RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR
-- ============================================

-- Step 1: Drop existing tables if they have issues (CAREFUL!)
-- Uncomment the next lines ONLY if you want to start fresh
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- Step 2: Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Step 3: Create projects table with ALL required columns
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_type TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_description TEXT NOT NULL,
  communication_methods TEXT NOT NULL,
  budget TEXT NOT NULL,
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  selected_design_id TEXT,
  selected_design_title TEXT,
  selected_design_category TEXT,
  selected_design_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Step 4: Add missing columns if table already exists
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS selected_design_id TEXT,
ADD COLUMN IF NOT EXISTS selected_design_title TEXT,
ADD COLUMN IF NOT EXISTS selected_design_category TEXT,
ADD COLUMN IF NOT EXISTS selected_design_image_url TEXT;

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_email ON projects(email);
CREATE INDEX IF NOT EXISTS idx_projects_website_type ON projects(website_type);

-- Step 6: DISABLE Row Level Security temporarily for testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Step 7: Drop existing policies (if any)
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert access for all users" ON projects;
DROP POLICY IF EXISTS "Enable delete access for all users" ON projects;
DROP POLICY IF EXISTS "Enable update access for all users" ON projects;

DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert access for all users" ON users;
DROP POLICY IF EXISTS "Enable delete access for all users" ON users;
DROP POLICY IF EXISTS "Enable update access for all users" ON users;

-- Step 8: Enable RLS and create permissive policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create very permissive policies for projects
CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

-- Create very permissive policies for users  
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true) WITH CHECK (true);

-- Step 9: Grant necessary permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Step 10: Verify the table structure
SELECT 
  table_name,
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name IN ('projects', 'users')
ORDER BY table_name, ordinal_position;

-- Step 11: Test insert (this should work without errors)
INSERT INTO projects (
  website_type,
  project_name,
  project_description,
  communication_methods,
  budget,
  domain,
  name,
  email,
  phone,
  company,
  selected_design_id,
  selected_design_title,
  selected_design_category,
  selected_design_image_url
) VALUES (
  'professional',
  'Test Project',
  'This is a test project to verify database functionality',
  'email, admin',
  '1000',
  'own',
  'Test User',
  'test@example.com',
  '+1234567890',
  'Test Company',
  'design-1',
  'Professional Design',
  'professional',
  'https://example.com/image.jpg'
);

-- Step 12: Verify the insert worked
SELECT COUNT(*) as total_projects FROM projects;
SELECT * FROM projects ORDER BY created_at DESC LIMIT 1;

-- Step 13: Clean up test data (optional)
-- DELETE FROM projects WHERE email = 'test@example.com';

-- ============================================
-- EXPECTED RESULTS:
-- 1. Tables created successfully
-- 2. All columns present
-- 3. Policies created
-- 4. Test insert successful
-- 5. No permission errors
-- ============================================