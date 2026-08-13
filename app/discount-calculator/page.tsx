import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { RefTable, WorkedExample } from '@/components/content'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'discount-calculator')!

export const metadata: Metadata = {
  title: 'Discount Calculator — Sale Price & Money Saved',
  description:
    'Free discount calculator. Enter a price and a percentage off to get the sale price and how much you save. Stack a second discount to see the true effective total.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Discount Calculator — Sale Price & Money Saved',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate a discount?',
    a: 'Multiply the price by the discount percentage divided by 100 to get the amount off, then subtract it from the price: sale price = price × (1 − percent ÷ 100). A 30% discount on a $89 item gives 89 × 0.70 = $62.30, saving $26.70.',
  },
  {
    q: 'How do stacked discounts work?',
    a: 'Two discounts applied one after another multiply rather than add. A 30% discount followed by an extra 10% is not 40% off — the second discount applies to the already-reduced price. 30% then 10% off $89 gives $62.30, then $56.07, an effective discount of about 37%.',
  },
  {
    q: 'Why is 30% plus 10% not 40% off?',
    a: 'Because the second percentage is taken from a smaller base. After the first 30% off, only 70% of the price remains, and the 10% comes off that 70%, not the original. The combined effect is 0.70 × 0.90 = 0.63, meaning 37% off in total, not 40%.',
  },
  {
    q: 'What is the "effective discount"?',
    a: 'It is the single percentage that would produce the same final price as your combined discounts. The calculator works it out as money saved divided by the original price, times 100. It lets you compare a stacked offer against a straight single discount at a glance.',
  },
  {
    q: 'How do I work out the original price from a sale price?',
    a: 'Divide the sale price by one minus the discount as a decimal: original = sale ÷ (1 − percent ÷ 100). If an item is $62.30 after 30% off, the original was 62.30 ÷ 0.70 = $89. This reverses the discount calculation.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>&ldquo;30% off plus an extra 10%&rdquo; is not 40% off</h2>
          <p>
            This is the single most profitable piece of arithmetic in retail. Two discounts applied
            one after another multiply — they do not add — because the second one is taken from a
            price that has already shrunk.
          </p>

          <WorkedExample
            title="A $89 jacket at 30% off, then a further 10% at checkout"
            steps={[
              { label: 'After the first 30%', value: '89 × 0.70 = $62.30' },
              { label: 'After the further 10%', value: '62.30 × 0.90 = $56.07' },
              { label: 'Total saved', value: '$32.93' },
            ]}
            result="Effective discount: 37%, not 40%"
          />

          <p>
            The three-point gap sounds trivial, but it is the entire reason the offer is structured
            that way. &ldquo;30% plus 10%&rdquo; reads as a bigger number than &ldquo;37% off&rdquo;
            while costing the retailer less. Here is how common stacked pairs really land:
          </p>

          <RefTable
            head={['Advertised', 'Sounds like', 'Actually']}
            rows={[
              ['20% + 10%', '30% off', '28% off'],
              ['30% + 10%', '40% off', '37% off'],
              ['40% + 20%', '60% off', '52% off'],
              ['50% + 25%', '75% off', '62.5% off'],
            ]}
          />

          <p>
            The bigger the discounts, the wider the gap. At the extreme, stacking can never reach
            100% — each cut only ever removes a fraction of what is left.
          </p>

          <h2>Recovering the original price</h2>
          <p>
            Working backwards catches inflated &ldquo;was&rdquo; prices. If something is $62.30 after
            30% off, do not add 30% back — that gives $80.99 and is wrong, because the discount was
            calculated from the original, not the sale price. Instead divide by what remains: 62.30 ÷
            0.70 = $89. If the tag claims the original was $120, the maths says otherwise.
          </p>

          <h2>Does the order of the discounts matter?</h2>
          <p>
            No. Multiplication is commutative, so 30% then 10% gives exactly the same final price as
            10% then 30% — both are 0.63 of the original. If a cashier applies your coupons in a
            different order than you expected, the total is unaffected. The one exception is when a
            store caps a coupon at a maximum value, in which case applying it to the larger amount
            first can matter.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
