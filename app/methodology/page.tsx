import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, PUBLISHER } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RefTable } from '@/components/content'

export const metadata: Metadata = {
  title: 'Methodology',
  description: `Where each ${SITE_NAME} formula comes from, how results are verified, and the rounding and edge-case rules every calculator follows.`,
  alternates: { canonical: `${SITE_URL}/methodology` },
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-2">Methodology</h1>
        <p className="text-sm text-muted">
          How the numbers on this site are produced, and what to distrust about them.
        </p>

        <h2>Where the formulas come from</h2>
        <p>
          Nothing here is invented. Every calculator implements either standard arithmetic or a
          published equation, and where a tool depends on someone else&rsquo;s research or on
          official thresholds, the reference is listed at the bottom of that tool&rsquo;s page.
        </p>

        <RefTable
          caption="Non-obvious formulas and their origin"
          head={['Calculator', 'Method', 'Origin']}
          rows={[
            ['BMI', 'kg ÷ m²; category bands', 'World Health Organization'],
            ['Calorie (TDEE)', 'Mifflin-St Jeor BMR × activity factor', 'Mifflin & St Jeor, 1990'],
            ['Calories burned', 'MET × kg × hours', 'Compendium of Physical Activities, 2011'],
            ['Body fat', 'U.S. Navy circumference method', 'Hodgdon & Beckett, 1984'],
            ['Ideal weight', 'Robinson, Miller, Devine, Hamwi', 'Published 1964–1983'],
            ['Due date', 'Naegele’s rule, cycle-adjusted', 'ACOG dating guidance'],
            ['Loan / mortgage', 'Amortization: P·i ÷ (1 − (1+i)⁻ⁿ)', 'Standard finance'],
            ['Compound interest', 'A = P(1 + r/n)^(nt) + series FV', 'Standard finance'],
            ['Unit conversions', 'Exact SI definitions', '1 in = 2.54 cm exactly (1959)'],
          ]}
        />

        <h2>How results are verified</h2>
        <p>
          A calculator that checks its own work proves nothing. Before a tool ships, its outputs are
          compared against worked examples computed independently of the site&rsquo;s source code,
          using the published formula directly. Where a figure appears in the written explanation on
          a page — a payment schedule, a conversion table, a growth projection — that figure is
          produced the same way rather than typed from memory.
        </p>
        <p>
          This process catches real mistakes. During one content revision it flagged that a claimed
          amortization crossover point was wrong by a year, that a stacked discount example overstated
          the effective saving, and that a VAT reversal error had been described in the wrong
          direction. All three were corrected before publication.
        </p>

        <h2>Rounding and display</h2>
        <p>
          Calculations are performed at full floating-point precision and rounded only for display,
          so intermediate steps never accumulate rounding error. Currency figures show two decimal
          places. Unit conversions show up to seven significant digits and switch to scientific
          notation beyond roughly 10¹⁵ or below 10⁻⁶, where a plain decimal would be unreadable.
        </p>

        <h2>Edge cases we handle explicitly</h2>
        <ul className="list-disc list-inside space-y-1.5 marker:text-muted">
          <li>Leap years and real calendar month lengths, rather than assuming 30-day months</li>
          <li>Shifts that cross midnight, which naive subtraction reports as negative</li>
          <li>Zero denominators and percentage change from a base of zero, which are undefined</li>
          <li>Temperature scales that do not share a zero point, so conversion is not a single factor</li>
          <li>Interest at a 0% rate, where the standard amortization formula divides by zero</li>
        </ul>

        <h2>What these tools are not</h2>
        <p>
          The health calculators implement screening formulas, not diagnoses. BMI cannot distinguish
          muscle from fat; body fat estimated from a tape measure carries a margin of several
          percentage points; a due date is an estimate that only about 4% of births actually land on.
          The finance calculators assume fixed rates and exclude fees, taxes, and insurance unless a
          field explicitly asks for them, so a lender&rsquo;s formal quote will differ.
        </p>
        <p>
          Where a result would influence a medical or financial decision, treat it as preparation for
          a conversation with a professional rather than a substitute for one.
        </p>

        <h2>Corrections</h2>
        <p>
          If a formula, threshold, or worked example here is wrong, we want to know and will fix it.
          Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>{' '}
          with the tool, the inputs, and — if you have one — the source you believe is correct.
          {SITE_NAME} is maintained by{' '}
          <a href={PUBLISHER.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            {PUBLISHER.name}
          </a>{' '}
          in {PUBLISHER.location}; more about who that is on the{' '}
          <Link href="/about" className="text-brand hover:underline">about page</Link>.
        </p>
      </main>
      <Footer />
    </div>
  )
}
