// Development API server for localhost
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import and setup API routes
const setupAPIRoutes = async () => {
  try {
    // Import API handlers
    const projectsHandler = await import('./api/projects.ts');
    const adminVerifyHandler = await import('./api/admin/verify.ts');
    const adminProjectsHandler = await import('./api/admin/projects/index.ts');
    const adminProjectByIdHandler = await import('./api/admin/projects/[id].ts');

    // Setup routes
    app.post('/api/projects', (req, res) => {
      projectsHandler.default(req, res);
    });

    app.post('/api/admin/verify', (req, res) => {
      adminVerifyHandler.default(req, res);
    });

    app.delete('/api/admin/projects', (req, res) => {
      adminProjectsHandler.default(req, res);
    });

    app.delete('/api/admin/projects/:id', (req, res) => {
      // Convert Express params to Vercel query format
      req.query = { ...req.query, id: req.params.id };
      adminProjectByIdHandler.default(req, res);
    });

    // Handle OPTIONS requests
    app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.sendStatus(200);
    });

    console.log('✅ API routes setup complete');
  } catch (error) {
    console.error('❌ Error setting up API routes:', error);
    
    // Fallback: Create simple mock endpoints
    app.post('/api/projects', (req, res) => {
      console.log('📝 Mock project submission:', req.body);
      res.json({ 
        success: true, 
        project: { id: 'mock-id', ...req.body, createdAt: new Date() },
        message: 'Mock submission - API server not fully configured'
      });
    });

    app.post('/api/admin/verify', (req, res) => {
      const { code } = req.body;
      if (code === 'freelancing.2025pjct') {
        res.json({ success: true, projects: [] });
      } else {
        res.status(401).json({ success: false, error: 'Invalid admin code' });
      }
    });

    app.delete('/api/admin/projects', (req, res) => {
      res.json({ success: true, message: 'Mock clear all projects' });
    });

    app.delete('/api/admin/projects/:id', (req, res) => {
      res.json({ success: true, message: 'Mock delete project' });
    });

    console.log('⚠️  Using mock API endpoints');
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  await setupAPIRoutes();
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development API server...');
  process.exit(0);
});