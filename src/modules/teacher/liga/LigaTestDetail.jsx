import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BarChart3, BookOpen, CalendarDays, Clock, Info, Layers, ListChecks, Plus, Save, Trash2, Users } from 'lucide-react'
import LigaDialog from '@/components/modal/LigaDialog'
import { useGetQuery } from '@/hooks'
import { request } from '@/services/api'
import { IconField, LigaHero, LigaTable, SectionHead } from './LigaParts'
import {
  API, ATTEMPT_STATUS, BUTTON, BUTTON_LIGHT, CARD, INPUT, TD, TEST_STATUS,
  downloadExcel, formatDateTime, formatDuration, showError, toIso, toLocalInput
} from './utils'

const TEXTAREA = 'rounded-xl border border-[#E8ECF3] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#5D87FF]'
const VARIANT = 'h-10 min-w-0 rounded-xl border border-[#E8ECF3] bg-white px-4 text-sm outline-none transition focus:border-[#5D87FF]'
const SETTING = 'h-11 w-full rounded-xl border border-[#E8ECF3] bg-white px-4 text-sm text-[#191C1D] outline-none transition focus:border-[#5D87FF] disabled:bg-[#F8FAFC]'

const LETTERS = ['A', 'B', 'C', 'D']
const emptyQuestion = () => ({
  subject: '',
  question_text_uz: '',
  question_text_ru: '',
  question_type: 'choice',
  correct_text_answer: '',
  score: 1,
  correct: 'A',
  choices: Object.fromEntries(LETTERS.map((letter) => [letter, { uz: '', ru: '' }]))
})

const strip = (html) => (html || '').replace(/<[^>]+>/g, ' ').trim()

