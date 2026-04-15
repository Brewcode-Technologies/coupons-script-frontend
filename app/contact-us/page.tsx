import { Metadata } from 'next';
import { getSiteConfigServer, buildMetadata, getPageOgImage, getPageSeo, getSiteUrl } from '@/utils/metadata';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer();
  const siteName = config?.siteName || 'CouponsScript';
  const ps = getPageSeo(config, 'contact-us');
  return buildMetadata({
    title: ps.metaTitle || `Contact Us | ${siteName}`,
    description: ps.metaDescription || `Get in touch with ${siteName}. Have questions about coupons, deals or partnerships? We'd love to hear from you.`,
    url: `${getSiteUrl()}/contact-us`,
    image: getPageOgImage(config, 'contact-us'),
    siteName,
  });
}

export default function ContactUsPage() {
  return <ContactClient />;
}
