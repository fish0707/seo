import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms of use for ${SITE_NAME}: acceptable use, accuracy disclaimer, and limitation of liability.`,
  alternates: { canonical: `${SITE_URL}/terms` },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-2">Terms of Use</h1>
        <p className="text-sm text-muted">Last updated: July 2026</p>

        <h2>Acceptance of terms</h2>
        <p>
          By using {SITE_NAME}, you agree to these terms. If you do not agree, please do not use
          the site.
        </p>

        <h2>Use of the calculators</h2>
        <p>
          All tools on this site are free for personal and commercial use. You may link to any page
          on this site. You may not scrape, republish, or redistribute the site&apos;s content or
          code as your own.
        </p>

        <h2>Accuracy disclaimer</h2>
        <p>
          We work hard to make every calculator accurate, and each tool documents the method it
          uses. However, the results are provided &quot;as is&quot; for general informational
          purposes only. They are not financial, legal, medical, or professional advice. Always
          verify results independently before relying on them for important decisions.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE_NAME} and its operators shall not be liable
          for any damages arising from the use of, or inability to use, this site or its tools.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes are
          posted constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </main>
      <Footer />
    </div>
  )
}
