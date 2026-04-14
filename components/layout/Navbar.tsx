'use client';
import { useEffect, useState } from 'react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { getNavbarItems } from '@/services/api';
import NavbarOne from '@/components/navbar/NavbarOne';
import NavbarTwo from '@/components/navbar/NavbarTwo';
import NavbarThree from '@/components/navbar/NavbarThree';
import NavbarFour from '@/components/navbar/NavbarFour';

const defaultNavLinks = [
  { name: 'Categories', url: '/categories' },
  { name: 'All Coupons', url: '/coupons' },
  { name: 'Stores', url: '/stores' },
  { name: 'Deals', url: '/deals' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact Us', url: '/contact-us' },
];

export default function Navbar() {
  const { siteConfig } = useDynamicTheme();
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const [loading, setLoading] = useState(true);
  
  const layout = siteConfig?.navbar?.layout || 'navbar4';
  const config = siteConfig?.navbar || {};

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const response = await getNavbarItems();
        const menuData = response.data;
        const menuArray = menuData?.data || menuData || [];
        
        if (Array.isArray(menuArray) && menuArray.length > 0) {
          // Convert database items to navbar format
          const dynamicLinks = menuArray
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .filter(item => item.isActive !== false)
            .map(item => ({
              name: item.title,
              url: item.url,
              target: item.target
            }));
          
          setNavLinks(dynamicLinks);
        }
      } catch (error) {
        console.error('Error fetching navbar items:', error);
        // Keep default links on error
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarItems();
  }, []);

  // Show loading state or default navbar while fetching
  if (loading) {
    if (layout === 'navbar1') return <NavbarOne navLinks={defaultNavLinks} config={config} />;
    if (layout === 'navbar2') return <NavbarTwo navLinks={defaultNavLinks} config={config} />;
    if (layout === 'navbar3') return <NavbarThree navLinks={defaultNavLinks} config={config} />;
    return <NavbarFour navLinks={defaultNavLinks} config={config} />;
  }

  if (layout === 'navbar1') return <NavbarOne navLinks={navLinks} config={config} />;
  if (layout === 'navbar2') return <NavbarTwo navLinks={navLinks} config={config} />;
  if (layout === 'navbar3') return <NavbarThree navLinks={navLinks} config={config} />;
  return <NavbarFour navLinks={navLinks} config={config} />;
}
