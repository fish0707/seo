import { MetadataRoute } from 'next'
import { SITE_URL, TOOLS, toolUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls: MetadataRoute.Sitemap = TOOLS.map(t => ({
    url: toolUrl(t.slug),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const staticUrls: MetadataRoute.Sitemap = ['about', 'contact', 'privacy', 'terms'].map(p => ({
    url: `${SITE_URL}/${p}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...toolUrls,
    ...staticUrls,
  ]
}
