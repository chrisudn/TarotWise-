# TarotWise — Technical Specification

> 版本：v1.0 | 最後更新：2026-06-02
> 適用範圍：Phase 1 MVP

---

## 1. 技術棧

| 層面 | 技術 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js 15 (App Router) | 15.x | React 全端框架 |
| 語言 | TypeScript | 5.x | 型別安全 |
| CSS | Tailwind CSS | 3.x | 響應式設計 + 大字型主題 |
| 部署 | Vercel | - | 自動部署 |
| 儲存 | Web LocalStorage | - | MVP 階段資料儲存 |

### 為何選擇 Next.js App Router

1. **Vercel 原生最佳化**：自動部署、CDN、Image Optimization
2. **Server / Client Component**：靜態牌義資料用 Server Component，互動用 Client Component
3. **API Routes**：Phase 2 可直接開 API Route 接 AI，不需額外架設後端
4. **Layout System**：共用 header/footer 方便

---

## 2. 目錄結構

```
tarotwise/
├── app/
│   ├── layout.tsx          # Root layout（全域字型、font-size 設定）
│   ├── page.tsx            # 首頁（抽牌入口 + 模式選擇）
│   ├── reading/
│   │   └── [id]/
│   │       └── page.tsx    # 抽牌結果頁
│   ├── history/
│   │   ├── page.tsx        # 歷史記錄列表
│   │   └── [id]/
│   │       └── page.tsx    # 單筆記錄詳情
│   └── globals.css         # 全域樣式 + 大字型 token
├── components/
│   ├── card-display.tsx    # 單張牌面顯示（牌名 + 關鍵字 + emoji）
│   ├── spread-selector.tsx # 牌陣選擇器（單卡 / 三張）
│   ├── spread-three-card.tsx # 三張牌陣佈局
│   ├── position-label.tsx  # 牌位標籤（過去/現在/未來）
│   ├── question-input.tsx  # 問題輸入框
│   ├── history-card.tsx    # 歷史記錄卡片
│   └── ui/
│       ├── button.tsx      # 大字型按鈕
│       └── modal.tsx       # 彈窗（如有需要）
├── data/
│   └── tarot-cards.ts      # 78 張牌完整資料
├── lib/
│   ├── tarot-reader.ts     # 抽牌邏輯（單卡 + 三張）
│   └── storage.ts          # LocalStorage CRUD 工具
├── types/
│   └── index.ts            # TypeScript 型別定義
├── tailwind.config.ts      # Tailwind 設定（含大字型擴充）
└── package.json
```

---

## 3. 型別定義（`/types/index.ts`）

```typescript
// === 塔羅牌 ===
export interface TarotCard {
  id: number
  name: string
  nameZh: string
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  element?: 'fire' | 'water' | 'air' | 'earth'
  number: string
  keywordsUpright: string[]
  keywordsReversed: string[]
  emoji: string
}

// === 抽牌結果 ===
export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: string       // 'past' | 'present' | 'future' | '1' | ...
  positionLabel: string  // '過去' | '現在' | '未來' | ...
}

export type SpreadType = 'single' | 'three-card'

// === 儲存記錄 ===
export interface ReadingRecord {
  id: string
  timestamp: number
  question: string
  spreadType: SpreadType
  cards: DrawnCard[]
}

// === 牌陣定義 ===
export interface SpreadDefinition {
  type: SpreadType
  name: string
  nameZh: string
  cardCount: number
  positions: {
    key: string
    label: string
    description: string
  }[]
}
```

---

## 4. 資料模型

### LocalStorage Schema

```
Key: 'tarotwise-history'
Value: ReadingRecord[]
限制: 最多 200 筆
```

### 78 張牌資料範例（`/data/tarot-cards.ts`）

請參考 `docs/tarot-cards-reference.md` 轉換為 TypeScript 陣列。

```typescript
export const tarotCards: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    nameZh: '愚者',
    arcana: 'major',
    number: '0',
    element: 'air',
    keywordsUpright: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    keywordsReversed: ['recklessness', 'fear', 'risk-taking', 'holding back'],
    emoji: '🃏',
  },
  // ... 77 more
]
```

### 牌陣定義（`/data/spreads.ts`）

```typescript
export const spreads: Record<SpreadType, SpreadDefinition> = {
  'single': {
    type: 'single',
    name: 'Single Card',
    nameZh: '單卡抽牌',
    cardCount: 1,
    positions: [
      { key: '1', label: '指引', description: '當下最需要的訊息' },
    ],
  },
  'three-card': {
    type: 'three-card',
    name: 'Three-Card Spread',
    nameZh: '三張牌陣',
    cardCount: 3,
    positions: [
      { key: 'past', label: '過去', description: '導致目前狀況的原因' },
      { key: 'present', label: '現在', description: '當下的情況' },
      { key: 'future', label: '未來', description: '可能的發展方向' },
    ],
  },
}
```

---

## 5. 核心邏輯

### 5.1 抽牌（`/lib/tarot-reader.ts`）

```typescript
export function drawSingleCard(): DrawnCard {
  const card = tarotCards[Math.floor(Math.random() * tarotCards.length)]
  const isReversed = Math.random() < 0.5
  return {
    card,
    isReversed,
    position: '1',
    positionLabel: '指引',
  }
}

export function drawThreeCardSpread(): DrawnCard[] {
  // Fisher-Yates shuffle 取前 3 張（保證不重複）
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
  const positions = spreads['three-card'].positions

  return shuffled.slice(0, 3).map((card, i) => ({
    card,
    isReversed: Math.random() < 0.5,
    position: positions[i].key,
    positionLabel: positions[i].label,
  }))
}
```

