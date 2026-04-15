'use client';
import { useEffect, useState } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import PopularOffers from '@/components/home/PopularOffers';
import PopularStores from '@/components/home/PopularStores';
import TopCoupons from '@/components/home/TopCoupons';
import DealsOfTheDay from '@/components/home/DealsOfTheDay';
import Collections from '@/components/home/Collections';
import LazySection from '@/components/common/LazySection';
import HomepageSkeleton from '@/components/common/HomepageSkeleton';

export default function HomeClient() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) return <HomepageSkeleton />;

  return (
    <main>
      <HeroBanner />
      <LazySection skeleton="cards"><PopularOffers /></LazySection>
      <LazySection skeleton="stores"><PopularStores /></LazySection>
      <LazySection skeleton="coupons"><TopCoupons /></LazySection>
      <LazySection skeleton="cards"><DealsOfTheDay /></LazySection>
      <LazySection skeleton="cards"><Collections /></LazySection>
    </main>
  );
}
