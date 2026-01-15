// Import Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use anon key for regular operations
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Use service role key for admin operations (delete, etc.)
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : supabase;

export default async function handler(request, response) {
  const { method, body, query, url } = request;
  
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // Parse URL to handle different endpoints - fix URL parsing
    let urlPath;
    try {
      urlPath = new URL(url, `http://${request.headers.host || 'localhost'}`).pathname;
    } catch (e) {
      // Fallback if URL parsing fails
      urlPath = url.split('?')[0];
    }
    
    console.log('API Request:', { method, urlPath, query, url });
    
    // Handle different endpoints
    if (method === 'GET' && query.endpoint === 'test') {
      return response.status(200).json({
        success: true,
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        supabase: supabase ? 'Connected' : 'Not configured'
      });
    }
    
    // Project submission
    if (method === 'POST' && query.endpoint === 'projects') {
      console.log('📝 Project submission:', body);
      
      if (!supabase) {
        return response.status(200).json({ 
          success: true, 
          project: { id: 'mock-' + Date.now(), ...body, createdAt: new Date() },
          message: 'Development mode - Supabase not configured'
        });
      }

      // Convert camelCase to snake_case for database
      const dbProject = {
        website_type: body.websiteType,
        project_name: body.projectName,
        project_description: body.projectDescription,
        communication_methods: body.communicationMethods,
        budget: body.budget,
        domain: body.domain,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
      };

      // Add design fields if provided
      if (body.selectedDesignId) {
        dbProject.selected_design_id = body.selectedDesignId;
        dbProject.selected_design_title = body.selectedDesignTitle;
        dbProject.selected_design_category = body.selectedDesignCategory;
        dbProject.selected_design_image_url = body.selectedDesignImageUrl;
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([dbProject])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return response.status(500).json({ 
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

      return response.status(200).json({ success: true, project });
    }
    
    // Admin authentication and project listing
    if (method === 'POST' && query.endpoint === 'admin') {
      const { code } = body;
      const ADMIN_CODE = process.env.ADMIN_CODE || "freelancing.2025pjct";
      
      if (code !== ADMIN_CODE) {
        return response.status(401).json({ success: false, error: "Invalid admin code" });
      }

      if (!supabase) {
        return response.status(200).json({ 
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
        return response.status(500).json({ 
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

      return response.status(200).json({ success: true, projects });
    }

    // Handle admin project deletion routes
    if (method === 'DELETE') {
      console.log('DELETE request received:', { urlPath, url, query });
      
      if (!supabaseAdmin) {
        return response.status(200).json({ 
          success: true, 
          message: "Project deleted successfully (development mode)" 
        });
      }

      // Check if this is a clear all request
      const isClearAll = urlPath === '/api/admin/projects' || 
                        urlPath.endsWith('/admin/projects') || 
                        (url.includes('/admin/projects') && !url.includes('/admin/projects/'));
      
      if (isClearAll) {
        console.log('Clearing all projects...');
        try {
          const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');
          
          if (error) {
            console.error('Supabase clear all error:', error);
            return response.status(500).json({ 
              success: false, 
              error: `Database error: ${error.message}` 
            });
          }

          console.log('All projects cleared successfully');
          return response.status(200).json({ success: true, message: "All projects cleared successfully" });
        } catch (err) {
          console.error('Clear all catch error:', err);
          return response.status(500).json({ 
            success: false, 
            error: `Server error: ${err.message}` 
          });
        }
      }

      // Check if this is a delete specific project request
      if (urlPath.includes('/admin/projects/')) {
        const pathParts = urlPath.split('/');
        const projectId = pathParts[pathParts.length - 1];
        console.log('Deleting specific project:', projectId);
        
        if (projectId && projectId !== 'projects' && projectId.length > 0) {
          try {
            const { error } = await supabaseAdmin
              .from('projects')
              .delete()
              .eq('id', projectId);
            
            if (error) {
              console.error('Supabase delete error:', error);
              return response.status(500).json({ 
                success: false, 
                error: `Database error: ${error.message}` 
              });
            }

            console.log('Project deleted successfully:', projectId);
            return response.status(200).json({ success: true, message: "Project deleted successfully" });
          } catch (err) {
            console.error('Delete project catch error:', err);
            return response.status(500).json({ 
              success: false, 
              error: `Server error: ${err.message}` 
            });
          }
        }
      }
      
      // If we get here, the delete request format wasn't recognized
      console.log('Unrecognized delete request format');
      return response.status(400).json({
        success: false,
        error: 'Invalid delete request format',
        debug: { urlPath, url, method }
      });
    }
    
    return response.status(404).json({
      error: 'Endpoint not found',
      path: urlPath,
      method: method
    });

  } catch (error) {
    console.error('API Error:', error);
    return response.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
}