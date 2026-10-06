import { URLS } from '@/constants/url'
import { GraduationCap } from 'lucide-react'
import { fieldBorder, fieldBox, fieldIcon } from '../field/fieldStyles'
import { get } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { request } from '@/services/api'

function SelectClass({ option, onChange }) {
  const { t, i18n } = useTranslation()

  const [schoolClasses, setSchoolClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef(null)

  // --- Fetch data ---
  useEffect(() => {
    request
      .get(URLS.schoolClasses)
      .then((res) => {
        const data = get(res, 'data', []) // <-- API структура тўғриланди
        setSchoolClasses(data)
      })
      .catch((err) => {
        console.log(err)
        setError('Failed to load classes')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // --- Close dropdown on outside click ---
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // --- Filter unique classes ---
  const filtered = useMemo(() => {
    const map = {}
    schoolClasses.forEach((c) => {
      if (!map[c.class_name]) map[c.class_name] = c
    })
    return Object.values(map)?.map((item) => ({
      ...item,
      class_uz: `${item.class_name}-sinf`,
      class_ru: `${item.class_name}-класс`
    }))
  }, [schoolClasses])

  return (
    <div className="relative text-[#2A3547]" ref={dropdownRef}>
      {/* Selected */}
      <div
        onClick={() => setOpen((p) => !p)}
        className={`${fieldBox} ${fieldBorder} cursor-pointer pr-4 text-left`}
      >
        <span className={fieldIcon}>
          <GraduationCap size={20} />
        </span>
        <span className={`flex-1 truncate px-4 text-[15px] ${option ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
          {option?.label || t('selectClass')}
        </span>

        <svg
          className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-[58px] z-50 w-full overflow-hidden rounded-xl border border-[#E3E8F2] bg-white shadow-xl"
        >
          {loading && <div className="p-3 text-sm text-center text-gray-500">{t('loading')}...</div>}

          {error && <div className="p-3 text-sm text-center text-red-500">{error}</div>}

          {!loading && !error && (
            <ul className="max-h-52 overflow-auto py-1 [scrollbar-width:thin]">
              {filtered?.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer px-4 py-2.5 text-[15px] transition hover:bg-[#F1F5FF]"
                  onClick={() => {
                    const label = i18n.language === 'uz' ? item.class_uz : item.class_ru
                    onChange({ label, value: item.id })
                    setOpen(false)
                  }}
                >
                  {i18n.language === 'uz' ? item.class_uz : item.class_ru}
                </li>
              ))}

              {filtered.length === 0 && <li className="px-4 py-2 text-sm text-gray-500">{t('noData')}</li>}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SelectClass
