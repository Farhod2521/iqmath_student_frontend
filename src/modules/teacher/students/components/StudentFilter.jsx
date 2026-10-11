import { FileSpreadsheet, FileText, ScrollText, Search } from 'lucide-react'
import { FilterSelect } from './PupilsUi'
import MonthlyReportModal from '../report/MonthlyReportModal'
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import StudentRewardHistory from './StudentRewardHistory'
import { debounce } from 'lodash'
import { URLS } from '@/constants/url'

const StudentFilter = memo(
  ({ onFilterChange, isExportingAll = false, onExportStart, onExportEnd, studentsData = [], filterData }) => {
    const { t, i18n } = useTranslation()
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [classValue, setClassValue] = useState('') // Default: "Hammasi" (empty value)
    const [subjectValue, setSubjectValue] = useState('') // Default: "Hammasi" (empty value)
    const [deviceValue, setDeviceValue] = useState('') // Default: "Hammasi" (empty value)
    const [diagnosticsValue, setDiagnosticsValue] = useState('') // Default: "Hammasi" (empty value)
    const [langValue, setLangValue] = useState('')
    // const [roleValue, setRoleValue] = useState('student') // Default: "Hammasi"
    // const [statusValue, setStatusValue] = useState('active')
    const [roleValue, setRoleValue] = useState('')
    const [statusValue, setStatusValue] = useState('')
    const [isRewardHistoryOpen, setIsRewardHistoryOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    // Debounce funksiyasini ref bilan saqlaymiz
    const debouncedSearchRef = useRef(null)

    useEffect(() => {
      if (!filterData) return

      setSearch(filterData.search || '')
      setClassValue(filterData.class_num || '')
      setSubjectValue(filterData.subject_name || '')
      setLangValue(filterData.lang || '')
      setStatusValue(filterData.status || '')
      setRoleValue(filterData.role || '')
      setDeviceValue(filterData.device || '')
    }, [filterData])

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
      { value: 'android', label: t('Android') },
      { value: 'ios', label: t('IOS') },
      { value: 'web', label: t('web') }
    ]

    const diagnosticsOptions = [
      { value: '', label: t('all') },
      { value: 'mobile', label: t('submitted') },
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

    const wordLabel = i18n.language === 'ru' ? 'Word отчёт' : 'Word hisobot'
    const actionButton =
      'inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition sm:flex-none 2xl:w-11 2xl:px-0 min-[1800px]:w-auto min-[1800px]:px-4'
    const actionLabel = 'whitespace-nowrap 2xl:hidden min-[1800px]:inline'

    return (
      <>
        {/* 2xl+ ekranda filtrlar va tugmalar bitta qatorda; kichikroqda qatorlarga bo'linadi */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EEF1F6] p-4 2xl:flex-nowrap">
          <div className="flex w-full flex-wrap items-center gap-2 2xl:w-auto 2xl:min-w-0 2xl:flex-1 2xl:flex-nowrap">
            {/* Qidiruv */}
            <label className="relative w-full sm:w-56 2xl:w-52 min-[1800px]:w-60">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A93A6]" />
              <input
                value={search}
                onChange={handleSearchChange}
                placeholder={t('searchStudents')}
                className="h-11 w-full rounded-xl border border-[#E3E8F1] bg-[#F8FAFD] pl-10 pr-9 text-sm text-[#0F1B3D] outline-none transition placeholder:text-[#8A93A6] focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10"
              />
              {isLoading ? (
                <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
              ) : null}
            </label>

            <FilterSelect
              label={t('all')}
              options={roleOptions}
              value={roleValue}
              onChange={handleRoleChange}
              className="w-[calc(50%-4px)] sm:w-32 2xl:shrink-0"
            />
            {/* Faqat "O'quvchi" tanlanganda sinf va fan filtrlari ko'rinadi */}
            {roleValue === 'student' && (
              <>
                <FilterSelect
                  label={t('class')}
                  options={classOptions}
                  value={classValue}
                  onChange={handleClassChange}
                  className="w-[calc(50%-4px)] sm:w-28 2xl:shrink-0"
                />
                <FilterSelect
                  label={t('subject')}
                  options={subjectOptions}
                  value={subjectValue}
                  onChange={handleSubjectChange}
                  className="w-[calc(50%-4px)] sm:w-32 2xl:shrink-0"
                />
              </>
            )}
            <FilterSelect
              label={t('status')}
              options={statusOptions}
              value={statusValue}
              onChange={handleStatusChange}
              className="w-[calc(50%-4px)] sm:w-28 2xl:shrink-0"
            />
            <FilterSelect
              label={t('registeredLanguage')}
              options={langOptions}
              value={langValue}
              onChange={handleLangChange}
              className="w-[calc(50%-4px)] sm:w-24 2xl:shrink-0"
            />
            <FilterSelect
              label={t('device')}
              options={deviceOptions}
              value={deviceValue}
              onChange={handleDeviceChange}
              className="w-[calc(50%-4px)] sm:w-28 2xl:shrink-0"
            />
          </div>

          {/* Tugmalar: 1800px+ da yozuv bilan, 2xl..1800 oralig'ida faqat ikonka (tooltip bilan) */}
          <div className="flex w-full items-center gap-2 sm:w-auto 2xl:shrink-0">
            <button
              type="button"
              title={wordLabel}
              onClick={() => setIsReportOpen(true)}
              className={`${actionButton} bg-gradient-to-r from-[#2B579A] to-[#1E3F73] shadow-[0_10px_20px_-12px_rgba(43,87,154,0.9)] hover:brightness-110`}
            >
              <FileText size={17} className="shrink-0" />
              <span className={actionLabel}>{wordLabel}</span>
            </button>

            <button
              type="button"
              title={t('rewardHistory')}
              onClick={() => setIsRewardHistoryOpen(true)}
              className={`${actionButton} bg-[#2563EB] shadow-[0_10px_20px_-12px_rgba(37,99,235,0.9)] hover:bg-[#1D4ED8]`}
            >
              <ScrollText size={17} className="shrink-0" />
              <span className={actionLabel}>{t('rewardHistory')}</span>
            </button>

            <button
              type="button"
              title={t('excelExport')}
              onClick={handleExport}
              disabled={isExportingAll || isLoading}
              className={`${actionButton} bg-[#16A34A] shadow-[0_10px_20px_-12px_rgba(22,163,74,0.9)] hover:bg-[#15803D] disabled:cursor-not-allowed disabled:bg-[#A0A8BA] disabled:shadow-none`}
            >
              {isExportingAll ? (
                <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <FileSpreadsheet size={17} className="shrink-0" />
              )}
              <span className={actionLabel}>{isExportingAll ? 'Export...' : t('excelExport')}</span>
            </button>
          </div>
        </div>

        {/* Qidiruv natijasi */}
        {search ? (
          <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border border-[#DCE7FF] bg-[#F1F5FF] px-3 py-2 text-sm text-[#1D4ED8]">
            <Search size={15} />
            <span>
              {t('searchResultsFor')}: <b>&quot;{search}&quot;</b>
              {studentsData.length > 0 ? (
                <span className="ml-1 text-[#2563EB]">
                  ({studentsData.length} {t('studentsFound')})
                </span>
              ) : null}
            </span>
          </div>
        ) : null}

        {/* Reward History Modal */}
        <StudentRewardHistory isOpen={isRewardHistoryOpen} onClose={() => setIsRewardHistoryOpen(false)} />

        {/* Oylik PPTX hisobot */}
        <MonthlyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      </>
    )
  }
)

StudentFilter.displayName = 'StudentFilter'

export default StudentFilter
