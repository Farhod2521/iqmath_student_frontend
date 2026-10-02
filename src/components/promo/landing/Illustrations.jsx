// Landing uchun SVG illyustratsiyalar — istalgan o'lchamda tiniq ko'rinadi.
import { useId } from 'react'

// Har bir nusxa uchun barqaror va noyob gradient ID'lari
const useIds = (prefix) => {
  const base = useId().replace(/:/g, '')
  return (name) => `${prefix}-${name}-${base}`
}

/** Bir nechta ko'k kub (Matematika) */
export const CubesArt = ({ className = '' }) => {
  const id = useIds('cubes')
  const Cube = ({ x, y, s, o = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <polygon points="50,0 100,25 50,50 0,25" fill={`url(#${id('top')})`} />
      <polygon points="0,25 50,50 50,108 0,83" fill={`url(#${id('left')})`} />
      <polygon points="100,25 50,50 50,108 100,83" fill={`url(#${id('right')})`} />
      <polygon points="50,0 100,25 50,50 0,25" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
    </g>
  )
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('top')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BFDBFE" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id={id('left')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={id('right')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <ellipse cx="125" cy="200" rx="95" ry="12" fill="#1D4ED8" opacity=".12" />
      <Cube x={110} y={10} s={0.8} />
      <Cube x={40} y={70} s={1} />
      <Cube x={130} y={100} s={0.85} />
      {/* plyus belgisi */}
      <g transform="translate(190 40)">
        <rect x="-8" y="-26" width="16" height="52" rx="6" fill="#3B82F6" />
        <rect x="-26" y="-8" width="52" height="16" rx="6" fill="#60A5FA" />
      </g>
    </svg>
  )
}

/** Cheksizlik belgisi (Algebra) */
export const InfinityArt = ({ className = '' }) => {
  const id = useIds('inf')
  return (
    <svg viewBox="-10 -10 270 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('g')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C4B5FD" />
          <stop offset=".5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id={id('hl')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="185" rx="85" ry="10" fill="#6D28D9" opacity=".12" />
      <path
        d="M60 100c0-30 22-52 50-38 20 10 30 30 40 44 12 18 30 36 52 28 24-9 26-48 2-60-24-12-42 8-54 26-10 14-24 34-44 42-26 10-46-12-46-42z"
        fill="none"
        stroke={`url(#${id('g')})`}
        strokeWidth="34"
        strokeLinecap="round"
        transform="rotate(-18 120 100) translate(120 100) scale(0.82) translate(-120 -100)"
      />
      <path
        d="M60 100c0-30 22-52 50-38 20 10 30 30 40 44 12 18 30 36 52 28 24-9 26-48 2-60"
        fill="none"
        stroke={`url(#${id('hl')})`}
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(-18 120 100) translate(120 100) scale(0.82) translate(-124 -109)"
      />
    </svg>
  )
}

/** Piramida (Geometriya) */
export const PyramidArt = ({ className = '' }) => {
  const id = useIds('pyr')
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('l')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#93C5FD" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id={id('r')} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <ellipse cx="125" cy="200" rx="90" ry="12" fill="#1D4ED8" opacity=".14" />
      <polygon points="125,10 40,170 120,195" fill={`url(#${id('l')})`} />
      <polygon points="125,10 120,195 210,165" fill={`url(#${id('r')})`} />
      <polyline points="125,10 120,195" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" />
    </svg>
  )
}

