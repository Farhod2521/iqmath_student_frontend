import SearchInput from '@/components/search'
import SelectBox from '@/components/select-box'
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import StudentRewardHistory from './StudentRewardHistory'
import { debounce } from 'lodash'
import { URLS } from '@/constants/url'

const StudentFilter = memo(
  ({ onFilterChange, isExportingAll = false, onExportStart, onExportEnd, studentsData = [] }) => {
    const { t } = useTranslation()
    const [search, setSearch] = useState('')
    const [classValue, setClassValue] = useState('') // Default: "Hammasi" (empty value)
    const [subjectValue, setSubjectValue] = useState('') // Default: "Hammasi" (empty value)
    const [deviceValue, setDeviceValue] = useState('') // Default: "Hammasi" (empty value)
    const [statusValue, setStatusValue] = useState('active')
    const [langValue, setLangValue] = useState('')
    const [roleValue, setRoleValue] = useState('student') // Default: "Hammasi"
    const [isRewardHistoryOpen, setIsRewardHistoryOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Debounce funksiyasini ref bilan saqlaymiz
    const debouncedSearchRef = useRef(null)

    // Sinf raqamlari (5-11)
    const classOptions = [
      { value: '', label: t('all') },
      { value: '5', label: t('class5') },
      { value: '6', label: t('class6') },
      { value: '7', label: t('class7') },
      { value: '8', label: t('class8') },
      { value: '9', label: t('class9') },
      { value: '10', label: t('class10') },
      { value: '11', label: t('class11') }
    ]

    // Fanlar ro'yxati
    const subjectOptions = [
      { value: '', label: t('all') },
      { value: 'Algebra', label: t('algebra') },
      { value: 'Matematika', label: t('math') },
      { value: 'Geometriya', label: t('geometry') }
    ]

    const statusOptions = [
      { value: 'all', label: t('all') },
      { value: 'active', label: t('statusActive') },
      { value: 'inactive', label: t('statusInactive') }
    ]

    const deviceOptions = [
      { value: '', label: t('all') },
      { value: 'mobile', label: t('phone') },
      { value: 'web', label: t('web') }
    ]

    // Role options
    const roleOptions = [
      { value: '', label: t('all') },
      { value: 'student', label: t('student') },
      { value: 'teacher', label: t('teachers') },
      { value: 'parent', label: t('parent') },
      { value: 'tutor', label: t('tutor') }
    ]

    const langOptions = [
      { value: '', label: t('all') },
      { value: 'uz', label: 'UZ' },
      { value: 'ru', label: 'RU' }
    ]

    // Debounced search function - faqat bir marta yaratiladi
    useEffect(() => {
      debouncedSearchRef.current = debounce(
        (searchTerm, classVal, subjectVal, statusVal, roleVal, langValue, deviceValue) => {
          const filterData = {
            search: searchTerm,
            class_num: classVal,
            subject_name: subjectVal, // subject_name parametri sifatida yuboramiz
            status: statusVal,
            role: roleVal,
            lang: langValue,
            device: deviceValue
          }
          onFilterChange(filterData)
          setIsLoading(false)
        },
        500
      )

      return () => {
        if (debouncedSearchRef.current) {
          debouncedSearchRef.current.cancel()
        }
      }
    }, [onFilterChange])

    // Search input o'zgarishini kuzatish - focus'ni buzmaslik uchun
    const handleSearchChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setSearch(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(newValue, classValue, subjectValue, statusValue, roleValue, langValue, deviceValue)
        }
      },
      [classValue, subjectValue, statusValue, roleValue, langValue, deviceValue]
    )

    // Class o'zgarishini kuzatish
    const handleClassChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setClassValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, newValue, subjectValue, statusValue, roleValue, langValue, deviceValue)
        }
      },
      [search, subjectValue, statusValue, roleValue, langValue, deviceValue]
    )

    // Class o'zgarishini kuzatish
    const handleLangChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setLangValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, classValue, subjectValue, statusValue, roleValue, newValue, deviceValue)
        }
      },
      [search, subjectValue, statusValue, roleValue, classValue, deviceValue]
    )

    // Subject o'zgarishini kuzatish
    const handleSubjectChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setSubjectValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, classValue, newValue, statusValue, roleValue, langValue, deviceValue)
        }
      },
      [search, classValue, statusValue, roleValue, langValue, deviceValue]
    )

    // Device o'zgarishini kuzatish
    const handleDeviceChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setDeviceValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, classValue, subjectValue, statusValue, roleValue, langValue, newValue)
        }
      },
      [search, classValue, subjectValue, statusValue, roleValue, langValue]
    )

    const handleStatusChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setStatusValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, classValue, subjectValue, newValue, roleValue, langValue, deviceValue)
        }
      },
      [search, classValue, subjectValue, roleValue, langValue, deviceValue]
    )

    // Role o'zgarishini kuzatish
    const handleRoleChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setRoleValue(newValue)
        setIsLoading(true)

        if (debouncedSearchRef.current) {
          debouncedSearchRef.current(search, classValue, subjectValue, statusValue, newValue, langValue, deviceValue)
        }
      },
      [search, classValue, subjectValue, statusValue, roleValue, langValue, deviceValue]
    )

    // Clear filters function
    const handleClearFilters = useCallback(() => {
      setSearch('')
      setClassValue('') // "Hammasi" ga qaytaradi
      setSubjectValue('') // "Hammasi" ga qaytaradi
      setStatusValue('')
      setRoleValue('') // "Hammasi" ga qaytaradi
      setDeviceValue('')

      // Clear filters immediately
      onFilterChange({
        search: '',
        class_num: '',
        subject_name: '',
        status: '',
        role: ''
      })
    }, [onFilterChange])

    // Export function
    const handleExport = useCallback(() => {
      onExportStart()
      const exportParams = { role: roleValue || '', export: 'excel' }
      const exportUrl = `${URLS.studentList}?${new URLSearchParams(exportParams)}`

      let iframe = document.getElementById('download-frame')
      if (!iframe) {
        iframe = document.createElement('iframe')
        iframe.id = 'download-frame'
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = exportUrl // fayl yuklanadi, sahifa o'zgarmaydi

      // ixtiyoriy: 1s dan keyin loadingni yopish
      setTimeout(onExportEnd, 1000)
    }, [onExportStart, onExportEnd, roleValue])

    return (
      <>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-[16px]">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput
              placeholder={t('searchStudents')}
              value={search}
              onChange={handleSearchChange}
              className="w-60"
            />

            <SelectBox
              label={t('all')}
              options={roleOptions}
              value={roleValue}
              onChange={handleRoleChange}
              className="w-30"
            />
            {/* Faqat "O'quvchi" tanlanganda sinf va fan filtrlari ko'rinadi */}
            {roleValue === 'student' && (
              <>
                <SelectBox
                  label={t('class')}
                  options={classOptions}
                  value={classValue}
                  onChange={handleClassChange}
                  className="w-30"
                />
                <SelectBox
                  label={t('subject')}
                  options={subjectOptions}
                  value={subjectValue}
                  onChange={handleSubjectChange}
                  className="w-30"
                />
              </>
            )}
            <SelectBox
              label={t('status')}
              options={statusOptions}
              value={statusValue}
              onChange={handleStatusChange}
              className="w-30"
            />
            <SelectBox
              label={t('registeredLanguage')}
              options={langOptions}
              value={langValue}
              onChange={handleLangChange}
              className="w-20"
            />

            <SelectBox
              label={t('device')}
              options={deviceOptions}
              value={deviceValue}
              onChange={handleDeviceChange}
              className="w-30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsRewardHistoryOpen(true)}
              className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t('rewardHistory')}
            </button>

            {/* Excel export tugmasi */}
            <button
              onClick={handleExport}
              disabled={isExportingAll || isLoading}
              className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isExportingAll ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Export...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {t('excelExport')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search results info */}
        {search && (
          <div className="p-3 mb-4 border border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-800">
              {t('searchResultsFor')}: <span className="font-semibold">"{search}"</span>
              {studentsData.length > 0 && (
                <span className="ml-2 text-blue-600">
                  ({studentsData.length} {t('studentsFound')})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Reward History Modal */}
        <StudentRewardHistory isOpen={isRewardHistoryOpen} onClose={() => setIsRewardHistoryOpen(false)} />
      </>
    )
  }
)

StudentFilter.displayName = 'StudentFilter'

export default StudentFilter
