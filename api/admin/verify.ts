import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log request for debugging
  console.log('Admin Verify Request:', {
    method: req.method,
    url: req.url,
    body: req.body ? 'Present' : 'Missing',
    timestamp: new Date().toISOString()
  });

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
      const { code } = req.body;
      const ADMIN_CODE = process.env.ADMIN_CODE || "freelancing.2025pjct";
      
      console.log('Admin verification:', {
        codeProvided: code ? 'Yes' : 'No',
        adminCodeSet: ADMIN_CODE ? 'Yes' : 'No'
      });
      
      if (code !== ADMIN_CODE) {
        return res.status(401).json({ success: false, error: "Invalid admin code" });
      }

      // Check if Supabase is configured
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      console.log('Supabase environment check:', {
        supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
        supabaseKey: supabaseKey ? 'Present' : 'Missing'
      });

      if (!supabaseUrl || !supabaseKey) {
        // Return empty projects if Supabase is not configured
        return res.status(200).json({ 
          success: true, 
          projects: [],
          message: "Supabase not configured - using demo mode"
        });
      }

      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseKey);

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

      return res.status(200).json({ success: true, projects });

    } catch (error: any) {
      console.error('Admin verify error:', error);
      return res.status(500).json({ 
        success: false, 
        error: `Server error: ${error.message}` 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
