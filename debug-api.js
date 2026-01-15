// Debug API response
const URLS = [
  'https://www.stackweb.net',
  'https://freelancingfixedapis.vercel.app',
  'https://freelancing-git-main-primeflex200-ui.vercel.app'
];

async function debugAPI() {
  for (const baseUrl of URLS) {
    try {
      console.log(`🔍 Testing ${baseUrl}...\n`);
      
      const response = await fetch(`${baseUrl}/api?endpoint=test`);
      const text = await response.text();
      
      console.log('Status:', response.status);
      console.log('Response text:', text.substring(0, 200) + '...\n');
      
      if (response.status === 200) {
        console.log('✅ Found working URL:', baseUrl);
        break;
      }
      
    } catch (error) {
      console.log('❌ Error:', error.message, '\n');
    }
  }
}

debugAPI();