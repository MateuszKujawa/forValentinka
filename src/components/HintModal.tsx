import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface HintModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  closeLabel: string
}

export default function HintModal({ open, onClose, title, children, closeLabel }: HintModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xs rounded-[28px] border border-pink-100 bg-white px-6 py-6 text-center shadow-[0_20px_45px_rgba(122,20,70,0.35)]"
          >
            <h2 className="mb-3 text-lg font-semibold text-[#5b1140]">{title}</h2>
            <div className="text-base font-medium text-[#7a2f57]">{children}</div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition-transform active:scale-95"
            >
              {closeLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
