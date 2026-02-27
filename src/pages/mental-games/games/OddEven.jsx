import React, { useMemo, useState } from 'react'
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default function OddEven() {
  const [score, setScore] = useState(0)
  const [seed, setSeed] = useState(0)
  const n = useMemo(() => rand(1, 99), [seed])

  const pick = (type) => {
    const isEven = n % 2 === 0
    const ok = (type === 'even' && isEven) || (type === 'odd' && !isEven)
    setScore((s) => s + (ok ? 1 : -1))
    setSeed((s) => s + 1)
  }

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Toq / Juft</div>
        <div className="text-sm font-bold text-gray-600">Score: {score}</div>
      </div>

      <div className="mt-6 text-5xl font-black">{n}</div>

      <div className="flex gap-3 mt-5">
        <button onClick={() => pick('odd')} className="px-5 py-3 font-extrabold text-white rounded-xl bg-rose-600">
          Toq
        </button>
        <button onClick={() => pick('even')} className="px-5 py-3 font-extrabold text-white rounded-xl bg-emerald-600">
          Juft
        </button>
      </div>
    </div>
  )
}
