'use client';

import { 
  Box, 
  Typography, 
} from '@mui/material';

import SiteConfigAdmin from '@/components/admin/SiteConfigAdmin';
import AdminShell from '@/components/admin/AdminShell';
import LiveFontPreview from '@/components/admin/LiveFontPreview';

export default function CMSAdmin() {
  return (
    <AdminShell>
    <Box sx={{ p: 0 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        CMS Admin Panel
      </Typography>

      {/* Live Font Preview */}
      <LiveFontPreview />

      {/* Site Configuration (Save button is at the bottom of this component) */}
      <SiteConfigAdmin />
    </Box>
    </AdminShell>
  );
}
