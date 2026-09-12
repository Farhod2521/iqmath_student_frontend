import { useTranslation } from 'react-i18next'
import { ArrowRightLeft, Check, UserMinus, UserPlus } from 'lucide-react'
import { avatarColor, formatPhone, initialsOf } from '../utils'

const GroupStudentsTable = ({
  students,
  isLoading,
  selectedIds,
  onToggle,
  onToggleAll,
  onMove,
  onRemove,
  onAdd
}) => {
  const { t } = useTranslation()
  const allSelected = students.length > 0 && students.every((student) => selectedIds.includes(student.id))

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-14 w-full animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
          <UserPlus size={26} />
        </span>
        <p className="mt-3 text-base font-semibold text-[#191C1D]">{t('tutorGroups.groupEmptyTitle')}</p>
        <p className="mt-1 max-w-sm text-sm text-[#8A8A8E]">{t('tutorGroups.groupEmptyDescription')}</p>
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
        >
          <UserPlus size={16} />
          {t('tutorGroups.addStudents')}
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-[#F0F0F0] text-[11px] uppercase text-[#8A8A8E]">
            <th className="w-10 pb-2.5">
              <button
                type="button"
                onClick={onToggleAll}
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition ${
                  allSelected ? 'border-[#5D87FF] bg-[#5D87FF] text-white' : 'border-[#D1D5DB] bg-white'
                }`}
              >
                {allSelected ? <Check size={13} strokeWidth={3} /> : null}
              </button>
            </th>
            <th className="pb-2.5 font-semibold">{t('tutorGroups.colStudent')}</th>
            <th className="pb-2.5 font-semibold">{t('tutorGroups.colId')}</th>
            <th className="pb-2.5 font-semibold">{t('tutorGroups.colPhone')}</th>
            <th className="pb-2.5 font-semibold">{t('tutorGroups.colClass')}</th>
            <th className="pb-2.5 text-right font-semibold">{t('tutorGroups.colActions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F5F5F5]">
          {students.map((student, index) => {
            const isSelected = selectedIds.includes(student.id)

            return (
              <tr key={student.id} className={isSelected ? 'bg-[#F8FAFF]' : undefined}>
                <td className="py-2.5">
                  <button
                    type="button"
                    onClick={() => onToggle(student.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition ${
                      isSelected ? 'border-[#5D87FF] bg-[#5D87FF] text-white' : 'border-[#D1D5DB] bg-white'
                    }`}
                  >
                    {isSelected ? <Check size={13} strokeWidth={3} /> : null}
                  </button>
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: avatarColor(index) }}
                    >
                      {initialsOf(student.full_name)}
                    </span>
                    <span className="truncate text-sm font-semibold text-[#191C1D]">
                      {student.full_name || '-'}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-sm text-[#5A6A85]">{student.identification || '-'}</td>
                <td className="py-2.5 text-sm text-[#5A6A85]">{formatPhone(student.phone) || '-'}</td>
                <td className="py-2.5 text-sm text-[#5A6A85]">{student.class_uz || '-'}</td>
                <td className="py-2.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onMove(student)}
                      title={t('tutorGroups.moveToGroup')}
                      className="rounded-lg p-2 text-[#5D87FF] transition hover:bg-[#EAF0FF]"
                    >
                      <ArrowRightLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(student)}
                      title={t('tutorGroups.removeFromGroup')}
                      className="rounded-lg p-2 text-[#DC2626] transition hover:bg-[#FEF2F2]"
                    >
                      <UserMinus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GroupStudentsTable
