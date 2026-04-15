import { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const metadataBase = new URL(SITE_URL);

export { SITE_URL, API_URL, metadataBase };

export async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { next: { revalidate: 60 } });
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
  const safeTitle = title.length > 60 ? title.slice(0, 57) + '...' : title;
  const safeDesc = description.length > 160 ? description.slice(0, 157) + '...' : description;

  const ogImage = image || `${SITE_URL}/og_img.png`;

  return {
    metadataBase,
    title: safeTitle,
    description: safeDesc,
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url,
      type,
      siteName: siteName || 'CouponsScript',
      images: [{ url: ogImage, width: 1200, height: 630, alt: safeTitle }],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
