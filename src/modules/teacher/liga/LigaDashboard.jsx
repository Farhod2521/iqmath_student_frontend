import { useState } from 'react'
import Link from 'next/link'
import {
  Activity, ArrowUpDown, BarChart3, CalendarDays, Check, ClipboardCheck, Clock, Eye, EyeOff, FileText,
  GraduationCap, Hash, Layers, Lock, Pencil, Plus, PlusCircle, Target, Trash2, Users
} from 'lucide-react'
import LigaSeasonEmpty from '@/components/liga/LigaSeasonEmpty'
import LigaDialog from '@/components/modal/LigaDialog'
import { useGetQuery } from '@/hooks'
import { request } from '@/services/api'
import { SeasonEditDialog, WeekEditDialog } from './LigaEditDialogs'
import { HeadCell, IconField, LigaHero, LigaTable as Table, SectionHead, StatusPill } from './LigaParts'
import { MAIN_HERO, SeasonSelect, useLigaSeason } from './LigaSeasonPage'
import {
  API, BUTTON, CARD, INPUT, TD,
  formatDateTime, formatDuration, isNumberGrade, showError, toIso
} from './utils'

const TESTS_HERO = {
  image: '/images/league/tests-hero.webp',
  width: 956,
  height: 272,
  subtitle: 'Matematika ligasi testlarini boshqarish va natijalarini kuzatish'
}

const TABS = [
  ['overview', "Ko'rsatkichlar", BarChart3],
  ['tests', 'Testlar', FileText]
]

const SOURCE_LABELS = { daily: 'Kunlik kirish', subject: 'Fanlarni ishlash', test: 'Haftalik testlar' }

const ACTION = 'inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition sm:px-5'
const ACTION_LIGHT = `${ACTION} bg-[#F1F4F9] text-[#191C1D] hover:bg-[#E6EBF5]`
const ICON_ACTION = 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition'
const WEEK_ACTION = 'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition'
const DANGER_LIGHT = 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]'

