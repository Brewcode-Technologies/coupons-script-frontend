'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ExternalLink, Search, ChevronUp, ChevronDown, Tag, Zap } from 'lucide-react';
import { getDeals, getStores, getCoupons, getCategories } from '@/services/api';
import { getServerUrl, getImageUrl } from '@/utils/serverUrl';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import PromoModal from '@/components/coupon/PromoModal';
import ColumnSwitcher from '@/components/common/ColumnSwitcher';

interface FilterState {
  searchQuery: string;
  selectedStores: string[];
  selectedCategories: string[];
}

export default function DealsClient() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const siteName = siteConfig?.siteName || '';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const textMain = isDark ? darkPalette.text : '#111827';
  const textMuted = isDark ? `${darkPalette.text}aa` : '#6b7280';
  const borderCol = isDark ? `${darkPalette.text}20` : '#e5e7eb';
  const pageBg = isDark ? darkPalette.bg : '#f1f5f9';

  const [deals, setDeals] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStore, setActiveStore] = useState('All');
  const [modalData, setModalData] = useState<any>(null);
  const [dealCols, setDealCols] = useState(4);
  const [storeCols, setStoreCols] = useState(7);
  const [storesExpanded, setStoresExpanded] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedStores: [],
    selectedCategories: []
  });

  const serverUrl = getServerUrl();

  useEffect(() => {
    Promise.all([
      getDeals({ limit: 100 }),
      getStores(),
      getCategories(),
      getCoupons({ limit: 10, sortBy: 'clickCount', sortOrder: 'desc' }),
    ])
      .then(([dealRes, storeRes, categoryRes, couponRes]) => {
        const d = dealRes.data?.data ?? dealRes.data ?? [];
        setDeals((Array.isArray(d) ? d : []).filter((x: any) => x.isActive));
        setStores(storeRes.data?.data ?? storeRes.data ?? []);
        setCategories(categoryRes.data?.data ?? categoryRes.data ?? []);
        setTrending(couponRes.data?.data ?? couponRes.data ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);


  // Helper: get all category IDs from a deal
  const getDealCategoryIds = (deal: any): string[] => {
    const ids: string[] = [];
    const cat = deal.category;
    if (cat) ids.push(typeof cat === 'string' ? cat : cat._id || '');
    if (Array.isArray(deal.categories)) {
      deal.categories.forEach((c: any) => ids.push(typeof c === 'string' ? c : c._id || ''));
    }
    const storeCat = deal.store?.category;
    if (storeCat) ids.push(typeof storeCat === 'string' ? storeCat : storeCat._id || '');
    return ids.filter(Boolean);
  };

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

  // Get stores with deal counts
  const storesWithCounts = useMemo(() => {
    return stores.map(store => {
      const dealCount = deals.filter(deal => 
        (deal.store?._id || deal.store) === store._id
      ).length;
      return { ...store, dealCount };
    }).filter(store => store.dealCount > 0).slice(0, 10);
  }, [stores, deals]);

  // Get categories with deal counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => {
      const dealCount = deals.filter(deal =>
        getDealCategoryIds(deal).includes(category._id)
      ).length;
      return { ...category, dealCount };
    }).slice(0, 10);
  }, [categories, deals]);

  const getImage = (deal: any) => {
    const raw = deal.image || deal.store?.logo || '';
    return raw.startsWith('http') ? raw : raw ? `${serverUrl}${raw}` : '';
  };

  // Store tabs from deals
  const storeTabs = useMemo(() => {
    const names = new Set(deals.map(d => d.store?.storeName).filter(Boolean));
    return ['All', ...Array.from(names).slice(0, 8)];
  }, [deals]);

  const filteredDeals = useMemo(() => {
    let list = deals;
    
    // Store tab filter
    if (activeStore !== 'All') {
      list = list.filter(d => d.store?.storeName === activeStore);
    }
    
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      list = list.filter(deal => {
        const matchesTitle = deal.title?.toLowerCase().includes(query);
        const matchesDescription = deal.description?.toLowerCase().includes(query);
        const matchesStore = deal.store?.storeName?.toLowerCase().includes(query);
        return matchesTitle || matchesDescription || matchesStore;
      });
    }
    
    // Store filter
    if (filters.selectedStores.length > 0) {
      list = list.filter(deal => {
        const storeId = deal.store?._id || deal.store;
        return filters.selectedStores.includes(storeId);
      });
    }
    
    // Category filter
    if (filters.selectedCategories.length > 0) {
      list = list.filter(deal => {
        const ids = getDealCategoryIds(deal);
        return ids.some(id => filters.selectedCategories.includes(id));
      });
    }
    
    return list;
  }, [deals, activeStore, filters]);

  const openDeal = (deal: any) => {
    const url = deal.link || deal.store?.websiteUrl;
    if (url) window.open(url, '_blank');
    const rawLogo = deal.store?.logo || '';
    setModalData({
      title: deal.title,
      code: deal.couponCode || deal.code || '',
      discount: deal.discount || '',
      storeName: deal.store?.storeName || '',
      storeLogo: rawLogo.startsWith('http') ? rawLogo : rawLogo ? `${serverUrl}${rawLogo}` : '',
      storeUrl: url || '',
      expiryDate: deal.expiryDate || '',
      details: deal.description || deal.details || '',
    });
  };

  const featured = filteredDeals[0];
  const gridDeals = filteredDeals.slice(1);

  return (
    <div style={{ backgroundColor: pageBg, minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ backgroundColor: cardBg, borderBottom: `1px solid ${borderCol}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-1 text-xs mb-3" style={{ color: textMuted }}>
            <Link href="/" className="no-underline" style={{ color: primary }}>Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: textMain }}>Deals of the Day</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: textMain }}>Deals Of The Day</h1>
              <p className="text-sm" style={{ color: textMuted }}>Fresh. Handpicked. Curated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Filter Tabs */}
      <section style={{ backgroundColor: cardBg, borderBottom: `1px solid ${borderCol}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {storeTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveStore(tab)}
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border"
                style={{
                  backgroundColor: activeStore === tab ? primary : 'transparent',
                  color: activeStore === tab ? '#fff' : textMuted,
                  borderColor: activeStore === tab ? primary : borderCol,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:flex flex-col gap-0 text-base">
            {/* Search Filter */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: textMuted }} />
              <input
                placeholder="Search Deals"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: borderCol,
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
                        {store.storeName || store.name} ({store.dealCount})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr style={{ borderColor: borderCol }} className="mb-4" />

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
                        {category.name} ({category.dealCount})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr style={{ borderColor: borderCol }} className="mb-4" />

            {/* Deals Info */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg" style={{ color: textMain }}>Deals Info</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-sm" style={{ color: textMuted }}>
                  <Tag className="w-4 h-4" style={{ color: primary }} />
                  <span>
                    Total Deals : <strong style={{ color: textMain }}>{filteredDeals.length}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm" style={{ color: textMuted }}>
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>
                    Active Deals : <strong style={{ color: textMain }}>{filteredDeals.filter(d => d.isActive).length}</strong>
                  </span>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: borderCol }} className="mb-4" />

            {/* Related Categories */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg" style={{ color: textMain }}>Related Categories</p>
              <div className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category._id}
                    className="block text-sm no-underline hover:underline"
                    href={`/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ color: primary }}
                  >
                    {category.name} Deals
                  </Link>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: borderCol }} className="mb-4" />

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
                    {store.storeName || store.name} Deals
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ backgroundColor: cardBg }} />)}
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: textMain }}>No deals available</p>
            <p className="text-sm mt-1" style={{ color: textMuted }}>Check back soon for new deals</p>
          </div>
        ) : (
          <>
            {/* Featured Deal */}
            {featured && (
              <div
                className="rounded-2xl overflow-hidden flex flex-col sm:flex-row mb-8 cursor-pointer hover:shadow-xl transition-shadow"
                style={{ backgroundColor: cardBg, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                onClick={() => openDeal(featured)}
              >
                <div className="sm:w-1/2 h-[200px] sm:h-auto" style={{ backgroundColor: isDark ? darkPalette.bg : '#f3f4f6' }}>
                  <img src={getImage(featured)} alt={featured.title} className="w-full h-full object-cover" />
                </div>
                <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center" style={{ backgroundColor: isDark ? '#0f172a' : '#0d2545' }}>
                  <span className="text-white text-sm px-4 py-1 rounded-md w-fit mb-3 font-semibold" style={{ backgroundColor: primary }}>
                    {featured.discount || 'DEAL'}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{featured.title}</h2>
                  <p className="text-gray-400 text-sm mt-2">By {featured.store?.storeName || 'Store'}</p>
                  {(featured.price || featured.originalPrice) && (
                    <p className="text-2xl font-bold text-white mt-3">
                      {featured.price}
                      {featured.originalPrice && <span className="text-gray-400 line-through text-base ml-2">{featured.originalPrice}</span>}
                    </p>
                  )}
                  <span className="mt-4 font-bold text-base flex items-center gap-2" style={{ color: primary }}>
                    GRAB NOW <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            )}

            {/* Deals Grid */}
            {gridDeals.length > 0 && (
              <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: textMain }}>All Deals</h2>
                <ColumnSwitcher columns={dealCols} onChange={setDealCols} mobileOptions={[1, 2]} desktopOptions={[3, 4, 5]} />
              </div>
              <div className={`grid gap-5 ${dealCols === 1 ? 'grid-cols-1' : dealCols === 2 ? 'grid-cols-2' : dealCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : dealCols === 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                {gridDeals.map((deal: any) => {
                  const image = getImage(deal);
                  const storeName = deal.store?.storeName || 'Store';
                  return (
                    <div
                      key={deal._id}
                      className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      style={{ backgroundColor: cardBg, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                      onClick={() => openDeal(deal)}
                    >
                      {/* Image */}
                      <div className="h-[160px] overflow-hidden" style={{ backgroundColor: isDark ? darkPalette.bg : '#f3f4f6' }}>
                        {image && <img src={image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                      </div>

                      {/* Badge */}
                      <div className="flex justify-center -mt-4 relative z-10">
                        <span className="text-white text-xs px-3 py-1 rounded-md font-semibold shadow" style={{ backgroundColor: primary }}>
                          {deal.discount || 'DEAL'}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: textMain }}>{deal.title}</p>
                        <p className="text-xs mt-1" style={{ color: textMuted }}>By {storeName}</p>
                        {(deal.price || deal.originalPrice) && (
                          <div className="mt-2 flex items-center gap-2">
                            {deal.price && <span className="text-base font-bold" style={{ color: textMain }}>{deal.price}</span>}
                            {deal.originalPrice && <span className="text-xs line-through" style={{ color: textMuted }}>{deal.originalPrice}</span>}
                          </div>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: primary }}>
                            GET DEAL <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </>
            )}
          </>
        )}



        {/* Trending Deals */}
        {trending.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-5" style={{ color: textMain }}>Trending Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.slice(0, 6).map((coupon: any) => (
                <div
                  key={coupon._id}
                  className="rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: cardBg, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: primary }}>
                      {coupon.discount || coupon.type?.toUpperCase() || 'DEAL'}
                    </span>
                    <p className="mt-2 text-sm font-medium line-clamp-2" style={{ color: textMain }}>{coupon.title}</p>
                    <p className="text-xs mt-1" style={{ color: textMuted }}>{coupon.store?.storeName || ''}</p>
                    {coupon.clickCount > 0 && (
                      <p className="text-[10px] mt-1" style={{ color: textMuted }}>{coupon.clickCount} people used</p>
                    )}
                  </div>
                  {coupon.store?.logo && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: borderCol }}>
                      <img
                        src={coupon.store.logo.startsWith('http') ? coupon.store.logo : `${serverUrl}${coupon.store.logo}`}
                        alt="" className="w-full h-full object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <section style={{ backgroundColor: cardBg, borderTop: `1px solid ${borderCol}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center">
          <p className="font-semibold text-sm" style={{ color: primary }}>
            {siteName.toUpperCase()} — DESTINATION FOR TOP DEALS
          </p>
        </div>
      </section>

      {modalData && (
        <PromoModal onClose={() => setModalData(null)} title={modalData.title} code={modalData.code}
          discount={modalData.discount} storeName={modalData.storeName} storeLogo={modalData.storeLogo}
          storeUrl={modalData.storeUrl} expiryDate={modalData.expiryDate} details={modalData.details} />
      )}
    </div>
  );
}
