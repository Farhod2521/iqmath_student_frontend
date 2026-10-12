import { useState } from 'react'
import { UZ_MAP_VIEWBOX, UZ_REGION_PATHS } from '../data/uzMapPaths'
import { CARD, CARD_TITLE, fmt } from '../utils'

// Ketma-ket (sequential) ko'k shkala: kam -> och, ko'p -> to'q
const SCALE = ['#E3EBFF', '#C2D3FF', '#93B0FF', '#628BFF', '#3A66F0', '#2448C4']
const EMPTY = '#EEF1F6'

const fillFor = (count, max) => {
  if (!count || !max) return EMPTY
  const idx = Math.min(SCALE.length - 1, Math.floor((count / max) * (SCALE.length - 1) + 0.0001))
  return SCALE[Math.max(0, idx)]
}

const RegionMap = ({ regions }) => {
  const [hover, setHover] = useState(null)
  const items = regions?.items || []
  const byKey = Object.fromEntries(items.map((r) => [r.key, r]))
  const max = Math.max(0, ...items.map((r) => r.count))
  const active = hover ? byKey[hover] : null
  const activeShape = hover ? UZ_REGION_PATHS[hover] : null
  const [, , vbW, vbH] = UZ_MAP_VIEWBOX.split(' ').map(Number)

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <h3 className={CARD_TITLE}>O'zbekiston bo'yicha tashriflar</h3>
        <span className="text-xs text-[#7C8FAC]">Jami: {fmt(regions?.total)}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative">
          <svg viewBox={UZ_MAP_VIEWBOX} className="w-full h-auto" role="img" aria-label="Viloyatlar kesimidagi tashriflar xaritasi">
            {Object.entries(UZ_REGION_PATHS).map(([key, shape]) => (
              <path
                key={key}
                d={shape.d}
                fill={fillFor(byKey[key]?.count, max)}
                stroke="#fff"
                strokeWidth={hover === key ? 3 : 1.5}
                strokeLinejoin="round"
                className="cursor-pointer transition-[filter] duration-150"
                style={hover === key ? { filter: 'brightness(0.9)' } : undefined}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
            {/* Toshkent shahri juda kichik — belgisi bilan ko'rsatamiz */}
            <circle
              cx={UZ_REGION_PATHS.toshkent_sh.cx}
              cy={UZ_REGION_PATHS.toshkent_sh.cy}
              r={9}
              fill={fillFor(byKey.toshkent_sh?.count, max)}
              stroke="#2448C4"
              strokeWidth={2}
              className="cursor-pointer"
              onMouseEnter={() => setHover('toshkent_sh')}
              onMouseLeave={() => setHover(null)}
            />
          </svg>

          {active && activeShape && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[115%] whitespace-nowrap rounded-lg bg-[#2A3547] px-3 py-2 text-xs text-white shadow-lg"
              style={{ left: `${(activeShape.cx / vbW) * 100}%`, top: `${(activeShape.cy / vbH) * 100}%` }}
            >
              <p className="font-semibold">{active.name}</p>
              <p>
                Tashriflar: {fmt(active.count)} ({active.percent}%)
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#7C8FAC]">
            <span>Kam</span>
            {SCALE.map((c) => (
              <span key={c} className="h-2 w-6 rounded-sm" style={{ background: c }} />
            ))}
            <span>Ko'p</span>
          </div>
        </div>

        <ol className="space-y-1.5">
          {items.map((r, i) => (
            <li
              key={r.key}
              className={`grid grid-cols-[20px_1fr_minmax(60px,1fr)_auto_44px] items-center gap-2 rounded-md px-1 py-0.5 text-sm ${
                hover === r.key ? 'bg-[#ECF2FF] dark:bg-[#253662]' : ''
              }`}
              onMouseEnter={() => setHover(r.key)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="text-xs text-[#7C8FAC]">{i + 1}</span>
              <span className="truncate text-[#2A3547] dark:text-white">{r.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-[#EEF1F6] dark:bg-[#2A3447]">
                <span className="block h-full rounded-full bg-[#4F7CFF]" style={{ width: `${max ? (r.count / max) * 100 : 0}%` }} />
              </span>
              <span className="text-right font-semibold text-[#2A3547] dark:text-white">{fmt(r.count)}</span>
              <span className="text-right text-xs text-[#7C8FAC]">{r.percent}%</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RegionMap
