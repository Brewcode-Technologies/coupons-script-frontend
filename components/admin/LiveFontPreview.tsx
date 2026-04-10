'use client';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { getFontCombination } from '@/utils/fontCombinations';

export default function LiveFontPreview() {
  const { siteConfig } = useDynamicTheme();
  const fontCombination = getFontCombination(siteConfig?.fonts?.combination);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-blue-800">Live Font Preview</h3>
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
          {siteConfig?.fonts?.combination || 'modern'}
        </span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Heading Preview */}
        <div className="bg-white rounded-lg p-3 border">
          <div className="text-xs text-gray-500 mb-1">Headings</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Big Sale!</h1>
          <h2 className="text-lg font-bold text-gray-700 mb-1">Top Deals</h2>
          <h3 className="text-base font-bold text-gray-600">Categories</h3>
          <div className="text-xs text-gray-400 mt-2 font-mono">{fontCombination.heading}</div>
        </div>

        {/* Body Text Preview */}
        <div className="bg-white rounded-lg p-3 border">
          <div className="text-xs text-gray-500 mb-1">Body Text</div>
          <p className="text-base text-gray-800 mb-2">Welcome to our marketplace!</p>
          <p className="text-sm text-gray-600 mb-2">Find amazing deals and discounts.</p>
          <p className="text-xs text-gray-500">Save money on your purchases.</p>
          <div className="text-xs text-gray-400 mt-2 font-mono">{fontCombination.body}</div>
        </div>

        {/* Code Preview */}
        <div className="bg-white rounded-lg p-3 border">
          <div className="text-xs text-gray-500 mb-1">Code & Technical</div>
          <div className="bg-gray-900 text-green-400 p-2 rounded text-sm mb-2">
            <code>function save() {'{'}<br/>&nbsp;&nbsp;return true;<br/>{'}'}</code>
          </div>
          <p className="text-sm">Coupon: <code className="bg-yellow-100 px-1 rounded">SAVE20</code></p>
          <div className="text-xs text-gray-400 mt-2 font-mono">{fontCombination.mono}</div>
        </div>
      </div>
    </div>
  );
}