'use client'

import { useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CollapsibleSection from './collapsible-section'
import type { DrawnCard, SpreadType } from '@/types'
import type { ReadingMode } from '@/lib/reading-prompt'
import { getFallbackReading } from '@/lib/fallback-reading'

interface AiReadingProps {
  question: string
  spreadType: SpreadType
  cards: DrawnCard[]
  disabled?: boolean
}

const modes: { value: ReadingMode; label: string }[] = [
  { value: 'overall', label: '整體解讀' },
  { value: 'per-card', label: '逐張解讀' },
  { value: 'both', label: '都要' },
]

interface CachedResult {
  text: string
  isFallback: boolean
}

const cardHeaderRe = /^### .+? — .+?（正位|逆位）$/m

interface Block {
  type: 'card' | 'text'
  header?: string
  content: string
}

function parseIntoBlocks(text: string): Block[] {
  const blocks: Block[] = []
  let buf = ''
  let currentHeader = ''

  for (const line of text.split('\n')) {
    if (cardHeaderRe.test(line)) {
      if (buf) blocks.push({ type: 'text', content: buf })
      currentHeader = line.replace(/^### /, '')
      buf = ''
    } else {
      buf += line + '\n'
    }
  }

  if (buf) {
    blocks.push(currentHeader
      ? { type: 'card', header: currentHeader, content: buf }
      : { type: 'text', content: buf })
  }

  return blocks
}

function ReadingContent({ text }: { text: string }) {
  const blocks = parseIntoBlocks(text)

  const elements: ReactNode[] = []
  let cardIdx = 0

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]

    if (b.type === 'card') {
      elements.push(
        <CollapsibleSection key={`card-${cardIdx}`} title={b.header!}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {b.content}
          </ReactMarkdown>
        </CollapsibleSection>,
      )
      cardIdx++
    } else {
      elements.push(
        <div key={`text-${i}`} className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {b.content}
          </ReactMarkdown>
        </div>,
      )
    }
  }

  return <div className="flex flex-col gap-3">{elements}</div>
}

export default function AiReading({ question, spreadType, cards, disabled }: AiReadingProps) {
  const [mode, setMode] = useState<ReadingMode>('overall')
  const [cache, setCache] = useState<Partial<Record<ReadingMode, CachedResult>>>({})
  const [loadingMode, setLoadingMode] = useState<ReadingMode | null>(null)

  const current = cache[mode]

  const handleFetch = async () => {
    setLoadingMode(mode)

    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, spreadType, cards, mode }),
      })
      const data = await res.json()

      if (data.fallback) {
        setCache((prev) => ({
          ...prev,
          [mode]: { text: getFallbackReading(cards, spreadType, mode), isFallback: true },
        }))
      } else {
        setCache((prev) => ({
          ...prev,
          [mode]: { text: data.text, isFallback: false },
        }))
      }
    } catch {
      setCache((prev) => ({
        ...prev,
        [mode]: { text: getFallbackReading(cards, spreadType, mode), isFallback: true },
      }))
    }

    setLoadingMode(null)
  }

  const handleReRead = () => {
    setCache((prev) => {
      const next = { ...prev }
      delete next[mode]
      return next
    })
  }

  return (
    <div className="w-full rounded-2xl border-2 border-primary/20 bg-white p-4 sm:p-6">
      <h3 className="text-xl font-bold text-primary mb-3">🔮 AI 塔羅解讀</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
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

      {!current && loadingMode !== mode && (
        <button
          onClick={disabled ? undefined : handleFetch}
          disabled={disabled}
          className={`w-full h-touch rounded-xl text-lg font-medium transition-all
            ${disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-accent text-white hover:brightness-110 active:brightness-95'
            }`}
        >
          {disabled ? '請先翻完所有牌' : '取得 AI 解讀'}
        </button>
      )}

      {loadingMode === mode && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          <span className="ml-3 text-lg text-muted">解讀中⋯</span>
        </div>
      )}

      {current && (
        <div>
          {current.isFallback && (
            <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-700">
              ⚠️ AI 服務暫時無法連線，以下為內建牌義參考
            </div>
          )}
          <ReadingContent text={current.text} />
          <button
            onClick={handleReRead}
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
