import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_NAME, SITE_URL, TOOLS, toolUrl, type Tool } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export type Faq = { q: string; a: string }

// Wraps every tool page: breadcrumb + H1 + tool widget + prose content + FAQ,
// and emits WebApplication / BreadcrumbList / FAQPage JSON-LD for the page.
export default function ToolShell({
  tool,
  faqs,
  children,
  article,
}: {
  tool: Tool
  faqs: Faq[]
  children: React.ReactNode // the interactive calculator widget
  article: React.ReactNode  // the supporting prose content
}) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      url: toolUrl(tool.slug),
      description: tool.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: tool.name, item: toolUrl(tool.slug) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  const related = TOOLS.filter(t => t.slug !== tool.slug)

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 container-page py-8">
        <nav className="flex items-center gap-1 text-xs text-muted mb-4">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink">{tool.name}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
        <p className="text-muted mb-6">{tool.description}</p>

        {children}

        <article className="prose-tool mt-10">{article}</article>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="card !p-0 overflow-hidden">
                <summary className="cursor-pointer px-5 py-3.5 font-medium text-[15px] hover:bg-surface transition-colors">
                  {f.q}
                </summary>
                <p className="px-5 pb-4 text-[15px] text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">More Free Calculators</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map(t => (
              <Link key={t.slug} href={`/${t.slug}`} className="card hover:border-brand transition-colors !p-4">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted mt-1 line-clamp-2">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
