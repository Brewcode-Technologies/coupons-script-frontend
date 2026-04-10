'use client';
import { useState } from 'react';
import { FONT_COMBINATIONS } from '@/utils/fontCombinations';
import { fontManager } from '@/utils/fontManager';

export default function FontTestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState<keyof typeof FONT_COMBINATIONS>('modern');

  const switchFont = (fontKey: keyof typeof FONT_COMBINATIONS) => {
    setCurrentFont(fontKey);
    fontManager.setFontCombination(fontKey);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
      >
        Font Test
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Quick Font Test</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {Object.keys(FONT_COMBINATIONS).map((key) => (
              <button
                key={key}
                onClick={() => switchFont(key as keyof typeof FONT_COMBINATIONS)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  currentFont === key
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <strong>Dev Only:</strong> Changes are temporary
          </div>
        </div>
      )}
    </div>
  );
}