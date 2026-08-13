import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq, type Source } from '@/components/ToolShell'
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

const sources: Source[] = [
  { label: 'Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center, Report No. 84-11', publisher: 'Naval Health Research Center', href: 'https://apps.dtic.mil/sti/citations/ADA143890' },
  { label: 'Percent body fat norms for men and women', publisher: 'American Council on Exercise', href: 'https://www.acefitness.org/resources/everyone/tools-calculators/percent-body-fat-calculator/' },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      sources={sources}
      article={
        <>
          <h2>Consistency beats precision here</h2>
          <p>
            The U.S. Navy method depends entirely on tape measurements, which means how you hold the
            tape matters as much as where. A centimetre of extra tension at the waist can shift the
            result by more than a full percentage point.
          </p>
          <p>
            That sounds like a flaw, and for a single reading it is — treat any one result as a
            ballpark within a few points of the truth. But it becomes a strength when you measure the
            same way each time: same spots, same tension, same time of day, before eating. The
            absolute number may be slightly off, yet the direction it moves over weeks is reliable,
            and the trend is what you actually want to know.
          </p>

          <h2>Taking the measurements</h2>
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

          <h2>What the categories mean</h2>
          <p>
            The bands this calculator reports come from the American Council on Exercise. Essential
            fat — around 3–5% for men and 10–13% for women — is the minimum the body needs for normal
            function; going below it is genuinely harmful rather than impressively lean. The athletic
            and fitness bands sit above that, and the average band above those.
          </p>
          <p>
            Sitting in the average band is not a diagnosis. Body fat is one input among many, and a
            person in the middle of that range who is active and eating well is in a very different
            position from someone at the same percentage who is neither.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
