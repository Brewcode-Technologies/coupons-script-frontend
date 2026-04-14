'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecentBlogs from '@/components/sections/RecentBlogs';
import ThemedMain from '@/components/ThemedMain';
import BackToTop from '@/components/common/BackToTop';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const showRecentBlogs = pathname === '/';

  useEffect(() => {
    setIsClient(true);
    setIsAdmin(window.location.pathname?.startsWith('/admin') || false);
  }, []);

  // Show loading or basic layout during SSR
  if (!isClient) {
    return (
      <>
        <Navbar />
        <ThemedMain>{children}</ThemedMain>
        {showRecentBlogs && <RecentBlogs />}
        <Footer />
        <BackToTop />
      </>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <ThemedMain>{children}</ThemedMain>
      {showRecentBlogs && <RecentBlogs />}
      <Footer />
      <BackToTop />
    </>
  );
}
