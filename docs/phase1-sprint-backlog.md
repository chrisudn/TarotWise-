# TarotWise — Phase 1 Sprint Backlog

> 版本：v1.0 | 最後更新：2026-06-02
> 技術棧：React + Next.js (App Router) + Tailwind CSS
> 部署平台：Vercel
> 儲存方案：LocalStorage（上限 200 筆）

---

## Sprint 1：單卡抽牌核心

**Sprint Goal**：使用者能完成「抽一張牌 + 看牌義」的最小閉環。

**預計工時**：5 個工作天

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T1-1 | 專案初始化：`create-next-app` + Tailwind 設定 + 字型主題 | 2h | - |
| T1-2 | 建立 78 張牌資料結構（`/data/tarot-cards.ts`） | 3h | - |
| T1-3 | 隨機抽牌邏輯 + 正/逆位隨機（`/lib/tarot-reader.ts`） | 1.5h | T1-2 |
| T1-4 | 頁面佈局：首頁（`/app/page.tsx`） | 3h | T1-1 |
| T1-5 | 牌面顯示元件（`/components/card-display.tsx`） | 3h | T1-3 |
| T1-6 | 大字型主題實作 + 響應式基礎 | 2h | T1-1 |

### Acceptance Criteria

請參考 `product-plan.md` AC1-1 ~ AC1-6。

### 技術說明

**78 張牌資料結構**（`/data/tarot-cards.ts`）：

```typescript
export interface TarotCard {
  id: number           // 0-77
  name: string          // 英文名
  nameZh: string        // 中文名
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  element?: 'fire' | 'water' | 'air' | 'earth'
  number: string        // '0', 'I', 'II', ..., 'XXI', 'ace', 'two', ..., 'king'
  keywordsUpright: string[]
  keywordsReversed: string[]
  emoji: string         // MVP 階段用 Emoji
}
```

**抽牌邏輯**（`/lib/tarot-reader.ts`）：

```typescript
export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
}

export function drawSingleCard(): DrawnCard
// 78 張中隨機選一張，50% 機率正/逆位
```

**頁面流程**：

```
/page.tsx
  └─ 一個大「開始抽牌」按鈕 (48px+)
      └─ 點擊 → 調用 drawSingleCard()
          └─ 導航到 /reading/[id] 或 Modal 顯示結果
```

**路由規劃**：

| Route | 說明 |
|-------|------|
| `/` | 首頁：抽牌按鈕 + 模式選擇（Sprint 2 擴展） |
| `/reading/[id]` | 抽牌結果頁（id 為 localStorage key） |

---

## Sprint 2：三張牌陣與牌陣切換

**Sprint Goal**：使用者可在「單卡」與「三張牌陣」之間切換，完成完整抽牌流程。

**預計工時**：5 個工作天

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T2-1 | 牌陣選擇器元件（`/components/spread-selector.tsx`） | 2h | T1-1 |
| T2-2 | 三張牌陣佈局元件（`/components/spread-three-card.tsx`） | 4h | T1-5 |
| T2-3 | 三張牌抽牌流程邏輯（`/lib/tarot-reader.ts` 擴充） | 2h | T1-3, T2-2 |
| T2-4 | 牌位標籤元件（`/components/position-label.tsx`） | 1h | - |
| T2-5 | 問題輸入框（`/components/question-input.tsx`） | 1.5h | - |
| T2-6 | 流程串接：選擇模式 → 輸入問題 → 抽牌 → 顯示結果 | 3h | T2-1 ~ T2-5 |

### Acceptance Criteria

請參考 `product-plan.md` AC2-1 ~ AC2-7。

### 技術說明

**牌陣模式列舉**：

```typescript
export type SpreadType = 'single' | 'three-card'
```

**三張牌陣邏輯**：

```typescript
export interface SpreadPosition {
  key: string    // 'past' | 'present' | 'future'
  label: string  // '過去' | '現在' | '未來'
  description: string // '導致目前狀況的原因'
}

export function drawThreeCardSpread(): DrawnCard[]
// 抽 3 張不重複牌，各自 50% 機率正/逆位
```

**牌陣佈局**（CSS 使用 Tailwind Grid）：

```
[過去]    [現在]    [未來]
 左(1)     中(2)    右(3)
```

**問題輸入框規格**：
- 高度 ≥ 48px
- 字體 ≥ 18px
- placeholder：「請輸入你想問的問題⋯」
- 限制最多 200 字

