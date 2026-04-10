'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getSiteConfig } from '@/services/api';
import { useTheme } from '@/components/ThemeProvider';
import { getImageUrl } from '@/utils/serverUrl';

import { getFontCombination, getFontUrl, type FontCombination } from '@/utils/fontCombinations';

interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor?: string;
}

interface SiteFonts {
  combination: FontCombination;
}

interface SiteConfigData {
  siteName: string;
  theme: SiteTheme;
  fonts: SiteFonts;
  logo: string;
  logos?: { navbar?: string; footer?: string; favicon?: string; ogImage?: string };
  footer: { copyright: string; email: string; phone?: string; address?: string; showSocialMedia?: boolean; showNewsletter?: boolean };
  navbar?: {
    layout?: string; style?: string; bgColor?: string; textColor?: string;
    showSearch?: boolean; showThemeToggle?: boolean; sticky?: boolean;
    ctaText?: string; ctaLink?: string;
    bannerText?: string; bannerHighlight?: string; showBanner?: boolean;
  };
  footerConfig?: {
    layout?: string; style?: string; bgColor?: string; textColor?: string;
    showAppDownload?: boolean; showContactInfo?: boolean;
  };
  socialMedia?: Record<string, { label: string; url: string; icon: string; enabled: boolean }>;
  footerContent?: {
    tagline?: string;
    columns?: Array<{ heading: string; links: Array<{ label: string; href: string }> }>;
    bottomLinks?: Array<{ label: string; href: string }>;
  };
  footerCategories?: Array<{
    title: string;
    groups: Array<{
      heading: string;
      links: Array<{ label: string; href: string }>;
    }>;
  }>;
}

const defaultLabels = {
  couponCard: { revealCode: 'Reveal Code', getReward: 'Get Reward', getDeal: 'Get Deal', seeDetails: 'See Details', hideDetails: 'Hide Details', limitedTime: 'Limited time', expiringToday: 'Expiring today', exclusive: 'Exclusive', interested: 'interested', onlineCashBack: 'Online Cash Back' },
  promoModal: { saveMoreTitle: 'Save Even More', cashBackHeading: 'Add 1% cash back to this offer', cashBackButton: 'Activate 1% cash back', startShopping: 'Start Shopping', continueTo: 'Continue to', detailsLabel: 'Details & Exclusions', howItWorks: 'How does it work?', termsText: 'By continuing, you agree to our', termsLink: 'Terms', privacyLink: 'Privacy Policy', socialText: 'continue with social accounts', emailPlaceholder: 'Email Address', copiedText: 'Copied!', copyText: 'Copy', endsText: 'Ends' },
  homepage: { tagline: "India's Leading Coupons & Deals Marketplace", featuredTitle: 'The Best Coupons, Promo Codes & Cash Back Offers', trendingTitle: 'Trending Deals Right Now', topStoresTitle: 'Shop at Top Stores', popularStoresTitle: 'Popular Stores', topCouponsTitle: "Today's Top Coupons & Offers", dealsTitle: 'Deals Of The Day', viewMoreDeals: 'View More Deals', popularOffersTitle: 'Popular Offers of the Day', collectionsTitle: 'Collections', cashBackTitle: 'Cash Back at Stores We Love', cashBackSubtitle: 'cha-ching', allCashBack: 'All Cash Back', latestCouponsTitle: 'Latest Coupons', topDealsTitle: "Today's Top Deals", topDealsSubtitle: '', viewMoreDealsBtn: 'View more deals', allTopDeals: 'All Top Deals', dealsSectionTitle: 'Top Deals', dealsSectionAllBtn: 'All Deals', mostPopular: 'MOST POPULAR', storeOfMonth: 'Store Of The Month', viewCoupons: 'VIEW COUPONS', redeemNow: 'REDEEM NOW', buyNow: 'BUY NOW', checkPrice: 'Check price', shopNow: 'Shop Now', couponCode: 'Coupon code', cashBackLabel: 'Cash Back' },
  discount: { cashText: 'Cash', backText: 'Back', freeText: 'Free', shipText: 'Ship', pingText: 'ping', saleText: 'SALE', upToText: 'Up To', offText: 'Off' },
};

