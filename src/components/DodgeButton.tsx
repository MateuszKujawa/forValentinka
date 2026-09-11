import { useState } from 'react'
import { motion } from 'framer-motion'

const BUTTON_WIDTH = 128
const BUTTON_HEIGHT = 52
const MARGIN = 16
const MIN_JUMP_DISTANCE = 120

interface Point {
  x: number
  y: number
}

function randomPoint(): Point {
  const maxX = Math.max(MARGIN, window.innerWidth - BUTTON_WIDTH - MARGIN)
  const maxY = Math.max(MARGIN, window.innerHeight - BUTTON_HEIGHT - MARGIN)
  return {
    x: MARGIN + Math.random() * (maxX - MARGIN),
    y: MARGIN + Math.random() * (maxY - MARGIN),
  }
}

function nextPosition(current: Point): Point {
  let next = randomPoint()
  let attempts = 0
  // Re-roll a few times if the jump landed suspiciously close — it should
  // always read as an obvious escape, not a barely-noticeable nudge.
  while (Math.hypot(next.x - current.x, next.y - current.y) < MIN_JUMP_DISTANCE && attempts < 6) {
    next = randomPoint()
    attempts++
  }
  return next
}

function initialPosition(): Point {
  return {
    x: window.innerWidth / 2 - BUTTON_WIDTH / 2,
    y: Math.min(window.innerHeight - BUTTON_HEIGHT - MARGIN, window.innerHeight * 0.68),
  }
}

interface DodgeButtonProps {
  label: string
}

export default function DodgeButton({ label }: DodgeButtonProps) {
  const [pos, setPos] = useState<Point>(initialPosition)

  function dodge() {
    setPos((current) => nextPosition(current))
  }

  return (
    <motion.button
      type="button"
      onPointerDown={dodge}
      onPointerEnter={dodge}
      onClick={dodge}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{ position: 'fixed', top: 0, left: 0, width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
      className="z-40 flex items-center justify-center rounded-2xl border border-white/40 bg-white/25 text-base font-semibold text-[#5b1140] backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_14px_rgba(122,20,70,0.25)]"
    >
      {label}
    </motion.button>
  )
}
