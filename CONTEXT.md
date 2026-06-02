# TarotWise — Context

> 一個塔羅牌占卜網站，提供多種牌陣抽牌、AI 解讀、占卜記錄等功能。
>
> 技術棧：Next.js (App Router) + React + TypeScript + Tailwind CSS v4
> 部署：Vercel
> 儲存：LocalStorage（上限 200 筆）
> AI：OpenAI GPT-4o-mini

## Domain Language

| 術語 | 說明 |
|------|------|
| 牌陣 (Spread) | 特定的牌卡排列方式，如三張牌、十字牌陣、凱爾特十字等 |
| 牌位 (Position) | 牌陣中每個位置有其特定意義（如過去、現在、未來） |
| 抽牌 (Draw) | 從 78 張塔羅牌中隨機選取指定數量的牌 |
| 正位/逆位 (Upright/Reversed) | 每張牌有 50% 機率為正位或逆位，影響解讀方向 |
| AI 解讀 (AI Reading) | 透過 OpenAI GPT-4o-mini 對抽牌結果進行文字解讀 |
| 占卜記錄 (Reading Record) | 每次占卜的完整記錄，含問題、牌陣、抽牌結果、AI 解讀 |

## Spread Types

- `single` — 單張指引牌
- `three-card` — 三張牌（過去 / 現在 / 未來）
- `five-card` — 五張十字牌陣
- `horseshoe` — 七張馬蹄鐵牌陣
- `celtic-cross` — 十張凱爾特十字牌陣（Sprint 7 實作）

## 牌陣規格

| 牌陣 | 牌數 | 適用場景 |
|------|------|---------|
| 單張 | 1 | 快速指引、每日一牌 |
| 三張牌 | 3 | 簡單問題、時序探索 |
| 十字牌陣 | 5 | 深入問題分析 |
| 馬蹄鐵 | 7 | 全面局勢評估 |
| 凱爾特十字 | 10 | 深入人生課題 |
