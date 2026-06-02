import { tarotCards } from '@/data/tarot-cards'
import { spreads } from '@/data/spreads'
import type { DrawnCard, SpreadType } from '@/types'

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

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

export function drawSpread(spreadType: SpreadType): DrawnCard[] {
  const spread = spreads[spreadType]
  if (!spread) throw new Error(`Unknown spread type: ${spreadType}`)

  const shuffled = shuffle(tarotCards)
  return shuffled.slice(0, spread.cardCount).map((card, i) => ({
    card,
    isReversed: Math.random() < 0.5,
    position: spread.positions[i].key,
    positionLabel: spread.positions[i].label,
  }))
}

export { tarotCards }
