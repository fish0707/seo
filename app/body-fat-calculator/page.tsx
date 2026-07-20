import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'body-fat-calculator')!

export const metadata: Metadata = {
  title: 'Body Fat Calculator — U.S. Navy Method',
  description:
    'Free body fat calculator using the U.S. Navy tape method. Estimate your body fat percentage, category, and fat and lean mass from a few measurements.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Body Fat Calculator — U.S. Navy Method',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How does the U.S. Navy body fat method work?',
    a: 'It estimates body fat from the circumference of your neck and waist (and hips for women) relative to your height, using a formula based on logarithms. It requires only a tape measure, which is why it is popular for quick, no-equipment estimates.',
  },
  {
    q: 'Where exactly should I measure?',
    a: 'Measure your neck just below the larynx, your waist at navel level, and — for women — your hips at the widest point. Keep the tape snug but not compressing the skin, stand relaxed, and measure on bare skin for consistency. Small measurement errors change the result, so measure twice.',
  },
  {
    q: 'How accurate is it?',
    a: 'The Navy method is reasonably accurate for most people, typically within a few percentage points of a DEXA or hydrostatic measurement. It is less reliable for very lean or very muscular individuals. Its real strength is tracking change over time when you measure the same way each time.',
  },
  {
    q: 'What is a healthy body fat percentage?',
    a: 'Ranges differ by sex. For men, roughly 6–13% is athletic, 14–17% is fitness, 18–24% is average, and above that is higher than average. For women the bands are about 14–20% athletic, 21–24% fitness, 25–31% average. Some fat is essential — around 3–5% for men and 10–13% for women.',
  },
  {
    q: 'What is lean body mass?',
    a: 'Lean body mass is everything that is not fat — muscle, bone, organs, and water. If you enter your weight, the calculator multiplies your body fat percentage by your weight to get fat mass, then subtracts it to give lean mass. Preserving lean mass is a key goal during weight loss.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the body fat calculator</h2>
          <p>
            Select your sex and enter your height, neck, and waist measurements in centimetres — plus
            hips if you are female. Optionally add your weight to also see your fat mass and lean mass.
            The calculator applies the U.S. Navy formula and shows your estimated body fat percentage
            and category instantly, all in your browser.
          </p>

          <h2>Why body fat beats the scale alone</h2>
          <p>
            Your bodyweight lumps muscle, fat, bone, and water into one number, so it cannot tell you
            whether a change is fat lost or muscle gained. Body fat percentage separates the part most
            people actually want to track. Two people at the same weight and height can look and
            perform very differently depending on their body composition, which is exactly what this
            measure captures.
          </p>

          <h2>Measure consistently to track progress</h2>
          <p>
            The single most important habit is to measure the same way every time: same tape tension,
            same spots, same time of day. Because the Navy method depends on circumferences, a
            centimetre of difference in how you hold the tape can shift the result by a percentage
            point or two. Treat any one reading as an estimate, but a series of readings taken
            consistently gives a reliable picture of the trend. This tool is for general information
            and is not a medical assessment.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
