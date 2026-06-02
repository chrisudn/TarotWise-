'use client'

import { useState, useEffect } from 'react'
import type { DrawnCard } from '@/types'
import CardDisplay from './card-display'
import PositionLabel from './position-label'
import { spreads } from '@/data/spreads'

interface SpreadCelticCrossProps {
  cards: DrawnCard[]
  onAllRevealed?: () => void
  revealed?: boolean
}

const positions = spreads['celtic-cross'].positions

function cardOrPlaceholder(card: DrawnCard, idx: number, revealedCount: number) {
  return (
    <div className="w-full">
      <CardDisplay card={card} showPosition={false} size="compact" revealed={idx < revealedCount} />
    </div>
  )
}

export default function SpreadCelticCross({ cards, onAllRevealed, revealed = false }: SpreadCelticCrossProps) {
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
  const staffCards = cards.slice(6)

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

      <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
          {/* 5 展望 — 上 */}
          <div className="flex flex-col items-center gap-1 col-start-2 row-start-1">
            <PositionLabel label={positions[4].label} description={positions[4].description} isActive={revealedCount >= 5} />
            {cardOrPlaceholder(cards[4], 4, revealedCount)}
          </div>

          {/* 6 未來 — 左 */}
          <div className="flex flex-col items-center gap-1 col-start-1 row-start-2">
            <PositionLabel label={positions[5].label} description={positions[5].description} isActive={revealedCount >= 6} />
            {cardOrPlaceholder(cards[5], 5, revealedCount)}
          </div>

          {/* 中心：1 現在 + 2 阻礙（重疊） */}
          <div className="flex flex-col items-center gap-1 col-start-2 row-start-2">
            <PositionLabel label={positions[0].label} description={positions[0].description} isActive={revealedCount >= 1} />
            <PositionLabel label={positions[1].label} description={positions[1].description} isActive={revealedCount >= 2} />
            <div className="relative w-full">
              <div className="relative">
                <div className="w-full">
                  <CardDisplay card={cards[0]} showPosition={false} size="compact" revealed={revealedCount >= 1} />
                </div>
                <div className="absolute top-0 left-0 w-full -rotate-3 origin-center z-10">
                  <div className="shadow-lg rounded-2xl overflow-visible">
                    <CardDisplay card={cards[1]} showPosition={false} size="compact" revealed={revealedCount >= 2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 過去 — 右 */}
          <div className="flex flex-col items-center gap-1 col-start-3 row-start-2">
            <PositionLabel label={positions[3].label} description={positions[3].description} isActive={revealedCount >= 4} />
            {cardOrPlaceholder(cards[3], 3, revealedCount)}
          </div>

          {/* 3 基礎 — 下 */}
          <div className="flex flex-col items-center gap-1 col-start-2 row-start-3">
            <PositionLabel label={positions[2].label} description={positions[2].description} isActive={revealedCount >= 3} />
            {cardOrPlaceholder(cards[2], 2, revealedCount)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
          {staffCards.map((card, i) => {
            const idx = i + 6
            const pos = positions[idx]
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <PositionLabel label={pos.label} description={pos.description} isActive={idx < revealedCount} />
                {cardOrPlaceholder(card, idx, revealedCount)}
              </div>
            )
          })}
        </div>
      </div>

      {allRevealed && (
        <p className="text-sm sm:text-base text-muted text-center">
          十張牌已全部揭開 — 從核心到環境，完整洞悉你的人生全局
        </p>
      )}
    </div>
  )
}
