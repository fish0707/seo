import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'weight-converter')!

export const metadata: Metadata = {
  title: 'Weight Converter — kg, lb, oz, g, Stone',
  description:
    'Free weight converter. Convert between milligrams, grams, kilograms, ounces, pounds, and stones instantly, with every unit shown at once.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Weight Converter — kg, lb, oz, g, Stone',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I convert kilograms to pounds?',
    a: 'Multiply the kilograms by 2.20462, since one kilogram equals 2.20462 pounds. So 70 kg × 2.20462 = 154.3 lb. To convert pounds to kilograms, divide by 2.20462 or multiply by 0.453592.',
  },
  {
    q: 'How many grams are in an ounce?',
    a: 'One ounce is exactly 28.349523125 grams. For everyday use, 28.35 g is close enough. To convert ounces to grams multiply by 28.35; to convert grams to ounces divide by 28.35.',
  },
  {
    q: 'What is a stone in kilograms?',
    a: 'One stone equals 14 pounds, which is about 6.35 kilograms. Stones are still commonly used for body weight in the UK and Ireland. To convert stones to kilograms, multiply by 6.35029.',
  },
  {
    q: 'What is the difference between mass and weight?',
    a: 'In physics, mass is the amount of matter (measured in grams or kilograms) and weight is the force of gravity on that mass. In everyday language the two are used interchangeably, and this converter follows that everyday usage — the units here all measure mass.',
  },
  {
    q: 'Are these weight conversions exact?',
    a: 'Yes. A pound is defined as exactly 453.59237 grams and an ounce as exactly 28.349523125 grams, so the conversions are precise. Any rounding you see is only in how the result is displayed, not in the calculation itself.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the weight converter</h2>
          <p>
            Enter a value and pick the unit it is in. The converter immediately shows the equivalent
            in every other supported unit — milligrams, grams, kilograms, ounces, pounds, and stones
            — so you can read across metric and imperial at a glance. Everything runs in your browser.
          </p>

          <h2>Metric and imperial together</h2>
          <p>
            Weight conversions come up constantly: following a recipe from another country, reading a
            body weight in a different system, checking a shipping limit, or logging gym progress.
            Because this tool shows all units at once, you never have to choose a single conversion
            direction — change the source unit and the entire list recalculates instantly.
          </p>

          <h2>Exact and reliable</h2>
          <p>
            The conversions rest on exact international definitions: a pound is exactly 453.59237
            grams, an ounce exactly 28.349523125 grams, and a stone exactly 14 pounds. That makes the
            results precise, with rounding appearing only in the displayed number. For very large or
            very small values the converter switches to scientific notation so the answer stays
            readable. Nothing you enter is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
