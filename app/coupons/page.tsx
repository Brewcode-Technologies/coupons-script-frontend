import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, getSiteUrl } from '@/utils/metadata';
import CouponsListClient from './CouponsListClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'coupons');
  return buildMetadata({
    title: ps.metaTitle || `All Coupons & Promo Codes | ${siteName}`,
    description: ps.metaDescription || `Browse all verified coupons and promo codes. Find discounts from top stores and save on your next purchase at ${siteName}.`,
    url: `${getSiteUrl()}/coupons`,
    image: getPageOgImage(config, 'coupons'),
    siteName,
  });
}

export default function AllCouponsPage() {
  return <CouponsListClient />;
}
