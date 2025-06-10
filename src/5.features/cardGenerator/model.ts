import { useEffect, useRef, useState } from 'react'

interface CardData { id: string }

export function useCardGenerator(count: number, intervalSec: number) {
  const [cards, setCards] = useState<CardData[]>([])
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalId.current)
        clearInterval(intervalId.current)
    }
  }, [])

  useEffect(() => {
    if (intervalId.current)
      clearInterval(intervalId.current)

    if (intervalSec > 0 && count > 0) {
      intervalId.current = setInterval(() => {
        setCards(prev => [
          ...prev,
          ...Array.from({ length: count }, () => ({ id: crypto.randomUUID() })),
        ])
      }, intervalSec * 1000)
    }
    return () => {
      if (intervalId.current)
        clearInterval(intervalId.current)
    }
  }, [intervalSec, count])

  const removeCard = (id: string) =>
    setCards(prev => prev.filter(card => card.id !== id))

  return { cards, removeCard }
}
