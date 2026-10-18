import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { BookOpen, Check, FileCog, Target } from 'lucide-react'

// Har bir karta o'z rangida: fon, ramka, ikonka, progress
const THEMES = {
  subjects: { bg: '#F5F3FE', border: '#E9E2FB', from: '#A07BFF', to: '#6D3BEF', track: '#ECE7FA', text: '#7C3AED' },
  lessons: { bg: '#F3FBF8', border: '#DAF1E5', from: '#34D47F', to: '#16A34A', track: '#E2F1E9', text: '#16A34A' },
  accuracy: { bg: '#FDF9F3', border: '#F6E5D2', from: '#FFA14A', to: '#F97316', track: '#F3E8DC', text: '#F97316' },
  exercises: { bg: '#F0F6FE', border: '#DAE6FA', from: '#5B93FF', to: '#2563EB', track: '#E1E9F6', text: '#2563EB' }
}

const CompletedIcon = () => (
  <span className="flex h-[58%] w-[58%] items-center justify-center rounded-full bg-white">
    <Check strokeWidth={3.5} className="h-[70%] w-[70%] text-[#16A34A]" />
  </span>
)

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
      Icon: BookOpen,
      image: '/images/homepage/stat-chapters.webp',
      value: chaptersStartedCount,
      sub: t('studentHome.statSubjectsOf', { total: chapterCount }),
      title: t('studentHome.statSubjects'),
      percent: percentOf(chaptersStartedCount, chapterCount)
    },
    {
      key: 'lessons',
      Icon: CompletedIcon,
      image: '/images/homepage/stat-lessons.webp',
      value: completedTopicCount,
      sub: t('studentHome.statLessonsOf', { total: topicCount }),
      title: t('studentHome.statLessons'),
      percent: percentOf(completedTopicCount, topicCount)
    },
    {
      key: 'accuracy',
      Icon: Target,
      image: '/images/homepage/stat-accuracy.webp',
      value: `${averageScorePercent}%`,
      sub: t('studentHome.statAccuracyAvg'),
      title: t('studentHome.statAccuracy'),
      percent: Math.min(100, Math.round(averageScorePercent) || 0)
    },
    {
      key: 'exercises',
      Icon: FileCog,
      image: '/images/homepage/stat-exercises.webp',
      value: solvedQuestionsCount,
      sub: t('studentHome.statExercisesOf', { total: questionCount }),
      title: t('studentHome.statExercises'),
      percent: percentOf(solvedQuestionsCount, questionCount)
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map(({ key, Icon, image, value, sub, title, percent }) => {
        const theme = THEMES[key]
        return (
          <div
            key={key}
            className="relative min-w-0 overflow-hidden rounded-[18px] border p-3 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-0.5 sm:px-3.5 sm:py-3"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            {/* 3D rasm */}
            <img
              src={image}
              alt=""
              loading="lazy"
              className="pointer-events-none absolute right-0 top-0 h-[70%] w-auto max-w-[50%] object-contain object-right-top"
            />

            <div className="relative">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-[10px] text-white shadow-[0_10px_18px_-10px_rgba(15,23,42,0.6)] sm:h-9 sm:w-9 sm:rounded-xl"
                style={{ backgroundImage: `linear-gradient(145deg, ${theme.from}, ${theme.to})` }}
              >
                <Icon className="h-[55%] w-[55%]" />
              </span>

              {isLoading ? (
                <div className="mt-2 h-6 w-12 animate-pulse rounded-lg bg-white/80" />
              ) : (
                <p className="mt-2 text-[22px] font-extrabold leading-none tracking-tight text-[#0B1B3F] sm:text-[26px]">
                  {value}
                </p>
              )}
              <p className="mt-1 truncate text-[11px] text-[#64748B] sm:text-[12px]">{sub}</p>
            </div>

            <p className="relative mt-2 truncate text-[12px] font-semibold text-[#0B1B3F] sm:text-[13px]">{title}</p>
            <div className="relative mt-1.5 flex items-center gap-2 sm:gap-2.5">
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full sm:h-2" style={{ backgroundColor: theme.track }}>
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${Math.max(percent, percent > 0 ? 4 : 0)}%`,
                    backgroundImage: `linear-gradient(90deg, ${theme.from}, ${theme.to})`
                  }}
                />
              </div>
              <span className="shrink-0 text-[11px] font-bold sm:text-[13px]" style={{ color: theme.text }}>
                {percent}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HomeStatsGrid
