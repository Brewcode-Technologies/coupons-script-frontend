'use client';
import {
  Search,
  Bell,
  User,
  Gift,
  Menu,
  X,
  Sun,
  Moon,
  Tag,
  ShoppingBag,
  Laptop,
  Shirt,
  UtensilsCrossed,
  ShoppingCart,
  Home,
  Dumbbell,
  Plane,
  Sparkles,
  Heart,
  Gamepad2,
  Baby,
  Car,
  BookOpen,
  Briefcase,
  Pill,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import { getStores, getCategories, getCoupons } from '@/services/api';
import { getServerUrl, getImageUrl } from '@/utils/serverUrl';

const navLinks = [
  {
    label: 'Stores',
    href: '/stores',
    icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-store-icon-v2.png',
  },
  {
    label: 'Categories',
    href: '/categories',
    icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-category-icon-v2.png',
  },
  {
    label: 'All Coupons',
    href: '/coupons',
    icon: 'https://cdn.grabon.in/gograbon/v8/icons/calendar-v3.svg',
  },
  {
    label: 'Deals',
    href: '/deals',
    icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-deals.png',
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-blog-icon-v2.png',
  },
];

export default function NavbarFour() {
  const { siteConfig, refreshConfig, darkPalette } = useDynamicTheme();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const secondary = siteConfig?.theme?.secondaryColor || '#9333ea';
  const siteName = siteConfig?.siteName || 'Coupons Script';
  const customNavBg = siteConfig?.navbar?.bgColor;
  const hasCustomNavBg =
    customNavBg &&
    customNavBg !== '#ffffff' &&
    customNavBg !== '#fff' &&
    customNavBg !== 'rgb(250, 248, 255)';
  const navBg = isDark ? darkPalette.cardBg : hasCustomNavBg ? customNavBg : primary;
  const navText = isDark ? darkPalette.text : siteConfig?.navbar?.textColor || '#ffffff';
  const borderColor = isDark ? `${darkPalette.text}20` : 'rgba(255,255,255,0.2)';
  const mutedText = isDark ? `${darkPalette.text}99` : 'rgba(255,255,255,0.7)';
  const hoverBg = isDark ? `${darkPalette.text}12` : 'rgba(255,255,255,0.15)';
  const drawerBg = isDark ? darkPalette.bg : '#ffffff';
  const inputBg = isDark ? darkPalette.bg : 'rgba(255,255,255,0.2)';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const iconFilter =
    (!isDark && navText === '#ffffff') || isDark ? 'brightness(0) invert(1)' : 'none';

  // Re-fetch config when admin saves
  useEffect(() => {
    const onUpdate = () => refreshConfig();
    window.addEventListener('cms-updated', onUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'cms-updated') onUpdate();
    });
    return () => window.removeEventListener('cms-updated', onUpdate);
  }, [refreshConfig]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [dynamicStores, setDynamicStores] = useState<any[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [dynamicCoupons, setDynamicCoupons] = useState<any[]>([]);

  const serverUrl = getServerUrl();
  const logoUrl = (raw: string) => getImageUrl(raw || '');

  // Fetch dynamic data for search
  useEffect(() => {
    getStores()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setDynamicStores(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    getCategories()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setDynamicCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    getCoupons({ limit: 20, sortBy: 'clickCount', sortOrder: 'desc' })
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setDynamicCoupons(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  // Drawer animation
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setDrawerVisible(true));
    } else {
      setDrawerVisible(false);
      const t = setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

  // Search modal animation
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setSearchVisible(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      });
    } else {
      setSearchVisible(false);
      const t = setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const closeDrawer = () => setMobileOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-sm"
      style={{ backgroundColor: navBg }}
    >
      {/* Top Promo Banner */}

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Row */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Hamburger + Logo grouped together */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="lg:hidden p-2 rounded-lg transition-colors shrink-0"
              style={{ color: navText }}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" style={{ color: navText }} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0 no-underline">
              {siteConfig?.logos?.navbar ? (
                <img
                  src={getImageUrl(siteConfig.logos.navbar)}
                  alt={siteName}
                  className="h-8 sm:h-12 w-auto object-contain"
                />
              ) : (
                <span
                  className="text-lg sm:text-2xl font-extrabold"
                  style={{ color: isDark ? primary : '#ffffff' }}
                >
                  {siteName}
                </span>
              )}
            </Link>
          </div>

          {/* Search Bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: mutedText }}
              />
              <input
                type="text"
                placeholder="Search for stores, coupons & offers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor, backgroundColor: inputBg, color: navText }}
                onFocus={() => setSearchOpen(true)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors"
              style={{ color: navText }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Search Icon */}
            <button
              className="lg:hidden p-2 rounded-full transition-colors"
              style={{ color: navText }}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" style={{ color: navText }} />
            </button>
          </div>
        </div>

        {/* Bottom Nav Row — desktop only */}
        <hr
          className="hidden lg:block border-0 m-0"
          style={{ borderTop: `1px solid ${borderColor}` }}
        />
        <div className="hidden lg:flex items-center justify-between py-2.5" style={{ borderColor }}>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-base font-normal transition-all no-underline"
                style={{ color: mutedText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                  e.currentTarget.style.color = navText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = mutedText;
                }}
              >
                <img
                  src={link.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                  style={{ filter: iconFilter, opacity: 0.8 }}
                />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-screen Search Modal ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col transition-all duration-300"
          style={{
            backgroundColor: navBg,
            opacity: searchVisible ? 1 : 0,
            transform: searchVisible ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          {/* Search Header */}
          <div
            className="flex items-center gap-3 px-4 py-4 border-b shrink-0"
            style={{ borderColor }}
          >
            <div
              className="flex items-center flex-1 gap-3 rounded-full px-4 py-2.5 border-2 transition-all"
              style={{ backgroundColor: isDark ? darkPalette.bg : '#ffffff', borderColor: primary }}
            >
              <Search className="w-5 h-5 shrink-0" style={{ color: primary }} />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for stores, coupons & offers..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                style={{ color: isDark ? navText : '#111827' }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="bg-transparent border-none cursor-pointer p-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={closeSearch}
              className="shrink-0 p-2 rounded-full bg-transparent border-none cursor-pointer"
            >
              <X className="w-5 h-5" style={{ color: navText }} />
            </button>
          </div>

          {/* Search Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Recommended Stores */}
            {(() => {
              const filtered = dynamicStores
                .filter((s) =>
                  (s.storeName || s.name || '').toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 10);
              if (filtered.length === 0) return null;
              return (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3 px-4"
                    style={{ color: mutedText }}
                  >
                    Recommended Stores
                  </p>
                  <div className="flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {filtered.map((s) => (
                      <Link
                        key={s._id}
                        href={`/coupons/${s.slug}-coupons`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-3 md:p-4 rounded-xl border transition-all no-underline shrink-0 w-44 md:w-56 lg:w-64"
                        style={{ borderColor }}
                      >
                        <img
                          src={logoUrl(s.logo)}
                          alt={s.storeName || s.name}
                          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl object-contain border shrink-0 p-1"
                          style={{ borderColor, backgroundColor: cardBg }}
                        />
                        <div className="min-w-0">
                          <p
                            className="text-sm md:text-base font-semibold truncate"
                            style={{ color: navText }}
                          >
                            {s.storeName || s.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: mutedText }}>
                            {s.couponCount || 0} offers
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Recommended Categories */}
            {(() => {
              const filtered = dynamicCategories
                .filter((c) => (c.name || '').toLowerCase().includes(query.toLowerCase()))
                .slice(0, 10);
              if (filtered.length === 0) return null;
              return (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3 px-4"
                    style={{ color: mutedText }}
                  >
                    Recommended Categories
                  </p>
                  <div className="flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {filtered.map((c) => (
                      <Link
                        key={c._id}
                        href={`/coupons/${c.slug || c.name?.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-3 md:p-4 rounded-xl border transition-all no-underline shrink-0 w-44 md:w-56 lg:w-64"
                        style={{ borderColor }}
                      >
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl border flex items-center justify-center shrink-0 p-1"
                          style={{ borderColor, backgroundColor: cardBg, color: primary }}
                        >
                          {(() => {
                            const n = (c.name || '').toLowerCase();
                            const size = 'w-5 h-5 md:w-6 md:h-6';
                            if (n.includes('beauty') || n.includes('cosmetic'))
                              return <Sparkles className={size} />;
                            if (n.includes('electron') || n.includes('tech'))
                              return <Laptop className={size} />;
                            if (n.includes('fashion') || n.includes('cloth'))
                              return <Shirt className={size} />;
                            if (
                              n.includes('food') ||
                              n.includes('dining') ||
                              n.includes('restaurant')
                            )
                              return <UtensilsCrossed className={size} />;
                            if (n.includes('grocer')) return <ShoppingCart className={size} />;
                            if (n.includes('home') || n.includes('garden'))
                              return <Home className={size} />;
                            if (n.includes('sport') || n.includes('fitness'))
                              return <Dumbbell className={size} />;
                            if (n.includes('travel') || n.includes('flight') || n.includes('hotel'))
                              return <Plane className={size} />;
                            if (n.includes('health') || n.includes('pharma'))
                              return <Pill className={size} />;
                            if (n.includes('baby') || n.includes('kid'))
                              return <Baby className={size} />;
                            if (n.includes('auto') || n.includes('car'))
                              return <Car className={size} />;
                            if (n.includes('book') || n.includes('education'))
                              return <BookOpen className={size} />;
                            if (n.includes('game') || n.includes('gaming'))
                              return <Gamepad2 className={size} />;
                            if (n.includes('business') || n.includes('office'))
                              return <Briefcase className={size} />;
                            if (n.includes('shop')) return <ShoppingBag className={size} />;
                            return <Tag className={size} />;
                          })()}
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-sm md:text-base font-semibold truncate"
                            style={{ color: navText }}
                          >
                            {c.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: mutedText }}>
                            {c.couponCount || 0} offers
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Offers You May Like */}
            {(() => {
              const filtered = dynamicCoupons
                .filter(
                  (o) =>
                    (o.store?.storeName || '').toLowerCase().includes(query.toLowerCase()) ||
                    (o.title || '').toLowerCase().includes(query.toLowerCase()) ||
                    (o.discount || '').toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 10);
              if (filtered.length === 0) return null;
              return (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3 px-4"
                    style={{ color: mutedText }}
                  >
                    Offers You May Like
                  </p>
                  <div className="flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {filtered.map((o) => (
                      <a
                        key={o._id}
                        href={`/coupons/${o.store?.slug}-coupons`}
                        onClick={closeSearch}
                        className="flex items-start gap-3 p-3 md:p-4 rounded-xl border transition-all no-underline shrink-0 w-60 md:w-72 lg:w-80"
                        style={{ borderColor }}
                      >
                        <img
                          src={logoUrl(o.store?.logo || '')}
                          alt={o.store?.storeName}
                          className="w-11 h-11 md:w-14 md:h-14 rounded-xl object-contain border p-1 shrink-0"
                          style={{ borderColor, backgroundColor: cardBg }}
                        />
                        <div className="min-w-0">
                          <p
                            className="text-sm md:text-base font-bold mb-0.5"
                            style={{ color: navText }}
                          >
                            {o.store?.storeName || 'Store'}
                          </p>
                          <p
                            className="text-xs md:text-sm font-semibold mb-1"
                            style={{ color: primary }}
                          >
                            {o.discount || o.type?.toUpperCase() || 'OFFER'}
                          </p>
                          <p
                            className="text-xs line-clamp-2 leading-relaxed"
                            style={{ color: mutedText }}
                          >
                            {o.title}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* No results */}
            {query &&
              [
                ...dynamicStores.filter((s) =>
                  (s.storeName || s.name || '').toLowerCase().includes(query.toLowerCase())
                ),
                ...dynamicCategories.filter((c) =>
                  (c.name || '').toLowerCase().includes(query.toLowerCase())
                ),
                ...dynamicCoupons.filter(
                  (o) =>
                    (o.store?.storeName || '').toLowerCase().includes(query.toLowerCase()) ||
                    (o.title || '').toLowerCase().includes(query.toLowerCase())
                ),
              ].length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Search className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}
          </div>
        </div>
      )}

      {/* ── Mobile / Tablet Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            style={{ opacity: drawerVisible ? 1 : 0 }}
            onClick={closeDrawer}
          />
          <nav
            className="absolute left-0 top-0 h-full w-full flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto"
            style={{
              backgroundColor: drawerBg,
              transform: drawerVisible ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: isDark ? darkPalette.cardBg : primary }}
            >
              <Link href="/" onClick={closeDrawer} className="no-underline">
                {siteConfig?.logos?.navbar ? (
                  <img
                    src={getImageUrl(siteConfig.logos.navbar)}
                    alt={siteName}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xl font-extrabold" style={{ color: '#ffffff' }}>
                    {siteName}
                  </span>
                )}
              </Link>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-full bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" style={{ color: isDark ? navText : '#ffffff' }} />
              </button>
            </div>

            {/* Nav vertical list */}
            <div className="flex flex-col flex-1">
              {[
                {
                  label: 'Stores',
                  href: '/stores',
                  icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-store-icon-v2.png',
                },
                {
                  label: 'Categories',
                  href: '/categories',
                  icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-category-icon-v2.png',
                },
                {
                  label: 'All Coupons',
                  href: '/coupons',
                  icon: 'https://cdn.grabon.in/gograbon/v8/icons/calendar-v3.svg',
                },
                {
                  label: 'Deals',
                  href: '/deals',
                  icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-deals.png',
                },
                {
                  label: 'Blog',
                  href: '/blog',
                  icon: 'https://cdn.grabon.in/gograbon/v8/icons/header-blog-icon-v2.png',
                },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-5 py-4 text-base font-normal transition-colors no-underline border-b"
                  style={{
                    color: isDark ? darkPalette.text : '#1f2937',
                    borderColor: isDark ? borderColor : '#f3f4f6',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = primary;
                    e.currentTarget.style.backgroundColor = `${primary}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? darkPalette.text : '#1f2937';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="w-5 h-5 object-contain shrink-0"
                    style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
