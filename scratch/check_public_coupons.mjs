async function main() {
    const res = await fetch('http://localhost:5000/api/public/coupons/list');
    const data = await res.json();
    const coupons = data.data || data || [];
    console.log("Total public coupons fetched:", coupons.length);
    if(coupons.length > 0) {
       console.log("Sample coupon category:", coupons[0].category);
    }
}
main();
