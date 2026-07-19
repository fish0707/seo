import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
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
          <h2>How to use the discount calculator</h2>
          <p>
            Enter the original price and the percentage off, and the sale price and your savings
            appear instantly. If a store is running a second promotion — say an extra 10% at the
            checkout — add it in the second field to see the real final price and the true effective
            discount.
          </p>

          <h2>The trap with stacked discounts</h2>
          <p>
            Retailers often advertise offers like &ldquo;30% off, plus an extra 10% today only.&rdquo;
            It is natural to add those together and expect 40% off, but discounts applied in sequence
            multiply instead. The second discount only ever applies to what is left after the first,
            so the combined saving is always a little less than the sum. This calculator shows the
            genuine effective percentage so you know exactly what you are paying.
          </p>

          <h2>Working backwards</h2>
          <p>
            The same maths lets you check whether a &ldquo;sale&rdquo; price is really a bargain. If
            you know the final price and the advertised discount, divide the sale price by one minus
            the discount to recover the original — useful for spotting inflated &ldquo;was&rdquo;
            prices. Every figure here is computed in your browser and nothing you type is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
