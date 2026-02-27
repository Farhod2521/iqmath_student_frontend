import React, { useMemo, useState } from 'react'
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default function BiggerSmaller() {
  const [score, setScore] = useState(0)
  const [seed, setSeed] = useState(0)

  const q = useMemo(() => {
    const a = rand(1, 50)
    let b = rand(1, 50)
    if (b === a) b = (b % 50) + 1
    return { a, b }
  }, [seed])

  const pick = (type) => {
    const ok = (type === 'bigger' && q.a > q.b) || (type === 'smaller' && q.a < q.b)
    setScore((s) => s + (ok ? 1 : -1))
    setSeed((s) => s + 1)
  }

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Katta / Kichik</div>
        <div className="text-sm font-bold text-gray-600">Score: {score}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-6 text-center border rounded-2xl">
          <div className="text-5xl font-black">{q.a}</div>
          <div className="mt-2 text-xs text-gray-500">A</div>
        </div>
        <div className="p-6 text-center border rounded-2xl">
          <div className="text-5xl font-black">{q.b}</div>
          <div className="mt-2 text-xs text-gray-500">B</div>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button onClick={() => pick('bigger')} className="px-5 py-3 font-extrabold text-white bg-indigo-600 rounded-xl">
          A kattaroq
        </button>
        <button
          onClick={() => pick('smaller')}
          className="px-5 py-3 font-extrabold text-white bg-orange-600 rounded-xl"
        >
          A kichikroq
        </button>
      </div>
    </div>
  )
}
