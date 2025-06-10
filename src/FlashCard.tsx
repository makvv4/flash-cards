import React, { useEffect, useState } from 'react'

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
      className={`flex size-40 cursor-pointer flex-col items-center justify-around border border-black p-1 transition-all duration-300
            ${fadingOut ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}
          `}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p>{bgColor}</p>
      <div
        key={restartKey}
        className="animate-countdown h-2 w-full bg-green-500"
        style={{ '--countdown-duration': `${countdown}s`, 'backgroundColor': textColor } as React.CSSProperties}
      />
    </div>
  )
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomHexColor(): string {
  const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16)
  return `#${hex.padStart(6, '0')}`
}

function getContrastColor(hexColor: string): '#000000' | '#ffffff' {
  const defaultColor = '#000000'
  let cleanHex = hexColor.replace(/^#/, '').toLowerCase()

  // Преобразуем 3-символьный HEX в 6-символьный
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('')
  }

  // Проверяем, что строка — валидный 6-символьный HEX-код (только символы 0-9 и a-f)
  // Если не проходит валидацию — возвращаем дефолтное значение
  if (!/^[0-9a-f]{6}$/.test(cleanHex)) {
    return defaultColor
  }

  const r = Number.parseInt(cleanHex.slice(0, 2), 16)
  const g = Number.parseInt(cleanHex.slice(2, 4), 16)
  const b = Number.parseInt(cleanHex.slice(4, 6), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? defaultColor : '#ffffff'
}
