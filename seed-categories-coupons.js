const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coupons-script');

// Define schemas (assuming these exist in your backend)
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const storeSchema = new mongoose.Schema({
  storeName: String,
  slug: String,
  logo: String,
  description: String,
  websiteUrl: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const couponSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  discount: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  category: String,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);
const Store = mongoose.model('Store', storeSchema);
const Coupon = mongoose.model('Coupon', couponSchema);

// Categories data
const categories = [
  { name: 'Flight Coupons', slug: 'flight-coupons', description: 'Save on domestic and international flights' },
  { name: 'Travel Coupons', slug: 'travel-coupons', description: 'Best deals on travel packages and bookings' },
  { name: 'Hotel Coupons', slug: 'hotel-coupons', description: 'Discounts on hotel bookings worldwide' },
  { name: 'Bus Coupons', slug: 'bus-coupons', description: 'Save on bus tickets and travel' },
  { name: 'Bike Rentals Coupons', slug: 'bike-rentals-coupons', description: 'Affordable bike rental deals' },
  { name: 'Utility Bill Payments Coupons', slug: 'utility-bill-payments-coupons', description: 'Cashback on utility bill payments' },
  { name: 'Recharge Coupons', slug: 'recharge-coupons', description: 'Mobile and DTH recharge offers' },
  { name: 'Hosting Coupons', slug: 'hosting-coupons', description: 'Web hosting and domain deals' },
  { name: 'Food & Lifestyle', slug: 'food-lifestyle', description: 'Food and lifestyle deals' },
  { name: 'Pizza Coupons', slug: 'pizza-coupons', description: 'Delicious pizza deals and offers' },
  { name: 'Meat & Dairy Coupons', slug: 'meat-dairy-coupons', description: 'Fresh meat and dairy products' },
  { name: 'Groceries Coupons', slug: 'groceries-coupons', description: 'Save on daily grocery shopping' },
  { name: 'Fashion Coupons', slug: 'fashion-coupons', description: 'Latest fashion trends and deals' },
  { name: 'Footwear Coupons', slug: 'footwear-coupons', description: 'Shoes and footwear discounts' },
  { name: 'Jewellery Coupons', slug: 'jewellery-coupons', description: 'Beautiful jewelry at great prices' },
  { name: 'Kids & Lifestyle Coupons', slug: 'kids-lifestyle-coupons', description: 'Everything for kids and family' },
  { name: 'Lingerie Coupons', slug: 'lingerie-coupons', description: 'Intimate wear and lingerie deals' },
  { name: 'Gifts & Flowers Coupons', slug: 'gifts-flowers-coupons', description: 'Perfect gifts and fresh flowers' },
  { name: 'Health & Personal Care', slug: 'health-personal-care', description: 'Health and personal care products' },
  { name: 'Beauty Coupons', slug: 'beauty-coupons', description: 'Beauty products and cosmetics' },
  { name: 'Medicines Coupons', slug: 'medicines-coupons', description: 'Healthcare and medicine discounts' },
  { name: 'Lab Tests Coupons', slug: 'lab-tests-coupons', description: 'Medical tests and health checkups' },
  { name: 'Protein Supplements Coupons', slug: 'protein-supplements-coupons', description: 'Fitness and protein supplements' },
  { name: 'Services Coupons', slug: 'services-coupons', description: 'Various service providers' },
  { name: 'Eyewear Coupons', slug: 'eyewear-coupons', description: 'Glasses and contact lenses' },
  { name: 'Education Coupons', slug: 'education-coupons', description: 'Online courses and education' },
  { name: 'Tech & Entertainment', slug: 'tech-entertainment', description: 'Technology and entertainment deals' },
  { name: 'Electronics Coupons', slug: 'electronics-coupons', description: 'Latest gadgets and electronics' },
  { name: 'Kitchen Appliances Coupons', slug: 'kitchen-appliances-coupons', description: 'Kitchen gadgets and appliances' },
  { name: 'Entertainment Coupons', slug: 'entertainment-coupons', description: 'Movies, games, and entertainment' },
  { name: 'OTT Coupons', slug: 'ott-coupons', description: 'Streaming services and subscriptions' },
  { name: 'Furniture Coupons', slug: 'furniture-coupons', description: 'Home and office furniture' }
];

// Stores data
const stores = [
  { storeName: 'Flipkart', slug: 'flipkart', description: 'India\'s leading e-commerce platform', websiteUrl: 'https://www.flipkart.com' },
  { storeName: 'Amazon', slug: 'amazon', description: 'World\'s largest online marketplace', websiteUrl: 'https://www.amazon.in' },
  { storeName: 'Myntra', slug: 'myntra', description: 'Fashion and lifestyle destination', websiteUrl: 'https://www.myntra.com' },
  { storeName: 'Apple', slug: 'apple', description: 'Premium technology and devices', websiteUrl: 'https://www.apple.com' },
  { storeName: 'IKEA', slug: 'ikea', description: 'Furniture and home accessories', websiteUrl: 'https://www.ikea.com' },
  { storeName: 'MakeMyTrip', slug: 'makemytrip', description: 'Travel booking and services', websiteUrl: 'https://www.makemytrip.com' },
  { storeName: 'Nykaa', slug: 'nykaa', description: 'Beauty and cosmetics store', websiteUrl: 'https://www.nykaa.com' },
  { storeName: 'H&M', slug: 'hm', description: 'Fashion and clothing brand', websiteUrl: 'https://www2.hm.com' },
  { storeName: 'Adidas', slug: 'adidas', description: 'Sports and athletic wear', websiteUrl: 'https://www.adidas.co.in' },
  { storeName: 'Nike', slug: 'nike', description: 'Sports footwear and apparel', websiteUrl: 'https://www.nike.com' },
  { storeName: 'Zomato', slug: 'zomato', description: 'Food delivery and dining', websiteUrl: 'https://www.zomato.com' },
  { storeName: 'Swiggy', slug: 'swiggy', description: 'Food delivery service', websiteUrl: 'https://www.swiggy.com' }
];

// Coupon templates for different categories
const couponTemplates = {
  'Flight Coupons': [
    { title: 'Flat ₹2000 Off on Domestic Flights', discount: '₹2000 OFF', code: 'FLIGHT2000' },
    { title: 'Up to 25% Off on International Flights', discount: '25% OFF', code: 'INTL25' },
    { title: 'Book 2 Get 1 Free on Group Bookings', discount: 'Buy 2 Get 1', code: 'GROUP3' },
    { title: 'Extra 15% Off on Weekend Flights', discount: '15% OFF', code: 'WEEKEND15' },
    { title: 'Flat ₹1500 Cashback on First Flight', discount: '₹1500 Cashback', code: 'FIRST1500' },
    { title: 'Up to 30% Off on Business Class', discount: '30% OFF', code: 'BUSINESS30' },
    { title: 'Student Discount - 20% Off', discount: '20% OFF', code: 'STUDENT20' },
    { title: 'Senior Citizen Special - 18% Off', discount: '18% OFF', code: 'SENIOR18' },
    { title: 'Early Bird Offer - 22% Off', discount: '22% OFF', code: 'EARLY22' },
    { title: 'Last Minute Deals - ₹3000 Off', discount: '₹3000 OFF', code: 'LASTMIN3000' }
  ],
  'Travel Coupons': [
    { title: 'Flat 40% Off on Travel Packages', discount: '40% OFF', code: 'TRAVEL40' },
    { title: 'Honeymoon Special - ₹5000 Off', discount: '₹5000 OFF', code: 'HONEY5000' },
    { title: 'Family Package - 35% Off', discount: '35% OFF', code: 'FAMILY35' },
    { title: 'Adventure Tours - 30% Off', discount: '30% OFF', code: 'ADVENTURE30' },
    { title: 'Weekend Getaway - ₹2000 Off', discount: '₹2000 OFF', code: 'WEEKEND2000' },
    { title: 'International Tours - 45% Off', discount: '45% OFF', code: 'INTLTOUR45' },
    { title: 'Hill Station Special - 25% Off', discount: '25% OFF', code: 'HILLS25' },
    { title: 'Beach Holiday - ₹3000 Off', discount: '₹3000 OFF', code: 'BEACH3000' },
    { title: 'Cultural Tours - 20% Off', discount: '20% OFF', code: 'CULTURE20' },
    { title: 'Pilgrimage Tours - 15% Off', discount: '15% OFF', code: 'PILGRIM15' }
  ],
  'Hotel Coupons': [
    { title: 'Luxury Hotels - 50% Off', discount: '50% OFF', code: 'LUXURY50' },
    { title: 'Budget Hotels - ₹1000 Off', discount: '₹1000 OFF', code: 'BUDGET1000' },
    { title: 'Resort Booking - 35% Off', discount: '35% OFF', code: 'RESORT35' },
    { title: 'Business Hotels - 25% Off', discount: '25% OFF', code: 'BUSINESS25' },
    { title: 'Extended Stay - 40% Off', discount: '40% OFF', code: 'STAY40' },
    { title: 'Weekend Booking - ₹1500 Off', discount: '₹1500 OFF', code: 'WKEND1500' },
    { title: 'Last Minute Hotel - 30% Off', discount: '30% OFF', code: 'LASTHOTEL30' },
    { title: 'Group Booking - ₹2500 Off', discount: '₹2500 OFF', code: 'GROUPHOTEL' },
    { title: 'Premium Suites - 45% Off', discount: '45% OFF', code: 'SUITE45' },
    { title: 'Spa Hotels - 20% Off', discount: '20% OFF', code: 'SPA20' }
  ],
  'Fashion Coupons': [
    { title: 'Flat 50% Off on All Fashion', discount: '50% OFF', code: 'FASHION50' },
    { title: 'Buy 2 Get 1 Free on Clothing', discount: 'Buy 2 Get 1', code: 'CLOTH3' },
    { title: 'Extra 30% Off on Sale Items', discount: '30% OFF', code: 'SALE30' },
    { title: 'Flat ₹1000 Off on ₹3000+', discount: '₹1000 OFF', code: 'STYLE1000' },
    { title: 'Up to 60% Off on Winter Collection', discount: '60% OFF', code: 'WINTER60' },
    { title: 'New User Special - 40% Off', discount: '40% OFF', code: 'NEW40' },
    { title: 'Weekend Flash Sale - 45% Off', discount: '45% OFF', code: 'FLASH45' },
    { title: 'Ethnic Wear - Up to 55% Off', discount: '55% OFF', code: 'ETHNIC55' },
    { title: 'Designer Collection - 35% Off', discount: '35% OFF', code: 'DESIGNER35' },
    { title: 'Clearance Sale - Up to 70% Off', discount: '70% OFF', code: 'CLEAR70' }
  ],
  'Electronics Coupons': [
    { title: 'Flat ₹5000 Off on Electronics', discount: '₹5000 OFF', code: 'TECH5000' },
    { title: 'Up to 40% Off on Smartphones', discount: '40% OFF', code: 'MOBILE40' },
    { title: 'Laptop Deals - Extra 25% Off', discount: '25% OFF', code: 'LAPTOP25' },
    { title: 'Gaming Console - ₹3000 Cashback', discount: '₹3000 Cashback', code: 'GAME3000' },
    { title: 'Smart TV - Up to 35% Off', discount: '35% OFF', code: 'TV35' },
    { title: 'Headphones - Buy 1 Get 1 Free', discount: 'Buy 1 Get 1', code: 'AUDIO2' },
    { title: 'Camera Equipment - 30% Off', discount: '30% OFF', code: 'CAMERA30' },
    { title: 'Home Appliances - ₹2000 Off', discount: '₹2000 OFF', code: 'HOME2000' },
    { title: 'Wearables - Flat 45% Off', discount: '45% OFF', code: 'WEAR45' },
    { title: 'Accessories - Up to 50% Off', discount: '50% OFF', code: 'ACCESS50' }
  ],
  'Beauty Coupons': [
    { title: 'Beauty Products - 40% Off', discount: '40% OFF', code: 'BEAUTY40' },
    { title: 'Skincare Range - ₹800 Off', discount: '₹800 OFF', code: 'SKIN800' },
    { title: 'Makeup Kit - Buy 1 Get 1', discount: 'Buy 1 Get 1', code: 'MAKEUP2' },
    { title: 'Premium Brands - 35% Off', discount: '35% OFF', code: 'PREMIUM35' },
    { title: 'Hair Care - 25% Off', discount: '25% OFF', code: 'HAIR25' },
    { title: 'Fragrance - ₹1200 Off', discount: '₹1200 OFF', code: 'FRAGRANCE' },
    { title: 'Organic Beauty - 30% Off', discount: '30% OFF', code: 'ORGANIC30' },
    { title: 'Men\'s Grooming - 20% Off', discount: '20% OFF', code: 'MENS20' },
    { title: 'Bridal Makeup - 45% Off', discount: '45% OFF', code: 'BRIDAL45' },
    { title: 'Anti-Aging - ₹1500 Off', discount: '₹1500 OFF', code: 'ANTIAGE' }
  ],
  'Food & Lifestyle': [
    { title: 'Food Delivery - 30% Off', discount: '30% OFF', code: 'FOOD30' },
    { title: 'Restaurant Deals - ₹500 Off', discount: '₹500 OFF', code: 'DINE500' },
    { title: 'Healthy Food - 25% Off', discount: '25% OFF', code: 'HEALTHY25' },
    { title: 'Gourmet Meals - 40% Off', discount: '40% OFF', code: 'GOURMET40' },
    { title: 'Fast Food - Buy 1 Get 1', discount: 'Buy 1 Get 1', code: 'FAST2' },
    { title: 'Organic Food - 35% Off', discount: '35% OFF', code: 'ORGANIC35' },
    { title: 'Desserts - ₹300 Off', discount: '₹300 OFF', code: 'SWEET300' },
    { title: 'Beverages - 20% Off', discount: '20% OFF', code: 'DRINK20' },
    { title: 'Party Orders - ₹1000 Off', discount: '₹1000 OFF', code: 'PARTY1000' },
    { title: 'Late Night - 15% Off', discount: '15% OFF', code: 'NIGHT15' }
  ]
};

// Generate coupons for each store and category
function generateCoupons(stores, categories) {
  const coupons = [];
  
  // Generate store-specific coupons
  stores.forEach(store => {
    for (let i = 1; i <= 10; i++) {
      const discounts = ['10% OFF', '15% OFF', '20% OFF', '25% OFF', '30% OFF', '₹500 OFF', '₹1000 OFF', 'Buy 1 Get 1', '₹200 Cashback', '₹300 Cashback'];
      const codes = [`${store.slug.toUpperCase()}${i}0`, `SAVE${i}0`, `${store.slug.toUpperCase()}DEAL${i}`, `OFFER${i}${i}`, `${store.slug.toUpperCase()}${i*5}`];
      
      coupons.push({
        title: `${store.storeName} Special Offer ${i}`,
        description: `Exclusive ${discounts[i-1]} discount on ${store.storeName} products. Limited time offer!`,
        code: codes[i-1],
        discount: discounts[i-1],
        store: store._id,
        category: 'General',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isFeatured: i <= 3
      });
    }
  });

  // Generate category-specific coupons
  categories.forEach(category => {
    const template = couponTemplates[category.name] || couponTemplates['Fashion Coupons'];
    
    template.forEach((coupon, index) => {
      coupons.push({
        title: coupon.title,
        description: `${coupon.title} - Valid on ${category.name.replace(' Coupons', '')} category`,
        code: coupon.code,
        discount: coupon.discount,
        category: category.name,
        expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        isFeatured: index < 2
      });
    });
  });

  return coupons;
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Store.deleteMany({});
    await Coupon.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${insertedCategories.length} categories`);

    // Insert stores
    const insertedStores = await Store.insertMany(stores);
    console.log(`✅ Created ${insertedStores.length} stores`);

    // Generate and insert coupons
    const coupons = generateCoupons(insertedStores, insertedCategories);
    const insertedCoupons = await Coupon.insertMany(coupons);
    console.log(`✅ Created ${insertedCoupons.length} coupons`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${insertedCategories.length}`);
    console.log(`   - Stores: ${insertedStores.length}`);
    console.log(`   - Coupons: ${insertedCoupons.length}`);
    console.log(`\n📋 Categories created:`);
    insertedCategories.forEach(cat => console.log(`   ✓ ${cat.name}`));
    console.log(`\n🏪 Stores created:`);
    insertedStores.forEach(store => console.log(`   ✓ ${store.storeName}`));

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeder
seedDatabase();