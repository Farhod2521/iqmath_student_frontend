import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { ArrowRight, Star } from 'lucide-react'

const JUBILEE = {
  uz: { years: 'YIL', line1: 'YANGI O‘ZBEKISTON', line2: 'YANGI IMKONIYATLAR' },
  ru: { years: 'ЛЕТ', line1: 'НОВЫЙ УЗБЕКИСТАН', line2: 'НОВЫЕ ВОЗМОЖНОСТИ' }
}

const HomeHero = ({ activeClass, onSelectClass, currentClassName, classes, continueLearning, isLoading }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const visibleClasses = (classes || []).slice(-5)

  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const jubilee = JUBILEE[lang]
  const subjectName = get(continueLearning, `subject_name_${lang}`, '')
  const chapterName = get(continueLearning, `chapter_name_${lang}`, '')
  const chapterOrder = get(continueLearning, 'chapter_order', 1)
  const topicsDone = get(continueLearning, 'topics_done_in_chapter', 0)
  const topicsTotal = get(continueLearning, 'topics_total_in_chapter', 0)
  const percent = get(continueLearning, 'percent', 0)

  const handleContinue = () => {
    const subjectId = get(continueLearning, 'subject_id')
    const chapterId = get(continueLearning, 'chapter_id')
    const topicId = get(continueLearning, 'topic_id')
    if (subjectId && chapterId && topicId) {
      router.push(`/dashboard/student/subjects/${subjectId}/${chapterId}/${topicId}`)
    } else {
      router.push('/dashboard/student/subjects')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#DCEBFF] px-4 py-5 sm:min-h-[250px] sm:px-8 sm:py-7 lg:min-h-[272px]">
        {/* Registon manzarasi */}
        <div
          className="absolute inset-0 bg-cover bg-[70%_center] sm:bg-center"
          style={{ backgroundImage: 'url(/images/homepage/registan-hero.webp)' }}
        />
        {/* Matn o'qilishi uchun chap tomonda yengil oq parda */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/25 sm:from-white/80 sm:via-white/45 sm:via-30% sm:to-transparent sm:to-55%" />

        {/* O'zbekiston bayrog'i lentasi */}
        <img
          src="/images/homepage/uz-flag-ribbon.svg"
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[42%] object-contain object-right-bottom drop-shadow-[0_8px_14px_rgba(15,40,90,0.35)] sm:block"
        />

        {/* 35 yil — Yangi O'zbekiston */}
        <div className="pointer-events-none absolute left-[66%] top-4 hidden -translate-x-1/2 text-center text-[#0E2A6B] md:block lg:top-5">
          <p className="font-['Playfair_Display',Georgia,serif] text-[64px] font-extrabold leading-[0.9] lg:text-[84px]">
            35
            <span className="ml-1 align-[0.35em] text-[18px] font-bold lg:text-[22px]">{jubilee.years}</span>
          </p>
          <p className="mt-2 font-['Playfair_Display',Georgia,serif] text-[12px] font-bold leading-snug tracking-[0.06em] lg:text-[15px]">
            {jubilee.line1}
            <br />
            {jubilee.line2}
          </p>
        </div>

        <div className="relative flex flex-col items-start justify-between gap-5 sm:min-h-[196px] sm:flex-row sm:items-end lg:min-h-[212px]">
          <div className="w-full max-w-md self-start">
            <span className="inline-block rounded-full bg-[#DCE8FF] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#1E4FD8]">
              {t('studentHome.continuing')}
            </span>

            {isLoading ? (
              <div className="mt-3 h-12 w-56 animate-pulse rounded-lg bg-[#0E2A6B]/10" />
            ) : continueLearning ? (
              <>
                <h2 className="mt-3 text-lg font-extrabold leading-tight text-[#0E2A6B] sm:text-[26px] sm:leading-[1.25]">
                  {currentClassName}-sinf {subjectName}
                  <br />
                  {chapterName}
                </h2>
                <p className="mt-2 text-xs font-medium text-[#334155] sm:text-sm">
                  {chapterOrder}-{t('studentHome.topicUnit')} • {topicsDone}/{topicsTotal}{' '}
                  {t('studentHome.lessonsDone')}
                </p>
              </>
            ) : (
              <h2 className="mt-3 text-xl font-extrabold leading-tight text-[#0E2A6B] sm:text-2xl">
                {t('studentHome.noContinueLearning')}
              </h2>
            )}

            {!isLoading && continueLearning && (
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-full max-w-[15rem] overflow-hidden rounded-full bg-[#0E2A6B]/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#0E2A6B]">{percent}%</span>
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#1D4ED8] shadow-[0_10px_24px_-10px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:bg-[#F5F8FF] sm:px-5"
          >
            {t('studentHome.continueButton')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="no-scrollbar -mx-3 flex items-center gap-2 overflow-x-auto px-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => onSelectClass('my')}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] sm:px-4 sm:text-sm font-semibold transition ${
            activeClass === 'my'
              ? 'bg-[#5D87FF] text-white'
              : 'border border-[#E9E9E9] bg-white text-[#191C1D] hover:bg-gray-50'
          }`}
        >
          <Star size={14} className={activeClass === 'my' ? 'fill-white' : 'fill-[#5D87FF] text-[#5D87FF]'} />
          {t('studentHome.myClass')}
        </button>
        {visibleClasses.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onSelectClass(cls.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] sm:px-4 sm:text-sm font-semibold transition ${
              activeClass === cls.id
                ? 'bg-[#5D87FF] text-white'
                : 'border border-[#E9E9E9] bg-white text-[#191C1D] hover:bg-gray-50'
            }`}
          >
            {cls.name}-{t('studentHome.classSuffix')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HomeHero
