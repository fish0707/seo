import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'mortgage-calculator')!

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment with Tax & Insurance',
  description:
    'Free mortgage calculator. Estimate your monthly home payment from price, down payment, rate, and term, including property tax and home insurance.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Mortgage Calculator — Monthly Payment with Tax & Insurance',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is a monthly mortgage payment calculated?',
    a: 'The principal and interest portion uses the amortization formula on the loan amount (home price minus down payment): payment = P × i ÷ (1 − (1 + i)⁻ⁿ), where i is the monthly rate and n is the number of months. Property tax and insurance are added on top, divided into monthly amounts.',
  },
  {
    q: 'What does PITI mean?',
    a: 'PITI stands for Principal, Interest, Taxes, and Insurance — the four parts of a typical monthly mortgage payment. Many buyers only estimate principal and interest and are surprised by the true monthly cost, which is why this calculator includes tax and insurance.',
  },
  {
    q: 'How much should my down payment be?',
    a: 'A larger down payment reduces the loan amount and therefore your monthly payment and total interest. In many markets 20% is a common benchmark because it can avoid mortgage insurance, but requirements vary. Try different down payment amounts to see the effect on your payment.',
  },
  {
    q: 'Why is the total payment higher than principal and interest?',
    a: 'Because a home costs more than just the loan. Property taxes and homeowners insurance are ongoing costs usually collected monthly alongside the loan payment. Depending on your location and loan, there may also be mortgage insurance and HOA fees, which this calculator does not include.',
  },
  {
    q: 'Does a shorter term save money?',
    a: 'Yes, substantially. A 15-year mortgage has higher monthly payments than a 30-year one but far lower total interest, because you borrow the money for half as long. Compare terms in the calculator to see the trade-off between monthly affordability and lifetime cost.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the mortgage calculator</h2>
          <p>
            Enter the home price, your down payment, the interest rate, and the loan term. Optionally
            add your annual property tax and home insurance to see a fuller monthly figure. The
            calculator breaks the payment into principal and interest, tax, and insurance, and shows
            the loan amount you would actually borrow.
          </p>

          <h2>See the real monthly cost, not just the loan</h2>
          <p>
            The most common budgeting mistake homebuyers make is estimating only the principal and
            interest and forgetting the extras. Property taxes and insurance can add a meaningful
            amount to the monthly payment, and lenders usually collect them together with the loan in
            an escrow account. Including them here gives you a number much closer to what will
            actually leave your account each month.
          </p>

          <h2>Test the levers before you commit</h2>
          <p>
            Because the result updates instantly, use the calculator to explore how each input moves
            your payment. A larger down payment shrinks the loan and the monthly cost; a lower rate or
            shorter term changes the total interest dramatically. Trying a few combinations helps you
            find a payment that fits your budget while keeping the lifetime cost sensible. These are
            estimates for planning — your lender&rsquo;s official quote, including any mortgage
            insurance or fees, is the binding figure.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
