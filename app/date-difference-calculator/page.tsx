import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'date-difference-calculator')!

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Days Between Two Dates',
  description:
    'Count the exact number of days, weeks, months, and years between any two dates. Free date duration calculator for deadlines, anniversaries, and project planning.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Date Difference Calculator — Days Between Two Dates',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'Does the calculator include the end date?',
    a: 'By default, no — it counts the time elapsed between the two dates, so Monday to Friday is 4 days. Tick "Include the end date" to count both endpoints, which gives 5 days. Including the end date is common for hotel bookings, medication courses, and rental periods.',
  },
  {
    q: 'How are months counted when they have different lengths?',
    a: 'The calculator uses real calendar months, not a fixed 30 days. It counts complete months between the dates first, then the remaining days, so 15 January to 15 March is exactly 2 months regardless of February’s length.',
  },
  {
    q: 'Do leap years affect the result?',
    a: 'The day count is exact, so leap days are automatically included. The stretch from 1 February to 1 March is 29 days in a leap year and 28 days otherwise.',
  },
  {
    q: 'Can I calculate days until a future date?',
    a: 'Yes. Set the start date to today and the end date to your target — the result is your countdown in days and weeks. If you enter the dates in reverse order, the calculator swaps them automatically.',
  },
  {
    q: 'Is this the same as counting business days?',
    a: 'No — this tool counts every calendar day, including weekends and holidays. A business-day counter excludes weekends and, depending on the country, public holidays.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Inclusive or elapsed? The answer changes by one day</h2>
          <p>
            Ask two people how many days are between 1 March and 5 March and you will get two
            answers. Elapsed counting says four — the number of nights that pass. Inclusive counting
            says five — the number of calendar days touched, counting both ends.
          </p>
          <p>
            Neither is wrong; they answer different questions. Rental days, hotel nights, and
            interest periods use elapsed counting. Holiday allowances, event durations, and most
            legal notice periods count inclusively. A one-day error in a contract or a leave request
            is exactly the kind of small mistake that is expensive to discover late, which is why
            this calculator lets you pick the convention rather than silently choosing for you.
          </p>

          <h2>Entering your dates</h2>
          <p>
            Pick a start date and an end date, and the exact gap between them appears instantly —
            as a total number of days, as weeks and days, and as a calendar breakdown in years,
            months, and days. The order does not matter: if the start date is later than the end
            date, the calculator swaps them for you.
          </p>

          <h2>Elapsed days vs. inclusive days</h2>
          <p>
            There are two correct ways to count the distance between dates, and choosing the wrong
            one is the most common source of off-by-one errors. <strong>Elapsed counting</strong>{' '}
            (the default) measures the time between the dates: Friday to Sunday is 2 days.{' '}
            <strong>Inclusive counting</strong> counts every date touched, including both endpoints:
            Friday to Sunday is 3 days. Use inclusive counting when both the first and last day
            &quot;count&quot; — nights are irrelevant — such as courses of medication, car rentals
            charged per calendar day, or event durations.
          </p>

          <h2>Common uses</h2>
          <p>
            This calculator is handy for counting down to a wedding, holiday, or product launch;
            working out how many days remain until a deadline; measuring the length of a project or
            contract; checking how many weeks pregnant a due date implies; and settling questions
            like &quot;how many days have passed since&quot; a memorable date.
          </p>

          <h2>Why months are the awkward unit</h2>
          <p>
            Days and weeks are fixed lengths, so counting them is unambiguous. Months are not: they
            run from 28 to 31 days, which means "three months from 31 January" has no single correct
            answer. This calculator uses real calendar months and settles that case by capping at the
            end of the target month, the same convention most scheduling software follows. If you
            need an exact figure for a contract or an interest period, count in days instead —
            they never drift.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
