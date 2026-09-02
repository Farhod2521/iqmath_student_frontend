import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

const BattleTimer = ({ startedAt, seconds }) => {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (!startedAt) return undefined
    const tick = () => {
      const elapsed = (Date.now() - startedAt) / 1000
      setRemaining(Math.max(0, Math.ceil(seconds - elapsed)))
    }
    tick()
    const interval = setInterval(tick, 250)
    return () => clearInterval(interval)
  }, [startedAt, seconds])

  const isLow = remaining <= 10

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
        isLow ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'
      }`}
    >
      <Clock size={14} />
      {remaining} soniya
    </span>
  )
}

export default BattleTimer