const TestSettings = ({ test, onSaved }) => {
  const [form, setForm] = useState(null)
  const locked = test.attempts_count > 0

  useEffect(() => {
    setForm({
      start_at: toLocalInput(test.start_at),
      end_at: toLocalInput(test.end_at),
      duration_minutes: test.duration_minutes,
      question_count: test.question_count
    })
  }, [test])

  if (!form) return null
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const save = async (event) => {
    event.preventDefault()
    try {
      await request.patch(`${API}tests/${test.id}/`, locked
        ? { end_at: toIso(form.end_at) }
        : { ...form, start_at: toIso(form.start_at), end_at: toIso(form.end_at) })
      onSaved()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <form onSubmit={save} className={`${CARD} grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5`}>
      {[
        ['Boshlanish vaqti', 'start_at', 'datetime-local', locked, CalendarDays],
        ['Tugash vaqti', 'end_at', 'datetime-local', false, CalendarDays],
        ['Ishlash vaqti (daqiqa)', 'duration_minutes', 'number', locked, Clock],
        ['Savollar soni', 'question_count', 'number', locked, Layers]
      ].map(([label, field, type, disabled, Icon]) => (
        <label key={field} className="flex min-w-0 flex-col gap-1.5 text-sm text-[#475569]">
          <span className="inline-flex items-center gap-2">
            <Icon size={16} className="text-[#64748B]" />
            {label}
          </span>
          <input required disabled={disabled} type={type} min={type === 'number' ? 1 : undefined} value={form[field]} onChange={update(field)} className={SETTING} />
        </label>
      ))}
      <button className={BUTTON}>
        <Save size={18} />
        Saqlash
      </button>
    </form>
  )
}

const Questions = ({ test, subjects, onChange }) => {
  const [form, setForm] = useState(emptyQuestion)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const { data: response, refetch } = useGetQuery({ key: ['liga-questions', test.id], url: `${API}questions/`, params: { test: test.id }, staleTime: 0, refetchOnMount: 'always' })
  const questions = response?.data || []
  const locked = test.attempts_count > 0
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })
  const setChoice = (letter, lang, value) =>
    setForm({ ...form, choices: { ...form.choices, [letter]: { ...form.choices[letter], [lang]: value } } })

  const save = async (event) => {
    event.preventDefault()
    setSaving(true)
    const isChoice = form.question_type === 'choice'
    try {
      await request.post(`${API}questions/`, {
        test: test.id,
        subject: Number(form.subject),
        question_text_uz: form.question_text_uz,
        question_text_ru: form.question_text_ru,
        question_type: form.question_type,
        score: Number(form.score),
        correct_text_answer: isChoice ? null : form.correct_text_answer,
        choices: isChoice
          ? LETTERS.filter((letter) => form.choices[letter].uz.trim()).map((letter) => ({
              letter,
              text_uz: form.choices[letter].uz,
              text_ru: form.choices[letter].ru,
              is_correct: letter === form.correct
            }))
          : []
      })
      setForm({ ...emptyQuestion(), subject: form.subject })
      refetch()
      onChange()
    } catch (error) {
      showError(error)
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    try {
      await request.delete(`${API}questions/${deleting.id}/`)
      setDeleting(null)
      refetch()
      onChange()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {!locked ? (
        <form onSubmit={save} className={`${CARD} flex flex-col gap-3`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <IconField Icon={BookOpen} required value={form.subject} onChange={update('subject')}>
              <option value="">Fanni tanlang</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </IconField>
            <IconField Icon={Layers} value={form.question_type} onChange={update('question_type')}>
              <option value="choice">Variantli</option>
              <option value="text">Matnli javob</option>
            </IconField>
            <IconField Icon={BarChart3} required type="number" min={1} value={form.score} onChange={update('score')} placeholder="Ball" title="Ball" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <textarea required rows={3} value={form.question_text_uz} onChange={update('question_text_uz')} placeholder="Savol (o'zbekcha). Formula: \( x^2 \)" className={TEXTAREA} />
            <textarea rows={3} value={form.question_text_ru} onChange={update('question_text_ru')} placeholder="Savol (ruscha)" className={TEXTAREA} />
          </div>
          {form.question_type === 'choice' ? (
            <div className="flex flex-col gap-2">
              {LETTERS.map((letter) => (
                <div key={letter} className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 sm:gap-3">
                  <label className="flex w-12 items-center gap-2 text-sm font-bold text-[#191C1D] sm:w-14">
                    <input type="radio" name="correct" checked={form.correct === letter} onChange={() => setForm({ ...form, correct: letter })} className="h-4 w-4 accent-[#5D87FF]" />
                    {letter}
                  </label>
                  <input value={form.choices[letter].uz} onChange={(event) => setChoice(letter, 'uz', event.target.value)} placeholder="Variant (uz)" className={VARIANT} />
                  <input value={form.choices[letter].ru} onChange={(event) => setChoice(letter, 'ru', event.target.value)} placeholder="Variant (ru)" className={VARIANT} />
                </div>
              ))}
            </div>
          ) : (
            <input required value={form.correct_text_answer} onChange={update('correct_text_answer')} placeholder="To'g'ri javob" className={VARIANT} />
          )}
          <div className="flex flex-wrap items-center gap-3">
            {form.question_type === 'choice' ? (
              <p className="inline-flex items-center gap-2 text-sm text-[#64748B]">
                <Info size={16} className="shrink-0 text-[#5D87FF]" />
                To'g'ri variantni chapdagi doiracha bilan belgilang.
              </p>
            ) : null}
            <button disabled={saving} className={`${BUTTON} ml-auto`}>
              <Plus size={18} />
              Savol qo'shish
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-[#8A8A8E]">Test boshlangan: savollarni o'zgartirib bo'lmaydi</p>
      )}

      <div className={CARD}>
        <SectionHead
          Icon={Layers}
          title={
            <>
              Savollar bazasi: {questions.length} ta{' '}
              <span className="text-sm font-normal text-[#64748B]">(o'quvchiga {test.question_count} tasi tasodifiy tushadi)</span>
            </>
          }
        />
        <div className="mt-2 divide-y divide-[#F4F4F5]">
          {questions.map((question, index) => (
            <div key={question.id} className="flex items-start gap-3 py-2.5 text-sm">
              <span className="w-6 shrink-0 text-[#8A8A8E]">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[#191C1D]">{strip(question.question_text_uz)}</p>
                <p className="mt-0.5 text-xs text-[#8A8A8E]">
                  {question.subject_name} · {question.score} ball ·{' '}
                  {question.question_type === 'text'
                    ? `Javob: ${question.correct_text_answer}`
                    : `To'g'ri: ${question.choices.find((choice) => choice.is_correct)?.letter || '—'}`}
                </p>
              </div>
              {!locked ? (
                <button onClick={() => setDeleting(question)} aria-label="O'chirish" className="text-[#8A8A8E] transition hover:text-[#DC2626]">
                  <Trash2 size={16} />
                </button>
              ) : null}
            </div>
          ))}
          {!questions.length ? (
            <div className="flex flex-col items-center gap-2 py-4 text-sm text-[#475569]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#5D87FF]">
                <ListChecks size={22} />
              </span>
              Savollar yo'q
            </div>
          ) : null}
        </div>
      </div>

      <LigaDialog
        open={Boolean(deleting)}
        tone="danger"
        Icon={Trash2}
        title="Savolni o'chirish"
        text={deleting ? strip(deleting.question_text_uz) : ''}
        confirmLabel="O'chirish"
        cancelLabel="Bekor qilish"
        onConfirm={remove}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}

const Results = ({ test }) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const url = `${API}tests/${test.id}/participants/`
  const params = { page, page_size: 50, ...(search ? { search } : {}) }
  const { data: response } = useGetQuery({ key: ['liga-participants', test.id], url, params, staleTime: 0, refetchOnMount: 'always' })
  const rows = response?.data?.results || []
  const total = response?.data?.count || 0
  const head = ["O'rin", 'F.I.Sh.', 'Telefon', 'Maktab', 'Holat', 'Boshlagan', 'Yakunlagan', 'Ishlagan vaqti', "To'g'ri", 'Xato', 'Ball']

  return (
    <div className={CARD}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Ism yoki telefon" className={INPUT} />
        <span className="text-sm text-[#8A8A8E]">Jami: {total}</span>
        <button onClick={() => downloadExcel(url, search ? { search } : {}, `liga_test_${test.id}.xlsx`)} className={`${BUTTON_LIGHT} ml-auto`}>
          Excel
        </button>
      </div>
      <LigaTable head={head}>
        {rows.map((row) => (
          <tr key={row.attempt_id}>
            <td className={`${TD} font-semibold`}>{row.rank || '—'}</td>
            <td className={TD}>{row.full_name}</td>
            <td className={TD}>{row.phone}</td>
            <td className={TD}>{row.school || '—'}</td>
            <td className={TD}>{ATTEMPT_STATUS[row.status]}</td>
            <td className={TD}>{formatDateTime(row.started_at)}</td>
            <td className={TD}>{formatDateTime(row.finished_at)}</td>
            <td className={TD}>{formatDuration(row.duration_seconds)}</td>
            <td className={TD}>{row.correct_count}</td>
            <td className={TD}>{row.wrong_count}</td>
            <td className={`${TD} font-semibold`}>
              {row.score} / {row.max_score}
            </td>
          </tr>
        ))}
      </LigaTable>
      {!rows.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Hali hech kim ishlamagan</p> : null}
      {total > 50 ? (
        <div className="mt-3 flex items-center justify-end gap-2 text-sm text-[#8A8A8E]">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className={BUTTON_LIGHT}>
            Oldingi
          </button>
          <span>
            {page} / {Math.ceil(total / 50)}
          </span>
          <button disabled={page * 50 >= total} onClick={() => setPage(page + 1)} className={BUTTON_LIGHT}>
            Keyingi
          </button>
        </div>
      ) : null}
    </div>
  )
}

/** Mentor: bitta test — vaqti, savollar bazasi va ishlaganlar ro'yxati */
const LigaTestDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [tab, setTab] = useState('questions')

  const { data: testResponse, refetch } = useGetQuery({ key: ['liga-test', id], url: `${API}tests/${id}/`, enabled: Boolean(id), staleTime: 0, refetchOnMount: 'always' })
  const { data: metaResponse } = useGetQuery({ key: 'liga-meta', url: `${API}meta/` })
  const test = testResponse?.data
  if (!test) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />

  const subjects = (metaResponse?.data?.subjects || []).filter((subject) => subject.grade === test.grade)

  return (
    <div className="flex flex-col gap-4">
      <LigaHero
        image="/images/league/test-detail-hero.webp"
        width={996}
        height={244}
        backHref="/dashboard/teacher/liga"
        title={`${test.week_number}-hafta · ${test.grade_name}-sinf`}
        subtitle={
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#CBD5E1]" />
            {TEST_STATUS[test.status]}
          </span>
        }
      />

      <TestSettings test={test} onSaved={refetch} />

      <div className="flex gap-2">
        {[
          ['questions', 'Savollar', ListChecks],
          ['results', 'Ishlaganlar', Users]
        ].map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors ${
              tab === key ? 'bg-[#5D87FF] text-white' : 'border border-[#F0F2F7] bg-white text-[#191C1D] shadow-sm hover:bg-[#F1F4F9]'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'questions' ? <Questions test={test} subjects={subjects} onChange={refetch} /> : <Results test={test} />}
    </div>
  )
}

export default LigaTestDetail
