'use client'

import { useState, useEffect } from 'react'
import type { DrawnCard } from '@/types'
import CardDisplay from './card-display'
import PositionLabel from './position-label'
import { spreads } from '@/data/spreads'

interface SpreadFiveCardProps {
  cards: DrawnCard[]
  onAllRevealed?: () => void
  revealed?: boolean
}

const positions = spreads['five-card'].positions
const gridMap: Record<string, string> = {
  center: 'col-start-2 row-start-2',
  bottom: 'col-start-2 row-start-3',
  top: 'col-start-2 row-start-1',
  left: 'col-start-1 row-start-2',
  right: 'col-start-3 row-start-2',
}

export default function SpreadFiveCard({ cards, onAllRevealed, revealed = false }: SpreadFiveCardProps) {
  const [revealedCount, setRevealedCount] = useState(revealed ? cards.length : 0)

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

      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm mx-auto">
        {cards.map((card, i) => {
          const pos = positions[i]
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 ${gridMap[pos.key]}`}
            >
              <PositionLabel
                label={pos.label}
                description={pos.description}
                isActive={i < revealedCount}
              />

              <div className="w-full">
                <CardDisplay card={card} showPosition={false} size="compact" revealed={i < revealedCount} />
              </div>
            </div>
          )
        })}
      </div>

      {allRevealed && (
        <p className="text-sm sm:text-base text-muted text-center">
          五張牌已全部揭開 — 從多個面向深入分析你的問題
        </p>
      )}
    </div>
  )
}
