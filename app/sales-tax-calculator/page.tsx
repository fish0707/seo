import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'sales-tax-calculator')!

export const metadata: Metadata = {
  title: 'Sales Tax Calculator — Add or Remove Tax from a Price',
  description:
    'Free sales tax calculator. Add tax to a pre-tax price to get the total, or work backwards from a tax-inclusive total to find the price and tax paid.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Sales Tax Calculator — Add or Remove Tax from a Price',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I add sales tax to a price?',
    a: 'Multiply the price by the tax rate divided by 100 to get the tax, then add it to the price: total = price × (1 + rate ÷ 100). An 8.25% tax on a $100 item is $8.25, for a total of $108.25.',
  },
  {
    q: 'How do I calculate the price before tax from a total?',
    a: 'Divide the tax-inclusive total by one plus the rate as a decimal: pre-tax = total ÷ (1 + rate ÷ 100). If a receipt shows $108.25 including 8.25% tax, the pre-tax price was 108.25 ÷ 1.0825 = $100. This is what the "remove tax" mode does.',
  },
  {
    q: 'Why can’t I just subtract the tax percentage from the total?',
    a: 'Because the tax percentage is applied to the pre-tax price, not to the total. Subtracting 8.25% from a tax-included total removes too little, since the base is larger. You must divide by 1 plus the rate to correctly reverse the tax.',
  },
  {
    q: 'Is sales tax the same everywhere?',
    a: 'No. Sales tax rates vary by country, state, county, and even city, and some places combine several rates. Certain goods may be taxed at a different rate or exempt entirely. Enter the exact combined rate that applies to your purchase for an accurate result.',
  },
  {
    q: 'What is the difference between sales tax and VAT?',
    a: 'Sales tax is added once at the final point of sale and is often shown separately from the price. VAT (value-added tax) is collected at each stage of production and is usually already included in the displayed price. The reverse mode of this calculator is handy for extracting VAT from a gross amount.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Removing tax is not the same as subtracting it</h2>
          <p>
            Adding tax is easy. Taking it back out is where the errors happen, because the percentage
            was never calculated from the total you are holding.
          </p>
          <p>
            A receipt shows $108.25 including 8.25% tax. Subtracting 8.25% from $108.25 gives $99.32
            — wrong by 68 cents. The tax was 8.25% of the $100 price, not of the $108.25 total. The
            correct operation is division: 108.25 ÷ 1.0825 = exactly $100.
          </p>
          <p>
            The error grows with the rate. On a £120 total at 20% VAT, subtracting gives £96 when the
            true net is £100 — an understatement of over 3% of the total. Across a year of expense
            claims that is a meaningful sum reported incorrectly.
          </p>

          <h2>Which mode to use</h2>
          <p>
            Pick a mode, enter your numbers, and the breakdown appears instantly. In &ldquo;add
            tax&rdquo; mode, enter the pre-tax price and the rate to get the tax and the final total.
            In &ldquo;remove tax&rdquo; mode, enter a tax-inclusive total and the rate to recover the
            original price and the tax portion.
          </p>

          <h2>Why the reverse calculation trips people up</h2>
          <p>
            Adding tax is straightforward, but going the other way is where mistakes happen. A common
            error is subtracting the tax percentage directly from the total — but the percentage was
            never taken from the total, it was taken from the smaller pre-tax price. The correct
            method is to divide the total by one plus the rate. This tool handles that automatically,
            which makes it useful for expense reports, VAT extraction, and checking receipts.
          </p>

          <h2>Getting the rate right</h2>
          <p>
            The accuracy of the result depends entirely on the rate you enter. In many places the
            headline rate is actually a combination of state, county, and city taxes, so use the
            total combined rate for your location rather than a single component. Everything is
            calculated in your browser and nothing you enter is stored or sent anywhere.
          </p>

          <h2>Getting the rate right</h2>
          <p>
            The accuracy of everything here depends on the rate you enter, and in many places the
            headline figure is a combination. A US sales tax rate can stack state, county, city, and
            special-district portions into a single number that differs street by street. Use the
            combined rate for the exact location of the sale, and remember that some categories —
            groceries, medicine, children's clothing — are often taxed differently or exempt.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
