import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'compound-interest-calculator')!

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Investment & Savings Growth',
  description:
    'Free compound interest calculator. See how a starting amount plus optional regular contributions grows over time at any compounding frequency.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Compound Interest Calculator — Investment & Savings Growth',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest earned on both your original amount and the interest already added to it. Because each period’s interest joins the balance and earns more interest itself, savings grow faster over time than they would with simple interest.',
  },
  {
    q: 'How is compound interest calculated?',
    a: 'The future value of a lump sum is A = P × (1 + r ÷ n)^(n × t), where P is the starting amount, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the number of years. Regular contributions are added using the future-value-of-a-series formula.',
  },
  {
    q: 'Does compounding frequency matter?',
    a: 'Yes, but less than people expect. More frequent compounding — monthly or daily instead of annually — increases the final amount slightly because interest is added and starts earning sooner. The rate and the time invested have a far larger effect than the frequency.',
  },
  {
    q: 'Why do regular contributions make such a big difference?',
    a: 'Each contribution you add has its own runway to compound. Money added early has the most years to grow, which is why starting sooner and contributing steadily usually beats investing a larger amount later. The calculator shows how much of the final total is contributions versus earned interest.',
  },
  {
    q: 'What is the rule of 72?',
    a: 'The rule of 72 is a shortcut for estimating how long an investment takes to double: divide 72 by the annual percentage rate. At 6% a year, money roughly doubles in 72 ÷ 6 = 12 years. It is an approximation, but a handy sanity check against the calculator.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the compound interest calculator</h2>
          <p>
            Enter your starting amount, the annual interest rate, and how many years you plan to
            invest. Choose how often interest compounds, and if you add money regularly, enter the
            contribution per period. The calculator shows the future value, how much you contributed
            in total, and how much of the growth came from interest alone.
          </p>

          <h2>Why compounding is called the eighth wonder</h2>
          <p>
            The power of compound interest is that growth builds on growth. In the early years the
            interest is modest, but because each year&rsquo;s gains are added to the balance and then
            earn their own interest, the curve steepens over time. Doubling the number of years
            usually far more than doubles the final amount — which is why time in the market is the
            single most valuable ingredient.
          </p>

          <h2>Contributions versus lump sums</h2>
          <p>
            A one-off deposit grows steadily, but adding a regular contribution changes the picture
            entirely. Each new contribution starts its own compounding journey, and the earliest ones
            have the longest to grow. The tool separates your total contributions from the interest
            earned so you can see exactly how much of your final balance the market did for you. These
            figures are projections at a constant rate; real returns vary year to year.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
