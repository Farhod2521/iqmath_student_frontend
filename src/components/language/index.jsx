import React, { useState, useEffect } from 'react'
import { useSettingsStore } from '@/store'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'uz', name: 'UZ' },
  { code: 'ru', name: 'RU' }
]

/** O'zbekiston bayrog'i (ko'k, oq, yashil, qizil chiziqlar, oy va yulduzlar) */
const UzFlag = ({ className = '' }) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#1EB53A" />
    <rect width="30" height="13.2" fill="#fff" />
    <rect width="30" height="6.4" fill="#0099B5" />
    <rect y="6.4" width="30" height="0.6" fill="#CE1126" />
    <rect y="12.8" width="30" height="0.6" fill="#CE1126" />
    <circle cx="5" cy="3.2" r="2.1" fill="#fff" />
    <circle cx="5.8" cy="3.2" r="1.8" fill="#0099B5" />
    {[
      [9, 1.3],
      [10.8, 1.3],
      [12.6, 1.3],
      [9, 3.1],
      [10.8, 3.1],
      [12.6, 3.1],
      [10.8, 4.9],
      [12.6, 4.9]
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="0.45" fill="#fff" />
    ))}
  </svg>
)

/** Rossiya bayrog'i (oq, ko'k, qizil) */
const RuFlag = ({ className = '' }) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#D52B1E" />
    <rect width="30" height="13.3" fill="#0039A6" />
    <rect width="30" height="6.7" fill="#fff" />
  </svg>
)

const FLAGS = { uz: UzFlag, ru: RuFlag }

const Flag = ({ code }) => {
  const Component = FLAGS[code] || UzFlag
  return (
    <Component className="h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(15,23,42,0.12)] sm:h-4 sm:w-6" />
  )
}

const LanguageDropdown = () => {
  const { i18n } = useTranslation()
  const setLang = useSettingsStore((state) => state.setLang || (() => {}))

  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const storedCode = localStorage.getItem('lang') || 'uz'
    const lang = languages.find((l) => l.code === storedCode) || languages[0]

    setSelectedLanguage(lang)
    if (!isHydrated) {
      i18n.changeLanguage(lang.code)
      setLang(lang.code)
    }
    setIsHydrated(true)
  }, [])

  const handleSelect = (lang) => {
    setSelectedLanguage(lang)
    setIsOpen(false)
    localStorage.setItem('lang', lang.code)
    setLang(lang.code)
    i18n.changeLanguage(lang.code)
  }

  if (!isHydrated || !selectedLanguage) return null

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex h-9 items-center gap-1.5 rounded-xl border border-[#F0F0F0] bg-white px-2 text-xs text-black transition hover:bg-[#5d87ff] hover:text-white active:scale-90 active:bg-[#5d87ff] active:text-white sm:gap-2 sm:px-3 sm:text-sm"
      >
        <Flag code={selectedLanguage.code} />
        <span className="uppercase text-xs font-semibold sm:text-sm">{selectedLanguage.code}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 z-50 bg-white dark:bg-[#5d87ff] border border-gray-300 shadow-md rounded-md">
          {languages
            .filter((lang) => lang.code !== selectedLanguage.code)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className="flex w-full items-center justify-center gap-1.5 py-0.5 min-[400px]:py-1 uppercase text-black text-[10px] min-[400px]:text-xs sm:text-sm bg-white hover:bg-[#5d87ff] hover:text-white rounded-md"
              >
                <Flag code={lang.code} />
                {lang.code}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
