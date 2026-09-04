import { useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'

const BattleTimer = ({ startedAt, seconds, onExpire }) => {
  const [remaining, setRemaining] = useState(seconds)
  const expiredRef = useRef(false)

  useEffect(() => {
    expiredRef.current = false
  }, [startedAt])

  useEffect(() => {
    if (!startedAt) return undefined
    const tick = () => {
      const elapsed = (Date.now() - startedAt) / 1000
      const next = Math.max(0, Math.ceil(seconds - elapsed))
      setRemaining(next)

      // A couple of seconds of grace after hitting 0 for the server's own
      // timeout task to arrive normally, before we nudge it ourselves.
      if (next <= 0 && elapsed - seconds > 2 && !expiredRef.current) {
        expiredRef.current = true
        onExpire?.()
      }
    }
    tick()
    const interval = setInterval(tick, 250)
    return () => clearInterval(interval)
  }, [startedAt, seconds, onExpire])

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
