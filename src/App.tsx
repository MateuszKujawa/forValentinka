import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AnimatedBackground from './components/AnimatedBackground'
import HintModal from './components/HintModal'
import LanguageSwitcher from './components/LanguageSwitcher'
import NavMenu from './components/NavMenu'
import CountdownScreen from './screens/CountdownScreen'
import LoveLevelPage from './screens/LoveLevelPage'
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

function MainFlow({ stage, setStage }: { stage: Stage; setStage: (stage: Stage) => void }) {
  const { t } = useTranslation()

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

  return (
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
          <SuccessBanner message={t('love.awww')} emoji="🥰" onDone={handleLoveSuccessDone} />
        )}
        {stage === 'countdown' && <CountdownScreen />}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>(getInitialStage)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  function handleHome() {
    localStorage.removeItem(STORAGE_KEY)
    setStage('password')
    navigate('/')
  }

  function handleLoveLevel() {
    navigate('/love-level')
  }

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <AnimatedBackground />

      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 z-50">
        <NavMenu
          homeLabel={t('nav.home')}
          loveLevelLabel={t('nav.loveLevel')}
          comingSoonLabel={t('nav.comingSoon')}
          onHome={handleHome}
          onLoveLevel={handleLoveLevel}
          onComingSoon={() => setComingSoonOpen(true)}
        />
      </div>
      <LanguageSwitcher />

      <Routes>
        <Route path="/" element={<MainFlow stage={stage} setStage={setStage} />} />
        <Route path="/love-level" element={<LoveLevelPage />} />
      </Routes>

      <HintModal
        open={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
        title={t('nav.comingSoonTitle')}
        closeLabel={t('password.hint.close')}
      >
        {t('nav.comingSoon')}
      </HintModal>
    </div>
  )
}

export default App
