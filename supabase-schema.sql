-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create projects table
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_email ON projects(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table (allow all operations for now)
-- You can customize these policies based on your security requirements
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON projects
  FOR DELETE USING (true);

-- Create policies for users table
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON users
  FOR INSERT WITH CHECK (true);
