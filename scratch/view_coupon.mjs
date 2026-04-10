const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

async function main() {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const { token } = await loginRes.json();
    const res = await fetch(`${API_URL}/admin/coupons/list`, { headers: { 'Authorization': 'Bearer ' + token } });
    const data = await res.json();
    const coupons = data.data || data || [];
    console.log("Total admin coupons:", coupons.length);
    if(coupons.length > 0) {
       console.log("Sample coupon 1:", coupons[0]);
    }
}
main();
