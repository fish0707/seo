import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'roi-calculator')!

export const metadata: Metadata = {
  title: 'ROI Calculator — Return on Investment & Annualized Return',
  description:
    'Free ROI calculator. Enter your cost and final value to get return on investment as a percentage and net profit, plus the annualized return over a holding period.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'ROI Calculator — Return on Investment & Annualized Return',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is ROI calculated?',
    a: 'Return on investment is the net profit divided by the cost, expressed as a percentage: ROI = (final value − cost) ÷ cost × 100. Turning $5,000 into $7,500 is a profit of $2,500 on $5,000, which is a 50% ROI.',
  },
  {
    q: 'What is a good ROI?',
    a: 'It depends entirely on the investment, the risk, and the time involved. A 50% ROI is excellent over one year but modest over ten. That is why ROI is most meaningful when compared against alternatives with similar risk and duration, and why the annualized figure matters.',
  },
  {
    q: 'What is annualized ROI and why does it matter?',
    a: 'Annualized ROI (also called CAGR) is the equivalent steady yearly return that would produce the same result over the holding period: (final ÷ cost)^(1 ÷ years) − 1. It lets you compare investments held for different lengths of time on an equal, per-year basis.',
  },
  {
    q: 'Why is a 50% total return not 50% per year?',
    a: 'Because returns compound. A 50% gain over three years is about 14.5% per year, not 16.7%, because each year’s growth builds on the previous year’s. Dividing the total return by the number of years overstates the yearly figure, so the annualized calculation uses a compounding formula instead.',
  },
  {
    q: 'Does ROI account for fees or taxes?',
    a: 'Only if you include them. For an accurate picture, add transaction costs and fees to your cost figure and use the after-tax proceeds as the final value. Basic ROI ignores these, so a headline number can look better than the return you actually keep.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the ROI calculator</h2>
          <p>
            Enter the amount you invested and the final value it reached. The calculator shows your
            total return on investment as a percentage and your net profit in currency. Add an
            optional holding period in years to also see the annualized return, which puts investments
            of different lengths on a comparable footing.
          </p>

          <h2>ROI is only half the story without time</h2>
          <p>
            Return on investment is the simplest way to judge whether something paid off, but a
            percentage alone hides how long it took. Doubling your money is spectacular in a year and
            unremarkable over twenty. That is why serious comparisons use the annualized figure: it
            converts any total return into an equivalent yearly rate, so you can line up a quick trade
            against a long-term holding and see which genuinely performed better.
          </p>

          <h2>Making the numbers honest</h2>
          <p>
            The quality of an ROI figure depends on what you feed it. To avoid flattering yourself,
            fold buying costs and fees into the amount invested, and use the money you actually walked
            away with — after tax — as the final value. Done that way, ROI becomes a reliable yardstick
            for comparing opportunities rather than a number that only looks good on paper. All
            calculations run in your browser and nothing is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
