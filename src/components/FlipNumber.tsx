import { AnimatePresence, motion } from 'framer-motion'

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.15em] w-[0.68em] overflow-hidden text-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ rotateX: 70, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -70, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

interface FlipNumberProps {
  value: number
  digits?: number
  className?: string
}

export default function FlipNumber({ value, digits = 2, className = '' }: FlipNumberProps) {
  const chars = value.toString().padStart(digits, '0').split('')

  return (
    <span className={`inline-flex tabular-nums ${className}`} style={{ perspective: 400 }}>
      {chars.map((char, index) => (
        <Digit key={index} value={char} />
      ))}
    </span>
  )
}
