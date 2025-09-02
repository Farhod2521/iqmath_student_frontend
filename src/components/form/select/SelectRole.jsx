import React, { useState, useRef, useEffect } from 'react'
import RightIcon from "@/components/icons/right"

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
    { value: 'student', label: 'O\'quvchi' },
    { value: 'parent', label: 'Ota-ona' }
  ]

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-800" : "text-gray-500"}>
          {value ? value.label : placeholder}
        </span>
      </div>

      {/* Right icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <RightIcon classname={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-270' : 'rotate-90'}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  value?.value === option.value ? "bg-blue-50 text-blue-600" : "text-gray-800"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {value?.value === option.value && (
                  <span className="ml-2 text-blue-600">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectRole
