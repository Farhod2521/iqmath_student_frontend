import React, { useMemo, useState } from 'react'
import { safekidSeeds } from '@/data/gamesData'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'

function normalizeTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const categoryConfig = {
  math: { label: 'Math', emoji: '🔢', color: '#FF6B6B', bg: '#FFF0F0', tw: 'bg-red-50    text-red-500' },
  word: { label: 'Word', emoji: '📝', color: '#4ECDC4', bg: '#F0FFFE', tw: 'bg-teal-50   text-teal-500' },
  puzzle: { label: 'Puzzle', emoji: '🧩', color: '#A855F7', bg: '#FAF0FF', tw: 'bg-purple-50  text-purple-500' },
  memory: { label: 'Memory', emoji: '🧠', color: '#F59E0B', bg: '#FFFBF0', tw: 'bg-amber-50   text-amber-500' },
  'match-3': { label: 'Match', emoji: '✨', color: '#EC4899', bg: '#FFF0F8', tw: 'bg-pink-50    text-pink-500' },
  education: { label: 'Learn', emoji: '🎓', color: '#10B981', bg: '#F0FFF8', tw: 'bg-emerald-50 text-emerald-500' },
  board: { label: 'Board', emoji: '♟️', color: '#6366F1', bg: '#F0F0FF', tw: 'bg-indigo-50  text-indigo-500' },
  action: { label: 'Action', emoji: '⚡', color: '#EF4444', bg: '#FFF0F0', tw: 'bg-red-50     text-red-400' },
  sports: { label: 'Sports', emoji: '🏆', color: '#F97316', bg: '#FFF5F0', tw: 'bg-orange-50  text-orange-500' }
}

const ALL_KEY = 'all'

export default function MentalGames() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState(ALL_KEY)
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const games = useMemo(
    () =>
      (safekidSeeds || []).map((g) => {
        const img = g.cover || g.image || null
        const imgSrc = img ? (typeof img === 'string' ? img : img.src) : null
        return { ...g, title: g.title || normalizeTitle(g.slug), cover: imgSrc }
      }),
    []
  )

  const categories = useMemo(() => [...new Set(games.map((g) => g.category))], [games])

  const filtered = useMemo(
    () => (activeCategory === ALL_KEY ? games : games.filter((g) => g.category === activeCategory)),
    [games, activeCategory]
  )

  return (
    <>
      <LayoutAdmin title={t('users_with_coupons')}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
        .mg-font       { font-family: 'Nunito', sans-serif; }
        .mg-title-font { font-family: 'Fredoka One', cursive; }

        .mg-thumb { aspect-ratio: 4 / 3; }

        .mg-card-img  { transition: transform .4s ease; }
        .mg-card:hover .mg-card-img { transform: scale(1.09); }

        .mg-play-wrap { transition: background .25s ease; }
        .mg-card:hover .mg-play-wrap { background: rgba(0,0,0,0.28); }

        .mg-play-btn {
          opacity: 0;
          transform: scale(0.7);
          transition: opacity .25s, transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .mg-card:hover .mg-play-btn { opacity: 1; transform: scale(1); }

        .mg-blob1 { top:-60px; right:-60px; width:280px; height:280px; }
        .mg-blob2 { bottom:-80px; left:-40px; width:240px; height:240px; }

        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        .mg-float   { animation: float 3s ease-in-out infinite; }
        .mg-fade-up { animation: fadeUp .35s ease both; }
      `}</style>

        <div className="min-h-screen mg-font bg-violet-50">
          {/* ── Header ─────────────────────────────────── */}
          <div className="relative px-6 pt-12 pb-20 overflow-hidden text-center bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600">
            <div className="mg-blob1 absolute rounded-full bg-white/[.07]" />
            <div className="mg-blob2 absolute rounded-full bg-white/[.05]" />

            <span className="relative z-10 block mb-3 text-6xl mg-float mg-title-font">🎮</span>
            <h1 className="relative z-10 mb-2 text-5xl tracking-wide text-white mg-title-font drop-shadow-md">
              Mental Games
            </h1>
            <p className="relative z-10 text-base font-semibold tracking-wide text-white/75">
              Train your brain, have fun!
            </p>
            <span className="relative z-10 mt-4 inline-block rounded-full border border-white/30 bg-white/15 px-5 py-1.5 text-sm font-bold text-white backdrop-blur-md">
              🎲 {games.length} Games Available
            </span>
          </div>

          {/* ── Filters ────────────────────────────────── */}
          <div className="relative z-10 -mt-10 flex flex-wrap justify-center gap-2.5 px-6">
            <button
              onClick={() => setActiveCategory(ALL_KEY)}
              className={`flex items-center gap-1.5 rounded-full border-2 border-transparent px-5 py-2 text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
              ${
                activeCategory === ALL_KEY
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-500 shadow-sm'
              }`}
            >
              🌟 All Games
            </button>

            {categories.map((cat) => {
              const cfg = categoryConfig[cat] ?? { label: cat, emoji: '🎯', color: '#888', bg: '#f5f5f5' }
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-1.5 rounded-full border-2 border-transparent px-5 py-2 text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: isActive ? cfg.color : '#fff',
                    color: isActive ? '#fff' : cfg.color,
                    boxShadow: isActive ? `0 4px 14px ${cfg.color}55` : undefined,
                    transform: isActive ? 'translateY(-2px)' : undefined
                  }}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              )
            })}
          </div>

          {/* ── Grid ───────────────────────────────────── */}
          <div className="max-w-6xl px-4 pt-8 pb-16 mx-auto sm:px-6">
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <span className="block mb-3 text-5xl">🔍</span>
                <p className="text-lg font-bold text-slate-400">No games found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filtered.map((game, i) => {
                  const cfg = categoryConfig[game.category] ?? {
                    label: game.category,
                    emoji: '🎯',
                    color: '#888',
                    bg: '#f5f5f5',
                    tw: 'bg-gray-100 text-gray-500'
                  }
                  const isHovered = hoveredSlug === game.slug
                  return (
                    <a
                      key={game.slug}
                      href={game.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mg-card mg-fade-up group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white no-underline shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                      style={{
                        animationDelay: `${i * 35}ms`,
                        border: `2px solid ${isHovered ? cfg.color : 'transparent'}`
                      }}
                      onMouseEnter={() => setHoveredSlug(game.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full overflow-hidden mg-thumb bg-slate-100">
                        {game.cover ? (
                          <img
                            className="object-cover w-full h-full mg-card-img"
                            src={game.cover}
                            alt={game.title}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="flex items-center justify-center w-full h-full text-5xl"
                            style={{ background: cfg.bg }}
                          >
                            {cfg.emoji}
                          </div>
                        )}

                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center mg-play-wrap">
                          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg mg-play-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M5 3l14 9-14 9V3z" fill={cfg.color} />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-1 flex-col gap-1.5 p-3">
                        <p className="line-clamp-2 text-[13px] font-extrabold leading-snug text-slate-800">
                          {game.title}
                        </p>
                        <span
                          className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${cfg.tw}`}
                        >
                          {cfg.emoji} {cfg.label}
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </LayoutAdmin>
    </>
  )
}
