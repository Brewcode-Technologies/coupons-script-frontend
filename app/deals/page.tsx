import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, getSiteUrl } from '@/utils/metadata';
import DealsClient from './DealsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'deals');
  return buildMetadata({
    title: ps.metaTitle || `Today's Best Deals & Offers | ${siteName}`,
    description: ps.metaDescription || `Discover the best deals of the day. Handpicked, verified offers from top stores. Save big with ${siteName}.`,
    url: `${getSiteUrl()}/deals`,
    image: getPageOgImage(config, 'deals'),
    siteName,
  });
}

export default function DealsPage() {
  return <DealsClient />;
}
