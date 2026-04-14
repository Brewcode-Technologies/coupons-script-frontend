'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import StoresDropdown from '@/components/layout/StoresDropdown';
import { getImageUrl } from '@/utils/serverUrl';

interface NavLink { name: string; url: string; hasDropdown?: boolean; }

interface NavbarThreeProps {
  navLinks: NavLink[];
  config: any;
}

export default function NavbarThree({ navLinks, config }: NavbarThreeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { siteConfig, darkPalette } = useDynamicTheme();
  const pathname = usePathname();

  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const secondary = siteConfig?.theme?.secondaryColor || '#9333ea';
  const accent = (siteConfig?.theme as any)?.accentColor || '#f59e0b';
  const siteName = siteConfig?.siteName || 'Coupons Script';
  const logoUrl = siteConfig?.logos?.navbar;
  const showThemeToggle = config?.showThemeToggle ?? true;
  const ctaText = config?.ctaText || 'Get Started';
  const ctaLink = config?.ctaLink || (ctaText.toLowerCase() === 'get started' ? '/contact-us' : '/');
  const bannerText = config?.bannerText || 'Exclusive Price Drop! Hurry,';
  const bannerHighlight = config?.bannerHighlight || 'Offer Ends Soon!';
  const showBanner = config?.showBanner ?? true;

  const navBg = isDark ? darkPalette.cardBg : '#faf8ff';
  const navText = isDark ? darkPalette.text : '#111827';
  const navBorder = isDark ? darkPalette.cardBg : '#e5e7eb';
  const linkHover = isDark ? 'hover:text-gray-300' : 'hover:text-gray-500';
  const mobileBg = isDark ? darkPalette.bg : '#faf8ff';
  const ctaBg = isDark ? 'transparent' : '#faf8ff';
  const ctaBorder = isDark ? 'rgba(255,255,255,0.3)' : '#d1d5db';

  return (
    <div className="text-sm w-full">
      {/* Announcement Banner */}
      {showBanner && (
        <div
          className="text-center font-medium py-2 text-white"
          style={{ background: `linear-gradient(to right, ${primary}, ${secondary}, ${accent})` }}
        >
          <p>
            {bannerText}{' '}
            <span className="underline underline-offset-2">{bannerHighlight}</span>
          </p>
        </div>
      )}

      {/* Main Nav */}
      <nav
        className="sticky top-0 left-0 right-0 h-16 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 shadow transition-all z-50"
        style={{ backgroundColor: navBg, color: navText, borderBottom: `1px solid ${navBorder}` }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 no-underline">
          {logoUrl ? (
            <img src={getImageUrl(logoUrl)} alt={siteName} className="h-8 sm:h-12 w-auto object-contain" />
          ) : (
            <span className="text-lg sm:text-2xl font-extrabold" style={{ color: primary }}>
              {siteName}
            </span>
          )}
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-16">
          {navLinks.map((link) => {
            const isActive = pathname === link.url || (link.url !== '/' && pathname.startsWith(link.url));
            
            return link.hasDropdown ? (
            <li key={link.name} className="list-none relative"
              onMouseEnter={() => setStoresDropdownOpen(true)}
              onMouseLeave={() => setTimeout(() => setStoresDropdownOpen(false), 150)}
            >
              <button
                className={`transition font-medium flex items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${linkHover} ${isActive ? 'font-bold' : ''}`}
                style={{ color: isActive ? primary : navText }}
                onClick={() => setStoresDropdownOpen(!storesDropdownOpen)}
              >
                {link.name}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${storesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {storesDropdownOpen && <StoresDropdown onClose={() => setStoresDropdownOpen(false)} />}
            </li>
          ) : (
            <li key={link.name} className="list-none">
              <Link
                href={link.url}
                className={`transition no-underline font-medium relative ${linkHover} ${isActive ? 'font-bold' : ''}`}
                style={{ color: isActive ? primary : navText }}
              >
                {link.name}
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                  />
                )}
              </Link>
            </li>
          );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {showThemeToggle && (
            <button onClick={toggleTheme} className="p-1.5 transition" style={{ color: navText }}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          <Link
            href={ctaLink}
            className="hidden md:inline-block px-8 py-2 rounded-full text-sm font-medium transition active:scale-95 no-underline"
            style={{
              backgroundColor: ctaBg,
              color: navText,
              border: `1px solid ${ctaBorder}`,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : '#f9fafb')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = ctaBg)}
          >
            {ctaText}
          </Link>

          <button
            className="inline-block md:hidden transition active:scale-90"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: navText }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="absolute top-full left-0 w-full shadow-sm p-6 md:hidden z-40"
            style={{ backgroundColor: mobileBg, borderTop: `1px solid ${navBorder}` }}
          >
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.url || (link.url !== '/' && pathname.startsWith(link.url));
                
                return (
                <li key={link.name} className="list-none">
                  <Link
                    href={link.url}
                    className={`text-sm font-medium transition no-underline relative ${linkHover} ${isActive ? 'font-bold' : ''}`}
                    style={{ color: isActive ? primary : navText }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                    {isActive && (
                      <span 
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                      />
                    )}
                  </Link>
                </li>
              );
              })}
            </ul>
            <Link
              href={ctaLink}
              className="mt-6 inline-block text-sm px-8 py-2.5 rounded-full transition active:scale-95 no-underline"
              style={{ backgroundColor: ctaBg, color: navText, border: `1px solid ${ctaBorder}` }}
              onClick={() => setMobileOpen(false)}
            >
              {ctaText}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}