'use client'

import { useState, useCallback } from 'react'
import { drawSingleCard, drawSpread } from '@/lib/tarot-reader'
import { saveRecord } from '@/lib/storage'
import CardDisplay from '@/components/card-display'
import SpreadSelector from '@/components/spread-selector'
import SpreadThreeCard from '@/components/spread-three-card'
import SpreadFiveCard from '@/components/spread-five-card'
import SpreadHorseshoe from '@/components/spread-horseshoe'
import Button from '@/components/ui/button'
import AiReading from '@/components/ai-reading'
import type { DrawnCard, SpreadType } from '@/types'

export default function Home() {
  const [spreadType, setSpreadType] = useState<SpreadType>('single')
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<DrawnCard[] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleDraw = useCallback(() => {
    setIsDrawing(true)
    setSaved(false)

    if (spreadType === 'single') {
      const card = drawSingleCard()
      setResult([card])
    } else {
      const cards = drawSpread(spreadType)
      setResult(cards)
    }

    setIsDrawing(false)
  }, [spreadType])

  const handleSave = useCallback(() => {
    if (!result) return
    const record = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      question,
      spreadType,
      cards: result,
    }
    const ok = saveRecord(record)
    if (ok) {
      setSaved(true)
    } else {
      alert('儲存空間已滿（上限 200 筆），請刪除舊記錄後再試')
    }
  }, [result, question, spreadType])

  const handleClear = useCallback(() => {
    setResult(null)
    setQuestion('')
    setSaved(false)
  }, [])

  const handleSpreadChange = useCallback((type: SpreadType) => {
    setSpreadType(type)
    setResult(null)
    setSaved(false)
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
              <Button onClick={handleSave} variant="secondary" disabled={saved} className="w-full sm:w-auto">
                {saved ? '✓ 已儲存' : '儲存結果'}
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
            <SpreadThreeCard cards={result} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button onClick={handleSave} variant="secondary" disabled={saved} className="w-full sm:w-auto">
                {saved ? '✓ 已儲存' : '儲存結果'}
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
            <SpreadFiveCard cards={result} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button onClick={handleSave} variant="secondary" disabled={saved} className="w-full sm:w-auto">
                {saved ? '✓ 已儲存' : '儲存結果'}
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
            <SpreadHorseshoe cards={result} />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button onClick={handleSave} variant="secondary" disabled={saved} className="w-full sm:w-auto">
                {saved ? '✓ 已儲存' : '儲存結果'}
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
    <div className="flex flex-col flex-1 items-center px-4 py-8 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-display font-bold text-primary">
          🃏 TarotWise
        </h1>
        <p className="text-lg text-muted mt-2">塔羅智慧 — 傾聽內心的聲音</p>
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
            <AiReading question={question} spreadType={spreadType} cards={result} />
          </div>
        )}
      </main>

      <footer className="mt-auto pt-8 text-sm text-muted text-center">
        <a href="/history" className="hover:text-primary underline underline-offset-2">
          查看歷史記錄
        </a>
      </footer>
    </div>
  )
}
