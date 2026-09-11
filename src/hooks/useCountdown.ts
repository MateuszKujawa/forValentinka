import { useEffect, useState } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: false,
  }
}

export function useCountdown(target: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  return timeLeft
}
