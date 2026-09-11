import { motion } from 'framer-motion'

interface CalendarButtonProps {
  href: string
  label: string
}

export default function CalendarButton({ href, label }: CalendarButtonProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/50 bg-white/90 py-2.5 pr-6 pl-2.5 font-semibold text-[#5b1140] shadow-[0_8px_24px_rgba(80,30,90,0.3)] backdrop-blur-sm transition-colors active:bg-white"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M3.5 10h17" stroke="currentColor" strokeWidth="2" />
          <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8.5" cy="14.5" r="1.1" fill="currentColor" />
          <circle cx="12" cy="14.5" r="1.1" fill="currentColor" />
          <circle cx="8.5" cy="17.5" r="1.1" fill="currentColor" />
        </svg>
      </span>
      {label}
    </motion.a>
  )
}
