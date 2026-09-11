import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedBackground from './components/AnimatedBackground'
import LanguageSwitcher from './components/LanguageSwitcher'
import ResetButton from './components/ResetButton'
import CountdownScreen from './screens/CountdownScreen'
import LoveScreen from './screens/LoveScreen'
import PasswordScreen from './screens/PasswordScreen'
import ScratchScreen from './screens/ScratchScreen'
import SuccessBanner from './screens/SuccessBanner'

type Stage = 'password' | 'success' | 'scratch' | 'love' | 'loveSuccess' | 'countdown'

const STORAGE_KEY = 'valentinka-stage'

function getInitialStage(): Stage {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'done') return 'countdown'
  if (stored === 'love') return 'love'
  if (stored === 'scratch') return 'scratch'
  return 'password'
}

function App() {
  const { t } = useTranslation()
  const [stage, setStage] = useState<Stage>(getInitialStage)

  function handlePasswordSuccess() {
    setStage('success')
  }

  function handleBannerDone() {
    localStorage.setItem(STORAGE_KEY, 'scratch')
    setStage('scratch')
  }

  function handleScratchDone() {
    localStorage.setItem(STORAGE_KEY, 'love')
    setStage('love')
  }

  function handleLoveYes() {
    setStage('loveSuccess')
  }

  function handleLoveSuccessDone() {
    localStorage.setItem(STORAGE_KEY, 'done')
    setStage('countdown')
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    setStage('password')
  }

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <AnimatedBackground />
      <ResetButton onReset={handleReset} />
      <LanguageSwitcher />
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {stage === 'password' && <PasswordScreen onSuccess={handlePasswordSuccess} />}
          {stage === 'success' && (
            <SuccessBanner message={t('success.message')} onDone={handleBannerDone} />
          )}
          {stage === 'scratch' && <ScratchScreen onContinue={handleScratchDone} />}
          {stage === 'love' && <LoveScreen onYes={handleLoveYes} />}
          {stage === 'loveSuccess' && (
            <SuccessBanner
              message={t('love.awww')}
              emoji="🥰"
              onDone={handleLoveSuccessDone}
            />
          )}
          {stage === 'countdown' && <CountdownScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
