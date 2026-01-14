export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { code } = req.body;
      const ADMIN_CODE = "freelancing.2025pjct";
      
      if (code !== ADMIN_CODE) {
        return res.status(401).json({ success: false, error: "Invalid admin code" });
      }

      // Return empty projects for now (demo mode)
      return res.status(200).json({ 
        success: true, 
        projects: [],
        message: "Admin authenticated successfully (demo mode)"
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Server error: ' + error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
