'use client';
import { useRef, useState, useEffect, ReactNode } from 'react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';

interface Props {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  skeleton?: 'cards' | 'grid' | 'coupons' | 'banner' | 'stores';
}

function Skeleton({ type }: { type: string }) {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const textColor = isDark ? darkPalette.text : (siteConfig?.theme?.textColor || '#111827');
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const borderClr = isDark ? `${darkPalette.text}15` : `${textColor}12`;
  
  const shimmerBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const shimmerHighlight = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';

  const shimmerStyle = {
    background: `linear-gradient(90deg, ${shimmerBg} 25%, ${shimmerHighlight} 50%, ${shimmerBg} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  };

  if (type === 'banner') return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-[200px] w-full rounded-2xl" style={{ ...shimmerStyle, backgroundColor: cardBg }} />
    </div>
  );

  if (type === 'cards') return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-48 mb-6 rounded" style={shimmerStyle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[280px] rounded-xl" style={{ ...shimmerStyle, backgroundColor: cardBg }} />
        ))}
      </div>
    </div>
  );

  if (type === 'coupons') return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-64 mb-4 rounded" style={shimmerStyle} />
      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 w-24 rounded-full" style={shimmerStyle} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-[180px] rounded-xl" style={{ ...shimmerStyle, backgroundColor: cardBg }} />
        ))}
      </div>
    </div>
  );

  if (type === 'stores') return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-48 rounded" style={shimmerStyle} />
        <div className="flex items-center gap-3">
          {/* Column switcher skeleton */}
          <div className="flex items-center gap-1 border rounded-md overflow-hidden" style={{ borderColor: borderClr }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="p-2">
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: i + 2 }).map((_, j) => (
                    <div key={j} className="w-[3px] h-3.5 rounded-[1px]" style={shimmerStyle} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Navigation buttons */}
          <div className="w-8 h-8 rounded-full border" style={{ borderColor: borderClr, backgroundColor: cardBg, ...shimmerStyle }} />
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-2 w-2 rounded-full" style={shimmerStyle} />
            ))}
          </div>
          <div className="w-8 h-8 rounded-full border" style={{ borderColor: borderClr, backgroundColor: cardBg, ...shimmerStyle }} />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Featured store card skeleton */}
        <div className="hidden lg:flex w-[280px] xl:w-[320px] shrink-0">
          <div className="rounded-2xl overflow-hidden border w-full" style={{ backgroundColor: '#000', borderColor: borderClr, height: 400 }}>
            {/* Background image area */}
            <div className="relative overflow-hidden h-[140px]">
              <div className="w-full h-full" style={{ ...shimmerStyle, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              {/* Badge and title overlay */}
              <div className="absolute top-4 left-4 z-10">
                <div className="h-3 w-20 rounded mb-2" style={{ backgroundColor: primary, opacity: 0.8 }} />
                <div className="h-4 w-32 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }} />
              </div>
            </div>
            {/* Logo area */}
            <div className="relative z-10 px-4 -mt-[18px]">
              <div className="w-11 h-11 rounded-full border-2" style={{ backgroundColor: '#ffffff', borderColor: borderClr, ...shimmerStyle }} />
            </div>
            {/* Content area */}
            <div className="px-4 pt-2 pb-4">
              <div className="h-5 w-24 rounded mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }} />
              <div className="h-3 w-32 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>

        {/* Store grid skeleton */}
        <div className="flex-1 grid gap-5" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <div key={i} className="text-center">
              <div className="rounded-2xl overflow-hidden h-20 mb-2" style={{ backgroundColor: cardBg, boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', ...shimmerStyle }} />
              <div className="h-4 w-3/4 mx-auto rounded" style={shimmerStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Default grid
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-52 mb-6 rounded" style={shimmerStyle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[200px] rounded-xl" style={{ ...shimmerStyle, backgroundColor: cardBg }} />
        ))}
      </div>
    </div>
  );
}

export default function LazySection({ children, className = '', threshold = 0.1, rootMargin = '200px', skeleton = 'grid' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <div className="animate-sectionIn">{children}</div>
      ) : (
        <Skeleton type={skeleton} />
      )}
    </div>
  );
}
