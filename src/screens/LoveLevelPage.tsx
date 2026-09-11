import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import mateuszPhoto from '../assets/mateusz_profile.jpg'
import valentinaPhoto from '../assets/valentina_profile.jpg'
import GlassCard from '../components/GlassCard'

interface LoveLevelRowProps {
  photo: string
  name: string
  levelLabel: string
}

function LoveLevelRow({ photo, name, levelLabel }: LoveLevelRowProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={photo}
        alt={name}
        className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover object-[50%_25%] shadow-md"
      />
      <div className="flex-1 text-left">
        <p className="font-semibold text-[#5b1140]">{name}</p>
        <div className="mt-1 flex items-center justify-between text-xs font-bold text-pink-600">
          <span>{levelLabel}</span>
          <span>100%</span>
        </div>
        <div className="relative mt-1 h-2.5 w-full overflow-hidden rounded-full bg-white/60">
          <div className="love-level-fill absolute inset-0 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function LoveLevelPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-10 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-semibold tracking-[0.3em] text-white uppercase drop-shadow-sm sm:text-sm"
      >
        {t('loveLevel.title')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-sm"
      >
        <GlassCard className="px-6 py-7 sm:px-7">
          <div className="flex flex-col gap-4">
            <LoveLevelRow
              photo={valentinaPhoto}
              name="Valentinka"
              levelLabel={t('loveLevel.levelLabel')}
            />
            <LoveLevelRow
              photo={mateuszPhoto}
              name="Mateusz"
              levelLabel={t('loveLevel.levelLabel')}
            />
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