interface DynamicThemeContextType {
  siteConfig: SiteConfigData | null;
  loading: boolean;
  refreshConfig: () => void;
  darkPalette: { bg: string; text: string; cardBg: string };
  labels: typeof defaultLabels;
}

const DynamicThemeContext = createContext<DynamicThemeContextType>({
  siteConfig: null,
  loading: true,
  refreshConfig: () => {},
  darkPalette: { bg: '#111827', text: '#f9fafb', cardBg: '#1f2937' },
  labels: defaultLabels,
});

export const useDynamicTheme = () => useContext(DynamicThemeContext);

// Theme palette map — mirrors globals.css
const THEME_PALETTES: Record<string, { primary: string; secondary: string; bg: string; text: string }> = {
  purple: { primary: '#7c3aed', secondary: '#9333ea', bg: '#faf8ff', text: '#111827' },
  blue:   { primary: '#2563eb', secondary: '#1d4ed8', bg: '#f8faff', text: '#111827' },
  green:  { primary: '#16a34a', secondary: '#15803d', bg: '#f8fdf9', text: '#111827' },
  orange: { primary: '#ea580c', secondary: '#c2410c', bg: '#fffbf8', text: '#111827' },
  red:    { primary: '#dc2626', secondary: '#b91c1c', bg: '#fff9f9', text: '#111827' },
  rose:   { primary: '#e11d48', secondary: '#be123c', bg: '#fff9fb', text: '#111827' },
  teal:   { primary: '#0d9488', secondary: '#0f766e', bg: '#f7fdfc', text: '#111827' },
  dark:   { primary: '#8b5cf6', secondary: '#a78bfa', bg: '#111827', text: '#f9fafb' },
};

// Dark palettes per theme — auto-applied when user toggles dark mode
const DARK_PALETTES: Record<string, { bg: string; text: string; cardBg: string }> = {
  purple: { bg: '#0f0a24', text: '#f3edff', cardBg: '#1e1535' },
  blue:   { bg: '#0a1228', text: '#e0edff', cardBg: '#0f1a33' },
  green:  { bg: '#081c10', text: '#dcfce7', cardBg: '#0d2818' },
  orange: { bg: '#1e1008', text: '#ffeddc', cardBg: '#2a1a0a' },
  red:    { bg: '#200a0a', text: '#fee2e2', cardBg: '#2a0f0f' },
  rose:   { bg: '#200812', text: '#ffe4ed', cardBg: '#2a0c16' },
  teal:   { bg: '#061c1a', text: '#ccfbf1', cardBg: '#0a2622' },
  dark:   { bg: '#111827', text: '#f9fafb', cardBg: '#1f2937' },
};

