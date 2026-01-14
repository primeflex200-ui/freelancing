import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  // Return test response
  return res.status(200).json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrl: process.env.SUPABASE_URL ? 'Present' : 'Missing',
      supabaseKey: process.env.SUPABASE_ANON_KEY ? 'Present' : 'Missing',
      adminCode: process.env.ADMIN_CODE ? 'Present' : 'Missing',
      nodeEnv: process.env.NODE_ENV || 'Not set'
    },
    request: {
      method: req.method,
      url: req.url,
      headers: Object.keys(req.headers)
    }
  });
}