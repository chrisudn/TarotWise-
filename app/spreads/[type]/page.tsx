import { notFound } from 'next/navigation'
import Link from 'next/link'
import { spreads } from '@/data/spreads'
import type { SpreadType } from '@/types'

const spreadOrder: SpreadType[] = ['single', 'three-card', 'five-card', 'horseshoe', 'celtic-cross']

function DiagramSingle({ s }: { s: (typeof spreads)[string] }) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-28 h-40 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
          <span className="text-3xl">🃏</span>
        </div>
        <span className="text-sm font-medium text-primary">{s.positions[0].label}</span>
        <span className="text-xs text-muted">{s.positions[0].description}</span>
      </div>
    </div>
  )
}

function DiagramThreeCard({ s }: { s: (typeof spreads)[string] }) {
  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {s.positions.map((pos: { key: string; label: string; description: string }) => (
        <div key={pos.key} className="flex flex-col items-center gap-2">
          <div className="w-24 h-36 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
            <span className="text-3xl">🃏</span>
          </div>
          <span className="text-sm font-medium text-primary">{pos.label}</span>
          <span className="text-xs text-muted text-center max-w-24">{pos.description}</span>
        </div>
      ))}
    </div>
  )
}

function DiagramFiveCard({ s }: { s: (typeof spreads)[string] }) {
  const layout = [
    { idx: 2, gridClass: 'col-start-2 row-start-1' },
    { idx: 3, gridClass: 'col-start-1 row-start-2' },
    { idx: 0, gridClass: 'col-start-2 row-start-2' },
    { idx: 4, gridClass: 'col-start-3 row-start-2' },
    { idx: 1, gridClass: 'col-start-2 row-start-3' },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto">
      {layout.map(({ idx, gridClass }) => {
        const pos = s.positions[idx]
        return (
          <div key={pos.key} className={`flex flex-col items-center gap-1 ${gridClass}`}>
            <div className="w-full aspect-[3/4] rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
              <span className="text-2xl">🃏</span>
            </div>
            <span className="text-xs font-medium text-primary">{pos.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function DiagramCelticCross({ s }: { s: (typeof spreads)[string] }) {
  const staffPos = s.positions.slice(6)
  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-2 w-full">
        {(() => {
          const layout = [
            { idx: 4, gridClass: 'col-start-2 row-start-1' },
            { idx: 5, gridClass: 'col-start-1 row-start-2' },
            { idx: 0, gridClass: 'col-start-2 row-start-2' },
            { idx: 1, gridClass: 'col-start-2 row-start-2' },
            { idx: 3, gridClass: 'col-start-3 row-start-2' },
            { idx: 2, gridClass: 'col-start-2 row-start-3' },
          ]
          return layout.map(({ idx, gridClass }) => {
            const pos = s.positions[idx]
            return (
              <div key={pos.key} className={`flex flex-col items-center gap-1 ${gridClass}`}>
                <div className="w-full aspect-[3/4] rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
                  <span className="text-xl">{idx === 1 ? '🃏✖️' : '🃏'}</span>
                </div>
                <span className="text-[10px] font-medium text-primary text-center leading-tight">{pos.label}</span>
              </div>
            )
          })
        })()}
      </div>
      <div className="grid grid-cols-4 gap-2 w-full">
        {staffPos.map((pos: { key: string; label: string; description: string }) => (
          <div key={pos.key} className="flex flex-col items-center gap-1">
            <div className="w-full aspect-[3/4] rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
              <span className="text-xl">🃏</span>
            </div>
            <span className="text-[10px] font-medium text-primary text-center leading-tight">{pos.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DiagramHorseshoe({ s }: { s: (typeof spreads)[string] }) {
  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-3 w-full">
        {s.positions.slice(0, 3).map((pos: { key: string; label: string; description: string }) => (
          <div key={pos.key} className="flex flex-col items-center gap-1">
            <div className="w-full aspect-[3/4] rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
              <span className="text-2xl">🃏</span>
            </div>
            <span className="text-xs font-medium text-primary">{pos.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 w-full">
        {s.positions.slice(3).map((pos: { key: string; label: string; description: string }) => (
          <div key={pos.key} className="flex flex-col items-center gap-1">
            <div className="w-full aspect-[3/4] rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-center shadow-sm">
              <span className="text-xl">🃏</span>
            </div>
            <span className="text-xs font-medium text-primary">{pos.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const diagramComponents: Record<SpreadType, typeof DiagramSingle> = {
  single: DiagramSingle,
  'three-card': DiagramThreeCard,
  'five-card': DiagramFiveCard,
  horseshoe: DiagramHorseshoe,
  'celtic-cross': DiagramCelticCross,
}

function SpreadDiagram({ type, s }: { type: SpreadType; s: (typeof spreads)[string] }) {
  const C = diagramComponents[type]
  if (!C) return null
  return <C s={s} />
}

export function generateStaticParams() {
  return spreadOrder.map((type) => ({ type }))
}

export default async function SpreadPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const s = spreads[type]
  if (!s) notFound()

  return (
    <div className="flex flex-col items-center px-4 py-8 w-full max-w-2xl mx-auto">
      <Link href="/" className="self-start text-sm text-muted hover:text-primary underline underline-offset-2 mb-6">
        ← 返回首頁
      </Link>

      <article className="w-full">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">{s.nameZh}</h1>
          <span className="inline-block mt-2 rounded-full bg-primary/10 text-primary text-sm px-3 py-1 font-medium">
            {s.focus}
          </span>
          <p className="mt-3 text-base text-muted leading-relaxed">{s.suitableFor}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">牌陣示意圖</h2>
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 flex items-center justify-center">
            <SpreadDiagram type={type as SpreadType} s={s} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">牌位說明</h2>
          <div className="flex flex-col gap-3">
            {s.positions.map((pos) => (
              <div key={pos.key} className="flex items-start gap-3 bg-card-bg border border-card-border rounded-xl p-4">
                <span className="text-lg font-bold text-primary whitespace-nowrap min-w-[3em]">{pos.label}</span>
                <span className="text-base text-foreground">{pos.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-accent/10 border border-accent/30 rounded-2xl p-5">
          <h2 className="text-base font-bold text-foreground mb-2">💡 {s.nameZh} 適合用來</h2>
          <p className="text-base text-foreground leading-relaxed">{s.suitableFor}</p>
          <p className="mt-2 text-sm text-muted">
            此牌陣使用 {s.cardCount} 張牌，抽牌後可搭配 AI 解讀功能獲取個人化分析。
          </p>
        </section>
      </article>
    </div>
  )
}
