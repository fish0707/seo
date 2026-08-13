import Link from 'next/link'
import { SITE_NAME, TOOLS, PUBLISHER } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-16 py-10 text-sm text-muted">
      <div className="container-page space-y-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {TOOLS.map(t => (
            <Link key={t.slug} href={`/${t.slug}`} className="hover:text-ink transition-colors">
              {t.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
          <Link href="/methodology" className="hover:text-ink transition-colors">Methodology</Link>
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink transition-colors">Terms of Use</Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-4 border-t border-line text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All calculations run in your browser — we never store your data.</p>
          <p>
            Built and maintained by{' '}
            <a href={PUBLISHER.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors underline underline-offset-2">
              {PUBLISHER.name}
            </a>{' '}
            in {PUBLISHER.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
