import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CATEGORIES, CONVERSION_PAIRS, convert, fmtConv } from '@/lib/conversions'

export const metadata: Metadata = {
  title: 'Unit Converters — Length, Weight, Speed & Temperature',
  description:
    'Free unit converters for length, weight, speed, and temperature. Instant, exact conversions between every unit pair, each with a conversion table and formula.',
  alternates: { canonical: `${SITE_URL}/convert` },
  openGraph: {
    title: 'Unit Converters — Length, Weight, Speed & Temperature',
    description: 'Instant, exact conversions between every unit pair, each with a conversion table and formula.',
    url: `${SITE_URL}/convert`,
    images: [{ url: '/og?title=Unit%20Converters' }],
  },
}

export default function ConvertHub() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-8">
        <nav className="flex items-center gap-1 text-xs text-muted mb-4">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink">Converters</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Unit Converters</h1>
        <p className="text-muted mb-8">
          Instant, exact conversions between {CONVERSION_PAIRS.length} unit pairs across length, weight, speed, and
          temperature. Every page includes a live converter, a conversion table, and the formula.
        </p>

        {CATEGORIES.map(cat => {
          const pairs = cat.units.flatMap(from =>
            cat.units.filter(to => to !== from).map(to => ({ from, to })),
          )
          return (
            <section key={cat.key} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{cat.name}</h2>
                <Link href={`/${cat.toolSlug}`} className="text-sm text-brand hover:underline">
                  Full {cat.toolName} →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {pairs.map(({ from, to }) => (
                  <Link
                    key={`${from.slug}-${to.slug}`}
                    href={`/convert/${from.slug}-to-${to.slug}`}
                    className="px-3 py-2 rounded-lg border border-line hover:border-brand hover:bg-surface transition-colors text-sm"
                  >
                    <span className="font-medium">{from.titleName} → {to.titleName}</span>
                    <span className="text-muted block text-xs mt-0.5">
                      1 {from.symbol} = {fmtConv(convert(1, from, to))} {to.symbol}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
