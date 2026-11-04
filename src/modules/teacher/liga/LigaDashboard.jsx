import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Activity, ArrowUpDown, Award, BarChart3, CalendarDays, ClipboardCheck, Clock, Crown, Eye, EyeOff, FileText,
  GraduationCap, Hash, Layers, Lock, Pencil, Plus, PlusCircle, Target, Trophy, Users
} from 'lucide-react'
import LigaDialog from '@/components/modal/LigaDialog'
import { useGetQuery } from '@/hooks'
import { request } from '@/services/api'
import { HeadCell, IconField, LigaHero, LigaTable as Table, SectionHead, StatusPill } from './LigaParts'
import {
  API, BUTTON, BUTTON_LIGHT, CARD, INPUT, TD,
  downloadExcel, formatDateTime, formatDuration, showError, toIso
} from './utils'

const MAIN_HERO = {
  image: '/images/league/trophy-hero.webp',
  width: 1000,
  height: 499,
  subtitle: "Sinflar bo'yicha matematika ligasi natijalari va statistikasi"
}
const TESTS_HERO = {
  image: '/images/league/tests-hero.webp',
  width: 956,
  height: 272,
  subtitle: 'Matematika ligasi testlarini boshqarish va natijalarini kuzatish'
}

const TABS = [
  ['overview', "Ko'rsatkichlar", BarChart3],
  ['tests', 'Testlar', FileText],
  ['standings', 'Reyting', Trophy],
  ['winners', "G'oliblar", Crown]
]

const SOURCE_LABELS = { daily: 'Kunlik kirish', subject: 'Fanlarni ishlash', test: 'Haftalik testlar' }

const ACTION = 'inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition sm:px-5'
const ACTION_LIGHT = `${ACTION} bg-[#F1F4F9] text-[#191C1D] hover:bg-[#E6EBF5]`

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
  const gradeRows = descending ? [...data.grades].reverse() : data.grades
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

