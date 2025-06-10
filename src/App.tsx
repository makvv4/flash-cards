import { useEffect, useRef, useState } from 'react'
import FlashCard from './FlashCard.tsx'
import './App.css'

interface CardData { id: string }

export default function App() {
  const [count, setCount] = useState(0)
  const [intervalSec, setIntervalSec] = useState(0)
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

  return (
    <>
      <h1>Flash Cards App</h1>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <div className="inline-flex flex-col items-start">
          <label htmlFor="count">count:</label>
          <input
            type="number"
            id="count"
            min={0}
            value={count}
            className="rounded-sm border"
            onChange={e => setCount(+e.target.value)}
          />
        </div>
        <div className="inline-flex flex-col items-start">
          <label htmlFor="interval">interval:</label>
          <input
            type="number"
            id="interval"
            min={0}
            value={intervalSec}
            className="rounded-sm border"
            onChange={e => setIntervalSec(+e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1 p-1">
        {cards.map(card => (
          <FlashCard key={card.id} />
        ))}
      </div>
    </>
  )
}
