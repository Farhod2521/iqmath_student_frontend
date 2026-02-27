import React, { useMemo, useState } from 'react'
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default function QuickAddition() {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [seed, setSeed] = useState(0)
  const [answer, setAnswer] = useState('')

  const q = useMemo(() => {
    const a = rand(1, 20)
    const b = rand(1, 20)
    return { a, b, sum: a + b }
  }, [seed])

  const submit = () => {
    const val = Number(answer)
    if (!Number.isFinite(val)) return
    if (val === q.sum) setScore((s) => s + 1)
    else setLives((l) => l - 1)
    setAnswer('')
    setSeed((s) => s + 1)
  }

  const reset = () => {
    setScore(0)
    setLives(3)
    setAnswer('')
    setSeed((s) => s + 1)
  }

  const over = lives <= 0

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Tez qo‘shish</div>
        <div className="text-sm font-bold text-gray-600">
          Score: {score} • Lives: {lives}
        </div>
      </div>

      {over ? (
        <div className="mt-6">
          <div className="text-xl font-black">O‘yin tugadi 😅</div>
          <p className="mt-2 text-gray-600">Natija: {score}</p>
          <button onClick={reset} className="px-4 py-2 mt-4 font-extrabold text-white bg-blue-600 rounded-xl">
            Qaytadan
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 text-3xl font-black">
            {q.a} + {q.b} = ?
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
            <button
              onClick={submit}
              className="px-4 py-2 font-extrabold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Tekshir
            </button>
          </div>
        </>
      )}
    </div>
  )
}
