'use client';
import { useState } from 'react';
import { FONT_COMBINATIONS } from '@/utils/fontCombinations';
import { fontManager } from '@/utils/fontManager';

export default function FloatingFontSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState<keyof typeof FONT_COMBINATIONS>('modern');

  const switchFont = (fontKey: keyof typeof FONT_COMBINATIONS) => {
    setCurrentFont(fontKey);
    fontManager.setFontCombination(fontKey);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
        title="Font Switcher"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium hidden sm:block">Fonts</span>
      </button>

      {/* Font Options Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Font Combinations</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            Current: <span className="font-medium text-blue-600">{currentFont}</span>
          </div>
          
          <div className="space-y-2">
            {Object.entries(FONT_COMBINATIONS).map(([key, fonts]) => (
              <button
                key={key}
                onClick={() => switchFont(key as keyof typeof FONT_COMBINATIONS)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  currentFont === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-bold text-sm capitalize mb-1" style={{ fontFamily: fonts.heading }}>
                  {key}
                </div>
                <div className="text-xs text-gray-600" style={{ fontFamily: fonts.body }}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {key === 'modern' && 'Inter + Roboto + Fira Code'}
                  {key === 'classic' && 'Playfair Display + Source Sans Pro'}
                  {key === 'minimal' && 'Poppins + Open Sans + Consolas'}
                  {key === 'elegant' && 'Crimson Text + Lato + Courier New'}
                  {key === 'tech' && 'JetBrains Mono + IBM Plex Sans'}
                  {key === 'friendly' && 'Nunito + Nunito Sans + Source Code Pro'}
                  {key === 'professional' && 'Merriweather + PT Sans + Menlo'}
                  {key === 'creative' && 'Montserrat + Raleway + SF Mono'}
                  {key === 'clean' && 'System UI + Apple System + UI Monospace'}
                  {key === 'bold' && 'Oswald + Roboto Condensed + Roboto Mono'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-xs text-yellow-800">
              <strong>Note:</strong> Changes are temporary. Use Admin Panel → CMS → Typography to save permanently.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}