'use client'

import { useState, type ReactNode } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-card-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-card-bg hover:bg-primary/5 transition-colors"
      >
        <span className="text-base font-semibold text-foreground">{title}</span>
        <span className={`text-lg text-muted transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-card-border">
          {children}
        </div>
      )}
    </div>
  )
}
