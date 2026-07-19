import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from '@/lib/site'
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
      </main>
      <Footer />
    </div>
  )
}
