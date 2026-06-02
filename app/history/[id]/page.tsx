'use client'

import { useParams, useRouter } from 'next/navigation'
import { getRecordById, deleteRecord } from '@/lib/storage'
import CardDisplay from '@/components/card-display'
import Button from '@/components/ui/button'

export default function HistoryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const record = getRecordById(params.id as string)

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

  const spreadLabel = record.spreadType === 'single' ? '單卡抽牌' : '三張牌陣'

  const handleDelete = () => {
    if (window.confirm('確定刪除這筆記錄？')) {
      deleteRecord(record.id)
      router.push('/history')
    }
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

          {record.question && (
            <div className="mb-4">
              <span className="text-sm text-muted">問題</span>
              <p className="text-lg mt-1">{record.question}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {record.cards.map((card, i) => (
            <CardDisplay key={i} card={card} />
          ))}
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <Button onClick={() => router.push('/')} variant="secondary">
            再抽一次
          </Button>
          <Button onClick={handleDelete} variant="ghost">
            刪除記錄
          </Button>
        </div>
      </main>
    </div>
  )
}
