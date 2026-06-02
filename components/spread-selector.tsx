'use client'

import type { SpreadType } from '@/types'

interface SpreadSelectorProps {
  value: SpreadType
  onChange: (value: SpreadType) => void
}

const options: { value: SpreadType; label: string }[] = [
  { value: 'single', label: '單卡抽牌' },
  { value: 'three-card', label: '三張牌陣' },
]

export default function SpreadSelector({ value, onChange }: SpreadSelectorProps) {
  return (
    <div className="flex gap-2 w-full" role="radiogroup" aria-label="牌陣選擇">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          role="radio"
          aria-checked={value === opt.value}
          className={`flex-1 h-touch rounded-xl text-lg font-medium transition-all
            ${
              value === opt.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-card-bg text-foreground border-2 border-card-border hover:border-primary-light'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
