import { URLS } from '@/constants/url'
import { BookOpen, Check, CircleCheck, GraduationCap } from 'lucide-react'
import { fieldBorder, fieldBox, fieldIcon } from '../field/fieldStyles'
import { get } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { request } from '@/services/api'

const TEXT = {
  uz: { title: 'Sinfingizni tanlang', text: 'Ta’lim olayotgan sinfingizni belgilang', selected: 'Tanlangan sinf' },
  ru: { title: 'Выберите свой класс', text: 'Отметьте класс, в котором вы учитесь', selected: 'Выбранный класс' }
}

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
    // Raqam bo'yicha tartib: 1, 2, ..., 10, 11
    return Object.values(map)
      .sort((a, b) => Number(a.class_name) - Number(b.class_name))
      .map((item) => ({
      ...item,
      class_uz: `${item.class_name}-sinf`,
      class_ru: `${item.class_name}-класс`
    }))
  }, [schoolClasses])

  const text = TEXT[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <div className="relative text-[#2A3547]" ref={dropdownRef}>
      {/* Selected */}
      <div
        onClick={() => setOpen((p) => !p)}
        className={`${fieldBox} ${open ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10' : fieldBorder} cursor-pointer pr-4 text-left`}
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
          className="absolute top-[62px] z-50 w-full rounded-2xl border border-[#E3E8F2] bg-white p-4 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.25)]"
        >
          {/* Sarlavha */}
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB]">
              <GraduationCap size={22} />
            </span>
            <div className="min-w-0 text-left">
              <p className="text-[15px] font-bold leading-tight text-[#0F172A]">{text.title}</p>
              <p className="mt-0.5 text-[13px] text-[#64748B]">{text.text}</p>
            </div>
          </div>

          {loading && <div className="p-3 text-center text-sm text-gray-500">{t('loading')}...</div>}

          {error && <div className="p-3 text-center text-sm text-red-500">{error}</div>}

          {!loading && !error && (
            <div className="grid max-h-[260px] grid-cols-3 gap-2 overflow-y-auto p-0.5 [scrollbar-width:thin] min-[400px]:grid-cols-4 sm:grid-cols-6">
              {filtered.map((item) => {
                const label = i18n.language === 'ru' ? item.class_ru : item.class_uz
                const active = option?.value === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange({ label, value: item.id })
                      setOpen(false)
                    }}
                    className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2.5 text-[13px] font-bold transition ${
                      active
                        ? 'border-transparent bg-gradient-to-b from-[#2F7BFF] to-[#1D4FE0] text-white shadow-[0_10px_20px_-10px_rgba(29,79,224,0.9)]'
                        : 'border-[#E3E8F2] bg-white text-[#1E293B] hover:-translate-y-0.5 hover:border-[#BFD3FF] hover:shadow-[0_8px_16px_-10px_rgba(37,99,235,0.6)]'
                    }`}
                  >
                    {active && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-white">
                        <Check size={11} strokeWidth={3.5} />
                      </span>
                    )}
                    <BookOpen size={18} className={active ? 'text-white' : 'text-[#2563EB]'} />
                    {label}
                  </button>
                )
              })}

              {filtered.length === 0 && <p className="col-span-full px-2 py-2 text-sm text-gray-500">{t('noData')}</p>}
            </div>
          )}

          {/* Tanlangan sinf */}
          {option ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#EEF4FF] px-3 py-2.5 text-[14px] text-[#1E3A8A]">
              <CircleCheck size={18} className="shrink-0 fill-[#2563EB] text-white" />
              {text.selected}: <b className="font-bold text-[#1D4FE0]">{option.label}</b>
            </div>
          ) : null}
        </motion.div>
      )}
    </div>
  )
}

export default SelectClass
