import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') {
        return res.status(400).json({ success: false, error: 'Invalid project ID' });
      }

      // Check if Supabase is configured
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        // Return success if Supabase is not configured
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ 
          success: true, 
          message: "Project deleted successfully (demo mode)" 
        });
      }

      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Delete the specific project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error:', error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ 
          success: false, 
          error: `Database error: ${error.message}` 
        });
      }

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, message: "Project deleted successfully" });

    } catch (error: any) {
      console.error('Delete project error:', error);
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ 
        success: false, 
        error: `Server error: ${error.message}` 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
