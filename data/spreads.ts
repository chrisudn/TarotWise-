import type { SpreadDefinition } from '@/types'

export const spreads: Record<string, SpreadDefinition> = {
  'single': {
    type: 'single',
    name: 'Single Card',
    nameZh: '單卡抽牌',
    cardCount: 1,
    focus: '快速指引',
    suitableFor: '每日指引、當下直覺、簡單確認',
    positions: [
      { key: '1', label: '指引', description: '當下最需要的訊息' },
    ],
  },
  'three-card': {
    type: 'three-card',
    name: 'Three-Card Spread',
    nameZh: '三張牌陣',
    cardCount: 3,
    focus: '時間脈絡',
    suitableFor: '感情發展、工作變動、一般生活 — 理解過去/現在/未來的變化',
    positions: [
      { key: 'past', label: '過去', description: '導致目前狀況的原因' },
      { key: 'present', label: '現在', description: '當下的情況' },
      { key: 'future', label: '未來', description: '可能的發展方向' },
    ],
  },
  'five-card': {
    type: 'five-card',
    name: 'Five-Card Cross',
    nameZh: '五張十字牌陣',
    cardCount: 5,
    focus: '深度分析',
    suitableFor: '重大決策、自我探索、釐清盲點 — 從隱藏面向看到問題全貌',
    positions: [
      { key: 'center', label: '狀況', description: '問題的核心' },
      { key: 'bottom', label: '挑戰', description: '潛在的困難' },
      { key: 'top', label: '建議', description: '最佳行動方向' },
      { key: 'left', label: '隱藏影響', description: '未知因素' },
      { key: 'right', label: '結果', description: '可能的 outcome' },
    ],
  },
  'horseshoe': {
    type: 'horseshoe',
    name: 'Horseshoe Spread',
    nameZh: '馬蹄鐵牌陣',
    cardCount: 7,
    focus: '全局展望',
    suitableFor: '人生規劃、長期發展、事業方向 — 預見未來七階段的完整路徑',
    positions: [
      { key: '1', label: '過去', description: '事件的起因與背景' },
      { key: '2', label: '現在', description: '當下的處境' },
      { key: '3', label: '隱藏影響', description: '未知或潛意識因素' },
      { key: '4', label: '障礙', description: '需要克服的挑戰' },
      { key: '5', label: '他人影響', description: '外部人或環境的影響' },
      { key: '6', label: '建議', description: '應該採取的方向' },
      { key: '7', label: '結果', description: '最終發展' },
    ],
  },
}
