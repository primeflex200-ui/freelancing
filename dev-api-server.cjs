// Simple development API server
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// API Routes
app.post('/api/projects', async (req, res) => {
  try {
    console.log('📝 Project submission:', req.body);
    
    if (!supabase) {
      return res.json({ 
        success: true, 
        project: { id: 'mock-' + Date.now(), ...req.body, createdAt: new Date() },
        message: 'Development mode - Supabase not configured'
      });
    }

    // Convert camelCase to snake_case for database
    const dbProject = {
      website_type: req.body.websiteType,
      project_name: req.body.projectName,
      project_description: req.body.projectDescription,
      communication_methods: req.body.communicationMethods,
      budget: req.body.budget,
      domain: req.body.domain,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      company: req.body.company || null,
    };

    // Add design fields if provided
    if (req.body.selectedDesignId) {
      dbProject.selected_design_id = req.body.selectedDesignId;
      dbProject.selected_design_title = req.body.selectedDesignTitle;
      dbProject.selected_design_category = req.body.selectedDesignCategory;
      dbProject.selected_design_image_url = req.body.selectedDesignImageUrl;
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([dbProject])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: `Database error: ${error.message}` 
      });
    }
    
    // Convert snake_case back to camelCase
    const project = {
      id: data.id,
      websiteType: data.website_type,
      projectName: data.project_name,
      projectDescription: data.project_description,
      communicationMethods: data.communication_methods,
      budget: data.budget,
      domain: data.domain,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      selectedDesignId: data.selected_design_id || null,
      selectedDesignTitle: data.selected_design_title || null,
      selectedDesignCategory: data.selected_design_category || null,
      selectedDesignImageUrl: data.selected_design_image_url || null,
      createdAt: new Date(data.created_at),
    };

    res.json({ success: true, project });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(400).json({ 
      success: false, 
      error: `Server error: ${error.message}` 
    });
  }
});

app.post('/api/admin/verify', async (req, res) => {
  try {
    const { code } = req.body;
    const ADMIN_CODE = process.env.ADMIN_CODE || "freelancing.2025pjct";
    
    if (code !== ADMIN_CODE) {
      return res.status(401).json({ success: false, error: "Invalid admin code" });
    }

    if (!supabase) {
      return res.json({ 
        success: true, 
        projects: [],
        message: "Development mode - Supabase not configured"
      });
    }

    // Fetch projects from Supabase
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: `Database error: ${error.message}` 
      });
    }

    // Convert snake_case to camelCase
    const projects = (data || []).map(project => ({
      id: project.id,
      websiteType: project.website_type,
      projectName: project.project_name,
      projectDescription: project.project_description,
      communicationMethods: project.communication_methods,
      budget: project.budget,
      domain: project.domain,
      name: project.name,
      email: project.email,
      phone: project.phone,
      company: project.company,
      selectedDesignId: project.selected_design_id || null,
      selectedDesignTitle: project.selected_design_title || null,
      selectedDesignCategory: project.selected_design_category || null,
      selectedDesignImageUrl: project.selected_design_image_url || null,
      createdAt: project.created_at,
    }));

    res.json({ success: true, projects });
  } catch (error) {
    console.error('Admin verify error:', error);
    res.status(500).json({ 
      success: false, 
      error: `Server error: ${error.message}` 
    });
  }
});

app.delete('/api/admin/projects', async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ 
        success: true, 
        message: "All projects cleared successfully (development mode)" 
      });
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: `Database error: ${error.message}` 
      });
    }

    res.json({ success: true, message: "All projects cleared successfully" });
  } catch (error) {
    console.error('Clear projects error:', error);
    res.status(500).json({ 
      success: false, 
      error: `Server error: ${error.message}` 
    });
  }
});

app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!supabase) {
      return res.json({ 
        success: true, 
        message: "Project deleted successfully (development mode)" 
      });
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: `Database error: ${error.message}` 
      });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ 
      success: false, 
      error: `Server error: ${error.message}` 
    });
  }
});

// Handle OPTIONS requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📡 Supabase: ${supabase ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`🔑 Admin code: ${process.env.ADMIN_CODE || 'freelancing.2025pjct'}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development API server...');
  process.exit(0);
});