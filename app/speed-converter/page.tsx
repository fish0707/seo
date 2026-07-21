import type { Metadata } from 'next'
import Link from 'next/link'
import { TOOLS, toolUrl } from '@/lib/site'
import { popularPairsFor, convert, fmtConv } from '@/lib/conversions'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'speed-converter')!

export const metadata: Metadata = {
  title: 'Speed Converter — km/h, mph, m/s, Knots',
  description:
    'Free speed converter. Convert between kilometres per hour, miles per hour, metres per second, feet per second, and knots instantly.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Speed Converter — km/h, mph, m/s, Knots',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I convert km/h to mph?',
    a: 'Multiply kilometres per hour by 0.621371, since one kilometre is about 0.621 miles. So 100 km/h ≈ 62.1 mph. To convert mph to km/h, multiply by 1.609344 instead.',
  },
  {
    q: 'How do I convert m/s to km/h?',
    a: 'Multiply metres per second by 3.6, because there are 3,600 seconds in an hour and 1,000 metres in a kilometre. So 10 m/s = 36 km/h. To go back, divide km/h by 3.6.',
  },
  {
    q: 'What is a knot?',
    a: 'A knot is one nautical mile per hour, used in aviation and at sea. One knot equals about 1.852 km/h or 0.514 m/s. It exists because a nautical mile is tied to the Earth’s geometry, which makes navigation calculations simpler.',
  },
  {
    q: 'Are these speed conversions exact?',
    a: 'Yes. They are based on exact definitions — a mile is exactly 1,609.344 metres and a knot exactly 1,852 metres per hour — so the results are precise. Any rounding appears only in how the number is displayed.',
  },
  {
    q: 'What is a quick way to estimate mph from km/h?',
    a: 'A rough shortcut is to take about six-tenths of the km/h figure: 100 km/h is roughly 60 mph. For an exact answer use the converter, but the six-tenths rule is handy for quick mental estimates while driving abroad.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the speed converter</h2>
          <p>
            Enter a value and select its unit. The converter instantly shows the equivalent speed in
            every other unit — kilometres per hour, miles per hour, metres per second, feet per
            second, and knots — so you can read across systems at a glance. Everything runs in your
            browser.
          </p>

          <h2>One tool for road, track, air, and sea</h2>
          <p>
            Different fields measure speed differently: cars use km/h or mph, physics uses metres per
            second, and ships and aircraft use knots. Converting between them is a frequent need
            whether you are driving in another country, reading a weather report, or working through a
            physics problem. Showing all units together removes the friction of picking a single
            conversion direction.
          </p>

          <h2>Exact and instant</h2>
          <p>
            The conversions here use exact international definitions — a mile is exactly 1,609.344
            metres, a knot exactly 1,852 metres per hour — so every result is precise, with rounding
            only in the display. For very large or very small values the converter switches to
            scientific notation to keep the answer readable. Nothing you enter is stored, and the whole
            calculation happens on your device.
          </p>

          <h2>Popular speed conversions</h2>
          <div className="not-prose grid sm:grid-cols-2 gap-2">
            {popularPairsFor('speed').map(p => (
              <Link key={p.slug} href={`/convert/${p.slug}`} className="px-3 py-2 rounded-lg border border-line hover:border-brand hover:bg-surface transition-colors text-sm">
                <span className="font-medium text-ink">{p.from.titleName} to {p.to.titleName}</span>
                <span className="text-muted block text-xs mt-0.5">1 {p.from.symbol} = {fmtConv(convert(1, p.from, p.to))} {p.to.symbol}</span>
              </Link>
            ))}
          </div>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
