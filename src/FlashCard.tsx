import { useEffect, useState } from "react"

export default function FlashCard() {
  const [isVisible, setIsVisible] = useState(true)

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  const countdown = getRandomInt(2, 10)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), countdown * 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return isVisible ? (
    <>
      <div className="size-40 border">countdown: {countdown}</div>
    </>
  ) : null
}