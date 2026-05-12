import React, { useMemo, useState } from 'react'
const shapes = ['○', '□', '△', '◇', '★']
const randIndex = (n) => Math.floor(Math.random() * n)

export default function ShapeMatch() {
  const [score, setScore] = useState(0)
  const [seed, setSeed] = useState(0)

  const target = useMemo(() => shapes[randIndex(shapes.length)], [seed])
  const options = useMemo(() => {
    const set = new Set()
    set.add(target)
    while (set.size < 4) set.add(shapes[randIndex(shapes.length)])
    return Array.from(set).sort(() => Math.random() - 0.5)
  }, [seed, target])

  const pick = (s) => {
    setScore((x) => x + (s === target ? 1 : -1))
    setSeed((x) => x + 1)
  }

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Shakl topish</div>
        <div className="text-sm font-bold text-gray-600">Score: {score}</div>
      </div>

      <div className="mt-6 font-bold text-gray-600">Shuni toping:</div>
      <div className="mt-2 text-6xl font-black">{target}</div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {options?.map((s) => (
          <button
            key={s}
            onClick={() => pick(s)}
            className="h-20 text-4xl font-black border rounded-2xl hover:bg-gray-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
