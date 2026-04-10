'use client';
import { useState, useEffect } from 'react';
import {
  Button, TextField, Switch, FormControlLabel,
  Drawer, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Article, CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from '@mui/icons-material';
import { getAdminBlogArticles, createBlogArticle, updateBlogArticle, deleteBlogArticle, bulkDeleteBlogArticles } from '@/services/api';
import AdminShell from '@/components/admin/AdminShell';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminLoader from '@/components/admin/AdminLoader';
import ImageUploadField from '@/components/admin/ImageUploadField';
import toast from 'react-hot-toast';

interface ContentParagraph {
  question: string;
  answer: string;
}

interface Design {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  note: string;
  noteUrl: string;
  noteLinkText: string;
}

interface RelatedPost {
  title: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

interface BlogArticle {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  content: string[];
  contentParagraphs: ContentParagraph[];
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  // Rich layout fields
  useRichLayout: boolean;
  heroImage: string;
  dateLabel: string;
  introduction: string;
  author: { name: string; bio: string; avatar: string; website: string };
  introSection: { heading: string; description: string };
  collectionSection: { label: string; heading: string; description: string };
  designs: Design[];
  wrapUp: string;
  relatedPosts: RelatedPost[];
}

const emptyDesign: Design = { id: 1, title: '', description: '', image: '', difficulty: 'Easy', note: '', noteUrl: '', noteLinkText: '' };
const emptyRelated: RelatedPost = { title: '', image: '', date: '', category: '', slug: '' };

const emptyForm: BlogArticle = {
  title: '', slug: '', category: '', subtitle: '', description: '',
  image: '', content: [''], contentParagraphs: [], isFeatured: false, isActive: true, order: 0,
  useRichLayout: false, heroImage: '', dateLabel: '', introduction: '',
  author: { name: '', bio: '', avatar: '', website: '' },
  introSection: { heading: '', description: '' },
  collectionSection: { label: '', heading: '', description: '' },
  designs: [], wrapUp: '', relatedPosts: [],
};

export default function BlogManagement() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<BlogArticle | null>(null);
  const [formData, setFormData] = useState<BlogArticle>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<BlogArticle | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  
  // New state for drawer editing
  const [relatedDrawerOpen, setRelatedDrawerOpen] = useState(false);
  const [editingRelatedPosts, setEditingRelatedPosts] = useState<RelatedPost[]>([]);
  const [selectedArticleForEdit, setSelectedArticleForEdit] = useState<BlogArticle | null>(null);

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    try {
      const res = await getAdminBlogArticles();
      setArticles(res.data?.data ?? []);
    } catch { toast.error('Failed to load articles'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) { toast.error('Title and slug are required'); return; }
    try {
      if (editing?._id) {
        await updateBlogArticle(editing._id, formData);
        toast.success('Article updated!');
      } else {
        await createBlogArticle(formData);
        toast.success('Article created!');
      }
      setDrawerOpen(false); setFormData(emptyForm); setEditing(null); fetchArticles();
    } catch { toast.error('Failed to save article'); }
  };

  const handleDelete = async () => {
    if (!deleteConfirm?._id) return;
    try {
      await deleteBlogArticle(deleteConfirm._id);
      toast.success('Article deleted!'); setDeleteConfirm(null); fetchArticles();
    } catch { toast.error('Failed to delete'); }
  };

  const toggleSelect = (id: string) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () => setSelected(prev => prev.size === articles.length ? new Set() : new Set(articles.map(a => a._id!)));

  const confirmBulkDelete = async () => {
    try {
      const res = await bulkDeleteBlogArticles(Array.from(selected));
      toast.success(res.data?.message || `${selected.size} article(s) deleted`);
      setSelected(new Set()); fetchArticles();
    } catch { toast.error('Failed to delete articles'); }
    setBulkDeleteOpen(false);
  };

  const openEdit = (a: BlogArticle) => {
    setFormData({
      ...emptyForm,
      ...a,
      author: { ...emptyForm.author, ...a.author },
      introSection: { ...emptyForm.introSection, ...a.introSection },
      collectionSection: { ...emptyForm.collectionSection, ...a.collectionSection },
      designs: a.designs?.length ? a.designs : [],
      relatedPosts: a.relatedPosts?.length ? a.relatedPosts : [],
      content: a.content?.length ? a.content : [''],
      contentParagraphs: a.contentParagraphs?.length ? a.contentParagraphs : [],
    });
    setEditing(a);
    setDrawerOpen(true);
  };
  
  const openAdd = () => { setFormData(emptyForm); setEditing(null); setDrawerOpen(true); };
  const set = (patch: Partial<BlogArticle>) => setFormData(f => ({ ...f, ...patch }));

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Functions for editing related posts in drawers
  const openRelatedDrawer = (article: BlogArticle) => {
    setSelectedArticleForEdit(article);
    setEditingRelatedPosts(article.relatedPosts || []);
    setRelatedDrawerOpen(true);
  };

  const saveRelatedPosts = async () => {
    if (!selectedArticleForEdit?._id) return;
    try {
      const updatedArticle = {
        ...selectedArticleForEdit,
        relatedPosts: editingRelatedPosts
      };
      await updateBlogArticle(selectedArticleForEdit._id, updatedArticle);
      toast.success('Related posts updated!');
      setRelatedDrawerOpen(false);
      setSelectedArticleForEdit(null);
      fetchArticles();
    } catch {
      toast.error('Failed to update related posts');
    }
  };

  if (loading) return (
    <AdminShell>
      <AdminLoader message="Loading articles..." fullPage />
    </AdminShell>
  );

  return (
    <AdminShell>


      {/* Blog Articles Section */}
      <AdminPageHeader 
        title="Blog Articles"
        subtitle="Manage blog section on homepage"
        icon={<Article style={{ color: '#3b82f6', fontSize: 22 }} />}
        actions={
          <>
            {selected.size > 0 && (
              <Button variant="contained" startIcon={<Delete />} onClick={() => setBulkDeleteOpen(true)}
                style={{ background: '#ef4444', borderRadius: 12, textTransform: 'none', fontWeight: 600 }}>Delete ({selected.size})</Button>
            )}
            {articles.length > 0 && (
              <Button variant="outlined" onClick={toggleAll} size="small"
                style={{ borderColor: '#3b82f6', color: '#3b82f6', borderRadius: 10, textTransform: 'none', fontSize: 12 }}>
                {selected.size === articles.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
            <Button variant="contained" startIcon={<Add />} onClick={openAdd}
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', borderRadius: 12, textTransform: 'none', fontWeight: 600 }}>
              Add Article
            </Button>
          </>
        }
      />

      {articles.length === 0 ? (
        <div className="rounded-2xl p-16 flex flex-col items-center gap-4 text-center bg-white border border-slate-100 shadow-sm">
          <Article style={{ color: '#3b82f6', fontSize: 28 }} />
          <p className="text-slate-600 font-semibold text-lg">No Articles Yet</p>
          <Button variant="contained" startIcon={<Add />} onClick={openAdd}
            style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', borderRadius: 10, textTransform: 'none' }}>
            Create First Article
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => (
            <div key={a._id} className="rounded-2xl p-5 bg-white border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: selected.has(a._id!) ? '#3b82f6' : 'rgb(241 245 249)' }}>
              <div className="flex items-center gap-2 mb-2">
                <IconButton size="small" onClick={() => toggleSelect(a._id!)} style={{ color: selected.has(a._id!) ? '#3b82f6' : '#d1d5db' }}>
                  {selected.has(a._id!) ? <CheckBoxIcon /> : <CheckBoxOutlineBlank />}
                </IconButton>
              </div>
              {a.image && <img src={a.image} alt={a.title} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{a.title}</p>
                  <p className="text-slate-400 text-xs">{a.category}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: a.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: a.isActive ? '#10b981' : '#ef4444' }}>
                  {a.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {a.description && <p className="text-slate-500 text-xs mb-3 line-clamp-2">{a.description}</p>}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                {a.isFeatured && <span className="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded">Featured</span>}
                {(a as any).useRichLayout && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Rich</span>}
                <span className="bg-slate-50 px-2 py-0.5 rounded">/{a.slug}</span>
              </div>
              <div className="flex gap-2">
                <IconButton onClick={() => openEdit(a)} size="small" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', borderRadius: 8 }}>
                  <Edit fontSize="small" />
                </IconButton>
                {a.useRichLayout && (
                  <>
                    <Button 
                      onClick={() => openRelatedDrawer(a)} 
                      size="small" 
                      style={{ background: 'rgba(79,70,229,0.08)', color: '#4f46e5', borderRadius: 8, textTransform: 'none', fontSize: 11, minWidth: 'auto', padding: '4px 8px' }}
                    >
                      Related Posts ({a.relatedPosts?.length || 0})
                    </Button>
                  </>
                )}
                <IconButton onClick={() => setDeleteConfirm(a)} size="small" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', borderRadius: 8 }}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: formData.useRichLayout ? 680 : 520 } } }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)' }}>
            <div className="flex items-center gap-2 text-white">
              <Article />
              <span className="font-semibold text-lg">{editing ? 'Edit Article' : 'Add New Article'}</span>
            </div>
            <IconButton onClick={() => setDrawerOpen(false)} style={{ color: '#fff' }}><span className="text-xl leading-none">&times;</span></IconButton>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Basic Info */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Article Information</p>
            <TextField fullWidth label="Title *" value={formData.title} onChange={(e) => { set({ title: e.target.value }); if (!editing) set({ slug: autoSlug(e.target.value) }); }} variant="outlined" placeholder="e.g., Top 10 Beauty Deals" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
            <TextField fullWidth label="Slug *" value={formData.slug} onChange={(e) => set({ slug: e.target.value })} variant="outlined" placeholder="e.g., top-10-beauty-deals" helperText="Auto-generated from title" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
            <div className="grid grid-cols-2 gap-4">
              <TextField fullWidth label="Category" value={formData.category} onChange={(e) => set({ category: e.target.value })} placeholder="e.g., BEAUTY" variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
              <TextField fullWidth label="Order" type="number" value={formData.order} onChange={(e) => set({ order: Number(e.target.value) })} variant="outlined" InputLabelProps={{ shrink: true }} helperText="Lower = shown first" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
            </div>
            <TextField fullWidth label="Subtitle" value={formData.subtitle} onChange={(e) => set({ subtitle: e.target.value })} variant="outlined" placeholder="e.g., Best picks this week" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
            <TextField fullWidth label="Description" value={formData.description} onChange={(e) => set({ description: e.target.value })} multiline rows={3} variant="outlined" />
            <ImageUploadField label="Thumbnail Image" value={formData.image} onChange={(url) => set({ image: url })} uploadType="blog" />

            {/* Content Paragraphs (simple layout) */}
            {!formData.useRichLayout && (
              <>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider pt-2">Content Paragraphs (Q&A Format)</p>
                {formData.contentParagraphs.map((para, i) => (
                  <div key={i} className="rounded-lg border border-blue-200 p-4 bg-blue-50/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-600">Q&A #{i + 1}</span>
                      <IconButton onClick={() => set({ contentParagraphs: formData.contentParagraphs.filter((_, j) => j !== i) })} size="small" style={{ color: '#ef4444' }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                    <TextField 
                      fullWidth 
                      label="Question" 
                      value={para.question} 
                      onChange={(e) => {
                        const newParagraphs = [...formData.contentParagraphs];
                        newParagraphs[i] = { ...newParagraphs[i], question: e.target.value };
                        set({ contentParagraphs: newParagraphs });
                      }}
                      placeholder="e.g., How to track expenses effectively?"
                      variant="outlined" 
                      sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                    />
                    <TextField 
                      fullWidth 
                      label="Answer" 
                      value={para.answer} 
                      onChange={(e) => {
                        const newParagraphs = [...formData.contentParagraphs];
                        newParagraphs[i] = { ...newParagraphs[i], answer: e.target.value };
                        set({ contentParagraphs: newParagraphs });
                      }}
                      multiline 
                      rows={3} 
                      placeholder="Provide detailed answer here..."
                      variant="outlined" 
                    />
                  </div>
                ))}
                <Button 
                  size="small" 
                  onClick={() => set({ contentParagraphs: [...formData.contentParagraphs, { question: '', answer: '' }] })}
                  style={{ textTransform: 'none', color: '#3b82f6' }}
                >
                  + Add Q&A
                </Button>
              </>
            )}

            {/* Toggles */}
            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 space-y-1">
              <FormControlLabel control={<Switch checked={formData.isActive} onChange={(e) => set({ isActive: e.target.checked })} color="success" />} label={<span className="text-sm font-medium text-slate-700">Active</span>} />
              <FormControlLabel control={<Switch checked={formData.isFeatured} onChange={(e) => set({ isFeatured: e.target.checked })} color="warning" />} label={<span className="text-sm font-medium text-slate-700">Featured</span>} />
              <FormControlLabel control={<Switch checked={formData.useRichLayout} onChange={(e) => set({ useRichLayout: e.target.checked })} color="info" />} label={<span className="text-sm font-medium text-slate-700">Use Rich Magazine Layout</span>} />
            </div>

            {/* ===== RICH LAYOUT FIELDS ===== */}
            {formData.useRichLayout && (
              <>
                {/* Hero */}
                <div className="rounded-xl border-2 border-blue-200 p-4 bg-blue-50/30 space-y-4">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hero Section</p>
                  <ImageUploadField label="Hero Image (full-width banner)" value={formData.heroImage} onChange={(url) => set({ heroImage: url })} uploadType="blog" />
                  <TextField fullWidth label="Date Label" value={formData.dateLabel} onChange={(e) => set({ dateLabel: e.target.value })} placeholder="e.g., March 28, 2026" variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                </div>

                {/* Author */}
                <div className="rounded-xl border-2 border-purple-200 p-4 bg-purple-50/30 space-y-4">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Author</p>
                  <div className="grid grid-cols-2 gap-4">
                    <TextField fullWidth label="Author Name" value={formData.author.name} onChange={(e) => set({ author: { ...formData.author, name: e.target.value } })} variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                    <TextField fullWidth label="Author Website" value={formData.author.website} onChange={(e) => set({ author: { ...formData.author, website: e.target.value } })} placeholder="https://..." variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                  </div>
                  <TextField fullWidth label="Author Bio" value={formData.author.bio} onChange={(e) => set({ author: { ...formData.author, bio: e.target.value } })} multiline rows={2} variant="outlined" />
                  <ImageUploadField label="Author Avatar" value={formData.author.avatar} onChange={(url) => set({ author: { ...formData.author, avatar: url } })} uploadType="blog" />
                </div>

                {/* Introduction */}
                <div className="rounded-xl border-2 border-green-200 p-4 bg-green-50/30 space-y-4">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Introduction</p>
                  <TextField fullWidth label="Introduction Paragraph" value={formData.introduction} onChange={(e) => set({ introduction: e.target.value })} multiline rows={4} variant="outlined" placeholder="The opening paragraph with drop cap..." />
                </div>

                {/* Intro Section (e.g. "When is Ugadi?") */}
                <div className="rounded-xl border-2 border-amber-200 p-4 bg-amber-50/30 space-y-4">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Info Card Section</p>
                  <TextField fullWidth label="Heading" value={formData.introSection.heading} onChange={(e) => set({ introSection: { ...formData.introSection, heading: e.target.value } })} placeholder="e.g., When is Ugadi in 2026?" variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                  <TextField fullWidth label="Description" value={formData.introSection.description} onChange={(e) => set({ introSection: { ...formData.introSection, description: e.target.value } })} multiline rows={2} variant="outlined" />
                </div>

                {/* Collection Section Header */}
                <div className="rounded-xl border-2 border-cyan-200 p-4 bg-cyan-50/30 space-y-4">
                  <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Collection Section Header</p>
                  <TextField fullWidth label="Label" value={formData.collectionSection.label} onChange={(e) => set({ collectionSection: { ...formData.collectionSection, label: e.target.value } })} placeholder="e.g., The Collection" variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                  <TextField fullWidth label="Heading" value={formData.collectionSection.heading} onChange={(e) => set({ collectionSection: { ...formData.collectionSection, heading: e.target.value } })} placeholder="e.g., 21+ Simple Ugadi Rangoli" variant="outlined" sx={{ '& .MuiInputBase-root': { minHeight: 48 } }} />
                  <TextField fullWidth label="Description" value={formData.collectionSection.description} onChange={(e) => set({ collectionSection: { ...formData.collectionSection, description: e.target.value } })} multiline rows={2} variant="outlined" />
                </div>

                {/* Note about Design Cards and Related Posts */}
                {/* Q&A Content for Rich Layout */}
                <div className="rounded-xl border-2 border-green-200 p-4 bg-green-50/30 space-y-4">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Content Paragraphs (Q&A Format)</p>
                  {formData.contentParagraphs.map((para, i) => (
                    <div key={i} className="rounded-lg border border-green-300 p-4 bg-white space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-green-600">Q&A #{i + 1}</span>
                        <IconButton onClick={() => set({ contentParagraphs: formData.contentParagraphs.filter((_, j) => j !== i) })} size="small" style={{ color: '#ef4444' }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </div>
                      <TextField 
                        fullWidth 
                        label="Question" 
                        value={para.question} 
                        onChange={(e) => {
                          const newParagraphs = [...formData.contentParagraphs];
                          newParagraphs[i] = { ...newParagraphs[i], question: e.target.value };
                          set({ contentParagraphs: newParagraphs });
                        }}
                        placeholder="e.g., How to track expenses effectively?"
                        variant="outlined" 
                        sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                      />
                      <TextField 
                        fullWidth 
                        label="Answer" 
                        value={para.answer} 
                        onChange={(e) => {
                          const newParagraphs = [...formData.contentParagraphs];
                          newParagraphs[i] = { ...newParagraphs[i], answer: e.target.value };
                          set({ contentParagraphs: newParagraphs });
                        }}
                        multiline 
                        rows={3} 
                        placeholder="Provide detailed answer here..."
                        variant="outlined" 
                      />
                    </div>
                  ))}
                  <Button 
                    size="small" 
                    onClick={() => set({ contentParagraphs: [...formData.contentParagraphs, { question: '', answer: '' }] })}
                    style={{ textTransform: 'none', color: '#16a34a', borderColor: '#16a34a' }}
                    variant="outlined"
                  >
                    + Add Q&A
                  </Button>
                </div>

                <div className="rounded-xl border-2 border-amber-200 p-4 bg-amber-50/30">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Related Posts</p>
                  <p className="text-sm text-amber-700 mb-3">
                    Related Posts are now edited in the main content area outside this drawer.
                  </p>
                  <p className="text-xs text-amber-600">
                    After creating/updating this article, use the "Related Posts" button on the article card to manage Related Posts.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t flex-shrink-0">
            <Button onClick={() => setDrawerOpen(false)} variant="outlined" style={{ borderRadius: 8, textTransform: 'none' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', borderRadius: 8, textTransform: 'none', fontWeight: 600, paddingLeft: 24, paddingRight: 24 }}>
              {editing ? 'Update Article' : 'Create Article'}
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Bulk Delete */}
      <Dialog open={bulkDeleteOpen} onClose={() => setBulkDeleteOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ color: '#ef4444', background: '#fef2f2' }}>
          <div className="flex items-center gap-2"><Delete /><span>Delete {selected.size} Article(s)</span></div>
        </DialogTitle>
        <DialogContent className="pt-4"><p className="text-slate-600 text-sm">Delete <strong>{selected.size} selected article(s)</strong>? This cannot be undone.</p></DialogContent>
        <DialogActions className="p-4 bg-slate-50">
          <Button onClick={() => setBulkDeleteOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={confirmBulkDelete} variant="contained" style={{ background: '#ef4444', borderRadius: 8, textTransform: 'none' }}>Delete All</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ color: '#ef4444', background: '#fef2f2' }}>
          <div className="flex items-center gap-2"><Delete /><span>Delete Article</span></div>
        </DialogTitle>
        <DialogContent className="pt-4">
          <p className="text-slate-600 text-sm">Delete <strong>&quot;{deleteConfirm?.title}&quot;</strong>? This cannot be undone.</p>
        </DialogContent>
        <DialogActions className="p-4 bg-slate-50">
          <Button onClick={() => setDeleteConfirm(null)} variant="outlined">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" style={{ background: '#ef4444', borderRadius: 8, textTransform: 'none' }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Related Posts Drawer */}
      <Drawer anchor="right" open={relatedDrawerOpen} onClose={() => setRelatedDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 600 } } }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg,#4f46e5,#3730a3)' }}>
            <div className="flex items-center gap-2 text-white">
              <Article />
              <span className="font-semibold text-lg">Related Posts ({editingRelatedPosts.length})</span>
            </div>
            <IconButton onClick={() => setRelatedDrawerOpen(false)} style={{ color: '#fff' }}>
              <span className="text-xl leading-none">&times;</span>
            </IconButton>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Editing: <strong>{selectedArticleForEdit?.title}</strong></p>
              <Button 
                startIcon={<Add />} 
                onClick={() => setEditingRelatedPosts([...editingRelatedPosts, { ...emptyRelated }])}
                style={{ textTransform: 'none', color: '#4f46e5', borderColor: '#4f46e5' }}
                variant="outlined"
                size="small"
              >
                Add Post
              </Button>
            </div>
            
            {editingRelatedPosts.map((post, index) => (
              <div key={index} className="rounded-lg border border-indigo-200 p-4 bg-indigo-50/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-indigo-600">Related Post #{index + 1}</span>
                  <IconButton 
                    size="small" 
                    onClick={() => setEditingRelatedPosts(editingRelatedPosts.filter((_, i) => i !== index))}
                    style={{ color: '#ef4444' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
                
                <TextField 
                  fullWidth 
                  label="Title" 
                  value={post.title} 
                  onChange={(e) => {
                    const newPosts = [...editingRelatedPosts];
                    newPosts[index] = { ...newPosts[index], title: e.target.value };
                    setEditingRelatedPosts(newPosts);
                  }}
                  variant="outlined" 
                  sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <TextField 
                    fullWidth 
                    label="Slug" 
                    value={post.slug} 
                    onChange={(e) => {
                      const newPosts = [...editingRelatedPosts];
                      newPosts[index] = { ...newPosts[index], slug: e.target.value };
                      setEditingRelatedPosts(newPosts);
                    }}
                    variant="outlined" 
                    sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                  />
                  
                  <TextField 
                    fullWidth 
                    label="Category" 
                    value={post.category} 
                    onChange={(e) => {
                      const newPosts = [...editingRelatedPosts];
                      newPosts[index] = { ...newPosts[index], category: e.target.value };
                      setEditingRelatedPosts(newPosts);
                    }}
                    variant="outlined" 
                    sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                  />
                </div>
                
                <TextField 
                  fullWidth 
                  label="Date" 
                  value={post.date} 
                  onChange={(e) => {
                    const newPosts = [...editingRelatedPosts];
                    newPosts[index] = { ...newPosts[index], date: e.target.value };
                    setEditingRelatedPosts(newPosts);
                  }}
                  placeholder="e.g., March 28, 2026" 
                  variant="outlined" 
                  sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
                />
                
                <ImageUploadField 
                  label="Image" 
                  value={post.image} 
                  onChange={(url) => {
                    const newPosts = [...editingRelatedPosts];
                    newPosts[index] = { ...newPosts[index], image: url };
                    setEditingRelatedPosts(newPosts);
                  }}
                  uploadType="blog" 
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t flex-shrink-0">
            <Button onClick={() => setRelatedDrawerOpen(false)} variant="outlined" style={{ borderRadius: 8, textTransform: 'none' }}>Cancel</Button>
            <Button onClick={saveRelatedPosts} variant="contained"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#3730a3)', borderRadius: 8, textTransform: 'none', fontWeight: 600 }}>
              Save Related Posts
            </Button>
          </div>
        </div>
      </Drawer>
    </AdminShell>
  );
}
