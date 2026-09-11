import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import DodgeButton from '../components/DodgeButton'
import GlassCard from '../components/GlassCard'

interface LoveScreenProps {
  onYes: () => void
}

export default function LoveScreen({ onYes }: LoveScreenProps) {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <GlassCard className="px-6 py-10 text-center sm:px-8">
          <div className="mb-4 text-4xl">🥺</div>
          <h1 className="mb-8 text-xl font-semibold text-[#5b1140] sm:text-2xl">
            {t('love.question')}
          </h1>
          <button
            type="button"
            onClick={onYes}
            className="rounded-2xl bg-white/90 px-8 py-3 font-semibold text-pink-600 shadow-md transition-transform active:scale-95"
          >
            {t('love.yes')}
          </button>
        </GlassCard>
      </motion.div>

      <DodgeButton label={t('love.no')} />
    </div>
  )
}
