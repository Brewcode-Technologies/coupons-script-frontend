const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coupons-script');

// Define schema
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

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...\n');

    // Check categories
    const categories = await Category.find({}).sort({ name: 1 });
    console.log(`📂 Categories found: ${categories.length}`);
    if (categories.length > 0) {
      console.log('Categories list:');
      categories.forEach((cat, index) => {
        console.log(`   ${index + 1}. ${cat.name} (${cat.slug})`);
      });
    } else {
      console.log('❌ No categories found in database!');
      console.log('💡 Run: npm run seed:categories');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Check stores
    const stores = await Store.find({}).sort({ storeName: 1 });
    console.log(`🏪 Stores found: ${stores.length}`);
    if (stores.length > 0) {
      console.log('Stores list:');
      stores.forEach((store, index) => {
        console.log(`   ${index + 1}. ${store.storeName} (${store.slug})`);
      });
    } else {
      console.log('❌ No stores found in database!');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Check coupons
    const coupons = await Coupon.find({});
    console.log(`🎫 Coupons found: ${coupons.length}`);
    
    if (coupons.length > 0) {
      // Group by category
      const couponsByCategory = {};
      const couponsByStore = {};
      
      coupons.forEach(coupon => {
        if (coupon.category) {
          couponsByCategory[coupon.category] = (couponsByCategory[coupon.category] || 0) + 1;
        }
        if (coupon.store) {
          couponsByStore[coupon.store] = (couponsByStore[coupon.store] || 0) + 1;
        }
      });

      console.log('\nCoupons by category:');
      Object.entries(couponsByCategory).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} coupons`);
      });

      console.log(`\nCoupons by store: ${Object.keys(couponsByStore).length} stores have coupons`);
    } else {
      console.log('❌ No coupons found in database!');
    }

    console.log('\n' + '='.repeat(50) + '\n');
    console.log('✅ Database check completed!');

  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the check
checkDatabase();