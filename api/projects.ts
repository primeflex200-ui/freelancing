import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertProjectSchema } from '../shared/schema';

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
      const project = await storage.insertProject(projectData);
      return res.status(200).json({ success: true, project });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
