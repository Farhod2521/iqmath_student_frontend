import React from 'react'
import { useTranslation } from 'react-i18next'

export default function GameCard({ game, onPlay }) {
  const { t } = useTranslation()

  return (
    <div
      onClick={onPlay}
      className="group relative cursor-pointer rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-sky-400/20 to-fuchsia-500/30"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 backdrop-blur shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.32)]">
        {/* Image */}
        <div className="relative h-[170px] bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50">
          {game.cover ? (
            <img
              src={game.cover}
              alt={game.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              onError={(e) => {
                // fallback: broken image bo‘lsa yashirib qo‘yamiz
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-500">
              No image
            </div>
          )}

          {/* overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-transparent to-white/30" />

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-extrabold text-slate-700 border border-white/60 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              {(game.category || 'game').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="font-extrabold text-slate-900 line-clamp-1">{game.title}</div>

          <div className="mt-1 text-sm font-semibold text-slate-500 line-clamp-1">{t('games.card.subtitle')}</div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPlay?.()
            }}
            className="mt-4 w-full rounded-2xl py-2.5 font-extrabold text-white
              bg-gradient-to-r from-indigo-600 to-violet-600
              shadow-[0_12px_22px_-14px_rgba(79,70,229,0.9)]
              hover:brightness-[1.05] active:scale-[0.99] transition"
          >
            ▶ {t('games.card.play')}
          </button>
        </div>
      </div>
    </div>
  )
}
