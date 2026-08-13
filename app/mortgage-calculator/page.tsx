import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { WorkedExample, Note } from '@/components/content'
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
  {
    q: 'What is escrow?',
    a: 'An escrow account is where your lender holds the tax and insurance portion of each payment until those bills come due, then pays them on your behalf. It is why your monthly figure covers more than the loan, and why that figure can change from year to year even on a fixed-rate mortgage — the loan part stays fixed, but tax and insurance premiums move.',
  },
  {
    q: 'Why did my fixed-rate payment go up?',
    a: 'Almost always because the escrow portion changed, not the loan. A property reassessment or an insurance premium increase raises the amount your lender needs to collect, and the monthly payment is adjusted to match. The principal and interest component of a fixed-rate mortgage does not change.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Your payment is four things, not one</h2>
          <p>
            Lenders and property listings quote &ldquo;the mortgage,&rdquo; but the money that leaves
            your account each month is usually four separate costs bundled together. The industry
            shorthand is PITI:
          </p>

          <WorkedExample
            title="A $350,000 home, $70,000 down, 6.5% over 30 years"
            steps={[
              { label: 'Principal & interest', value: '$1,769.79' },
              { label: 'Property tax ($3,600/yr)', value: '$300.00' },
              { label: 'Home insurance ($1,200/yr)', value: '$100.00' },
            ]}
            result="Total monthly payment = $2,169.79"
          />

          <p>
            The loan itself accounts for about 82% of that figure. Budget only for principal and
            interest and you will be short by roughly $400 every month — which is precisely the gap
            that catches first-time buyers. Lenders normally collect tax and insurance into an escrow
            account alongside the loan payment, so the bundled figure is what you actually plan
            around.
          </p>

          <h2>Why the early years feel like standing still</h2>
          <p>
            Interest is charged on what you still owe, and at the start you owe nearly everything. On
            the loan above, the first payment splits roughly $1,517 to interest and just $253 to
            principal. After a full year of payments totalling over $21,000, the balance has dropped
            by only about $3,100.
          </p>
          <p>
            That ratio inverts slowly. On this loan it takes until year 19 before principal finally
            makes up the larger half of a payment. It also explains why overpaying early is
            so effective: money put in during year one erases principal that would otherwise have
            accrued interest for another 29 years, while the same sum in year 28 saves almost
            nothing.
          </p>

          <h2>Which lever to pull</h2>
          <p>
            Three inputs control the payment, and they do not work equally. A bigger down payment
            reduces the loan proportionally — the most direct lever, if you have the cash. A lower
            rate reduces the interest without touching the debt, which is why shopping lenders is
            worth real effort. A longer term reduces the monthly figure but raises lifetime cost
            sharply, so treat it as an affordability tool rather than a saving.
          </p>

          <Note>
            This calculator covers principal, interest, tax, and insurance. Depending on your loan and
            location you may also owe private mortgage insurance (common below a 20% down payment) or
            HOA fees, neither of which is included here. Your lender&rsquo;s formal quote is the
            binding figure.
          </Note>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
