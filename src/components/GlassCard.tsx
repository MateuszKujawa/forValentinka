import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
}

export default function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-[28px] border border-white/40 bg-white/25 shadow-[0_8px_32px_rgba(80,30,90,0.25)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/40 via-white/5 to-transparent" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
