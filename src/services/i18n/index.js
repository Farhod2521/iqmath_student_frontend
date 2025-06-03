import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import uz from './translations/uz.json'
import ru from './translations/ru.json'
import en from './translations/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'uz',
    lng: 'uz',
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en }
    },
    detection: {
      order: ['localStorage'], // Tilni aniqlash tartibi
      caches: ['localStorage'] // Tanlangan tilni shu yerda saqlaydi
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
