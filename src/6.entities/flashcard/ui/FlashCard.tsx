import type { CSSProperties } from 'react'
import { getContrastColor, getRandomHexColor, getRandomInt } from '@shared/lib'
import { useEffect, useState } from 'react'

type FlashCardProps = {
  id: string
  onExpire: (id: string) => void
}

export default function FlashCard({ id, onExpire }: FlashCardProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [resetTimestamp, setResetTimestamp] = useState(Date.now())
  const [restartKey, setRestartKey] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)

  const [countdown] = useState(() => getRandomInt(2, 10))
  const [bgColor] = useState(() => getRandomHexColor())
  const textColor = getContrastColor(bgColor)

  const handleClick = () => {
    setRestartKey(prev => prev + 1)
    setResetTimestamp(Date.now())
  }

  const handleFadeOut = () => {
    setFadingOut(true)
    setTimeout(() => {
      setIsVisible(false)
      onExpire(id)
    }, 300)
  }

  useEffect(() => {
    const timer = setTimeout(() => handleFadeOut(), countdown * 1000)
    return () => clearTimeout(timer)
  }, [resetTimestamp])

  if (!isVisible)
    return null

  return (
    <div
      onClick={handleClick}
      className={`flex h-40 w-28 cursor-pointer flex-col items-center justify-around rounded-sm border border-white/30 p-1 shadow-md transition-all duration-300 hover:scale-105
            ${fadingOut ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}
          `}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p>{bgColor}</p>
      <div
        key={restartKey}
        className="animate-countdown h-2 w-full bg-green-500"
        style={{ '--countdown-duration': `${countdown}s`, 'backgroundColor': textColor } as CSSProperties}
      />
    </div>
  )
}
