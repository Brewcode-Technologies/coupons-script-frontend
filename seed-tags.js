const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const tags = [
  { name: "Beauty", slug: "beauty" },
  { name: "Bike Rentals", slug: "bike-rentals" },
  { name: "Bus", slug: "bus" },
  { name: "Education", slug: "education" },
  { name: "Electronics", slug: "electronics" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Eyewear", slug: "eyewear" },
  { name: "Fashion", slug: "fashion" },
  { name: "Flight", slug: "flight" },
  { name: "Food & Dining", slug: "food-dining" },
  { name: "Food & Lifestyle", slug: "food-lifestyle" },
  { name: "Footwear", slug: "footwear" },
  { name: "Furniture", slug: "furniture" },
  { name: "Gifts & Flowers", slug: "gifts-flowers" },
  { name: "Groceries", slug: "groceries" },
  { name: "Health & Personal Care", slug: "health-personal-care" },
  { name: "Home & Garden", slug: "home-garden" },
  { name: "Hosting", slug: "hosting" },
  { name: "Hotel", slug: "hotel" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Kids & Lifestyle", slug: "kids-lifestyle" },
  { name: "Kitchen Appliances", slug: "kitchen-appliances" },
  { name: "Lab Tests", slug: "lab-tests" },
  { name: "Lingerie", slug: "lingerie" },
  { name: "Meat & Dairy", slug: "meat-dairy" },
  { name: "Medicines", slug: "medicines" },
  { name: "OTT", slug: "ott" },
  { name: "Pizza", slug: "pizza" },
  { name: "Protein Supplements", slug: "protein-supplements" },
  { name: "Recharge", slug: "recharge" },
  { name: "Services", slug: "services" },
  { name: "Sports", slug: "sports" },
  { name: "Tech & Entertainment", slug: "tech-entertainment" },
  { name: "Travel", slug: "travel" },
  { name: "Utility Bill Payments", slug: "utility-bill-payments" },
];

async function seedTags() {
  // Login to get token
  let token;
  try {
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@couponsfeast.com',
      password: 'admin123'
    });
    token = loginRes.data.token;
    console.log('✅ Logged in');
  } catch (err) {
    console.error('❌ Login failed. Update email/password in this script.');
    console.error('   Error:', err.response?.data?.error || err.message);
    process.exit(1);
  }

  const headers = { Authorization: `Bearer ${token}` };

  // Get existing tags to avoid duplicates
  let existing = [];
  try {
    const res = await axios.get(`${API_URL}/public/tags/list`);
    existing = (res.data?.data || res.data || []).map(t => t.name.toLowerCase());
  } catch (e) {}

  let created = 0, skipped = 0;
  for (const tag of tags) {
    if (existing.includes(tag.name.toLowerCase())) {
      console.log(`⏭️  Skipped (exists): ${tag.name}`);
      skipped++;
      continue;
    }
    try {
      await axios.post(`${API_URL}/admin/tags/create`, tag, { headers });
      console.log(`✅ Created: ${tag.name}`);
      created++;
    } catch (err) {
      console.error(`❌ Failed: ${tag.name} -`, err.response?.data?.error || err.message);
    }
  }

  console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}, Total: ${tags.length}`);
}

seedTags();
