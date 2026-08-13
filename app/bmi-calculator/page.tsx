import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import { KeyNumbers, Pitfalls, WorkedExample } from '@/components/content'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'bmi-calculator')!

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index in Metric & Imperial',
  description:
    'Free BMI calculator. Enter your height and weight in metric or imperial units to get your Body Mass Index, WHO weight category, and healthy weight range.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'BMI Calculator — Body Mass Index in Metric & Imperial',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is BMI calculated?',
    a: 'BMI is your weight in kilograms divided by the square of your height in metres: BMI = kg ÷ m². For imperial units the formula is (pounds ÷ inches²) × 703. A person 1.70 m tall weighing 65 kg has a BMI of 65 ÷ (1.70 × 1.70) = 22.5.',
  },
  {
    q: 'What is a healthy BMI range?',
    a: 'The World Health Organization defines a BMI below 18.5 as underweight, 18.5 to 24.9 as normal weight, 25 to 29.9 as overweight, and 30 or above as obese. These bands apply to most adults aged 20 and over regardless of sex.',
  },
  {
    q: 'Is BMI accurate for everyone?',
    a: 'BMI is a quick screening tool, not a diagnosis. Because it only uses height and weight, it can overestimate body fat in very muscular people and underestimate it in older adults who have lost muscle. It is also not designed for children, pregnant people, or athletes. Treat it as a starting point and discuss concerns with a healthcare professional.',
  },
  {
    q: 'What is the healthy weight range shown by this calculator?',
    a: 'It is the weight range that would put your BMI between 18.5 and 24.9 at your current height. It is calculated by rearranging the BMI formula: weight = BMI × height². This gives you a concrete target range instead of a single number.',
  },
  {
    q: 'Does BMI differ for men and women?',
    a: 'The BMI formula and the standard WHO categories are the same for adult men and women. However, at the same BMI women tend to have more body fat than men, which is one reason BMI is best used alongside other measures such as waist circumference.',
  },
  {
    q: 'My BMI says overweight but I lift weights. Should I worry?',
    a: 'Probably not on the basis of BMI alone. Muscle is denser than fat, so a lean, muscular person can easily register 26–28 while carrying a low body fat percentage. Measure your body fat and your waist instead — if both are in a healthy range, the BMI reading is an artefact of the formula, not a warning.',
  },
  {
    q: 'How quickly should I expect my BMI to change?',
    a: 'Losing roughly half a kilogram a week is a sustainable pace, which for most adults moves BMI by about 0.2 points per week. Anything much faster usually means losing muscle and water alongside fat, and tends not to hold. Because of that slow pace, checking monthly is more informative than checking daily.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>The four WHO weight categories</h2>
          <p>
            Every BMI result falls into one of four bands defined by the World Health Organization.
            The bands are the same for adult men and women aged 20 and over:
          </p>

          <KeyNumbers
            items={[
              { value: 'Under 18.5', label: 'Underweight' },
              { value: '18.5 – 24.9', label: 'Normal weight' },
              { value: '25 – 29.9', label: 'Overweight' },
              { value: '30 and above', label: 'Obese' },
            ]}
          />

          <p>
            Drifting a point or two inside a band means very little. Crossing a boundary is the
            signal worth paying attention to, because that is where the associated health research
            actually changes. The healthy weight range this calculator shows is simply the span of
            weights that would keep you between 18.5 and 24.9 at your current height.
          </p>

          <h2>Working the formula by hand</h2>
          <p>
            BMI is your weight in kilograms divided by your height in metres squared. The squaring
            is the part people get wrong — it is height × height, not height × 2.
          </p>

          <WorkedExample
            title="Someone 1.70 m tall weighing 65 kg"
            steps={[
              { label: 'Height squared', value: '1.70 × 1.70 = 2.89' },
              { label: 'Weight ÷ height²', value: '65 ÷ 2.89' },
              { label: 'Category', value: 'Normal weight' },
            ]}
            result="BMI = 22.5"
          />

          <p>
            In imperial units the same relationship needs a conversion factor: pounds divided by
            inches squared, multiplied by 703. The calculator above handles either system, and
            converts your healthy weight range back into whichever units you entered.
          </p>

          <h2>Where BMI misleads</h2>
          <p>
            BMI was built to describe populations, not individuals, and it only knows two things
            about you. That makes it a fast first screen and a poor final verdict. The situations
            below are where it most often gets a person wrong:
          </p>

          <Pitfalls
            items={[
              {
                title: 'Muscular builds get flagged as overweight',
                body: 'Muscle is denser than fat, so athletes and regular lifters often land in the overweight or obese bands while carrying very little fat. Body fat percentage is the better measure here.',
              },
              {
                title: 'Older adults can look healthier than they are',
                body: 'Muscle mass falls with age while fat can rise. A BMI in the normal band may hide a body composition that has shifted considerably, which is why waist measurement is a useful companion.',
              },
              {
                title: 'It was never designed for children or pregnancy',
                body: 'Children are assessed against age-and-sex percentile charts instead, and BMI is not meaningful during pregnancy. Neither group should read the adult bands.',
              },
              {
                title: 'The same BMI means different things by sex',
                body: 'At an identical BMI, women typically carry more body fat than men. The bands do not adjust for this, which is another argument for reading BMI alongside other measures.',
              },
            ]}
          />

          <h2>What to pair it with</h2>
          <p>
            Two measurements cover most of what BMI misses, and both are quick. Waist circumference
            captures abdominal fat, which carries more health risk than fat elsewhere. Body fat
            percentage separates the muscle from the fat that BMI lumps together. Tracked over
            months, the direction those numbers move tells you far more than any single reading —
            and if a result concerns you, a healthcare professional can interpret it against your
            full history rather than two numbers.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
