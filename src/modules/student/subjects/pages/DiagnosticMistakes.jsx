import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { MathJaxContext } from 'better-react-mathjax'
import { ArrowLeft, ChevronDown, CircleAlert, CircleCheck, LayoutGrid, RotateCcw } from 'lucide-react'

import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import ContentLoader from '@/components/loader/content-loader'
import MistakesSummary from '../components/mistakes/MistakesSummary'
import AttemptsCarousel from '../components/mistakes/AttemptsCarousel'
import AttemptPicker from '../components/mistakes/AttemptPicker'
import MistakeQuestionCard from '../components/mistakes/MistakeQuestionCard'
import TopicResultsCard from '../components/mistakes/TopicResultsCard'
import AttemptsTrendChart from '../components/mistakes/AttemptsTrendChart'
import BalanceCard from '../components/mistakes/BalanceCard'
import { cardClass, pick, statusOf } from '../components/mistakes/utils'

const mathConfig = { loader: { load: ['input/tex', 'output/chtml'] } }

// Filtr tugmalari: faol bo'lganda to'q rang, aks holda och fon
const TABS = [
  { key: 'all', active: 'bg-[#2563EB] text-white', idle: 'bg-[#F1F5FF] text-[#191C1D]' },
  { key: 'wrong', active: 'bg-[#EF4444] text-white', idle: 'bg-[#FEF2F2] text-[#191C1D]', count: 'text-[#DC2626]' },
  { key: 'correct', active: 'bg-[#16A34A] text-white', idle: 'bg-[#EFFBF3] text-[#15803D]', count: 'text-[#15803D]' },
  { key: 'unanswered', active: 'bg-[#64748B] text-white', idle: 'bg-[#F4F6FA] text-[#5B6478]', count: 'text-[#64748B]' }
]
const SORTS = ['number', 'topic', 'wrongFirst']

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 max-w-[220px] cursor-pointer appearance-none truncate rounded-xl border border-[#E5EAF2] bg-white pl-3.5 pr-9 text-sm font-medium text-[#191C1D] outline-none focus:border-[#2563EB] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {label}: {option.label}
        </option>
      ))}
    </select>
    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#191C1D]" />
  </label>
)

