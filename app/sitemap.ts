import { MetadataRoute } from 'next'
import { SITE_URL, TOOLS, toolUrl } from '@/lib/site'
import { CONVERSION_PAIRS } from '@/lib/conversions'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const toolUrls: MetadataRoute.Sitemap = TOOLS.map(t => ({
    url: toolUrl(t.slug),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const convertUrls: MetadataRoute.Sitemap = CONVERSION_PAIRS.map(p => ({
    url: `${SITE_URL}/convert/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = ['about', 'contact', 'privacy', 'terms'].map(p => ({
    url: `${SITE_URL}/${p}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  }))

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/convert`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...toolUrls,
    ...convertUrls,
    ...staticUrls,
  ]
}
