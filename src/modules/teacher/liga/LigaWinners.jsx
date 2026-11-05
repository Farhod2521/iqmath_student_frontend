import { useState } from 'react'
import { Award } from 'lucide-react'
import LigaDialog from '@/components/modal/LigaDialog'
import { useGetQuery } from '@/hooks'
import { request } from '@/services/api'
import { LigaTable as Table } from './LigaParts'
import LigaSeasonPage from './LigaSeasonPage'
import { API, CARD, INPUT, TD, showError } from './utils'

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

/** Mentor: mavsum g'oliblari va ularning sovg'alari */
const LigaWinners = () => (
  <LigaSeasonPage title="G'oliblar" subtitle="Yopilgan mavsum g'oliblari va sovg'alari">
    {(season) => <Winners key={season.id} season={season} />}
  </LigaSeasonPage>
)

export default LigaWinners
