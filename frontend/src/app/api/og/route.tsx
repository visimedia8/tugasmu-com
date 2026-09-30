import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Teman Pintar Belajarmu';
      
    const hasCategory = searchParams.has('category');
    let category = 'TUGASMU BLOG';
    if (hasCategory) {
      const rawCategory = searchParams.get('category');
      if (rawCategory && rawCategory !== 'undefined') {
        category = rawCategory
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }

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
            backgroundColor: '#0f1f3d',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Noise overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Accent decoration 1 (Lime) */}
          <div
            style={{
              position: 'absolute',
              top: -150,
              right: -100,
              width: 500,
              height: 500,
              backgroundColor: '#b8ff57',
              filter: 'blur(120px)',
              opacity: 0.25,
              borderRadius: '50%',
            }}
          />
          
          {/* Accent decoration 2 (Sky) */}
          <div
            style={{
              position: 'absolute',
              bottom: -150,
              left: -100,
              width: 600,
              height: 600,
              backgroundColor: '#0ea5e9',
              filter: 'blur(140px)',
              opacity: 0.35,
              borderRadius: '50%',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '85%',
              padding: '40px',
              zIndex: 10,
            }}
          >
            {/* Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#b8ff57',
                padding: '8px 24px',
                borderRadius: '9999px',
                marginBottom: '32px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#0f1f3d',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </span>
            </div>

            {/* Main Title */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 900,
                color: '#f7f3ec',
                lineHeight: 1.3,
                marginBottom: '40px',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>

            {/* Bottom Brand Watermark */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                position: 'absolute',
                bottom: '80px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#b8ff57',
                  letterSpacing: '-0.02em',
                }}
              >
                TugasMu
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 400,
                  color: '#f7f3ec',
                  marginLeft: '12px',
                }}
              >
                — Teman Pintar Belajarmu
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
