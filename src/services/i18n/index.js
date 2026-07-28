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
    // lng ni qattiq belgilamaymiz — aks holda detector (querystring/localStorage) ishlamaydi.
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en }
    },
    detection: {
      // URL'dagi ?lang=ru | ?lang=uz birinchi o'qiladi (landing reklama havolalari uchun),
      // bo'lmasa localStorage'dagi saqlangan til ishlatiladi.
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'] // Tanlangan tilni shu yerda saqlaydi
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
