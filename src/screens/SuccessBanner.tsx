import { useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'

const HEART_COUNT = 10
const HEARTS = Array.from({ length: HEART_COUNT }, (_, i) => i)

interface SuccessBannerProps {
  message: string
  emoji?: string
  onDone: () => void
}

export default function SuccessBanner({ message, emoji = '🎉', onDone }: SuccessBannerProps) {
  useEffect(() => {
    const timeout = setTimeout(onDone, 2200)
    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0">
        {HEARTS.map((i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 text-2xl will-change-transform"
            style={{ left: `${(i * 97) % 100}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-100vh', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3 + (i % 4) * 0.5, delay: i * 0.12, ease: 'easeOut' }}
          >
            {i % 2 === 0 ? '💖' : '❤️'}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        <GlassCard className="px-8 py-10 text-center">
          <div className="mb-3 text-5xl">{emoji}</div>
          <p className="text-2xl font-bold text-[#5b1140] sm:text-3xl">{message}</p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
