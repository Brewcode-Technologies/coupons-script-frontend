'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore, Analytics, Visibility } from '@mui/icons-material';
import { getSiteConfig, updateAnalyticsConfig } from '@/services/api';
import toast from 'react-hot-toast';

interface AnalyticsConfig {
  googleAnalytics: {
    enabled: boolean;
    trackingId: string;
  };
  clarity: {
    enabled: boolean;
    projectId: string;
  };
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
  };
  tiktokPixel: {
    enabled: boolean;
    pixelId: string;
  };
  customScripts: {
    headerScripts: string;
    footerScripts: string;
  };
}

export default function AnalyticsAdmin() {
  const [config, setConfig] = useState<AnalyticsConfig>({
    googleAnalytics: { enabled: false, trackingId: '' },
    clarity: { enabled: false, projectId: '' },
    facebookPixel: { enabled: false, pixelId: '' },
    tiktokPixel: { enabled: false, pixelId: '' },
    customScripts: { headerScripts: '', footerScripts: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await getSiteConfig();
      if (response.data.analytics) {
        setConfig(response.data.analytics);
      }
    } catch (error) {
      console.error('Failed to load analytics config:', error);
      toast.error('Failed to load integration settings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (service: keyof AnalyticsConfig, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        enabled,
      },
    }));
  };

  const handleInputChange = (service: keyof AnalyticsConfig, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAnalyticsConfig(config);
      toast.success('Integration settings updated successfully!');
    } catch (error) {
      console.error('Failed to update integration settings:', error);
      toast.error('Failed to update integration settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading integration settings...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics & Tracking
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure third-party integrations and tracking scripts for your website.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Changes will take effect immediately after saving. Scripts are loaded dynamically based on your configuration.
      </Alert>

      <Grid container spacing={3}>
        {/* Google Analytics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Analytics color="primary" sx={{ mr: 2, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={600}>Google Analytics</Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.googleAnalytics.enabled}
                    onChange={(e) => handleToggle('googleAnalytics', e.target.checked)}
                    size="medium"
                  />
                }
                label={<Typography variant="body1" fontWeight={500}>Enable Google Analytics</Typography>}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tracking ID (GA4)"
                placeholder="G-XXXXXXXXXX"
                value={config.googleAnalytics.trackingId}
                onChange={(e) => handleInputChange('googleAnalytics', 'trackingId', e.target.value)}
                disabled={!config.googleAnalytics.enabled}
                helperText="Your Google Analytics 4 Measurement ID (auto-populated from environment)"
                InputProps={{
                  style: { height: '48px' }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '48px'
                  },
                  '& .MuiInputBase-input': {
                    padding: '12px 14px'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Microsoft Clarity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Visibility color="primary" sx={{ mr: 2, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={600}>Microsoft Clarity</Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.clarity.enabled}
                    onChange={(e) => handleToggle('clarity', e.target.checked)}
                    size="medium"
                  />
                }
                label={<Typography variant="body1" fontWeight={500}>Enable Microsoft Clarity</Typography>}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Project ID"
                placeholder="xxxxxxxxxx"
                value={config.clarity.projectId}
                onChange={(e) => handleInputChange('clarity', 'projectId', e.target.value)}
                disabled={!config.clarity.enabled}
                helperText="Your Microsoft Clarity Project ID (auto-populated from environment)"
                InputProps={{
                  style: { height: '48px' }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '48px'
                  },
                  '& .MuiInputBase-input': {
                    padding: '12px 14px'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Scripts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Custom Scripts (Advanced)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Header Scripts"
                        placeholder="<script>...</script>"
                        value={config.customScripts.headerScripts}
                        onChange={(e) => handleInputChange('customScripts', 'headerScripts', e.target.value)}
                        helperText="Scripts to be loaded in the <head> section"
                        sx={{
                          '& .MuiInputBase-root': {
                            minHeight: '144px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Footer Scripts"
                        placeholder="<script>...</script>"
                        value={config.customScripts.footerScripts}
                        onChange={(e) => handleInputChange('customScripts', 'footerScripts', e.target.value)}
                        helperText="Scripts to be loaded before </body> tag"
                        sx={{
                          '& .MuiInputBase-root': {
                            minHeight: '144px'
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Only add trusted scripts. Malicious scripts can compromise your website security.
                  </Alert>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </Box>
    </Box>
  );
}