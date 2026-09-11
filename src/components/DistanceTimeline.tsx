import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import barbiePhoto from '../assets/barbie.jpg'
import kenPhoto from '../assets/ken.jpg'
import { MEETING_DATE, TIMELINE_START_DATE } from '../constants'

const MAX_CLOSENESS = 42

function getProgress(): number {
  const now = Date.now()
  const start = TIMELINE_START_DATE.getTime()
  const end = MEETING_DATE.getTime()
  if (end <= start) return 1
  const raw = (now - start) / (end - start)
  return Math.min(1, Math.max(0, raw))
}

export default function DistanceTimeline() {
  const [progress, setProgress] = useState(getProgress)

  useEffect(() => {
    const interval = setInterval(() => setProgress(getProgress()), 60_000)
    return () => clearInterval(interval)
  }, [])

  // Ken starts pinned to the left edge, Barbie to the right edge; both drift
  // toward the centre (the meeting point) as `progress` goes 0 -> 1.
  const closeness = progress * MAX_CLOSENESS
  const kenLeft = closeness
  const barbieLeft = 100 - closeness

  return (
    <div className="relative h-16 w-full max-w-sm sm:max-w-md">
      <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 rounded-full bg-white/40" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl drop-shadow-sm">
        💗
      </span>
      {/* left/x/y here (not Tailwind's translate utilities) because
          framer-motion owns this element's `transform` while animating —
          a class-based transform would just get clobbered every frame. */}
      <motion.img
        src={kenPhoto}
        alt="Ken"
        className="absolute top-1/2 h-12 w-12 rounded-full border-2 border-white object-cover shadow-md sm:h-14 sm:w-14"
        animate={{ left: `${kenLeft}%`, x: '-50%', y: '-50%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.img
        src={barbiePhoto}
        alt="Barbie"
        className="absolute top-1/2 h-12 w-12 rounded-full border-2 border-white object-cover shadow-md sm:h-14 sm:w-14"
        animate={{ left: `${barbieLeft}%`, x: '-50%', y: '-50%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </div>
  )
}
