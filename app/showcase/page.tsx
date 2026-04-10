'use client';
import { useState } from 'react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { getFontCombination } from '@/utils/fontCombinations';

export default function FontShowcase() {
  const { siteConfig } = useDynamicTheme();
  const [activeTab, setActiveTab] = useState('typography');
  const fontCombination = getFontCombination(siteConfig?.fonts?.combination);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CouponsScript</h1>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Stores</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Categories</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Deals</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="Search for coupons..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Font Info Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Font Showcase</h1>
          <p className="text-lg opacity-90 mb-4">
            Current combination: <strong>{siteConfig?.fonts?.combination || 'modern'}</strong>
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3">
              <div className="font-bold mb-1">Headings</div>
              <div className="font-mono text-xs opacity-75">{fontCombination.heading}</div>
            </div>
            <div className="bg-white/10 rounded p-3">
              <div className="font-bold mb-1">Body Text</div>
              <div className="font-mono text-xs opacity-75">{fontCombination.body}</div>
            </div>
            <div className="bg-white/10 rounded p-3">
              <div className="font-bold mb-1">Code</div>
              <div className="font-mono text-xs opacity-75">{fontCombination.mono}</div>
            </div>
          </div>
        </div>

        {/* Typography Examples */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Typography Examples</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-700">Heading Examples</h3>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-gray-900">H1: Massive Summer Sale - Up to 80% Off!</h1>
                <h2 className="text-3xl font-bold text-gray-800">H2: Featured Deals of the Day</h2>
                <h3 className="text-2xl font-bold text-gray-700">H3: Top Categories</h3>
                <h4 className="text-xl font-bold text-gray-600">H4: Special Offers</h4>
                <h5 className="text-lg font-bold text-gray-600">H5: Limited Time Deals</h5>
                <h6 className="text-base font-bold text-gray-500">H6: Exclusive Discounts</h6>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-700">Body Text Examples</h3>
              <div className="space-y-4">
                <p className="text-xl text-gray-800">
                  Large text: Welcome to the ultimate coupon destination! Save money on everything you love.
                </p>
                <p className="text-lg text-gray-700">
                  Medium text: Discover thousands of verified coupons, promo codes, and exclusive deals from your favorite brands.
                </p>
                <p className="text-base text-gray-600">
                  Regular text: Our platform helps millions of shoppers save money every day. Join our community and start saving on fashion, electronics, travel, dining, and more.
                </p>
                <p className="text-sm text-gray-500">
                  Small text: All coupons are verified and updated regularly. Terms and conditions apply to all offers.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-700">Code & Technical Text</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                  <code className="block text-sm">
                    // Coupon validation function<br/>
                    function validateCoupon(code, store) {'{'}<br/>
                    &nbsp;&nbsp;if (!code || code.length === 0) {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;return false;<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    &nbsp;&nbsp;return store.isValidCoupon(code);<br/>
                    {'}'}
                  </code>
                </div>
                <p className="text-base">
                  Use coupon code: <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono">SAVE20</code> at checkout for 20% off
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Cards */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Coupon Card Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">Amazon Prime Day</h3>
                  <p className="text-blue-600">Electronics & Gadgets</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600">70%</div>
                  <div className="text-sm text-gray-500">OFF</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Get massive discounts on laptops, smartphones, tablets, and smart home devices.
              </p>
              <div className="flex items-center justify-between">
                <code className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded font-mono font-bold">
                  PRIME70
                </code>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Get Deal
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Nike Flash Sale</h3>
                  <p className="text-gray-600">Shoes & Apparel</p>
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  LIMITED
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Exclusive flash sale on Nike shoes, clothing, and accessories. While supplies last!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">Free Shipping</span>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Elements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Form Elements</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select a category</option>
                <option>Fashion & Clothing</option>
                <option>Electronics</option>
                <option>Home & Garden</option>
                <option>Travel & Hotels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your experience..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}