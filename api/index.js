export default function handler(request, response) {
  const { method, body, query } = request;
  
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Handle different endpoints based on query parameter
  const endpoint = query.endpoint || 'test';
  
  if (method === 'GET' && endpoint === 'test') {
    return response.status(200).json({
      success: true,
      message: 'API is working!',
      timestamp: new Date().toISOString()
    });
  }
  
  if (method === 'POST' && endpoint === 'projects') {
    return response.status(200).json({
      success: true,
      project: {
        id: 'demo-' + Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      },
      message: 'Project submitted successfully!'
    });
  }
  
  if (method === 'POST' && endpoint === 'admin') {
    const { code } = body;
    if (code === 'freelancing.2025pjct') {
      return response.status(200).json({
        success: true,
        projects: [],
        message: 'Admin authenticated successfully!'
      });
    }
    return response.status(401).json({
      success: false,
      error: 'Invalid admin code'
    });
  }
  
  return response.status(404).json({
    error: 'Endpoint not found'
  });
}