import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { RefTable, KeyNumbers } from '@/components/content'
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
  {
    q: 'Does inflation affect these projections?',
    a: 'Yes, and the calculator does not adjust for it. A balance of $100,000 in thirty years will not buy what $100,000 buys today. To see the result in today\'s purchasing power, subtract your expected inflation rate from your return rate and use that lower figure — a 7% return with 3% inflation is roughly a 4% real return.',
  },
  {
    q: 'What return rate should I assume?',
    a: 'Be conservative rather than hopeful. Savings accounts and bonds generally sit low; diversified stock market investments have historically averaged higher over long periods but with real losses along the way. Whatever figure you pick, remember this tool draws a smooth curve while actual returns arrive unevenly.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Time does more work than the rate</h2>
          <p>
            People shop hard for a better interest rate and treat the timeline as fixed. The maths
            says that is backwards. Here is $10,000 at 7%, compounded monthly, with nothing added:
          </p>

          <RefTable
            head={['Years invested', 'Final value', 'Interest earned']}
            rows={[
              ['5 years', '$14,176', '$4,176'],
              ['10 years', '$20,097', '$10,097'],
              ['20 years', '$40,387', '$30,387'],
              ['30 years', '$81,165', '$71,165'],
              ['40 years', '$163,114', '$153,114'],
            ]}
          />

          <p>
            Doubling the time from 20 to 40 years does not double the result — it quadruples it. The
            first decade produces $10,097 of interest; the fourth decade alone produces over $80,000.
            Nothing about the rate changed. This is why the most valuable thing an investor has is
            rarely the return they picked, and almost always the years they left it alone.
          </p>

          <h2>The rule of 72</h2>
          <p>
            A shortcut worth memorising: divide 72 by the annual percentage rate to estimate how many
            years the money takes to double.
          </p>

          <KeyNumbers
            items={[
              { value: '24 yrs', label: 'to double at 3%' },
              { value: '14.4 yrs', label: 'to double at 5%' },
              { value: '10.3 yrs', label: 'to double at 7%' },
              { value: '7.2 yrs', label: 'to double at 10%' },
            ]}
          />

          <p>
            It is an approximation, but an accurate one between about 4% and 12%, and it makes the
            cost of a lower rate concrete. The gap between 5% and 7% does not look like much until
            you notice it is the difference between doubling four times and doubling three times over
            forty years.
          </p>

          <h2>Where compounding frequency actually matters</h2>
          <p>
            Monthly compounding beats annual, but by far less than most people assume. On $10,000 at
            7% over 30 years, annual compounding yields $76,123 while monthly yields $81,165 — a
            difference of about 6.6% after three decades. Moving from monthly to daily compounding
            adds only a further $480 across those same thirty years.
          </p>
          <p>
            The practical takeaway: do not agonise over frequency when comparing accounts. The rate
            and the number of years each swamp it by an order of magnitude.
          </p>

          <h2>What regular contributions change</h2>
          <p>
            A lump sum has one compounding journey. Adding money monthly starts a new journey with
            every deposit, and the earliest deposits have the longest runway — which is why steady
            contributions started early usually beat a larger sum invested late. The calculator
            separates what you put in from what the interest produced, so you can see precisely how
            much of the final balance was your own money.
          </p>
          <p>
            One caveat worth stating plainly: these are projections at a constant rate. Real
            investments do not deliver 7% every year — they deliver 20% one year and −12% the next.
            The long-run averages tend to hold, but the path is never the smooth curve a calculator
            draws.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
