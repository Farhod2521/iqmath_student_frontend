import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SelectRole = ({ value, onChange, placeholder = "Foydalanuvchi turini tanlang" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const options = [
    { value: 'student', label: "O'quvchi" },
    { value: 'parent', label: 'Ota-ona' },
    { value: 'tutor', label: "O'qituvchi" }
  ]

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative text-[#2A3547] cursor-pointer" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-[16px] py-[10px] border border-[#EAEFF4] rounded-[12px] bg-white focus:outline-none flex items-center justify-between"
      >
        <span>{value?.label || placeholder}</span>
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, translateY: '0px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.3 }}
        >
          <ul className="absolute w-full top-12 bg-white border border-gray-300 rounded-md shadow-md z-50">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default SelectRole
