import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'length-converter')!

export const metadata: Metadata = {
  title: 'Length Converter — Metric & Imperial Distance Units',
  description:
    'Free length converter. Convert between mm, cm, m, km, inches, feet, yards, and miles instantly, with every unit shown at once.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Length Converter — Metric & Imperial Distance Units',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I convert centimetres to inches?',
    a: 'Divide the number of centimetres by 2.54, since one inch is exactly 2.54 cm. So 100 cm ÷ 2.54 = 39.37 inches. To go the other way, multiply inches by 2.54 to get centimetres.',
  },
  {
    q: 'How many feet are in a metre?',
    a: 'One metre equals about 3.281 feet, because a foot is defined as exactly 0.3048 metres. To convert metres to feet, divide by 0.3048 or multiply by 3.281; to convert feet to metres, multiply by 0.3048.',
  },
  {
    q: 'How do I convert miles to kilometres?',
    a: 'Multiply miles by 1.609344, since one mile is exactly 1.609344 km. A 5-mile run is about 8.05 km. To convert kilometres to miles, divide by 1.609344 or multiply by roughly 0.621.',
  },
  {
    q: 'Are these conversions exact?',
    a: 'The relationships between imperial and metric units are defined exactly — an inch is exactly 2.54 cm, a mile exactly 1609.344 m — so the conversions are precise. Any rounding you see is only in how the result is displayed, not in the underlying calculation.',
  },
  {
    q: 'What is the difference between metric and imperial length units?',
    a: 'Metric units (mm, cm, m, km) are based on powers of ten, so converting between them just moves the decimal point. Imperial units (inches, feet, yards, miles) use different multipliers — 12 inches to a foot, 3 feet to a yard, 1,760 yards to a mile — which is why a converter is handy.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the length converter</h2>
          <p>
            Enter a value and choose the unit it is in. The converter instantly shows the equivalent
            in every other supported unit — millimetres, centimetres, metres, kilometres, inches,
            feet, yards, and miles — so you never have to convert one pair at a time. Everything runs
            in your browser.
          </p>

          <h2>Metric and imperial in one place</h2>
          <p>
            Length is one of the most common things people need to convert, whether reading a recipe,
            following an overseas measurement, sizing furniture, or planning a run. Because this tool
            shows all units together, it bridges metric and imperial in a single glance rather than
            forcing you to pick a specific conversion direction. Switch the source unit and the whole
            list updates.
          </p>

          <h2>Exact by design</h2>
          <p>
            All the conversions here rest on exact, internationally agreed definitions: an inch is
            exactly 2.54 centimetres, a foot exactly 0.3048 metres, and a mile exactly 1,609.344
            metres. That means the results are precise, with any rounding appearing only in the
            displayed figure. For very large or very small values the converter switches to scientific
            notation so the answer stays readable. Nothing you enter is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
