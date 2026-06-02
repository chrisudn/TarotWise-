'use client'

import { useState, useEffect } from 'react'
import type { DrawnCard } from '@/types'
import CardDisplay from './card-display'
import PositionLabel from './position-label'

interface SpreadThreeCardProps {
  cards: DrawnCard[]
  onAllRevealed?: () => void
}

export default function SpreadThreeCard({ cards, onAllRevealed }: SpreadThreeCardProps) {
  const [revealedCount, setRevealedCount] = useState(0)

  const handleReveal = () => {
    if (revealedCount < cards.length) {
      setRevealedCount((prev) => prev + 1)
    }
  }

  const allRevealed = revealedCount >= cards.length

  useEffect(() => {
    if (allRevealed) onAllRevealed?.()
  }, [allRevealed, onAllRevealed])

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {!allRevealed && (
        <button
          onClick={handleReveal}
          className="h-touch px-8 rounded-xl bg-primary text-white text-lg font-medium
                     hover:bg-primary-light active:bg-primary transition-colors"
        >
          {revealedCount === 0
            ? '翻開第一張牌'
            : `翻開第 ${revealedCount + 1} 張牌`}
        </button>
      )}

      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col items-center gap-1 sm:gap-2">
            <PositionLabel
              label={card.positionLabel}
              description={
                i === 0 ? '導致目前狀況的原因' :
                i === 1 ? '當下的情況' :
                '可能的發展方向'
              }
              isActive={i < revealedCount}
            />

            <CardDisplay card={card} showPosition={false} size="compact" revealed={i < revealedCount} />
          </div>
        ))}
      </div>

      {allRevealed && (
        <p className="text-sm sm:text-base text-muted text-center">
          三張牌已全部揭開 — 對應你問題的過去、現在、未來
        </p>
      )}
    </div>
  )
}
