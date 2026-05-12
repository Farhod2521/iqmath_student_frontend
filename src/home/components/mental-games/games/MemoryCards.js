import React, { useMemo, useState } from 'react'
const values = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝']
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export default function MemoryCards() {
  const [seed, setSeed] = useState(0)
  const [opened, setOpened] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [moves, setMoves] = useState(0)

  const cards = useMemo(() => {
    const pair = values.slice(0, 6)
    return shuffle([...pair, ...pair])?.map((v, idx) => ({ id: `${seed}-${idx}`, value: v }))
  }, [seed])

  const reset = () => {
    setOpened([])
    setMatched(new Set())
    setMoves(0)
    setSeed((s) => s + 1)
  }

  const isFaceUp = (id) => opened.includes(id) || matched.has(id)
  const done = matched.size === cards.length

  const click = (c) => {
    if (matched.has(c.id) || opened.includes(c.id) || opened.length === 2) return

    const nextOpened = [...opened, c.id]
    setOpened(nextOpened)

    if (nextOpened.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextOpened
      const ca = cards.find((x) => x.id === a)
      const cb = cards.find((x) => x.id === b)

      if (ca.value === cb.value) {
        setMatched((prev) => new Set([...Array.from(prev), a, b]))
        setTimeout(() => setOpened([]), 350)
      } else {
        setTimeout(() => setOpened([]), 700)
      }
    }
  }

  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Memory Cards</div>
        <div className="text-sm font-bold text-gray-600">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-6">
        {cards?.map((c) => (
          <button
            key={c.id}
            onClick={() => click(c)}
            className="h-16 text-2xl font-black border rounded-2xl hover:bg-gray-50"
          >
            {isFaceUp(c.id) ? c.value : '❓'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-5">
        <button onClick={reset} className="px-4 py-2 font-extrabold border rounded-xl">
          Qayta
        </button>
        {done && <span className="font-extrabold text-emerald-600">Yutdingiz! 🎉</span>}
      </div>
    </div>
  )
}
