import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')?.slice(0, 100) || 'Best Coupons & Deals';
    const description = searchParams.get('description')?.slice(0, 160) || '';
    const siteName = searchParams.get('siteName') || 'CouponsScript';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d9488',
            backgroundImage: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)',
            padding: '60px 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '50px 60px',
              width: '100%',
              height: '100%',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#0d9488',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {siteName}
            </div>
            <div
              style={{
                fontSize: title.length > 40 ? 40 : 52,
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                lineHeight: 1.2,
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: 22,
                  color: '#6b7280',
                  textAlign: 'center',
                  marginTop: 20,
                  maxWidth: '800px',
                  lineHeight: 1.4,
                }}
              >
                {description.length > 120 ? description.slice(0, 117) + '...' : description}
              </div>
            )}
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (e: any) {
    console.log(`OG Image Error: ${e.message}`);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
