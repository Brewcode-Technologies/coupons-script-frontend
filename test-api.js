const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🔍 Testing API connection...\n');
  
  const endpoints = [
    '/public/categories/list',
    '/public/stores/list',
    '/public/coupons/list'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${API_URL}${endpoint}`);
      const response = await axios.get(`${API_URL}${endpoint}`, { timeout: 5000 });
      console.log(`✅ Success: ${response.status} - ${JSON.stringify(response.data).substring(0, 100)}...`);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`❌ Connection refused - Backend server not running on port 5000`);
      } else if (error.response) {
        console.log(`❌ Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('💡 If you see connection errors, make sure your backend server is running:');
  console.log('   cd ../coupons-script-backend');
  console.log('   npm run dev');
}

testAPI();