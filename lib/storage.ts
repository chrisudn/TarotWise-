import type { ReadingRecord } from '@/types'

const STORAGE_KEY = 'tarotwise-history'
const MAX_RECORDS = 200

export function getRecords(): ReadingRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRecord(record: ReadingRecord): boolean {
  const records = getRecords()
  if (records.length >= MAX_RECORDS) {
    return false
  }
  records.unshift(record)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    return true
  } catch {
    return false
  }
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function updateRecord(id: string, updates: Partial<ReadingRecord>): void {
  const records = getRecords().map(r =>
    r.id === id ? { ...r, ...updates } : r
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function getRecordById(id: string): ReadingRecord | null {
  const records = getRecords()
  return records.find(r => r.id === id) ?? null
}
