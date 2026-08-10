import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

const HomeStatsGrid = ({ stats, isLoading }) => {
  const { t } = useTranslation()

  const chapterCount = get(stats, 'chapter_count', 0)
  const chaptersStartedCount = get(stats, 'chapters_started_count', 0)
  const topicCount = get(stats, 'topic_count', 0)
  const completedTopicCount = get(stats, 'completed_topic_count', 0)
  const averageScorePercent = get(stats, 'average_score_percent', 0)
  const questionCount = get(stats, 'question_count', 0)
  const solvedQuestionsCount = get(stats, 'solved_questions_count', 0)

  const percentOf = (value, total) => (total ? Math.min(100, Math.round((value / total) * 100)) : 0)

  const cards = [
    {
      key: 'subjects',
      icon: '/images/homepage/bookicon_1.png',
      value: chaptersStartedCount,
      sub: t('studentHome.statSubjectsOf', { total: chapterCount }),
      title: t('studentHome.statSubjects'),
      barColor: 'bg-[#8B5CF6]',
      barPercent: percentOf(chaptersStartedCount, chapterCount)
    },
    {
      key: 'lessons',
      icon: '/images/homepage/bajarilgan_dars_2.png',
      value: completedTopicCount,
      sub: t('studentHome.statLessonsOf', { total: topicCount }),
      title: t('studentHome.statLessons'),
      barColor: 'bg-[#22C55E]',
      barPercent: percentOf(completedTopicCount, topicCount)
    },
    {
      key: 'accuracy',
      icon: '/images/homepage/togiri_javob_3.png',
      value: `${averageScorePercent}%`,
      sub: t('studentHome.statAccuracyAvg'),
      title: t('studentHome.statAccuracy'),
      barColor: 'bg-[#F97316]',
      barPercent: averageScorePercent
    },
    {
      key: 'exercises',
      icon: '/images/homepage/misolar.png',
      value: solvedQuestionsCount,
      sub: t('studentHome.statExercisesOf', { total: questionCount }),
      title: t('studentHome.statExercises'),
      barColor: 'bg-[#5D87FF]',
      barPercent: percentOf(solvedQuestionsCount, questionCount),
      iconScale: 1.4
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((stat) => (
        <div key={stat.key} className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
              <Image
                src={stat.icon}
                alt=""
                fill
                className="object-contain"
                style={stat.iconScale ? { transform: `scale(${stat.iconScale})` } : undefined}
              />
            </div>
            <div>
              {isLoading ? (
                <div className="h-6 w-10 animate-pulse rounded bg-gray-100" />
              ) : (
                <p className="text-xl font-extrabold text-[#191C1D] sm:text-2xl">{stat.value}</p>
              )}
              <p className="text-[11px] text-[#8A8A8E] sm:text-xs">{stat.sub}</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] font-medium text-[#5A6A85] sm:text-xs">{stat.title}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F5]">
            <div className={`h-full rounded-full ${stat.barColor}`} style={{ width: `${stat.barPercent}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomeStatsGrid
