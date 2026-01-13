import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

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
    const { code } = req.body;
    const ADMIN_CODE = process.env.ADMIN_CODE || "freelancing.2025pjct";
    
    if (code === ADMIN_CODE) {
      try {
        const projects = await storage.getAllProjects();
        return res.status(200).json({ success: true, projects });
      } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
      }
    } else {
      return res.status(401).json({ success: false, error: "Invalid admin code" });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
