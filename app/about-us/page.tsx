import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, getSiteUrl } from '@/utils/metadata';
import AboutClient from './AboutClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'about-us');
  return buildMetadata({
    title: ps.metaTitle || `About Us | ${siteName}`,
    description: ps.metaDescription || `Learn about ${siteName} - your trusted destination for verified coupons, deals and promo codes from top stores.`,
    url: `${getSiteUrl()}/about-us`,
    image: getPageOgImage(config, 'about-us'),
    siteName,
  });
}

export default function AboutUsPage() {
  return <AboutClient />;
}
