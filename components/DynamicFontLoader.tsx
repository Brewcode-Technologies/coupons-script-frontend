'use client';
import { useEffect } from 'react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { getFontCombination, getFontUrl, type FontCombination } from '@/utils/fontCombinations';
import { fontManager } from '@/utils/fontManager';

export default function DynamicFontLoader() {
  const { siteConfig } = useDynamicTheme();

  useEffect(() => {
    // Initialize font manager
    fontManager.initialize();
    
    return () => {
      fontManager.destroy();
    };
  }, []);

  useEffect(() => {
    if (!siteConfig?.fonts?.combination) return;

    const combination = siteConfig.fonts.combination as FontCombination;
    const fontUrl = getFontUrl(combination);

    // Load Google Fonts if URL exists
    if (fontUrl) {
      const fontId = `dynamic-font-${combination}`;
      
      // Remove existing font links
      const existingLinks = document.querySelectorAll('link[id^="dynamic-font-"]');
      existingLinks.forEach(link => {
        if (link.id !== fontId) {
          link.remove();
        }
      });

      // Add new font link if not already present
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = fontUrl;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);

        // Apply fonts after loading
        link.onload = () => {
          fontManager.setFontCombination(combination);
        };
      } else {
        // Font already loaded, apply immediately
        fontManager.setFontCombination(combination);
      }
    } else {
      // No external fonts needed (system fonts)
      fontManager.setFontCombination(combination);
    }

    console.log('Loading font combination:', combination);

  }, [siteConfig?.fonts?.combination]);

  return null;
}