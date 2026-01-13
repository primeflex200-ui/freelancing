// Netlify serverless function wrapper
const path = require('path');

// Load the built server
const serverPath = path.join(__dirname, '..', '..', 'dist', 'index.cjs');

let handler;

try {
  // Try to load the built server
  const server = require(serverPath);
  
  // Export handler for Netlify
  handler = async (event, context) => {
    // For now, return a simple response
    // Full Express integration would require more setup
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'API endpoint',
        path: event.path 
      })
    };
  };
} catch (error) {
  console.error('Error loading server:', error);
  handler = async (event, context) => {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Server not built',
        message: error.message 
      })
    };
  };
}

exports.handler = handler;
