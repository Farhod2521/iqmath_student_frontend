import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Check, Search, UserPlus, Users } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import Modal from './Modal'
import { avatarColor, initialsOf } from '../utils'

const AddStudentsModal = ({ isOpen, onClose, onSubmit, isLoading, groupId, groupName }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  const { data, isLoading: isLoadingStudents } = useGetQuery({
    key: KEYS.tutorMyStudents,
    url: URLS.tutorMyStudents,
    enabled: isOpen
  })

  const students = get(data, 'data', [])

  useEffect(() => {
    if (!isOpen) return
    setSearch('')
    setSelectedIds([])
  }, [isOpen])

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return students
    return students.filter(
      (student) =>
        String(student.full_name || '').toLowerCase().includes(query) ||
        String(student.identification || '').toLowerCase().includes(query)
    )
  }, [students, search])

  const toggle = (studentId) => {
    setSelectedIds((previous) =>
      previous.includes(studentId)
        ? previous.filter((id) => id !== studentId)
        : [...previous, studentId]
    )
  }

  const selectableIds = filteredStudents
    .filter((student) => student.group_id !== groupId)
    .map((student) => student.id)
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.includes(id))

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : selectableIds)
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
          placeholder={t('tutorGroups.searchStudent')}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#191C1D] outline-none"
        />
      </div>

      {selectableIds.length > 0 ? (
        <button
          type="button"
          onClick={toggleAll}
          className="mt-3 text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {allSelected ? t('tutorGroups.deselectAll') : t('tutorGroups.selectAll')}
        </button>
      ) : null}

      {isLoadingStudents ? (
        <div className="mt-3 flex flex-col gap-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-16 w-full animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="mt-6 flex flex-col items-center py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
            <Users size={22} />
          </span>
          <p className="mt-3 text-sm text-[#8A8A8E]">
            {search ? t('tutorGroups.noSearchResults') : t('tutorGroups.noStudentsYet')}
          </p>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {filteredStudents.map((student, index) => {
            const isInThisGroup = student.group_id === groupId
            const isSelected = selectedIds.includes(student.id)

            return (
              <button
                key={student.id}
                type="button"
                disabled={isInThisGroup}
                onClick={() => toggle(student.id)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                  isInThisGroup
                    ? 'cursor-not-allowed border-[#F0F0F0] bg-[#F9FAFC] opacity-70'
                    : isSelected
                      ? 'border-[#5D87FF] bg-[#F4F7FF]'
                      : 'border-[#F0F0F0] bg-white hover:border-[#D7E2FF]'
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
                  <span className="block truncate text-sm font-semibold text-[#191C1D]">
                    {student.full_name || '-'}
                  </span>
                  <span className="block truncate text-xs text-[#8A8A8E]">
                    ID: {student.identification || '-'}
                    {student.class_uz ? ` · ${student.class_uz}` : ''}
                  </span>
                </span>

                {isInThisGroup ? (
                  <span className="shrink-0 rounded-md bg-[#DCF6E6] px-2 py-1 text-[11px] font-semibold text-[#0D875E]">
                    {t('tutorGroups.alreadyInGroup')}
                  </span>
                ) : student.group_name ? (
                  <span className="shrink-0 rounded-md bg-[#FFF3DD] px-2 py-1 text-[11px] font-semibold text-[#B45309]">
                    {student.group_name}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-md bg-[#F1F4FF] px-2 py-1 text-[11px] font-semibold text-[#5A6A85]">
                    {t('tutorGroups.noGroup')}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {selectedIds.length > 0 ? (
        <p className="mt-3 rounded-xl bg-[#FFF8EC] px-3.5 py-2.5 text-xs leading-relaxed text-[#B45309]">
          {t('tutorGroups.moveWarning')}
        </p>
      ) : null}
    </Modal>
  )
}

export default AddStudentsModal
