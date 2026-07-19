import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'tip-calculator')!

export const metadata: Metadata = {
  title: 'Tip Calculator — Gratuity & Split the Bill',
  description:
    'Free tip calculator. Enter the bill, pick a tip percentage, and split the total between any number of people. Optional round-up for a clean total.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Tip Calculator — Gratuity & Split the Bill',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate a tip?',
    a: 'Multiply the bill by the tip percentage and divide by 100: tip = bill × (percent ÷ 100). A 20% tip on a $64 bill is 64 × 0.20 = $12.80, making the total $76.80. This calculator does it instantly and can also split the total.',
  },
  {
    q: 'How much should I tip?',
    a: 'In the United States, 15–20% of the pre-tax bill is standard for sit-down restaurant service, with 18% a common default and more for exceptional service. Norms vary widely by country and by service type, so treat these figures as a guide rather than a rule.',
  },
  {
    q: 'Should I tip on the pre-tax or post-tax amount?',
    a: 'Tipping on the pre-tax subtotal is the traditional approach, since the tax is not part of the service. Tipping on the post-tax total is also common and only adds a small amount. Either is acceptable — enter whichever bill figure you prefer into the calculator.',
  },
  {
    q: 'How does splitting the bill work?',
    a: 'The calculator adds the tip to the bill and divides the total by the number of people, so everyone pays an equal share including their portion of the tip. Enter the number of diners and the per-person amount updates automatically.',
  },
  {
    q: 'What does the round-up option do?',
    a: 'Rounding up raises the final total to the next whole currency unit and recalculates the tip to match, so you end on a clean number that is easy to pay in cash. The tip shown then reflects the rounded total rather than the exact percentage.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the tip calculator</h2>
          <p>
            Enter your bill amount, choose a tip percentage with the preset buttons or the slider,
            and optionally set how many people are splitting the bill. The tip, the total, and the
            amount each person owes update instantly. Turning on round-up gives you a clean total
            that is easy to settle in cash.
          </p>

          <h2>Tipping without the mental math</h2>
          <p>
            Working out a percentage of an odd bill total in your head is exactly the kind of small
            friction this tool removes. Pick the percentage you intend to leave and the calculator
            handles the arithmetic, including the awkward part — dividing an uneven total across a
            group so nobody underpays or overpays.
          </p>

          <h2>A quick note on tipping norms</h2>
          <p>
            Expected tipping varies enormously around the world. In some countries a service charge
            is already included and additional tipping is optional; in others tipping is not
            customary at all. When you travel, check local expectations rather than applying a single
            percentage everywhere. This calculator simply does the maths for whatever percentage you
            decide is appropriate.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
