import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { RefTable } from '@/components/content'
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
  {
    q: 'Should I tip on a discounted bill?',
    a: 'The usual convention is to tip on what the bill would have been before the discount or voucher. The server did the same work either way, and a 20% tip on a half-price meal is effectively a 10% tip on the service provided.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>What each percentage actually costs</h2>
          <p>
            Tipping decisions get made in a few seconds at a table, usually without a clear sense of
            the difference between the options. On a typical restaurant bill the gap between the
            standard tiers is smaller than people expect:
          </p>

          <RefTable
            caption="Tip and total on a $64 bill"
            head={['Tip %', 'Tip', 'Total', 'Split 4 ways']}
            rows={[
              ['15%', '$9.60', '$73.60', '$18.40'],
              ['18%', '$11.52', '$75.52', '$18.88'],
              ['20%', '$12.80', '$76.80', '$19.20'],
              ['25%', '$16.00', '$80.00', '$20.00'],
            ]}
          />

          <p>
            Moving from 15% to 20% costs $3.20 on this bill — about 80 cents per person in a group of
            four. Framed that way the decision is usually easier to make quickly.
          </p>

          <h2>The mental shortcut for 20%</h2>
          <p>
            If you want to check the calculator or you are somewhere without a phone, 20% has an easy
            trick: move the decimal point one place left to get 10%, then double it. On a $64 bill,
            10% is $6.40, so 20% is $12.80. For 15%, take that same 10% and add half of it again —
            $6.40 plus $3.20 gives $9.60. Both work in a couple of seconds and are exact, not
            approximations.
          </p>

          <h2>Pre-tax or post-tax, and the rounding question</h2>
          <p>
            Tipping on the pre-tax subtotal is the traditional convention, since the tax is not part
            of the service you received. Tipping on the post-tax total is also widely accepted and
            costs only marginally more. Either is defensible — just enter whichever figure you have
            decided to work from.
          </p>
          <p>
            The round-up option raises the final total to the next whole currency unit and recomputes
            the tip to match, which is convenient when settling in cash. Note that this means the
            effective percentage drifts slightly from what you selected — usually upward, since it
            rounds up rather than to the nearest.
          </p>

          <h2>Tipping is not universal</h2>
          <p>
            Expectations vary enormously by country. Parts of Europe include a service charge and
            treat additional tipping as optional rounding; in Japan and South Korea tipping is not
            customary and can even cause confusion. The 15–20% convention this calculator&rsquo;s
            presets reflect is specifically a North American norm. When travelling, check local
            practice rather than exporting a percentage — the tool will happily compute whatever
            figure is appropriate where you are.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
