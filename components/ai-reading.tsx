'use client'

import { useState } from 'react'
import type { DrawnCard, SpreadType } from '@/types'
import type { ReadingMode } from '@/lib/reading-prompt'
import { getFallbackReading } from '@/lib/fallback-reading'

interface AiReadingProps {
  question: string
  spreadType: SpreadType
  cards: DrawnCard[]
}

const modes: { value: ReadingMode; label: string }[] = [
  { value: 'overall', label: '整體解讀' },
  { value: 'per-card', label: '逐張解讀' },
  { value: 'both', label: '都要' },
]

export default function AiReading({ question, spreadType, cards }: AiReadingProps) {
  const [mode, setMode] = useState<ReadingMode>('overall')
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFallback, setIsFallback] = useState(false)

  const handleFetch = async () => {
    setIsLoading(true)
    setResult(null)
    setIsFallback(false)

    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, spreadType, cards, mode }),
      })
      const data = await res.json()

      if (data.fallback) {
        setIsFallback(true)
        setResult(getFallbackReading(cards, spreadType, mode))
      } else {
        setResult(data.text)
      }
    } catch {
      setIsFallback(true)
      setResult(getFallbackReading(cards, spreadType, mode))
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full rounded-2xl border-2 border-primary/20 bg-white p-4 sm:p-6">
      <h3 className="text-xl font-bold text-primary mb-3">🔮 AI 塔羅解讀</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => { setMode(m.value); setResult(null) }}
            className={`h-touch px-4 rounded-lg text-base font-medium transition-all flex-1 sm:flex-none
              ${mode === m.value
                ? 'bg-primary text-white shadow-sm'
                : 'border-2 border-card-border text-foreground hover:border-primary-light'
              }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {!result && !isLoading && (
        <button
          onClick={handleFetch}
          className="w-full h-touch rounded-xl bg-accent text-white text-lg font-medium
                     hover:brightness-110 active:brightness-95 transition-all"
        >
          取得 AI 解讀
        </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          <span className="ml-3 text-lg text-muted">解讀中⋯</span>
        </div>
      )}

      {result && (
        <div>
          {isFallback && (
            <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-700">
              ⚠️ AI 服務暫時無法連線，以下為內建牌義參考
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            {result.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-lg font-bold text-primary mt-4 mb-2">
                    {line.replace('## ', '')}
                  </h2>
                )
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-base font-semibold text-foreground mt-3 mb-1">
                    {line.replace('### ', '')}
                  </h3>
                )
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={i} className="text-base text-foreground ml-4 list-disc">
                    {line.replace('- ', '')}
                  </li>
                )
              }
              if (line.trim() === '') return <div key={i} className="h-2" />
              return (
                <p key={i} className="text-base text-foreground leading-relaxed">
                  {line}
                </p>
              )
            })}
          </div>
          <button
            onClick={() => setResult(null)}
            className="mt-4 h-touch px-6 rounded-lg border-2 border-card-border text-foreground
                       text-base font-medium hover:border-primary-light transition-all"
          >
            重新解讀
          </button>
        </div>
      )}
    </div>
  )
}
