import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['ClaudeBot', 'anthropic-ai', 'Claude-User'], allow: '/' },
      { userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'], allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: ['Googlebot-Extended', 'Google-Extended'], allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