const Tests = ({ season, grades }) => {
  const [form, setForm] = useState(EMPTY_TEST)
  const [saving, setSaving] = useState(false)
  const { data: response, refetch } = useGetQuery({ key: ['liga-tests', season.id], url: `${API}tests/`, params: { season: season.id }, staleTime: 0, refetchOnMount: 'always' })
  const tests = response?.data || []
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
                placeholder={field === 'week_number' ? 'Masalan: 1' : undefined}
                value={form[field]}
                onChange={update(field)}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-[#475569]">Sinflar:</span>
            {grades.map((grade) => (
              <button
                key={grade.id}
                type="button"
                onClick={() => toggleGrade(grade.id)}
                className={`h-9 min-w-9 rounded-xl px-2.5 text-sm font-semibold transition ${
                  form.grades.includes(grade.id) ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#191C1D] hover:bg-[#E6EBF5]'
                }`}
              >
                {grade.name}
              </button>
            ))}
            <button type="button" onClick={() => setForm({ ...form, grades: grades.map((grade) => grade.id) })} className="h-9 px-2 text-sm font-semibold text-[#5D87FF]">
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
        <Table
          head={[
            '#',
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
          {tests.map((test) => (
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
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {!tests.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Testlar yo'q</p> : null}
      </div>
    </div>
  )
}

const Standings = ({ season, grades }) => {
  const [grade, setGrade] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const params = { page, page_size: 50, ...(grade ? { grade } : {}), ...(search ? { search } : {}) }
  const url = `${API}seasons/${season.id}/standings/`
  const { data: response } = useGetQuery({ key: ['liga-standings', season.id], url, params, staleTime: 0, refetchOnMount: 'always' })
  const rows = response?.data?.results || []
  const total = response?.data?.count || 0

  return (
    <div className={CARD}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <select value={grade} onChange={(event) => { setGrade(event.target.value); setPage(1) }} className={INPUT}>
          <option value="">Barcha sinflar</option>
          {grades.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}-sinf
            </option>
          ))}
        </select>
        <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Ism yoki telefon" className={INPUT} />
        <button onClick={() => downloadExcel(url, { ...(grade ? { grade } : {}), ...(search ? { search } : {}) }, `liga_${season.number}_reyting.xlsx`)} className={`${BUTTON_LIGHT} ml-auto`}>
          Excel
        </button>
      </div>
      <Table head={["O'rin", 'Sinf', 'F.I.Sh.', 'Telefon', 'Viloyat', 'Maktab', 'Ballar', 'Testlar', 'Test ballari']}>
        {rows.map((row) => (
          <tr key={row.student_id}>
            <td className={`${TD} font-semibold`}>{row.rank}</td>
            <td className={TD}>{row.grade}</td>
            <td className={TD}>{row.full_name}</td>
            <td className={TD}>{row.phone}</td>
            <td className={TD}>{row.region || '—'}</td>
            <td className={TD}>{row.school || '—'}</td>
            <td className={`${TD} font-semibold`}>{row.points}</td>
            <td className={TD}>{row.tests_taken}</td>
            <td className={TD}>{row.test_score}</td>
          </tr>
        ))}
      </Table>
      {!rows.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Ishtirokchilar yo'q</p> : null}
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

const Winners = ({ season }) => {
  const [target, setTarget] = useState(null)
  const [reason, setReason] = useState('')
  const { data: response, refetch } = useGetQuery({ key: ['liga-winners-admin', season.id], url: `${API}winners/`, params: { season: season.id }, staleTime: 0, refetchOnMount: 'always' })
  const rows = response?.data || []

  const patch = async (winner, body) => {
    try {
      await request.patch(`${API}winners/${winner.id}/`, body)
      refetch()
    } catch (error) {
      showError(error)
    }
  }

  const toggleDisqualify = (winner) => {
    if (winner.is_disqualified) return patch(winner, { is_disqualified: false, disqualify_reason: '' })
    setReason('')
    return setTarget(winner)
  }

  const disqualify = async () => {
    await patch(target, { is_disqualified: true, disqualify_reason: reason.trim() })
    setTarget(null)
  }

  if (!season.is_closed) {
    return <div className={`${CARD} py-10 text-center text-sm text-[#8A8A8E]`}>G'oliblar mavsum yopilgach aniqlanadi</div>
  }

  return (
    <div className={CARD}>
      <Table head={['Sinf', "O'rin", 'F.I.Sh.', 'Telefon', 'Ballar', "Sovg'a", 'Hujjatlar', 'Holat']}>
        {rows.map((row) => (
          <tr key={row.id}>
            <td className={TD}>{row.grade_name}-sinf</td>
            <td className={`${TD} font-semibold`}>{row.place}</td>
            <td className={TD}>{row.full_name}</td>
            <td className={TD}>{row.phone}</td>
            <td className={TD}>{row.points}</td>
            <td className={TD}>{row.prize_uz}</td>
            <td className={TD}>
              <input type="checkbox" checked={row.documents_checked} onChange={(event) => patch(row, { documents_checked: event.target.checked })} />
            </td>
            <td className={TD}>
              <button onClick={() => toggleDisqualify(row)} className={`text-xs font-semibold ${row.is_disqualified ? 'text-[#DC2626]' : 'text-[#475569]'}`}>
                {row.is_disqualified ? `Mahrum: ${row.disqualify_reason}` : 'Mahrum qilish'}
              </button>
            </td>
          </tr>
        ))}
      </Table>
      {!rows.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">G'oliblar yo'q</p> : null}

      <LigaDialog
        open={Boolean(target)}
        tone="danger"
        Icon={Award}
        title="Sovg'adan mahrum qilish"
        text={target ? `${target.full_name}, ${target.grade_name}-sinf, ${target.place}-o'rin` : ''}
        confirmLabel="Mahrum qilish"
        cancelLabel="Bekor qilish"
        disabled={!reason.trim()}
        onConfirm={disqualify}
        onClose={() => setTarget(null)}
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#475569]">
          Sababi
          <textarea
            autoFocus
            rows={3}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Masalan: hujjatga ko'ra sinfi boshqa"
            className={`${INPUT} h-auto py-2`}
          />
        </label>
      </LigaDialog>
    </div>
  )
}

/** Mentor: liga ko'rsatkichlari, testlar, reyting va g'oliblar */
const LigaDashboard = () => {
  const [seasonId, setSeasonId] = useState(null)
  const [tab, setTab] = useState('overview')
  const [creating, setCreating] = useState(false)
  const [closing, setClosing] = useState(false)
  const [weeks, setWeeks] = useState(12)
  const { data: seasonsResponse, refetch } = useGetQuery({ key: 'liga-seasons-admin', url: `${API}seasons/`, staleTime: 0, refetchOnMount: 'always' })
  const { data: metaResponse } = useGetQuery({ key: 'liga-meta', url: `${API}meta/` })

  const seasons = seasonsResponse?.data || []
  const grades = [...(metaResponse?.data?.grades || [])].sort((a, b) => Number(a.name) - Number(b.name))
  const season = seasons.find((item) => item.id === seasonId) || seasons[0]

  useEffect(() => {
    if (!seasonId && seasons.length) setSeasonId(seasons[0].id)
  }, [seasonId, seasons])

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
      refetch()
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
              <select
                value={season.id}
                onChange={(event) => setSeasonId(Number(event.target.value))}
                className="h-11 rounded-full border border-[#EBEDF0] bg-white px-4 text-sm font-semibold text-[#191C1D] outline-none focus:border-[#5D87FF]"
              >
                {seasons.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.number}-mavsum{item.is_closed ? ' (yopilgan)' : ''}
                  </option>
                ))}
              </select>
              {!season.is_closed ? (
                <>
                  <button onClick={togglePublish} className={ACTION_LIGHT}>
                    {season.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                    {season.is_published ? 'Yashirish' : "E'lon qilish"}
                  </button>
                  <button onClick={() => setClosing(true)} className={ACTION_LIGHT}>
                    <Lock size={18} />
                    Yopish
                  </button>
                </>
              ) : null}
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
          {tab === 'tests' ? <Tests season={season} grades={grades} /> : null}
          {tab === 'standings' ? <Standings season={season} grades={grades} /> : null}
          {tab === 'winners' ? <Winners season={season} /> : null}
        </>
      ) : (
        <div className={`${CARD} py-16 text-center text-sm text-[#8A8A8E]`}>Hali mavsum yo'q</div>
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
    </div>
  )
}

export default LigaDashboard
