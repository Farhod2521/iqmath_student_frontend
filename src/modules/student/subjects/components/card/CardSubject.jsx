// CardSubject
import { config } from '@/config'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'
import { useImageAccentColor } from '../../utils/useImageAccentColor'

// Rasmning o'zidan rang olib bo'lmagan hollarda (masalan, CORS cheklovi)
// ishlatiladigan zaxira palitra — guruh ichida aylanib turadi.
export const CARD_ACCENTS = ['#EC4899', '#F97316', '#3B82F6', '#8B5CF6', '#10B981', '#06B6D4']

const CardSubject = ({ item, onClick, accent = CARD_ACCENTS[0] }) => {
  const { t, i18n } = useTranslation()

  // Til almashtirilganda rasm o'zgarmasligi kerak — shu sababli har doim
  // faqat image_uz ishlatiladi, tilga qarab faqat matn (nom, sinf) o'zgaradi.
  const imageUrl = `${config.API_URL}${get(item, 'image_uz')}`

  // Kartaning haqiqiy aksent rangi — rasmning o'z rangidan avtomatik
  // olinadi, shu bilan har doim rasm bilan mos keladi. O'qib bo'lmasa,
  // guruhdan kelgan zaxira rangga (`accent`) qaytiladi.
  const resolvedAccent = useImageAccentColor(imageUrl, accent)

  const gradeLabel = i18n.language === 'uz' ? `${get(item, 'class_name')}-sinf` : `${get(item, 'class_name')}-класс`
  const subjectName = i18n.language === 'uz' ? get(item, 'name_uz') : get(item, 'name_ru')
  const topicsCount = get(item, 'topics_count', 0)
  const questionsCount = get(item, 'questions_count', 0)

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_3px_17px_-5px_#00000038] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0px_10px_28px_-8px_#00000055] dark:bg-[#202936]">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            alt={subjectName}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            onError={(e) => {
              e.target.src = '/images/education.png'
            }}
          />
          <div className="absolute inset-x-0 top-0 flex flex-col items-start gap-1.5 p-3">
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: resolvedAccent }}
            >
              {gradeLabel}
            </span>
            <h3 className="w-fit rounded-lg border border-white/50 bg-white/35 px-2.5 py-1 text-base font-extrabold leading-tight text-[#191C1D] shadow-md backdrop-blur-md break-words">
              {subjectName}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1.5 p-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3F5F9] px-3 py-1.5 text-xs font-semibold text-[#4B5768] dark:bg-[#2A3547] dark:text-gray-200">
              <BookOpen size={13} className="text-[#5D87FF]" />
              {topicsCount} {t('subjectLessonsUnit')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3F5F9] px-3 py-1.5 text-xs font-semibold text-[#4B5768] dark:bg-[#2A3547] dark:text-gray-200">
              <FileText size={13} className="text-[#5D87FF]" />
              {questionsCount} {t('subjectExercisesUnit')}
            </span>
          </div>

          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform group-hover:scale-110"
            style={{ backgroundColor: resolvedAccent }}
          >
            <ArrowRight size={14} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSubject
