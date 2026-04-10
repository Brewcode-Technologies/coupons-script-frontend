import fs from 'fs';

const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

async function main() {
  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const { token } = await loginRes.json();

    // Fetch categories
    const catRes = await fetch(`${API_URL}/public/categories/list`);
    const catData = await catRes.json();
    const categories = catData.data || catData || [];

    // Fetch stores (optional, to assign random stores if needed, but we will try without or with a random one)
    const storesRes = await fetch(`${API_URL}/public/stores/list`);
    const storesData = await storesRes.json();
    const stores = storesData.data || storesData || [];

    console.log(`Found ${categories.length} categories.`);
    
    let totalCreated = 0;

    for (const category of categories) {
      console.log(`Creating 10 coupons for category: ${category.name}`);
      for (let i = 1; i <= 10; i++) {
        
        // Randomize logic
        const discountVal = [10, 20, 25, 30, 40, 50, 60, 70][i % 8];
        const isCode = i % 2 === 0;
        const codeText = isCode ? `${category.name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '')}${discountVal}` : '';
        const storeId = stores.length > 0 ? stores[i % stores.length]._id : '';

        const payload = {
          title: `Get ${discountVal}% OFF on ${category.name}`,
          code: codeText,
          description: `Super savings on ${category.name} this season. Grab it before it's gone!`,
          discount: `${discountVal}% OFF`,
          store: storeId,
          category: category.name,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          type: isCode ? 'code' : 'sale',
          labelType: isCode ? 'Code' : 'Deal',
          interestedUsers: Math.floor(Math.random() * 500) + 10,
          limitedTime: i % 3 === 0,
          expiringToday: false,
          addedBy: 'Admin',
          exclusive: i % 4 === 0,
          details: `Terms and conditions apply. Valid for selected ${category.name} items.`,
          isFeatured: false,
          featuredImage: '',
          affiliateUrl: '',
          tags: []
        };

        const res = await fetch(`${API_URL}/admin/coupons/create`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          totalCreated++;
        } else {
          const err = await res.text();
          console.error(`✗ Failed to create coupon for ${category.name}:`, err);
        }
      }
    }
    console.log(`Done! Created ${totalCreated} coupons.`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
