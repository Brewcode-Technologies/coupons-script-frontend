import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, SITE_URL } from '@/utils/metadata';
import HomeClient from './HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'home');
  const title = ps.metaTitle || config?.seo?.metaTitle || `${siteName} - Best Coupons, Deals & Promo Codes`;
  const description = ps.metaDescription || config?.seo?.metaDescription || config?.siteDescription || `Save money with verified coupons and deals from top stores at ${siteName}.`;
  const image = getPageOgImage(config, 'home');

  return buildMetadata({ title, description, url: SITE_URL, image, siteName });
}

export default function HomePage() {
  return <HomeClient />;
}
