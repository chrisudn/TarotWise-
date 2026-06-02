'use client'

import Link from 'next/link'
import type { SpreadType } from '@/types'
import { spreads } from '@/data/spreads'

interface SpreadSelectorProps {
  value: SpreadType
  onChange: (value: SpreadType) => void
}

const spreadOrder: SpreadType[] = ['single', 'three-card', 'five-card', 'horseshoe', 'celtic-cross']

export default function SpreadSelector({ value, onChange }: SpreadSelectorProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="牌陣選擇">
        {spreadOrder.map((type) => {
          const s = spreads[type]
          const isActive = value === type
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              role="radio"
              aria-checked={isActive}
              className={`flex flex-col items-center gap-1 rounded-xl p-3 text-center transition-all
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-card-bg text-foreground border-2 border-card-border hover:border-primary-light'
                }`}
            >
              <span className="text-base font-bold leading-tight">{s.nameZh}</span>
              <span
                className={`text-[11px] leading-tight rounded-full px-2 py-0.5
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/10 text-primary'
                  }`}
              >
                {s.focus}
              </span>
            </button>
          )
        })}
      </div>
      <p className="text-sm text-muted text-center leading-relaxed">
        {spreads[value].suitableFor}
      </p>
      <Link
        href={`/spreads/${value}`}
        className="text-sm text-primary hover:text-primary-light underline underline-offset-2 text-center"
      >
        查看牌陣說明 →
      </Link>
    </div>
  )
}
