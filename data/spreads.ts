import type { SpreadDefinition } from '@/types'

export const spreads: Record<string, SpreadDefinition> = {
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
