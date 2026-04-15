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

  const ogImage = image || `${siteUrl}/og_img.png`;

  // Force Cloudinary images to 1200x630 PNG for WhatsApp/social media compatibility
  const ogImageUrl = ogImage.includes('res.cloudinary.com') 
    ? ogImage.replace('/upload/', '/upload/w_1200,h_630,c_fill,g_center,q_auto,f_png/') 
    : ogImage;

  // Determine image MIME type for og:image:type
  const ogImageType = ogImageUrl.endsWith('.jpg') || ogImageUrl.endsWith('.jpeg') 
    ? 'image/jpeg' 
    : 'image/png';

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
