import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'loan-calculator')!

export const metadata: Metadata = {
  title: 'Loan Calculator — Monthly Payment & Total Interest',
  description:
    'Free loan and mortgage calculator. Enter the amount, annual interest rate, and term to get your monthly payment, total interest, and total cost.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Loan Calculator — Monthly Payment & Total Interest',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is a monthly loan payment calculated?',
    a: 'Fixed-rate loans use the amortization formula: payment = P × i ÷ (1 − (1 + i)⁻ⁿ), where P is the loan amount, i is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments. It produces equal payments that fully repay the loan over the term.',
  },
  {
    q: 'What is amortization?',
    a: 'Amortization is the process of paying off a loan with regular equal payments. Early payments are mostly interest because the balance is high; as the balance falls, more of each payment goes to principal. The monthly amount stays the same throughout a fixed-rate loan.',
  },
  {
    q: 'How can I pay less interest overall?',
    a: 'Three levers reduce total interest: a shorter term, a lower interest rate, or a smaller amount borrowed. A shorter term raises the monthly payment but cuts total interest sharply. Making extra payments toward principal also shortens the loan and lowers the interest you pay.',
  },
  {
    q: 'Does this work for a mortgage or car loan?',
    a: 'Yes. Any fixed-rate installment loan — mortgage, car loan, personal loan, or student loan — uses the same formula. Enter the amount, the annual rate, and the term in years. Note that a real mortgage payment may also include property tax and insurance, which this tool does not add.',
  },
  {
    q: 'What is the difference between interest rate and APR?',
    a: 'The interest rate is the cost of borrowing the principal. The APR (annual percentage rate) also folds in certain fees, so it is usually slightly higher and gives a fuller picture of the loan cost. This calculator uses the interest rate; check the APR when comparing offers.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the loan calculator</h2>
          <p>
            Enter how much you want to borrow, the annual interest rate, and the term in years. The
            calculator returns your fixed monthly payment along with the total interest and the total
            amount you will have paid by the end of the loan. Everything is computed in your browser.
          </p>

          <h2>Why the total cost matters as much as the payment</h2>
          <p>
            It is easy to focus only on whether the monthly payment fits your budget, but the total
            interest tells the real story. Stretching a loan over a longer term lowers each payment
            yet can dramatically increase what you pay overall, because interest accrues for more
            months. Comparing the total-interest figure across different terms is often more
            revealing than comparing the monthly amounts.
          </p>

          <h2>Trying different scenarios</h2>
          <p>
            Because the result updates instantly, this tool is well suited to what-if comparisons.
            Try the same amount over 3, 5, and 7 years, or compare two interest rates, and watch how
            the monthly payment and total interest move in opposite directions. That trade-off —
            lower payments versus lower total cost — is the central decision in any borrowing choice.
            The figures here are estimates for planning; your lender&rsquo;s official quote is the
            binding one.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
