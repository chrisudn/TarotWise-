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

export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: string
  positionLabel: string
}

export type SpreadType = 'single' | 'three-card'

export interface ReadingRecord {
  id: string
  timestamp: number
  question: string
  spreadType: SpreadType
  cards: DrawnCard[]
}

export interface SpreadPosition {
  key: string
  label: string
  description: string
}

export interface SpreadDefinition {
  type: SpreadType
  name: string
  nameZh: string
  cardCount: number
  positions: SpreadPosition[]
}
