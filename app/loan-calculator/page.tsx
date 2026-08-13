import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { RefTable, Note } from '@/components/content'
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
  {
    q: 'Can I pay a loan off early?',
    a: 'Usually yes, but check for prepayment penalties before you commit — some fixed-rate agreements charge a fee for settling early, which can cancel out the interest you save. Where overpayments are allowed, ask the lender to apply them to the principal rather than to future scheduled payments, otherwise the balance does not shrink and neither does the interest.',
  },
  {
    q: 'Does a longer term ever make sense?',
    a: 'It can, when the lower monthly payment is what keeps the loan affordable or leaves cash free for something earning more than the interest rate costs. Treat it as buying breathing room rather than saving money, and if your circumstances improve, overpaying converts a long term back into a short one without needing to refinance.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>The trade-off nobody shows you at the counter</h2>
          <p>
            Lenders quote the monthly payment because it is the number that decides whether you say
            yes. It is also the number that hides the cost. Stretching a loan over more years shrinks
            every payment while quietly increasing the total, because interest keeps accruing for all
            those extra months.
          </p>
          <p>
            Here is the same $20,000 borrowed at 6.5%, changing nothing but the term:
          </p>

          <RefTable
            head={['Term', 'Monthly payment', 'Total interest', 'Total repaid']}
            rows={[
              ['3 years', '$612.98', '$2,067', '$22,067'],
              ['5 years', '$391.32', '$3,479', '$23,479'],
              ['7 years', '$296.99', '$4,947', '$24,947'],
              ['10 years', '$227.10', '$7,252', '$27,252'],
            ]}
          />

          <p>
            Going from three years to ten cuts the monthly payment by about 63% — and more than
            triples the interest. Neither column is the &ldquo;right&rdquo; answer on its own. The
            short term is cheaper; the long term is survivable month to month. What matters is that
            you choose with both numbers in front of you, which is exactly what the calculator above
            puts there.
          </p>

          <h2>Where the money goes early on</h2>
          <p>
            Fixed-rate loans are amortised, which means every payment is identical but its split
            changes. Interest is charged on the outstanding balance, so at the start — when you owe
            the most — the majority of your payment is interest and only a sliver reduces the debt.
            As the balance falls, that ratio flips. On a 30-year mortgage it can take well over a
            decade before principal outweighs interest in a given payment.
          </p>
          <p>
            This is why overpaying early is disproportionately powerful. An extra payment in year one
            removes principal that would otherwise have accrued interest for the entire remaining
            term; the same payment in the final year saves almost nothing. If your loan permits
            penalty-free overpayments, the first years are where they buy the most.
          </p>

          <Note>
            The figures here assume a fixed rate and no fees. Compare lenders on APR rather than the
            headline interest rate, since APR folds in certain charges and is the closer proxy for
            what the loan actually costs you.
          </Note>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