const DiagnosticMistakes = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { id: subjectId, attempt } = router.query
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'

  const [tab, setTab] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [sort, setSort] = useState('number')

  const { data: attemptsRes, isLoading: attemptsLoading } = useGetQuery({
    key: [KEYS.diagnosticAttempts, subjectId],
    url: `${URLS.diagnosticAttempts}${subjectId}/attempts/`,
    enabled: !!subjectId,
    refetchOnMount: true
  })
  const subject = attemptsRes?.data?.subject
  const attempts = attemptsRes?.data?.attempts || []
  const attemptId = attempt || attempts[0]?.id

  const { data: mistakesRes, isLoading: mistakesLoading } = useGetQuery({
    key: [KEYS.diagnosticMistakes, attemptId],
    url: `${URLS.diagnosticMistakes}${attemptId}/mistakes/`,
    enabled: !!attemptId
  })
  const current = mistakesRes?.data?.attempt
  const solutionEnabled = !!mistakesRes?.data?.solution_enabled
  const questions = useMemo(() => mistakesRes?.data?.questions || [], [mistakesRes])

  const counts = useMemo(() => {
    const result = { all: questions.length, wrong: 0, correct: 0, unanswered: 0 }
    questions.forEach((q) => {
      result[statusOf(q)] += 1
    })
    return result
  }, [questions])

  const topicOptions = useMemo(() => {
    const names = Array.from(new Set(questions.map((q) => pick(q, 'topic', lang)).filter(Boolean)))
    return [{ value: 'all', label: t('mistakes.all') }, ...names.map((name) => ({ value: name, label: name }))]
  }, [questions, lang, t])

  const visible = useMemo(() => {
    const list = questions.filter((q) => {
      if (tab !== 'all' && statusOf(q) !== tab) return false
      if (topicFilter !== 'all' && pick(q, 'topic', lang) !== topicFilter) return false
      return true
    })
    if (sort === 'topic') {
      return [...list].sort(
        (a, b) => pick(a, 'topic', lang).localeCompare(pick(b, 'topic', lang)) || a.number - b.number
      )
    }
    if (sort === 'wrongFirst') {
      return [...list].sort((a, b) => Number(a.is_correct) - Number(b.is_correct) || a.number - b.number)
    }
    return list
  }, [questions, tab, topicFilter, sort, lang])

  const selectAttempt = (nextId) => {
    setTab('all')
    setTopicFilter('all')
    router.replace({ pathname: router.pathname, query: { ...router.query, attempt: nextId } }, undefined, {
      shallow: true,
      scroll: false
    })
  }

  if (attemptsLoading) return <ContentLoader />

  const subjectName = subject
    ? `${/^\d+$/.test(String(subject.class_name)) ? `${subject.class_name}-${t('mistakes.gradeSuffix')} · ` : ''}${pick(subject, 'name', lang)}`
    : ''

  const retakeButton = (
    <button
      type="button"
      onClick={() => router.push(`/dashboard/student/diagnostics/test/${subjectId}`)}
      className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#2563EB] px-6 text-[15px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.95)] transition hover:bg-[#1D4ED8]"
    >
      <RotateCcw size={18} />
      {t('diagRetake')}
    </button>
  )

  return (
    <MathJaxContext config={mathConfig}>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* ASOSIY USTUN */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Sarlavha */}
          <div className={`${cardClass} flex flex-wrap items-center gap-4 p-4 sm:p-5`}>
            <button
              type="button"
              onClick={() => router.push('/dashboard/student/diagnostics')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E1E7F0] bg-white px-4 text-sm font-semibold text-[#191C1D] shadow-sm transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#26324A] dark:bg-transparent dark:text-white"
            >
              <ArrowLeft size={17} />
              {t('questionPage.back')}
            </button>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.9)]">
              <LayoutGrid size={28} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-[#191C1D] dark:text-white">{t('mistakes.analysisTitle')}</p>
              <h1 className="truncate text-2xl font-bold text-[#2563EB] md:text-[26px]">{subjectName}</h1>
              <p className="text-sm text-[#6B7385]">{t('mistakes.subtitle')}</p>
            </div>
            {attempts.length ? (
              <AttemptPicker attempts={attempts} activeId={attemptId} onSelect={selectAttempt} />
            ) : null}
            <div className="xl:hidden">{retakeButton}</div>
          </div>

          {!attempts.length ? (
            <div className={`${cardClass} py-16 text-center text-[#6B7385]`}>{t('mistakes.noAttempts')}</div>
          ) : (
            <>
              {current ? <MistakesSummary attempt={current} /> : null}

              <AttemptsCarousel attempts={attempts} activeId={attemptId} onSelect={selectAttempt} />

              {mistakesLoading || !current ? (
                <ContentLoader />
              ) : (
                <div className={`${cardClass} p-4 sm:p-5`}>
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#EEF1F6] pb-4 dark:border-[#1F2A3C]">
                    {TABS.map((item) => {
                      const active = tab === item.key
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setTab(item.key)}
                          className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
                            active
                              ? item.active
                              : `${item.idle} hover:brightness-95 dark:bg-[#1A2436] dark:text-gray-200`
                          }`}
                        >
                          {t(`mistakes.filter_${item.key}`)}
                          <span
                            className={`rounded-md px-1.5 text-xs font-bold ${
                              active ? 'bg-white/25 text-white' : `bg-white ${item.count || 'text-[#2563EB]'}`
                            }`}
                          >
                            {counts[item.key]}
                          </span>
                        </button>
                      )
                    })}

                    <div className="flex flex-wrap gap-2 2xl:ml-auto">
                      <FilterSelect
                        label={t('mistakes.topicLabel')}
                        value={topicFilter}
                        onChange={setTopicFilter}
                        options={topicOptions}
                      />
                      <FilterSelect
                        label={t('mistakes.sortLabel')}
                        value={sort}
                        onChange={setSort}
                        options={SORTS.map((key) => ({ value: key, label: t(`mistakes.sort_${key}`) }))}
                      />
                    </div>
                  </div>

                  {!current.has_answers ? (
                    <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-sm text-[#92400E]">
                      <CircleAlert size={18} className="mt-0.5 shrink-0" />
                      {t('mistakes.oldAttemptNote')}
                    </div>
                  ) : null}

                  {visible.length ? (
                    <div>
                      {visible.map((question) => (
                        <MistakeQuestionCard
                          key={question.question_id}
                          question={question}
                          lang={lang}
                          t={t}
                          solutionEnabled={solutionEnabled}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-14 text-center">
                      <CircleCheck size={40} className="mx-auto mb-3 text-[#16A34A]" />
                      <p className="font-semibold text-[#191C1D] dark:text-white">
                        {tab === 'wrong' && topicFilter === 'all'
                          ? t('mistakes.noMistakes')
                          : t('mistakes.emptyFilter')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* O'NG PANEL */}
        <aside className="flex flex-col gap-5">
          <div className="hidden justify-end xl:flex">{retakeButton}</div>
          {questions.length ? <TopicResultsCard questions={questions} lang={lang} /> : null}
          {attempts.length ? (
            <AttemptsTrendChart attempts={attempts} activeId={attemptId} onSelect={selectAttempt} />
          ) : null}
          <BalanceCard subjectId={subjectId} />
        </aside>
      </div>
    </MathJaxContext>
  )
}

export default DiagnosticMistakes