const Overview = ({ season }) => {
  const [descending, setDescending] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { data: response } = useGetQuery({ key: ['liga-dashboard', season.id], url: `${API}seasons/${season.id}/dashboard/`, staleTime: 0, refetchOnMount: 'always' })
  const data = response?.data
  if (!data) return <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />

  const { cards } = data
  const items = [
    ['Ishtirokchilar', cards.participants, Users, 'bg-[#F1F7FF]', 'bg-[#DCEBFF] text-[#2F80ED]'],
    ['Testlar', `${cards.tests_finished} / ${cards.tests_total}`, ClipboardCheck, 'bg-[#EFFBF5]', 'bg-[#D6F5E5] text-[#22B573]'],
    ['Ishlangan testlar', cards.attempts, Layers, 'bg-[#F6F2FF]', 'bg-[#E8DFFF] text-[#7C4DFF]'],
    ['Hozir ishlayapti', cards.in_progress, BarChart3, 'bg-[#FFF8EC]', 'bg-[#FFEBCB] text-[#F5A623]'],
    ["O'rtacha natija", `${cards.avg_score} / ${cards.avg_max_score}`, Target, 'bg-[#FFF1F2]', 'bg-[#FFDDE1] text-[#F0435B]'],
    ["O'rtacha vaqt", formatDuration(cards.avg_seconds), Clock, 'bg-[#EFF8FF]', 'bg-[#D8EEFF] text-[#2F9BE8]']
  ]
  const maxAttempts = Math.max(1, ...data.weeks.map((week) => week.attempts))
  const numberRows = data.grades.filter((row) => isNumberGrade({ name: row.grade }))
  const gradeRows = descending ? [...numberRows].reverse() : numberRows
  const sortHead = (
    <button onClick={() => setDescending(!descending)} className="inline-flex items-center gap-1.5 hover:text-[#191C1D]">
      Sinf
      <ArrowUpDown size={12} />
    </button>
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 min-[1600px]:grid-cols-6">
        {items.map(([label, value, Icon, cardColor, iconColor]) => (
          <div key={label} className={`flex items-center gap-2.5 rounded-2xl p-3.5 sm:gap-3 sm:p-4 ${cardColor}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${iconColor}`}>
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-xs leading-tight text-[#64748B]">{label}</p>
              <p className="mt-1 whitespace-nowrap text-xl font-bold text-[#191C1D]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={CARD}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6EFFF] text-[#5D87FF]">
            <Layers size={18} />
          </span>
          <h3 className="mr-auto text-base font-bold text-[#191C1D] sm:text-lg">Sinflar bo'yicha natijalar</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Haftalar va ballar manbai"
            title="Haftalar va ballar manbai"
            className={`flex h-9 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
              showDetails ? 'border-[#5D87FF] bg-[#5D87FF] text-white' : 'border-[#EBEDF0] text-[#5D87FF] hover:bg-[#F5F8FD]'
            }`}
          >
            <BarChart3 size={18} />
          </button>
        </div>
        <Table head={[sortHead, 'Ishtirokchilar', 'Ballar', 'Ishlangan testlar', "O'rtacha natija", "O'rtacha vaqt", 'Yetakchi']}>
          {gradeRows.map((row) => (
            <tr key={row.grade_id}>
              <td className={`${TD} font-semibold`}>
                <span className="inline-flex items-center gap-2.5">
                  <GraduationCap size={18} className="text-[#5D87FF]" />
                  {row.grade}-sinf
                </span>
              </td>
              <td className={TD}>{row.participants}</td>
              <td className={TD}>{row.points}</td>
              <td className={TD}>{row.attempts}</td>
              <td className={TD}>{row.avg_score}</td>
              <td className={TD}>{formatDuration(row.avg_seconds)}</td>
              <td className={TD}>{row.leader ? `${row.leader} (${row.leader_points})` : '—'}</td>
            </tr>
          ))}
        </Table>
      </div>

      {showDetails ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={CARD}>
            <h3 className="mb-3 text-base font-bold text-[#191C1D]">Haftalar bo'yicha</h3>
            {data.weeks.length ? (
              <div className="flex flex-col gap-2.5">
                {data.weeks.map((week) => (
                  <div key={week.week} className="flex items-center gap-3 text-sm">
                    <span className="w-16 shrink-0 text-[#8A8A8E]">{week.week}-hafta</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1F4F9]">
                      <div className="h-full rounded-full bg-[#5D87FF]" style={{ width: `${(week.attempts / maxAttempts) * 100}%` }} />
                    </div>
                    <span className="w-28 shrink-0 text-right font-semibold text-[#191C1D]">
                      {week.attempts} ta · {week.avg_score}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-[#8A8A8E]">Hali natijalar yo'q</p>
            )}
          </div>
          <div className={CARD}>
            <h3 className="mb-3 text-base font-bold text-[#191C1D]">Ballar manbai</h3>
            <div className="flex flex-col gap-2.5">
              {Object.entries(data.points_by_source).map(([source, value]) => (
                <div key={source} className="flex justify-between text-sm">
                  <span className="text-[#8A8A8E]">{SOURCE_LABELS[source]}</span>
                  <span className="font-semibold text-[#191C1D]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const EMPTY_TEST = { week_number: '', start_at: '', end_at: '', duration_minutes: 60, question_count: 25, grades: [] }

const Tests = ({ season, grades, onChanged }) => {
  const [form, setForm] = useState(EMPTY_TEST)
  const [saving, setSaving] = useState(false)
  const [pickedWeek, setPickedWeek] = useState(null)
  const [editingWeek, setEditingWeek] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const { data: response, refetch } = useGetQuery({ key: ['liga-tests', season.id], url: `${API}tests/`, params: { season: season.id }, staleTime: 0, refetchOnMount: 'always' })
  const tests = response?.data || []
  const weeks = [...new Set(tests.map((test) => test.week_number))].sort((a, b) => a - b)
  const week = weeks.includes(pickedWeek) ? pickedWeek : null
  const shownTests = week ? tests.filter((test) => test.week_number === week) : tests
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })
  const toggleGrade = (id) =>
    setForm({ ...form, grades: form.grades.includes(id) ? form.grades.filter((item) => item !== id) : [...form.grades, id] })

  const create = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await request.post(`${API}tests/bulk-create/`, {
        ...form,
        season: season.id,
        start_at: toIso(form.start_at),
        end_at: toIso(form.end_at)
      })
      setForm(EMPTY_TEST)
      refetch()
    } catch (error) {
      showError(error)
    } finally {
      setSaving(false)
    }
  }

  const togglePublish = async (test) => {
    try {
      await request.patch(`${API}tests/${test.id}/`, { is_published: !test.is_published })
      refetch()
    } catch (error) {
      showError(error)
    }
  }

  const removeTests = async () => {
    try {
      await request.delete(deleting.url, { params: deleting.params })
      setDeleting(null)
      await Promise.all([refetch(), onChanged()])
    } catch (error) {
      showError(error)
    }
  }

  const askDeleteWeek = () => {
    const blocked = shownTests.some((test) => test.attempts_count > 0)
    setDeleting({
      title: `${week}-haftani o'chirish`,
      text: blocked
        ? "Bu haftada o'quvchilar natijalari bor, shuning uchun uni o'chirib bo'lmaydi."
        : `Shu haftaning ${shownTests.length} ta sinf testi savollari bilan o'chadi. Buni qaytarib bo'lmaydi.`,
      blocked,
      url: `${API}tests/week/`,
      params: { season: season.id, week_number: week }
    })
  }

  const askDeleteTest = (test) =>
    setDeleting({
      title: `${test.week_number}-hafta, ${test.grade_name}-sinf testini o'chirish`,
      text: "Test savollari bilan o'chadi. Buni qaytarib bo'lmaydi.",
      url: `${API}tests/${test.id}/`
    })

  return (
    <div className="flex flex-col gap-4">
      {!season.is_closed ? (
        <form onSubmit={create} className={CARD}>
          <SectionHead Icon={Plus} title="Haftalik test qo'shish" text="Yangi haftalik test yaratib, sinf, vaqt va savollar sonini belgilang." />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {[
              ['Hafta raqami', 'week_number', 'number', Hash],
              ['Boshlanish vaqti', 'start_at', 'datetime-local', CalendarDays],
              ['Tugash vaqti', 'end_at', 'datetime-local', CalendarDays],
              ['Ishlash vaqti (daqiqa)', 'duration_minutes', 'number', Clock],
              ['Savollar soni', 'question_count', 'number', Layers]
            ].map(([label, field, type, Icon]) => (
              <IconField
                key={field}
                label={label}
                Icon={Icon}
                required
                type={type}
                min={type === 'number' ? 1 : undefined}
                max={field === 'week_number' ? season.weeks_count : undefined}
                placeholder={field === 'week_number' ? 'Masalan: 1' : undefined}
                value={form[field]}
                onChange={update(field)}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="mr-1 inline-flex h-10 items-center rounded-xl bg-[#F1F4F9] px-3 text-sm font-semibold text-[#191C1D]">Sinflar:</span>
            {grades.map((grade) => {
              const selected = form.grades.includes(grade.id)
              return (
                <button
                  key={grade.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleGrade(grade.id)}
                  className={`relative flex h-14 w-[52px] flex-col items-center justify-center rounded-2xl border transition sm:h-16 sm:w-[60px] ${
                    selected
                      ? 'border-transparent bg-gradient-to-b from-[#6F95FF] to-[#4570EA] text-white shadow-[0_10px_18px_-10px_rgba(69,112,234,0.9)]'
                      : 'border-[#E8ECF3] bg-gradient-to-b from-white to-[#F3F6FC] text-[#191C1D] shadow-sm hover:border-[#C9D8F5]'
                  }`}
                >
                  <GraduationCap size={18} className={selected ? 'text-white' : 'text-[#64748B]'} />
                  <span className="text-base font-bold leading-6 sm:text-lg">{grade.name}</span>
                  {selected ? (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#5D87FF] bg-white text-[#5D87FF]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  ) : null}
                </button>
              )
            })}
            <button type="button" onClick={() => setForm({ ...form, grades: grades.map((grade) => grade.id) })} className="h-10 px-2 text-sm font-semibold text-[#5D87FF]">
              Hammasi
            </button>
            <button disabled={saving || !form.grades.length} className={`${BUTTON} ml-auto`}>
              <PlusCircle size={18} />
              Qo'shish
            </button>
          </div>
        </form>
      ) : null}

      <div className={CARD}>
        <div className="mb-3">
          <SectionHead Icon={Layers} title="Haftalik testlar ro'yxati" />
        </div>
        {weeks.length ? (
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="no-scrollbar flex min-w-0 max-w-full gap-1.5 overflow-x-auto">
              {[null, ...weeks].map((item) => (
                <button
                  key={item || 'all'}
                  onClick={() => setPickedWeek(item)}
                  className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                    week === item ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E6EBF5]'
                  }`}
                >
                  {item ? `${item}-hafta` : 'Barcha haftalar'}
                </button>
              ))}
            </div>
            {!season.is_closed && week ? (
              <div className="flex gap-1.5 sm:ml-auto">
                <button onClick={() => setEditingWeek(true)} className={`${WEEK_ACTION} bg-[#E6EFFF] text-[#5D87FF] hover:bg-[#D9E6FF]`}>
                  <Pencil size={15} />
                  Tahrirlash
                </button>
                <button onClick={askDeleteWeek} className={`${WEEK_ACTION} ${DANGER_LIGHT}`}>
                  <Trash2 size={15} />
                  O'chirish
                </button>
              </div>
            ) : null}
            {!season.is_closed && !week ? (
              <span className="text-xs text-[#8A8A8E] sm:ml-auto">Tahrirlash yoki o'chirish uchun haftani tanlang</span>
            ) : null}
          </div>
        ) : null}
        <Table
          head={[
            'Hafta',
            <HeadCell key="grade" Icon={GraduationCap} label="Sinf" />,
            <HeadCell key="start" Icon={CalendarDays} label="Boshlanish" />,
            <HeadCell key="end" Icon={CalendarDays} label="Tugash" />,
            <HeadCell key="duration" Icon={Clock} label="Ishlash vaqti" />,
            <HeadCell key="questions" Icon={Layers} label="Savollar" />,
            <HeadCell key="attempts" Icon={Users} label="Ishlaganlar" />,
            <HeadCell key="status" Icon={Activity} label="Holat" />,
            ''
          ]}
        >
          {shownTests.map((test) => (
            <tr key={test.id}>
              <td className={TD}>
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#F1F4F9] px-1.5 text-sm font-semibold">{test.week_number}</span>
              </td>
              <td className={TD}>
                <span className="rounded-lg bg-[#E6EFFF] px-2.5 py-1 text-sm font-semibold text-[#5D87FF]">{test.grade_name}-sinf</span>
              </td>
              <td className={TD}>{formatDateTime(test.start_at)}</td>
              <td className={TD}>{formatDateTime(test.end_at)}</td>
              <td className={TD}>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EEF4FF] px-2.5 py-1 text-xs font-semibold">
                  <Clock size={14} className="text-[#5D87FF]" />
                  {test.duration_minutes} daq.
                </span>
              </td>
              <td className={TD}>
                {test.questions_total} / {test.question_count}
              </td>
              <td className={TD}>{test.attempts_count}</td>
              <td className={TD}>
                <StatusPill status={test.status} />
              </td>
              <td className={`${TD} text-right`}>
                <div className="inline-flex items-center gap-2">
                  <button onClick={() => togglePublish(test)} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#F1F4F9] px-3 text-xs font-semibold text-[#191C1D] transition hover:bg-[#E6EBF5]">
                    {test.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                    {test.is_published ? 'Yashirish' : "E'lon qilish"}
                  </button>
                  <Link href={`/dashboard/teacher/liga/tests/${test.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#E6EFFF] px-3 text-xs font-semibold text-[#5D87FF] transition hover:bg-[#D9E6FF]">
                    <Pencil size={14} />
                    Ochish
                  </Link>
                  {!season.is_closed && !test.attempts_count ? (
                    <button
                      onClick={() => askDeleteTest(test)}
                      aria-label="Testni o'chirish"
                      title="Testni o'chirish"
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${DANGER_LIGHT}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {!tests.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Testlar yo'q</p> : null}
      </div>

      {editingWeek ? (
        <WeekEditDialog
          season={season}
          week={week}
          tests={shownTests}
          onSaved={async (number) => {
            setEditingWeek(false)
            setPickedWeek(number)
            await refetch()
          }}
          onClose={() => setEditingWeek(false)}
        />
      ) : null}

      <LigaDialog
        open={Boolean(deleting)}
        tone="danger"
        Icon={Trash2}
        title={deleting?.title}
        text={deleting?.text}
        confirmLabel="O'chirish"
        cancelLabel="Bekor qilish"
        disabled={deleting?.blocked}
        onConfirm={removeTests}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}

/** Mentor: liga ko'rsatkichlari va testlari */
const LigaDashboard = () => {
  const { seasons, season, grades, setSeasonId, refetch, loaded } = useLigaSeason()
  const [tab, setTab] = useState('overview')
  const [creating, setCreating] = useState(false)
  const [closing, setClosing] = useState(false)
  const [hiding, setHiding] = useState(false)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [weeks, setWeeks] = useState(12)

  const nextNumber = (seasons[0]?.number || 0) + 1

  const createSeason = async () => {
    try {
      const { data } = await request.post(`${API}seasons/`, { number: nextNumber, weeks_count: Number(weeks) })
      await refetch()
      setSeasonId(data.id)
      setCreating(false)
    } catch (error) {
      showError(error)
    }
  }

  const togglePublish = async () => {
    try {
      await request.patch(`${API}seasons/${season.id}/`, { is_published: !season.is_published })
      await refetch()
      setHiding(false)
    } catch (error) {
      showError(error)
    }
  }

  const closeSeason = async () => {
    try {
      await request.post(`${API}seasons/${season.id}/close/`)
      await refetch()
      setClosing(false)
    } catch (error) {
      showError(error)
    }
  }

  const deleteSeason = async () => {
    try {
      await request.delete(`${API}seasons/${season.id}/`)
      setDeleting(false)
      await refetch()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <LigaHero {...(tab === 'tests' ? TESTS_HERO : MAIN_HERO)} title="Matematik Liga" />

      <div className="flex flex-wrap items-center gap-3">
        {season ? (
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#F0F2F7] bg-white p-1 shadow-sm">
            {TABS.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
                  tab === key ? 'bg-[#5D87FF] text-white' : 'text-[#191C1D] hover:bg-[#F1F4F9]'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          {season ? (
            <>
              <SeasonSelect seasons={seasons} season={season} onChange={setSeasonId} />
              {!season.is_closed ? (
                <>
                  <button onClick={season.is_published ? () => setHiding(true) : togglePublish} className={ACTION_LIGHT}>
                    {season.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                    {season.is_published ? 'Yashirish' : "E'lon qilish"}
                  </button>
                  <button onClick={() => setClosing(true)} className={ACTION_LIGHT}>
                    <Lock size={18} />
                    Yopish
                  </button>
                  <button onClick={() => setEditing(true)} aria-label="Mavsumni tahrirlash" title="Mavsumni tahrirlash" className={`${ICON_ACTION} bg-[#F1F4F9] text-[#191C1D] hover:bg-[#E6EBF5]`}>
                    <Pencil size={18} />
                  </button>
                </>
              ) : null}
              <button onClick={() => setDeleting(true)} aria-label="Mavsumni o'chirish" title="Mavsumni o'chirish" className={`${ICON_ACTION} ${DANGER_LIGHT}`}>
                <Trash2 size={18} />
              </button>
            </>
          ) : null}
          <button onClick={() => setCreating(true)} className={`${ACTION} bg-[#5D87FF] text-white hover:bg-[#4570EA]`}>
            <PlusCircle size={18} />
            Yangi mavsum
          </button>
        </div>
      </div>

      {season ? (
        <>
          {tab === 'overview' ? <Overview season={season} /> : null}
          {tab === 'tests' ? <Tests key={season.id} season={season} grades={grades} onChanged={refetch} /> : null}
        </>
      ) : loaded ? (
        <LigaSeasonEmpty
          title={['Hali', 'mavsum', "yo'q"]}
          text="Hozirda Matematika Ligasida faol mavsum mavjud emas. Yangi mavsum boshlanganda bu yerda testlar, reyting va natijalar paydo bo'ladi."
        />
      ) : (
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      )}

      <LigaDialog
        open={creating}
        Icon={CalendarDays}
        title={`${nextNumber}-mavsumni yaratish`}
        text="Mavsum haftalardan iborat, har haftada bitta test o'tkaziladi."
        confirmLabel="Yaratish"
        cancelLabel="Bekor qilish"
        disabled={!(Number(weeks) > 0)}
        onConfirm={createSeason}
        onClose={() => setCreating(false)}
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#475569]">
          Haftalar soni
          <input
            autoFocus
            type="number"
            min={1}
            value={weeks}
            onChange={(event) => setWeeks(event.target.value)}
            className={`${INPUT} h-11 text-base`}
          />
        </label>
        <p className="mt-2 text-xs leading-relaxed text-[#8A8A8E]">
          12 hafta taxminan 3 oy degani. Oxirgi hafta testi tugagach mavsum avtomatik yopiladi va g'oliblar e'lon qilinadi.
        </p>
      </LigaDialog>

      <LigaDialog
        open={hiding}
        tone="danger"
        Icon={EyeOff}
        title={season ? `${season.number}-mavsumni yashirish` : ''}
        text="Mavsum va uning testlari o'quvchilarga ko'rinmay qoladi. Ballar va natijalar saqlanadi, keyin yana e'lon qilish mumkin. Yashirin mavsum avtomatik yopilmaydi."
        confirmLabel="Mavsumni yashirish"
        cancelLabel="Bekor qilish"
        onConfirm={togglePublish}
        onClose={() => setHiding(false)}
      />

      <LigaDialog
        open={closing}
        tone="danger"
        Icon={Lock}
        title={season ? `${season.number}-mavsumni yopish` : ''}
        text="G'oliblar saqlanadi, hammaning liga ballari nolga tushadi. Buni qaytarib bo'lmaydi."
        confirmLabel="Mavsumni yopish"
        cancelLabel="Bekor qilish"
        onConfirm={closeSeason}
        onClose={() => setClosing(false)}
      />

      {editing && season ? (
        <SeasonEditDialog
          season={season}
          onSaved={async () => {
            setEditing(false)
            await refetch()
          }}
          onClose={() => setEditing(false)}
        />
      ) : null}

      <LigaDialog
        open={deleting}
        tone="danger"
        Icon={Trash2}
        title={season ? `${season.number}-mavsumni o'chirish` : ''}
        text={
          season?.participants_count
            ? `Bu mavsumda ${season.participants_count} ta ishtirokchi bor. Ballari va natijalari yo'qolmasligi uchun uni o'chirib bo'lmaydi.`
            : `Mavsum ${season?.tests_count || 0} ta testi va savollari bilan o'chadi. Buni qaytarib bo'lmaydi.`
        }
        confirmLabel="Mavsumni o'chirish"
        cancelLabel="Bekor qilish"
        disabled={Boolean(season?.participants_count)}
        onConfirm={deleteSeason}
        onClose={() => setDeleting(false)}
      />
    </div>
  )
}

export default LigaDashboard
