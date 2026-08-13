import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'age-calculator')!

export const metadata: Metadata = {
  title: 'Age Calculator — Exact Age in Years, Months & Days',
  description:
    'Free age calculator: enter your date of birth to find your exact age in years, months, and days, plus total days lived and a countdown to your next birthday.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Age Calculator — Exact Age in Years, Months & Days',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is exact age calculated?',
    a: 'Exact age is the elapsed time between your date of birth and today, expressed as full calendar years, then remaining full months, then remaining days. For example, someone born on 15 March 2000 is 24 years, 3 months, and 10 days old on 25 June 2024. This calendar method matches how ages are used on official documents.',
  },
  {
    q: 'Why does my age in months and days look different on other sites?',
    a: 'Some calculators count a month as a fixed 30 days, which drifts from the real calendar. This tool uses true calendar months — the month lengths of the actual dates involved — so results match how birthdays really fall.',
  },
  {
    q: 'What happens if I was born on 29 February?',
    a: 'In non-leap years your birthday is treated as 1 March, which is the most common legal convention. Your exact age in years, months, and days is always calculated from the real date, 29 February, so the totals stay accurate.',
  },
  {
    q: 'Can I calculate my age on a specific date, like a past or future date?',
    a: 'Yes. Use the second field, "Age at date", to pick any reference date. This is useful for filling in forms that ask for your age on a given date, such as exam registrations, visa applications, or insurance paperwork.',
  },
  {
    q: 'Is my date of birth stored anywhere?',
    a: 'No. The calculation runs entirely in your browser using JavaScript. Nothing you enter is sent to a server, stored, or shared.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Why calendar months make this harder than it looks</h2>
          <p>
            Age sounds like simple subtraction until you try to write the rule down. Months are not a
            fixed length, February changes size every four years, and &ldquo;one month after 31
            January&rdquo; has no obvious answer. A calculation that treats every month as 30 days
            drifts by roughly five days a year — enough to put a birthday on the wrong side of a
            deadline.
          </p>
          <p>
            This calculator counts real calendar months and real leap years. It works out completed
            years first, then completed months, then the leftover days, which is the same convention
            used on official forms and by immigration and school-entry rules.
          </p>

          <h2>Using it in practice</h2>
          <p>
            Enter your date of birth in the first field and your exact age appears instantly —
            broken down into years, months, and days, along with the total number of months, weeks,
            and days you have lived, and how many days remain until your next birthday. To find
            your age on a date other than today (for example, on the day of an exam or the start of
            a school year), fill in the optional second field.
          </p>

          <h2>How age is calculated</h2>
          <p>
            The calculator uses the calendar method: it first counts the number of complete years
            since your birth, then the number of complete months after that, and finally the
            remaining days. Because calendar months have different lengths (28 to 31 days), this is
            the only method that matches how birthdays actually fall — a person born on 31 January
            turns one month old on the last day of February, not on a fictional &quot;31
            February&quot;.
          </p>
          <p>
            Total days are counted as the exact number of calendar days between the two dates,
            which also accounts for leap years automatically. Total weeks are total days divided by
            seven, rounded down.
          </p>

          <h2>Common uses</h2>
          <p>
            People use an age calculator for more than curiosity: filling in official forms that
            require age in completed years, checking age eligibility for school enrolment, sports
            leagues, or retirement benefits, calculating an infant&apos;s age in weeks or months for
            medical checkups, and finding out the exact day of the week they were born.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
