import { CalendarDays, FileSpreadsheet, FileText, ScrollText, Search, X } from 'lucide-react'
import { FilterSelect } from './PupilsUi'
import MoreFilters, { formatDay } from './MoreFilters'
import MonthlyReportModal from '../report/MonthlyReportModal'
import React, { useState, useEffect, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import StudentRewardHistory from './StudentRewardHistory'
import { debounce } from 'lodash'
import { URLS } from '@/constants/url'

const EMPTY_FILTERS = {
  search: '',
  role: '',
  class_num: '',
  subject_name: '',
  status: '',
  lang: '',
  device: '',
  date_from: '',
  date_to: ''
}

const StudentFilter = memo(
  ({ onFilterChange, isExportingAll = false, onExportStart, onExportEnd, studentsData = [], studentsTotal, filterData }) => {
    // Topilganlar soni — sahifadagi qatorlar emas, bazadagi jami
    const foundCount = studentsTotal ?? studentsData.length
    const { t, i18n } = useTranslation()
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [isRewardHistoryOpen, setIsRewardHistoryOpen] = useState(false)
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [isLoading, setIsLoading] = useState(false)
    const debouncedRef = useRef(null)

    // Tashqaridan (router, boshlang'ich holat) kelgan filtrlar
    useEffect(() => {
      if (!filterData) return
      setFilters({ ...EMPTY_FILTERS, ...filterData })
    }, [filterData])

    // Qidiruv yozilayotganda har harfda so'rov ketmasin
    useEffect(() => {
      debouncedRef.current = debounce((next) => {
        onFilterChange(next)
        setIsLoading(false)
      }, 500)
      return () => debouncedRef.current?.cancel()
    }, [onFilterChange])

    // Bitta joydan filtrlarni o'zgartirish: qidiruv — kechiktirib, qolganlari — darhol
    const update = (patch, { debounced = false } = {}) => {
      const next = { ...filters, ...patch }
      // Sinf va fan faqat o'quvchilar uchun
      if (patch.role !== undefined && patch.role !== 'student') {
        next.class_num = ''
        next.subject_name = ''
      }
      setFilters(next)
      if (debounced) {
        setIsLoading(true)
        debouncedRef.current?.(next)
      } else {
        debouncedRef.current?.cancel()
        setIsLoading(false)
        onFilterChange(next)
      }
    }

    const selectHandler = (key) => (e) => update({ [key]: e.target.value })

    const classOptions = [
      { value: '', label: t('all') },
      ...['5', '6', '7', '8', '9', '10', '11'].map((num) => ({ value: num, label: t(`class${num}`) }))
    ]

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

    const roleOptions = [
      { value: '', label: t('all') },
      { value: 'student', label: t('student') },
      { value: 'teacher', label: t('teachers') },
      { value: 'parent', label: t('parent') },
      { value: 'tutor', label: t('tutor') }
    ]

    // Excel — ekrandagi filtrlar bo'yicha (sana oralig'i ham)
    const handleExport = () => {
      onExportStart()
      const exportParams = { export: 'excel' }
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) exportParams[key] = value
      })
      const exportUrl = `${URLS.studentList}?${new URLSearchParams(exportParams)}`

      let iframe = document.getElementById('download-frame')
      if (!iframe) {
        iframe = document.createElement('iframe')
        iframe.id = 'download-frame'
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = exportUrl // fayl yuklanadi, sahifa o'zgarmaydi

      setTimeout(onExportEnd, 1000)
    }

    const wordLabel = i18n.language === 'ru' ? 'Word отчёт' : 'Word hisobot'
    const actionButton =
      'inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition sm:flex-none 2xl:w-11 2xl:px-0 min-[1800px]:w-auto min-[1800px]:px-4'
    const actionLabel = 'whitespace-nowrap 2xl:hidden min-[1800px]:inline'
    const hasDate = filters.date_from || filters.date_to

    return (
      <>
        {/* 2xl+ ekranda filtrlar va tugmalar bitta qatorda; kichikroqda qatorlarga bo'linadi */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EEF1F6] p-4 2xl:flex-nowrap">
          <div className="flex w-full flex-wrap items-center gap-2 2xl:w-auto 2xl:min-w-0 2xl:flex-1 2xl:flex-nowrap">
            {/* Qidiruv */}
            <label className="relative w-full sm:w-56 2xl:w-52 min-[1800px]:w-60">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A93A6]"
              />
              <input
                value={filters.search}
                onChange={(e) => update({ search: e.target.value }, { debounced: true })}
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
              value={filters.role}
              onChange={selectHandler('role')}
              className="w-[calc(50%-4px)] sm:w-32 2xl:shrink-0"
            />
            {/* Faqat "O'quvchi" tanlanganda sinf va fan filtrlari ko'rinadi */}
            {filters.role === 'student' && (
              <>
                <FilterSelect
                  label={t('class')}
                  options={classOptions}
                  value={filters.class_num}
                  onChange={selectHandler('class_num')}
                  className="w-[calc(50%-4px)] sm:w-28 2xl:shrink-0"
                />
                <FilterSelect
                  label={t('subject')}
                  options={subjectOptions}
                  value={filters.subject_name}
                  onChange={selectHandler('subject_name')}
                  className="w-[calc(50%-4px)] sm:w-32 2xl:shrink-0"
                />
              </>
            )}
            <FilterSelect
              label={t('status')}
              options={statusOptions}
              value={filters.status}
              onChange={selectHandler('status')}
              className="w-[calc(50%-4px)] sm:w-28 2xl:shrink-0"
            />
            {/* Sana oralig'i, til va qurilma — bitta tugma ostida */}
            <MoreFilters
              value={filters}
              onChange={(patch) => update(patch)}
              className={`${hasDate ? 'w-full sm:w-auto' : 'w-[calc(50%-4px)] sm:w-auto'} 2xl:shrink-0`}
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

        {/* Faol sana filtri va qidiruv natijasi */}
        {hasDate || filters.search ? (
          <div className="mx-4 mt-3 flex flex-wrap items-center gap-2">
            {hasDate ? (
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE7FF] bg-[#F1F5FF] py-1.5 pl-3 pr-1.5 text-sm text-[#1D4ED8]">
                <CalendarDays size={15} />
                {formatDay(filters.date_from) || '…'} – {formatDay(filters.date_to) || '…'}
                <button
                  type="button"
                  onClick={() => update({ date_from: '', date_to: '' })}
                  className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-[#DBEAFE]"
                  aria-label="clear dates"
                >
                  <X size={14} />
                </button>
              </span>
            ) : null}
            {filters.search ? (
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE7FF] bg-[#F1F5FF] px-3 py-2 text-sm text-[#1D4ED8]">
                <Search size={15} />
                <span>
                  {t('searchResultsFor')}: <b>&quot;{filters.search}&quot;</b>
                  {!isLoading ? (
                    <span className="ml-1 text-[#2563EB]">
                      ({foundCount} {t('studentsFound')})
                    </span>
                  ) : null}
                </span>
              </span>
            ) : null}
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
