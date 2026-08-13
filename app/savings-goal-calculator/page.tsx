import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'savings-goal-calculator')!

export const metadata: Metadata = {
  title: 'Savings Goal Calculator — How Much to Save Per Month',
  description:
    'Free savings goal calculator. Find out how much to save each month to hit a target by a set date, accounting for your starting balance and interest.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Savings Goal Calculator — How Much to Save Per Month',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I work out how much to save each month?',
    a: 'Subtract what you have already saved (grown by any interest) from your goal, then divide the remaining amount over the number of months, adjusting for interest earned along the way. This calculator does all of that and shows the monthly figure directly.',
  },
  {
    q: 'Does the interest rate really matter for short goals?',
    a: 'For a goal a year or two away, interest makes only a small difference, so a modest savings rate is fine. Over longer horizons the interest does more of the work, reducing how much you personally need to contribute each month. Enter your expected rate to see the effect.',
  },
  {
    q: 'What rate should I use?',
    a: 'Use a rate you can realistically earn on where the money will sit. A high-yield savings account might return a few percent; longer-term investments could be higher but carry risk and can fall in value. For a near-term goal, a conservative rate — or even zero — is the safest assumption.',
  },
  {
    q: 'What if I already have some savings?',
    a: 'Enter your current balance in the optional field. The calculator grows it at your chosen rate and subtracts the result from your goal, so you only need to save the shortfall. The more you start with, the smaller your required monthly contribution.',
  },
  {
    q: 'How can I reach my goal faster?',
    a: 'Three levers help: increase the monthly amount, extend the deadline, or earn a higher return. Increasing the monthly contribution is the most reliable because it is fully in your control, while a higher return adds risk. The calculator lets you test each by changing the inputs.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Working backwards from the goal</h2>
          <p>
            Most savings advice starts with what you can spare and hopes it adds up. This calculator
            runs the other direction: name the amount and the deadline, and it tells you the monthly
            figure that actually gets you there.
          </p>
          <p>
            The answer is often clarifying in an uncomfortable way. A $20,000 deposit in three years
            needs $556 a month with nothing saved and no interest. If that number is impossible, you
            have learned something concrete — either the timeline or the target has to move, and now
            you know by how much rather than discovering it eighteen months in.
          </p>

          <h2>What the inputs do</h2>
          <p>
            Enter your target amount and how many years you have to reach it. Optionally add what you
            have already saved and the annual return you expect to earn. The calculator tells you how
            much to set aside each month, and splits your final total into what you contribute versus
            what interest adds.
          </p>

          <h2>Turn a big number into a monthly habit</h2>
          <p>
            A large goal — a deposit, a wedding, an emergency fund — can feel daunting as a single
            figure. Breaking it into a fixed monthly amount makes it a manageable habit you can build
            into your budget. Seeing the exact number also lets you sanity-check whether the timeline
            is realistic, or whether you need to extend the deadline or trim the target.
          </p>

          <h2>Let compounding help</h2>
          <p>
            When your savings earn interest, that interest starts contributing toward the goal
            alongside you, so your required monthly amount drops. The effect is small over a year but
            grows with time, which is a good reason to start early and to keep longer-term savings
            somewhere that earns a reasonable return. For money you will need soon, favour safety over
            yield — a guaranteed lower rate beats a risky one that might fall right before your
            deadline. All calculations run in your browser and nothing is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
