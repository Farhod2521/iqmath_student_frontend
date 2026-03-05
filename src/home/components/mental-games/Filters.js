import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Filters({ categories, activeCategory, setActiveCategory }) {
  const { t } = useTranslation()

  return (
    <div className="p-4 rounded-2xl">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex items-center gap-1.5 rounded-full border-2 border-transparent px-5 py-2 text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
              ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-500 shadow-sm'
              }`}
        >
          {t('allNews')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl border font-semibold transition
            ${
              activeCategory === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t(`games.categories.${cat}`)}
          </button>
        ))}
      </div>
    </div>
  )
}