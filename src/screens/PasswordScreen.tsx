import { useCallback, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import CodeInput from '../components/CodeInput'
import GlassCard from '../components/GlassCard'
import HintModal from '../components/HintModal'

const PASSWORD = '03092026'
const CODE_LENGTH = PASSWORD.length

interface PasswordScreenProps {
  onSuccess: () => void
}

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const { t } = useTranslation()
  const [error, setError] = useState(false)
  const [resetSignal, setResetSignal] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)
  const shakeControls = useAnimationControls()

  const handleComplete = useCallback(
    (code: string) => {
      if (code === PASSWORD) {
        setError(false)
        onSuccess()
        return
      }
      setError(true)
      setResetSignal((n) => n + 1)
      void shakeControls.start({
        x: [0, -10, 10, -8, 8, 0],
        transition: { duration: 0.4 },
      })
    },
    [onSuccess, shakeControls],
  )

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-10">
      <motion.div animate={shakeControls} className="relative w-full max-w-sm">
        <GlassCard className="px-5 py-8 sm:px-8 sm:py-10">
          <div className="mb-4 text-center text-4xl">🔒</div>
          <h1 className="mb-2 text-center text-xl font-semibold text-[#5b1140] sm:text-2xl">
            {t('password.title')}
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-[#8a2f5c]">
            {t('password.subtitle')}
          </p>
          <CodeInput
            length={CODE_LENGTH}
            onComplete={handleComplete}
            error={error}
            resetSignal={resetSignal}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm font-semibold text-[#c81558]"
            >
              {t('password.error')}
            </motion.p>
          )}
        </GlassCard>

        <button
          type="button"
          onClick={() => setHintOpen(true)}
          aria-label={t('password.hint.button')}
          className="absolute -right-2 -bottom-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/25 text-base font-bold text-[#5b1140] backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_14px_rgba(122,20,70,0.25)] transition-transform active:scale-95"
        >
          ?
        </button>
      </motion.div>

      <HintModal
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        title={t('password.hint.title')}
        closeLabel={t('password.hint.close')}
      >
        {t('password.hint.words')}
      </HintModal>
    </div>
  )
}
