// Analytics Tracking Utilities
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    clarity?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: (...args: any[]) => void;
  }
}

// Google Analytics
export const loadGoogleAnalytics = (trackingId: string) => {
  if (typeof window === 'undefined' || window.gtag) {
    console.log('🔍 Google Analytics: Already loaded or server-side, skipping');
    return;
  }

  console.log('🚀 Loading Google Analytics with ID:', trackingId);

  const script1 = document.createElement('script');
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script1.async = true;
  script1.onload = () => console.log('✅ Google Analytics script loaded successfully');
  script1.onerror = () => console.error('❌ Failed to load Google Analytics script');

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trackingId}');
    console.log('✅ Google Analytics initialized with ID: ${trackingId}');
  `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
};

// Microsoft Clarity
export const loadClarity = (projectId: string) => {
  if (typeof window === 'undefined' || window.clarity) {
    console.log('🔍 Microsoft Clarity: Already loaded or server-side, skipping');
    return;
  }

  console.log('🚀 Loading Microsoft Clarity with ID:', projectId);

  const script = document.createElement('script');
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      console.log('✅ Microsoft Clarity initialized with ID: ${projectId}');
    })(window, document, "clarity", "script", "${projectId}");
  `;

  document.head.appendChild(script);
  console.log('✅ Microsoft Clarity script added to head');
};

// Facebook Pixel
export const loadFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined' || window.fbq) return;

  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;

  document.head.appendChild(script);

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
  document.head.appendChild(noscript);
};

// TikTok Pixel
export const loadTikTokPixel = (pixelId: string) => {
  if (typeof window === 'undefined' || window.ttq) return;

  const script = document.createElement('script');
  script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${pixelId}');
      ttq.page();
    }(window, document, 'ttq');
  `;

  document.head.appendChild(script);
};

// Custom Scripts
export const loadCustomScripts = (headerScripts: string, footerScripts: string) => {
  if (typeof window === 'undefined') return;

  // Load header scripts
  if (headerScripts?.trim()) {
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = headerScripts;
    const scripts = headerDiv.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = script.async;
      } else {
        newScript.innerHTML = script.innerHTML;
      }
      document.head.appendChild(newScript);
    });
  }

  // Load footer scripts
  if (footerScripts?.trim()) {
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = footerScripts;
    const scripts = footerDiv.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = script.async;
      } else {
        newScript.innerHTML = script.innerHTML;
      }
      document.body.appendChild(newScript);
    });
  }
};

// Main Analytics Loader
export const loadAnalytics = async () => {
  console.log('🔍 Starting analytics configuration load...');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/public/site/analytics`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const analytics = await response.json();
    console.log('📊 Analytics configuration loaded:', analytics);

    // Google Analytics
    if (analytics.googleAnalytics?.enabled && analytics.googleAnalytics?.trackingId) {
      console.log('🚀 Google Analytics enabled, loading...');
      loadGoogleAnalytics(analytics.googleAnalytics.trackingId);
    } else {
      console.log('⚠️ Google Analytics disabled or missing tracking ID');
    }

    // Microsoft Clarity
    if (analytics.clarity?.enabled && analytics.clarity?.projectId) {
      console.log('🚀 Microsoft Clarity enabled, loading...');
      loadClarity(analytics.clarity.projectId);
    } else {
      console.log('⚠️ Microsoft Clarity disabled or missing project ID');
    }

    // Facebook Pixel
    if (analytics.facebookPixel?.enabled && analytics.facebookPixel?.pixelId) {
      loadFacebookPixel(analytics.facebookPixel.pixelId);
    }

    // TikTok Pixel
    if (analytics.tiktokPixel?.enabled && analytics.tiktokPixel?.pixelId) {
      loadTikTokPixel(analytics.tiktokPixel.pixelId);
    }

    // Custom Scripts
    if (analytics.customScripts) {
      loadCustomScripts(
        analytics.customScripts.headerScripts,
        analytics.customScripts.footerScripts
      );
    }
    
    console.log('✅ Analytics loading completed successfully');
  } catch (error) {
    console.error('❌ Failed to load analytics:', error);
  }
};