import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq, type Source } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'ideal-weight-calculator')!

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator — Ideal Body Weight for Your Height',
  description:
    'Free ideal weight calculator. Estimate your ideal body weight from height and sex using the Robinson, Devine, Miller, and Hamwi formulas, plus the healthy BMI range.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Ideal Weight Calculator — Ideal Body Weight for Your Height',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How is ideal body weight calculated?',
    a: 'The classic formulas start from a base weight at 5 feet of height and add a fixed amount per inch above that. For example, the Robinson formula uses 52 kg plus 1.9 kg per inch over 5 feet for men, and 49 kg plus 1.7 kg per inch for women. This tool shows four widely used formulas side by side.',
  },
  {
    q: 'Why do the formulas give different numbers?',
    a: 'Each formula was developed from different data and for different purposes — some originally for medication dosing rather than general health. Robinson and Miller tend to give lower figures, Devine and Hamwi slightly higher. Seeing the range is more useful than trusting any single number.',
  },
  {
    q: 'Is ideal body weight the same as a healthy weight?',
    a: 'Not exactly. Ideal body weight formulas produce a single target based only on height and sex, while a healthy weight is a range. That is why this calculator also shows the weight range corresponding to a BMI of 18.5 to 24.9, which most health bodies treat as healthy.',
  },
  {
    q: 'Do these formulas account for muscle or frame size?',
    a: 'No. Like BMI, ideal weight formulas use only height and sex, so they do not distinguish muscle from fat or account for a larger or smaller frame. A muscular athlete may weigh well above their "ideal" figure while being very lean. Use the result as a rough reference, not a strict goal.',
  },
  {
    q: 'How much should I weigh for my height?',
    a: 'There is no single correct answer. A reasonable approach is to look at the healthy BMI range for your height, which this tool shows, and treat the formula estimates as points within a broader healthy band. Body composition, fitness, and how you feel matter more than hitting an exact number.',
  },
]

const sources: Source[] = [
  { label: 'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body weight for drug dosage calculations. Am J Hosp Pharm. 1983;40(6):1016–1019', publisher: 'American Journal of Hospital Pharmacy', href: 'https://pubmed.ncbi.nlm.nih.gov/6869387/' },
  { label: 'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650–655', publisher: 'Drug Intelligence & Clinical Pharmacy' },
  { label: 'Pai MP, Paloucek FP. The origin of the ideal body weight equations. Ann Pharmacother. 2000;34(9):1066–1069', publisher: 'Annals of Pharmacotherapy', href: 'https://pubmed.ncbi.nlm.nih.gov/10981254/' },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      sources={sources}
      article={
        <>
          <h2>There is no single &ldquo;ideal&rdquo; weight</h2>
          <p>
            The four formulas on this page disagree with each other, and that disagreement is the
            most useful thing about them. For a 175 cm man they return figures spanning roughly 69 to
            72 kg — a three-kilogram spread from the same height and sex.
          </p>
          <p>
            The reason is that none of them were derived from research into optimal health. Devine
            (1974) was built for calculating drug dosages. Hamwi (1964) came from diabetes practice.
            Robinson and Miller (both 1983) were attempts to fit population data more closely. They
            survive because they are quick, not because any one is authoritative.
          </p>
          <p>
            Read them as a band rather than a target. If the four formulas cluster around 70 kg and
            the healthy BMI range for your height spans 57 to 76 kg, the honest conclusion is that
            anywhere in that region is defensible — and that body composition and how you feel matter
            more than closing the gap to a specific decimal.
          </p>

          <h2>Reading the four formulas</h2>
          <p>
            Choose metric or imperial units, select your sex, and enter your height. The calculator
            shows the ideal body weight from four established formulas — Robinson, Miller, Devine, and
            Hamwi — alongside the healthy weight range for your height based on BMI. Everything is
            worked out in your browser.
          </p>

          <h2>Why show four formulas?</h2>
          <p>
            &ldquo;Ideal weight&rdquo; is not a single scientific constant. Several formulas exist,
            each built from different populations and originally intended for different uses, so they
            disagree by a few kilograms. Rather than pick one and present it as the truth, this tool
            lays them out together so you can see the sensible range they collectively point to.
          </p>

          <h2>Reading the result sensibly</h2>
          <p>
            Treat these numbers as a reference band, not a target to chase to the decimal. Because the
            formulas rely only on height and sex, they cannot see muscle, frame size, or body
            composition — the same limitation as BMI. If your weight sits within the healthy BMI
            range shown here and you feel well, you are almost certainly fine. For personal goals,
            body composition and fitness are better guides than any single ideal-weight figure, and a
            healthcare professional can give advice tailored to you.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
