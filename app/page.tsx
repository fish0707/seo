import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_NAME, SITE_TAGLINE, TOOLS } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-page pt-16 pb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{SITE_TAGLINE}</h1>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            {SITE_NAME} is a growing collection of free, fast, and accurate calculators.
            Everything runs instantly in your browser — no signup, no data collection.
          </p>
        </section>

        <section id="tools" className="container-page pb-8">
          <h2 className="text-xl font-semibold mb-4">All Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOOLS.map(t => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="card hover:border-brand transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <ArrowRight size={18} className="text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-sm text-muted mt-2">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-page py-8 prose-tool">
          <h2>Why {SITE_NAME}?</h2>
          <p>
            Most calculator sites bury the answer under popups and clutter. {SITE_NAME} does the
            opposite: each tool loads instantly, works entirely in your browser, and gives you the
            answer with a clear explanation of how it was calculated. Nothing you type is ever sent
            to a server or stored.
          </p>
          <p>
            New calculators are added regularly. If there is a tool you would like to see,{' '}
            <Link href="/contact" className="text-brand hover:underline">let us know</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
