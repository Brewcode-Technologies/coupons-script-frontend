'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCoupons, getStores } from '@/services/api';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import CouponCard from '@/components/coupon/CouponCard';
import ColumnSwitcher from '@/components/common/ColumnSwitcher';

export default function AllCouponsPage() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const pageBg = isDark ? darkPalette.bg : '#f8fafc';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const textMain = isDark ? darkPalette.text : '#111827';
  const textMuted = isDark ? `${darkPalette.text}aa` : '#6b7280';
  const borderCol = isDark ? `${darkPalette.text}20` : '#e5e7eb';

  const [coupons, setCoupons] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeCols, setStoreCols] = useState(7);

  const serverUrl = 'http://localhost:5000';

  useEffect(() => {
    Promise.all([getCoupons({ limit: 1000 }), getStores()])
      .then(([couponRes, storeRes]) => {
        const allCoupons = couponRes.data?.data ?? couponRes.data ?? [];
        setStores(storeRes.data?.data ?? storeRes.data ?? []);
        const now = new Date();
        setCoupons((Array.isArray(allCoupons) ? allCoupons : []).filter((c: any) => {
          if (c.expiryDate && new Date(c.expiryDate) < now) return false;
          return true;
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          {coupons.length} verified coupons & offers available today
        </p>

        {/* Top Stores */}
        {stores.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Top Stores</h2>
              <ColumnSwitcher columns={storeCols} onChange={setStoreCols} mobileOptions={[3, 4]} desktopOptions={[4, 5, 6, 7]} />
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${storeCols}, minmax(0, 1fr))` }}>
              {stores.slice(0, storeCols <= 4 ? 12 : storeCols <= 6 ? 12 : 16).map((store: any) => {
                const rawLogo = store.logo || '';
                const logo = rawLogo.startsWith('http') ? rawLogo : rawLogo ? `${serverUrl}${rawLogo}` : '';
                return (
                  <Link
                    key={store._id}
                    href={`/coupons/${store.slug}-coupons`}
                    className="no-underline group text-center"
                  >
                    <div
                      className="rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: cardBg, height: 80, boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
                    >
                      {logo ? (
                        <img src={logo} alt={store.storeName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: primary }}>{store.storeName?.[0]}</div>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-bold truncate" style={{ color: textMain }}>{store.storeName}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Coupons List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 rounded-xl animate-pulse" style={{ backgroundColor: cardBg }} />)}
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-semibold">No coupons available</p>
            <p className="text-sm mt-1" style={{ color: textMuted }}>Check back soon for new coupons</p>
          </div>
        ) : (
          <div className="space-y-3">
            {coupons.map((coupon: any) => (
              <CouponCard key={coupon._id} coupon={coupon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
