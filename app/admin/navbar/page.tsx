'use client';

import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { 
  getNavbarItems, 
  createNavbarItem, 
  updateNavbarItem, 
  deleteNavbarItem,
  getCategories,
  getSiteConfig,
  updateSiteConfig
} from '@/services/api';
import toast from 'react-hot-toast';
import { Menu, Plus, Edit, Trash2, X, GripVertical, ChevronDown, ChevronRight, Link, FileText, Tag, Store } from 'lucide-react';

interface MenuItem {
  _id?: string;
  id?: string;
  title: string;
  name?: string;  // For form editing
  slug?: string;  // For URL slug generation
  url: string;
  order: number;
  parent_id: string | null;
  target?: '_blank' | '_self';
  children?: MenuItem[];
}

interface SelectableItem {
  name: string;
  url: string;
  type: 'page' | 'category' | 'custom';
}

// Predefined pages
const predefinedPages: SelectableItem[] = [
  { name: 'Homepage', url: '/', type: 'page' },
  { name: 'All Coupons', url: '/coupons', type: 'page' },
  { name: 'Stores', url: '/stores', type: 'page' },
  { name: 'Deals', url: '/deals', type: 'page' },
  { name: 'Blog', url: '/blog', type: 'page' },
  { name: 'Contact Us', url: '/contact-us', type: 'page' },
  { name: 'Get Started', url: '/contact-us', type: 'page' },
  { name: 'Contact', url: '/contact-us', type: 'page' },
];

// Static/Legal pages
const staticPages: SelectableItem[] = [
  { name: 'Terms & Conditions', url: '/terms-and-conditions', type: 'page' },
  { name: 'Privacy Policy', url: '/privacy-policy', type: 'page' },
  { name: 'Cookie Policy', url: '/cookie-policy', type: 'page' },
  { name: 'About Us', url: '/about-us', type: 'page' },
];

