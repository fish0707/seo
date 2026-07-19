import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} handles data: what we collect, what we never collect, cookies, and third-party advertising.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page py-10 prose-tool">
        <h1 className="text-3xl font-bold text-ink mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated: July 2026</p>

        <h2>What we do not collect</h2>
        <p>
          Everything you type into a calculator on {SITE_NAME} — dates, numbers, any input — is
          processed entirely in your browser. It is never transmitted to our servers, stored, or
          shared with anyone. We have no accounts, no signups, and no forms that collect personal
          information.
        </p>

        <h2>Analytics</h2>
        <p>
          We use privacy-respecting, aggregate analytics to understand which tools are used and how
          often (for example, page view counts and country-level location derived from anonymized
          data). This data cannot be used to identify you.
        </p>

        <h2>Advertising and cookies</h2>
        <p>
          This site may display advertisements served by Google AdSense. Google and its partners
          may use cookies to serve ads based on your prior visits to this or other websites. You
          can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          . Third-party vendors&apos; use of cookies is governed by their own privacy policies. For
          more information on how Google uses data, see{' '}
          <a href="https://policies.google.com/technologies/partner-sites" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>
          .
        </p>

        <h2>Your choices</h2>
        <p>
          You can block cookies entirely in your browser settings — every calculator on this site
          will continue to work normally, because none of them depend on cookies.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </main>
      <Footer />
    </div>
  )
}
