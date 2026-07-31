# CalcMate — 全球工具站（AdSense 被動收入計畫）

免費線上計算器集合站。純前端運算、零後端成本，Vercel 免費方案即可營運。

## 技術架構

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- 所有工具皆為純 client-side 運算，無資料庫、無 API 成本
- 完整 SEO + GEO：metadata template、Schema.org（WebApplication / FAQPage / BreadcrumbList）、sitemap、robots（允許 AI 爬蟲）、llms.txt

## 本地開發

```bash
npm install
npm run dev
```

## 部署（Vercel）

1. 推上 GitHub，在 Vercel import 這個 repo（零設定，自動偵測 Next.js）
2. 買好正式網域後：
   - Vercel 專案綁定網域
   - 設定環境變數 `NEXT_PUBLIC_SITE_URL=https://你的網域`（或直接改 `lib/site.ts`）
3. 把 `lib/site.ts` 的 `CONTACT_EMAIL` 換成真實信箱（AdSense 審核需要）

## 新增一個工具（每週例行）

1. 在 `lib/site.ts` 的 `TOOLS` 陣列加一筆（slug、name、description、keywords）
2. 建立 `app/<slug>/Calculator.tsx`（'use client' 互動元件）
3. 建立 `app/<slug>/page.tsx`（metadata + 500–800 字說明 + 5 則 FAQ，套 `ToolShell`）
4. sitemap、首頁列表、footer、llms.txt 的工具清單會自動帶入（llms.txt 需手動補一段）

## 自動化曝光機制

- **IndexNow**：`scripts/indexnow.mjs` 在 `postbuild` 自動跑，於 Vercel production 部署時通知 Bing/DuckDuckGo/Seznam 收錄。金鑰檔在 `public/6563d2b1301b566a4f89d42d74e5c21a.txt`。
- **動態 OG 圖**：`app/og/route.tsx` 依 `?title=` 產生分享預覽圖。
- **Vercel Analytics**：`app/layout.tsx` 掛載 `<Analytics />`（cookieless，隱私政策已據實揭露）。需到 Vercel 專案 → Analytics 分頁按 Enable 才會開始收集數據。
- 推廣素材（目錄站提交清單、文案）見 `PROMOTION.md`。

## AdSense 上線清單

- [ ] 15–20 個品質工具頁
- [ ] 正式網域已綁定（vercel.app 子網域無法過審）
- [ ] CONTACT_EMAIL 已換成真實信箱
- [ ] Google Search Console 已提交 sitemap、頁面已被索引
- [ ] 申請 AdSense → 過審後把 AdSense script 貼進 `app/layout.tsx`（已留註解位置）
- [ ] 過審後在 `public/ads.txt` 放入 Google 給的 publisher ID

## 每週經營循環（5–10 小時）

1. 看 GSC：有曝光沒點擊的關鍵字 → 優化該頁 title
2. 排名 5–20 的頁面 → 加強內容與內部連結
3. 新增 2–4 個工具頁（跟著 GSC 關鍵字方向）
4. 提交工具目錄站、論壇回答附連結（反向連結）
5. 月度檢視：頁面數、瀏覽量、RPM、日收
