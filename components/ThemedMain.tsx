'use client';
import { useTheme } from '@/components/ThemeProvider';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';

export default function ThemedMain({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const { siteConfig } = useDynamicTheme();
  const isDark = theme === 'dark';
  
  // Get navbar layout to determine appropriate padding for fixed navbars
  const navbarLayout = siteConfig?.navbar?.layout || 'navbar4';
  
  const getPaddingClass = () => {
    switch (navbarLayout) {
      case 'navbar1':
        return 'pt-16'; // ~64px
      case 'navbar2':
        return 'pt-16'; // ~64px
      case 'navbar3':
        return 'pt-0'; // No padding needed since navbar is sticky, not fixed
      case 'navbar4':
        return 'pt-28'; // ~112px (already fixed)
      default:
        return 'pt-16';
    }
  };

  return (
    <main className={`min-h-screen ${getPaddingClass()}`}>
      {children}
    </main>
  );
}
