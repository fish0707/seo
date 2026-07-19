import Link from 'next/link'
import { Calculator } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

export default function Header() {
  return (
    <header className="border-b border-line sticky top-0 bg-white/90 backdrop-blur z-50">
      <div className="container-page flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Calculator size={20} className="text-brand" />
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/#tools" className="hover:text-ink transition-colors">All Tools</Link>
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
        </nav>
      </div>
    </header>
  )
}
