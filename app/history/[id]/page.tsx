'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getRecordById, updateRecord, deleteRecord } from '@/lib/storage'
import { spreads } from '@/data/spreads'
import CardDisplay from '@/components/card-display'
import ReadingContent from '@/components/reading-content'
import SpreadThreeCard from '@/components/spread-three-card'
import SpreadFiveCard from '@/components/spread-five-card'
import SpreadHorseshoe from '@/components/spread-horseshoe'
import SpreadCelticCross from '@/components/spread-celtic-cross'
import Button from '@/components/ui/button'

export default function HistoryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const record = getRecordById(params.id as string)

  const [isEditing, setIsEditing] = useState(false)
  const [editQuestion, setEditQuestion] = useState(record?.question ?? '')
  const [editNote, setEditNote] = useState(record?.note ?? '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <p className="text-xl text-muted">找不到這筆記錄</p>
        <Button onClick={() => router.push('/history')} variant="secondary">
          返回歷史記錄
        </Button>
      </div>
    )
  }

  const date = new Date(record.timestamp)
  const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  const spreadLabel = spreads[record.spreadType]?.nameZh ?? record.spreadType

  const handleSave = () => {
    updateRecord(record.id, { question: editQuestion, note: editNote })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditQuestion(record.question)
    setEditNote(record.note ?? '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteRecord(record.id)
    router.push('/history')
  }

  const handleExport = () => {
    const modeLabels: Record<string, string> = {
      overall: '整體解讀',
      'per-card': '逐張解讀',
      both: '都要',
    }

    const lines = [
      `TarotWise 塔羅記錄`,
      `日期：${dateStr}`,
      `牌陣：${spreadLabel}`,
      `問題：${record.question || '（未填寫）'}`,
      ``,
      `牌卡：`,
      ...record.cards.map((c, i) => {
        const pos = record.cards.length > 1 ? `[${c.positionLabel}] ` : ''
        const orientation = c.isReversed ? '逆位' : '正位'
        return `${pos}${c.card.nameZh}（${orientation}）— ${c.card.name}`
      }),
      ``,
    ]
    if (record.aiReading) {
      lines.push(`AI 塔羅解讀：`, ``)
      for (const [mode, text] of Object.entries(record.aiReading)) {
        lines.push(`【${modeLabels[mode] ?? mode}】`, ``, text, ``)
      }
    }
    if (record.note) {
      lines.push(`心得：`, record.note, ``)
    }
    lines.push(`—— 由 TarotWise 製作`)

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tarot-${record.id.slice(0, 8)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen px-4 py-8">
      <header className="flex items-center gap-4 mb-6">
        <Button onClick={() => router.push('/history')} variant="ghost">
          ← 返回
        </Button>
        <h1 className="text-2xl font-bold text-primary">記錄詳情</h1>
      </header>

      <main className="flex flex-col w-full max-w-lg mx-auto gap-4">
        <div className="rounded-xl bg-card-bg border-2 border-card-border p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base text-muted">{dateStr}</span>
            <span className="text-sm font-medium rounded-full bg-primary/10 text-primary px-3 py-0.5">
              {spreadLabel}
            </span>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-sm text-muted">問題</span>
                <textarea
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value.slice(0, 200))}
                  className="w-full min-h-[48px] rounded-xl border-2 border-card-border bg-white px-4 py-3 text-lg
                             placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light resize-none mt-1"
                  rows={2}
                />
              </div>
              <div>
                <span className="text-sm text-muted">心得</span>
                <textarea
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value.slice(0, 1000))}
                  placeholder="寫下你的心得與反思⋯"
                  className="w-full min-h-[48px] rounded-xl border-2 border-card-border bg-white px-4 py-3 text-lg
                             placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light resize-none mt-1"
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSave} variant="primary" className="flex-1">
                  儲存
                </Button>
                <Button onClick={handleCancelEdit} variant="ghost" className="flex-1">
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {record.question && (
                <div className="mb-4">
                  <span className="text-sm text-muted">問題</span>
                  <p className="text-lg mt-1">{record.question}</p>
                </div>
              )}
              {record.note && (
                <div>
                  <span className="text-sm text-muted">心得</span>
                  <p className="text-lg mt-1 whitespace-pre-wrap">{record.note}</p>
                </div>
              )}
              <Button onClick={() => setIsEditing(true)} variant="secondary" className="mt-4 w-full">
                {record.note ? '編輯內容' : '寫下心得'}
              </Button>
            </div>
          )}
        </div>

        <div className="w-full">
          {record.spreadType === 'three-card' && (
            <SpreadThreeCard cards={record.cards} revealed />
          )}
          {record.spreadType === 'five-card' && (
            <SpreadFiveCard cards={record.cards} revealed />
          )}
          {record.spreadType === 'horseshoe' && (
            <SpreadHorseshoe cards={record.cards} revealed />
          )}
          {record.spreadType === 'celtic-cross' && (
            <SpreadCelticCross cards={record.cards} revealed />
          )}
          {(record.spreadType === 'single' || !['three-card', 'five-card', 'horseshoe', 'celtic-cross'].includes(record.spreadType)) && (
            <div className="flex flex-col items-center gap-4">
              {record.cards.map((card, i) => (
                <CardDisplay key={i} card={card} />
              ))}
            </div>
          )}
        </div>

        {record.aiReading && Object.keys(record.aiReading).length > 0 && (
          <div className="rounded-2xl border-2 border-primary/20 bg-white p-4 sm:p-6">
            <h3 className="text-xl font-bold text-primary mb-3">🔮 AI 塔羅解讀</h3>
            {Object.entries(record.aiReading).map(([mode, text]) => {
              const modeLabels: Record<string, string> = {
                overall: '整體解讀',
                'per-card': '逐張解讀',
                both: '都要',
              }
              return (
                <div key={mode} className="mb-4 last:mb-0">
                  <h4 className="text-base font-semibold text-foreground mb-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary inline-block">
                    {modeLabels[mode] ?? mode}
                  </h4>
                  <ReadingContent text={text} />
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-3 justify-center mt-4 flex-wrap">
          <Button onClick={() => router.push('/')} variant="secondary">
            再抽一次
          </Button>
          <Button onClick={handleExport} variant="secondary">
            匯出文字檔
          </Button>
          <Button onClick={() => setShowDeleteConfirm(true)} variant="ghost">
            刪除記錄
          </Button>
        </div>
      </main>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">確定刪除？</h3>
            <p className="text-base text-muted mb-6">刪除後無法復原，是否繼續？</p>
            <div className="flex gap-3">
              <Button onClick={handleDelete} variant="primary" className="flex-1">
                刪除
              </Button>
              <Button onClick={() => setShowDeleteConfirm(false)} variant="ghost" className="flex-1">
                取消
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
