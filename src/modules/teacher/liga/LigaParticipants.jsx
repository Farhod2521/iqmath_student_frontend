import { useState } from 'react'
import { useGetQuery } from '@/hooks'
import { LigaPager, LigaTable as Table, PAGE_SIZE } from './LigaParts'
import LigaSeasonPage from './LigaSeasonPage'
import { API, ATTEMPT_STATUS, BUTTON_LIGHT, CARD, INPUT, TD, downloadExcel, formatDuration } from './utils'

const STARTED = ['live', 'finished']

const Participants = ({ season, grades }) => {
  const [pickedWeek, setPickedWeek] = useState(null)
  const [grade, setGrade] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data: testsResponse } = useGetQuery({ key: ['liga-tests', season.id], url: `${API}tests/`, params: { season: season.id }, staleTime: 0, refetchOnMount: 'always' })
  const tests = testsResponse?.data || []
  const weeks = [...new Set(tests.map((test) => test.week_number))].sort((a, b) => a - b)
  const startedWeeks = tests.filter((test) => STARTED.includes(test.status)).map((test) => test.week_number)
  // Hafta tanlanmagan bo'lsa, boshlangan eng oxirgi hafta ochiladi
  const week = pickedWeek ?? (startedWeeks.length ? Math.max(...startedWeeks) : weeks[0])

  const filters = { week, ...(grade ? { grade } : {}), ...(search ? { search } : {}) }
  const url = `${API}seasons/${season.id}/participants/`
  const { data: response } = useGetQuery({
    key: ['liga-week-participants', season.id],
    url,
    params: { ...filters, page, page_size: PAGE_SIZE },
    enabled: Boolean(week),
    staleTime: 0,
    refetchOnMount: 'always'
  })
  const rows = response?.data?.results || []
  const total = response?.data?.count || 0

  if (testsResponse && !weeks.length) {
    return <div className={`${CARD} py-10 text-center text-sm text-[#8A8A8E]`}>Bu mavsumda haftalik testlar yo'q</div>
  }

  return (
    <div className={CARD}>
      <div className="no-scrollbar mb-3 flex gap-1.5 overflow-x-auto">
        {weeks.map((item) => (
          <button
            key={item}
            onClick={() => { setPickedWeek(item); setPage(1) }}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
              week === item ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E6EBF5]'
            }`}
          >
            {item}-hafta
          </button>
        ))}
      </div>
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
        <span className="text-sm text-[#8A8A8E]">Jami: {total}</span>
        <button onClick={() => downloadExcel(url, filters, `liga_${season.number}_${week}_hafta.xlsx`)} className={`${BUTTON_LIGHT} ml-auto`}>
          Excel
        </button>
      </div>
      <Table head={["O'rin", 'Sinf', 'F.I.Sh.', 'Telefon', 'Viloyat', 'Maktab', 'Holat', "To'g'ri", 'Ball', 'Vaqt']}>
        {rows.map((row) => (
          <tr key={row.attempt_id}>
            <td className={`${TD} font-semibold`}>{row.rank || '—'}</td>
            <td className={TD}>{row.grade}</td>
            <td className={TD}>{row.full_name}</td>
            <td className={TD}>{row.phone}</td>
            <td className={TD}>{row.region || '—'}</td>
            <td className={TD}>{row.school || '—'}</td>
            <td className={TD}>{ATTEMPT_STATUS[row.status]}</td>
            <td className={TD}>
              {row.correct_count} / {row.total_questions}
            </td>
            <td className={`${TD} font-semibold`}>
              {row.score} / {row.max_score}
            </td>
            <td className={TD}>{formatDuration(row.duration_seconds)}</td>
          </tr>
        ))}
      </Table>
      {!rows.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Bu haftada ishtirokchilar yo'q</p> : null}
      <LigaPager page={page} total={total} onChange={setPage} />
    </div>
  )
}

/** Mentor: hafta testini ishlagan o'quvchilar */
const LigaParticipants = () => (
  <LigaSeasonPage title="Ishtirokchilar" subtitle="Hafta testini ishlagan o'quvchilar ro'yxati">
    {(season, grades) => <Participants key={season.id} season={season} grades={grades} />}
  </LigaSeasonPage>
)

export default LigaParticipants
