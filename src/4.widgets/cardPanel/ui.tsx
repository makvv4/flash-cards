import { FlashCard } from '@entities/flashcard'
import { useCardGenerator } from '@features/cardGenerator'
import { NumericInput } from '@shared/ui/NumericInput'
import { useState } from 'react'

export default function App() {
  const [countInput, setCountInput] = useState('')
  const [intervalInput, setIntervalInput] = useState('')

  const count = Number(countInput) || 0
  const intervalSec = Number(intervalInput) || 0

  const { cards, removeCard } = useCardGenerator(count, intervalSec)

  return (
    <>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <NumericInput
          id="count"
          label="count"
          value={countInput}
          onChange={setCountInput}
        />
        <NumericInput
          id="interval"
          label="interval"
          value={intervalInput}
          onChange={setIntervalInput}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 p-2 transition-all duration-300">
        {cards.map(card => (
          <FlashCard key={card.id} id={card.id} onExpire={removeCard} />
        ))}
      </div>
    </>
  )
}
