# CalcMate — 曝光與流量素材包

網站本身的自動化曝光機制已內建(見下方「已自動化」)。但**反向連結(backlinks)無法、也不該完全自動化** —— 論壇/Reddit 自動發文會違反平台規則、傷網域信譽。這份文件是「複製貼上就能提交」的素材,你任何時候有 30 分鐘就能做一輪,一次做完可管很久。

---

## 已自動化(你不用做)

| 機制 | 作用 | 位置 |
|------|------|------|
| **sitemap.xml** | Google/Bing 探索全站頁面 | 自動,已提交 GSC |
| **IndexNow** | 每次部署自動通知 Bing/DuckDuckGo/Seznam/Yandex 收錄 | `scripts/indexnow.mjs`(build 後自動跑) |
| **程式化長尾頁** | 112 個 `/convert/*` 頁搶「cm to inches」類高量長尾字 | `app/convert/` |
| **動態 OG 圖** | 連結被分享時顯示專業預覽卡,提高點閱 | `app/og/route.tsx` |
| **llms.txt + robots 放行 AI 爬蟲** | 被 ChatGPT/Perplexity/Claude 等引用(GEO) | `public/llms.txt`, `app/robots.ts` |

---

## 要你手動做的:提交到免費目錄站(一次 ~30 分鐘)

每個站填:網站名 `CalcMate`、網址 `https://calc-mates.com`、下方描述、分類選 Tools / Calculators / Utilities。

**描述(短,60 字內):**
> Free online calculators and unit converters — no signup, instant results.

**描述(長,160 字內):**
> CalcMate is a free collection of 29+ online calculators and unit converters for everyday life: age, percentage, BMI, loan, mortgage, tip, and more, plus instant length, weight, speed, and temperature conversions. Every tool runs in your browser with no signup and no data collection.

**目錄站清單(免費、對工具站友善):**

1. **AlternativeTo** — https://alternativeto.net (登入後 Add Application)
2. **Product Hunt** — https://producthunt.com (可發一次 launch,流量爆發點)
3. **SaaSHub** — https://www.saashub.com/submit
4. **ToolPilot / There's An AI For That 類工具目錄**(搜 "submit tool directory")
5. **Awesome-* GitHub 清單** — 搜 `awesome calculators` / `awesome tools`,發 PR 加你的站
6. **Reddit(手動、真誠參與,勿灌水)** — r/InternetIsBeautiful、r/webdev 的 showoff、r/coolgithubprojects
7. **Hacker News** — Show HN(標題:`Show HN: CalcMate – free calculators and unit converters`)
8. **Indie Hackers** — 發一篇 build in public 貼文
9. **Google Business / 一般 web 目錄** — 若適用
10. **相關問答**:Quora / StackExchange 遇到相關問題時,真誠回答並附連結(勿硬塞)

> ⚠️ 原則:每個平台都「先給價值、再附連結」。目錄提交是白帽;論壇/社群請真誠參與,不要複製貼上洗連結,否則反效果。

---

## 每月 5 分鐘檢查(選做)

1. GSC → 成效:看哪些關鍵字有「曝光但排名 5~20」→ 那頁最有機會,優化 title
2. GSC → 網頁:看「已建立索引」數字成長
3. Bing Webmaster Tools(可另外註冊,IndexNow 已在推)看 Bing 收錄
