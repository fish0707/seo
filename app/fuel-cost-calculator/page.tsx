import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq } from '@/components/ToolShell'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'fuel-cost-calculator')!

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator — Cost of a Trip by Car',
  description:
    'Free fuel cost calculator. Enter your trip distance, fuel economy, and fuel price to get the total cost of driving, in metric or imperial units.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Fuel Cost Calculator — Cost of a Trip by Car',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How do I calculate the fuel cost of a trip?',
    a: 'Work out how much fuel the trip uses, then multiply by the fuel price. In metric: fuel = distance ÷ 100 × (L/100km), then cost = fuel × price per litre. In imperial: fuel = distance ÷ mpg, then cost = fuel × price per gallon. This calculator does both.',
  },
  {
    q: 'What is the difference between L/100km and mpg?',
    a: 'They measure the same thing in opposite directions. Litres per 100 km is fuel used for a fixed distance, so lower is better. Miles per gallon is distance covered per unit of fuel, so higher is better. Switch the units toggle to use whichever your car reports.',
  },
  {
    q: 'Where do I find my car’s fuel economy?',
    a: 'Your car’s trip computer usually shows average consumption, or you can check the manufacturer’s figure. For a real-world number, fill the tank, drive normally, refill, and divide the fuel added by the distance travelled. Real economy is often a little worse than the official rating.',
  },
  {
    q: 'Why is my real fuel economy worse than the official figure?',
    a: 'Official ratings come from standardized lab tests. City driving, cold weather, air conditioning, roof racks, heavy loads, high speeds, and aggressive acceleration all increase consumption. Using your own measured economy gives a far more accurate trip cost than the sticker figure.',
  },
  {
    q: 'How can I reduce my fuel cost?',
    a: 'Smoother driving, keeping tyres properly inflated, removing unnecessary weight and roof boxes, and easing off at high speeds all help. Over a long trip, even a small improvement in economy adds up. The calculator lets you test how much a better economy figure changes the total.',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      article={
        <>
          <h2>How to use the fuel cost calculator</h2>
          <p>
            Choose metric or imperial units, then enter your trip distance, your vehicle&rsquo;s fuel
            economy, and the current fuel price. The calculator returns the total cost of the trip,
            how much fuel it uses, and the cost per kilometre or mile. Everything is worked out in your
            browser.
          </p>

          <h2>Planning trips and splitting costs</h2>
          <p>
            Knowing the fuel cost up front is handy for budgeting a road trip, deciding between
            driving and other transport, or working out a fair share when carpooling. Because the tool
            also shows cost per kilometre or mile, you can quickly scale it to any journey or compare
            the running cost of two different vehicles.
          </p>

          <h2>Use your real economy for a real answer</h2>
          <p>
            The single biggest factor in accuracy is the fuel economy figure you enter. Manufacturer
            ratings are measured in ideal lab conditions and rarely match everyday driving, so a
            number from your own car&rsquo;s trip computer — or one you measure at the pump — will give
            a far more realistic cost. Try entering both your city and highway economy to see how much
            your driving conditions change the bottom line. Nothing you enter is stored.
          </p>
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
