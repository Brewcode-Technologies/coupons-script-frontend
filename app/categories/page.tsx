import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, SITE_URL } from '@/utils/metadata';
import CategoriesClient from './CategoriesClient';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'categories');
  return buildMetadata({
    title: ps.metaTitle || `All Categories - Browse Deals by Category | ${siteName}`,
    description: ps.metaDescription || `Explore coupons and deals by category. Find savings on fashion, electronics, food, travel and more at ${siteName}.`,
    url: `${SITE_URL}/categories`,
    image: getPageOgImage(config, 'categories'),
    siteName,
  });
}

export default function CategoriesPage() {
  return <CategoriesClient />;
}