---

## Sprint 3：儲存結果與歷史記錄

**Sprint Goal**：使用者可儲存每次抽牌結果，並瀏覽過往歷史。

**預計工時**：5 個工作天

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T3-1 | LocalStorage 儲存/讀取/刪除工具（`/lib/storage.ts`） | 2h | - |
| T3-2 | 自動儲存邏輯（抽牌完成後寫入） | 1h | T3-1, Sprint 1-2 |
| T3-3 | 歷史記錄列表頁（`/app/history/page.tsx`） | 4h | T3-1 |
| T3-4 | 歷史記錄卡片元件（`/components/history-card.tsx`） | 2h | T1-5 |
| T3-5 | 單筆記錄詳情頁（`/app/history/[id]/page.tsx`） | 3h | T3-1 |
| T3-6 | 大字型 UI Audit + RWD 全面修正 | 3h | 所有 |

### Acceptance Criteria

請參考 `product-plan.md` AC3-1 ~ AC3-6。

### 技術說明

**資料結構**（存於 LocalStorage）：

```typescript
export interface ReadingRecord {
  id: string            // crypto.randomUUID()
  timestamp: number     // Date.now()
  question: string
  spreadType: SpreadType
  cards: {
    card: TarotCard
    isReversed: boolean
    position: string
    positionLabel: string
  }[]
}
```

**LocalStorage Key**：`tarotwise-history`

**儲存上限邏輯**：
```
寫入前檢查 array.length >= 200
  → 若已滿，提示「儲存空間已滿，請刪除舊記錄後再試」
  → 未滿，unshift 新增記錄
```

**路由規劃**：

| Route | 說明 |
|-------|------|
| `/history` | 歷史記錄列表（時間倒序） |
| `/history/[id]` | 單筆記錄詳情（含牌面、解讀） |

**歷史列表設計原則**：
- 每筆顯示：日期、問題摘要（前 20 字 + 「⋯」）、牌陣類型標籤
- 點擊進入詳情頁
- 超過 200 筆時列表頂部顯示儲存空間提示

---

## Phase 1 釋出檢核（Release Gate）

以下為 Phase 1 結束時，全部通過才能標記「可發布」：

| # | 檢查項 | 測試腳本 / 方式 | 通過 |
|---|--------|---------------|:---:|
| R1-1 | 單卡抽牌完整流程 | 打開 App → 點抽牌 → 看到牌名+關鍵字+正/逆位 | ☐ |
| R1-2 | 三張牌陣完整流程 | 切換三張模式 → 輸入問題 → 依序翻 3 張 → 看到完整解讀 | ☐ |
| R1-3 | 牌義顯示正確 | 隨機抽 10 次，對照 docs/tarot-cards-reference.md 比對 | ☐ |
| R1-4 | 問題輸入功能 | 輸入框字體 ≥ 18px、高度 ≥ 48px、可輸入 200 字 | ☐ |
| R1-5 | 自動儲存 | 抽牌後檢查 LocalStorage 有資料、欄位完整 | ☐ |
| R1-6 | 歷史記錄 | 列表顯示正確、可點入看詳情、時間倒序 | ☐ |
| R1-7 | RWD 無破版 | 320px / 375px / 768px / 1440px 寬度下測試 | ☐ |
| R1-8 | 大字型標準 | 所有文字 ≥ 18px、所有點擊區域 ≥ 48x48px | ☐ |
| R1-9 | Phase 1 Deploy to Vercel | `vercel --prod` 成功，網址可正常訪問 | ☐ |

---

## 工作時程總覽

```
Week 1 ─── Sprint 1：單卡抽牌
              ├─ Day 1: 專案初始化 + 牌資料結構
              ├─ Day 2: 抽牌邏輯 + CardDisplay 元件
              └─ Day 3-5: 首頁佈局 + 大字型主題 + 驗收

Week 2 ─── Sprint 2：三張牌陣
              ├─ Day 1-2: SpreadSelector + 三張佈局
              ├─ Day 3-4: 問題輸入框 + 流程串接
              └─ Day 5: 驗收 + 修正

Week 3 ─── Sprint 3：儲存 + 歷史
              ├─ Day 1-2: LocalStorage 工具 + 自動儲存
              ├─ Day 3-4: 歷史列表 + 詳情頁
              └─ Day 5: UI Audit + RWD 修正 + Release Gate
```
