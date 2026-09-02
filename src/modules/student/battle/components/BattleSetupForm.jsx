import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Swords,
  BookOpen,
  Calculator,
  Sigma,
  Shapes,
  Hash,
  Lightbulb,
  CheckCircle2,
  Trophy,
  Target,
  ChevronRight
} from 'lucide-react'
import { URLS } from '@/constants/url'
import { useGetQuery, usePostQuery } from '@/hooks'
import SelectBox from '@/components/select-box'
import BattleRulesCard from './BattleRulesCard'
import BattleStatsCard from './BattleStatsCard'

const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20]
const SECONDS_OPTIONS = [30, 45, 60, 90, 120]

const GRADE_COLORS = [
  'from-sky-400 to-sky-600',
  'from-emerald-400 to-emerald-600',
  'from-violet-400 to-violet-600',
  'from-amber-400 to-amber-600',
  'from-cyan-400 to-cyan-600',
  'from-rose-400 to-rose-600',
  'from-indigo-400 to-indigo-600',
  'from-teal-400 to-teal-600'
]

const SUBJECT_ICON_RULES = [
  { match: /algebr/i, Icon: Sigma },
  { match: /geometr/i, Icon: Shapes },
  { match: /arifmet/i, Icon: Hash },
  { match: /mantiq|logik/i, Icon: Lightbulb },
  { match: /matemat/i, Icon: Calculator }
]
const getSubjectIcon = (name) => (SUBJECT_ICON_RULES.find((r) => r.match.test(name || ''))?.Icon) || BookOpen

