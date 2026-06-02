# TarotWise — Phase 2 Sprint Backlog

> 版本：v1.0 | 最後更新：2026-06-02
> 技術棧：React + Next.js (App Router) + Tailwind CSS
> 部署平台：Vercel
> 儲存方案：LocalStorage（上限 200 筆）

---

## Sprint 4：五張牌陣 + 馬蹄鐵牌陣

**Sprint Goal**：使用者可選 4 種牌陣（單卡/三張/五張/馬蹄鐵）並完成抽牌。

**預計工時**：5 個工作天

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T4-1 | 型別擴充：`SpreadType` 新增 `five-card` / `horseshoe` | 0.5h | - |
| T4-2 | 牌陣定義資料擴充（`/data/spreads.ts` — 五張十字 + 馬蹄鐵） | 1h | T4-1 |
| T4-3 | 抽牌邏輯擴充（`/lib/tarot-reader.ts` — 通用 `drawSpread` 已可支援） | 0.5h | T4-2 |
| T4-4 | 五張十字牌陣元件（`/components/spread-five-card.tsx`） | 4h | T1-5, T4-3 |
| T4-5 | 馬蹄鐵牌陣元件（`/components/spread-horseshoe.tsx`） | 4h | T1-5, T4-3 |
| T4-6 | 牌陣選擇器擴充為 4 選項（`/components/spread-selector.tsx`） | 1h | T4-1 |
| T4-7 | 首頁流程串接（`/app/page.tsx` — 根據 spreadType 渲染對應元件） | 2h | T4-4 ~ T4-6 |
| T4-8 | 建置驗證 + 手機 RWD 測試 | 1h | 全部 |

### Acceptance Criteria

| # | 條件 | 測試方式 |
|---|------|---------|
| AC4-1 | 牌陣選擇器顯示 4 個選項（單卡/三張/五張/馬蹄鐵） | 視覺確認 |
| AC4-2 | 選擇「五張十字」後，佈局顯示十字形 5 個牌位（中/下/上/左/右） | 視覺確認 |
| AC4-3 | 選擇「馬蹄鐵」後，佈局顯示弧形排列 7 個牌位 | 視覺確認 |
| AC4-4 | 每個牌位有對應標籤與意義說明 | 視覺確認 |
| AC4-5 | 五張與七張皆可依序翻牌（一次翻一張） | 操作流程測試 |
| AC4-6 | 切換牌陣時舊結果清空、不殘留 | 操作測試 |
| AC4-7 | 單卡/三張模式仍可正常運作（不回歸） | 回歸測試 |

### 五張十字牌陣佈局

```
         [3 建議]
             
   [4 隱藏]  [1 狀況]  [5 結果]
             
         [2 挑戰]
```

| 位置 | 意義 |
|------|------|
| 1 (中) | 狀況 — 問題的核心 |
| 2 (下) | 挑戰 — 潛在的困難 |
| 3 (上) | 建議 — 最佳行動方向 |
| 4 (左) | 隱藏影響 — 未知因素 |
| 5 (右) | 結果 — 可能的 outcome |

### 馬蹄鐵七張牌陣佈局

```
    [1 過去]
        \
    [2 現在] — [3 隱藏影響]
        /
    [4 障礙]
        \
    [5 他人影響] — [6 建議]
        /
    [7 結果]
```

在螢幕上以兩行顯示：
- 第一行：1, 2, 3 (三欄)
- 第二行：4, 5, 6, 7 (四欄)

| 位置 | 意義 |
|------|------|
| 1 | 過去 — 事件的起因與背景 |
| 2 | 現在 — 當下的處境 |
| 3 | 隱藏影響 — 未知或潛意識因素 |
| 4 | 障礙 — 需要克服的挑戰 |
| 5 | 他人影響 — 外部人或環境的影響 |
| 6 | 建議 — 應該採取的方向 |
| 7 | 結果 — 最終發展 |

### 技術說明

**型別擴充**（`/types/index.ts`）：
```typescript
export type SpreadType = 'single' | 'three-card' | 'five-card' | 'horseshoe'
```

**牌陣定義資料**（`/data/spreads.ts`）：
```typescript
'five-card': {
  type: 'five-card',
  name: 'Five-Card Cross',
  nameZh: '五張十字牌陣',
  cardCount: 5,
  positions: [
    { key: 'center',  label: '狀況',     description: '問題的核心' },
    { key: 'bottom',  label: '挑戰',     description: '潛在的困難' },
    { key: 'top',     label: '建議',     description: '最佳行動方向' },
    { key: 'left',    label: '隱藏影響',   description: '未知因素' },
    { key: 'right',   label: '結果',     description: '可能的 outcome' },
  ],
}
```

**五張牌陣 CSS 佈局**（使用 Tailwind CSS Grid）：
- 外層 container：`grid grid-cols-3 grid-rows-3`
- 牌 1 (狀況)：`col-start-2 row-start-2`
- 牌 2 (挑戰)：`col-start-2 row-start-3`
- 牌 3 (建議)：`col-start-2 row-start-1`
- 牌 4 (隱藏)：`col-start-1 row-start-2`
- 牌 5 (結果)：`col-start-3 row-start-2`

**馬蹄鐵 CSS 佈局**：
- 第一行：`grid grid-cols-3` — 牌 1, 2, 3
- 第二行：`grid grid-cols-4` — 牌 4, 5, 6, 7
- 使用 CardDisplay `size="compact"` 維持 readability

