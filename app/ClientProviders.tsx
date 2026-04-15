'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import CssBaseline from '@mui/material/CssBaseline';
import DynamicThemeProvider from '@/components/DynamicThemeProvider';
import { ThemeProvider as CustomThemeProvider } from '@/components/ThemeProvider';
import DynamicFontLoader from '@/components/DynamicFontLoader';
import DynamicAnalyticsLoader from '@/components/DynamicAnalyticsLoader';
import { Toaster } from 'react-hot-toast';
import PublicLayout from '@/components/layout/PublicLayout';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <DynamicThemeProvider>
          <DynamicFontLoader />
          <DynamicAnalyticsLoader />
          <CssBaseline />
          <PublicLayout>{children}</PublicLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#363636', color: '#fff' },
              success: { duration: 3000, iconTheme: { primary: '#4ade80', secondary: '#fff' } },
              error: { duration: 4000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              loading: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } },
            }}
          />
        </DynamicThemeProvider>
      </CustomThemeProvider>
    </Provider>
  );
}
