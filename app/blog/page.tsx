import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, SITE_URL } from '@/utils/metadata';
import BlogListClient from './BlogListClient';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'blog');
  return buildMetadata({
    title: ps.metaTitle || `Blog - Tips, Guides & Savings Advice | ${siteName}`,
    description: ps.metaDescription || `Read the latest tips, shopping guides and savings advice on the ${siteName} blog. Learn how to save more.`,
    url: `${SITE_URL}/blog`,
    image: getPageOgImage(config, 'blog'),
    siteName,
  });
}

export default function BlogPage() {
  return <BlogListClient />;
}
