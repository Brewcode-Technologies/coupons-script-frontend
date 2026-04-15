'use client';

import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import { ChevronRight, Target, Users, Award, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = { Target, Users, Award, Heart, Shield, Zap };

const defaultFeatures = [
  { icon: 'Target', title: 'Our Mission', description: 'To help millions of shoppers save money by providing the most comprehensive collection of verified coupons, deals, and discounts from top brands worldwide.' },
  { icon: 'Users', title: 'Community Driven', description: 'Built by deal hunters, for deal hunters. Our community of savvy shoppers helps us discover and verify the best offers available online.' },
  { icon: 'Award', title: 'Verified Quality', description: 'Every coupon and deal on our platform is manually verified by our team to ensure you get working discounts every time you shop.' },
  { icon: 'Heart', title: 'Customer First', description: 'Your savings are our priority. We work tirelessly to negotiate exclusive deals and bring you the highest value offers from your favorite stores.' },
  { icon: 'Shield', title: 'Trusted Platform', description: 'With industry-leading security and privacy protection, you can shop confidently knowing your information is safe with us.' },
  { icon: 'Zap', title: 'Always Fresh', description: 'Our automated systems and dedicated team ensure that expired deals are removed quickly and new offers are added daily.' },
];

const defaultStats = [
  { number: '10M+', label: 'Happy Customers' },
  { number: '50K+', label: 'Active Coupons' },
  { number: '5K+', label: 'Partner Stores' },
  { number: '$500M+', label: 'Total Savings' },
];

const defaultValues = [
  { title: 'Transparency', description: 'We believe in complete transparency about how our platform works. We clearly disclose our partnerships with retailers and explain how we make money.' },
  { title: 'Innovation', description: "We're constantly exploring new technologies and methods to improve your savings experience. From AI-powered deal discovery to personalized recommendations." },
  { title: 'Community', description: 'Our users are at the heart of everything we do. We actively listen to feedback, implement requested features, and work together with our community.' },
  { title: 'Reliability', description: 'When you find a deal on our site, you can trust that it works. Our rigorous verification process ensures you spend less time hunting for working codes.' },
];

export default function AboutClient() {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const secondary = siteConfig?.theme?.secondaryColor || '#9333ea';
  const siteName = siteConfig?.siteName || 'Coupons Script';
  const pageBg = isDark ? darkPalette.bg : (siteConfig?.theme?.backgroundColor || '#f8fafc');
  const textPrimary = isDark ? darkPalette.text : (siteConfig?.theme?.textColor || '#0f172a');
  const textSecondary = isDark ? `${darkPalette.text}99` : '#64748b';
  const cardBg = isDark ? darkPalette.cardBg : '#ffffff';
  const borderColor = isDark ? `${darkPalette.text}20` : '#e2e8f0';

  const about = (siteConfig as any)?.aboutPage || {};
  const features = about.features?.length ? about.features : defaultFeatures;
  const stats = about.stats?.length ? about.stats : defaultStats;
  const values = about.values?.length ? about.values : defaultValues;
  const intro = about.intro || `Welcome to <strong>${siteName}</strong>, your ultimate destination for finding the best deals, coupons, and discounts from thousands of online stores. Since our founding, we've been dedicated to helping shoppers like you save money on everything from fashion and electronics to travel and dining.\n\nWhat started as a simple idea to help friends and family find better deals has grown into a comprehensive platform serving millions of users worldwide. We believe that everyone deserves access to great savings, and we're committed to making that a reality through our carefully curated collection of offers.\n\nOur team of deal experts works around the clock to discover, verify, and organize the best coupons and promotions available. We partner directly with retailers to bring you exclusive offers you won't find anywhere else.`;
  const story = about.story || `<strong>Founded in 2020</strong>, ${siteName} began as a passion project by a team of avid online shoppers who were frustrated by the scattered and often unreliable nature of coupon sites.\n\nDetermined to create something better, we set out to build a platform that would prioritize <strong>quality over quantity</strong>. Instead of overwhelming users with thousands of unverified codes, we focused on curating a smaller collection of high-quality, working offers.\n\nToday, we're proud to serve millions of users worldwide and have helped them save hundreds of millions of dollars on their online purchases.`;

  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-1 text-xs mb-6" style={{ color: textSecondary }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: primary }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>About Us</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: primary }}>About Us</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Introduction */}
        <div className="mb-12">
          <div className="max-w-none" style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}
            dangerouslySetInnerHTML={{ __html: intro.replace(/\n/g, '</p><p class="mb-4">') }}
          />
        </div>

        {/* Stats */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="text-center rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: primary }}>{stat.number}</div>
                <div className="text-sm font-medium" style={{ color: textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || Target;
              return (
                <div key={i} className="rounded-2xl p-6 hover:shadow-md transition-shadow" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${primary}20` }}>
                    <Icon className="w-6 h-6" style={{ color: primary }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: textPrimary }}>{f.title}</h3>
                  <p className="text-sm" style={{ color: textSecondary, lineHeight: '1.6' }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>Our Story</h2>
          <div className="max-w-none" style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}
            dangerouslySetInnerHTML={{ __html: story.replace(/\n/g, '</p><p class="mb-4">') }}
          />
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v: any, i: number) => (
              <div key={i}>
                <h3 className="font-semibold mb-3" style={{ color: textPrimary }}>{v.title}</h3>
                <p style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, ${primary}15, ${secondary}15)`, border: `1px solid ${borderColor}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: textPrimary }}>Ready to Start Saving?</h2>
          <p className="mb-6" style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}>
            Join millions of smart shoppers who trust {siteName} to help them save money on their favorite brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/deals" className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 no-underline" style={{ backgroundColor: primary }}>Browse Deals</Link>
            <Link href="/contact-us" className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 no-underline" style={{ color: primary, border: `2px solid ${primary}` }}>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
