# CalcMate

Free online calculators for everyday life — age, BMI, loan and mortgage payments, compound interest, unit conversions, and more. No signup, no login wall, everything runs client-side in your browser.

**Live site:** https://calc-mates.com

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Every calculator is pure client-side computation — no database, no backend API
- Each tool page includes the underlying formula, a worked example, and cited sources where the calculation is based on a published standard (see `/methodology`)
- Full technical SEO: metadata templates, Schema.org (`WebApplication` / `FAQPage` / `BreadcrumbList`), sitemap, robots.txt (AI crawlers allowed), `llms.txt`

## Local development

```bash
npm install
npm run dev
```

## Deploying your own copy

1. Push to GitHub, import the repo in Vercel (zero-config, auto-detects Next.js)
2. Point a real domain at it and set `NEXT_PUBLIC_SITE_URL` (or edit `lib/site.ts` directly)
3. Update `CONTACT_EMAIL` in `lib/site.ts`

## Adding a calculator

1. Add an entry to the `TOOLS` array in `lib/site.ts` (slug, name, description, keywords)
2. Create `app/<slug>/Calculator.tsx` (a `'use client'` interactive widget)
3. Create `app/<slug>/page.tsx` — metadata, prose content, an FAQ block, wrapped in `ToolShell`
4. Sitemap, homepage listing, and footer pick up the new tool automatically from the `TOOLS` array

## Built-in distribution mechanics

- **IndexNow** — `scripts/indexnow.mjs` runs in `postbuild` and notifies Bing/DuckDuckGo/Seznam on every production deploy
- **Dynamic OG images** — `app/og/route.tsx` generates a share preview card per page
- **Vercel Analytics** — cookieless, declared in the privacy policy

## Who built this

[Digimate](https://www.digimate.tw), a web design and CRM consultancy based in Taichung, Taiwan.
