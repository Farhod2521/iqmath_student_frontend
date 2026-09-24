import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Check, Search, UserPlus, Users } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import Modal from '@/modules/tutor/groups/components/Modal'
import { avatarColor, formatPhone, initialsOf } from '@/modules/tutor/groups/utils'

const PAGE_SIZE = 50

/**
 * Hech qaysi guruhga kiritilmagan barcha o'quvchilar. Qidiruv va sahifalash backendda
 * (o'quvchilar ko'p bo'lgani uchun hammasini birdan yuklamaymiz).
 */
const UngroupedStudentsModal = ({ isOpen, onClose, onSubmit, isLoading, groupName }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState([])
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    if (!isOpen) return
    setSearch('')
    setDebouncedSearch('')
    setPage(1)
    setSelectedIds([])
  }, [isOpen])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isLoading: isLoadingStudents, isFetching } = useGetQuery({
    key: KEYS.teacherUngroupedStudents,
    url: URLS.teacherUngroupedStudents,
    params: { page, size: PAGE_SIZE, ...(debouncedSearch && { search: debouncedSearch }) },
    enabled: isOpen
  })

  const students = get(data, 'data.results', [])
  const total = get(data, 'data.total', 0)
  const totalPages = get(data, 'data.total_pages', 1)

  const toggle = (studentId) => {
    setSelectedIds((previous) =>
      previous.includes(studentId) ? previous.filter((id) => id !== studentId) : [...previous, studentId]
    )
  }

  const pageIds = students.map((student) => student.id)
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))

  const togglePage = () => {
    setSelectedIds((previous) =>
      allPageSelected
        ? previous.filter((id) => !pageIds.includes(id))
        : [...new Set([...previous, ...pageIds])]
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('tutorGroups.addStudents')}
      subtitle={groupName}
      icon={<UserPlus size={18} />}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#5A6A85]">
            {t('tutorGroups.selectedCount', { count: selectedIds.length })}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#F1F4FF] px-5 py-3 text-sm font-semibold text-[#5A6A85] transition hover:bg-[#E4EAFB] sm:flex-none"
            >
              {t('tutorGroups.cancel')}
            </button>
            <button
              type="button"
              onClick={() => onSubmit(selectedIds)}
              disabled={isLoading || selectedIds.length === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5D87FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-[#B9C7F5] sm:flex-none"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : null}
              {t('tutorGroups.addSelected')}
            </button>
          </div>
        </div>
      }
    >
      <div className="flex items-center gap-2 rounded-xl border border-[#E9E9E9] bg-[#F6F8FB] px-3.5 py-2.5">
        <Search size={16} className="shrink-0 text-[#8A8A8E]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('teacherGroups.searchUngrouped')}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#191C1D] outline-none"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs font-medium text-[#8A8A8E]">{t('teacherGroups.ungroupedTotal', { count: total })}</p>
        {pageIds.length > 0 ? (
          <button type="button" onClick={togglePage} className="text-sm font-semibold text-[#5D87FF] hover:underline">
            {allPageSelected ? t('tutorGroups.deselectAll') : t('tutorGroups.selectAll')}
          </button>
        ) : null}
      </div>

      {isLoadingStudents ? (
        <div className="mt-3 flex flex-col gap-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-16 w-full animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="mt-6 flex flex-col items-center py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
            <Users size={22} />
          </span>
          <p className="mt-3 text-sm text-[#8A8A8E]">
            {debouncedSearch ? t('tutorGroups.noSearchResults') : t('teacherGroups.noUngrouped')}
          </p>
        </div>
      ) : (
        <div className={`mt-3 flex flex-col gap-2 transition ${isFetching ? 'opacity-60' : ''}`}>
          {students.map((student, index) => {
            const isSelected = selectedIds.includes(student.id)

            return (
              <button
                key={student.id}
                type="button"
                onClick={() => toggle(student.id)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                  isSelected ? 'border-[#5D87FF] bg-[#F4F7FF]' : 'border-[#F0F0F0] bg-white hover:border-[#D7E2FF]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
                    isSelected ? 'border-[#5D87FF] bg-[#5D87FF] text-white' : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {isSelected ? <Check size={13} strokeWidth={3} /> : null}
                </span>

                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: avatarColor(index) }}
                >
                  {initialsOf(student.full_name)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#191C1D]">{student.full_name || '-'}</span>
                  <span className="block truncate text-xs text-[#8A8A8E]">
                    ID: {student.identification || '-'}
                    {student.phone ? ` · ${formatPhone(student.phone)}` : ''}
                    {student.class_uz ? ` · ${student.class_uz}` : ''}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            disabled={page <= 1 || isFetching}
            className="rounded-lg bg-[#F1F4FF] px-3 py-1.5 text-sm font-semibold text-[#5A6A85] disabled:opacity-50"
          >
            ‹
          </button>
          <span className="text-sm font-medium text-[#5A6A85]">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
            disabled={page >= totalPages || isFetching}
            className="rounded-lg bg-[#F1F4FF] px-3 py-1.5 text-sm font-semibold text-[#5A6A85] disabled:opacity-50"
          >
            ›
          </button>
        </div>
      ) : null}
    </Modal>
  )
}

export default UngroupedStudentsModal
