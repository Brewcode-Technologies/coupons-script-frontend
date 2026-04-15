import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, SITE_URL } from '@/utils/metadata';
import StoresClient from './StoresClient';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'stores');
  return buildMetadata({
    title: ps.metaTitle || `All Stores - Coupons & Promo Codes | ${siteName}`,
    description: ps.metaDescription || `Browse all stores and find the best coupons, promo codes and deals. Save money at your favorite stores with ${siteName}.`,
    url: `${SITE_URL}/stores`,
    image: getPageOgImage(config, 'stores'),
    siteName,
  });
}

export default function StoresPage() {
  return <StoresClient />;
}
