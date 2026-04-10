'use client';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import { getImageUrl } from '@/utils/serverUrl';

interface FooterOneProps { config: any; }

const getSocialIcon = (iconName: string) => {
  const p = { className: 'w-5 h-5 text-white' };
  switch (iconName.toLowerCase()) {
    case 'facebook':  return <Facebook {...p} />;
    case 'twitter':   return <Twitter {...p} />;
    case 'instagram': return <Instagram {...p} />;
    case 'linkedin':  return <Linkedin {...p} />;
    case 'youtube':   return <Youtube {...p} />;
    default:          return <Facebook {...p} />;
  }
};

export default function FooterOne({ config }: FooterOneProps) {
  const { siteConfig, darkPalette } = useDynamicTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const primary   = isDark ? darkPalette.cardBg : (config?.bgColor || siteConfig?.theme?.primaryColor || '#7c3aed');
  const secondary = isDark ? darkPalette.bg : (siteConfig?.theme?.secondaryColor || '#9333ea');
  const accent    = (siteConfig?.theme as any)?.accentColor || '#f59e0b';
  const themeColor = siteConfig?.theme?.primaryColor || '#7c3aed';

  const content = siteConfig?.footerContent;
  const columns = content?.columns || [];
  const bottomLinks = content?.bottomLinks ?? [{ label: 'Terms & Conditions', href: '/terms-and-conditions' }, { label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Cookie Policy', href: '/cookie-policy' }, { label: 'Sitemap', href: '/sitemap.xml' }];
  const footerCategories = (siteConfig as any)?.footerCategories || [];
  const categoriesHeading = (siteConfig as any)?.footerCategoriesHeading;

  const linkHoverStyle = {
    '--hover-color': accent,
  } as React.CSSProperties;

  return (
    <footer className="text-white" style={{ backgroundColor: primary }}>
      <style>{`
        .footer-link, .footer-cat-link, .footer-bottom-link {
          position: relative; text-decoration: none; transition: all 0.2s; display: inline-block;
        }
        .footer-link { color: rgba(255,255,255,0.75); }
        .footer-cat-link { color: rgba(255,255,255,0.7); }
        .footer-bottom-link { color: rgba(255,255,255,0.7); }
        .footer-link::after, .footer-cat-link::after, .footer-bottom-link::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1.5px; background: #fff;
          transition: width 0.3s ease;
        }
        .footer-link:hover, .footer-cat-link:hover, .footer-bottom-link:hover {
          color: #fff; font-weight: 600;
        }
        .footer-link:hover::after, .footer-cat-link:hover::after, .footer-bottom-link:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="mb-8">
          {siteConfig?.logos?.footer ? (
            <img src={getImageUrl(siteConfig.logos.footer)} alt={siteConfig.siteName} className="h-16 w-auto mb-2" />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight">
              {siteConfig?.siteName || 'Coupons Script'}{' '}
              <span className="text-4xl md:text-5xl font-extrabold" style={{ color: accent }}>20</span>
              <span className="text-sm align-top ml-0.5">YEARS</span>
            </h2>
          )}

          {content?.tagline && (
            <p className="text-sm opacity-70 mt-3 max-w-2xl leading-relaxed">{content.tagline}</p>
          )}
        </div>

        {columns.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {columns.map((col: any, idx: number) => (
              <div key={idx}>
                {col.heading && <h3 className="text-sm font-bold tracking-wide mb-4 uppercase">{col.heading}</h3>}
                <ul className="space-y-2.5">
                  {(col.links || []).map((link: any, lIdx: number) => (
                    <li key={lIdx} className="list-none">
                      <a href={link.href} className="footer-link text-sm">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Popular Categories - 4 Columns */}
        {footerCategories.length > 0 && (
          <div className={`border-t border-white/15 ${categoriesHeading ? 'mt-12 pt-10' : columns.length > 0 ? 'mt-8 pt-6' : ''}`}>
            {categoriesHeading && (
              <h3 className="text-base font-bold mb-8 uppercase tracking-widest" style={{ color: accent }}>
                {categoriesHeading}
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {footerCategories.map((col: any, colIdx: number) => (
                <div key={colIdx}>
                  <h4 className="text-sm font-bold mb-5 pb-2 uppercase tracking-wide border-b border-white/20">
                    {col.title}
                  </h4>
                  <div className="space-y-5">
                    {(col.groups || []).filter((g: any) => g.links?.length > 0 && g.links.some((l: any) => l.label?.trim())).map((group: any, gIdx: number) => (
                      <div key={gIdx}>
                        {group.heading && group.heading !== 'New Group' && (
                          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {group.heading}
                          </p>
                        )}
                        <ul className="space-y-2">
                          {(group.links || []).filter((l: any) => l.label?.trim()).map((link: any, lIdx: number) => (
                            <li key={lIdx} className="list-none">
                              <a href={link.href.replace(/-coupons$/, '')} className="footer-cat-link text-sm leading-relaxed">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {siteConfig?.footer?.showSocialMedia && (
              <div className="flex items-center gap-5">
                {Object.entries(siteConfig.socialMedia || {}).map(([platform, data]: [string, any]) => {
                  if (!data.enabled || !data.url) return null;
                  return (
                    <a key={platform} href={data.url} className="opacity-70 hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
                      {getSocialIcon(data.icon)}
                    </a>
                  );
                })}
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
              {bottomLinks.map((link: any) => (
                <a key={link.label} href={link.href} className="footer-bottom-link text-sm whitespace-nowrap">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: secondary }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-sm opacity-80 text-center leading-relaxed">
            {siteConfig?.footer?.copyright || '© 2026 Coupons Script. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
