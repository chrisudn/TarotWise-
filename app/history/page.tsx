'use client'

import { useRouter } from 'next/navigation'
import { getRecords } from '@/lib/storage'
import HistoryCard from '@/components/history-card'
import Button from '@/components/ui/button'

export default function HistoryPage() {
  const router = useRouter()
  const records = getRecords()

  return (
    <div className="flex flex-col flex-1 min-h-screen px-4 py-8">
      <header className="flex items-center gap-4 mb-6">
        <Button onClick={() => router.push('/')} variant="ghost">
          ← 返回
        </Button>
        <h1 className="text-2xl font-bold text-primary">歷史記錄</h1>
      </header>

      <main className="flex flex-col w-full max-w-lg mx-auto gap-3">
        {records.length >= 200 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 text-base">
            儲存空間已滿（200 筆上限），請刪除舊記錄後再試
          </div>
        )}

        {records.length === 0 ? (
          <div className="text-center py-16 text-muted text-lg">
            還沒有抽牌記錄<br />
            <button
              onClick={() => router.push('/')}
              className="text-primary underline underline-offset-2 mt-2"
            >
              開始第一次抽牌
            </button>
          </div>
        ) : (
          records.map((record) => (
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
