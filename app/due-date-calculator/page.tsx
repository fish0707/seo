import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq, type Source } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'due-date-calculator')!

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator — Estimated Delivery Date',
  description:
    'Free pregnancy due date calculator. Estimate your due date from your last menstrual period using Naegele’s rule, adjusted for cycle length, plus how far along you are.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Pregnancy Due Date Calculator — Estimated Delivery Date',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is a due date calculated?',
    a: 'The standard method is Naegele’s rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP). This calculator also adjusts for your cycle length, adding or subtracting the difference from the typical 28-day cycle.',
  },
  {
    q: 'Why is the due date based on my last period, not conception?',
    a: 'Because the date of the last period is something most people can identify, while the exact moment of conception is usually unknown. Pregnancy is conventionally measured from the LMP, which is about two weeks before conception — so at conception you are already considered "two weeks pregnant".',
  },
  {
    q: 'How accurate is an estimated due date?',
    a: 'Only about 4 in 100 babies arrive on their exact due date. Most births occur within a window of roughly two weeks either side. An ultrasound dating scan in the first trimester is more accurate than the LMP method, especially if your cycles are irregular.',
  },
  {
    q: 'Does cycle length affect the due date?',
    a: 'Yes. Naegele’s rule assumes a 28-day cycle with ovulation on day 14. If your cycle is longer, you ovulate later, so the due date moves later; if shorter, earlier. This calculator shifts the date by the difference between your cycle length and 28 days.',
  },
  {
    q: 'What are the three trimesters?',
    a: 'The first trimester runs from week 1 to the end of week 12, the second from week 13 to the end of week 26, and the third from week 27 until birth. The calculator shows which trimester you are currently in based on the weeks elapsed since your LMP.',
  },
]

const sources: Source[] = [
  { label: 'Methods for Estimating the Due Date — Committee Opinion No. 700', publisher: 'American College of Obstetricians and Gynecologists', href: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date' },
  { label: 'Definition of Term Pregnancy — Committee Opinion No. 579', publisher: 'American College of Obstetricians and Gynecologists', href: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy' },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      sources={sources}
      article={
        <>
          <h2>Only about 4 in 100 babies arrive on the date</h2>
          <p>
            A due date is a reference point, not an appointment. Roughly 4% of births happen on the
            estimated date itself, and the large majority fall somewhere in the three weeks either
            side of it. Full term is officially defined as 39 weeks 0 days to 40 weeks 6 days, with
            37 to 42 weeks all considered within normal range.
          </p>
          <p>
            Knowing that spread ahead of time spares a lot of anxiety in the final fortnight. The
            date is most useful for scheduling appointments and tracking gestational milestones —
            not for planning the day itself.
          </p>

          <h2>How the estimate is produced</h2>
          <p>
            Enter the first day of your last menstrual period and your average cycle length. The
            calculator estimates your due date, shows roughly how many weeks and days along you are
            today, and notes your current trimester. Everything is worked out in your browser and
            nothing you enter is stored.
          </p>

          <h2>How the estimate works</h2>
          <p>
            The calculation follows Naegele&rsquo;s rule, the method used in clinics worldwide: forty
            weeks from the first day of your last period. Because that rule assumes a textbook 28-day
            cycle, this tool adjusts for your actual cycle length so the estimate better fits your
            body. It also shows an approximate conception date, which falls around two weeks after the
            start of your last period.
          </p>

          <h2>An estimate, not a deadline</h2>
          <p>
            A due date is a helpful reference point, not a fixed appointment. Only a small minority of
            babies arrive on the exact date, and a healthy, full-term birth can happen across a span
            of several weeks around it. A first-trimester dating ultrasound gives a more precise
            estimate than any period-based calculation, particularly for irregular cycles. This tool
            is for general information and does not replace advice from your midwife or doctor.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
