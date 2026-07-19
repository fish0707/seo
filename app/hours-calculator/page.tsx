import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'hours-calculator')!

export const metadata: Metadata = {
  title: 'Hours Calculator — Time Between Two Times & Timesheets',
  description:
    'Free hours calculator. Enter a start and end time, subtract a break, and get the duration in hours and minutes and as a decimal for timesheets and pay.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Hours Calculator — Time Between Two Times & Timesheets',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate the hours between two times?',
    a: 'Convert both times to minutes since midnight, subtract the start from the end, then divide by 60. This calculator does it for you and also subtracts any unpaid break you enter, giving the result in both hours-and-minutes and decimal form.',
  },
  {
    q: 'How do I convert minutes to decimal hours?',
    a: 'Divide the minutes by 60. So 30 minutes is 0.5 hours, 15 minutes is 0.25 hours, and 45 minutes is 0.75 hours. Decimal hours are what most payroll systems expect, which is why this tool shows both formats.',
  },
  {
    q: 'Can it handle overnight shifts?',
    a: 'Yes. If the end time is earlier than the start time, the calculator assumes the shift crosses midnight and adds 24 hours, so a shift from 22:00 to 06:00 correctly comes out as 8 hours. A note appears when an overnight shift is detected.',
  },
  {
    q: 'How does the break deduction work?',
    a: 'Enter the length of your unpaid break in minutes and it is subtracted from the total time between clock-in and clock-out. A 9:00 to 17:00 day with a 30-minute break gives 7 hours 30 minutes of paid time.',
  },
  {
    q: 'How do I turn hours into pay?',
    a: 'Multiply the decimal hours by your hourly rate. If you worked 7.5 hours at $20 per hour, that is 7.5 × 20 = $150. Using the decimal figure avoids mistakes that happen when people multiply the minutes directly.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the hours calculator</h2>
          <p>
            Enter your start time and end time, then add any unpaid break in minutes. The calculator
            returns the worked duration both as hours and minutes and as a decimal number of hours,
            which is the format payroll and timesheet systems usually require.
          </p>

          <h2>Why decimal hours matter</h2>
          <p>
            The trickiest part of time arithmetic is that minutes are in base 60, not base 100. Half
            an hour is 0.5 hours, not 0.30, and getting this wrong is a common source of payroll
            errors. By showing the decimal conversion alongside the hours-and-minutes result, this
            tool lets you multiply straight by an hourly rate without any manual conversion.
          </p>

          <h2>Overnight and multi-part shifts</h2>
          <p>
            Shifts that cross midnight confuse simple subtraction, because the end time appears
            &ldquo;before&rdquo; the start. The calculator detects this and wraps the time correctly,
            so a night shift is measured properly. For a day split into several sessions, run each
            block separately and add the decimal totals. Everything is computed in your browser with
            nothing stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
