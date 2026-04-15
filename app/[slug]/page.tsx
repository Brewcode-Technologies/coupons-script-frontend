import { Metadata } from 'next';
import { fetchAPI, getSiteConfigServer, buildMetadata, getPageOgImage, SITE_URL } from '@/utils/metadata';
import DynamicPageClient from './DynamicPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [page, config] = await Promise.all([
    fetchAPI(`/public/site/${params.slug}`),
    getSiteConfigServer(),
  ]);
  const siteName = config?.siteName || 'CouponsScript';

  if (!page) {
    return { title: `Page Not Found | ${siteName}` };
  }

  return buildMetadata({
    title: `${page.title || params.slug} | ${siteName}`,
    description: page.description || `${page.title || params.slug} - ${siteName}`,
    url: `${SITE_URL}/${params.slug}`,
    image: getPageOgImage(config, params.slug),
    siteName,
  });
}

export default function DynamicPage() {
  return <DynamicPageClient />;
}
