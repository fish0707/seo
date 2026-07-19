import Link from 'next/link'
import { SITE_NAME, TOOLS } from '@/lib/site'

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
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink transition-colors">Terms of Use</Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-4 border-t border-line text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All calculations run in your browser — we never store your data.</p>
          <p>
            Site by{' '}
            <a href="https://www.digimate.tw" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              Digimate
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
