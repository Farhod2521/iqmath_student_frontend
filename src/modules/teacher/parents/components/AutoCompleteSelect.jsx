import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '@/components/input'
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const AutoCompleteSelect = ({
  options = [],
  selectedValues = [],
  onSelectionChange,
  placeholder,
  loading = false,
  noOptionsText,
  className = ''
}) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  const filteredOptions = options.filter((option) => {
    if (!searchTerm) return true
    return option.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || option.phone?.includes(searchTerm)
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionSelect = (option) => {
    const value = option.id

    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    onSelectionChange(newSelection)
    setSearchTerm('')
  }

  const handleRemoveSelection = (value, e) => {
    e.stopPropagation()
    const newSelection = selectedValues.filter((v) => v !== value)
    onSelectionChange(newSelection)
  }

  const getSelectedOptions = () => {
    return selectedValues?.map((value) => options.find((option) => option.id === value)).filter(Boolean)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    setShowDropdown(true)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false)
      }
    }, 150)
  }

  const clearSearch = () => {
    setSearchTerm('')
    inputRef.current?.focus()
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    if (!showDropdown) {
      inputRef.current?.focus()
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {selectedValues.length > 0 && (
        <div className="mb-3 p-3 bg-gray-50 rounded-[8px] border border-gray-200">
          <div className="text-[12px] text-gray-600 mb-2 font-medium">
            {t('selectedStudents')} ({selectedValues.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {getSelectedOptions().map((option) => (
              <span
                key={option.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#5D87FF] text-white text-sm rounded-full hover:bg-[#4570EA] transition-colors"
              >
                <span>{option.full_name}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveSelection(option.id, e)}
                  className="hover:bg-white hover:text-[#5D87FF] rounded-full w-4 h-4 flex items-center justify-center text-xs transition-colors"
                  title={t('removeStudent')}
                >
                  <FiX />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div
          className={`flex items-center border rounded-[8px] transition-colors ${
            isFocused ? 'border-[#5D87FF] ring-2 ring-[#5D87FF]/20' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="pl-3 pr-2">
            <FiSearch className="w-4 h-4 text-gray-400" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder || t('searchAndSelectStudents')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="flex-1 py-[10px] px-1 bg-transparent border-none outline-none text-[14px]"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 transition-colors rounded-full hover:bg-gray-100"
              title={t('clearSearch')}
            >
              <FiX className="w-4 h-4 text-gray-400" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleDropdown}
            className="px-3 py-[10px] hover:bg-gray-100 rounded-r-[8px] transition-colors border-l border-gray-200"
            title={showDropdown ? t('hideOptions') : t('showOptions')}
          >
            {showDropdown ? (
              <FiChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <FiChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {selectedValues.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-[#5D87FF] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium">
            {selectedValues.length}
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-[8px] shadow-xl max-h-72 overflow-hidden z-50 w-full">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-gray-600">
                {loading ? t('loadingStudents') : `${filteredOptions.length} ${t('studentsFound')}`}
              </span>
              {filteredOptions.length > 0 && <span className="text-[12px] text-gray-500">{t('clickToSelect')}</span>}
            </div>
          </div>

          <div className="overflow-y-auto max-h-60">
            {loading ? (
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-[#5D87FF] rounded-full animate-spin"></div>
                  {t('loadingStudents')}...
                </div>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions?.map((option, index) => {
                const isSelected = selectedValues.includes(option.id)
                return (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-3 cursor-pointer border-b border-gray-50 last:border-b-0 transition-all duration-150 ${
                      isSelected ? 'bg-[#5D87FF] text-white' : 'hover:bg-blue-50 hover:border-blue-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[14px]">{option.full_name}</span>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                            <div className="w-3 h-3 bg-[#5D87FF] rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-[12px] flex items-center gap-2 ${
                        isSelected ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      <span>{option.phone}</span>
                      <span>•</span>
                      <span>{option.class_num || t('noClass')}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-6 text-center">
                <div className="mb-2 text-gray-400">
                  <FiSearch className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-gray-500 text-[14px]">
                  {searchTerm ? `"${searchTerm}" ${t('noResultsFound')}` : noOptionsText || t('noStudentsFound')}
                </p>
                {searchTerm && (
                  <button onClick={clearSearch} className="mt-2 text-[#5D87FF] text-[12px] hover:underline">
                    {t('clearSearchAndShowAll')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AutoCompleteSelect
