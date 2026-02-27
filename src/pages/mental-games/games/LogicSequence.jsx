import React, { useMemo, useState } from 'react'
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default function LogicSequence() {
  const [score, setScore] = useState(0)
  const [seed, setSeed] = useState(0)
  const [answer, setAnswer] = useState('')

  const q = useMemo(() => {
    const start = rand(1, 10)
    const step = rand(1, 6)
    const seq = [start, start + step, start + step * 2, start + step * 3]
    return { seq: [seq[0], seq[1], seq[2], null], hidden: seq[3] }
  }, [seed])

  const submit = () => {
    const val = Number(answer)
    if (!Number.isFinite(val)) return
    setScore((s) => s + (val === q.hidden ? 1 : -1))
    setAnswer('')
    setSeed((s) => s + 1)
  }

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Ketma-ketlik (mantiq)</div>
        <div className="text-sm font-bold text-gray-600">Score: {score}</div>
      </div>

      <div className="mt-6 font-bold text-gray-600">Bo‘sh joyni to‘ldiring:</div>
      <div className="mt-2 text-3xl font-black">
        {q.seq.map((x, i) => (
          <span key={i} className="mr-3">
            {x === null ? '__' : x}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="w-40 px-3 py-2 font-bold border outline-none rounded-xl focus:ring-2 focus:ring-blue-200"
          placeholder="javob"
          inputMode="numeric"
        />
        <button onClick={submit} className="px-4 py-2 font-extrabold text-white bg-blue-600 rounded-xl">
          Tekshir
        </button>
      </div>
    </div>
  )
}
