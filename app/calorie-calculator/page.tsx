import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'calorie-calculator')!

export const metadata: Metadata = {
  title: 'Calorie Calculator — Daily TDEE & Maintenance Calories',
  description:
    'Free calorie calculator using the Mifflin-St Jeor equation. Estimate your BMR and daily calorie needs (TDEE) from age, sex, height, weight, and activity level.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Calorie Calculator — Daily TDEE & Maintenance Calories',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How are daily calorie needs calculated?',
    a: 'This tool uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR), then multiplies it by an activity factor to get your Total Daily Energy Expenditure (TDEE) — the calories you burn in a typical day including movement and exercise.',
  },
  {
    q: 'What is the difference between BMR and TDEE?',
    a: 'BMR is the energy your body uses at complete rest just to stay alive — breathing, circulation, cell repair. TDEE is BMR plus everything else you do: walking, working, exercising, even digesting food. TDEE is the number that matters for maintaining, losing, or gaining weight.',
  },
  {
    q: 'How many calories should I eat to lose weight?',
    a: 'A deficit of about 500 calories per day below your TDEE leads to roughly 0.5 kg (about 1 lb) of weight loss per week, since a kilogram of fat stores roughly 7,700 calories. Very aggressive deficits are hard to sustain and risk losing muscle, so a moderate deficit is usually best.',
  },
  {
    q: 'Why does activity level change the result so much?',
    a: 'The activity multiplier ranges from 1.2 for sedentary to 1.9 for very active, so it can swing your TDEE by hundreds of calories. Be honest about your typical week rather than your best week — most people overestimate. If unsure, pick the lower option and adjust based on real results.',
  },
  {
    q: 'How accurate is this calorie estimate?',
    a: 'The Mifflin-St Jeor equation is one of the most accurate general formulas, but every estimate is a starting point. Real needs vary with body composition, genetics, and non-exercise movement. Use the number as a baseline, track your weight over a few weeks, and adjust intake up or down based on what actually happens.',
  },
  {
    q: 'Why has my weight loss stalled?',
    a: 'Two reasons dominate. As you lose weight your body becomes smaller and burns fewer calories, so the deficit that worked at the start becomes maintenance later — recalculate every few kilograms. The other is that portion estimates drift upward over time; a few weeks of accurate logging usually explains the gap.',
  },
  {
    q: 'Should I eat back the calories I burn exercising?',
    a: 'Partially at most. Exercise burn estimates tend to run high, and activity multipliers in this calculator already account for regular training, so eating back a logged burn on top double-counts it. If you are hungry after hard sessions, add a portion of it rather than all of it and adjust based on results.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>Be honest about the activity multiplier</h2>
          <p>
            Everything else on this page is arithmetic. The activity level is a judgement call, and
            it is where most estimates go wrong — because the multiplier ranges from 1.2 to 1.9,
            picking one level too high inflates your daily target by several hundred calories.
          </p>
          <p>
            For a 70 kg, 175 cm, 30-year-old man with a BMR of about 1,649, the spread looks like
            this: sedentary gives 1,979 kcal, moderate gives 2,556, and very active gives 3,133. That
            is a range of over 1,150 calories from the same body — enough to turn an intended deficit
            into a surplus.
          </p>
          <p>
            The common error is rating yourself on your best week rather than your typical one. Three
            gym sessions among five sedentary desk days is &ldquo;light,&rdquo; not
            &ldquo;active.&rdquo; When genuinely unsure, choose the lower option: it is far easier to
            add calories after two weeks of no progress than to unpick a deficit that was never real.
          </p>

          <h2>Reading your result</h2>
          <p>
            Enter your age, sex, height, weight, and activity level in metric or imperial units. The
            calculator estimates your Basal Metabolic Rate and your Total Daily Energy Expenditure —
            the calories you need to maintain your current weight — plus target intakes for losing or
            gaining weight at a steady, sustainable pace.
          </p>

          <h2>Maintenance, deficit, and surplus</h2>
          <p>
            Your TDEE is the balance point: eat that many calories and your weight stays roughly
            stable. Eating consistently below it creates a deficit and you lose weight; eating above
            it creates a surplus and you gain. The commonly used figure of a 500-calorie daily
            deficit corresponds to about half a kilogram of loss per week, which most people can
            maintain without feeling deprived.
          </p>

          <h2>Why it is an estimate, not a rule</h2>
          <p>
            No formula can capture your metabolism exactly. The Mifflin-St Jeor equation used here is
            well regarded for accuracy, but factors like muscle mass, sleep, stress, and how much you
            fidget all shift the real number. Treat the result as a well-informed starting point:
            eat at the suggested level for two or three weeks, weigh yourself regularly, and adjust.
            This tool is for general information and is not medical or dietary advice.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
