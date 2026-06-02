const placeholderImages = [
  '/cards/00-the-fool.jpg',
  '/cards/01-the-magician.jpg',
  '/cards/02-the-high-priestess.jpg',
]

export function getCardImageSrc(cardId: number, cardName: string): string | null {
  const id = String(cardId).padStart(2, '0')
  const name = cardName
    .toLowerCase()
    .replace(/ /g, '-')
  const ownPath = `/cards/${id}-${name}.jpg`
  if (cardId <= 2) return ownPath
  return placeholderImages[cardId % 3]
}
