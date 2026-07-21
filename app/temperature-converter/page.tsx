import type { Metadata } from 'next'
import Link from 'next/link'
import { TOOLS, toolUrl } from '@/lib/site'
import { popularPairsFor, convert, fmtConv } from '@/lib/conversions'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'temperature-converter')!

export const metadata: Metadata = {
  title: 'Temperature Converter — Celsius, Fahrenheit & Kelvin',
  description:
    'Free temperature converter. Convert instantly between Celsius, Fahrenheit, and Kelvin, with the exact conversion formula shown for every pair.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Temperature Converter — Celsius, Fahrenheit & Kelvin',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I convert Celsius to Fahrenheit?',
    a: 'Multiply by 9/5 and add 32: °F = °C × 9 ÷ 5 + 32. So 20°C is 20 × 1.8 + 32 = 68°F, and 100°C (boiling water) is 212°F. To go back, subtract 32 and multiply by 5/9.',
  },
  {
    q: 'How do I convert Fahrenheit to Celsius?',
    a: 'Subtract 32, then multiply by 5/9: °C = (°F − 32) × 5 ÷ 9. So 98.6°F (body temperature) is (98.6 − 32) × 0.5556 = 37°C. This is the reverse of the Celsius-to-Fahrenheit formula.',
  },
  {
    q: 'What is Kelvin and how does it relate to Celsius?',
    a: 'Kelvin is the SI unit of temperature and starts at absolute zero, the coldest possible temperature. It uses the same degree size as Celsius, so you simply add 273.15 to go from Celsius to Kelvin: K = °C + 273.15. Water freezes at 273.15 K.',
  },
  {
    q: 'At what temperature are Celsius and Fahrenheit equal?',
    a: 'At −40 degrees. −40°C and −40°F are the same temperature, the single point where the two scales cross. It is a handy fact for checking that a conversion formula is being applied correctly.',
  },
  {
    q: 'What are the key reference points on each scale?',
    a: 'Water freezes at 0°C, 32°F, and 273.15 K, and boils at 100°C, 212°F, and 373.15 K at sea level. Normal human body temperature is about 37°C or 98.6°F. Absolute zero is 0 K, −273.15°C, or −459.67°F.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the temperature converter</h2>
          <p>
            Enter a temperature, choose the scale it is in, and the equivalent values in the other
            two scales appear instantly. Whether you are reading a foreign weather forecast, following
            a recipe, or checking a science figure, the conversion is immediate and runs entirely in
            your browser.
          </p>

          <h2>The three scales</h2>
          <p>
            Celsius is used across most of the world and is anchored to water: 0° for freezing, 100°
            for boiling. Fahrenheit, common in the United States, places freezing at 32° and boiling
            at 212°, giving finer whole-number gradations for everyday air temperatures. Kelvin shares
            Celsius&rsquo;s degree size but starts at absolute zero, which makes it the scale of choice
            in science because it never goes negative.
          </p>

          <h2>Remembering the formulas</h2>
          <p>
            The two you will use most are °F = °C × 9/5 + 32 and its reverse, °C = (°F − 32) × 5/9.
            Kelvin is the easiest: just add or subtract 273.15 from Celsius. A useful landmark is that
            the two everyday scales meet at −40°, and body temperature sits near 37°C or 98.6°F. This
            converter applies all of these exactly, so you never have to trust mental arithmetic.
          </p>

          <h2>Popular temperature conversions</h2>
          <div className="not-prose grid sm:grid-cols-2 gap-2">
            {popularPairsFor('temperature').map(p => (
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
