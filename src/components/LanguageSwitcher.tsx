import { useTranslation } from 'react-i18next'
import { setLanguage, supportedLanguages, type SupportedLanguage } from '../i18n'

const languageLabels: Record<SupportedLanguage, string> = {
  en: 'EN',
  pl: 'PL',
  cs: 'CZ',
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 z-50 flex gap-1 rounded-full border border-white/30 bg-white/20 p-1 backdrop-blur-xl">
      {supportedLanguages.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLanguage(lng)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors sm:text-sm ${
            i18n.resolvedLanguage === lng
              ? 'bg-white text-pink-600'
              : 'text-white/80 hover:text-white'
          }`}
        >
          {languageLabels[lng]}
        </button>
      ))}
    </div>
  )
}