const BattleSetupForm = ({ onRoomReady }) => {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language === 'ru'

  const [gradeId, setGradeId] = useState('')
  const [subjectIds, setSubjectIds] = useState([])
  const [questionCount, setQuestionCount] = useState(10)
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60)
  const [joinCode, setJoinCode] = useState('')
  const [mode, setMode] = useState('create') // create | join

  const { data: subjectsRes, isLoading: subjectsLoading } = useGetQuery({
    key: 'battle-subjects',
    url: URLS.battleSubjects
  })
  const subjects = subjectsRes?.data?.results || subjectsRes?.data || []

  const { data: gradeStatsRes } = useGetQuery({ key: 'battle-grade-stats', url: URLS.battleGradeStats })
  // Keyed by grade NAME (e.g. "7"), not id — that's the only grade
  // identifier the subject-list payload actually exposes (`class_name`).
  const gradeStatsByName = useMemo(() => {
    const map = new Map()
    ;(gradeStatsRes?.data?.results || []).forEach((s) => map.set(String(s.name), s))
    return map
  }, [gradeStatsRes])

  const grades = useMemo(() => {
    const seen = new Map()
    subjects.forEach((s) => {
      if (s.class_name) seen.set(s.class_name, s.class_name)
    })
    return Array.from(seen.values()).sort((a, b) => Number(a) - Number(b))
  }, [subjects])

  const subjectsForGrade = useMemo(
    () => subjects.filter((s) => String(s.class_name) === String(gradeId)),
    [subjects, gradeId]
  )

  // A grade with only one available subject picks itself — no reason to
  // make the student click a checkbox that has no real alternative.
  useEffect(() => {
    if (subjectsForGrade.length === 1) {
      setSubjectIds([subjectsForGrade[0].id])
    } else {
      setSubjectIds([])
    }
  }, [gradeId, subjectsForGrade])

  const toggleSubject = (id) => {
    setSubjectIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const { mutate: createRoom, isLoading: creating } = usePostQuery({ hideSuccessToast: true })
  const { mutate: joinRoom, isLoading: joining } = usePostQuery({ hideSuccessToast: true })

  const canSubmit = gradeId && subjectIds.length > 0

  const handleCreate = () => {
    if (!canSubmit) return
    createRoom(
      {
        url: URLS.battleRoomCreate,
        attributes: {
          grade_id: Number(gradeId),
          subject_ids: subjectIds.map(Number),
          question_count: questionCount,
          seconds_per_question: secondsPerQuestion
        }
      },
      {
        onSuccess: (res) => onRoomReady(res?.data?.room?.id)
      }
    )
  }

  const handleJoin = () => {
    if (!joinCode.trim()) return
    joinRoom(
      { url: URLS.battleRoomJoin, attributes: { code: joinCode.trim().toUpperCase() } },
      { onSuccess: (res) => onRoomReady(res?.data?.room?.id) }
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="p-4 bg-white border border-gray-100 lg:col-span-2 rounded-2xl sm:p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="flex items-center justify-center bg-indigo-50 rounded-xl w-11 h-11 shrink-0">
            <Swords className="text-indigo-500" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{t('battle.setupTitle')}</h2>
            <p className="text-xs text-gray-400">{t('battle.setupSubtitle')}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-100">
          <button
            onClick={() => setMode('create')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              mode === 'create' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-400'
            }`}
          >
            {t('battle.createRoom')}
          </button>
          <button
            onClick={() => setMode('join')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              mode === 'join' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-400'
            }`}
          >
            {t('battle.joinRoom')}
          </button>
        </div>

        {mode === 'join' ? (
          <div className="max-w-sm">
            <label className="block mb-2 text-sm font-semibold text-gray-700">{t('battle.roomCode')}</label>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={8}
              placeholder="ABC123"
              className="w-full px-4 py-2 tracking-widest uppercase border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              disabled={!joinCode.trim() || joining}
              onClick={handleJoin}
              className="w-full px-4 py-3 mt-4 font-semibold text-white bg-indigo-500 rounded-xl disabled:opacity-40"
            >
              {joining ? t('battle.joining') : t('battle.joinRoom')}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-gray-700">1. {t('battle.selectGrade')}</p>
              <div className="flex gap-3 pb-2 overflow-x-auto -mx-1 px-1 [scrollbar-width:thin]">
                {grades.map((g, idx) => {
                  const active = String(gradeId) === String(g)
                  const stats = gradeStatsByName.get(String(g))
                  return (
                    <button
                      key={g}
                      onClick={() => setGradeId(g)}
                      className={`shrink-0 w-32 p-3 text-left border rounded-2xl transition-all ${
                        active ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-9 h-9 mb-2 rounded-lg bg-gradient-to-br ${
                          GRADE_COLORS[idx % GRADE_COLORS.length]
                        }`}
                      >
                        <BookOpen size={16} className="text-white" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">
                        {g}-{t('battle.gradeSuffix')}
                      </p>
                      {stats ? (
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <Trophy size={10} /> {stats.total_matches}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Target size={10} /> {stats.win_rate}%
                          </span>
                        </div>
                      ) : null}
                    </button>
                  )
                })}
                {!subjectsLoading && !grades.length ? (
                  <span className="text-sm text-gray-400">{t('noData')}</span>
                ) : null}
              </div>
            </div>

            {gradeId ? (
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold text-gray-700">2. {t('battle.selectSubjects')}</p>
                <p className="mb-3 text-xs text-gray-400">{t('battle.selectSubjectsHint')}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {subjectsForGrade.map((s) => {
                    const active = subjectIds.includes(s.id)
                    const name = isRu ? s.name_ru || s.name_uz : s.name_uz
                    const Icon = getSubjectIcon(name)
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleSubject(s.id)}
                        className={`flex items-center gap-2.5 p-3 border rounded-xl text-left transition-colors ${
                          active ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-indigo-500' : 'text-gray-400'} />
                        <span className="flex-1 text-sm font-medium text-gray-800 truncate">{name}</span>
                        {active ? <CheckCircle2 size={16} className="text-indigo-500 shrink-0" /> : null}
                      </button>
                    )
                  })}
                  {!subjectsForGrade.length ? <span className="text-sm text-gray-400">{t('noData')}</span> : null}
                </div>
              </div>
            ) : null}

            <div className="pt-5 mb-6 border-t border-gray-100">
              <p className="mb-3 text-sm font-semibold text-gray-700">3. {t('battle.extraSettings')}</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-400">{t('battle.questionCount')}</label>
                  <SelectBox
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    options={QUESTION_COUNT_OPTIONS.map((n) => ({ value: n, label: `${n}` }))}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-400">{t('battle.secondsPerQuestion')}</label>
                  <SelectBox
                    value={secondsPerQuestion}
                    onChange={(e) => setSecondsPerQuestion(Number(e.target.value))}
                    options={SECONDS_OPTIONS.map((n) => ({ value: n, label: `${n} ${t('battle.secondsUnit')}` }))}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-400">{t('battle.selectDifficulty')}</label>
                  <div className="flex items-center h-[38px] px-3 text-sm text-gray-400 border border-gray-200 rounded-xl bg-gray-50">
                    {t('battle.randomBadge')}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-400">{t('battle.opponents')}</label>
                  <div className="flex items-center h-[38px] px-3 text-sm text-gray-400 border border-gray-200 rounded-xl bg-gray-50">
                    1 {t('battle.vs')} 1
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400">{t('battle.difficultyRandomNote')}</p>
            </div>

            <button
              disabled={!canSubmit || creating}
              onClick={handleCreate}
              className="flex items-center justify-center w-full gap-1 py-3 font-semibold text-white transition-opacity bg-indigo-500 rounded-xl disabled:opacity-40 hover:opacity-90"
            >
              {creating ? t('battle.creating') : t('battle.createRoomCta')}
              {!creating ? <ChevronRight size={18} /> : null}
            </button>
          </>
        )}
      </div>

      <div className="space-y-4">
        <BattleRulesCard />
        <BattleStatsCard />
      </div>
    </div>
  )
}

export default BattleSetupForm
