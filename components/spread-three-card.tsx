'use client'

import { useState } from 'react'
import type { DrawnCard } from '@/types'
import CardDisplay from './card-display'
import PositionLabel from './position-label'

interface SpreadThreeCardProps {
  cards: DrawnCard[]
}

export default function SpreadThreeCard({ cards }: SpreadThreeCardProps) {
  const [revealedCount, setRevealedCount] = useState(0)

  const handleReveal = () => {
    if (revealedCount < cards.length) {
      setRevealedCount((prev) => prev + 1)
    }
  }

  const allRevealed = revealedCount >= cards.length

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

      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 w-full">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <PositionLabel
              label={card.positionLabel}
              description={
                i === 0 ? '導致目前狀況的原因' :
                i === 1 ? '當下的情況' :
                '可能的發展方向'
              }
              isActive={i < revealedCount}
            />

            {i < revealedCount ? (
              <CardDisplay card={card} showPosition={false} />
            ) : (
              <div className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-card-border bg-card-bg flex items-center justify-center">
                <span className="text-5xl sm:text-6xl text-muted">?</span>
              </div>
            )}
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
