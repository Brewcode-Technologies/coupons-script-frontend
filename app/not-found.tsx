'use client';

import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';

export default function NotFound() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const pageBg = isDark ? darkPalette.bg : '#f8fafc';
  const textMain = isDark ? darkPalette.text : '#111827';
  const textMuted = isDark ? `${darkPalette.text}aa` : '#6b7280';

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: pageBg }}>
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4" style={{ color: primary }}>404</h1>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: textMain }}>Page Not Found</h2>
          <p className="text-base" style={{ color: textMuted }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition no-underline"
            style={{ 
              backgroundColor: primary, 
              color: 'white'
            }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          
          <Link
            href="/coupons"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition no-underline border"
            style={{ 
              color: textMain,
              borderColor: isDark ? `${darkPalette.text}30` : '#d1d5db'
            }}
          >
            <Search className="w-4 h-4" />
            Browse Coupons
          </Link>
        </div>
      </div>
    </div>
  );
}