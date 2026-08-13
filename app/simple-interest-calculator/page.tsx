import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'simple-interest-calculator')!

export const metadata: Metadata = {
  title: 'Simple Interest Calculator — Interest & Total Amount',
  description:
    'Free simple interest calculator. Enter a principal, annual rate, and time to get the interest and total amount, with the I = P × r × t formula shown.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Simple Interest Calculator — Interest & Total Amount',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'What is the simple interest formula?',
    a: 'Simple interest is I = P × r × t, where P is the principal, r is the annual interest rate as a decimal, and t is the time in years. For example, $10,000 at 5% for 3 years earns 10,000 × 0.05 × 3 = $1,500 in interest.',
  },
  {
    q: 'What is the difference between simple and compound interest?',
    a: 'Simple interest is calculated only on the original principal, so it grows in a straight line. Compound interest is calculated on the principal plus previously earned interest, so it grows faster over time. For the same rate and period, compound interest always yields more.',
  },
  {
    q: 'When is simple interest used?',
    a: 'Simple interest is common on some short-term and personal loans, car loans, and certain bonds, where interest does not compound. It is also used in many textbook problems. Savings accounts and most long-term investments use compound interest instead.',
  },
  {
    q: 'How do I calculate the total amount owed or earned?',
    a: 'Add the interest to the principal: total = P + (P × r × t). Using the earlier example, $10,000 principal plus $1,500 interest gives a total of $11,500. The calculator shows both the interest and this total.',
  },
  {
    q: 'How do I find the interest for months instead of years?',
    a: 'Convert the months to a fraction of a year and enter that as the time. Six months is 0.5 years, three months is 0.25 years, and so on. Because simple interest is proportional to time, this scales the result correctly.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>The gap between simple and compound</h2>
          <p>
            Simple interest is charged only on the original principal, so it grows in a straight
            line. Compound interest is charged on the balance including interest already earned, so
            it curves upward. Over short periods the difference is negligible; over long ones it is
            enormous.
          </p>
          <p>
            On $10,000 at 5%, simple interest yields $500 every year without fail — $2,500 after five
            years, $5,000 after ten. Compound interest yields $2,763 after five years and $6,289
            after ten. By year thirty the gap has widened to $15,000 versus $33,219, more than
            double.
          </p>
          <p>
            Which one applies to you is not a preference — it is written into the agreement. Many
            personal and car loans use simple interest; savings accounts, credit card balances, and
            most investments compound. Check which before assuming.
          </p>

          <h2>Running the calculation</h2>
          <p>
            Enter the principal, the annual interest rate, and the time in years. The calculator
            returns the interest earned or owed and the total amount, using the simple interest
            formula I = P × r × t. For a period in months, enter the equivalent fraction of a year.
            Everything runs in your browser.
          </p>

          <h2>Interest that grows in a straight line</h2>
          <p>
            Simple interest is the most straightforward way interest can accrue: it applies only to
            the original principal, never to interest already earned. That makes it easy to predict —
            the amount added each year is the same — and it is why many short-term and personal loans
            use it. Understanding simple interest is also the foundation for grasping how compound
            interest differs.
          </p>

          <h2>Simple versus compound</h2>
          <p>
            The key contrast is what the interest is charged on. Simple interest stays tied to the
            principal, while compound interest is added to the balance and then earns interest itself.
            Over a year or two the gap is small, but over long periods compounding pulls far ahead. If
            you are looking at a savings account or a long-term investment, our compound interest
            calculator is the better fit; for a fixed short-term loan, this simple interest tool is
            what you want. Nothing you enter is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
