import { useId } from 'react'

/** Premium obunachilar uchun oltin toj (ism oldida ko'rsatiladi) */
const PremiumCrown = ({ className = 'h-5 w-6', title }) => {
  const id = useId().replace(/:/g, '')
  const gold = `crown-gold-${id}`
  const band = `crown-band-${id}`
  const ball = `crown-ball-${id}`

  return (
    <svg viewBox="0 0 64 52" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE680" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#E08A00" />
        </linearGradient>
        <linearGradient id={band} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCD34D" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <radialGradient id={ball} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FFF7CC" />
          <stop offset="0.45" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* Toj tanasi: 5 ta uch, o'rtadagisi eng baland */}
      <path
        d="M8 43 L4 19 L16.5 29 L19 13 L26.5 27 L32 7 L37.5 27 L45 13 L47.5 29 L60 19 L56 43 Z"
        fill={`url(#${gold})`}
        stroke="#C2780A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Yaltirash */}
      <path d="M11 39 L8.5 24 L17 31 L20 20 L22 33 Z" fill="#FFF3B0" opacity="0.55" />

      {/* Uchlaridagi sharchalar */}
      {[
        [4, 18, 3.6],
        [19, 12, 3.8],
        [32, 6, 4.4],
        [45, 12, 3.8],
        [60, 18, 3.6]
      ].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill={`url(#${ball})`} stroke="#C2780A" strokeWidth="0.8" />
      ))}

      {/* Yulduz */}
      <path
        d="M32 24 L34.1 28.4 L38.9 29 L35.4 32.3 L36.3 37.1 L32 34.8 L27.7 37.1 L28.6 32.3 L25.1 29 L29.9 28.4 Z"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Pastki belbog' */}
      <rect x="6.5" y="41" width="51" height="8" rx="3.5" fill={`url(#${band})`} stroke="#C2780A" strokeWidth="1" />
      <rect x="10" y="42.6" width="30" height="1.8" rx="0.9" fill="#FFF3B0" opacity="0.6" />
    </svg>
  )
}

export default PremiumCrown
