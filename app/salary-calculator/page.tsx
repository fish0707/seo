import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'salary-calculator')!

export const metadata: Metadata = {
  title: 'Salary Calculator — Convert Hourly, Monthly & Annual Pay',
  description:
    'Free salary calculator. Convert pay between hourly, daily, weekly, monthly, and annual amounts using your hours per week and weeks worked per year.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Salary Calculator — Convert Hourly, Monthly & Annual Pay',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I convert an hourly wage to an annual salary?',
    a: 'Multiply the hourly rate by the hours you work per week and then by the weeks you work per year: annual = hourly × hours/week × weeks/year. At $25/hour, 40 hours a week, 52 weeks a year, that is 25 × 40 × 52 = $52,000.',
  },
  {
    q: 'How do I convert an annual salary to an hourly rate?',
    a: 'Divide the annual salary by the total hours you work in a year (hours per week × weeks per year). A $52,000 salary at 40 hours a week over 52 weeks is 52,000 ÷ 2,080 = $25 per hour.',
  },
  {
    q: 'Why does weeks per year matter?',
    a: 'If you take unpaid time off, you work fewer than 52 weeks, which raises the effective hourly value of a fixed salary and lowers the annual figure of a fixed hourly rate. Setting weeks per year to, say, 50 accounts for two weeks of unpaid leave.',
  },
  {
    q: 'Does this calculator account for tax?',
    a: 'No. It converts gross pay — the amount before income tax, social contributions, and other deductions. Your take-home (net) pay will be lower and depends on your location, filing status, and benefits. Use this for comparing offers on a like-for-like gross basis.',
  },
  {
    q: 'How is monthly pay calculated from a salary?',
    a: 'Monthly pay is simply the annual salary divided by 12, regardless of how many days are in each month. Some employers instead pay every two weeks (26 paychecks) or twice a month (24 paychecks), which produces slightly different per-cheque amounts.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the salary calculator</h2>
          <p>
            Enter an amount, tell the calculator what period it covers, and set your hours per week,
            days per week, and weeks worked per year. It converts your pay into hourly, daily,
            weekly, monthly, and annual figures all at once, so you can compare jobs quoted on
            different bases.
          </p>

          <h2>Comparing offers fairly</h2>
          <p>
            Job offers rarely use the same units: one is quoted per hour, another as a monthly
            figure, a third as an annual package. Converting everything to a single basis is the only
            way to compare them honestly. The number of weeks you actually work is the detail people
            most often forget — a role with more unpaid time off is worth less per year at the same
            hourly rate, and this tool makes that trade-off visible.
          </p>

          <h2>Gross versus take-home</h2>
          <p>
            The figures here are gross pay, before any tax or deductions. Net pay varies so much by
            country and personal circumstances that a single formula cannot capture it, so this
            calculator deliberately stays on the gross side for clean, comparable numbers. When
            budgeting, remember your actual take-home will be lower. All calculations happen in your
            browser and nothing is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
