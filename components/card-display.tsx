'use client'

import { useState, useEffect } from 'react'
import type { DrawnCard } from '@/types'
import { getCardImageSrc } from '@/lib/get-card-image'

interface CardDisplayProps {
  card: DrawnCard
  showPosition?: boolean
  size?: 'normal' | 'compact'
  revealed?: boolean
}

export default function CardDisplay({ card, showPosition = true, size = 'normal', revealed = true }: CardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(!revealed)

  useEffect(() => {
    setIsFlipped(!revealed)
  }, [revealed])

  const { card: cardData, isReversed, positionLabel } = card
  const keywords = isReversed ? cardData.keywordsReversed : cardData.keywordsUpright
  const isCompact = size === 'compact'
  const imgSrc = getCardImageSrc(cardData.id, cardData.name)

  const showFront = revealed && !isFlipped

  const handleFlip = () => {
    if (revealed) setIsFlipped((v) => !v)
  }

  return (
    <div className={`perspective-[1000px] ${isCompact ? 'w-full' : ''}`}>
      <div
        onClick={handleFlip}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative w-full cursor-pointer select-none transition-transform duration-500 ${
          !showFront ? '[transform:rotateY(180deg)]' : ''
        } ${isCompact ? '' : 'min-h-[280px]'}`}
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
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

          {imgSrc ? (
            <div className={`relative mx-auto ${isCompact ? 'w-20 h-28 sm:w-24 sm:h-32' : 'w-28 h-40 sm:w-32 sm:h-44'} ${isReversed ? 'scale-y-[-1]' : ''}`}>
              <img
                src={imgSrc}
                alt={cardData.name}
                loading="lazy"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className={`${isCompact ? 'text-2xl sm:text-3xl mb-1' : 'text-4xl sm:text-5xl mb-2 sm:mb-3'} ${isReversed ? 'scale-y-[-1]' : ''}`}>
              {cardData.emoji}
            </div>
          )}

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

        {/* Back face */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className={`absolute inset-0 w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 via-purple-900/40 to-primary/10 flex flex-col items-center justify-center shadow-inner ${
            isCompact ? 'p-2' : 'p-4'
          }`}
        >
          <div className={`font-bold text-white/80 ${isCompact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
            ✦
          </div>
          <div className={`mt-1 text-white/40 ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
            TarotWise
          </div>
        </div>
      </div>
    </div>
  )
}
