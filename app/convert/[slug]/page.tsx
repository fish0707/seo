import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  CONVERSION_PAIRS, getPair, reversePair, convert, linearFactor, pairFormula, pairH1,
  fmtConv, popularPairsFor, pairsFromUnit, type ConvPair,
} from '@/lib/conversions'
import { PairLink } from '@/components/ConversionLinks'
import MiniConverter from './MiniConverter'

export function generateStaticParams() {
  return CONVERSION_PAIRS.map(p => ({ slug: p.slug }))
}

const convUrl = (slug: string) => `${SITE_URL}/convert/${slug}`

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPair(params.slug)
  if (!p) return {}
  const title = `${p.from.titleName} to ${p.to.titleName} — Convert ${p.from.plural} to ${p.to.plural}`
  const example = convert(p.category.exampleValue, p.from, p.to)
  const description = `Convert ${p.from.plural} to ${p.to.plural} instantly. ${fmtConv(p.category.exampleValue)} ${p.from.symbol} = ${fmtConv(example)} ${p.to.symbol}. Free ${p.from.name.toLowerCase()} to ${p.to.name.toLowerCase()} converter with a conversion table and formula.`
  return {
    title,
    description,
    alternates: { canonical: convUrl(p.slug) },
    openGraph: {
      title: pairH1(p),
      description,
      url: convUrl(p.slug),
      images: [{ url: `/og?title=${encodeURIComponent(pairH1(p))}` }],
    },
  }
}

function tableRows(p: ConvPair) {
  const values = p.from.tableValues ?? p.category.tableValues
  return values.map(v => ({ from: v, to: convert(v, p.from, p.to) }))
}

function faqs(p: ConvPair) {
  const one = convert(1, p.from, p.to)
  const example = convert(p.category.exampleValue, p.from, p.to)
  const rev = reversePair(p)
  const formula = pairFormula(p)
  const list = [
    {
      q: `How do I convert ${p.from.plural} to ${p.to.plural}?`,
      a: `Use the formula ${formula}. For example, ${fmtConv(p.category.exampleValue)} ${p.from.symbol} equals ${fmtConv(example)} ${p.to.symbol}. Just enter your value in the converter above to get an instant result.`,
    },
    {
      q: `What is 1 ${p.from.name.toLowerCase()} in ${p.to.plural}?`,
      a: `1 ${p.from.symbol} = ${fmtConv(one)} ${p.to.symbol}. You can multiply any number of ${p.from.plural} by this figure to convert it, or use the calculator above for exact results.`,
    },
    {
      q: `How do I convert ${p.to.plural} back to ${p.from.plural}?`,
      a: `Use the reverse conversion: 1 ${p.to.symbol} = ${fmtConv(convert(1, p.to, p.from))} ${p.from.symbol}. Our ${rev.from.titleName} to ${rev.to.titleName} converter does this for you.`,
    },
  ]
  return list
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = getPair(params.slug)
  if (!p) notFound()

  const rows = tableRows(p)
  const rev = reversePair(p)
  // Sibling pairs sharing this source unit — the main internal-link mesh, so
  // every pair page (not just the hand-picked popular ones) has many entries.
  const siblings = pairsFromUnit(p.category.key, p.from.slug).filter(s => s.slug !== p.slug)
  const related = popularPairsFor(p.category.key)
    .filter(r => r.slug !== p.slug && r.slug !== rev.slug && !siblings.some(s => s.slug === r.slug))
    .slice(0, 4)
  const fq = faqs(p)
  const factor = linearFactor(p)
  const example = convert(p.category.exampleValue, p.from, p.to)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Converters', item: `${SITE_URL}/convert` },
        { '@type': 'ListItem', position: 3, name: pairH1(p), item: convUrl(p.slug) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: fq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 container-page py-8">
        <nav className="flex items-center gap-1 text-xs text-muted mb-4 flex-wrap">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/convert" className="hover:text-ink transition-colors">Converters</Link>
          <ChevronRight size={12} />
          <span className="text-ink">{p.from.titleName} to {p.to.titleName}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">{pairH1(p)}</h1>
        <p className="text-muted mb-6">
          Convert {p.from.plural} to {p.to.plural} instantly. {fmtConv(p.category.exampleValue)} {p.from.symbol} = {fmtConv(example)} {p.to.symbol}.
        </p>

        <MiniConverter slug={p.slug} />

        <article className="prose-tool mt-10">
          <h2>How to convert {p.from.plural} to {p.to.plural}</h2>
          <p>
            To convert {p.from.plural} to {p.to.plural}, use the formula <strong>{pairFormula(p)}</strong>.
            {factor != null ? (
              <> In other words, multiply the number of {p.from.plural} by {fmtConv(factor)} to get the equivalent in {p.to.plural}.</>
            ) : (
              <> Temperature scales do not share a zero point, so the conversion uses this exact formula rather than a single multiplier.</>
            )}
            {' '}For example, {fmtConv(p.category.exampleValue)} {p.from.symbol} equals {fmtConv(example)} {p.to.symbol}.
          </p>

          <h2>{p.from.titleName} to {p.to.titleName} conversion table</h2>
        </article>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-line rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-2.5 font-semibold">{p.from.titleName} ({p.from.symbol})</th>
                <th className="px-4 py-2.5 font-semibold">{p.to.titleName} ({p.to.symbol})</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={i % 2 ? 'bg-surface/50' : ''}>
                  <td className="px-4 py-2 border-t border-line">{fmtConv(r.from)} {p.from.symbol}</td>
                  <td className="px-4 py-2 border-t border-line">{fmtConv(r.to)} {p.to.symbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <article className="prose-tool mt-10">
          <h2>{p.from.name} and {p.to.name}</h2>
          <p>
            The {p.from.name.toLowerCase()} ({p.from.symbol}) and the {p.to.name.toLowerCase()} ({p.to.symbol}) are both
            units of {p.category.name.toLowerCase()}. This page gives you an instant, exact conversion between them, a
            reference table for the most common values, and the underlying formula so you can check the maths yourself.
            All calculations run in your browser — nothing you type is sent anywhere.
          </p>
          <p>
            Need to go the other way? Use the{' '}
            <Link href={`/convert/${rev.slug}`} className="text-brand hover:underline">{rev.from.titleName} to {rev.to.titleName} converter</Link>.
            For all units at once, try the full{' '}
            <Link href={`/${p.category.toolSlug}`} className="text-brand hover:underline">{p.category.toolName}</Link>.
          </p>
        </article>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {fq.map(f => (
              <details key={f.q} className="card !p-0 overflow-hidden">
                <summary className="cursor-pointer px-5 py-3.5 font-medium text-[15px] hover:bg-surface transition-colors">{f.q}</summary>
                <p className="px-5 pb-4 text-[15px] text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Convert {p.from.plural} to other units</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {siblings.map(s => (
                <PairLink key={s.slug} pair={s} />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Popular {p.category.name} Conversions</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/convert/${r.slug}`} className="card hover:border-brand transition-colors !p-4">
                  <p className="font-medium">{r.from.titleName} to {r.to.titleName}</p>
                  <p className="text-sm text-muted mt-1">1 {r.from.symbol} = {fmtConv(convert(1, r.from, r.to))} {r.to.symbol}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
