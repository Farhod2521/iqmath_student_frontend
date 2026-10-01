// CardSubject
import { config } from '@/config'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen, FileText, Lock } from 'lucide-react'

const DEFAULT_THEME = { accent: '#3B6FF6', soft: '#EAF0FF' }

/**
 * Fan kartasi: tepada rasm (to'liq, kesilmagan), pastida sinf, fan nomi,
 * dars/mashq soni va progress. `locked` — obuna yo'q: rasm ustida qulf.
 */
// children berilsa — pastki qism (dars/mashq, progress) o'rniga shu ko'rsatiladi (masalan, diagnostika kartasi)
const CardSubject = ({ item, onClick, theme = DEFAULT_THEME, locked = false, children }) => {
  const { t, i18n } = useTranslation()
  const { accent, soft } = theme

  // Til almashtirilganda rasm o'zgarmasligi kerak — shu sababli har doim
  // faqat image_uz ishlatiladi, tilga qarab faqat matn (nom, sinf) o'zgaradi.
  const imageUrl = `${config.API_URL}${get(item, 'image_uz')}`

  // Sinf raqam bo'lmasa (masalan "Testlar") — "-sinf" qo'shmaymiz
  const className = String(get(item, 'class_name') ?? '')
  const isGrade = /^\d+$/.test(className)
  const gradeLabel = isGrade ? `${className}-${i18n.language === 'uz' ? 'sinf' : 'класс'}` : className
  const subjectName = i18n.language === 'uz' ? get(item, 'name_uz') : get(item, 'name_ru')
  const topicsCount = get(item, 'topics_count', 0)
  const questionsCount = get(item, 'questions_count', 0)
  const progress = Math.min(100, Math.max(0, Math.round(get(item, 'progress', 0) || 0)))

  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-col rounded-[18px] bg-white p-1.5 shadow-[0_6px_24px_-10px_rgba(15,27,61,0.18)] ring-1 ring-[#EDF0F5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_-12px_rgba(15,27,61,0.28)] dark:bg-[#202936] dark:ring-[#2A3547]"
    >
      <div className="relative aspect-[1920/819] w-full overflow-hidden rounded-[14px] bg-[#F4F7FC] dark:bg-[#2A3547]">
        <img
          alt={subjectName}
          src={imageUrl}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] ${
            locked ? 'grayscale-[35%]' : ''
          }`}
          onError={(e) => {
            e.target.src = '/images/education.png'
          }}
        />
        {locked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Lock size={18} style={{ color: accent }} />
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-2 pt-2.5 sm:px-2.5 sm:pb-2.5 sm:pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-extrabold sm:text-[17px] leading-tight text-[#0F1B3D] dark:text-white">
              {gradeLabel}
            </h3>
            <p className="mt-0.5 truncate text-xs font-medium text-[#5B6478] sm:text-sm dark:text-gray-300">{subjectName}</p>
          </div>
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform sm:h-9 sm:w-9 duration-300 group-hover:translate-x-0.5"
            style={{ backgroundColor: soft, color: accent }}
          >
            {locked ? <Lock size={15} /> : <ArrowRight size={16} strokeWidth={2.4} />}
          </span>
        </div>

        {children || (
        <>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:mt-3 sm:gap-x-4 sm:text-xs font-medium text-[#6B7385] dark:text-gray-300">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <BookOpen size={14} className="shrink-0" style={{ color: accent }} />
            {topicsCount} {t('subjectLessonsUnit')}
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <FileText size={14} className="shrink-0" style={{ color: accent }} />
            {questionsCount} {t('subjectExercisesUnit')}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-2 sm:mt-3 sm:gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EDF0F5] dark:bg-[#2A3547]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${progress}%`, backgroundColor: accent }}
            />
          </div>
          <span className="w-9 text-right text-xs font-semibold text-[#5B6478] dark:text-gray-300">{progress}%</span>
        </div>
        </>
        )}
      </div>
    </div>
  )
}

export default CardSubject
