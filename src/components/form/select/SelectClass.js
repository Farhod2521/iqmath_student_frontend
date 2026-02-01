import { URLS } from '@/constants/url'
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
    return Object.values(map).map((item) => ({
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
        className="w-full text-left px-4 py-2 border border-[#EAEFF4] rounded-xl bg-white cursor-pointer flex items-center justify-between"
      >
        <span className="truncate">{option?.label || t('selectClass')}</span>

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
          className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-md top-12"
        >
          {loading && <div className="p-3 text-sm text-center text-gray-500">{t('loading')}...</div>}

          {error && <div className="p-3 text-sm text-center text-red-500">{error}</div>}

          {!loading && !error && (
            <ul className="overflow-auto max-h-60">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 transition cursor-pointer hover:bg-gray-100"
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
