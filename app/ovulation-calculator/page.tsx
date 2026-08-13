import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'ovulation-calculator')!

export const metadata: Metadata = {
  title: 'Ovulation Calculator — Fertile Window & Ovulation Day',
  description:
    'Free ovulation calculator. Estimate your fertile window, ovulation day, and next period from the first day of your last period and your cycle length.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Ovulation Calculator — Fertile Window & Ovulation Day',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is ovulation day calculated?',
    a: 'Ovulation typically happens about 14 days before your next period starts, regardless of how long your cycle is. The calculator takes the first day of your last period, adds your cycle length, then counts back 14 days to estimate the ovulation date.',
  },
  {
    q: 'What is the fertile window?',
    a: 'The fertile window is the span of days when conception is possible — roughly the five days before ovulation plus the day of ovulation itself. Sperm can survive several days, so intercourse in the days leading up to ovulation can result in pregnancy.',
  },
  {
    q: 'How accurate is an ovulation estimate?',
    a: 'It is an estimate based on averages. Real ovulation can shift from cycle to cycle due to stress, illness, or natural variation, and irregular cycles make prediction harder. For a more precise signal, many people track basal body temperature, cervical mucus, or use ovulation predictor kits.',
  },
  {
    q: 'Can I use this to avoid pregnancy?',
    a: 'This tool is not a reliable form of contraception. Because ovulation timing varies and the fertile window can shift, calendar estimates alone are not dependable for preventing pregnancy. If that is your goal, speak to a healthcare professional about proven methods.',
  },
  {
    q: 'Does cycle length change the fertile days?',
    a: 'Yes. Since ovulation is counted back from the next period, a longer cycle pushes ovulation and the fertile window later, and a shorter cycle brings them earlier. That is why entering your own average cycle length gives a more personal estimate than assuming a 28-day cycle.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Ovulation is counted backwards, not forwards</h2>
          <p>
            The common assumption is that ovulation happens on day 14. That is only true for a
            textbook 28-day cycle. What actually stays relatively fixed is the second half of the
            cycle — the luteal phase — which runs about 14 days regardless of total cycle length.
          </p>
          <p>
            So ovulation is estimated by counting back 14 days from the next expected period, not
            forward from the last one. On a 32-day cycle that puts ovulation around day 18, not day
            14. Getting this backwards is the single most common reason people miscalculate their
            fertile window by several days, which is why this calculator asks for your own average
            cycle length rather than assuming 28.
          </p>

          <h2>Reading your fertile window</h2>
          <p>
            Enter the first day of your last period and your average cycle length. The calculator
            estimates your ovulation day, your most fertile window, and when your next period is
            likely to start. Everything is worked out in your browser and nothing you enter is stored.
          </p>

          <h2>Understanding the fertile window</h2>
          <p>
            Conception is most likely in the short window around ovulation. Because sperm can survive
            for several days inside the body, the fertile days begin a few days before the egg is
            released and end shortly after. Identifying this window is useful whether you are trying to
            conceive or simply want to understand your cycle better. The calculator marks the window
            so you can see the highest-probability days at a glance.
          </p>

          <h2>An estimate to guide, not a guarantee</h2>
          <p>
            Calendar-based predictions rely on averages, and real bodies vary. Ovulation can move
            earlier or later from one cycle to the next, and irregular cycles reduce accuracy further.
            Treat the dates here as a helpful guide and, if timing matters to you, combine them with
            direct signals like basal body temperature or ovulation predictor kits. This tool is for
            general information and is not medical advice or a method of contraception — for personal
            guidance, consult a healthcare professional.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
