import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRightLeft, Check, Users2 } from 'lucide-react'
import Modal from './Modal'

const MoveStudentsModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  groups,
  currentGroupId,
  studentNames = []
}) => {
  const { t } = useTranslation()
  const [targetGroupId, setTargetGroupId] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    setTargetGroupId(null)
  }, [isOpen])

  const targetGroups = (groups || []).filter((group) => group.id !== currentGroupId)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('tutorGroups.moveToGroup')}
      subtitle={
        studentNames.length === 1
          ? studentNames[0]
          : t('tutorGroups.selectedCount', { count: studentNames.length })
      }
      icon={<ArrowRightLeft size={18} />}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#F1F4FF] py-3 text-sm font-semibold text-[#5A6A85] transition hover:bg-[#E4EAFB]"
          >
            {t('tutorGroups.cancel')}
          </button>
          <button
            type="button"
            onClick={() => onSubmit(targetGroupId)}
            disabled={isLoading || !targetGroupId}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5D87FF] py-3 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-[#B9C7F5]"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {t('tutorGroups.move')}
          </button>
        </div>
      }
    >
      {targetGroups.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
            <Users2 size={22} />
          </span>
          <p className="mt-3 text-sm text-[#8A8A8E]">{t('tutorGroups.noOtherGroups')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {targetGroups.map((group) => {
            const isSelected = targetGroupId === group.id

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setTargetGroupId(group.id)}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                  isSelected ? 'border-[#5D87FF] bg-[#F4F7FF]' : 'border-[#F0F0F0] bg-white hover:border-[#D7E2FF]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    isSelected ? 'border-[#5D87FF] bg-[#5D87FF] text-white' : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#5D87FF]">
                  <Users2 size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#191C1D]">{group.name}</span>
                  <span className="block text-xs text-[#8A8A8E]">
                    {t('tutorGroups.studentsCount', { count: group.student_count || 0 })}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </Modal>
  )
}

export default MoveStudentsModal
