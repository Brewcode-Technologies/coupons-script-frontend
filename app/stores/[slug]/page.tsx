import { Metadata } from 'next';
import { fetchAPI, buildMetadata, getSiteUrl } from '@/utils/metadata';
import StoreDetailClient from './StoreDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const store = await fetchAPI(`/public/stores/details/${params.slug}`);
  if (!store) return { title: 'Store Not Found' };

  const name = store.storeName || store.name || 'Store';
  const logo = store.logo?.startsWith('http') ? store.logo : '';

  return buildMetadata({
    title: `${name} Coupons & Promo Codes - Save Today`,
    description: store.description || `Find the latest ${name} coupons, promo codes and deals. Save money on your next purchase.`,
    url: `${getSiteUrl()}/stores/${params.slug}`,
    image: logo,
  });
}

export default function StorePage() {
  return <StoreDetailClient />;
}
