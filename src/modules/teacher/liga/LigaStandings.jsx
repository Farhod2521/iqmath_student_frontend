import { useState } from 'react'
import { useGetQuery } from '@/hooks'
import { LigaPager, LigaTable as Table, PAGE_SIZE } from './LigaParts'
import LigaPointsModal from './LigaPointsModal'
import LigaSeasonPage from './LigaSeasonPage'
import { API, BUTTON_LIGHT, CARD, INPUT, TD, downloadExcel } from './utils'

const Standings = ({ season, grades }) => {
  const [grade, setGrade] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [opened, setOpened] = useState(null)
  const params = { page, page_size: PAGE_SIZE, ...(grade ? { grade } : {}), ...(search ? { search } : {}) }
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
      <Table head={["O'rin", 'Sinf', 'F.I.Sh.', 'Telefon', 'Viloyat', 'Maktab', 'Gol', 'Ball', 'Tanga', 'Testlar', 'Test goli']}>
        {rows.map((row) => (
          <tr key={row.student_id}>
            <td className={`${TD} font-semibold`}>{row.rank}</td>
            <td className={TD}>{row.grade}</td>
            <td className={TD}>{row.full_name}</td>
            <td className={TD}>{row.phone}</td>
            <td className={TD}>{row.region || '—'}</td>
            <td className={TD}>{row.school || '—'}</td>
            {[
              ['gol', row.points, 'Gollar', 'text-[#5D87FF] hover:bg-[#EAF0FF]'],
              ['score', row.score ?? 0, 'Ballar', 'text-[#7C3AED] hover:bg-[#F3EEFF]'],
              ['coin', row.coin ?? 0, 'Tangalar', 'text-[#C27803] hover:bg-[#FFF6E0]']
            ].map(([key, value, label, color]) => (
              <td key={key} className={`${TD} font-semibold`}>
                <button
                  onClick={() => setOpened({ row, currency: key })}
                  title={`${label} qayerdan kelgani`}
                  className={`rounded-md px-2 py-1 underline decoration-dotted underline-offset-4 transition ${color}`}
                >
                  {value}
                </button>
              </td>
            ))}
            <td className={TD}>{row.tests_taken}</td>
            <td className={TD}>{row.test_score}</td>
          </tr>
        ))}
      </Table>
      {!rows.length ? <p className="py-8 text-center text-sm text-[#8A8A8E]">Ishtirokchilar yo'q</p> : null}
      <LigaPager page={page} total={total} onChange={setPage} />
      {opened ? (
        <LigaPointsModal season={season} student={opened.row} initialCurrency={opened.currency} onClose={() => setOpened(null)} />
      ) : null}
    </div>
  )
}

/** Mentor: mavsum reytingi */
const LigaStandings = () => (
  <LigaSeasonPage title="Reyting" subtitle="Mavsum gollari bo'yicha o'quvchilar reytingi">
    {(season, grades) => <Standings key={season.id} season={season} grades={grades} />}
  </LigaSeasonPage>
)

export default LigaStandings
