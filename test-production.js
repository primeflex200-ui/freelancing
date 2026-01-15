// Test production deployment
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function testProduction() {
  console.log('🧪 Production Deployment Tester\n');
  
  rl.question('Enter your Vercel deployment URL (e.g., https://your-project.vercel.app): ', async (url) => {
    if (!url.startsWith('http')) {
      console.log('❌ Please enter a valid URL starting with https://');
      rl.close();
      return;
    }

    console.log(`\n🔍 Testing deployment at: ${url}\n`);

    // Test 1: Frontend
    try {
      console.log('1. Testing frontend...');
      const response = await fetch(url);
      if (response.ok) {
        console.log('✅ Frontend is accessible');
      } else {
        console.log(`❌ Frontend error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log('❌ Frontend failed:', error.message);
    }

    // Test 2: API Health Check
    try {
      console.log('\n2. Testing API health check...');
      const response = await fetch(`${url}/api?endpoint=test`);
      const data = await response.json();
      if (data.success) {
        console.log('✅ API is working:', data.message);
        console.log('📡 Supabase status:', data.supabase);
      } else {
        console.log('❌ API health check failed');
      }
    } catch (error) {
      console.log('❌ API health check failed:', error.message);
    }

    // Test 3: Project Submission
    try {
      console.log('\n3. Testing project submission...');
      const testProject = {
        websiteType: 'professional',
        projectName: 'Production Test Project',
        projectDescription: 'Testing production deployment',
        communicationMethods: 'admin',
        budget: '1000',
        domain: 'own',
        name: 'Test User',
        email: 'test@production.com'
      };

      const response = await fetch(`${url}/api?endpoint=projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testProject)
      });

      const data = await response.json();
      if (data.success) {
        console.log('✅ Project submission working');
        console.log('📝 Project ID:', data.project.id);
      } else {
        console.log('❌ Project submission failed:', data.error);
      }
    } catch (error) {
      console.log('❌ Project submission failed:', error.message);
    }

    // Test 4: Admin Authentication
    try {
      console.log('\n4. Testing admin authentication...');
      const response = await fetch(`${url}/api?endpoint=admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'freelancing.2025pjct' })
      });

      const data = await response.json();
      if (data.success) {
        console.log('✅ Admin authentication working');
        console.log('📊 Projects in database:', data.projects.length);
      } else {
        console.log('❌ Admin authentication failed:', data.error);
      }
    } catch (error) {
      console.log('❌ Admin authentication failed:', error.message);
    }

    console.log('\n🏁 Production testing completed!');
    console.log('\nIf all tests pass, your deployment is working correctly! 🎉');
    rl.close();
  });
}

testProduction();