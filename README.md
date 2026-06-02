# TarotWise — 塔羅智慧

> 隨時隨地抽牌、AI 智慧解牌、記錄心靈軌跡

AI 輔助塔羅占卜 Web 應用，支援多種牌陣、AI 自動解牌、歷史記錄查詢。

## 技術棧

- **框架**：[Next.js](https://nextjs.org/) 16 (App Router) + Turbopack
- **語言**：TypeScript
- **樣式**：Tailwind CSS v4 + `@tailwindcss/typography`
- **AI 解牌**：OpenAI GPT-4o-mini（API 可選，未設定時使用內建牌義）
- **資料儲存**：LocalStorage（上限 200 筆記錄）
- **部署**：Vercel
- **字型**：`Segoe UI` / `Noto Sans TC`，基礎字型 18px（銀髮友善）

## 功能

| 功能 | 狀態 |
|------|------|
| 78 張塔羅牌資料（中英對照 + 關鍵字） | ✅ |
| 隨機抽牌（洗牌邏輯） | ✅ |
| 5 種牌陣：單卡／三張／五張十字／馬蹄鐵七張／凱爾特十字十張 | ✅ |
| 牌陣位置說明標籤 + 示意圖頁面 | ✅ |
| 逐張翻牌機制 + 3D 翻轉動畫 | ✅ |
| 卡牌圖片顯示（DALL-E 3 生成，含 emoji 備援） | ✅ |
| 記錄自動儲存至 LocalStorage（上限 200 筆） | ✅ |
| 歷史記錄列表 + 明細頁面 + 筆記增刪改查 | ✅ |
| 筆記搜尋篩選（關鍵字 + 牌陣類型） | ✅ |
| 筆記匯出（純文字 / Markdown） | ✅ |
| AI 自動解牌（3 種模式） | ✅ |
| 內建 78 張牌義（AI 離線備援） | ✅ |
| 銀髮友善 UI（≥ 18px、≥ 48px 點擊區域） | ✅ |

## 牌陣

| 牌陣 | 張數 | 適用範圍 |
|------|------|----------|
| 單卡占卜 | 1 | 快速指引、每日運勢 |
| 三張牌陣 | 3 | 過去-現在-未來 |
| 五張十字牌陣 | 5 | 挑戰-助力-潛意識-建議-結果 |
| 馬蹄鐵牌陣 | 7 | 一週發展、逐步指引 |
| 凱爾特十字牌陣 | 10 | 人生全局、深度洞悉 |

## AI 解讀

- 三種閱讀模式：**整體解讀**（省 token）／**逐張解讀**／**都要**
- 已讀結果快取，切換模式不重複呼叫
- 支援 Markdown 格式輸出（標題、列表、粗體、表格）
- 自動備援：API 無法連線時顯示內建牌義
- 方向感知：牌陣類型（如十字、馬蹄鐵）會注入提示詞

## 開發

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器（Turbopack）
npm run dev

# 建置正式版本
npm run build

# 程式碼檢查
npm run lint
```

### AI 功能設定（選用）

1. 在根目錄建立 `.env.local`
2. 填入你的 OpenAI API Key：
   ```
   OPENAI_API_KEY=sk-...
   ```
3. 重新啟動開發伺服器即可啟用 AI 解牌

未設定 API Key 時，應用程式會正常運作並使用內建 78 張牌義。

## 部署

```bash
npx vercel --prod --yes
```

環境變數 `OPENAI_API_KEY` 需在 Vercel 專案設定中手動填入。

## 卡牌圖片

專案附有 78 張 DALL-E 3 的 Minions 風格塔羅牌 Prompt 文件，位於 `docs/` 目錄：

- `docs/tarot-card-images-prompt.md` — 卡牌對照表 + Prompt 範本
- `docs/tarot-card-images-dalle-prompts.md` — 78 張完整 Prompt（可直接複製貼到 DALL-E 3）

圖片存放於 `public/cards/`，命名規則 `{id}-{english-name}.jpg`。

## 專案結構

```
src/  ← (實際在根目錄，無 src/ 層)
├── app/
│   ├── page.tsx            # 首頁（抽牌主流程）
│   ├── layout.tsx          # 全域版型（含 Footer）
│   ├── globals.css         # 全域樣式（Tailwind 主題）
│   ├── api/reading/route.ts # AI 解讀 API（GPT-4o-mini）
│   ├── spreads/[type]/page.tsx # 牌陣說明頁（示意圖 + 牌位說明）
│   └── history/
│       ├── page.tsx        # 歷史記錄列表（搜尋、篩選、匯出）
│       └── [id]/page.tsx   # 單筆記錄明細（含筆記區）
├── components/
│   ├── ai-reading.tsx      # AI 解讀面板（3 模式 + 快取）
│   ├── card-display.tsx    # 單張卡片顯示（圖片 + 3D 翻牌）
│   ├── history-card.tsx    # 歷史記錄卡片（含筆記編輯）
│   ├── position-label.tsx  # 牌陣位置標籤
│   ├── spread-selector.tsx # 牌陣選擇器
│   ├── spread-three-card.tsx
│   ├── spread-five-card.tsx
│   ├── spread-horseshoe.tsx
│   └── spread-celtic-cross.tsx
├── data/
│   ├── tarot-cards.ts      # 78 張塔羅牌資料
│   ├── tarot-meanings.ts   # 78 張牌義（AI 備援）
│   └── spreads.ts          # 牌陣定義
├── lib/
│   ├── tarot-reader.ts     # 抽牌邏輯
│   ├── storage.ts          # LocalStorage
│   ├── reading-prompt.ts   # AI 提示詞建構
│   ├── fallback-reading.ts # 備援牌義生成
│   └── get-card-image.ts   # 卡牌圖片路徑查詢
├── types/
│   └── index.ts            # 型別定義
├── docs/
│   ├── tarot-card-images-prompt.md
│   └── tarot-card-images-dalle-prompts.md
└── public/
    └── cards/              # 塔羅牌圖片（DALL-E 3 生成）
```

## 版本

`v0.2.0` — Phase 3：凱爾特十字牌陣 + 日記功能 + 卡牌圖片。詳見 [CHANGELOG](./CHANGELOG.md)。

## 授權

MIT
