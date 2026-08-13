import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { WorkedExample, Pitfalls } from '@/components/content'
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
  {
    q: 'How do I add a percentage to a number?',
    a: 'Multiply by one plus the percentage as a decimal. Adding 15% to 200 is 200 × 1.15 = 230. Doing it in two steps — find 15%, then add it on — gives the same answer but takes longer and invites arithmetic slips.',
  },
  {
    q: 'What does \'percent of a percent\' mean?',
    a: 'It means multiplying two percentages together. If 40% of customers open an email and 25% of those click a link, the share of all customers who click is 0.40 × 0.25 = 0.10, or 10%. Conversion funnels compound this way at every stage, which is why multi-step funnels shed volume so quickly.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Three questions, three formulas</h2>
          <p>
            Nearly every percentage problem is one of three questions in disguise. The hard part is
            never the arithmetic — it is spotting which of the three you are being asked, and which
            number is the base you divide by.
          </p>

          <WorkedExample
            title="What is 15% of 64? — tips, tax, discounts"
            steps={[
              { label: 'Convert the percentage', value: '15 ÷ 100 = 0.15' },
              { label: 'Multiply by the number', value: '0.15 × 64' },
            ]}
            result="15% of 64 = 9.6"
          />

          <WorkedExample
            title="42 is what percent of 60? — scores, completion rates"
            steps={[
              { label: 'Divide part by whole', value: '42 ÷ 60 = 0.7' },
              { label: 'Multiply by 100', value: '0.7 × 100' },
            ]}
            result="42 is 70% of 60"
          />

          <WorkedExample
            title="From 80 to 100 — raises, growth, price changes"
            steps={[
              { label: 'Find the difference', value: '100 − 80 = 20' },
              { label: 'Divide by the original', value: '20 ÷ 80 = 0.25' },
              { label: 'Multiply by 100', value: '0.25 × 100' },
            ]}
            result="A 25% increase"
          />

          <h2>The traps that catch almost everyone</h2>
          <p>
            Percentages behave in ways that feel wrong until you have been burned once. These three
            account for most real-world mistakes:
          </p>

          <Pitfalls
            items={[
              {
                title: 'A 50% rise and a 50% fall do not cancel out',
                body: 'Add 50% to 100 and you get 150. Take 50% off 150 and you get 75, not 100. Each step measures against a different base, so percentage changes multiply rather than add. This is why a stock that halves needs to double — a 100% gain — just to break even.',
              },
              {
                title: 'Stacked discounts are smaller than their sum',
                body: '30% off followed by a further 10% off is not 40% off. The second cut applies to the already-reduced price, giving 0.70 × 0.90 = 0.63, or 37% off in total. Retailers rely on the sum sounding better than it is.',
              },
              {
                title: 'Percentage points are not percent',
                body: 'An interest rate moving from 2% to 3% has risen by one percentage point — but by 50% in relative terms. Both statements are true and they describe the same change. News headlines routinely pick whichever sounds more dramatic.',
              },
            ]}
          />

          <h2>Reversing a percentage</h2>
          <p>
            The question that trips people up most is working backwards: an item costs $62.30 after
            30% off, so what was the original price? The instinct is to add 30% back, which gives
            $80.99 — and is wrong. The 30% was taken from the original, not from the sale price.
          </p>
          <p>
            The correct move is to divide by what remains. After 30% off, 70% of the price is left,
            so the original is 62.30 ÷ 0.70 = $89. The same logic strips tax out of a gross figure or
            recovers a pre-raise salary. Whenever you need to undo a percentage, divide by one minus
            the rate rather than adding the rate back on.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
