module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    try {
      return res.status(200).json({ 
        success: true, 
        message: "All projects cleared successfully (demo mode)" 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Server error: ' + error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};