import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { insertProjectSchema } from '../shared/schema';
import { randomUUID } from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      
      // Check if Supabase is configured
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        // Return mock success if Supabase is not configured
        const mockProject = {
          id: randomUUID(),
          ...projectData,
          createdAt: new Date(),
          selectedDesignId: projectData.selectedDesignId || null,
          selectedDesignTitle: projectData.selectedDesignTitle || null,
          selectedDesignCategory: projectData.selectedDesignCategory || null,
          selectedDesignImageUrl: projectData.selectedDesignImageUrl || null,
        };
        return res.status(200).json({ 
          success: true, 
          project: mockProject,
          message: "Supabase not configured - using demo mode"
        });
      }

      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Convert camelCase to snake_case for database
      const dbProject: any = {
        website_type: projectData.websiteType,
        project_name: projectData.projectName,
        project_description: projectData.projectDescription,
        communication_methods: projectData.communicationMethods,
        budget: projectData.budget,
        domain: projectData.domain,
        name: projectData.name,
        email: projectData.email,
        phone: projectData.phone,
        company: projectData.company,
      };

      // Only add design fields if they are provided
      if (projectData.selectedDesignId) {
        dbProject.selected_design_id = projectData.selectedDesignId;
      }
      if (projectData.selectedDesignTitle) {
        dbProject.selected_design_title = projectData.selectedDesignTitle;
      }
      if (projectData.selectedDesignCategory) {
        dbProject.selected_design_category = projectData.selectedDesignCategory;
      }
      if (projectData.selectedDesignImageUrl) {
        dbProject.selected_design_image_url = projectData.selectedDesignImageUrl;
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

      return res.status(200).json({ success: true, project });

    } catch (error: any) {
      console.error('Project creation error:', error);
      return res.status(400).json({ 
        success: false, 
        error: `Server error: ${error.message}` 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
