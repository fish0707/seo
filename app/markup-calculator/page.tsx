import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'markup-calculator')!

export const metadata: Metadata = {
  title: 'Markup Calculator — Selling Price, Profit & Margin',
  description:
    'Free markup calculator. Enter a cost and markup percentage to get the selling price, profit, and profit margin — and see how markup differs from margin.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Markup Calculator — Selling Price, Profit & Margin',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate markup?',
    a: 'Markup is the percentage added to the cost to set the selling price: selling price = cost × (1 + markup ÷ 100). A 50% markup on a $40 item gives 40 × 1.5 = $60, a $20 profit. Markup is measured against cost.',
  },
  {
    q: 'What is the difference between markup and margin?',
    a: 'Markup is profit as a percentage of cost; margin is profit as a percentage of the selling price. The same $20 profit on a $40 cost and $60 price is a 50% markup but only a 33.3% margin. They describe the same sale from two different bases, which is why they are often confused.',
  },
  {
    q: 'How do I convert markup to margin?',
    a: 'Divide the markup by one plus the markup: margin = markup ÷ (1 + markup), using decimals. A 50% markup is 0.5 ÷ 1.5 = 0.333, or a 33.3% margin. This calculator shows both figures so you do not have to convert manually.',
  },
  {
    q: 'What markup should I use?',
    a: 'It depends on your industry, costs, and competition. Retail markups often range from 50% to 100% or more, while high-volume goods may use much less. The right level covers your overheads and target profit while staying competitive. Test different percentages to see the effect on price and margin.',
  },
  {
    q: 'Why does margin never reach 100%?',
    a: 'Because margin is measured against the selling price, and the cost is always part of that price. You can have a markup of 200% or 500%, but margin approaches 100% only as cost approaches zero. This is the key reason markup figures look larger than margin figures for the same sale.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the markup calculator</h2>
          <p>
            Enter your cost and the markup percentage you want to apply. The calculator returns the
            selling price, the profit in currency, and the resulting profit margin. Because it shows
            both markup and margin, you can price an item and immediately see how much of the sale is
            actually profit. Everything runs in your browser.
          </p>

          <h2>Markup and margin are not the same</h2>
          <p>
            This is the single most common pricing mistake. Markup is calculated from your cost, while
            margin is calculated from your selling price, so the same sale produces two different
            percentages. A 50% markup sounds like a 50% margin, but it is really only about 33%. If
            you set prices using a markup but think in terms of margin, you can badly underestimate
            what you keep — which is exactly why this tool shows both.
          </p>

          <h2>Pricing with confidence</h2>
          <p>
            Good pricing starts with knowing your true cost and the profit you need after overheads.
            From there you can test markup percentages and watch the selling price and margin respond
            in real time. That makes it easy to find a price that is competitive yet still leaves the
            margin your business needs. For working out discounts on the finished price, pair this with
            our discount calculator. Nothing you enter is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
