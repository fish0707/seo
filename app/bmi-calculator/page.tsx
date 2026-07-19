import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
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
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the BMI calculator</h2>
          <p>
            Choose metric or imperial units, enter your height and weight, and your Body Mass Index
            appears instantly along with your weight category and the healthy weight range for your
            height. Nothing is sent to a server — the calculation happens entirely in your browser.
          </p>

          <h2>What BMI actually measures</h2>
          <p>
            Body Mass Index is a ratio of weight to height that estimates whether you are carrying a
            healthy amount of weight for your size. It was designed for population-level screening,
            which is why it works well as a fast first check but should not be read as a precise
            measure of body fat. A single BMI number is most useful when tracked over time or read
            together with measurements like waist circumference and body composition.
          </p>

          <h2>Reading your result</h2>
          <p>
            A BMI in the 18.5–24.9 band is classified as a normal, healthy weight. Below that is
            underweight, 25–29.9 is overweight, and 30 or above is obese. Small movements within a
            band rarely matter; crossing a band boundary is a better prompt to review your habits or
            speak to a healthcare professional. The healthy weight range this tool shows is the span
            of weights that would keep you inside the normal band at your current height.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
