import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'pace-calculator')!

export const metadata: Metadata = {
  title: 'Pace Calculator — Running Pace per KM & Mile',
  description:
    'Free running pace calculator. Enter your distance and time to get your pace per kilometre and per mile, plus your average speed for race and training planning.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Pace Calculator — Running Pace per KM & Mile',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is running pace calculated?',
    a: 'Pace is your total time divided by the distance. For a 10 km run in 50 minutes, that is 3,000 seconds ÷ 10 = 300 seconds per km, or 5:00 per kilometre. This calculator converts the result into minutes and seconds and also gives pace in the other unit.',
  },
  {
    q: 'What is the difference between pace and speed?',
    a: 'Pace is time per unit of distance (minutes per km or mile) and is how runners usually think. Speed is distance per unit of time (km/h or mph) and is how cyclists and cars measure. They are reciprocals: a 5:00/km pace equals 12 km/h.',
  },
  {
    q: 'How do I convert pace per km to pace per mile?',
    a: 'A mile is 1.609 km, so multiply your per-km pace by 1.609 to get per-mile pace. A 5:00/km pace is about 8:03 per mile. The calculator shows both automatically so you do not have to do the conversion by hand.',
  },
  {
    q: 'What pace do I need for a target finish time?',
    a: 'Divide your goal time by the race distance. For a sub-2-hour half marathon (21.1 km), that is 7,200 seconds ÷ 21.1 ≈ 341 seconds per km, or about 5:41/km. Enter the distance and your goal time here to see the exact pace required.',
  },
  {
    q: 'Should I train at my race pace?',
    a: 'Not all the time. Most training runs are done slower than race pace to build endurance, with a smaller amount of faster work near or above race pace. Knowing your current pace across different distances helps you set sensible targets for each type of session.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the pace calculator</h2>
          <p>
            Enter the distance you ran and your total time in hours, minutes, and seconds. The
            calculator shows your pace per kilometre or mile, the equivalent pace in the other unit,
            and your average speed. It works for a single run or for planning a target race pace.
          </p>

          <h2>Pace is the runner&rsquo;s core number</h2>
          <p>
            Almost every running decision comes back to pace. It tells you whether a training run was
            easy or hard, lets you compare efforts across different distances, and turns a goal finish
            time into a concrete number to hold on race day. Because this tool also converts between
            per-km and per-mile pace, you can follow a training plan written in either unit without
            recalculating.
          </p>

          <h2>Planning a race</h2>
          <p>
            To hit a target time, work backwards: enter the race distance and your goal time to see
            the pace you need to average. Then compare that against your recent runs to judge whether
            the goal is realistic or needs adjusting. Remember that terrain, heat, and fatigue all
            affect real-world pace, so build in a little margin. All calculations run in your browser
            and nothing is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
