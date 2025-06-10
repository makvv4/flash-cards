import { useEffect, useRef, useState } from 'react'
import FlashCard from './FlashCard.tsx'
import './App.css'

interface CardData { id: string }

export default function App() {
  const [countInput, setCountInput] = useState('')
  const [intervalInput, setIntervalInput] = useState('')
  const [cards, setCards] = useState<CardData[]>([])

  const count = Number(countInput) || 0
  const intervalSec = Number(intervalInput) || 0

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleExpire = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id))
  }

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
            type="text"
            id="count"
            inputMode="numeric"
            pattern="[0-9]*"
            value={countInput}
            className="rounded-sm border px-1"
            onChange={(e) => {
              const val = e.target.value
              if (/^\d*$/.test(val))
                setCountInput(val)
            }}
          />
        </div>
        <div className="inline-flex flex-col items-start">
          <label htmlFor="interval">interval:</label>
          <input
            type="text"
            id="interval"
            inputMode="numeric"
            pattern="[0-9]*"
            value={intervalInput}
            className="rounded-sm border px-1"
            onChange={(e) => {
              const val = e.target.value
              if (/^\d*$/.test(val))
                setIntervalInput(val)
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1 p-1">
        {cards.map(card => (
          <FlashCard key={card.id} id={card.id} onExpire={handleExpire} />
        ))}
      </div>
    </>
  )
}