### 5.2 儲存（`/lib/storage.ts`）

```typescript
const STORAGE_KEY = 'tarotwise-history'
const MAX_RECORDS = 200

export function getRecords(): ReadingRecord[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveRecord(record: ReadingRecord): boolean {
  const records = getRecords()
  if (records.length >= MAX_RECORDS) {
    return false // 已滿
  }
  records.unshift(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  return true
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function updateRecord(id: string, updates: Partial<ReadingRecord>): void {
  const records = getRecords().map(r =>
    r.id === id ? { ...r, ...updates } : r
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}
```

---

## 6. 頁面與元件設計

### 6.1 路由表

| Route | Type | 說明 | Data Source |
|-------|------|------|-------------|
| `/` | Client | 首頁：牌陣選擇 → 輸入問題 → 抽牌 | Static + LocalStorage write |
| `/reading/[id]` | Client | 顯示抽牌結果 | LocalStorage read |
| `/history` | Client | 歷史記錄列表 | LocalStorage read |
| `/history/[id]` | Client | 單筆記錄詳情 | LocalStorage read |

### 6.2 首頁流程（`/app/page.tsx`）

```
┌─────────────────────────────────────┐
│          🃏 TarotWise                │
│                                     │
│   [ 請輸入你想問的問題⋯ ]            │
│   ┌─────────────┐                   │
│   │  單卡抽牌    │  三張牌陣         │ ← SpreadSelector
│   └─────────────┘                   │
│                                     │
│        [ 開始抽牌 ]                  │ ← Button (大字型)
│                                     │
│   ┌─────────────────────────────┐  │
│   │        抽牌結果區            │  │ ← 抽牌後顯示
│   │                             │  │
│   │   🃏  愚者 │ 正位            │  │
│   │  新開始、天真、自由          │  │
│   └─────────────────────────────┘  │
│                                     │
│   [ 儲存結果 ]  [ 再看一次 ]       │
└─────────────────────────────────────┘
```

### 6.3 字型與主題設計（Tailwind Config）

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontSize: {
        'base': '18px',
        'lg': '22px',
        'xl': '26px',
        '2xl': '32px',
        'display': '42px',
      },
      spacing: {
        'touch': '48px',  // 最小觸控區域
      },
    },
  },
}
```

```css
/* app/globals.css */
@layer base {
  html {
    font-size: 18px;
  }
  button, a, input, textarea {
    min-height: 48px;
    min-width: 48px;
  }
}
```

---

## 7. 部署流程

### 7.1 Vercel 部署

```bash
# 1. 安裝 Vercel CLI
npm i -g vercel

# 2. 專案根目錄執行
vercel

# 3. 正式上線
vercel --prod
```

### 7.2 環境變數（Phase 1 不需要，留給 Phase 2）

```
# .env.local (Phase 2 使用)
OPENAI_API_KEY=sk-xxx
NEXT_PUBLIC_AI_ENABLED=true
```

---

## 8. 階段性架構演進

```
Phase 1                    Phase 2                    Phase 4
┌──────────┐              ┌──────────┐              ┌──────────┐
│  Browser │              │  Browser │              │  Browser │
│  (React) │              │  (React) │              │  (React) │
│  LS      │              │  LS      │              │  LS/Cloud│
└────┬─────┘              └────┬─────┘              └────┬─────┘
     │                         │                         │
     │ Static                  │ Serverless              │ Serverless + BaaS
     │ Vercel                  │ Vercel                  │ Vercel + Supabase
     │                         ├── /api/ai               ├── /api/*
     │                         │   (Next.js API Route)   └── Supabase
     │                         │                         ├── Auth
     │                         │                         ├── DB
     │                         │                         └── Storage
```

---

## 9. 開發規範

### 9.1 Component 原則

- **Server Component 優先**：靜態內容（牌義資料）用 Server Component
- **Client Component**：需要 `useState`、`useEffect`、事件處理的元件，在檔案頂部標註 `'use client'`
- **Props 型別定義**：所有元件需定義 `interface XxxProps`

### 9.2 命名規範

| 類別 | 慣例 | 範例 |
|------|------|------|
| 元件 | PascalCase | `CardDisplay`, `SpreadSelector` |
| 工具函式 | camelCase | `drawSingleCard`, `saveRecord` |
| 型別/介面 | PascalCase | `TarotCard`, `ReadingRecord` |
| 檔案名稱 | kebab-case | `tarot-cards.ts`, `card-display.tsx` |

### 9.3 程式碼風格

- 不使用 `any`，所有資料需定義 TypeScript 型別
- Component 使用 Arrow Function + `export default`
- CSS 使用 Tailwind utility classes，不在元件檔寫 custom CSS
- 全域樣式只放在 `globals.css`

---

## 10. UI 設計規範（年長用戶友善）

| 項目 | 規範 | 檢查方式 |
|------|------|---------|
| 字體大小 | 最小 18px，建議 20-24px | DevTools computed style |
| 觸控區域 | 最小 48x48px | DevTools box model |
| 對比度 | 文字 vs 背景 ≥ 4.5:1 | Lighthouse / Axe |
| 行高 | line-height ≥ 1.6 | DevTools |
| 輸入框 | 高度 ≥ 48px，padding ≥ 12px | DevTools |
| 按鈕 | 明確的 border / shadow， hover 有反饋 | 視覺確認 |
| 版面 | 一頁一個核心功能，次要資訊折疊 | 視覺確認 |
| 導航 | 返回按鈕明顯，減少多層頁面 | 操作測試 |

---

*本文件為 TarotWise Phase 1 技術規格，對應 Sprint Backlog 實施。*
