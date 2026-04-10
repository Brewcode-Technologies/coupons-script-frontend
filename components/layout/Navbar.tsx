'use client';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import NavbarOne from '@/components/navbar/NavbarOne';
import NavbarTwo from '@/components/navbar/NavbarTwo';
import NavbarThree from '@/components/navbar/NavbarThree';
import NavbarFour from '@/components/navbar/NavbarFour';

const defaultNavLinks = [
  { name: 'Categories', url: '/categories' },
  { name: 'Stores', url: '/stores' },
  { name: 'Brands', url: '/brands' },
  { name: 'Banks', url: '/banks' },
  { name: 'Festivals', url: '/festivals' },
  { name: 'Product Deals', url: '/product-deals' },
  { name: 'Cities Deals', url: '/cities-deals' },
];

export default function Navbar() {
  const { siteConfig } = useDynamicTheme();
  const layout = siteConfig?.navbar?.layout || 'navbar4';
  const config = siteConfig?.navbar || {};

  if (layout === 'navbar1') return <NavbarOne navLinks={defaultNavLinks} config={config} />;
  if (layout === 'navbar2') return <NavbarTwo navLinks={defaultNavLinks} config={config} />;
  if (layout === 'navbar3') return <NavbarThree navLinks={defaultNavLinks} config={config} />;
  return <NavbarFour />;
}
