'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  TextField, 
  Button, 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSiteConfig, updateSiteConfig } from '@/services/api';

import SiteConfigAdmin from '@/components/admin/SiteConfigAdmin';
import AdminShell from '@/components/admin/AdminShell';
import FontDemo from '@/components/FontDemo';
import LiveFontPreview from '@/components/admin/LiveFontPreview';
import toast from 'react-hot-toast';
import { HelpCircle, Home, Store as StoreIcon, Globe } from 'lucide-react';

export default function CMSAdmin() {
  const [faqHeading, setFaqHeading] = useState('Frequently Asked Questions');
  const [faqShowOn, setFaqShowOn] = useState('both');
  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    getSiteConfig().then(res => {
      setFaqHeading(res.data?.faqs?.heading || 'Frequently Asked Questions');
      setFaqShowOn(res.data?.faqs?.showOn || 'both');
      setFaqItems(res.data?.faqs?.items || []);
    }).catch(() => {});
  }, []);

  return (
    <AdminShell>
    <Box sx={{ p: 0 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        CMS Admin Panel
      </Typography>

      {/* Live Font Preview */}
      <LiveFontPreview />

      {/* Font Demo Section */}
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
            Manage FAQs that appear on your site. Use the "Show On" dropdown to control where they display.
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, p: 1.5, borderRadius: 2, background: '#f0f4ff', color: '#4338ca', fontSize: 13 }}>
            Tip: Use <code style={{ background: '#e0e7ff', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>{'{storeName}'}</code> in questions and answers — it will be automatically replaced with the actual store name on each store page.
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
                <Typography variant="body2" color="text.secondary">No FAQs yet — click "+ Add FAQ" below</Typography>
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

      {/* Site Configuration (Save button is at the bottom of this component) */}
      <SiteConfigAdmin />
    </Box>
    </AdminShell>
  );
}
