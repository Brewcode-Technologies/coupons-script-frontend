'use client';
import { useState } from 'react';
import { getFontCombination, FONT_COMBINATIONS } from '@/utils/fontCombinations';

export default function FontTestPage() {
  const [selectedFont, setSelectedFont] = useState<keyof typeof FONT_COMBINATIONS>('modern');
  const currentFonts = getFontCombination(selectedFont);

  const applyFont = (fontKey: keyof typeof FONT_COMBINATIONS) => {
    setSelectedFont(fontKey);
    const fonts = getFontCombination(fontKey);
    
    // Apply to CSS variables immediately
    document.documentElement.style.setProperty('--heading-font', fonts.heading);
    document.documentElement.style.setProperty('--body-font', fonts.body);
    document.documentElement.style.setProperty('--mono-font', fonts.mono);
    
    // Force immediate application
    document.body.style.fontFamily = fonts.body;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Font Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Font Combination Test</h1>
          <p className="text-gray-600 mb-6">
            Click on any font combination below to see instant changes across the entire page.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(FONT_COMBINATIONS).map(([key, fonts]) => (
              <button
                key={key}
                onClick={() => applyFont(key as keyof typeof FONT_COMBINATIONS)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedFont === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-bold capitalize mb-1">{key}</div>
                <div className="text-xs text-gray-500">
                  {key === 'modern' && 'Inter + Roboto'}
                  {key === 'classic' && 'Playfair + Source Sans'}
                  {key === 'minimal' && 'Poppins + Open Sans'}
                  {key === 'elegant' && 'Crimson + Lato'}
                  {key === 'tech' && 'JetBrains + IBM Plex'}
                  {key === 'friendly' && 'Nunito + Nunito Sans'}
                  {key === 'professional' && 'Merriweather + PT Sans'}
                  {key === 'creative' && 'Montserrat + Raleway'}
                  {key === 'clean' && 'System Fonts'}
                  {key === 'bold' && 'Oswald + Roboto Condensed'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Current Font Stack:</h3>
            <div className="text-sm space-y-1">
              <div><strong>Headings:</strong> <code className="bg-white px-2 py-1 rounded">{currentFonts.heading}</code></div>
              <div><strong>Body:</strong> <code className="bg-white px-2 py-1 rounded">{currentFonts.body}</code></div>
              <div><strong>Code:</strong> <code className="bg-white px-2 py-1 rounded">{currentFonts.mono}</code></div>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Typography Examples */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Typography Examples</h2>
            
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">H1: Big Sale Event!</h1>
                <h2 className="text-3xl font-bold">H2: Featured Deals</h2>
                <h3 className="text-2xl font-bold">H3: Top Categories</h3>
                <h4 className="text-xl font-bold">H4: Special Offers</h4>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg">Large text: Welcome to our coupon marketplace!</p>
                <p className="text-base">Regular text: Find amazing deals and discounts from top brands.</p>
                <p className="text-sm">Small text: Save money on your favorite products.</p>
              </div>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded">
                <code className="block">
                  // Code example<br/>
                  function applyCoupon(code) {'{'}<br/>
                  &nbsp;&nbsp;return validateCode(code);<br/>
                  {'}'}
                </code>
              </div>
            </div>
          </div>

          {/* Coupon Card Example */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Coupon Card Example</h2>
            
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">Amazon Prime Day</h3>
                  <p className="text-blue-600">Up to 70% off electronics</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">50% OFF</div>
                  <div className="text-sm text-gray-500">Limited time</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Get incredible discounts on laptops, smartphones, headphones, and more during Amazon's biggest sale event.
              </p>
              
              <div className="flex items-center justify-between">
                <code className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded font-mono font-bold">
                  PRIME50
                </code>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Deal
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-bold mb-2">How to use:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "Get Deal" to visit Amazon</li>
                <li>Add eligible items to your cart</li>
                <li>Apply coupon code <code className="bg-white px-1 rounded">PRIME50</code> at checkout</li>
                <li>Enjoy your savings!</li>
              </ol>
            </div>
          </div>
        </div>
        
        {/* Navigation Example */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <nav className="bg-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">CouponsScript</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-purple-200 transition-colors">Home</a>
                <a href="#" className="hover:text-purple-200 transition-colors">Stores</a>
                <a href="#" className="hover:text-purple-200 transition-colors">Categories</a>
                <a href="#" className="hover:text-purple-200 transition-colors">Deals</a>
                <a href="#" className="hover:text-purple-200 transition-colors">Blog</a>
              </div>
              <button className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors">
                Sign Up
              </button>
            </div>
          </nav>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-gray-600 mb-4">
              This is how your navigation and content will look with the selected font combination. 
              Notice how the headings, body text, and code elements all use different fonts from the same family.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Deals
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}