'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCoupons, getStoreBySlug, getCategories, getStores } from '@/services/api';
import { getImageUrl } from '@/utils/serverUrl';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import CouponBanner from '@/components/coupons-page/CouponBanner';
import CouponListCard from '@/components/coupons-page/CouponListCard';
import CouponSidebar from '@/components/coupons-page/CouponSidebar';

export default function StorePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const textMain = isDark ? darkPalette.text : '#111827';
  const textMuted = isDark ? `${darkPalette.text}aa` : '#6b7280';
  const pageBg = isDark ? darkPalette.bg : '#f8fafc';

  const [coupons, setCoupons] = useState<any[]>([]);
  const [store, setStore] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [allStores, setAllStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    Promise.all([
      getStoreBySlug(slug),
      getCoupons({ limit: 1000 }),
      getCategories(),
      getStores(),
    ])
      .then(([storeRes, couponRes, catRes, storesRes]) => {
        const storeData = storeRes.data?.data ?? storeRes.data;
        const allCoupons = couponRes.data?.data ?? couponRes.data ?? [];
        const allCats = catRes.data?.data ?? catRes.data ?? [];
        const stores = storesRes.data?.data ?? storesRes.data ?? [];
        
        setStore(storeData);
        setCategories(allCats);
        setAllStores(Array.isArray(stores) ? stores : []);

        if (storeData) {
          const storeCoupons = allCoupons.filter((c: any) => 
            c.store?._id === storeData._id || c.store === storeData._id
          );
          setCoupons(storeCoupons);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleCategory = (c: string) => setSelectedCategories(prev => 
    prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
  );

  const toggleStore = (s: string) => setSelectedStores(prev => 
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  );

  const couponCount = coupons.filter(c => c.code).length;
  const offerCount = coupons.filter(c => !c.code).length;
  const freshCount = coupons.filter(c => {
    if (!c.createdAt) return false;
    const diff = Date.now() - new Date(c.createdAt).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const filteredCoupons = useMemo(() => {
    let list = coupons;

    if (activeTab === 'coupons') list = list.filter(c => c.code);
    else if (activeTab === 'offers') list = list.filter(c => !c.code);
    else if (activeTab === 'fresh') list = list.filter(c => {
      if (!c.createdAt) return false;
      return Date.now() - new Date(c.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
    });

    if (selectedCategories.length > 0) {
      list = list.filter(c => selectedCategories.includes(c.category || c.store?.category));
    }

    if (selectedStores.length > 0) {
      list = list.filter(c => selectedStores.includes(c.store?.storeName || c.storeName));
    }
    
    return list;
  }, [coupons, activeTab, selectedCategories, selectedStores]);

  const storeName = store?.storeName || store?.name || 'Store';
  const storeLogo = store?.logo ? getImageUrl(store.logo) : '';

  if (loading) {
    return (
      <div style={{ backgroundColor: pageBg, minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div style={{ backgroundColor: pageBg, minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: textMain }}>Store Not Found</h1>
          <p className="mb-6" style={{ color: textMuted }}>The store you're looking for doesn't exist.</p>
          <Link href="/stores" className="text-sm font-semibold no-underline" style={{ color: primary }}>
            ← Back to Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: pageBg, minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm mb-4" style={{ color: textMuted }}>
          <Link href="/" className="no-underline" style={{ color: primary }}>Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/stores" className="no-underline" style={{ color: primary }}>Stores</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: textMain }}>{storeName}</span>
        </div>

        {/* Banner with Tabs & Rating */}
        <CouponBanner
          storeName={storeName}
          logoUrl={storeLogo}
          storeDescription={store?.description}
          totalCoupons={coupons.length}
          couponCount={couponCount}
          offerCount={offerCount}
          freshCount={freshCount}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Layout */}
        <div className="flex gap-6">
          <CouponSidebar
            categoryName={storeName}
            stores={allStores}
            categories={categories}
            selectedStores={selectedStores}
            onStoreToggle={toggleStore}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            totalCoupons={coupons.length}
            verifiedCount={Math.max(1, coupons.length - 5)}
          />

          <div className="flex-1 min-w-0">
            {filteredCoupons.length === 0 ? (
              <div className="text-center py-16 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold" style={{ color: textMain }}>No coupons found</p>
                <p className="text-sm mt-1" style={{ color: textMuted }}>
                  No {storeName} coupons available right now
                </p>
                <Link href="/stores" className="mt-4 inline-block text-sm font-semibold no-underline" style={{ color: primary }}>
                  Browse All Stores →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCoupons.map(coupon => (
                  <CouponListCard key={coupon._id} coupon={coupon} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}