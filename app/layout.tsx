'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import CssBaseline from '@mui/material/CssBaseline';
import DynamicThemeProvider from '@/components/DynamicThemeProvider';
import { ThemeProvider as CustomThemeProvider } from '@/components/ThemeProvider';
import DynamicFontLoader from '@/components/DynamicFontLoader';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import PublicLayout from '@/components/layout/PublicLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Default font - will be overridden by DynamicFontLoader */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet" />

        {/* Sync dark mode before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Coupons Script",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        <Provider store={store}>
          <CustomThemeProvider>
          <DynamicThemeProvider>
            <DynamicFontLoader />
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
      </body>
    </html>
  );
}
