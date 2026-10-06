import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Info, UsersRound } from 'lucide-react'
import { fieldBorder, fieldBox, fieldIcon } from '../field/fieldStyles'

const SelectRole = ({ value, onChange, placeholder }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const options = [
    { value: 'student', label: t('student') },
    { value: 'parent', label: t('parent') },
    { value: 'tutor', label: t('tutor') }
  ]

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative text-[#2A3547] cursor-pointer" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${fieldBox} ${fieldBorder} pr-4 text-left`}
      >
        <span className={fieldIcon}>
          <UsersRound size={20} />
        </span>
        <span className={`flex-1 px-4 text-[15px] ${value ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
          {value?.label || placeholder || t('selectUserType')}
        </span>
        <svg
          className={`w-5 h-5 transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown options */}
      {/* Ro'yxat to'g'ridan-to'g'ri (animatsiyasiz) ochiladi — tugmalar ostida qolib ketmasin */}
      {isOpen && (
        <ul className="absolute top-[58px] z-50 w-full overflow-hidden rounded-xl border border-[#E3E8F2] bg-white py-1 shadow-xl">
          {options.map((option) => (
            <li
              key={option.value}
              className={`cursor-pointer px-4 py-2.5 text-[15px] hover:bg-[#F1F5FF] ${
                value?.value === option.value ? 'font-semibold text-[#2563EB]' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Tanlangan rol uchun qisqa izoh — ota-onalar adashib qolmasligi uchun */}
      {value?.value === 'parent' ? (
        <p className="mt-2 flex items-start gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5 text-left text-[13px] font-medium leading-snug text-[#92400E]">
          <Info size={16} className="mt-px shrink-0 text-[#D97706]" />
          {t('roleHint.parent')}
        </p>
      ) : null}
    </div>
  )
}

export default SelectRole
