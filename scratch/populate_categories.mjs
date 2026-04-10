import fs from 'fs';

const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

const COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#8b5cf6','#f97316','#06b6d4','#84cc16'];

const rawList = `Flight Coupons
Travel Coupons
Hotel Coupons
Bus Coupons
Bike Rentals Coupons
Utility Bill Payments Coupons
Recharge Coupons
Hosting Coupons
Food & Lifestyle
Pizza Coupons
Meat & Dairy Coupons
Groceries Coupons
Fashion Coupons
Footwear Coupons
Jewellery Coupons
Kids & Lifestyle Coupons
Lingerie Coupons
Gifts & Flowers Coupons
Health & Personal Care
Beauty Coupons
Medicines Coupons
Lab Tests Coupons
Protein Supplements Coupons
Services Coupons
Eyewear Coupons
Education Coupons
Tech & Entertainment
Electronics Coupons
Kitchen Appliances Coupons
Entertainment Coupons
OTT Coupons
Furniture Coupons`;

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('flight') || n.includes('travel')) return 'MdFlight';
  if (n.includes('hotel') || n.includes('home') || n.includes('furniture')) return 'MdHome';
  if (n.includes('bus') || n.includes('bike') || n.includes('car')) return 'MdDirectionsCar';
  if (n.includes('food') || n.includes('meat') || n.includes('dairy') || n.includes('restaurant')) return 'MdRestaurant';
  if (n.includes('pizza')) return 'MdLocalPizza';
  if (n.includes('grocery') || n.includes('groceries')) return 'MdShoppingCart';
  if (n.includes('fashion') || n.includes('footwear') || n.includes('jewellery') || n.includes('lingerie') || n.includes('clothing')) return 'FaTshirt';
  if (n.includes('kids') || n.includes('baby')) return 'MdChildCare';
  if (n.includes('beauty') || n.includes('health') || n.includes('medicine') || n.includes('lab') || n.includes('eyewear') || n.includes('wellness') || n.includes('gift')) return 'MdFavorite';
  if (n.includes('tech') || n.includes('electronic') || n.includes('ott') || n.includes('appliance') || n.includes('hosting')) return 'MdLaptop';
  if (n.includes('education') || n.includes('school')) return 'MdSchool';
  if (n.includes('entertainment')) return 'FaGamepad';
  if (n.includes('service') || n.includes('tool')) return 'MdBuild';
  if (n.includes('bill') || n.includes('recharge') || n.includes('finance')) return 'MdAttachMoney';
  if (n.includes('fitness') || n.includes('protein')) return 'MdFitnessCenter';
  return 'MdLocalOffer';
};

async function main() {
  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error('Login failed');
    const token = loginData.token;

    const list = rawList.split('\\n').map(l => l.trim()).filter(Boolean);
    
    // Use manual exact split list due to template literal backticks inside text replacement
    const actList = [
      "Flight Coupons",
      "Travel Coupons",
      "Hotel Coupons",
      "Bus Coupons",
      "Bike Rentals Coupons",
      "Utility Bill Payments Coupons",
      "Recharge Coupons",
      "Hosting Coupons",
      "Food & Lifestyle",
      "Pizza Coupons",
      "Meat & Dairy Coupons",
      "Groceries Coupons",
      "Fashion Coupons",
      "Footwear Coupons",
      "Jewellery Coupons",
      "Kids & Lifestyle Coupons",
      "Lingerie Coupons",
      "Gifts & Flowers Coupons",
      "Health & Personal Care",
      "Beauty Coupons",
      "Medicines Coupons",
      "Lab Tests Coupons",
      "Protein Supplements Coupons",
      "Services Coupons",
      "Eyewear Coupons",
      "Education Coupons",
      "Tech & Entertainment",
      "Electronics Coupons",
      "Kitchen Appliances Coupons",
      "Entertainment Coupons",
      "OTT Coupons",
      "Furniture Coupons"
    ];

    let categories = actList.map(item => {
      // Remove " Coupons", " Coupon" from the name
      const name = item.replace(/\\s+Coupons?/gi, '').trim();
      return name;
    });

    console.log(`Found ${categories.length} categories to create.`);

    for (let i = 0; i < categories.length; i++) {
        const name = categories[i];
        const slug = slugify(name);
        const icon = getIcon(name);
        const color = COLORS[i % COLORS.length];

        const payload = {
          name,
          slug,
          icon,
          color,
          description: '',
          hasNavLink: true,
          navLocation: 'both',
          dropdownSection: 'categories'
        };

        const res = await fetch(`${API_URL}/admin/categories/create`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          console.log(`✓ Created category: ${name}`);
        } else {
            console.log("Tried checking if it exists...");
            // Let's assume some already exist and we ignore them or print error
          const err = await res.text();
          console.error(`✗ Failed to create ${name}:`, err);
        }
    }
    console.log('Done creating categories!');

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
