import { Metadata } from 'next';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://coupons-script-frontend.vercel.app';
}

export { getSiteUrl, getApiUrl };

export async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${getApiUrl()}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch {
    return null;
  }
}

export async function getSiteConfigServer() {
  return await fetchAPI('/public/site/config');
}

export function getPageOgImage(config: any, pageSlug: string): string {
  return config?.pageOgImages?.[pageSlug] || config?.logos?.ogImage || config?.seo?.ogImage || '';
}

export function getPageSeo(config: any, pageSlug: string) {
  const ps = config?.pageSeo?.[pageSlug] || {};
  return {
    metaTitle: ps.metaTitle || '',
    metaDescription: ps.metaDescription || '',
    ogTitle: ps.ogTitle || '',
    ogDescription: ps.ogDescription || '',
  };
}

export function buildMetadata({
  title,
  description,
  url,
  image,
  type = 'website',
  siteName,
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  siteName?: string;
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const siteUrl = getSiteUrl();
  const safeTitle = title.length > 60 ? title.slice(0, 57) + '...' : title;
  const safeDesc = description.length > 160 ? description.slice(0, 157) + '...' : description;

  // Optimize Cloudinary images to 1200x630 JPEG under 600KB for WhatsApp compatibility
  let ogImageUrl: string;
  if (image && image.includes('res.cloudinary.com')) {
    ogImageUrl = image.replace('/upload/', '/upload/w_1200,h_630,c_fill,g_center,q_80,f_jpg/');
  } else if (image) {
    ogImageUrl = image;
  } else {
    const params = new URLSearchParams({ title: safeTitle, ...(safeDesc && { description: safeDesc }), ...(siteName && { siteName }) });
    ogImageUrl = `${siteUrl}/api/og?${params.toString()}`;
  }

  const ogImageType = ogImageUrl.match(/\.(jpe?g)/i) ? 'image/jpeg' : 'image/png';

  return {
    metadataBase: new URL(siteUrl),
    title: safeTitle,
    description: safeDesc,
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url,
      type,
      siteName: siteName || 'CouponsScript',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: safeTitle, type: ogImageType, secureUrl: ogImageUrl }],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: safeTitle }],
    },
    alternates: {
      canonical: url,
    },
  };
}
