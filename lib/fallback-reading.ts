import { meanings } from '@/data/tarot-meanings'
import { spreads } from '@/data/spreads'
import type { DrawnCard, SpreadType } from '@/types'
import type { ReadingMode } from './reading-prompt'

export function getFallbackReading(
  cards: DrawnCard[],
  spreadType: SpreadType,
  mode: ReadingMode,
): string {
  const spread = spreads[spreadType]

  const perCardSection = () =>
    cards
      .map((c, i) => {
        const pos = spread.positions[i]
        const orientation = c.isReversed ? '逆位' : '正位'
        const m = meanings[c.card.id]
        const text = c.isReversed ? m.reversed : m.upright
        return `### ${pos.label} — ${c.card.nameZh}（${orientation}）\n${text}`
      })
      .join('\n\n')

  const overallSection = () => {
    const summaries = cards.map((c, i) => {
      const pos = spread.positions[i]
      const orientation = c.isReversed ? '逆位' : '正位'
      const m = meanings[c.card.id]
      const text = c.isReversed ? m.reversed : m.upright
      return `- **${pos.label}（${orientation}）**：${c.card.nameZh} — ${text}`
    })
    return summaries.join('\n')
  }

  if (mode === 'per-card') {
    return `## 共鳴與同理\n你抽到了${spread.nameZh}，讓我們一起來看看每張牌為你帶來的訊息。\n\n## 牌面解析與核心意涵\n\n${perCardSection()}\n\n## 給您的具體行動指引\n1. 靜下心來，想想這些牌義中哪些句子最打動你。\n2. 將牌面的提醒應用在當前的生活情境中。\n3. 保持開放的態度，答案往往在提問之後才慢慢浮現。\n\n## 溫柔的結語\n塔羅牌反映的是當下的能量與潛意識，最終的決定權與改變的力量始終在你自己手中。`
  }

  if (mode === 'overall') {
    return `## 共鳴與同理\n你抽到了${spread.nameZh}，這組牌為你帶來了豐富的訊息。\n\n## 牌面解析與核心意涵\n\n${overallSection()}\n\n## 給您的具體行動指引\n1. 靜下心來，想想這些牌義中哪些句子最打動你。\n2. 將牌面的提醒應用在當前的生活情境中。\n3. 保持開放的態度，答案往往在提問之後才慢慢浮現。\n\n## 溫柔的結語\n塔羅牌反映的是當下的能量與潛意識，最終的決定權與改變的力量始終在你自己手中。`
  }

  // both
  return `## 共鳴與同理\n你抽到了${spread.nameZh}，讓我們先逐一檢視每張牌，再看整體的訊息。\n\n## 逐張解讀\n\n${perCardSection()}\n\n## 整體解讀\n\n${overallSection()}\n\n## 給您的具體行動指引\n1. 靜下心來，想想這些牌義中哪些句子最打動你。\n2. 將牌面的提醒應用在當前的生活情境中。\n3. 保持開放的態度，答案往往在提問之後才慢慢浮現。\n\n## 溫柔的結語\n塔羅牌反映的是當下的能量與潛意識，最終的決定權與改變的力量始終在你自己手中。`
}
