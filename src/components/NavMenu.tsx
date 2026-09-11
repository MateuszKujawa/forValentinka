import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 11.5 12 4l8 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v8.5a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface MenuItemProps {
  icon: ReactNode
  label: string
  onClick: () => void
}

function MenuItem({ icon, label, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#5b1140] transition-colors hover:bg-white/40 active:bg-white/50"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/60 text-sm font-bold text-[#5b1140]">
        {icon}
      </span>
      <span className="leading-snug">{label}</span>
    </button>
  )
}

interface NavMenuProps {
  homeLabel: string
  loveLevelLabel: string
  comingSoonLabel: string
  onHome: () => void
  onLoveLevel: () => void
  onComingSoon: () => void
}

export default function NavMenu({
  homeLabel,
  loveLevelLabel,
  comingSoonLabel,
  onHome,
  onLoveLevel,
  onComingSoon,
}: NavMenuProps) {
  const [open, setOpen] = useState(false)

  function handle(action: () => void) {
    setOpen(false)
    action()
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white/90 backdrop-blur-xl transition-colors hover:text-white active:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <circle cx="5" cy="12" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="19" cy="12" r="1.7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -16, y: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: -16, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-11 left-0 z-50 w-64 origin-top-left rounded-2xl border border-white/40 bg-white/25 p-1.5 shadow-[0_12px_32px_rgba(80,30,90,0.35)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 via-white/5 to-transparent" />
              <div className="relative flex flex-col">
                <MenuItem icon={<HomeIcon />} label={homeLabel} onClick={() => handle(onHome)} />
                <MenuItem icon="%" label={loveLevelLabel} onClick={() => handle(onLoveLevel)} />
                <MenuItem icon="?" label={comingSoonLabel} onClick={() => handle(onComingSoon)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
