import React, { useState, useEffect } from 'react'
import { useSettingsStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { CiGlobe } from 'react-icons/ci'

const languages = [
  { code: 'uz', name: 'UZ' },
  { code: 'ru', name: 'RU' }
]

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
        className="group flex items-center gap-0.5 min-[400px]:gap-1 bg-white text-black border text-[10px] min-[400px]:text-xs sm:text-sm rounded-md py-0.5 px-1 min-[400px]:px-2 sm:px-3 h-7 min-[400px]:h-8 sm:h-9 hover:bg-[#5d87ff] hover:text-white active:bg-[#5d87ff] active:text-white transition active:scale-90"
      >
        <CiGlobe
          className="text-[#5d87ff] size-3 min-[400px]:size-4 sm:size-5 md:size-6 group-hover:text-white group-active:text-white transition-colors duration-200"
          // size={24}
        />
        <span className="uppercase text-[10px] min-[400px]:text-xs sm:text-sm">{selectedLanguage.code}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 w-14 min-[400px]:w-16 sm:w-[72px] mt-1 z-50 bg-white dark:bg-[#5d87ff] border border-gray-300 shadow-md rounded-md">
          {languages
            .filter((lang) => lang.code !== selectedLanguage.code)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className="w-full py-0.5 min-[400px]:py-1 uppercase text-black text-[10px] min-[400px]:text-xs sm:text-sm bg-white hover:bg-[#5d87ff] hover:text-white rounded-md text-center"
              >
                {lang.code}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
