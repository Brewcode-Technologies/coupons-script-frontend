'use client';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';

export default function HomepageSkeleton() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const borderClr = isDark ? `${darkPalette.text}15` : `${siteConfig?.theme?.textColor || '#111827'}12`;
  
  const shimmerBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const shimmerHighlight = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';

  const shimmerStyle = {
    background: `linear-gradient(90deg, ${shimmerBg} 25%, ${shimmerHighlight} 50%, ${shimmerBg} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: isDark ? darkPalette.bg : (siteConfig?.theme?.backgroundColor || '#ffffff') }}>
      {/* Hero Banner Skeleton */}
      <div className="relative h-[60vh]" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', ...shimmerStyle }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="h-4 rounded w-24 mb-4" style={{ backgroundColor: primary, opacity: 0.6 }}></div>
          <div className="h-12 rounded w-3/4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}></div>
          <div className="h-4 rounded w-1/2" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}></div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 rounded w-64 mx-auto mb-4" style={shimmerStyle}></div>
          <div className="h-4 rounded w-96 mx-auto" style={shimmerStyle}></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border p-6" style={{ backgroundColor: cardBg, borderColor: borderClr }}>
              <div className="h-32 rounded mb-4" style={shimmerStyle}></div>
              <div className="h-6 rounded w-3/4 mb-2" style={shimmerStyle}></div>
              <div className="h-4 rounded w-full mb-2" style={shimmerStyle}></div>
              <div className="h-4 rounded w-2/3" style={shimmerStyle}></div>
            </div>
          ))}
        </div>

        {/* Popular Stores Section Skeleton */}
        <div className="border-t pt-12" style={{ borderColor: borderClr }}>
          <div className="h-8 rounded w-48 mb-8" style={shimmerStyle}></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="rounded-lg border p-4" style={{ backgroundColor: cardBg, borderColor: borderClr }}>
                <div className="h-12 rounded mb-2" style={shimmerStyle}></div>
                <div className="h-4 rounded w-3/4" style={shimmerStyle}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section Skeleton */}
        <div className="mt-16">
          <div className="h-8 rounded w-48 mb-8" style={shimmerStyle}></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="text-center">
                <div className="h-16 w-16 rounded-full mx-auto mb-2" style={shimmerStyle}></div>
                <div className="h-4 rounded w-full" style={shimmerStyle}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Coupons Skeleton */}
        <div className="mt-16">
          <div className="h-8 rounded w-48 mb-8" style={shimmerStyle}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border p-6" style={{ backgroundColor: cardBg, borderColor: borderClr }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded" style={shimmerStyle}></div>
                  <div className="flex-1">
                    <div className="h-5 rounded w-3/4 mb-2" style={shimmerStyle}></div>
                    <div className="h-4 rounded w-1/2" style={shimmerStyle}></div>
                  </div>
                </div>
                <div className="h-4 rounded w-full mb-2" style={shimmerStyle}></div>
                <div className="h-4 rounded w-2/3" style={shimmerStyle}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}