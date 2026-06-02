'use client'

import type { DrawnCard } from '@/types'

interface CardDisplayProps {
  card: DrawnCard
  showPosition?: boolean
  size?: 'normal' | 'compact'
}

export default function CardDisplay({ card, showPosition = true, size = 'normal' }: CardDisplayProps) {
  const { card: cardData, isReversed, positionLabel } = card
  const keywords = isReversed ? cardData.keywordsReversed : cardData.keywordsUpright

  const isCompact = size === 'compact'

  return (
    <div
      className={`w-full rounded-2xl border-2 text-center transition-all ${
        isReversed
          ? 'border-red-300 bg-red-50'
          : 'border-card-border bg-card-bg'
      } ${isCompact ? 'p-2 sm:p-3' : 'p-4 sm:p-6'}`}
    >
      {showPosition && positionLabel !== '指引' && (
        <div className={`font-semibold text-primary ${isCompact ? 'mb-1 text-sm' : 'mb-2 sm:mb-3 text-base sm:text-lg'}`}>
          {positionLabel}
        </div>
      )}

      <div className={`${isCompact ? 'text-2xl sm:text-3xl mb-1' : 'text-4xl sm:text-5xl mb-2 sm:mb-3'} ${isReversed ? 'scale-y-[-1]' : ''}`}>
        {cardData.emoji}
      </div>

      <div className={`font-bold ${isCompact ? 'text-sm sm:text-base mb-0.5' : 'text-lg sm:text-xl mb-1'}`}>
        {cardData.nameZh}
      </div>

      <div
        className={`inline-block rounded-full font-medium ${
          isCompact ? 'px-2 py-0 text-xs sm:text-sm mb-1' : 'px-3 py-0.5 text-sm sm:text-base mb-2 sm:mb-3'
        } ${isReversed ? 'bg-red-200 text-red-700' : 'bg-green-100 text-green-700'}`}
      >
        {isReversed ? '逆位' : '正位'}
      </div>

      <div className={`flex flex-wrap justify-center ${isCompact ? 'gap-0.5' : 'gap-1.5'}`}>
        {keywords.map((kw, i) => (
          <span
            key={i}
            className={`rounded-full bg-primary/10 text-primary ${
              isCompact
                ? 'px-1.5 py-0 text-[10px] sm:text-xs'
                : 'px-2.5 py-0.5 text-sm sm:text-base'
            }`}
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  )
}
