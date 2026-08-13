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
          <h2>A percentage without a timeframe is meaningless</h2>
          <p>
            &ldquo;I made 50% on that&rdquo; tells you almost nothing on its own. Over one year it is
            an exceptional result. Over ten years it is 4.1% annually — worse than leaving the money
            in a decent savings account.
          </p>
          <p>
            That is why this calculator asks for a holding period. Total ROI answers &ldquo;how much
            did I make?&rdquo;; the annualised figure answers &ldquo;was it worth it?&rdquo;, and only
            the second lets you compare a quick flip against a long hold on equal terms.
          </p>

          <h2>Entering the numbers</h2>
          <p>
            Enter the amount you invested and the final value it reached. The calculator shows your
            total return on investment as a percentage and your net profit in currency. Add an
            optional holding period in years to also see the annualized return, which puts investments
            of different lengths on a comparable footing.
          </p>

          <h2>Making the numbers honest</h2>
          <p>
            The quality of an ROI figure depends on what you feed it. To avoid flattering yourself,
            fold buying costs and fees into the amount invested, and use the money you actually walked
            away with — after tax — as the final value. Done that way, ROI becomes a reliable yardstick
            for comparing opportunities rather than a number that only looks good on paper. All
            calculations run in your browser and nothing is stored.
          </p>

          <h2>What ROI leaves out</h2>
          <p>
            Return on investment is a ratio, and ratios discard scale. A 200% return on $50 is $100;
            a 12% return on $500,000 is $60,000. The first number looks better and the second pays
            the mortgage. When comparing opportunities, read the percentage alongside the absolute
            profit rather than instead of it.
          </p>
          <p>
            It also says nothing about risk or about what you gave up elsewhere. A high return earned
            by concentrating everything in one position is not equivalent to the same return earned
            across a diversified holding, even though ROI scores them identically.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
