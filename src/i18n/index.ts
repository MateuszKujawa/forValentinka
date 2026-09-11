import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import cs from './locales/cs.json'
import en from './locales/en.json'
import pl from './locales/pl.json'

export const supportedLanguages = ['en', 'pl', 'cs'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

const STORAGE_KEY = 'language'

const countryToLanguage: Record<string, SupportedLanguage> = {
  PL: 'pl',
  CZ: 'cs',
}

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage)
}

function languageFromBrowser(): SupportedLanguage {
  const browserLanguage = navigator.language.slice(0, 2)
  return isSupportedLanguage(browserLanguage) ? browserLanguage : 'en'
}

// Detects the visitor's language from their IP-based country using a free
// geolocation API. Falls back to the browser language if the lookup fails
// (offline, ad-blocker, rate limit, etc). Vercel's own edge geolocation
// (`request.geo.country` in middleware) is a more reliable alternative once
// this project runs behind Vercel routing — worth revisiting later.
async function languageFromGeoIp(): Promise<SupportedLanguage> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2500)
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!response.ok) throw new Error('geo lookup failed')
    const data: { country_code?: string } = await response.json()
    const country = data.country_code
    return (country ? countryToLanguage[country] : undefined) ?? languageFromBrowser()
  } catch {
    return languageFromBrowser()
  }
}

async function resolveInitialLanguage(): Promise<SupportedLanguage> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isSupportedLanguage(stored)) return stored
  return languageFromGeoIp()
}

export async function initI18n() {
  const language = await resolveInitialLanguage()

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
      cs: { translation: cs },
    },
    lng: language,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages as unknown as string[],
    interpolation: { escapeValue: false },
  })

  return i18n
}

export function setLanguage(language: SupportedLanguage) {
  localStorage.setItem(STORAGE_KEY, language)
  void i18n.changeLanguage(language)
}

export default i18n