export default function NavbarMenuBuilder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectableItem[]>([]);
  const [customLink, setCustomLink] = useState({ name: '', url: '' });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [navbarLayout, setNavbarLayout] = useState('navbar4');
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['pages']));
  const [draggedItem, setDraggedItem] = useState<MenuItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [menuRes, categoriesRes, configRes] = await Promise.all([
        getNavbarItems(),
        getCategories(),
        getSiteConfig()
      ]);
      
      // Handle the response structure from backend
      const menuData = menuRes.data;
      const menuArray = menuData?.data || menuData || [];
      
      setMenuItems(Array.isArray(menuArray) ? menuArray : []);
      setCategories(categoriesRes.data?.data || categoriesRes.data || []);
      setNavbarLayout(configRes.data?.navbar?.layout || 'navbar4');
    } catch (error) {
      console.error('Error loading data:', error);
      setMenuItems([]);
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const addToMenu = async () => {
    if (selectedItems.length === 0) return;

    try {
      const maxOrder = Array.isArray(menuItems) && menuItems.length > 0 
        ? Math.max(...menuItems.map(item => item.order || 0), 0) 
        : 0;
      
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        await createNavbarItem({
          title: item.name,
          url: item.url,
          order: maxOrder + i + 1,
          parent_id: null,
          target: '_self'
        });
      }
      
      setSelectedItems([]);
      loadData();
      toast.success('Items added to menu successfully');
    } catch (error) {
      console.error('Error adding items to menu:', error);
      toast.error('Error adding items to menu');
    }
  };

  const addCustomLink = async () => {
    if (!customLink.name || !customLink.url) return;

    try {
      const maxOrder = Array.isArray(menuItems) && menuItems.length > 0 
        ? Math.max(...menuItems.map(item => item.order || 0), 0) 
        : 0;
      
      await createNavbarItem({
        title: customLink.name,
        url: customLink.url,
        order: maxOrder + 1,
        parent_id: null,
        target: '_self'
      });
      
      setCustomLink({ name: '', url: '' });
      loadData();
      toast.success('Custom link added successfully');
    } catch (error) {
      console.error('Error adding custom link:', error);
      toast.error('Error adding custom link');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item, name: item.title, slug: item.url.replace('/', '') }); // Add slug field
    setShowEditForm(true);
  };

  const saveEdit = async () => {
    if (!editingItem) return;

    try {
      const itemId = editingItem._id || editingItem.id;
      if (!itemId) {
        toast.error('Invalid item ID');
        return;
      }
      
      // Generate URL from slug if it doesn't start with /
      const finalUrl = editingItem.slug && !editingItem.slug.startsWith('/') 
        ? `/${editingItem.slug}` 
        : editingItem.url;
      
      await updateNavbarItem(itemId, {
        title: editingItem.name,
        url: finalUrl,
        target: editingItem.target
      });
      
      setShowEditForm(false);
      setEditingItem(null);
      loadData();
      toast.success('Menu item updated successfully');
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Error updating menu item');
    }
  };

  // Helper function to generate slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const itemId = item._id || item.id;
      if (!itemId) {
        toast.error('Invalid item ID');
        return;
      }
      
      await deleteNavbarItem(itemId);
      loadData();
      toast.success('Menu item deleted successfully');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Error deleting menu item');
    }
  };

  const saveNavbarLayout = async () => {
    try {
      const configRes = await getSiteConfig();
      const existingNavbar = configRes.data?.navbar || {};
      await updateSiteConfig({
        navbar: { ...existingNavbar, layout: navbarLayout }
      });
      // Trigger config refresh across all tabs/components
      localStorage.setItem('cms-updated', Date.now().toString());
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cms-updated',
        newValue: Date.now().toString()
      }));
      window.dispatchEvent(new CustomEvent('cms-updated'));
      toast.success('Navbar layout updated successfully');
    } catch (error) {
      console.error('Error updating navbar layout:', error);
      toast.error('Error updating navbar layout');
    }
  };

  const toggleItemSelection = (item: SelectableItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.url === item.url);
      if (exists) {
        return prev.filter(i => i.url !== item.url);
      } else {
        return [...prev, item];
      }
    });
  };

  // Drag and Drop Functions
  const handleDragStart = (e: React.DragEvent, item: MenuItem, index: number) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', (e.currentTarget as HTMLElement).outerHTML);
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the container, not a child element
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (!draggedItem) return;
    
    const dragIndex = menuItems.findIndex(item => 
      (item._id || item.id) === (draggedItem._id || draggedItem.id)
    );
    
    if (dragIndex === dropIndex) return;
    
    try {
      // Create new array with reordered items
      const newItems = [...menuItems];
      const [removed] = newItems.splice(dragIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      
      // Update order values
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order: index + 1
      }));
      
      // Update state immediately for smooth UX
      setMenuItems(updatedItems);
      
      // Update each item in the backend
      for (const item of updatedItems) {
        const itemId = item._id || item.id;
        if (!itemId) continue; // Skip items without valid ID
        
        await updateNavbarItem(itemId, {
          title: item.title,
          url: item.url,
          order: item.order,
          target: item.target
        });
      }
      
      toast.success('Menu order updated successfully');
    } catch (error) {
      console.error('Error updating menu order:', error);
      toast.error('Error updating menu order');
      // Reload data to revert changes
      loadData();
    }
  };

  const card = 'bg-white rounded-2xl border border-slate-100 shadow-sm';

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading...</div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className={`${card} flex justify-between items-center p-5 mb-6`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50">
            <Menu size={22} className="text-indigo-500" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg leading-tight">Menu Builder</h2>
            <p className="text-slate-400 text-sm mt-0.5">Create and manage navigation menu items</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={navbarLayout}
            onChange={(e) => setNavbarLayout(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white"
          >
            <option value="navbar1">Layout 1</option>
            <option value="navbar2">Layout 2</option>
            <option value="navbar3">Layout 3</option>
            <option value="navbar4">Layout 4</option>
          </select>
          <button
            onClick={saveNavbarLayout}
            className="px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors"
          >
            Save Layout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Add Menu Items */}
        <div className={`${card} p-5`}>
          <h3 className="font-bold text-slate-800 mb-4">Add Menu Items</h3>
          
          {/* Pages Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('pages')}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700">Pages</span>
              </div>
              {expandedSections.has('pages') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.has('pages') && (
              <div className="mt-2 space-y-1">
                {predefinedPages.map((page) => (
                  <label key={page.url} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(i => i.url === page.url)}
                      onChange={() => toggleItemSelection(page)}
                      className="w-4 h-4 rounded accent-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{page.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{page.url}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Legal Pages Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('legal')}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Link size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700">Legal Pages</span>
              </div>
              {expandedSections.has('legal') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.has('legal') && (
              <div className="mt-2 space-y-1">
                {staticPages.map((page) => (
                  <label key={page.url} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(i => i.url === page.url)}
                      onChange={() => toggleItemSelection(page)}
                      className="w-4 h-4 rounded accent-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{page.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{page.url}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700">Categories</span>
              </div>
              {expandedSections.has('categories') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.has('categories') && (
              <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                {categories.slice(0, 10).map((category) => {
                  const categoryItem = {
                    name: `${category.name} Coupons`,
                    url: `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`,
                    type: 'category' as const
                  };
                  return (
                    <label key={category._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.some(i => i.url === categoryItem.url)}
                        onChange={() => toggleItemSelection(categoryItem)}
                        className="w-4 h-4 rounded accent-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-700">{categoryItem.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{categoryItem.url}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Custom Links Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('custom')}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Link size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700">Custom Links</span>
              </div>
              {expandedSections.has('custom') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.has('custom') && (
              <div className="mt-2 space-y-3">
                <input
                  type="text"
                  placeholder="Link Text"
                  value={customLink.name}
                  onChange={(e) => setCustomLink(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={customLink.url}
                  onChange={(e) => setCustomLink(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
                <button
                  onClick={addCustomLink}
                  disabled={!customLink.name || !customLink.url}
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Custom Link
                </button>
              </div>
            )}
          </div>

          {/* Add to Menu Button */}
          <button
            onClick={addToMenu}
            disabled={selectedItems.length === 0}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
          >
            <Plus size={16} />
            Add to Menu ({selectedItems.length})
          </button>
        </div>

        {/* Right Side - Menu Structure */}
        <div className={`${card} p-5 lg:col-span-2`}>
          <h3 className="font-bold text-slate-800 mb-4">Menu Structure</h3>
          
          {!Array.isArray(menuItems) || menuItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <Menu size={28} className="text-indigo-400" />
              </div>
              <p className="font-semibold text-slate-700 text-lg mb-2">No menu items yet</p>
              <p className="text-slate-400 text-sm">Add some items from the left panel to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const itemId = item._id || item.id;
                const isDragOver = dragOverIndex === index;
                const isDragging = draggedItem && (draggedItem._id || draggedItem.id) === itemId;
                
                return (
                  <div 
                    key={itemId} 
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all group ${
                      isDragOver 
                        ? 'border-indigo-400 bg-indigo-50 shadow-md transform scale-[1.02]' 
                        : isDragging 
                        ? 'border-slate-300 bg-slate-50 opacity-50' 
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <button className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing transition-colors">
                      <GripVertical size={16} />
                    </button>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-sm text-slate-400 font-mono">{item.url}</div>
                      {item.target === '_blank' && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                          New Tab
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEditForm(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Edit Menu Item</h3>
              <button
                onClick={() => setShowEditForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Navigation Label</label>
                <input
                  type="text"
                  value={editingItem.name || ''}
                  onChange={(e) => {
                    const name = e.target.value;
                    setEditingItem(prev => prev ? { 
                      ...prev, 
                      name,
                      slug: generateSlug(name) // Auto-generate slug
                    } : null);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  URL Slug <span className="text-indigo-400 font-mono text-xs">→ /{editingItem.slug || 'slug'}</span>
                </label>
                <input
                  type="text"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, slug: generateSlug(e.target.value) } : null)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono outline-none focus:border-indigo-400 transition-colors"
                  placeholder="auto-generated-from-label"
                />
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.target === '_blank'}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, target: e.target.checked ? '_blank' : '_self' } : null)}
                  className="w-4 h-4 rounded accent-indigo-500"
                />
                <span className="text-sm font-medium text-slate-700">Open in new tab</span>
              </label>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditForm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}