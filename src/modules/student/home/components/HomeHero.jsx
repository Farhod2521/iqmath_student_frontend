import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { ArrowRight, Star } from 'lucide-react'

const HomeHero = ({ activeClass, onSelectClass, currentClassName, classes, continueLearning, isLoading }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const visibleClasses = (classes || []).slice(-5)

  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
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
      <div className="relative overflow-hidden rounded-2xl bg-[#0B1030] px-5 py-6 sm:px-8 sm:py-8">
        <div
          className="absolute inset-0 bg-cover bg-right"
          style={{ backgroundImage: 'url(/images/homepage/raketa.png)' }}
        />

        <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-md">
            <span className="inline-block rounded-full bg-[#5D5FEF]/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#B7B9FF]">
              {t('studentHome.continuing')}
            </span>

            {isLoading ? (
              <div className="mt-3 h-12 w-56 animate-pulse rounded-lg bg-white/10" />
            ) : continueLearning ? (
              <>
                <h2 className="mt-3 text-xl font-extrabold leading-tight text-white sm:text-2xl">
                  {currentClassName}-sinf {subjectName}
                  <br />
                  {chapterName}
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  {chapterOrder}-{t('studentHome.topicUnit')} • {topicsDone}/{topicsTotal}{' '}
                  {t('studentHome.lessonsDone')}
                </p>
              </>
            ) : (
              <h2 className="mt-3 text-xl font-extrabold leading-tight text-white sm:text-2xl">
                {t('studentHome.noContinueLearning')}
              </h2>
            )}

            {!isLoading && continueLearning && (
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-48 overflow-hidden rounded-full bg-white/15 sm:w-64">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C6FF5] to-[#5D87FF]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-white/70">{percent}%</span>
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#5453f4] transition hover:bg-white/90"
          >
            {t('studentHome.continueButton')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onSelectClass('my')}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
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
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
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
