import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'TugasMu - AI Tools Edukasi';
    const subtitle = searchParams.get('subtitle') || 'Teman Pintar Belajarmu';

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
            backgroundColor: '#f8fafc',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #e2e8f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e2e8f0 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '40px',
            fontFamily: 'sans-serif',
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
              padding: '60px 80px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
              border: '2px solid #f1f5f9',
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#0284c7', // sky-600
                marginBottom: 24,
                letterSpacing: '-0.05em',
              }}
            >
              TugasMu
            </div>
            
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#0f172a', // slate-900
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: 24,
                maxWidth: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 32,
                color: '#64748b', // slate-500
                textAlign: 'center',
                maxWidth: 700,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
