'use client'

import type { DrawnCard } from '@/types'

interface CardDisplayProps {
  card: DrawnCard
  showPosition?: boolean
}

export default function CardDisplay({ card, showPosition = true }: CardDisplayProps) {
  const { card: cardData, isReversed, positionLabel } = card
  const keywords = isReversed ? cardData.keywordsReversed : cardData.keywordsUpright

  return (
    <div
      className={`w-full rounded-2xl border-2 p-4 sm:p-5 text-center transition-all ${
        isReversed
          ? 'border-red-300 bg-red-50'
          : 'border-card-border bg-card-bg'
      }`}
    >
      {showPosition && positionLabel !== '指引' && (
        <div className="mb-2 text-base sm:text-lg font-semibold text-primary">
          {positionLabel}
        </div>
      )}

      <div className={`text-4xl sm:text-5xl mb-2 sm:mb-3 ${isReversed ? 'scale-y-[-1]' : ''}`}>
        {cardData.emoji}
      </div>

      <div className="text-lg sm:text-xl font-bold mb-1">
        {cardData.nameZh}
      </div>

      <div
        className={`inline-block rounded-full px-3 py-0.5 text-sm sm:text-base font-medium mb-2 sm:mb-3 ${
          isReversed
            ? 'bg-red-200 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}
      >
        {isReversed ? '逆位' : '正位'}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {keywords.map((kw, i) => (
          <span
            key={i}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm sm:text-base text-primary"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  )
}
