import fs from 'fs';

const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

const brandImages = {
  'Nike': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'Adidas': 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
  'H&M': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
  'Nykaa': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
  'MakeMyTrip': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  'IKEA': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'Apple': 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
  'Flipkart': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
  'Amazon': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
  'Myntra': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
};

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
    if (!loginRes.ok) throw new Error('Login failed');
    const token = loginData.token;

    // 2. Fetch all deals
    console.log('Fetching deals...');
    const dealsRes = await fetch(`${API_URL}/admin/deals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const dealsData = await dealsRes.json();
    let deals = dealsData.data || dealsData || [];
    
    // We only care about the deals whose title matches one of the brands
    let count = 0;
    for (const deal of deals) {
      let matchedBrand = null;
      for (const brand of Object.keys(brandImages)) {
        if (deal.title.includes(brand)) {
          matchedBrand = brand;
          break;
        }
      }

      if (matchedBrand) {
        if (deal.image !== brandImages[matchedBrand]) {
          const updateData = { ...deal, image: brandImages[matchedBrand] };
          if (updateData.store && updateData.store._id) {
            updateData.store = updateData.store._id;
          }
          
          const updateRes = await fetch(`${API_URL}/admin/deals/update/${deal._id}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
          });
          
          if (updateRes.ok) {
            console.log(`✓ Updated image for deal: ${deal.title}`);
            count++;
          } else {
            const err = await updateRes.text();
            console.error(`✗ Failed updating deal ${deal.title}:`, err);
          }
        }
      }
    }
    console.log(`Done! Updated ${count} deals with images.`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
