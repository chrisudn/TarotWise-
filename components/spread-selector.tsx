'use client'

import type { SpreadType } from '@/types'

interface SpreadSelectorProps {
  value: SpreadType
  onChange: (value: SpreadType) => void
}

const options: { value: SpreadType; label: string }[] = [
  { value: 'single', label: '單卡抽牌' },
  { value: 'three-card', label: '三張牌陣' },
  { value: 'five-card', label: '五張十字' },
  { value: 'horseshoe', label: '馬蹄鐵' },
]

const hints: Record<SpreadType, string> = {
  'single': '適合：每日指引、快速解答、心情 check-in',
  'three-card': '適合：多數問題 — 了解過去/現在/未來的脈絡',
  'five-card': '適合：需要深入分析 — 從多個面向看清問題核心',
  'horseshoe': '適合：事件發展全貌、人生規劃、一週展望',
}

export default function SpreadSelector({ value, onChange }: SpreadSelectorProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2 w-full flex-wrap" role="radiogroup" aria-label="牌陣選擇">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            role="radio"
            aria-checked={value === opt.value}
            className={`flex-1 min-w-[calc(50%-4px)] sm:min-w-0 h-touch rounded-xl text-base sm:text-lg font-medium transition-all
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
      <p className="text-sm text-muted text-center leading-relaxed">
        {hints[value]}
      </p>
    </div>
  )
}
