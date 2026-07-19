import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL, TOOLS } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About',
  description: `What ${SITE_NAME} is, how the calculators work, and the principles behind the site.`,
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-6">About {SITE_NAME}</h1>
        <p>
          {SITE_NAME} is a collection of free online calculators built around one idea: when you
          need a quick answer, you should get it immediately — without popups, signups, or wading
          through paragraphs of filler to find the tool.
        </p>
        <h2>How the tools work</h2>
        <p>
          Every calculator on this site runs entirely in your browser. When you type a date or a
          number, the calculation happens on your device using JavaScript — nothing is transmitted
          to a server, logged, or stored. That is also why the tools feel instant: there is no
          round-trip to wait for.
        </p>
        <h2>Accuracy</h2>
        <p>
          Each tool documents the exact method and formula it uses, and edge cases (leap years,
          month lengths, zero denominators) are handled explicitly. If you ever get a result that
          looks wrong, please <Link href="/contact" className="text-brand hover:underline">tell us</Link> —
          reports like that are how the tools improve.
        </p>
        <h2>Current tools</h2>
        <ul className="list-disc pl-5 space-y-1">
          {TOOLS.map(t => (
            <li key={t.slug}>
              <Link href={`/${t.slug}`} className="text-brand hover:underline">{t.name}</Link>
              {' — '}{t.description}
            </li>
          ))}
        </ul>
        <p>
          New calculators are added regularly based on what visitors ask for.
        </p>
      </main>
      <Footer />
    </div>
  )
}
