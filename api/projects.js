module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Basic validation
      const { websiteType, projectName, projectDescription, communicationMethods, budget, domain, name, email } = req.body;
      
      if (!websiteType || !projectName || !projectDescription || !communicationMethods || !budget || !domain || !name || !email) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      // Create mock project (no database for now)
      const project = {
        id: 'proj_' + Date.now(),
        websiteType,
        projectName,
        projectDescription,
        communicationMethods,
        budget,
        domain,
        name,
        email,
        phone: req.body.phone || null,
        company: req.body.company || null,
        selectedDesignId: req.body.selectedDesignId || null,
        selectedDesignTitle: req.body.selectedDesignTitle || null,
        selectedDesignCategory: req.body.selectedDesignCategory || null,
        selectedDesignImageUrl: req.body.selectedDesignImageUrl || null,
        createdAt: new Date().toISOString()
      };

      return res.status(200).json({ 
        success: true, 
        project,
        message: 'Project submitted successfully (demo mode)'
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