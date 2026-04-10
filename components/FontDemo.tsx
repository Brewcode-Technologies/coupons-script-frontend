'use client';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { getFontCombination } from '@/utils/fontCombinations';

export default function FontDemo() {
  const { siteConfig } = useDynamicTheme();
  const fontCombination = getFontCombination(siteConfig?.fonts?.combination);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Font Combination Demo</h1>
        <p className="text-lg text-gray-600">
          Current combination: <strong>{siteConfig?.fonts?.combination || 'modern'}</strong>
        </p>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm">
            <strong>Heading:</strong> {fontCombination.heading}<br/>
            <strong>Body:</strong> {fontCombination.body}<br/>
            <strong>Code:</strong> {fontCombination.mono}
          </p>
        </div>
      </div>

      {/* Heading Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Heading Examples</h2>
        <h1 className="text-4xl font-bold">H1: Save Big with Our Coupons!</h1>
        <h2 className="text-3xl font-bold">H2: Top Deals of the Day</h2>
        <h3 className="text-2xl font-bold">H3: Featured Stores</h3>
        <h4 className="text-xl font-bold">H4: Special Offers</h4>
        <h5 className="text-lg font-bold">H5: Limited Time Deals</h5>
        <h6 className="text-base font-bold">H6: Exclusive Discounts</h6>
      </section>

      {/* Body Text Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Body Text Examples</h2>
        <p className="text-lg">
          Welcome to our amazing coupon marketplace! Find the best deals, discounts, and promo codes from your favorite brands.
        </p>
        <p className="text-base">
          Our platform offers thousands of verified coupons that can help you save money on everything from fashion and electronics to travel and dining. Whether you're looking for a specific store or browsing for the best deals, we've got you covered.
        </p>
        <p className="text-sm">
          Join millions of smart shoppers who use our service to save money every day. Start exploring our deals and see how much you can save!
        </p>
      </section>

      {/* Code Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Code & Technical Text</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
          <code className="block">
            {`// Coupon validation function
function validateCoupon(code) {
  return code.length > 0 && !code.expired;
}`}
          </code>
        </div>
        <p>
          Use coupon code: <code className="bg-gray-200 px-2 py-1 rounded">SAVE20</code> at checkout
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`{
  "coupon": {
    "code": "WELCOME10",
    "discount": "10%",
    "expires": "2024-12-31"
  }
}`}
        </pre>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Real Application Examples</h2>
        
        {/* Coupon Card Example */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-xl font-bold mb-2">Amazon Prime Day Sale</h3>
          <p className="text-gray-600 mb-4">
            Get up to 50% off on electronics, home goods, and more during Amazon's biggest sale event of the year.
          </p>
          <div className="flex items-center justify-between">
            <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono">PRIME50</code>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
              Get Deal
            </button>
          </div>
        </div>

        {/* Navigation Example */}
        <nav className="bg-purple-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">CouponsScript</h1>
            <div className="space-x-6">
              <a href="#" className="hover:text-purple-200">Home</a>
              <a href="#" className="hover:text-purple-200">Stores</a>
              <a href="#" className="hover:text-purple-200">Categories</a>
              <a href="#" className="hover:text-purple-200">Deals</a>
            </div>
          </div>
        </nav>

        {/* Article Example */}
        <article className="prose max-w-none">
          <h2>How to Save Money with Coupons</h2>
          <p>
            Saving money with coupons is easier than ever. Here are some tips to maximize your savings:
          </p>
          <ol>
            <li>Always check for coupon codes before making a purchase</li>
            <li>Sign up for store newsletters to get exclusive deals</li>
            <li>Use cashback apps in combination with coupons</li>
            <li>Follow your favorite brands on social media for flash sales</li>
          </ol>
          <blockquote>
            "The best time to save money is before you spend it." - Smart Shopper
          </blockquote>
        </article>
      </section>
    </div>
  );
}