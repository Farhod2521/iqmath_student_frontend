import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Filters({ search, setSearch }) {
  const { t } = useTranslation()
  return (
    <div className="p-4 bg-white border rounded-2xl">
      <div className="mb-3 font-extrabold">{t('games.hero.filters')}</div>

      <label className="block mb-2 text-sm font-bold">{t('games.hero.search')}</label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Masalan: qo‘shish, memory..."
        className="w-full px-3 py-2 border outline-none rounded-xl focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}
