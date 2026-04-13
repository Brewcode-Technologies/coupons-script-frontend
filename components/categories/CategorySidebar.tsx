'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3X3, Store, Tag, ShoppingBag, BookOpen, ChevronUp, ChevronDown, Search } from "lucide-react";
import { getStores, getSiteConfig } from '@/services/api';

const menuItems = [
  { icon: Grid3X3, label: "Categories", href: "/categories" },
  { icon: Store, label: "Stores", href: "/stores" },
  { icon: Tag, label: "All Coupons", href: "/coupons" },
  { icon: ShoppingBag, label: "Deals", href: "/deals" },
  { icon: BookOpen, label: "Blog", href: "/blog" },
];

export default function CategorySidebar() {
  const pathname = usePathname();
  const [stores, setStores] = useState<any[]>([]);
  const [siteName, setSiteName] = useState('');
  const [showAllStores, setShowAllStores] = useState(false);
  const [storeSearch, setStoreSearch] = useState('');
  const [storesExpanded, setStoresExpanded] = useState(true);

  useEffect(() => {
    getStores().then(res => {
      const data = res.data?.data ?? res.data ?? [];
      setStores(Array.isArray(data) ? data : []);
    }).catch(() => {});
    getSiteConfig().then(res => {
      setSiteName(res.data?.siteName || res.data?.data?.siteName || '');
    }).catch(() => {});
  }, []);

  const filteredStores = stores.filter(store => 
    store.storeName?.toLowerCase().includes(storeSearch.toLowerCase())
  );
  const visibleStores = showAllStores ? filteredStores : filteredStores.slice(0, 8);

  return (
    <div className="w-full">
      <nav className="space-y-0.5 mb-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md text-sm font-medium transition-colors no-underline ${isActive ? "bg-primary text-white" : "text-primary hover:bg-primary/5"}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {siteName && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 border-b-2 border-primary pb-1 inline-block">
            About Categories
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
            If there&apos;s a deal out there, we&apos;ve already found it for you. {siteName} is your #1 coupon
            destination, bringing you the best deals on flights, fashion, food, gadgets, entertainment.
          </p>
        </div>
      )}

      {stores.length > 0 && (
        <div className="mb-4">
          <button 
            onClick={() => setStoresExpanded(!storesExpanded)}
            className="flex items-center justify-between w-full font-bold text-gray-900 dark:text-gray-100 py-1 mb-2 text-lg"
          >
            Stores
            {storesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {storesExpanded && (
            <div className="space-y-2 pl-1 max-h-48 overflow-y-auto">
              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              {/* Store List */}
              {visibleStores.length > 0 ? (
                <>
                  {visibleStores.map((store) => (
                    <Link key={store._id} href={`/coupons/${store.slug}`}
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors no-underline py-1 px-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                      {store.storeName}
                    </Link>
                  ))}
                  {filteredStores.length > 8 && (
                    <button 
                      onClick={() => setShowAllStores(!showAllStores)} 
                      className="text-xs text-primary font-medium hover:underline w-full text-left px-2 py-1"
                    >
                      {showAllStores ? `Show less (${filteredStores.length - 8} hidden)` : `Show ${filteredStores.length - 8} more`}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-400 px-2 py-1">
                  {storeSearch ? 'No stores found' : 'No stores available'}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
