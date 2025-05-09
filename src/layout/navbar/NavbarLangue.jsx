import React, { useState, useEffect } from 'react'
import { useLangStore, useSettingsStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { CiGlobe } from 'react-icons/ci'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

const NavbarLangue = () => {
  const { i18n } = useTranslation()
  const setLang = useSettingsStore((state) => get(state, 'setLang', () => {}))

  const languages = [
    { code: 'uz', name: "O'zbekcha" },
    { code: 'ru', name: 'Русский' }
  ]

  const [selectedLanguage, setSelectedLanguage] = useState(null)
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

  const selectLanguage = (language) => {
    setSelectedLanguage(language)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language.code)
    }
    setLang(language.code)
    i18n.changeLanguage(language.code)
  }

  // Prevent rendering until hydration is complete
  if (!isHydrated || !selectedLanguage) return null

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="border-[#E9E9E9]" variant="bordered">
          <CiGlobe color={'#5A6A85'} size={24} />
          <p className="uppercase text-sm text-black dark:text-white">{selectedLanguage?.name}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={languages.filter((language) => language.code !== selectedLanguage.code)}
      >
        {(item) => (
          <DropdownItem
            key={item.code}
            onClick={() => selectLanguage(item)}
            className={
              'flex items-center px-4 py-2 uppercase hover:bg-gray-100 bg-white dark:bg-[#26334A] text-black dark:text-white'
            }
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default NavbarLangue