**依序翻牌邏輯**（與三張牌陣相同模式）：
- `revealedCount: number` state
- 一個「翻開第 N 張牌」按鈕
- 點擊後 `revealedCount++`
- 未翻的牌顯示 `?` placeholder
- 全部翻開後顯示總結文字

---

## Sprint 5：AI 解讀串接

**Sprint Goal**：使用者在抽牌後可獲得 AI 針對「問題 + 牌面」的個人化解讀。

**預計工時**：5 個工作天

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T5-1 | API Route 建立（`/app/api/reading/route.ts`） | 2h | - |
| T5-2 | AI Prompt 模板設計（含問題、牌位、牌面、正逆位） | 2h | T5-1 |
| T5-3 | AI 解讀顯示區元件（`/components/ai-reading.tsx`） | 3h | T5-2 |
| T5-4 | Loading / Error / Fallback 狀態處理 | 2h | T5-3 |
| T5-5 | 內建牌義 fallback（API 失敗時顯示） | 2h | - |
| T5-6 | 四種牌陣的 AI 解讀支援 | 1h | T5-3, Sprint 4 |
| T5-7 | 環境變數設定 + Vercel 部署驗證 | 1h | T5-1 |

### Acceptance Criteria

| # | 條件 | 測試方式 |
|---|------|---------|
| AC5-1 | 抽牌完成後出現「AI 解讀」按鈕或自動觸發 | 視覺確認 |
| AC5-2 | 點擊後顯示 Loading 狀態（避免空白畫面） | 測試網路情境 |
| AC5-3 | AI 回傳內容包含：牌名、牌位對應、建議 | 檢視回覆格式 |
| AC5-4 | 單卡與牌陣模式皆有 AI 解讀 | 四種模式測試 |
| AC5-5 | API 失敗時顯示內建牌義替代，非空白或錯誤頁 | 斷網測試 |
| AC5-6 | AI 解讀區可手動關閉/收起 | 操作測試 |

---

## Sprint 6：牌陣說明頁 + UX 細節優化 ✅

**Sprint Goal**：使用者可在抽牌前了解牌陣用途，抽牌後可展開/收起各牌解讀。

**預計工時**：5 個工作天 | **狀態**：已完成

### Task Breakdown

| # | Task | 預估時數 | 依賴 |
|---|------|---------|------|
| T6-1 | 牌陣說明頁（`/spreads/[type]/page.tsx`） | 4h | Sprint 4 |
| T6-2 | 選擇牌陣時可點「查看牌陣說明」連結 | 1h | T6-1 |
| T6-3 | 牌陣說明包含：示意圖 + 牌位說明 + 適合問題 | 2h | T6-1 |
| T6-4 | 解讀結果展開/收起元件 | 2h | Sprint 5 |
| T6-5 | UX Audit：對比度、touch target、字體大小全面檢驗 | 2h | 全部 |
| T6-6 | 年長用戶實測 + 修正 | 3h | 全部 |

### Acceptance Criteria

| # | 條件 | 測試方式 |
|---|------|---------|
| AC6-1 | 選擇牌陣時可點「查看牌陣說明」 | 操作測試 |
| AC6-2 | 牌陣說明頁包含：示意圖、牌位說明、適合問題 | 逐一確認 |
| AC6-3 | 抽牌後每張牌的解讀可展開/收起 | 操作測試 |
| AC6-4 | 對比度檢驗通過（文字 vs 背景 ≥ 4.5:1） | Lighthouse / 工具測 |
| AC6-5 | 找 2-3 位 60+ 歲用戶操作主要流程無障礙 | 實測回饋 |

---

## Phase 2 釋出檢核（Release Gate）

| # | 檢查項 | 測試方式 | 通過 |
|---|--------|---------|:---:|
| R2-1 | 4 種牌陣皆可正常運作 | 每種牌陣完整操作一次 | ✅ |
| R2-2 | AI 解讀串接成功 | 每種牌陣觸發 AI 解讀一次 | ⬜ 需設定 API Key |
| R2-3 | 內建牌義 fallback 正常 | 斷網測試 + 觀察 fallback 顯示 | ✅ |
| R2-4 | 牌陣說明頁完整 | 逐一確認 4 種牌陣說明頁 | ✅ |
| R2-5 | 解讀結果展開/收起功能正常 | 操作測試 | ✅ |
| R2-6 | 年長用戶實測 3 人無操作障礙 | 實測回饋 | ⬜ 待實測 |
| R2-7 | Phase 1 所有功能仍然正常 | 回歸測試 Sprint 1-3 AC | ✅ |
| R2-8 | `npm run build` 無錯誤 | 建置驗證 | ✅ |
| R2-9 | Vercel 部署成功 | `vercel --prod` | ✅ |

---

## 工作時程總覽

```
Week 4 ─── Sprint 4：五張牌陣 + 馬蹄鐵
              ├─ Day 1: 型別擴充 + 牌陣定義 + 選擇器擴充
              ├─ Day 2-3: 五張十字牌陣元件
              ├─ Day 3-4: 馬蹄鐵牌陣元件
              └─ Day 5: 流程串接 + RWD 測試

Week 5 ─── Sprint 5：AI 解讀串接
              ├─ Day 1-2: API Route + Prompt 模板
              ├─ Day 3-4: AI 解讀顯示區 + 狀態處理
              └─ Day 5: Fallback + 部署驗證

Week 6 ─── Sprint 6：牌陣說明頁 + UX 優化
              ├─ Day 1-2: 牌陣說明頁
              ├─ Day 3-4: 展開/收起 + UX Audit
              └─ Day 5: 年長用戶實測 + Release Gate
```
