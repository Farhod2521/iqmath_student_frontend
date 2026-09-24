import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, MoreVertical, Pencil, Trash2, TrendingUp, Users2 } from 'lucide-react'

const CARD_COLORS = [
  'bg-[#EAF0FF] text-[#5D87FF]',
  'bg-[#F1E9FF] text-[#7626FB]',
  'bg-[#E7F8EF] text-[#0D875E]',
  'bg-[#FFF3DD] text-[#F59E0B]',
  'bg-[#FCE7F3] text-[#DB2777]'
]

const averageColorFor = (percent) => {
  if (percent >= 75) return '#22C55E'
  if (percent >= 50) return '#5D87FF'
  return '#F59E0B'
}

const GroupCard = ({ group, index, onOpen, onEdit, onDelete, showDescription = true }) => {
  const { t } = useTranslation()
  const averagePercent = Math.round(group.average_score || 0)
  const averageColor = averageColorFor(averagePercent)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="flex flex-col rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm transition hover:border-[#D7E2FF] hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            CARD_COLORS[index % CARD_COLORS.length]
          }`}
        >
          <Users2 size={22} />
        </span>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="rounded-lg p-1.5 text-[#8A8A8E] transition hover:bg-[#F6F8FB] hover:text-[#191C1D]"
          >
            <MoreVertical size={18} />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-[#F0F0F0] bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onEdit(group)
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-[#191C1D] transition hover:bg-[#F6F8FB]"
              >
                <Pencil size={15} className="text-[#5D87FF]" />
                {t('tutorGroups.edit')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onDelete(group)
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
              >
                <Trash2 size={15} />
                {t('tutorGroups.delete')}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <h3 className="mt-3 truncate text-base font-bold text-[#191C1D]">{group.name}</h3>
      {showDescription ? (
        <p className="mt-1 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-[#8A8A8E]">
          {group.description || t('tutorGroups.noDescription')}
        </p>
      ) : (
        <p className="mt-1 text-xs text-[#8A8A8E]">{group.created_at}</p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[#F5F5F5] pt-3">
        <span className="inline-flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5A6A85]">
            <Users2 size={15} className="text-[#8A8A8E]" />
            {group.student_count || 0}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold"
            style={{ color: averageColor, backgroundColor: `${averageColor}1A` }}
            title={t('tutorGroups.averageScore')}
          >
            <TrendingUp size={11} />
            {averagePercent}%
          </span>
        </span>
        <button
          type="button"
          onClick={() => onOpen(group)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('tutorGroups.open')}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default GroupCard
