'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getSiteConfig, updateSiteConfig } from '@/services/api';
import LogoUploader from './LogoUploader';
import ColorPicker from './ColorPicker';
import { updateFavicon, updatePageTitle, updateMetaTags } from '@/utils/faviconUtils';
import { Palette, Navigation, ArrowDownCircle, FileText, HelpCircle, Home, Globe, Info, Phone } from 'lucide-react';
import { Store as StoreIcon } from 'lucide-react';
import FontDemo from '@/components/FontDemo';
import toast from 'react-hot-toast';

export default function SiteConfigAdmin() {
  const [config, setConfig] = useState<any>({
    siteName: '',
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      favicon: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterCard: 'summary_large_image',
      twitterSite: ''
    },
    theme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#9333ea',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      accentColor: '#f59e0b',
      successColor: '#10b981',
      errorColor: '#ef4444',
      warningColor: '#f59e0b'
    },
    navbar: {
      style: 'solid',
      bgColor: '',
      textColor: '#ffffff',
      showSearch: true,
      showThemeToggle: true,
      sticky: true,
    },
    footerConfig: {
      layout: 'footer1',
      style: 'standard',
      bgColor: '',
      textColor: '#ffffff',
      showAppDownload: true,
      showContactInfo: true,
    },
    footerContent: {
      tagline: 'Find the best deals, coupons, and discounts from top brands.',
      columns: [
        { heading: 'Quick Links', links: [{ label: 'Home', href: '/' }, { label: 'Stores', href: '/stores' }, { label: 'Coupons', href: '/coupons' }] },
        { heading: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Contact', href: '#' }] },
        { heading: 'Support', links: [{ label: 'Help Center', href: '#' }, { label: 'Privacy Policy', href: '#' }, { label: 'Terms', href: '#' }] },
      ],
      bottomLinks: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        { label: 'Sitemap', href: '/sitemap.xml' },
      ]
    },
    fonts: {
      combination: 'modern'
    },
    logos: {
      navbar: '',
      footer: '',
      favicon: '',
      ogImage: ''
    },
    socialMedia: {
      facebook: { label: 'Facebook', url: '', icon: 'facebook', enabled: true },
      twitter: { label: 'Twitter', url: '', icon: 'twitter', enabled: true },
      instagram: { label: 'Instagram', url: '', icon: 'instagram', enabled: true },
      linkedin: { label: 'LinkedIn', url: '', icon: 'linkedin', enabled: false },
      youtube: { label: 'YouTube', url: '', icon: 'youtube', enabled: false },
      tiktok: { label: 'TikTok', url: '', icon: 'tiktok', enabled: false }
    },
    footer: {
      copyright: '',
      email: '',
      phone: '',
      address: '',
      showSocialMedia: true,
      showNewsletter: true
    },
    footerCategories: [
      {
        title: 'Travel & Essentials',
        groups: [
          { heading: 'Travel & Transportation', links: [
            { label: 'Flight Coupons', href: '/coupons/flight-coupons' },
            { label: 'Travel Coupons', href: '/coupons/travel-coupons' },
            { label: 'Hotel Coupons', href: '/coupons/hotel-coupons' },
            { label: 'Bus Coupons', href: '/coupons/bus-coupons' },
            { label: 'Bike Rentals Coupons', href: '/coupons/bike-rentals-coupons' },
          ]},
          { heading: 'Utilities & Recharge', links: [
            { label: 'Utility Bill Payments Coupons', href: '/coupons/utility-bill-payments-coupons' },
            { label: 'Recharge Coupons', href: '/coupons/recharge-coupons' },
          ]},
          { heading: 'Web & Hosting', links: [
            { label: 'Hosting Coupons', href: '/coupons/hosting-coupons' },
          ]},
        ]
      },
      {
        title: 'Food & Lifestyle',
        groups: [
          { heading: 'Food & Dining', links: [
            { label: 'Pizza Coupons', href: '/coupons/pizza-coupons' },
            { label: 'Meat & Dairy Coupons', href: '/coupons/meat-dairy-coupons' },
            { label: 'Groceries Coupons', href: '/coupons/groceries-coupons' },
          ]},
          { heading: 'Shopping & Lifestyle', links: [
            { label: 'Fashion Coupons', href: '/coupons/fashion-coupons' },
            { label: 'Footwear Coupons', href: '/coupons/footwear-coupons' },
            { label: 'Jewellery Coupons', href: '/coupons/jewellery-coupons' },
            { label: 'Kids & Lifestyle Coupons', href: '/coupons/kids-lifestyle-coupons' },
            { label: 'Lingerie Coupons', href: '/coupons/lingerie-coupons' },
          ]},
          { heading: 'Gifts & Specialty', links: [
            { label: 'Gifts & Flowers Coupons', href: '/coupons/gifts-flowers-coupons' },
          ]},
        ]
      },
      {
        title: 'Health & Personal Care',
        groups: [
          { heading: 'Beauty & Health', links: [
            { label: 'Beauty Coupons', href: '/coupons/beauty-coupons' },
            { label: 'Medicines Coupons', href: '/coupons/medicines-coupons' },
            { label: 'Lab Tests Coupons', href: '/coupons/lab-tests-coupons' },
            { label: 'Protein Supplements Coupons', href: '/coupons/protein-supplements-coupons' },
          ]},
          { heading: 'Personal Services', links: [
            { label: 'Services Coupons', href: '/coupons/services-coupons' },
            { label: 'Eyewear Coupons', href: '/coupons/eyewear-coupons' },
          ]},
          { heading: 'Education & Learning', links: [
            { label: 'Education Coupons', href: '/coupons/education-coupons' },
          ]},
        ]
      },
      {
        title: 'Tech & Entertainment',
        groups: [
          { heading: 'Electronics & Appliances', links: [
            { label: 'Electronics Coupons', href: '/coupons/electronics-coupons' },
            { label: 'Kitchen Appliances Coupons', href: '/coupons/kitchen-appliances-coupons' },
          ]},
          { heading: 'Entertainment & Subscriptions', links: [
            { label: 'Entertainment Coupons', href: '/coupons/entertainment-coupons' },
            { label: 'OTT Coupons', href: '/coupons/ott-coupons' },
          ]},
          { heading: 'Home & Furniture', links: [
            { label: 'Furniture Coupons', href: '/coupons/furniture-coupons' },
          ]},
        ]
      },
    ],
    promoCard: {
      title: 'Earn Up To $100 ExtraBucks At CVS',
      description: "Steal this influencer's top picks from her latest CVS beauty haul.",
      ctaText: 'Click To Watch Video',
      ctaLink: '#',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop',
      bgColor: '#2563eb',
      enabled: true
    }
  });
  
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [faqHeading, setFaqHeading] = useState('Frequently Asked Questions');
  const [faqShowOn, setFaqShowOn] = useState('both');
  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await getSiteConfig();
      setConfig((prev: any) => ({
        ...prev,
        ...response.data,
        footerCategories: (response.data.footerCategories && response.data.footerCategories.length > 0)
          ? response.data.footerCategories
          : prev.footerCategories || [],
      }));
      setFaqHeading(response.data?.faqs?.heading || 'Frequently Asked Questions');
      setFaqShowOn(response.data?.faqs?.showOn || 'both');
      setFaqItems(response.data?.faqs?.items || []);
    } catch (error) {
      console.error('Error fetching site config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const loadingToast = toast.loading('Saving configuration...');
    
    try {
      await updateSiteConfig({
        ...config,
        footerCategories: config.footerCategories || [],
      });
      
      // Update favicon if changed
      if (config.logos.favicon) {
        const faviconUpdated = updateFavicon(config.logos.favicon);
        if (faviconUpdated) {
          toast.success('Favicon updated successfully!', { id: loadingToast });
        }
      }
      
      // Update page title if changed
      if (config.seo.metaTitle) {
        updatePageTitle(config.seo.metaTitle);
      }
      
      // Update meta tags
      updateMetaTags({
        title: config.seo.metaTitle,
        description: config.seo.metaDescription,
        keywords: config.seo.metaKeywords,
        ogTitle: config.seo.ogTitle,
        ogDescription: config.seo.ogDescription,
        ogImage: config.logos.ogImage,
        twitterSite: config.seo.twitterSite
      });
      
      // Trigger global refresh
      localStorage.setItem('cms-updated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('cms-updated'));
      
      toast.success('Site configuration updated successfully!', { id: loadingToast });
    } catch (error) {
      toast.error('Error updating site configuration. Please try again.', { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !config.seo.metaKeywords.includes(newKeyword.trim())) {
      setConfig({
        ...config,
        seo: {
          ...config.seo,
          metaKeywords: [...config.seo.metaKeywords, newKeyword.trim()]
        }
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setConfig({
      ...config,
      seo: {
        ...config.seo,
        metaKeywords: config.seo.metaKeywords.filter((k: string) => k !== keyword)
      }
    });
  };

  const updateSocialMedia = (platform: string, field: string, value: any) => {
    setConfig({
      ...config,
      socialMedia: {
        ...config.socialMedia,
        [platform]: {
          ...config.socialMedia[platform],
          [field]: value
        }
      }
    });
  };

  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading configuration...</Typography></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Complete Site Configuration
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Configure all aspects of your website from this single panel. Changes apply immediately across the entire site.
      </Alert>

      {/* Font Preview & Testing */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Font Preview & Testing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Preview how different font combinations look across your application. Changes apply instantly when you select a new font combination in the Site Configuration above.
          </Typography>
          <FontDemo />
        </AccordionDetails>
      </Accordion>

      {/* Global FAQ Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Global FAQ Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage FAQs that appear on your site. Use the &quot;Show On&quot; dropdown to control where they display.
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, p: 1.5, borderRadius: 2, background: '#f0f4ff', color: '#4338ca', fontSize: 13 }}>
            Tip: Use <code style={{ background: '#e0e7ff', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>{'{storeName}'}</code> in questions and answers &mdash; it will be automatically replaced with the actual store name on each store page.
          </Typography>

          <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <TextField
                  fullWidth
                  label="Section Heading"
                  value={faqHeading}
                  onChange={e => setFaqHeading(e.target.value)}
                  placeholder="Frequently Asked Questions"
                  InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl fullWidth>
                  <InputLabel>Show On</InputLabel>
                  <Select
                    value={faqShowOn}
                    label="Show On"
                    onChange={(e) => setFaqShowOn(e.target.value)}
                    sx={{ height: 48, borderRadius: 2 }}
                    renderValue={(val) => (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {val === 'both' && <><Globe size={15} /> Both (Home + Store Pages)</>}
                        {val === 'home' && <><Home size={15} /> Home Page Only</>}
                        {val === 'store' && <><StoreIcon size={15} /> Store Pages Only</>}
                      </span>
                    )}
                  >
                    <MenuItem value="both">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={15} /> Both (Home + Store Pages)</span>
                    </MenuItem>
                    <MenuItem value="home">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Home size={15} /> Home Page Only</span>
                    </MenuItem>
                    <MenuItem value="store">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><StoreIcon size={15} /> Store Pages Only</span>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 520, overflowY: 'auto', paddingRight: 4 }}>
            {faqItems.map((item, i) => (
              <Card key={i} variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'visible' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <HelpCircle size={14} color="#6366f1" />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#6366f1', letterSpacing: 0.5 }}>FAQ {i + 1}</Typography>
                  </div>
                  <Button size="small" color="error" onClick={() => setFaqItems(f => f.filter((_, idx) => idx !== i))}
                    sx={{ minWidth: 0, fontSize: 12, textTransform: 'none' }}>Remove</Button>
                </div>
                <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <TextField
                    fullWidth
                    label="Question"
                    value={item.question}
                    onChange={e => setFaqItems(f => { const n = [...f]; n[i] = { ...n[i], question: e.target.value }; return n; })}
                    InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label="Answer"
                    value={item.answer}
                    onChange={e => setFaqItems(f => { const n = [...f]; n[i] = { ...n[i], answer: e.target.value }; return n; })}
                    multiline
                    rows={3}
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                </div>
              </Card>
            ))}
            {faqItems.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                <HelpCircle size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                <Typography variant="body2" color="text.secondary">No FAQs yet &mdash; click &quot;+ Add FAQ&quot; below</Typography>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <Button variant="outlined" onClick={() => setFaqItems(f => [...f, { question: '', answer: '' }])}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>+ Add FAQ</Button>
            <Button variant="contained" onClick={async () => {
              try {
                await updateSiteConfig({ faqs: { heading: faqHeading, showOn: faqShowOn, items: faqItems } });
                toast.success('FAQs saved!');
              } catch { toast.error('Failed to save FAQs'); }
            }} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Save FAQs</Button>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Basic Site Information */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic Site Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Name"
                value={config.siteName}
                onChange={(e) => setConfig({...config, siteName: e.target.value})}
                helperText="Appears in browser tab, navbar, and throughout the site"
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* SEO & Meta Tags */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">SEO & Meta Tags</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Global SEO (Default for all pages)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>These values are used as defaults when no page-specific SEO is set.</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                value={config.seo.metaTitle}
                onChange={(e) => setConfig({
                  ...config, 
                  seo: {...config.seo, metaTitle: e.target.value}
                })}
                helperText={<span>Appears in search results and browser tab · <strong style={{ color: (config.seo.metaTitle?.length || 0) > 60 ? '#ef4444' : '#10b981' }}>{config.seo.metaTitle?.length || 0}/60</strong></span>}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Meta Description"
                value={config.seo.metaDescription}
                onChange={(e) => setConfig({
                  ...config, 
                  seo: {...config.seo, metaDescription: e.target.value}
                })}
                helperText={<span>Appears in search results · <strong style={{ color: (config.seo.metaDescription?.length || 0) > 160 ? '#ef4444' : '#10b981' }}>{config.seo.metaDescription?.length || 0}/160</strong></span>}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Meta Keywords</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {config.seo.metaKeywords.map((keyword: string) => (
                  <Chip
                    key={keyword}
                    label={keyword}
                    onDelete={() => removeKeyword(keyword)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="Add Keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                />
                <Button variant="outlined" onClick={addKeyword} startIcon={<AddIcon />} sx={{ height: 48, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                  Add
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Open Graph Title"
                value={config.seo.ogTitle}
                onChange={(e) => setConfig({
                  ...config, 
                  seo: {...config.seo, ogTitle: e.target.value}
                })}
                helperText="Title when shared on social media"
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter Site Handle"
                value={config.seo.twitterSite}
                onChange={(e) => setConfig({
                  ...config, 
                  seo: {...config.seo, twitterSite: e.target.value}
                })}
                helperText="Your Twitter handle (e.g., @yoursite)"
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Open Graph Description"
                value={config.seo.ogDescription}
                onChange={(e) => setConfig({
                  ...config, 
                  seo: {...config.seo, ogDescription: e.target.value}
                })}
                helperText="Description when shared on social media"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Page-Specific SEO */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Page-Specific SEO</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Override meta title, description and OG tags for individual pages. Leave fields empty to use global defaults.</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Select Page</InputLabel>
                <Select
                  value={config._selectedSeoPage || ''}
                  label="Select Page"
                  onChange={(e) => setConfig({ ...config, _selectedSeoPage: e.target.value })}
                  sx={{ height: 48, borderRadius: 2 }}
                >
                  {[
                    { slug: 'home', label: 'Home Page' },
                    { slug: 'stores', label: 'Stores' },
                    { slug: 'coupons', label: 'All Coupons' },
                    { slug: 'deals', label: 'Deals' },
                    { slug: 'blog', label: 'Blog' },
                    { slug: 'categories', label: 'Categories' },
                    { slug: 'about-us', label: 'About Us' },
                    { slug: 'contact-us', label: 'Contact Us' },
                  ].map((p) => (
                    <MenuItem key={p.slug} value={p.slug}>
                      {p.label} {config.pageSeo?.[p.slug]?.metaTitle ? '✅' : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {config._selectedSeoPage && (() => {
            const ps = config._selectedSeoPage;
            const seo = config.pageSeo?.[ps] || {};
            const updatePageSeo = (field: string, value: string) => {
              setConfig({
                ...config,
                pageSeo: {
                  ...(config.pageSeo || {}),
                  [ps]: { ...(config.pageSeo?.[ps] || {}), [field]: value }
                }
              });
            };
            const titleLen = (seo.metaTitle || '').length;
            const descLen = (seo.metaDescription || '').length;
            return (
              <Card variant="outlined" sx={{ p: 3, mt: 1, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    SEO for: {ps.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </Typography>
                  {(seo.metaTitle || seo.metaDescription || seo.ogTitle || seo.ogDescription) && (
                    <Chip label="Customized" size="small" color="success" variant="outlined" />
                  )}
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Meta Title"
                      value={seo.metaTitle || ''}
                      onChange={(e) => updatePageSeo('metaTitle', e.target.value)}
                      helperText={<span>Leave empty to use global default · <strong style={{ color: titleLen > 60 ? '#ef4444' : titleLen > 0 ? '#10b981' : undefined }}>{titleLen}/60</strong></span>}
                      InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Meta Description"
                      value={seo.metaDescription || ''}
                      onChange={(e) => updatePageSeo('metaDescription', e.target.value)}
                      helperText={<span>Leave empty to use global default · <strong style={{ color: descLen > 160 ? '#ef4444' : descLen > 0 ? '#10b981' : undefined }}>{descLen}/160</strong></span>}
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="OG Title"
                      value={seo.ogTitle || ''}
                      onChange={(e) => updatePageSeo('ogTitle', e.target.value)}
                      helperText="Title shown when shared on social media"
                      InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="OG Description"
                      value={seo.ogDescription || ''}
                      onChange={(e) => updatePageSeo('ogDescription', e.target.value)}
                      helperText="Description shown when shared on social media"
                      InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        variant="contained"
                        onClick={async () => {
                          try {
                            await updateSiteConfig({ pageSeo: config.pageSeo });
                            toast.success(`SEO saved for ${ps.replace(/-/g, ' ')}`);
                          } catch { toast.error('Failed to save page SEO'); }
                        }}
                        sx={{ height: 42, borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
                      >
                        Save Page SEO
                      </Button>
                      {(seo.metaTitle || seo.metaDescription || seo.ogTitle || seo.ogDescription) && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            const pageSeo = { ...(config.pageSeo || {}) };
                            delete pageSeo[ps];
                            setConfig({ ...config, pageSeo });
                            updateSiteConfig({ pageSeo }).then(() => toast.success(`SEO reset for ${ps.replace(/-/g, ' ')}`));
                          }}
                          sx={{ height: 42, borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
                        >
                          Reset to Default
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            );
          })()}
        </AccordionDetails>
      </Accordion>

      {/* Theme Selector */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Palette size={18} /> Theme</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>
            Select a theme preset — it applies instantly across the entire site. No manual color editing needed.
          </Alert>
          <Grid container spacing={2}>
            {[
              { name: 'purple', label: 'Purple',  colors: ['#a78bfa','#c084fc','#fcd34d'] },
              { name: 'blue',   label: 'Blue',    colors: ['#60a5fa','#818cf8','#7dd3fc'] },
              { name: 'green',  label: 'Green',   colors: ['#4ade80','#86efac','#bef264'] },
              { name: 'orange', label: 'Orange',  colors: ['#fb923c','#fdba74','#fde68a'] },
              { name: 'red',    label: 'Red',     colors: ['#f87171','#fca5a5','#fdba74'] },
              { name: 'rose',   label: 'Rose',    colors: ['#fb7185','#fda4af','#fecdd3'] },
              { name: 'teal',   label: 'Teal',    colors: ['#2dd4bf','#5eead4','#99f6e4'] },
              { name: 'dark',   label: 'Dark',    colors: ['#a78bfa','#c4b5fd','#fde68a'] },
            ].map((t) => {
              const selected = (config.themeName || 'purple') === t.name;
              return (
                <Grid item xs={6} sm={4} md={3} key={t.name}>
                  <Box
                    onClick={() => {
                      setConfig({
                        ...config,
                        themeName: t.name,
                        navbar: { ...config.navbar, bgColor: '' },
                        footerConfig: { ...config.footerConfig, bgColor: '' },
                      });
                      document.documentElement.setAttribute('data-theme', t.name);
                    }}
                    sx={{
                      cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                      border: selected ? `3px solid ${t.colors[0]}` : '3px solid #e5e7eb',
                      boxShadow: selected ? 4 : 1,
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      '&:hover': { transform: 'scale(1.04)' }
                    }}
                  >
                    <Box sx={{ display: 'flex', height: 14 }}>
                      {t.colors.map((c) => <Box key={c} sx={{ flex: 1, backgroundColor: c }} />)}
                    </Box>
                    <Box sx={{ p: 1.5, textAlign: 'center', bgcolor: '#f9fafb' }}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: t.colors[0], marginRight: 4, verticalAlign: 'middle' }} />
                      {t.label}
                    </Typography>
                      {selected && <Typography variant="caption" color="success.main" fontWeight="bold">Active</Typography>}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Typography */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Typography & Fonts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>
            Choose from carefully curated font combinations optimized for coupon applications. Each combination includes heading, body, and monospace fonts that work perfectly together.
          </Alert>
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Font Combination</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { key: 'modern', label: 'Modern', desc: 'Inter + Roboto + Fira Code', preview: { heading: 'Inter', body: 'Roboto', mono: 'Fira Code' } },
              { key: 'classic', label: 'Classic', desc: 'Playfair Display + Source Sans Pro + Monaco', preview: { heading: 'Playfair Display', body: 'Source Sans Pro', mono: 'Monaco' } },
              { key: 'minimal', label: 'Minimal', desc: 'Poppins + Open Sans + Consolas', preview: { heading: 'Poppins', body: 'Open Sans', mono: 'Consolas' } },
              { key: 'elegant', label: 'Elegant', desc: 'Crimson Text + Lato + Courier New', preview: { heading: 'Crimson Text', body: 'Lato', mono: 'Courier New' } },
              { key: 'tech', label: 'Tech', desc: 'JetBrains Mono + IBM Plex Sans + JetBrains Mono', preview: { heading: 'JetBrains Mono', body: 'IBM Plex Sans', mono: 'JetBrains Mono' } },
              { key: 'friendly', label: 'Friendly', desc: 'Nunito + Nunito Sans + Source Code Pro', preview: { heading: 'Nunito', body: 'Nunito Sans', mono: 'Source Code Pro' } },
              { key: 'professional', label: 'Professional', desc: 'Merriweather + PT Sans + Menlo', preview: { heading: 'Merriweather', body: 'PT Sans', mono: 'Menlo' } },
              { key: 'creative', label: 'Creative', desc: 'Montserrat + Raleway + SF Mono', preview: { heading: 'Montserrat', body: 'Raleway', mono: 'SF Mono' } },
              { key: 'clean', label: 'Clean', desc: 'System UI + Apple System + UI Monospace', preview: { heading: 'System UI', body: '-apple-system', mono: 'ui-monospace' } },
              { key: 'bold', label: 'Bold', desc: 'Oswald + Roboto Condensed + Roboto Mono', preview: { heading: 'Oswald', body: 'Roboto Condensed', mono: 'Roboto Mono' } }
            ].map((font) => {
              const selected = (config.fonts?.combination || 'modern') === font.key;
              return (
                <Grid item xs={12} sm={6} md={4} key={font.key}>
                  <Box
                    onClick={() => {
                      const newConfig = {
                        ...config, 
                        fonts: { combination: font.key }
                      };
                      setConfig(newConfig);
                      
                      // Apply fonts immediately for preview
                      const fontCombination = {
                        modern: { heading: 'Inter, system-ui, sans-serif', body: 'Roboto, system-ui, sans-serif', mono: '"Fira Code", monospace' },
                        classic: { heading: '"Playfair Display", Georgia, serif', body: '"Source Sans Pro", system-ui, sans-serif', mono: 'Monaco, monospace' },
                        minimal: { heading: 'Poppins, system-ui, sans-serif', body: '"Open Sans", system-ui, sans-serif', mono: 'Consolas, monospace' },
                        elegant: { heading: '"Crimson Text", Georgia, serif', body: 'Lato, system-ui, sans-serif', mono: '"Courier New", monospace' },
                        tech: { heading: '"JetBrains Mono", monospace', body: '"IBM Plex Sans", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' },
                        friendly: { heading: 'Nunito, system-ui, sans-serif', body: '"Nunito Sans", system-ui, sans-serif', mono: '"Source Code Pro", monospace' },
                        professional: { heading: 'Merriweather, Georgia, serif', body: '"PT Sans", system-ui, sans-serif', mono: 'Menlo, monospace' },
                        creative: { heading: 'Montserrat, system-ui, sans-serif', body: 'Raleway, system-ui, sans-serif', mono: '"SF Mono", monospace' },
                        clean: { heading: 'system-ui, -apple-system, sans-serif', body: 'system-ui, -apple-system, sans-serif', mono: 'ui-monospace, monospace' },
                        bold: { heading: 'Oswald, Impact, sans-serif', body: '"Roboto Condensed", system-ui, sans-serif', mono: '"Roboto Mono", monospace' }
                      }[font.key] || { heading: 'Inter', body: 'Roboto', mono: 'Fira Code' };
                      
                      // Apply immediately to CSS variables
                      document.documentElement.style.setProperty('--heading-font', fontCombination.heading);
                      document.documentElement.style.setProperty('--body-font', fontCombination.body);
                      document.documentElement.style.setProperty('--mono-font', fontCombination.mono);
                      
                      // Force immediate re-render
                      document.body.style.fontFamily = fontCombination.body;
                      
                      // Show preview toast
                      toast.success(`Font changed to ${font.label}! Save configuration to apply permanently.`);
                    }}
                    sx={{
                      cursor: 'pointer', 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      border: selected ? `3px solid ${config.theme.primaryColor}` : '3px solid #e5e7eb',
                      boxShadow: selected ? 4 : 1,
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      '&:hover': { transform: 'scale(1.02)' },
                      height: 120
                    }}
                  >
                    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" sx={{ fontFamily: font.preview.heading, fontSize: 16, fontWeight: 'bold', mb: 0.5 }}>
                        {font.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: font.preview.body, fontSize: 12, color: 'text.secondary', mb: 1, flex: 1 }}>
                        {font.desc}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontFamily: font.preview.heading, fontSize: 11 }}>Heading: {font.preview.heading}</Typography>
                        <Typography variant="caption" sx={{ fontFamily: font.preview.body, fontSize: 11 }}>Body: {font.preview.body}</Typography>
                        <Typography variant="caption" sx={{ fontFamily: font.preview.mono, fontSize: 10 }}>Code: {font.preview.mono}</Typography>
                      </Box>
                      {selected && (
                        <Typography variant="caption" color="success.main" fontWeight="bold" sx={{ textAlign: 'center', mt: 1 }}>
                          Active
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Performance Optimized:</strong> Each combination loads only the necessary fonts, ensuring fast page loads while maintaining beautiful typography.
            </Typography>
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* Logo Management */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Logo Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Navbar Logo</Typography>
              <LogoUploader 
                currentLogo={config.logos.navbar}
                logoType="navbar"
                onLogoUpdate={async (logoUrl) => {
                  const updated = { ...config, logos: { ...config.logos, navbar: logoUrl } };
                  setConfig(updated);
                  try {
                    await updateSiteConfig({ logos: updated.logos });
                    localStorage.setItem('cms-updated', Date.now().toString());
                    window.dispatchEvent(new CustomEvent('cms-updated'));
                  } catch (e) { console.error('Auto-save logo failed', e); }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Footer Logo</Typography>
              <LogoUploader 
                currentLogo={config.logos.footer}
                logoType="footer"
                onLogoUpdate={async (logoUrl) => {
                  const updated = { ...config, logos: { ...config.logos, footer: logoUrl } };
                  setConfig(updated);
                  try {
                    await updateSiteConfig({ logos: updated.logos });
                    localStorage.setItem('cms-updated', Date.now().toString());
                    window.dispatchEvent(new CustomEvent('cms-updated'));
                  } catch (e) { console.error('Auto-save logo failed', e); }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Favicon</Typography>
              <LogoUploader 
                currentLogo={config.logos.favicon}
                logoType="favicon"
                onLogoUpdate={async (logoUrl) => {
                  const updated = { ...config, logos: { ...config.logos, favicon: logoUrl } };
                  setConfig(updated);
                  updateFavicon(logoUrl);
                  try {
                    await updateSiteConfig({ logos: updated.logos });
                    localStorage.setItem('cms-updated', Date.now().toString());
                    window.dispatchEvent(new CustomEvent('cms-updated'));
                  } catch (e) { console.error('Auto-save logo failed', e); }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Open Graph Image (Default)</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Used when no page-specific OG image is set. Recommended: 1200×630px</Typography>
              <LogoUploader 
                currentLogo={config.logos.ogImage}
                logoType="ogImage"
                onLogoUpdate={async (logoUrl) => {
                  const updated = { ...config, logos: { ...config.logos, ogImage: logoUrl } };
                  setConfig(updated);
                  try {
                    await updateSiteConfig({ logos: updated.logos });
                    localStorage.setItem('cms-updated', Date.now().toString());
                    window.dispatchEvent(new CustomEvent('cms-updated'));
                  } catch (e) { console.error('Auto-save logo failed', e); }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Page-Specific OG Images</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Set a unique Open Graph image for each page. Recommended: 1200×630px (JPG, PNG, WebP)</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Select Page</InputLabel>
                    <Select
                      value={config._selectedOgPage || ''}
                      label="Select Page"
                      onChange={(e) => setConfig({ ...config, _selectedOgPage: e.target.value })}
                    >
                      {[
                        { slug: 'home', label: 'Home Page' },
                        { slug: 'stores', label: 'Stores' },
                        { slug: 'coupons', label: 'All Coupons' },
                        { slug: 'deals', label: 'Deals' },
                        { slug: 'blog', label: 'Blog' },
                        { slug: 'categories', label: 'Categories' },
                        { slug: 'about-us', label: 'About Us' },
                        { slug: 'contact-us', label: 'Contact Us' },
                      ].map((p) => (
                        <MenuItem key={p.slug} value={p.slug}>
                          {p.label} {config.pageOgImages?.[p.slug] ? '✅' : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {config._selectedOgPage && (
                  <Grid item xs={12} md={6}>
                    <LogoUploader
                      currentLogo={config.pageOgImages?.[config._selectedOgPage] || ''}
                      logoType="ogImage"
                      onLogoUpdate={async (logoUrl) => {
                        const pageOgImages = { ...(config.pageOgImages || {}), [config._selectedOgPage]: logoUrl };
                        const updated = { ...config, pageOgImages };
                        setConfig(updated);
                        try {
                          await updateSiteConfig({ pageOgImages });
                          toast.success(`OG image updated for ${config._selectedOgPage}`);
                        } catch (e) { console.error('Auto-save OG image failed', e); }
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Social Media */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Social Media Links</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Object.entries(config.socialMedia).map(([platform, data]: [string, any]) => (
              <Grid item xs={12} key={platform}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', mr: 2 }}>
                        {platform}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={data.enabled}
                            onChange={(e) => updateSocialMedia(platform, 'enabled', e.target.checked)}
                          />
                        }
                        label="Enabled"
                      />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Display Label"
                          value={data.label}
                          onChange={(e) => updateSocialMedia(platform, 'label', e.target.value)}
                          InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="URL"
                          value={data.url}
                          onChange={(e) => updateSocialMedia(platform, 'url', e.target.value)}
                          placeholder={`https://${platform}.com/yourhandle`}
                          InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Icon Name"
                          value={data.icon}
                          onChange={(e) => updateSocialMedia(platform, 'icon', e.target.value)}
                          helperText="Icon identifier for display"
                          InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Footer Configuration */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Footer Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Copyright Text"
                value={config.footer.copyright}
                onChange={(e) => setConfig({
                  ...config, 
                  footer: {...config.footer, copyright: e.target.value}
                })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={config.footer.email}
                onChange={(e) => setConfig({
                  ...config, 
                  footer: {...config.footer, email: e.target.value}
                })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={config.footer.phone}
                onChange={(e) => setConfig({
                  ...config, 
                  footer: {...config.footer, phone: e.target.value}
                })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                value={config.footer.address}
                onChange={(e) => setConfig({
                  ...config, 
                  footer: {...config.footer, address: e.target.value}
                })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.footer.showSocialMedia}
                    onChange={(e) => setConfig({
                      ...config, 
                      footer: {...config.footer, showSocialMedia: e.target.checked}
                    })}
                  />
                }
                label="Show Social Media Links in Footer"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.footer.showNewsletter}
                    onChange={(e) => setConfig({
                      ...config, 
                      footer: {...config.footer, showNewsletter: e.target.checked}
                    })}
                  />
                }
                label="Show Newsletter Signup in Footer"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Navbar Customization ── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Navigation size={18} /> Navbar Customization</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>
            Choose a navbar layout, then a style preset, then fine-tune individual fields below.
          </Alert>

          {/* Navbar Layout Selector */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Navbar Layout</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { key: 'navbar1', label: 'Layout 1', desc: 'Glassmorphism + CTA button' },
              { key: 'navbar2', label: 'Layout 2', desc: 'Solid color + search bar' },
              { key: 'navbar3', label: 'Layout 3', desc: 'Banner + white nav + CTA' },
              { key: 'navbar4', label: 'Layout 4', desc: 'White + search + promo banner' },
            ].map((l) => {
              const selectedNav = (config.navbar?.layout || 'navbar2') === l.key;
              return (
              <Grid item xs={6} sm={4} md={3} key={l.key}>
                <Box
                  onClick={() => setConfig({ ...config, navbar: { ...config.navbar, layout: l.key } })}
                  sx={{
                    cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                    border: selectedNav
                      ? `3px solid ${config.theme.primaryColor}`
                      : '3px solid #e5e7eb',
                    boxShadow: selectedNav ? 4 : 1, transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                >
                  {/* Mini preview */}
                  {l.key === 'navbar1' && (
                    <Box sx={{ height: 40, backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', px: 1.5, gap: 1 }}>
                      <Box sx={{ width: 24, height: 8, borderRadius: 1, bgcolor: config.theme.primaryColor }} />
                      <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
                        {[1,2,3].map(i => <Box key={i} sx={{ width: 16, height: 4, borderRadius: 1, bgcolor: '#9ca3af' }} />)}
                      </Box>
                      <Box sx={{ width: 32, height: 14, borderRadius: 4, bgcolor: '#111827' }} />
                    </Box>
                  )}
                  {l.key === 'navbar2' && (
                    <Box sx={{ height: 40, background: `linear-gradient(90deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor})`, display: 'flex', alignItems: 'center', px: 1.5, gap: 1 }}>
                      <Box sx={{ width: 24, height: 8, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.9)' }} />
                      <Box sx={{ flex: 1, height: 14, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />
                      <Box sx={{ width: 20, height: 14, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                    </Box>
                  )}
                  {l.key === 'navbar3' && (
                    <Box>
                      <Box sx={{ height: 10, background: `linear-gradient(to right, ${config.theme.primaryColor}, ${config.theme.secondaryColor})` }} />
                      <Box sx={{ height: 30, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', px: 1.5, gap: 1, borderBottom: '1px solid #e5e7eb' }}>
                        <Box sx={{ width: 24, height: 8, borderRadius: 1, bgcolor: config.theme.primaryColor }} />
                        <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
                          {[1,2,3].map(i => <Box key={i} sx={{ width: 14, height: 4, borderRadius: 1, bgcolor: '#9ca3af' }} />)}
                        </Box>
                        <Box sx={{ width: 28, height: 12, borderRadius: 4, border: '1px solid #d1d5db' }} />
                      </Box>
                    </Box>
                  )}
                  {l.key === 'navbar4' && (
                    <Box sx={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ height: 28, display: 'flex', alignItems: 'center', px: 1.5, gap: 1 }}>
                        <Box sx={{ width: 20, height: 7, borderRadius: 1, bgcolor: config.theme.primaryColor }} />
                        <Box sx={{ flex: 1, height: 12, borderRadius: 4, bgcolor: '#f3f4f6', border: '1px solid #e5e7eb' }} />
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#e5e7eb' }} />
                      </Box>
                      <Box sx={{ height: 12, borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', px: 1.5, gap: 1 }}>
                        {[1,2,3,4].map(i => <Box key={i} sx={{ width: 14, height: 3, borderRadius: 1, bgcolor: '#d1d5db' }} />)}
                      </Box>
                    </Box>
                  )}
                  <Box sx={{ p: 1.5, textAlign: 'center', bgcolor: '#f9fafb' }}>
                    <Typography variant="caption" fontWeight="bold" display="block">{l.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>{l.desc}</Typography>
                    {selectedNav && <Typography variant="caption" color="success.main" fontWeight="bold">Active</Typography>}
                  </Box>
                </Box>
              </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ mb: 3 }} />

          {/* Navbar Style Presets */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Navbar Style</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { key: 'solid',       label: 'Solid',       desc: 'Flat solid color',         preview: config.theme.primaryColor },
              { key: 'gradient',    label: 'Gradient',    desc: 'Primary → Secondary',       preview: `linear-gradient(90deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor})` },
              { key: 'transparent', label: 'Transparent', desc: 'Glass / transparent look',  preview: 'rgba(0,0,0,0.3)' },
              { key: 'white',       label: 'White',       desc: 'Clean white navbar',         preview: '#ffffff' },
              { key: 'dark',        label: 'Dark',        desc: 'Always dark navbar',         preview: '#1f2937' },
            ].map((s) => {
              const selectedNavStyle = (config.navbar?.style || 'solid') === s.key;
              return (
              <Grid item xs={6} sm={4} md={2} key={s.key}>
                <Box
                  onClick={() => setConfig({ ...config, navbar: { ...config.navbar, style: s.key } })}
                  sx={{
                    cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                    border: selectedNavStyle ? `3px solid ${config.theme.primaryColor}` : '3px solid #e5e7eb',
                    boxShadow: selectedNavStyle ? 4 : 1, transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                >
                  <Box sx={{ height: 36, background: s.preview, display: 'flex', alignItems: 'center', px: 1, gap: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.7)' }} />
                    <Box sx={{ flex: 1, height: 4, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.5)' }} />
                    <Box sx={{ width: 16, height: 4, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.5)' }} />
                  </Box>
                  <Box sx={{ p: 1, textAlign: 'center', bgcolor: '#f9fafb' }}>
                    <Typography variant="caption" fontWeight="bold" display="block">{s.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>{s.desc}</Typography>
                    {selectedNavStyle && <Typography variant="caption" color="success.main" fontWeight="bold" display="block">Active</Typography>}
                  </Box>
                </Box>
              </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ mb: 3 }} />

          {/* Navbar Fields */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Navbar Fields</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ColorPicker
                label="Navbar Background Color"
                value={config.navbar?.bgColor || config.theme.primaryColor}
                onChange={(color) => setConfig({ ...config, navbar: { ...config.navbar, bgColor: color } })}
                helperText="Overrides style preset background (leave blank to use theme primary)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ColorPicker
                label="Navbar Text / Icon Color"
                value={config.navbar?.textColor || '#ffffff'}
                onChange={(color) => setConfig({ ...config, navbar: { ...config.navbar, textColor: color } })}
                helperText="Color for nav links, icons, and site name"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel control={<Switch checked={config.navbar?.showSearch ?? true} onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, showSearch: e.target.checked } })} />} label="Show Search Bar" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel control={<Switch checked={config.navbar?.showThemeToggle ?? true} onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, showThemeToggle: e.target.checked } })} />} label="Show Dark/Light Toggle" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel control={<Switch checked={config.navbar?.sticky ?? true} onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, sticky: e.target.checked } })} />} label="Sticky Navbar" />
            </Grid>
            {/* Layout 1 specific fields */}
            {(config.navbar?.layout || 'navbar2') === 'navbar1' && (
              <>
                <Grid item xs={12}>
                  <Divider><Typography variant="caption" color="text.secondary">Layout 1 — CTA Button</Typography></Divider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Text" value={config.navbar?.ctaText || 'Get Started'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaText: e.target.value } })}
                    helperText="Text shown on the top-right button" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Link" value={config.navbar?.ctaLink || '/contact-us'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaLink: e.target.value } })}
                    helperText="URL the CTA button links to" />
                </Grid>
              </>
            )}
            {/* Layout 2 specific fields */}
            {config.navbar?.layout === 'navbar2' && (
              <>
                <Grid item xs={12}>
                  <Divider><Typography variant="caption" color="text.secondary">Layout 2 — CTA Button</Typography></Divider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Text" value={config.navbar?.ctaText || 'Get Started'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaText: e.target.value } })}
                    helperText="Text shown on the top-right button" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Link" value={config.navbar?.ctaLink || '/contact-us'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaLink: e.target.value } })}
                    helperText="URL the CTA button links to" />
                </Grid>
              </>
            )}
            {/* Layout 3 specific fields */}
            {config.navbar?.layout === 'navbar3' && (
              <>
                <Grid item xs={12}>
                  <Divider><Typography variant="caption" color="text.secondary">Layout 3 — Banner + CTA</Typography></Divider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Text" value={config.navbar?.ctaText || 'Get Started'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaText: e.target.value } })}
                    helperText="Top-right button label" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Link" value={config.navbar?.ctaLink || '/contact-us'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaLink: e.target.value } })}
                    helperText="URL the CTA button links to" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Banner Text" value={config.navbar?.bannerText || 'Exclusive Price Drop! Hurry,'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, bannerText: e.target.value } })}
                    helperText="Main text in the top announcement banner" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Banner Highlight Text" value={config.navbar?.bannerHighlight || 'Offer Ends Soon!'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, bannerHighlight: e.target.value } })}
                    helperText="Underlined highlight text in the banner" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel control={<Switch checked={config.navbar?.showBanner ?? true} onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, showBanner: e.target.checked } })} />} label="Show Announcement Banner" />
                </Grid>
              </>
            )}
            {/* Layout 4 specific fields */}
            {config.navbar?.layout === 'navbar4' && (
              <>
                <Grid item xs={12}>
                  <Divider><Typography variant="caption" color="text.secondary">Layout 4 — CTA Button</Typography></Divider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Text" value={config.navbar?.ctaText || 'Get Started'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaText: e.target.value } })}
                    helperText="Text shown on the top-right button" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CTA Button Link" value={config.navbar?.ctaLink || '/contact-us'}
                    onChange={(e) => setConfig({ ...config, navbar: { ...config.navbar, ctaLink: e.target.value } })}
                    helperText="URL the CTA button links to" />
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Footer Customization ── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><ArrowDownCircle size={18} /> Footer Customization</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>
            Choose a footer style preset, then fine-tune individual fields below.
          </Alert>

          {/* Footer Layout Selector */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Footer Layout</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { key: 'footer1', label: 'Layout 1', desc: 'Logo + links + app download' },
              { key: 'footer2', label: 'Layout 2', desc: 'Quick links + 3 columns' },
              { key: 'footer3', label: 'Layout 3', desc: 'Social + newsletter + columns' },
              { key: 'footer4', label: 'Layout 4', desc: 'Dark + contact cards' },
            ].map((l) => {
              const selectedLayout = (config.footerConfig?.layout || 'footer1') === l.key;
              return (
              <Grid item xs={6} sm={4} md={3} key={l.key}>
                <Box
                  onClick={() => setConfig({ ...config, footerConfig: { ...config.footerConfig, layout: l.key } })}
                  sx={{
                    cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                    border: selectedLayout
                      ? `3px solid ${config.theme.primaryColor}`
                      : '3px solid #e5e7eb',
                    boxShadow: selectedLayout ? 4 : 1, transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                >
                  {/* Mini preview */}
                  {l.key === 'footer1' && (
                    <Box sx={{ height: 44, background: `linear-gradient(180deg, ${config.theme.primaryColor} 70%, ${config.theme.secondaryColor} 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>{[1,2,3,4].map(i => <Box key={i} sx={{ width: 12, height: 3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.5)' }} />)}</Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>{[1,2,3].map(i => <Box key={i} sx={{ width: 8, height: 8, borderRadius: 1, bgcolor: 'rgba(0,0,0,0.4)' }} />)}</Box>
                    </Box>
                  )}
                  {l.key === 'footer2' && (
                    <Box sx={{ height: 44, backgroundColor: '#ffffff', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>{[1,2,3].map(i => <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>{[1,2,3].map(j => <Box key={j} sx={{ width: 20, height: 2, borderRadius: 1, bgcolor: '#d1d5db' }} />)}</Box>)}</Box>
                      <Box sx={{ height: 2, bgcolor: '#e5e7eb', mt: 0.5 }} />
                    </Box>
                  )}
                  {l.key === 'footer3' && (
                    <Box sx={{ height: 44, backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>{[1,2,3,4].map(i => <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d1d5db' }} />)}</Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}><Box sx={{ flex: 1, height: 6, borderRadius: 1, bgcolor: '#e5e7eb' }} /><Box sx={{ width: 16, height: 6, borderRadius: 1, bgcolor: '#111827' }} /></Box>
                    </Box>
                  )}
                  {l.key === 'footer4' && (
                    <Box sx={{ height: 44, backgroundColor: '#18181b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>{[1,2,3].map(i => <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>{[1,2,3].map(j => <Box key={j} sx={{ width: 18, height: 2, borderRadius: 1, bgcolor: '#52525b' }} />)}</Box>)}</Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>{[1,2].map(i => <Box key={i} sx={{ width: 24, height: 8, borderRadius: 1, bgcolor: '#3f3f46' }} />)}</Box>
                    </Box>
                  )}
                  <Box sx={{ p: 1.5, textAlign: 'center', bgcolor: '#f9fafb' }}>
                    <Typography variant="caption" fontWeight="bold" display="block">{l.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>{l.desc}</Typography>
                    {selectedLayout && <Typography variant="caption" color="success.main" fontWeight="bold">Active</Typography>}
                  </Box>
                </Box>
              </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ mb: 3 }} />

          {/* Footer Style Presets */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Footer Style</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { key: 'standard',  label: 'Standard',  desc: 'Logo + links + social',   topColor: config.theme.primaryColor,   botColor: config.theme.secondaryColor },
              { key: 'minimal',   label: 'Minimal',   desc: 'Links + copyright only',  topColor: '#1f2937',                    botColor: '#111827' },
              { key: 'dark',      label: 'Dark',      desc: 'Full dark footer',         topColor: '#111827',                    botColor: '#000000' },
              { key: 'light',     label: 'Light',     desc: 'White / light footer',     topColor: '#f9fafb',                    botColor: '#e5e7eb' },
              { key: 'branded',   label: 'Branded',   desc: 'Bold brand color footer',  topColor: config.theme.primaryColor,   botColor: config.theme.accentColor },
            ].map((s) => {
              const selectedStyle = (config.footerConfig?.style || 'standard') === s.key;
              return (
              <Grid item xs={6} sm={4} md={2} key={s.key}>
                <Box
                  onClick={() => setConfig({ ...config, footerConfig: { ...config.footerConfig, style: s.key } })}
                  sx={{
                    cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                    border: selectedStyle ? `3px solid ${config.theme.primaryColor}` : '3px solid #e5e7eb',
                    boxShadow: selectedStyle ? 4 : 1, transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                >
                  <Box sx={{ height: 28, bgcolor: s.topColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, px: 1 }}>
                    {[1,2,3].map(i => <Box key={i} sx={{ width: 12, height: 3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.6)' }} />)}
                  </Box>
                  <Box sx={{ height: 14, bgcolor: s.botColor }} />
                  <Box sx={{ p: 1, textAlign: 'center', bgcolor: '#f9fafb' }}>
                    <Typography variant="caption" fontWeight="bold" display="block">{s.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>{s.desc}</Typography>
                    {selectedStyle && <Typography variant="caption" color="success.main" fontWeight="bold" display="block">Active</Typography>}
                  </Box>
                </Box>
              </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ mb: 3 }} />

          {/* Footer Fields */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Footer Fields</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ColorPicker
                label="Footer Background Color"
                value={config.footerConfig?.bgColor || config.theme.primaryColor}
                onChange={(color) => setConfig({ ...config, footerConfig: { ...config.footerConfig, bgColor: color } })}
                helperText="Overrides style preset (leave blank to use theme primary)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ColorPicker
                label="Footer Text Color"
                value={config.footerConfig?.textColor || '#ffffff'}
                onChange={(color) => setConfig({ ...config, footerConfig: { ...config.footerConfig, textColor: color } })}
                helperText="Color for footer links and text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Copyright Text"
                value={config.footer.copyright}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={config.footer.email}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, email: e.target.value } })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={config.footer.phone}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, phone: e.target.value } })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                value={config.footer.address}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, address: e.target.value } })}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.footer.showSocialMedia}
                    onChange={(e) => setConfig({ ...config, footer: { ...config.footer, showSocialMedia: e.target.checked } })}
                  />
                }
                label="Show Social Media Icons"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.footerConfig?.showAppDownload ?? true}
                    onChange={(e) => setConfig({ ...config, footerConfig: { ...config.footerConfig, showAppDownload: e.target.checked } })}
                  />
                }
                label="Show App Download Buttons"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.footerConfig?.showContactInfo ?? true}
                    onChange={(e) => setConfig({ ...config, footerConfig: { ...config.footerConfig, showContactInfo: e.target.checked } })}
                  />
                }
                label="Show Contact Info Column"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Footer Content ── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><FileText size={18} /> Footer Content (Columns & Links)</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>
            Edit the tagline and link columns shown in all footer layouts. Changes apply to all 4 footer designs.
          </Alert>

          {/* Tagline */}
          <TextField
            fullWidth
            label="Footer Tagline"
            value={config.footerContent?.tagline || ''}
            onChange={(e) => setConfig({ ...config, footerContent: { ...config.footerContent, tagline: e.target.value } })}
            helperText="Short description shown below the logo in the footer"
            InputProps={{ sx: { height: 48, borderRadius: 2 } }}
            sx={{ mb: 3 }}
          />

          {/* Columns */}
          {(config.footerContent?.columns || []).map((col: any, colIdx: number) => (
            <Card key={colIdx} variant="outlined" sx={{ mb: 3, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TextField
                  label={`Column ${colIdx + 1} Heading`}
                  value={col.heading}
                  onChange={(e) => {
                    const cols = [...config.footerContent.columns];
                    cols[colIdx] = { ...cols[colIdx], heading: e.target.value };
                    setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
                  }}
                  InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                  sx={{ flex: 1 }}
                />
                <Button color="error" size="small" onClick={() => {
                  const cols = config.footerContent.columns.filter((_: any, i: number) => i !== colIdx);
                  setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
                }}>Remove Column</Button>
              </Box>

              {col.links.map((link: any, linkIdx: number) => (
                <Box key={linkIdx} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <TextField size="small" label="Label" value={link.label} sx={{ flex: 1 }}
                    InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                    onChange={(e) => {
                      const cols = [...config.footerContent.columns];
                      cols[colIdx].links[linkIdx] = { ...link, label: e.target.value };
                      setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
                    }}
                  />
                  <TextField size="small" label="URL" value={link.href} sx={{ flex: 1 }}
                    InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                    onChange={(e) => {
                      const cols = [...config.footerContent.columns];
                      cols[colIdx].links[linkIdx] = { ...link, href: e.target.value };
                      setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
                    }}
                  />
                  <IconButton size="small" color="error" onClick={() => {
                    const cols = [...config.footerContent.columns];
                    cols[colIdx].links = cols[colIdx].links.filter((_: any, i: number) => i !== linkIdx);
                    setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
                  }}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              ))}

              <Button size="small" startIcon={<AddIcon />} onClick={() => {
                const cols = [...config.footerContent.columns];
                cols[colIdx].links = [...cols[colIdx].links, { label: '', href: '#' }];
                setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
              }}>Add Link</Button>
            </Card>
          ))}

          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
            const cols = [...(config.footerContent?.columns || []), { heading: 'New Column', links: [{ label: 'Link', href: '#' }] }];
            setConfig({ ...config, footerContent: { ...config.footerContent, columns: cols } });
          }}>Add Column</Button>

          {/* Popular Categories Section */}
          <Divider sx={{ my: 4 }} />
          <Accordion sx={{ border: '1px solid #e5e7eb', borderRadius: 2, '&:before': { display: 'none' }, boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="bold">Popular Categories (4 Columns)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage the "Popular Categories" section in the footer. Each column has a title and grouped sub-sections with links.
              </Typography>

              <TextField
                fullWidth
                label="Section Heading (leave empty to hide)"
                value={config.footerCategoriesHeading ?? 'Popular Categories'}
                onChange={(e) => setConfig({ ...config, footerCategoriesHeading: e.target.value })}
                helperText="Clear this field to hide the heading entirely"
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                sx={{ mb: 3 }}
              />

              {(config.footerCategories || []).map((col: any, colIdx: number) => (
                <Accordion key={colIdx} sx={{ mb: 2, border: '1px solid #e5e7eb', borderRadius: '8px !important', '&:before': { display: 'none' }, boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1 }}>
                        Column {colIdx + 1}: {col.title || 'Untitled'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(col.groups || []).length} groups
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <TextField
                        label="Column Title"
                        value={col.title}
                        onChange={(e) => {
                          const cats = [...config.footerCategories];
                          cats[colIdx] = { ...cats[colIdx], title: e.target.value };
                          setConfig({ ...config, footerCategories: cats });
                        }}
                        InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                        sx={{ flex: 1 }}
                      />
                      <Button color="error" variant="outlined" size="small" sx={{ height: 48, borderRadius: 2 }} onClick={() => {
                        const cats = config.footerCategories.filter((_: any, i: number) => i !== colIdx);
                        setConfig({ ...config, footerCategories: cats });
                      }}>Remove Column</Button>
                    </Box>

                    {(col.groups || []).map((group: any, gIdx: number) => (
                      <Card key={gIdx} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: '#fafafa' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                          <TextField label="Sub-heading" value={group.heading} sx={{ flex: 1 }}
                            InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                            onChange={(e) => {
                              const cats = [...config.footerCategories];
                              cats[colIdx].groups[gIdx] = { ...group, heading: e.target.value };
                              setConfig({ ...config, footerCategories: cats });
                            }}
                          />
                          <Button color="error" variant="outlined" size="small" sx={{ height: 48, borderRadius: 2 }} onClick={() => {
                            const cats = [...config.footerCategories];
                            cats[colIdx].groups = cats[colIdx].groups.filter((_: any, i: number) => i !== gIdx);
                            setConfig({ ...config, footerCategories: cats });
                          }}>Remove</Button>
                        </Box>
                        {(group.links || []).map((link: any, lIdx: number) => (
                          <Box key={lIdx} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                            <TextField label="Label" value={link.label} sx={{ flex: 1 }}
                              InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                              onChange={(e) => {
                                const cats = [...config.footerCategories];
                                cats[colIdx].groups[gIdx].links[lIdx] = { ...link, label: e.target.value };
                                setConfig({ ...config, footerCategories: cats });
                              }}
                            />
                            <TextField label="URL" value={link.href} sx={{ flex: 1 }}
                              InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                              onChange={(e) => {
                                const cats = [...config.footerCategories];
                                cats[colIdx].groups[gIdx].links[lIdx] = { ...link, href: e.target.value };
                                setConfig({ ...config, footerCategories: cats });
                              }}
                            />
                            <IconButton color="error" onClick={() => {
                              const cats = [...config.footerCategories];
                              cats[colIdx].groups[gIdx].links = cats[colIdx].groups[gIdx].links.filter((_: any, i: number) => i !== lIdx);
                              setConfig({ ...config, footerCategories: cats });
                            }}><DeleteIcon fontSize="small" /></IconButton>
                          </Box>
                        ))}
                        <Button size="small" startIcon={<AddIcon />} sx={{ mt: 1, borderRadius: 2, textTransform: 'none' }} onClick={() => {
                          const cats = [...config.footerCategories];
                          cats[colIdx].groups[gIdx].links = [...cats[colIdx].groups[gIdx].links, { label: '', href: '#' }];
                          setConfig({ ...config, footerCategories: cats });
                        }}>Add Link</Button>
                      </Card>
                    ))}

                    <Button size="small" variant="outlined" startIcon={<AddIcon />} sx={{ borderRadius: 2, textTransform: 'none' }} onClick={() => {
                      const cats = [...config.footerCategories];
                      cats[colIdx].groups = [...(cats[colIdx].groups || []), { heading: 'New Group', links: [{ label: '', href: '#' }] }];
                      setConfig({ ...config, footerCategories: cats });
                    }}>Add Sub-group</Button>
                  </AccordionDetails>
                </Accordion>
              ))}

              <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1, borderRadius: 2, textTransform: 'none' }} onClick={() => {
                const cats = [...(config.footerCategories || []), { title: 'New Column', groups: [{ heading: 'New Group', links: [{ label: '', href: '#' }] }] }];
                setConfig({ ...config, footerCategories: cats });
              }}>Add Category Column</Button>
            </AccordionDetails>
          </Accordion>

          {/* Bottom Bar Links */}
          <Divider sx={{ my: 4 }} />
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Bottom Bar Links</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            These links appear at the very bottom of the footer (e.g. Privacy Policy, Terms of Service). They show across all footer layouts.
          </Typography>

          {(config.footerContent?.bottomLinks || []).map((link: any, linkIdx: number) => (
            <Box key={linkIdx} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
              <Chip label={linkIdx + 1} size="small" sx={{ minWidth: 28, fontWeight: 'bold' }} />
              <TextField size="small" label="Label" value={link.label} sx={{ flex: 1 }}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                onChange={(e) => {
                  const links = [...(config.footerContent?.bottomLinks || [])];
                  links[linkIdx] = { ...link, label: e.target.value };
                  setConfig({ ...config, footerContent: { ...config.footerContent, bottomLinks: links } });
                }}
              />
              <TextField size="small" label="URL" value={link.href} sx={{ flex: 1 }}
                InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                onChange={(e) => {
                  const links = [...(config.footerContent?.bottomLinks || [])];
                  links[linkIdx] = { ...link, href: e.target.value };
                  setConfig({ ...config, footerContent: { ...config.footerContent, bottomLinks: links } });
                }}
              />
              <IconButton size="small" color="error" onClick={() => {
                const links = (config.footerContent?.bottomLinks || []).filter((_: any, i: number) => i !== linkIdx);
                setConfig({ ...config, footerContent: { ...config.footerContent, bottomLinks: links } });
              }}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={() => {
            const links = [...(config.footerContent?.bottomLinks || []), { label: '', href: '#' }];
            setConfig({ ...config, footerContent: { ...config.footerContent, bottomLinks: links } });
          }}>Add Bottom Link</Button>
        </AccordionDetails>
      </Accordion>

      {/* ── About Us Page Content ── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Info size={18} /> About Us Page</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>Edit the About Us page content. Leave fields empty to use defaults.</Alert>
          <TextField fullWidth label="Introduction Text" value={config.aboutPage?.intro || ''} multiline rows={4}
            onChange={e => setConfig({ ...config, aboutPage: { ...config.aboutPage, intro: e.target.value } })}
            helperText="Supports HTML (<strong>, <br>). Use \n for paragraphs." InputProps={{ sx: { borderRadius: 2 } }} sx={{ mb: 3 }} />
          <TextField fullWidth label="Our Story Text" value={config.aboutPage?.story || ''} multiline rows={4}
            onChange={e => setConfig({ ...config, aboutPage: { ...config.aboutPage, story: e.target.value } })}
            helperText="Supports HTML. Use \n for paragraphs." InputProps={{ sx: { borderRadius: 2 } }} sx={{ mb: 3 }} />

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Stats</Typography>
          {(config.aboutPage?.stats || []).map((s: any, i: number) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
              <TextField label="Number" value={s.number} sx={{ flex: 1 }} InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                onChange={e => { const stats = [...(config.aboutPage?.stats || [])]; stats[i] = { ...s, number: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, stats } }); }} />
              <TextField label="Label" value={s.label} sx={{ flex: 1 }} InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                onChange={e => { const stats = [...(config.aboutPage?.stats || [])]; stats[i] = { ...s, label: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, stats } }); }} />
              <IconButton color="error" onClick={() => { const stats = (config.aboutPage?.stats || []).filter((_: any, idx: number) => idx !== i); setConfig({ ...config, aboutPage: { ...config.aboutPage, stats } }); }}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={() => setConfig({ ...config, aboutPage: { ...config.aboutPage, stats: [...(config.aboutPage?.stats || []), { number: '', label: '' }] } })}
            sx={{ mb: 3, borderRadius: 2, textTransform: 'none' }}>Add Stat</Button>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Features</Typography>
          {(config.aboutPage?.features || []).map((f: any, i: number) => (
            <Card key={i} variant="outlined" sx={{ p: 2, mb: 1.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5 }}>
                <FormControl size="small" sx={{ width: 130 }}>
                  <InputLabel>Icon</InputLabel>
                  <Select value={f.icon || 'Target'} label="Icon" onChange={e => { const features = [...(config.aboutPage?.features || [])]; features[i] = { ...f, icon: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, features } }); }} sx={{ height: 48, borderRadius: 2 }}>
                    {['Target', 'Users', 'Award', 'Heart', 'Shield', 'Zap'].map(ic => <MenuItem key={ic} value={ic}>{ic}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField label="Title" value={f.title} sx={{ flex: 1 }} InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                  onChange={e => { const features = [...(config.aboutPage?.features || [])]; features[i] = { ...f, title: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, features } }); }} />
                <IconButton color="error" onClick={() => { const features = (config.aboutPage?.features || []).filter((_: any, idx: number) => idx !== i); setConfig({ ...config, aboutPage: { ...config.aboutPage, features } }); }}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
              <TextField fullWidth label="Description" value={f.description} multiline rows={2} InputProps={{ sx: { borderRadius: 2 } }}
                onChange={e => { const features = [...(config.aboutPage?.features || [])]; features[i] = { ...f, description: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, features } }); }} />
            </Card>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={() => setConfig({ ...config, aboutPage: { ...config.aboutPage, features: [...(config.aboutPage?.features || []), { icon: 'Target', title: '', description: '' }] } })}
            sx={{ mb: 3, borderRadius: 2, textTransform: 'none' }}>Add Feature</Button>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Values</Typography>
          {(config.aboutPage?.values || []).map((v: any, i: number) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
              <TextField label="Title" value={v.title} sx={{ width: 200 }} InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                onChange={e => { const values = [...(config.aboutPage?.values || [])]; values[i] = { ...v, title: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, values } }); }} />
              <TextField label="Description" value={v.description} sx={{ flex: 1 }} multiline rows={2} InputProps={{ sx: { borderRadius: 2 } }}
                onChange={e => { const values = [...(config.aboutPage?.values || [])]; values[i] = { ...v, description: e.target.value }; setConfig({ ...config, aboutPage: { ...config.aboutPage, values } }); }} />
              <IconButton color="error" onClick={() => { const values = (config.aboutPage?.values || []).filter((_: any, idx: number) => idx !== i); setConfig({ ...config, aboutPage: { ...config.aboutPage, values } }); }}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={() => setConfig({ ...config, aboutPage: { ...config.aboutPage, values: [...(config.aboutPage?.values || []), { title: '', description: '' }] } })}
            sx={{ borderRadius: 2, textTransform: 'none' }}>Add Value</Button>
        </AccordionDetails>
      </Accordion>

      {/* ── Contact Us Page Content ── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Phone size={18} /> Contact Us Page</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 3 }}>Edit the Contact Us page info and FAQs. Leave empty to use defaults.</Alert>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Page Description" value={config.contactPage?.description || ''} multiline rows={3}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, description: e.target.value } })}
                helperText="Text shown under 'Get in Touch' heading" InputProps={{ sx: { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" value={config.contactPage?.email || ''}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, email: e.target.value } })}
                helperText="Falls back to footer email if empty" InputProps={{ sx: { height: 48, borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email Note" value={config.contactPage?.emailNote || ''}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, emailNote: e.target.value } })}
                placeholder="We'll respond within 24 hours" InputProps={{ sx: { height: 48, borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone" value={config.contactPage?.phone || ''}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, phone: e.target.value } })}
                helperText="Falls back to footer phone if empty" InputProps={{ sx: { height: 48, borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Note" value={config.contactPage?.phoneNote || ''}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, phoneNote: e.target.value } })}
                placeholder="Mon-Fri, 9AM-6PM EST" InputProps={{ sx: { height: 48, borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" value={config.contactPage?.address || ''} multiline rows={2}
                onChange={e => setConfig({ ...config, contactPage: { ...config.contactPage, address: e.target.value } })}
                helperText="Use \n for line breaks. Falls back to footer address if empty" InputProps={{ sx: { borderRadius: 2 } }} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Contact Page FAQs</Typography>
          {(config.contactPage?.faqs || []).map((faq: any, i: number) => (
            <Card key={i} variant="outlined" sx={{ p: 2, mb: 1.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                <TextField label="Question" value={faq.question} sx={{ flex: 1 }} InputProps={{ sx: { height: 48, borderRadius: 2 } }}
                  onChange={e => { const faqs = [...(config.contactPage?.faqs || [])]; faqs[i] = { ...faq, question: e.target.value }; setConfig({ ...config, contactPage: { ...config.contactPage, faqs } }); }} />
                <IconButton color="error" onClick={() => { const faqs = (config.contactPage?.faqs || []).filter((_: any, idx: number) => idx !== i); setConfig({ ...config, contactPage: { ...config.contactPage, faqs } }); }}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
              <TextField fullWidth label="Answer" value={faq.answer} multiline rows={2} InputProps={{ sx: { borderRadius: 2 } }}
                onChange={e => { const faqs = [...(config.contactPage?.faqs || [])]; faqs[i] = { ...faq, answer: e.target.value }; setConfig({ ...config, contactPage: { ...config.contactPage, faqs } }); }} />
            </Card>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={() => setConfig({ ...config, contactPage: { ...config.contactPage, faqs: [...(config.contactPage?.faqs || []), { question: '', answer: '' }] } })}
            sx={{ borderRadius: 2, textTransform: 'none' }}>Add FAQ</Button>
        </AccordionDetails>
      </Accordion>

      {/* Save Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleSave}
          disabled={saving}
          sx={{ minWidth: 200, height: 48, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: 16 }}
        >
          {saving ? 'Saving...' : 'Save All Configuration'}
        </Button>
      </Box>
    </Box>
  );
}