// Simple API test script
const BASE_URL = 'https://freelancingfixedapis.vercel.app';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  // Test 1: Health check
  try {
    console.log('1. Testing health check...');
    const response = await fetch(`${BASE_URL}/api?endpoint=test`);
    const data = await response.json();
    console.log('✅ Health check:', data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test 2: Project submission
  try {
    console.log('\n2. Testing project submission...');
    const projectData = {
      websiteType: 'professional',
      projectName: 'Test Project',
      projectDescription: 'This is a test project submission',
      communicationMethods: 'admin, gmail',
      budget: '1000',
      domain: 'own',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company'
    };

    const response = await fetch(`${BASE_URL}/api?endpoint=projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();
    console.log('✅ Project submission:', data);
  } catch (error) {
    console.log('❌ Project submission failed:', error.message);
  }

  // Test 3: Admin authentication
  try {
    console.log('\n3. Testing admin authentication...');
    const response = await fetch(`${BASE_URL}/api?endpoint=admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: 'freelancing.2025pjct' }),
    });

    const data = await response.json();
    console.log('✅ Admin authentication:', data);
  } catch (error) {
    console.log('❌ Admin authentication failed:', error.message);
  }

  console.log('\n🏁 API testing completed!');
}

testAPI();