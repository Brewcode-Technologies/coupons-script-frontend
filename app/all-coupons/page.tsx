'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, ChevronUp, ChevronDown, Tag, Zap } from 'lucide-react';
import { getCoupons, getStores, getCategories } from '@/services/api';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import CouponCard from '@/components/coupon/CouponCard';

interface FilterState {
  searchQuery: string;
  selectedStores: string[];
  selectedCategories: string[];
}

export default function AllCouponsPage() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const pageBg = isDark ? darkPalette.bg : '#f8fafc';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const textMain = isDark ? darkPalette.text : '#111827';
  const textMuted = isDark ? `${darkPalette.text}aa` : '#6b7280';
  const borderColor = isDark ? `${darkPalette.text}20` : '#e5e7eb';

  const [allCoupons, setAllCoupons] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [storesExpanded, setStoresExpanded] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedStores: [],
    selectedCategories: []
  });

  // Load data
  useEffect(() => {
    Promise.all([getCoupons({ limit: 1000 }), getStores(), getCategories()])
      .then(([couponRes, storeRes, categoryRes]) => {
        const coupons = couponRes.data?.data ?? couponRes.data ?? [];
        const storeData = storeRes.data?.data ?? storeRes.data ?? [];
        const categoryData = categoryRes.data?.data ?? categoryRes.data ?? [];
        
        const now = new Date();
        const validCoupons = (Array.isArray(coupons) ? coupons : []).filter((c: any) => {
          if (c.expiryDate && new Date(c.expiryDate) < now) return false;
          return true;
        });
        
        setAllCoupons(validCoupons);
        setStores(Array.isArray(storeData) ? storeData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Filter coupons based on current filters
  const filteredCoupons = useMemo(() => {
    return allCoupons.filter((coupon: any) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = coupon.title?.toLowerCase().includes(query);
        const matchesDescription = coupon.description?.toLowerCase().includes(query);
        const matchesStore = coupon.store?.storeName?.toLowerCase().includes(query) || coupon.store?.name?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription && !matchesStore) return false;
      }
      
      // Store filter
      if (filters.selectedStores.length > 0) {
        const storeId = coupon.store?._id || coupon.store;
        if (!filters.selectedStores.includes(storeId)) return false;
      }
      
      // Category filter
      if (filters.selectedCategories.length > 0) {
        const couponCategories = Array.isArray(coupon.categories) ? coupon.categories : [];
        const hasMatchingCategory = couponCategories.some((cat: any) => 
          filters.selectedCategories.includes(cat._id || cat)
        );
        if (!hasMatchingCategory) return false;
      }
      
      return true;
    });
  }, [allCoupons, filters]);

  // Get fresh coupons (created in last 7 days)
  const freshCoupons = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return filteredCoupons.filter((coupon: any) => 
      coupon.createdAt && new Date(coupon.createdAt) > weekAgo
    );
  }, [filteredCoupons]);

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleStoreToggle = (storeId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedStores: prev.selectedStores.includes(storeId)
        ? prev.selectedStores.filter(id => id !== storeId)
        : [...prev.selectedStores, storeId]
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  // Get stores with coupon counts
  const storesWithCounts = useMemo(() => {
    return stores.map(store => {
      const couponCount = allCoupons.filter(coupon => 
        (coupon.store?._id || coupon.store) === store._id
      ).length;
      return { ...store, couponCount };
    }).filter(store => store.couponCount > 0).slice(0, 10);
  }, [stores, allCoupons]);

  // Get categories with coupon counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => {
      const couponCount = allCoupons.filter(coupon => {
        const couponCategories = Array.isArray(coupon.categories) ? coupon.categories : [];
        return couponCategories.some((cat: any) => (cat._id || cat) === category._id);
      }).length;
      return { ...category, couponCount };
    }).filter(category => category.couponCount > 0).slice(0, 8);
  }, [categories, allCoupons]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBg, color: textMain }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs mb-6" style={{ color: textMuted }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: primary }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>All Coupons</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Coupons</h1>
        <p className="text-sm mb-8" style={{ color: textMuted }}>
          {filteredCoupons.length} verified coupons & offers available today
        </p>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:flex flex-col gap-0 text-base">
            {/* Search Filter */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: textMuted }} />
              <input
                placeholder="Search Filters"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: borderColor,
                  backgroundColor: cardBg,
                  color: textMain,
                  '--tw-ring-color': primary
                } as any}
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Stores Filter */}
            <div className="mb-4">
              <button
                onClick={() => setStoresExpanded(!storesExpanded)}
                className="flex items-center justify-between w-full font-bold py-1 mb-2 text-lg"
                style={{ color: textMain }}
              >
                Stores
                {storesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {storesExpanded && (
                <div className="space-y-2 pl-1 max-h-48 overflow-y-auto">
                  {storesWithCounts.map((store) => (
                    <label key={store._id} className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 text-sm">
                      <input
                        className="w-4 h-4 rounded"
                        type="checkbox"
                        style={{ accentColor: primary }}
                        checked={filters.selectedStores.includes(store._id)}
                        onChange={() => handleStoreToggle(store._id)}
                      />
                      <span style={{ color: textMuted }}>
                        {store.storeName || store.name} ({store.couponCount})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr style={{ borderColor: borderColor }} className="mb-4" />

            {/* Categories Filter */}
            <div className="mb-4">
              <button
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="flex items-center justify-between w-full font-bold py-1 mb-2 text-lg"
                style={{ color: textMain }}
              >
                Categories
                {categoriesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {categoriesExpanded && (
                <div className="space-y-2 pl-1 max-h-48 overflow-y-auto">
                  {categoriesWithCounts.map((category) => (
                    <label key={category._id} className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 text-sm">
                      <input
                        className="w-4 h-4 rounded"
                        type="checkbox"
                        style={{ accentColor: primary }}
                        checked={filters.selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryToggle(category._id)}
                      />
                      <span style={{ color: textMuted }}>
                        {category.name} ({category.couponCount})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr style={{ borderColor: borderColor }} className="mb-4" />

            {/* Coupons Info */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg" style={{ color: textMain }}>Coupons Info</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-sm" style={{ color: textMuted }}>
                  <Tag className="w-4 h-4" style={{ color: primary }} />
                  <span>
                    Coupons & Offers : <strong style={{ color: textMain }}>{filteredCoupons.length}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm" style={{ color: textMuted }}>
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>
                    Fresh Coupons : <strong style={{ color: textMain }}>{freshCoupons.length}</strong>
                  </span>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: borderColor }} className="mb-4" />

            {/* Related Categories */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg" style={{ color: textMain }}>Related Categories</p>
              <div className="space-y-2">
                {categoriesWithCounts.slice(0, 6).map((category) => (
                  <Link
                    key={category._id}
                    className="block text-sm no-underline hover:underline"
                    href={`/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ color: primary }}
                  >
                    {category.name} Coupons
                  </Link>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: borderColor }} className="mb-4" />

            {/* Top Stores */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg" style={{ color: textMain }}>Top Stores</p>
              <div className="space-y-2">
                {storesWithCounts.slice(0, 6).map((store) => (
                  <Link
                    key={store._id}
                    className="block text-sm no-underline hover:underline"
                    href={`/coupons/${store.slug || (store.storeName || store.name).toLowerCase().replace(/\s+/g, '-')}-coupons`}
                    style={{ color: primary }}
                  >
                    {store.storeName || store.name} Coupons
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-24 rounded-xl animate-pulse" style={{ backgroundColor: cardBg }} />)}
              </div>
            ) : filteredCoupons.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold">No coupons found</p>
                <p className="text-sm mt-1" style={{ color: textMuted }}>
                  {filters.searchQuery || filters.selectedStores.length > 0 || filters.selectedCategories.length > 0
                    ? 'Try adjusting your filters'
                    : 'Check back soon for new coupons'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCoupons.map((coupon: any) => (
                  <CouponCard key={coupon._id} coupon={coupon} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
