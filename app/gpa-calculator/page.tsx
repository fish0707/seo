import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'gpa-calculator')!

export const metadata: Metadata = {
  title: 'GPA Calculator — Weighted Grade Point Average (4.0 Scale)',
  description:
    'Free GPA calculator. Enter your course grades and credit hours to get your weighted grade point average on the standard 4.0 scale.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'GPA Calculator — Weighted Grade Point Average (4.0 Scale)',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is GPA calculated?',
    a: 'Each letter grade is converted to grade points on a 4.0 scale (A = 4.0, B = 3.0, and so on). Multiply each course’s grade points by its credit hours, add these up, and divide by the total credit hours. The result is your weighted grade point average.',
  },
  {
    q: 'What is the difference between weighted and unweighted GPA?',
    a: 'An unweighted GPA treats every course equally. A weighted GPA — the kind this tool calculates — counts each course by its credit hours, so a 4-credit class affects your average more than a 1-credit class. Most colleges report the credit-weighted GPA.',
  },
  {
    q: 'What grade points does each letter correspond to?',
    a: 'On the common 4.0 scale: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, and F = 0.0. Some schools cap A+ at 4.0, which this calculator does.',
  },
  {
    q: 'How do I calculate my cumulative GPA across semesters?',
    a: 'Enter every course from all semesters into the calculator with its grade and credits. Because GPA is credit-weighted, adding all courses together gives your cumulative GPA directly — you do not average the individual semester GPAs, which would give the wrong answer if semesters had different credit loads.',
  },
  {
    q: 'Do pass/fail or withdrawn courses count?',
    a: 'Usually not. Pass/fail courses, withdrawals, and transfer credits are typically excluded from GPA even though they may count toward graduation. Only include courses that received a letter grade on the 4.0 scale for an accurate result.',
  },
  {
    q: 'Do retaken courses replace the original grade?',
    a: 'Policies differ. Some institutions replace the original grade entirely, others average the two, and others keep both on the transcript while counting only the higher one toward the GPA. Check your own institution\'s rule before modelling a retake here, since it changes which entries you should include.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>You cannot average your semester GPAs</h2>
          <p>
            This is the mistake that produces wrong transcripts. If you scored 3.8 one semester and
            3.2 the next, your cumulative GPA is only 3.5 if both semesters carried identical credit
            loads. Take 18 credits in the strong semester and 9 in the weak one and the real figure
            is 3.6.
          </p>
          <p>
            GPA is a credit-weighted average, so the only correct way to find a cumulative figure is
            to feed in every course individually with its own credit hours — which is why this
            calculator takes courses rather than semester averages.
          </p>

          <h2>Entering your courses</h2>
          <p>
            Enter each course&rsquo;s letter grade and its credit hours — the course name is optional
            and just helps you keep track. Add or remove rows as needed, and your weighted GPA
            updates instantly at the bottom. To find a cumulative GPA, simply enter every course from
            every semester.
          </p>

          <h2>Why credits change the answer</h2>
          <p>
            A grade point average is a weighted average, not a simple one. A top grade in a 4-credit
            course pulls your GPA up more than the same grade in a 1-credit course, because it
            represents more of your workload. That is why you cannot just average your letter grades
            or average your per-semester GPAs — the credit hours have to be part of the calculation,
            which this tool does automatically.
          </p>

          <h2>Using GPA to plan ahead</h2>
          <p>
            Because the result recalculates as you type, you can use the calculator to test
            scenarios: what grade you need this term to reach a target cumulative GPA, or how much a
            single difficult course will move your average. Enter your existing courses, then add
            hypothetical ones with the grades you are aiming for. Everything runs in your browser and
            nothing you enter is saved.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
