import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'CalcMate').slice(0, 90)
  const subtitle = (searchParams.get('subtitle') || 'Free Online Calculators for Everyday Life').slice(0, 120)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: 16, background: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#2563EB', fontSize: 40, fontWeight: 700,
            }}
          >
            ∑
          </div>
          <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 700 }}>CalcMate</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#ffffff', fontSize: 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {title}
          </div>
          <div style={{ color: '#DbeafE', fontSize: 30, marginTop: 20 }}>{subtitle}</div>
        </div>

        <div style={{ color: '#Bfdbfe', fontSize: 26 }}>calc-mates.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
