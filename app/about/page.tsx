import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, PUBLISHER, TOOLS } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About',
  description: `Who builds ${SITE_NAME}, why it exists, and how each calculator is checked before it ships.`,
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-2">About {SITE_NAME}</h1>
        <p className="text-sm text-muted">
          {TOOLS.length} free calculators, built and maintained in Taichung, Taiwan.
        </p>

        <h2>Who makes this</h2>
        <p>
          {SITE_NAME} is built and maintained by{' '}
          <a href={PUBLISHER.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            {PUBLISHER.name}
          </a>{' '}
          ({PUBLISHER.legalName}), a small web design and CRM consultancy based in{' '}
          {PUBLISHER.location}. Our day job is building websites and streamlining business processes
          for clients — which is where these calculators came from.
        </p>
        <p>
          The site is run by {PUBLISHER.founder}, who goes by {PUBLISHER.founderAlias}. If something
          here is wrong, unclear, or missing, it lands in one inbox and one person answers it:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>.
        </p>

        <h2>Why it exists</h2>
        <p>
          These started as internal tools. Client work throws up the same small calculations over and
          over — working out a percentage change for a report, checking how a loan term affects total
          cost, converting units for a spec — and we kept rebuilding them or hunting for a page that
          would answer the question without three popups and a newsletter prompt.
        </p>
        <p>
          Enough people asked for access that publishing them properly made more sense than sending
          links to half-finished internal pages. That is the whole origin story. There is no growth
          plan behind it beyond keeping the tools accurate and adding ones we actually need.
        </p>

        <h2>How each calculator is checked</h2>
        <p>
          Every tool here runs entirely in your browser, so the arithmetic is visible and verifiable
          rather than hidden behind an API. Before a calculator ships, it goes through the same three
          steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 marker:text-muted">
          <li>
            <strong className="text-ink">The formula is taken from a published source</strong>, not
            reconstructed from memory. Where a tool relies on established thresholds or an academic
            equation — the WHO&rsquo;s BMI bands, the Mifflin-St Jeor equation, ACOG&rsquo;s dating
            guidance — the reference is listed at the bottom of that tool&rsquo;s page so you can
            check it yourself.
          </li>
          <li>
            <strong className="text-ink">Outputs are verified against worked examples</strong>{' '}
            computed independently of the site&rsquo;s own code, so a bug in the implementation
            cannot quietly validate itself.
          </li>
          <li>
            <strong className="text-ink">Edge cases are handled explicitly</strong> rather than left
            to produce nonsense: leap years, real calendar month lengths, zero denominators,
            overnight shifts that cross midnight, and temperature scales that do not share a zero
            point.
          </li>
        </ol>

        <h2>What we will not do</h2>
        <p>
          No accounts, no signup walls, and no interstitials between you and the answer. Nothing you
          type into a calculator is transmitted, logged, or stored — it never leaves your device,
          which you can confirm in the{' '}
          <Link href="/privacy" className="text-brand hover:underline">privacy policy</Link>.
        </p>
        <p>
          The health and finance tools are informational. They implement well-documented formulas
          accurately, but a formula is not a diagnosis and not financial advice. For decisions that
          matter, the number here is a starting point for a conversation with a professional, not a
          replacement for one.
        </p>

        <h2>Corrections</h2>
        <p>
          If you find an error, tell us and it gets fixed — accuracy is the only thing this site has
          going for it. Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>{' '}
          with the tool and the inputs you used, and you will get a reply from a person.
        </p>
      </main>
      <Footer />
    </div>
  )
}