/** Planshet + qalam (Qanday ishlaydi) */
export const ClipboardArt = ({ className = '' }) => {
  const id = useIds('clip')
  return (
    <svg viewBox="0 0 260 230" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('board')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DBEAFE" />
          <stop offset="1" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id={id('pen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <ellipse cx="140" cy="215" rx="100" ry="10" fill="#1D4ED8" opacity=".1" />
      <g transform="rotate(-10 140 110)">
        <rect x="70" y="30" width="140" height="175" rx="18" fill={`url(#${id('board')})`} />
        <rect x="82" y="44" width="116" height="150" rx="12" fill="#fff" opacity=".9" />
        <rect x="115" y="20" width="50" height="22" rx="8" fill="#F59E0B" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(96 ${66 + i * 38})`}>
            <circle cx="10" cy="10" r="10" fill={i === 0 ? '#3B82F6' : '#BFDBFE'} />
            <rect x="28" y="4" width="62" height="6" rx="3" fill="#BFDBFE" />
            <rect x="28" y="14" width="40" height="5" rx="2.5" fill="#DBEAFE" />
          </g>
        ))}
      </g>
      <g transform="rotate(38 200 130)">
        <rect x="180" y="40" width="22" height="150" rx="8" fill={`url(#${id('pen')})`} />
        <polygon points="180,190 202,190 191,214" fill="#FCD34D" />
        <rect x="180" y="52" width="22" height="10" fill="#93C5FD" />
      </g>
      <g transform="translate(28 50) rotate(-20)">
        <rect width="46" height="46" rx="12" fill="#A78BFA" opacity=".9" />
        <rect x="12" y="12" width="22" height="22" rx="6" fill="#EDE9FE" />
      </g>
    </svg>
  )
}

/** Kubok (Motivatsiya) */
export const TrophyArt = ({ className = '' }) => {
  const id = useIds('tr')
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('cup')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={id('base')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="186" rx="60" ry="8" fill="#1D4ED8" opacity=".14" />
      <path d="M58 40h84v40c0 30-20 50-42 50s-42-20-42-50z" fill={`url(#${id('cup')})`} />
      <path
        d="M58 52H38c0 26 12 38 26 40M142 52h20c0 26-12 38-26 40"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="88" y="128" width="24" height="22" fill="#F59E0B" />
      <rect x="64" y="148" width="72" height="30" rx="8" fill={`url(#${id('base')})`} />
      <path d="M100 62l7 14 15 2-11 10 3 15-14-7-14 7 3-15-11-10 15-2z" fill="#fff" opacity=".9" />
    </svg>
  )
}

/** Olmos (Yutuqlar) */
export const GemArt = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <polygon points="14,8 50,8 62,24 32,58 2,24" fill="#8B5CF6" />
    <polygon points="14,8 50,8 62,24 2,24" fill="#C4B5FD" />
    <polygon points="22,24 42,24 32,58" fill="#7C3AED" />
    <polygon points="14,8 22,24 2,24" fill="#DDD6FE" />
  </svg>
)

/** Olov (Seriya) */
export const FlameArt = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M32 4c4 12 18 18 18 34a18 18 0 01-36 0c0-8 4-14 8-18 0 8 4 12 8 12-4-10 0-20 2-28z" fill="#F97316" />
    <path d="M32 30c3 6 9 9 9 16a9 9 0 01-18 0c0-5 3-8 5-10 0 4 2 6 4 6-1-4 0-8 0-12z" fill="#FDE047" />
  </svg>
)

/** Telefon ekrani namunasi (Mobil ilova) */
export const PhoneMock = ({ variant = 0, className = '' }) => (
  <div
    className={`relative aspect-[9/19] w-full rounded-[28px] border-[6px] border-[#0F172A] bg-white shadow-[0_30px_60px_-25px_rgba(15,23,42,0.6)] ${className}`}
  >
    <div className="absolute left-1/2 top-1.5 h-3 w-16 -translate-x-1/2 rounded-full bg-[#0F172A]" />
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-[22px] bg-[#F5F8FF] p-3 pt-6">
      {variant === 0 ? (
        <>
          <div className="h-2 w-16 rounded bg-[#1E3A8A]" />
          {['#DBEAFE', '#EDE9FE', '#E0F2FE'].map((bg, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm">
              <span className="h-8 w-8 rounded-lg" style={{ background: bg }} />
              <span className="flex-1 space-y-1">
                <span className="block h-1.5 w-3/4 rounded bg-[#CBD5E1]" />
                <span className="block h-1.5 w-1/2 rounded bg-[#E2E8F0]" />
              </span>
            </div>
          ))}
        </>
      ) : variant === 1 ? (
        <>
          <div className="relative flex aspect-video items-center justify-center rounded-xl bg-[#0F172A]">
            <svg viewBox="0 0 100 60" className="absolute inset-2 opacity-70">
              <polygon points="20,50 50,10 80,50" fill="none" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <span className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#3B82F6] text-[10px] text-white">
              ▶
            </span>
          </div>
          <div className="h-2 w-20 rounded bg-[#1E3A8A]" />
          <div className="space-y-1.5 rounded-xl bg-white p-2 shadow-sm">
            {[80, 60, 70].map((w, i) => (
              <span key={i} className="block h-1.5 rounded bg-[#CBD5E1]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-2 w-14 rounded bg-[#1E3A8A]" />
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <svg viewBox="0 0 100 50" className="w-full">
              <path d="M2 45 Q25 40 35 25 T60 15 T98 5" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {['#DCFCE7', '#FEF3C7', '#DBEAFE', '#FCE7F3'].map((bg) => (
              <span key={bg} className="h-10 rounded-lg" style={{ background: bg }} />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
)
