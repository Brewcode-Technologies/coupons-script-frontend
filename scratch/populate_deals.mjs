import fs from 'fs';

const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

const brands = [
  'Amazon', 'Myntra', 'Flipkart', 'Apple', 'IKEA', 'MakeMyTrip', 
  'Nykaa', 'H&M', 'Adidas', 'Nike', 'Zomato', 'swiggy'
];

const sections = [
  'popular_offers',
  'top_coupons',
  'deals_of_day',
  'collections'
];

async function main() {
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error('Login failed: ' + JSON.stringify(loginData));
    const token = loginData.token;
    console.log('Got token');

    // 2. Fetch stores
    const storesRes = await fetch(`${API_URL}/public/stores/list`);
    const storesData = await storesRes.json();
    const stores = storesData.data || storesData || [];
    
    // Map brand names to store IDs (case-insensitive)
    const storeMap = {};
    for (const s of stores) {
      if (s.storeName) storeMap[s.storeName.toLowerCase()] = s._id;
    }

    // 3. Create deals
    for (const section of sections) {
      console.log(`Creating 10 deals for section: ${section}`);
      for (let i = 0; i < 10; i++) {
        const brand = brands[i % brands.length];
        const discountVal = [10, 20, 30, 40, 50, 60, 70][i % 7];
        
        const deal = {
          title: `Exclusive ${discountVal}% Off at ${brand}`,
          description: `Grab the best deals of the day at ${brand}. Valid for a limited time only!`,
          discount: `Up to ${discountVal}% Off`,
          store: storeMap[brand.toLowerCase()] || '',
          category: 'Shopping',
          type: 'deal',
          isActive: true,
          section: section,
          link: 'https://example.com/checkout'
        };

        const res = await fetch(`${API_URL}/admin/deals/create`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(deal)
        });
        
        if (res.ok) {
          console.log(`✓ Created deal for ${brand} in ${section}`);
        } else {
          const errText = await res.text();
          console.error(`✗ Failed for ${brand} in ${section}:`, errText);
        }
      }
    }
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
