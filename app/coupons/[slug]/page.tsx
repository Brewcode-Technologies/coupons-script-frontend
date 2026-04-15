import { Metadata } from 'next';
import { fetchAPI, buildMetadata, getSiteUrl } from '@/utils/metadata';
import CouponsClient from './CouponsClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const store = await fetchAPI(`/public/stores/details/${slug}`);
  const storeName = store?.storeName || name;
  const logo = store?.logo?.startsWith('http') ? store.logo : '';

  return buildMetadata({
    title: `${storeName} Coupons & Discount Codes`,
    description: `Get the latest ${storeName} coupons, discount codes and offers. Verified and updated daily to save you money.`,
    url: `${getSiteUrl()}/coupons/${slug}`,
    image: logo,
  });
}

export default function CouponsPage() {
  return <CouponsClient />;
}
