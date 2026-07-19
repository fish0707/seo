import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'percentage-calculator')!

export const metadata: Metadata = {
  title: 'Percentage Calculator — % of a Number & Percent Change',
  description:
    'Free percentage calculator with three modes: find X% of a number, work out what percent X is of Y, and calculate percentage increase or decrease between two values.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Percentage Calculator — % of a Number & Percent Change',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate a percentage of a number?',
    a: 'Divide the percentage by 100, then multiply by the number: X% of Y = (X ÷ 100) × Y. For example, 25% of 200 is (25 ÷ 100) × 200 = 50. This is the calculation behind discounts, tips, and tax.',
  },
  {
    q: 'How do I work out what percent one number is of another?',
    a: 'Divide the part by the whole and multiply by 100: (X ÷ Y) × 100. For example, 30 out of 120 is (30 ÷ 120) × 100 = 25%. This is how test scores and completion rates are calculated.',
  },
  {
    q: 'How is percentage change calculated?',
    a: 'Subtract the original value from the new value, divide by the original value, then multiply by 100: ((new − original) ÷ original) × 100. Going from 80 to 100 is a +25% change; going from 100 to 80 is −20%. The two directions differ because the starting base differs.',
  },
  {
    q: 'Why is a 50% increase not cancelled out by a 50% decrease?',
    a: 'Because each step uses a different base. Increasing 100 by 50% gives 150, but decreasing 150 by 50% gives 75, not 100. Percentage changes multiply rather than add, which is a common trap in sales figures and investment returns.',
  },
  {
    q: 'What is the difference between percentage points and percent?',
    a: 'Percentage points measure the absolute gap between two percentages, while percent measures the relative change. If an interest rate rises from 2% to 3%, that is an increase of 1 percentage point but a 50% relative increase.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the percentage calculator</h2>
          <p>
            Pick the question you need to answer, enter your two numbers, and the result appears
            instantly. The three modes cover almost every everyday percentage problem:
          </p>
          <p>
            <strong>What is X% of Y?</strong> — the classic discount and tip question. A 15% tip on
            a $64 bill, a 30% discount on a $89 jacket, or 8% sales tax on a purchase all use this
            mode.
          </p>
          <p>
            <strong>X is what percent of Y?</strong> — turns a fraction into a percentage. Scoring
            42 out of 60 on a test, finishing 7 of 20 tasks, or comparing a part to its whole all
            fit here.
          </p>
          <p>
            <strong>Percentage change</strong> — measures growth or decline between two values:
            price changes, salary raises, follower growth, or year-over-year sales.
          </p>

          <h2>The three formulas</h2>
          <p>
            All percentage math reduces to three formulas. Percentage of a number: (X ÷ 100) × Y.
            Part as a percentage of a whole: (X ÷ Y) × 100. Percentage change: ((new − original) ÷
            original) × 100. Keeping the base straight — which number you divide by — is the key to
            getting the right answer.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
