import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq, type Source } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'calories-burned-calculator')!

export const metadata: Metadata = {
  title: 'Calories Burned Calculator — Exercise Calorie Estimator',
  description:
    'Free calories burned calculator. Estimate the calories you burn during exercise from your weight, the activity, and the duration, using MET values.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Calories Burned Calculator — Exercise Calorie Estimator',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How are calories burned during exercise calculated?',
    a: 'The estimate uses MET (Metabolic Equivalent of Task) values: calories = MET × body weight in kilograms × time in hours. Each activity has a MET value representing how much energy it uses compared with sitting still, so heavier people and longer or harder activities burn more.',
  },
  {
    q: 'What is a MET?',
    a: 'A MET is a unit of energy expenditure. One MET is the energy you use at rest. An activity of 8 METs uses eight times as much energy per minute as sitting quietly. Brisk walking is around 5 METs, running roughly 10, and vigorous jump rope over 12.',
  },
  {
    q: 'Why does body weight affect calories burned?',
    a: 'Moving a heavier body takes more energy, so at the same activity and duration a heavier person burns more calories than a lighter one. That is why the formula multiplies by your weight — entering an accurate figure gives a better estimate.',
  },
  {
    q: 'How accurate is this estimate?',
    a: 'MET-based figures are solid averages but not exact for any individual. Your real burn depends on intensity, fitness, efficiency, terrain, and body composition. Treat the number as a reasonable ballpark and, if you have a heart-rate monitor, use it to refine harder sessions.',
  },
  {
    q: 'Does building muscle help me burn more calories?',
    a: 'Somewhat. Muscle burns a little more energy at rest than fat, and being fitter lets you train harder and longer, which burns more overall. The bigger driver day to day, though, is simply how much you move — total activity matters more than resting metabolism for most people.',
  },
]

const sources: Source[] = [
  { label: 'Ainsworth BE, Haskell WL, Herrmann SD, et al. 2011 Compendium of Physical Activities. Med Sci Sports Exerc. 2011;43(8):1575–1581', publisher: 'Medicine & Science in Sports & Exercise', href: 'https://pubmed.ncbi.nlm.nih.gov/21681120/' },
  { label: 'Physical Activity Guidelines for Americans, 2nd edition', publisher: 'US Department of Health and Human Services', href: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines' },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      sources={sources}
      article={
        <>
          <h2>Exercise burns less than most people assume</h2>
          <p>
            A 70 kg person running for 30 minutes at a moderate pace burns roughly 343 calories.
            That is a little under two chocolate bars, and less than a large latte and a muffin.
          </p>
          <p>
            This is not an argument against exercising — the cardiovascular, metabolic, and mental
            health returns are substantial and well evidenced. It is an argument against treating
            exercise as the primary lever for weight loss. Half an hour of hard work is easily undone
            by a single relaxed decision at the counter afterwards, which is why intake usually
            dominates the equation.
          </p>
          <p>
            Where exercise does move the needle is in accumulation and in what it protects. Daily
            walking adds up to far more than three weekly gym sessions, and resistance work preserves
            the muscle that a calorie deficit would otherwise strip alongside fat.
          </p>

          <h2>Reading the estimate</h2>
          <p>
            Choose your activity, enter your body weight and how many minutes you exercised, and the
            calculator estimates the calories burned along with a per-minute figure. Switch between
            kilograms and pounds with the toggle. Everything is worked out in your browser.
          </p>

          <h2>How the estimate works</h2>
          <p>
            Each activity is assigned a MET value — a measure of how much energy it uses compared with
            resting. Multiplying the MET value by your body weight and the time spent gives an estimate
            of energy expenditure. This is the same approach used in fitness research, which is why it
            is a reliable way to compare activities: you can immediately see that half an hour of jump
            rope burns far more than half an hour of yoga.
          </p>

          <h2>Using it to reach your goals</h2>
          <p>
            Pairing this with a daily calorie target makes planning easier. If you know roughly how
            much you burn in a session, you can balance it against what you eat to create the deficit
            or surplus you want. Remember these are estimates — real burn varies with intensity and
            individual factors — so use the numbers as a guide and let your results over a few weeks
            fine-tune your plan. This tool is for general information, not medical advice.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
