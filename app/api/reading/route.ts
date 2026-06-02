import { NextResponse } from 'next/server'
import type { DrawnCard, SpreadType } from '@/types'
import type { ReadingMode } from '@/lib/reading-prompt'
import { buildPrompt } from '@/lib/reading-prompt'

interface RequestBody {
  question: string
  spreadType: SpreadType
  cards: DrawnCard[]
  mode: ReadingMode
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const { question, spreadType, cards, mode } = body

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ fallback: true, mode })
    }

    const prompt = buildPrompt(question, spreadType, cards, mode)
    const { default: OpenAI } = await import('openai')
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: mode === 'per-card' ? 800 : mode === 'both' ? 1200 : 600,
    })

    const text = completion.choices[0]?.message?.content

    if (!text) {
      return NextResponse.json({ fallback: true, mode })
    }

    return NextResponse.json({ text, mode })
  } catch {
    return NextResponse.json({ fallback: true })
  }
}
