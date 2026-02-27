import React, { useEffect, useState } from 'react'

export default function FocusClick() {
  const [time, setTime] = useState(10)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (time <= 0) return
    const t = setInterval(() => setTime((x) => x - 1), 1000)
    return () => clearInterval(t)
  }, [running, time])

  const start = () => {
    setTime(10)
    setScore(0)
    setRunning(true)
  }

  const click = () => {
    if (!running || time <= 0) return
    setScore((s) => s + 1)
  }

  const over = running && time <= 0

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Diqqat (tez bos)</div>
        <div className="text-sm font-bold text-gray-600">
          Time: {time}s • Score: {score}
        </div>
      </div>

      <div className="mt-6">
        {!running ? (
          <button onClick={start} className="px-5 py-3 font-extrabold text-white bg-blue-600 rounded-xl">
            Boshlash (10s)
          </button>
        ) : (
          <button
            onClick={click}
            className="w-full h-40 rounded-2xl font-black text-2xl bg-purple-600 text-white active:scale-[0.99]"
          >
            BOS!
          </button>
        )}

        {over && (
          <div className="mt-4">
            <div className="text-xl font-black">Tugadi! 👏</div>
            <div className="mt-1 text-gray-600">Natija: {score}</div>
            <button onClick={() => setRunning(false)} className="px-4 py-2 mt-3 font-extrabold border rounded-xl">
              Qayta
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