export default function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfigData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSiteConfig = async () => {
    try {
      const response = await getSiteConfig();
      setSiteConfig(response.data);
    } catch (error) {
      console.error('Error fetching site config:', error);
      // Fallback theme
      setSiteConfig({
        siteName: 'Coupons Script',
        theme: {
          primaryColor: '#7c3aed',
          secondaryColor: '#9333ea',
          backgroundColor: '#faf8ff',
          textColor: '#111827'
        },
        fonts: {
          combination: 'modern'
        },
        logo: '/uploads/logo.png',
        footer: {
          copyright: '© Coupons Script',
          email: 'support@example.com'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteConfig();
    const interval = setInterval(fetchSiteConfig, 30000);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cms-updated') fetchSiteConfig();
    };
    const handleCmsUpdated = () => fetchSiteConfig();
    const handleCmsPreview = (e: Event) => {
      const theme = (e as CustomEvent).detail;
      setSiteConfig(prev => prev ? { ...prev, theme: { ...prev.theme, ...theme } } : prev);
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cms-updated', handleCmsUpdated);
    window.addEventListener('cms-preview', handleCmsPreview);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cms-updated', handleCmsUpdated);
      window.removeEventListener('cms-preview', handleCmsPreview);
    };
  }, []);

  // Create Material-UI theme based on backend config
  const themeName = (siteConfig as any)?.themeName || 'purple';
  const palette = THEME_PALETTES[themeName] || THEME_PALETTES.purple;
  const fontCombination = getFontCombination(siteConfig?.fonts?.combination);
  
  const muiTheme = createTheme({
    palette: {
      primary:    { main: palette.primary },
      secondary:  { main: palette.secondary },
      background: { default: palette.bg },
      text:       { primary: palette.text },
    },
    typography: {
      fontFamily: fontCombination.body,
      h1: { fontFamily: fontCombination.heading },
      h2: { fontFamily: fontCombination.heading },
      h3: { fontFamily: fontCombination.heading },
      h4: { fontFamily: fontCombination.heading },
      h5: { fontFamily: fontCombination.heading },
      h6: { fontFamily: fontCombination.heading },
    },
  });

  // Apply theme by setting data-theme on <html> — CSS variables handle the rest
  useEffect(() => {
    if (!siteConfig) return;
    const themeName = (siteConfig as any).themeName || 'purple';
    const fontCombination = getFontCombination(siteConfig.fonts?.combination);
    
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.style.setProperty('--heading-font', fontCombination.heading);
    document.documentElement.style.setProperty('--body-font', fontCombination.body);
    document.documentElement.style.setProperty('--mono-font', fontCombination.mono);

    // Load Google Fonts for the selected combination
    const fontUrl = getFontUrl(siteConfig.fonts?.combination);
    if (fontUrl) {
      const fontId = `gfont-combination-${siteConfig.fonts?.combination || 'modern'}`;
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
      }
    }

    // Set favicon from config
    const faviconUrl = (siteConfig as any).logos?.favicon;
    if (faviconUrl) {
      const href = getImageUrl(faviconUrl);
      let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
      link.href = href;
    }

    // Set page title from config
    const metaTitle = (siteConfig as any).seo?.metaTitle || (siteConfig as any).siteName;
    if (metaTitle) document.title = metaTitle;
  }, [siteConfig]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#faf8ff' }}>
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{ 
              borderColor: 'rgba(124, 58, 237, 0.2)',
              borderTopColor: '#7c3aed'
            }}
          />
        </div>
      </div>
    );
  }

  // Merge palette into siteConfig.theme so all consumers get correct colors
  const resolvedConfig = siteConfig ? {
    ...siteConfig,
    theme: {
      ...siteConfig.theme,
      primaryColor:   palette.primary,
      secondaryColor: palette.secondary,
      backgroundColor: palette.bg,
      textColor:      palette.text,
    }
  } : null;

  const resolvedDarkPalette = DARK_PALETTES[(siteConfig as any)?.themeName || 'purple'] || DARK_PALETTES.purple;

  // Merge admin uiLabels with defaults
  const adminLabels = (siteConfig as any)?.uiLabels || {};
  const labels = {
    couponCard: { ...defaultLabels.couponCard, ...adminLabels.couponCard },
    promoModal: { ...defaultLabels.promoModal, ...adminLabels.promoModal },
    homepage: { ...defaultLabels.homepage, ...adminLabels.homepage },
    discount: { ...defaultLabels.discount, ...adminLabels.discount },
  };

  return (
    <DynamicThemeContext.Provider 
      value={{ 
        siteConfig: resolvedConfig, 
        loading, 
        refreshConfig: fetchSiteConfig,
        darkPalette: resolvedDarkPalette,
        labels,
      }}
    >
      <ThemeProvider theme={muiTheme}>
        <DynamicThemeWrapper siteConfig={resolvedConfig} fontFamily={getFontCombination(siteConfig?.fonts?.combination).body}>
          {children}
        </DynamicThemeWrapper>
      </ThemeProvider>
    </DynamicThemeContext.Provider>
  );
}

function DynamicThemeWrapper({ children, siteConfig, fontFamily }: { children: React.ReactNode; siteConfig: any; fontFamily: string }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeName = (siteConfig as any)?.themeName || 'purple';
  const darkPalette = DARK_PALETTES[themeName] || DARK_PALETTES.purple;
  const bg = isDark ? darkPalette.bg : (siteConfig?.theme?.backgroundColor || '#faf8ff');
  const color = isDark ? darkPalette.text : (siteConfig?.theme?.textColor || '#111827');
  const fontCombination = getFontCombination(siteConfig?.fonts?.combination);

  useEffect(() => {
    document.documentElement.style.setProperty('--dark-card-bg', darkPalette.cardBg);
  }, [darkPalette.cardBg]);

  return (
    <div style={{ backgroundColor: bg, color, fontFamily: fontCombination.body, minHeight: '100vh' }}>
      {children}
    </div>
  );
}