'use client'

import { type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CollapsibleSection from './collapsible-section'

const cardHeaderRe = /^### .+? — .+?（正位|逆位）$/m

interface Block {
  type: 'card' | 'text'
  header?: string
  content: string
}

function parseIntoBlocks(text: string): Block[] {
  const blocks: Block[] = []
  let buf = ''
  let currentHeader = ''

  for (const line of text.split('\n')) {
    if (cardHeaderRe.test(line)) {
      if (buf) blocks.push({ type: 'text', content: buf })
      currentHeader = line.replace(/^### /, '')
      buf = ''
    } else {
      buf += line + '\n'
    }
  }

  if (buf) {
    blocks.push(currentHeader
      ? { type: 'card', header: currentHeader, content: buf }
      : { type: 'text', content: buf })
  }

  return blocks
}

export default function ReadingContent({ text }: { text: string }) {
  const blocks = parseIntoBlocks(text)

  const elements: ReactNode[] = []
  let cardIdx = 0

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]

    if (b.type === 'card') {
      elements.push(
        <CollapsibleSection key={`card-${cardIdx}`} title={b.header!}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {b.content}
          </ReactMarkdown>
        </CollapsibleSection>,
      )
      cardIdx++
    } else {
      elements.push(
        <div key={`text-${i}`} className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {b.content}
          </ReactMarkdown>
        </div>,
      )
    }
  }

  return <div className="flex flex-col gap-3">{elements}</div>
}
