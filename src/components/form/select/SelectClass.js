import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { get } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function SelectClass({ option, onChange }) {
  const { t, i18n } = useTranslation()

  const [dropdownOpenCourse, setDropdownOpenCourse] = useState(false)

  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } = useGetQuery({
    key: KEYS.schoolClasses,
    url: URLS.schoolClasses
  })

  const filteredCourses = get(schoolClasses, 'data', [])

  return (
    <div className="relative text-[#2A3547] cursor-pointer">
      <div
        onClick={() => setDropdownOpenCourse((prev) => !prev)}
        className="w-full text-left px-[16px] py-[10px] border border-[#EAEFF4] rounded-[12px] bg-white focus:outline-none flex items-center justify-between"
      >
        <span>{option?.label || `Sinfni tanlang`}</span>
        <svg
          className={`w-5 h-5 transform ${dropdownOpenCourse ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown options */}
      {dropdownOpenCourse && (
        <motion.div
          initial={{ opacity: 0, translateY: '0px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.3 }}
        >
          <ul className="absolute w-full top-12 bg-white border border-gray-300 rounded-md shadow-md z-50">
            {filteredCourses.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange({ label: i18n.language === 'uz' ? option?.class_uz : option?.class_ru, value: option?.id })
                  setDropdownOpenCourse(false)
                }}
              >
                {i18n.language === 'uz' ? option.class_uz : option.class_ru}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default SelectClass
