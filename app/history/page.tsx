'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRecords } from '@/lib/storage'
import { spreads } from '@/data/spreads'
import type { SpreadType } from '@/types'
import HistoryCard from '@/components/history-card'
import Button from '@/components/ui/button'

export default function HistoryPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [records, setRecords] = useState<ReturnType<typeof getRecords>>([])

  useEffect(() => {
    setRecords(getRecords())
    setMounted(true)
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterSpread, setFilterSpread] = useState<SpreadType | ''>('')

  const filtered = useMemo(() => {
    let list = records

    if (filterSpread) {
      list = list.filter((r) => r.spreadType === filterSpread)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((r) => {
        const question = r.question?.toLowerCase() ?? ''
        const note = r.note?.toLowerCase() ?? ''
        const cardNames = r.cards.map((c) => c.card.nameZh + c.card.name).join('').toLowerCase()
        return question.includes(q) || note.includes(q) || cardNames.includes(q)
      })
    }

    return list
  }, [records, searchQuery, filterSpread])

  const allSpreadTypes = [...new Set(records.map((r) => r.spreadType))]

  if (!mounted) {
    return (
      <div className="flex flex-col flex-1 min-h-screen px-4 py-8">
        <header className="flex items-center gap-4 mb-6">
          <Button onClick={() => router.push('/')} variant="ghost">
            ← 返回
          </Button>
          <h1 className="text-2xl font-bold text-primary">歷史記錄</h1>
        </header>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen px-4 py-8">
      <header className="flex items-center gap-4 mb-6">
        <Button onClick={() => router.push('/')} variant="ghost">
          ← 返回
        </Button>
        <h1 className="text-2xl font-bold text-primary">歷史記錄</h1>
      </header>

      <main className="flex flex-col w-full max-w-lg mx-auto gap-3">
        <div className="flex gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋問題、心得、牌名⋯"
            className="flex-1 min-h-touch rounded-xl border-2 border-card-border bg-card-bg px-4 py-2 text-base
                       placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <select
            value={filterSpread}
            onChange={(e) => setFilterSpread(e.target.value as SpreadType | '')}
            className="min-h-touch rounded-xl border-2 border-card-border bg-card-bg px-3 py-2 text-base
                       focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            <option value="">全部牌陣</option>
            {allSpreadTypes.map((t) => (
              <option key={t} value={t}>
                {spreads[t]?.nameZh ?? t}
              </option>
            ))}
          </select>
        </div>

        {records.length >= 200 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 text-base">
            儲存空間已滿（200 筆上限），請刪除舊記錄後再試
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted text-lg">
            {records.length === 0 ? (
              <>
                還沒有抽牌記錄<br />
                <button
                  onClick={() => router.push('/')}
                  className="text-primary underline underline-offset-2 mt-2"
                >
                  開始第一次抽牌
                </button>
              </>
            ) : (
              '沒有符合條件的記錄'
            )}
          </div>
        ) : (
          filtered.map((record) => (
            <HistoryCard
              key={record.id}
              record={record}
              onClick={() => router.push(`/history/${record.id}`)}
            />
          ))
        )}
      </main>
    </div>
  )
}
