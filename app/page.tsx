'use client'

import Link from 'next/link'
import { useState, useCallback, useEffect, useRef } from 'react'
import { drawSingleCard, drawSpread } from '@/lib/tarot-reader'
import { saveRecord, updateRecord, deleteRecord } from '@/lib/storage'
import CardDisplay from '@/components/card-display'
import SpreadSelector from '@/components/spread-selector'
import SpreadThreeCard from '@/components/spread-three-card'
import SpreadFiveCard from '@/components/spread-five-card'
import SpreadHorseshoe from '@/components/spread-horseshoe'
import SpreadCelticCross from '@/components/spread-celtic-cross'
import Button from '@/components/ui/button'
import AiReading from '@/components/ai-reading'
import type { DrawnCard, SpreadType } from '@/types'

export default function Home() {
  const [spreadType, setSpreadType] = useState<SpreadType>('single')
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<DrawnCard[] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [allRevealed, setAllRevealed] = useState(false)
  const currentRecordId = useRef<string | null>(null)

  const handleDraw = useCallback(() => {
    setIsDrawing(true)
    setAllRevealed(false)

    // delete previous draft if exists
    if (currentRecordId.current) {
      deleteRecord(currentRecordId.current)
      currentRecordId.current = null
    }

    if (spreadType === 'single') {
      const card = drawSingleCard()
      setResult([card])
      setAllRevealed(true)
    } else {
      const cards = drawSpread(spreadType)
      setResult(cards)
    }

    setIsDrawing(false)
  }, [spreadType])

  // auto-save record when cards are drawn
  useEffect(() => {
    if (!result) return
    const id = crypto.randomUUID()
    saveRecord({
      id,
      timestamp: Date.now(),
      question,
      spreadType,
      cards: result,
      note: '',
    })
    currentRecordId.current = id
  }, [result])

  // persist AI readings to localStorage as they arrive
  const handleReadingUpdate = useCallback((readings: Record<string, string>) => {
    if (currentRecordId.current) {
      updateRecord(currentRecordId.current, { aiReading: readings })
    }
  }, [])

  const handleClear = useCallback(() => {
    if (currentRecordId.current) {
      deleteRecord(currentRecordId.current)
      currentRecordId.current = null
    }
    setResult(null)
    setQuestion('')
    setAllRevealed(false)
  }, [])

  const handleSpreadChange = useCallback((type: SpreadType) => {
    if (currentRecordId.current) {
      deleteRecord(currentRecordId.current)
      currentRecordId.current = null
    }
    setSpreadType(type)
    setResult(null)
    setAllRevealed(false)
  }, [])

  function renderSpread() {
    if (!result) return null

    switch (spreadType) {
      case 'single':
        return (
          <>
            <div className="w-full max-w-xs">
              <CardDisplay card={result[0]} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="secondary" disabled className="w-full sm:w-auto">
                ✓ 已自動儲存
              </Button>
              <Button onClick={handleClear} variant="ghost" className="w-full sm:w-auto">
                再抽一次
              </Button>
            </div>
          </>
        )
      case 'three-card':
        return (
          <>
            <SpreadThreeCard cards={result} onAllRevealed={() => setAllRevealed(true)} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="secondary" disabled className="w-full sm:w-auto">
                ✓ 已自動儲存
              </Button>
              <Button onClick={handleClear} variant="ghost" className="w-full sm:w-auto">
                重新來過
              </Button>
            </div>
          </>
        )
      case 'five-card':
        return (
          <>
            <SpreadFiveCard cards={result} onAllRevealed={() => setAllRevealed(true)} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="secondary" disabled className="w-full sm:w-auto">
                ✓ 已自動儲存
              </Button>
              <Button onClick={handleClear} variant="ghost" className="w-full sm:w-auto">
                重新來過
              </Button>
            </div>
          </>
        )
      case 'horseshoe':
        return (
          <>
            <SpreadHorseshoe cards={result} onAllRevealed={() => setAllRevealed(true)} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="secondary" disabled className="w-full sm:w-auto">
                ✓ 已自動儲存
              </Button>
              <Button onClick={handleClear} variant="ghost" className="w-full sm:w-auto">
                重新來過
              </Button>
            </div>
          </>
        )
      case 'celtic-cross':
        return (
          <>
            <SpreadCelticCross cards={result} onAllRevealed={() => setAllRevealed(true)} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="secondary" disabled className="w-full sm:w-auto">
                ✓ 已自動儲存
              </Button>
              <Button onClick={handleClear} variant="ghost" className="w-full sm:w-auto">
                重新來過
              </Button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <header className="text-center mb-6">
        <h1 className="text-display font-bold text-primary">
          🃏 TarotWise
        </h1>
        <p className="text-lg text-muted mt-2">塔羅智慧 — 傾聽內心的聲音</p>
        <Link
          href="/history"
          className="inline-block mt-2 text-sm text-primary hover:text-primary-light underline underline-offset-2"
        >
          歷史記錄 →
        </Link>
      </header>

      <main className="flex flex-col items-center w-full max-w-lg gap-6">
        <SpreadSelector value={spreadType} onChange={handleSpreadChange} />

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 200))}
          placeholder="請輸入你想問的問題⋯（選填）"
          className="w-full min-h-touch rounded-xl border-2 border-card-border bg-card-bg px-5 py-3 text-lg
                     placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
          rows={2}
        />

        {!result && (
          <Button onClick={handleDraw} disabled={isDrawing} size="large">
            {isDrawing ? '抽牌中⋯' : '開始抽牌'}
          </Button>
        )}

        {result && (
          <div className="flex flex-col items-center gap-6 w-full animate-in fade-in duration-300">
            {renderSpread()}
            <AiReading question={question} spreadType={spreadType} cards={result} disabled={!allRevealed} onReadingUpdate={handleReadingUpdate} />
          </div>
        )}
      </main>
    </div>
  )
}
