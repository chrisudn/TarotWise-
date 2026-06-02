'use client'

import { useState, useEffect } from 'react'
import type { DrawnCard } from '@/types'
import CardDisplay from './card-display'
import PositionLabel from './position-label'
import { spreads } from '@/data/spreads'

interface SpreadHorseshoeProps {
  cards: DrawnCard[]
  onAllRevealed?: () => void
}

const positions = spreads['horseshoe'].positions

export default function SpreadHorseshoe({ cards, onAllRevealed }: SpreadHorseshoeProps) {
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

      <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {cards.slice(0, 3).map((card, i) => {
            const pos = positions[i]
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <PositionLabel
                  label={pos.label}
                  description={pos.description}
                  isActive={i < revealedCount}
                />

                <CardDisplay card={card} showPosition={false} size="compact" revealed={i < revealedCount} />
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.slice(3).map((card, i) => {
            const idx = i + 3
            const pos = positions[idx]
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <PositionLabel
                  label={pos.label}
                  description={pos.description}
                  isActive={idx < revealedCount}
                />

                <CardDisplay card={card} showPosition={false} size="compact" revealed={idx < revealedCount} />
              </div>
            )
          })}
        </div>
      </div>

      {allRevealed && (
        <p className="text-sm sm:text-base text-muted text-center">
          七張牌已全部揭開 — 呈現事件發展的全貌
        </p>
      )}
    </div>
  )
}
