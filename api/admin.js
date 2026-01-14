export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { code } = req.body;
    
    if (code === 'freelancing.2025pjct') {
      return res.status(200).json({
        success: true,
        projects: [],
        message: 'Admin authenticated successfully!'
      });
    }
    
    return res.status(401).json({
      success: false,
      error: 'Invalid admin code'
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}