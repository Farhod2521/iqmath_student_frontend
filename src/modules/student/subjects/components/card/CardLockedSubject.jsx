import { config } from '@/config'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Lock, BookOpen, FileText } from 'lucide-react'
import { usePricingModalStore } from '@/store'

const CardLockedSubject = ({ item }) => {
  const { t, i18n } = useTranslation()
  const { openPricingModal } = usePricingModalStore()

  const handleInitiatePayment = () => {
    openPricingModal(0)
  }

  // Til almashtirilganda rasm o'zgarmasligi kerak — shu sababli har doim
  // faqat image_uz ishlatiladi, tilga qarab faqat matn (nom, sinf) o'zgaradi.
  const imageUrl = `${config.API_URL}${get(item, 'image_uz')}`
  const gradeLabel = i18n.language === 'uz' ? `${get(item, 'class_name')}-sinf` : `${get(item, 'class_name')}-класс`
  const subjectName = i18n.language === 'uz' ? get(item, 'name_uz') : get(item, 'name_ru')
  const topicsCount = get(item, 'topics_count', 0)
  const questionsCount = get(item, 'questions_count', 0)

  return (
    <div onClick={handleInitiatePayment} className="group cursor-pointer">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_3px_17px_-5px_#00000038] transition-all duration-300 group-hover:-translate-y-1 dark:bg-[#202936]">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            alt={subjectName}
            className="absolute inset-0 h-full w-full object-cover grayscale-[35%]"
            src={imageUrl}
            onError={(e) => {
              e.target.src = '/images/education.png'
            }}
          />
          <div className="absolute inset-x-0 top-0 flex flex-col items-start gap-1.5 p-3">
            <span className="inline-flex w-fit items-center rounded-full bg-[#64748B] px-3 py-1 text-xs font-bold text-white shadow-sm">
              {gradeLabel}
            </span>
            <h3 className="w-fit rounded-lg border border-white/50 bg-white/35 px-2.5 py-1 text-base font-extrabold leading-tight text-[#191C1D] shadow-md backdrop-blur-md break-words">
              {subjectName}
            </h3>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] transition-transform group-hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Lock size={20} className="text-[#5D87FF]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3F5F9] px-3 py-1.5 text-xs font-semibold text-[#4B5768] dark:bg-[#2A3547] dark:text-gray-200">
            <BookOpen size={13} className="text-[#5D87FF]" />
            {topicsCount} {t('subjectLessonsUnit')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3F5F9] px-3 py-1.5 text-xs font-semibold text-[#4B5768] dark:bg-[#2A3547] dark:text-gray-200">
            <FileText size={13} className="text-[#5D87FF]" />
            {questionsCount} {t('subjectExercisesUnit')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardLockedSubject
