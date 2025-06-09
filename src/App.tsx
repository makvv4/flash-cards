import { useState } from 'react'
import './App.css'
import FlashCard from './FlashCard.tsx'

export default function App() {
  const [count, setCount] = useState(0)
  const [interval, setInterval] = useState(0)
  
  return (
    <>
      <h1>Flash Cards App</h1>

      <div className='mt-2'>
        <input
          type="number"
          min={0}
          value={count}
          className='border'
          onChange={(e) => setCount(+e.target.value)}
        />
        <input
          type="number"
          min={0}
          value={interval}
          className='border'
          onChange={(e) => setInterval(+e.target.value)}
        />
      </div>

      <FlashCard />
    </>
  )
}
