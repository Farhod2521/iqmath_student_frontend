import React, { useState, useEffect } from 'react'
import { useSettingsStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { CiGlobe } from 'react-icons/ci'

const NavbarLangue = () => {
  const { i18n } = useTranslation()
  const setLang = useSettingsStore((state) => get(state, 'setLang', () => {}))

  const languages = [
    { code: 'uz', name: 'UZ' },
    { code: 'ru', name: 'RU' }
  ]

  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [isOpen, setIsOpen] = useState(false) // Declare isOpen
  const [isHydrated, setIsHydrated] = useState(false) // Ensure hydration is complete

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('lang') || 'uz'
      const initialLang = languages.find((lang) => lang.code === storedLang) || languages[0]

      setSelectedLanguage(initialLang)
      i18n.changeLanguage(initialLang.code) // Change i18n language
      setLang(initialLang.code) // Update global state

      setIsHydrated(true) // Hydration is complete
    }
  }, [i18n, setLang]) // Dependencies to re-run the effect if needed

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const selectLanguage = (language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language.code)
    }
    setLang(language.code)
    i18n.changeLanguage(language.code)
  }

  // Prevent rendering until hydration is complete
  if (!isHydrated || !selectedLanguage) return null

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-white hover:bg-[#5d87ff] text-black hover:text-white py-1 px-2 sm:px-3 h-8 sm:h-9 rounded-md border transform duration-200 active:scale-90 scale-100 flex items-center gap-x-[5px] group"
      >
        <CiGlobe className="text-[#5d87ff] group-hover:text-white transition-colors duration-200" size={24} />
        <p className="uppercase text-sm">{selectedLanguage?.code}</p>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 left-0 z-50 bg-white rounded-md dark:bg-[#5d87ff] border border-gray-300 shadow-md">
          {languages
            .filter((language) => language.code !== selectedLanguage.code)
            .map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language)}
                className="flex items-center justify-center w-full py-1 rounded-md uppercase  text-sm bg-white  hover:bg-[#5d87ff]  text-black hover:text-white"
              >
                {language.code}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default NavbarLangue
