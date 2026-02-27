import React from 'react'

export default function Filters({ category, setCategory, search, setSearch }) {
  const cats = ['all', 'math', 'memory', 'logic', 'attention']

  return (
    <div className="p-4 bg-white border rounded-2xl">
      <div className="mb-3 font-extrabold">Filtrlar</div>

      <label className="block mb-2 text-sm font-bold">Qidiruv</label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Masalan: qo‘shish, memory..."
        className="w-full px-3 py-2 border outline-none rounded-xl focus:ring-2 focus:ring-blue-200"
      />

      <div className="mt-4">
        <div className="mb-2 text-sm font-bold">Kategoriya</div>
        <div className="grid grid-cols-2 gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={[
                'rounded-xl border px-3 py-2 text-sm font-extrabold',
                category === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'
              ].join(' ')}
            >
              {c === 'all' ? 'Hammasi' : c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
