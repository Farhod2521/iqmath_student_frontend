import React from 'react'

export default function GameCard({ game, onPlay }) {
  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl">
      <div className="h-40 bg-gray-100">
        <img src={game.cover} alt={game.title} className="object-cover w-full h-full" />
      </div>

      <div className="p-4">
        <div className="font-extrabold">{game.title}</div>
        <div className="mt-1 text-xs text-gray-500">{game.category}</div>

        <button
          onClick={() => onPlay(game.slug)}
          className="w-full py-2 mt-3 font-extrabold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
        >
          O‘ynash
        </button>
      </div>
    </div>
  )
}
