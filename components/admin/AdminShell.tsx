'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const pageNames: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/stores': 'Stores',
  '/admin/coupons': 'Coupons',
  '/admin/deals': 'Deals',
  '/admin/blog': 'Blog Articles',
  '/admin/promo-banners': 'Promo Banners',
  '/admin/popular-links': 'Popular Links',
  '/admin/categories': 'Categories',
  '/admin/tags': 'Tags',
  '/admin/banners': 'Banners',
  '/admin/pages': 'Pages',
  '/admin/integration': 'Integration',
  '/admin/cms': 'CMS & Config',
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPageName = pageNames[pathname] || 'Admin Panel';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link 
                href="/admin/dashboard" 
                className="text-indigo-600 hover:text-indigo-700 no-underline font-medium"
              >
                Admin Panel
              </Link>
              {pathname !== '/admin/dashboard' && (
                <>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 font-medium">{currentPageName}</span>
                </>
              )}
            </div>
            <div className="text-xs text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
