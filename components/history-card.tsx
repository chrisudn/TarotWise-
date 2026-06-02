'use client'

import type { ReadingRecord } from '@/types'

interface HistoryCardProps {
  record: ReadingRecord
  onClick: () => void
}

export default function HistoryCard({ record, onClick }: HistoryCardProps) {
  const date = new Date(record.timestamp)
  const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  const spreadLabel = record.spreadType === 'single' ? '單卡' : '三張牌陣'
  const questionPreview = record.question
    ? record.question.length > 20
      ? record.question.slice(0, 20) + '⋯'
      : record.question
    : '（未輸入問題）'

  const cardNames = record.cards.map((c) => c.card.nameZh).join('、')

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border-2 border-card-border bg-card-bg p-5
                 hover:border-primary-light hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted">{dateStr}</span>
        <span className="text-sm font-medium rounded-full bg-primary/10 text-primary px-3 py-0.5">
          {spreadLabel}
        </span>
      </div>

      {record.question && (
        <p className="text-base font-medium mb-1">{questionPreview}</p>
      )}

      <p className="text-sm text-muted">{cardNames}</p>
    </button>
  )
}
