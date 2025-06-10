import { useState } from 'react'
import FlashCard from './FlashCard.tsx'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [interval, setInterval] = useState(0)

  return (
    <>
      <h1>Flash Cards App</h1>

      <div className="mt-2">
        <div className="inline-flex flex-col items-start">
          <label htmlFor="count">count:</label>
          <input
            type="number"
            id="count"
            min={0}
            value={count}
            className="border"
            onChange={e => setCount(+e.target.value)}
          />
        </div>
        <div className="inline-flex flex-col items-start">
          <label htmlFor="interval">interval:</label>
          <input
            type="number"
            id="interval"
            min={0}
            value={interval}
            className="border"
            onChange={e => setInterval(+e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        {Array.from({ length: count }).map((_, index) => (
          <FlashCard key={index} />
        ))}
      </div>
    </>
  )
}
