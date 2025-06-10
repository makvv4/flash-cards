import React, { useEffect, useState } from 'react'

export default function FlashCard() {
  const [isVisible, setIsVisible] = useState(true)

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function getRandomHexColor(): string {
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16)
    return `#${hex.padStart(6, '0')}`
  }

  const countdown = getRandomInt(2, 10)
  const bgColor = getRandomHexColor()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), countdown * 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return isVisible
    ? (
        <>
          <div
            className="flex size-40 flex-col items-center justify-around border p-1"
            style={{ backgroundColor: bgColor }}
          >
            <p>{ bgColor }</p>
            <div
              className="animate-countdown h-2 bg-green-500"
              style={{ '--countdown-duration': `${countdown}s` } as React.CSSProperties}
            />
          </div>
        </>
      )
    : null
}
