import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, PUBLISHER } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${SITE_NAME} — report a bug, suggest a calculator, or ask a question.`,
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-6">Contact</h1>
        <p>
          Found a bug, want to suggest a new calculator, or have a question about how a result is
          calculated? We read every message.
        </p>
        <div className="card flex items-center gap-3 not-prose my-6">
          <Mail size={20} className="text-brand shrink-0" />
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline font-medium">
            {CONTACT_EMAIL}
          </a>
        </div>
        <p>
          When reporting a calculation issue, please include the exact inputs you used and the
          result you expected — that makes it much faster to reproduce and fix.
        </p>

        <h2>Who you are writing to</h2>
        <p>
          {SITE_NAME} is built and maintained by{' '}
          <a href={PUBLISHER.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            {PUBLISHER.name}
          </a>{' '}
          ({PUBLISHER.legalName}), a web design and CRM consultancy in {PUBLISHER.location}. Messages
          go to {PUBLISHER.founder} ({PUBLISHER.founderAlias}), who maintains the site — not to a
          ticket queue.
        </p>
        <p>
          Replies usually come within a few business days. Corrections to a formula or a stated
          threshold get priority over everything else; if you can point at the source you believe is
          right, even better. More about how the tools are built and checked is on the{' '}
          <Link href="/about" className="text-brand hover:underline">about page</Link>.
        </p>
      </main>
      <Footer />
    </div>
  )
}
