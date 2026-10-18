import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { create } from 'zustand'

/**
 * Kirish oynasidagi maskot (talaba shapkali boyo'g'li) holati.
 * Maydonlar (InputPhone, InputPassword) shu yerga yozadi:
 *  - idle   — joyida turadi, ko'zlari sichqoncha kursoriga qarab aylanadi, vaqti-vaqti bilan ko'z qisadi
 *  - look   — telefon yozilmoqda, to'xtaydi va ko'zlari maydonga qaraydi (lookX: 0..1)
 *  - hide   — parol yozilmoqda, qanotlari bilan ko'zini yopadi
 *  - peek   — parol ko'rsatilgan, bir qanoti tushib bir ko'zi bilan "mo'ralaydi"
 */
export const useAuthMascot = create((set) => ({
  mode: 'idle',
  lookX: 0.5,
  target: null, // ko'zlar qaraydigan maydon (DOM element)
  setMode: (mode) => set({ mode }),
  look: (lookX, target) =>
    set((state) => ({ mode: 'look', lookX: Math.max(0, Math.min(1, lookX)), target: target || state.target })),
  reset: () => set({ mode: 'idle', lookX: 0.5, target: null })
}))

const EASE = 'cubic-bezier(.34,1.56,.64,1)' // biroz "sakrovchi" harakat
const MAX_GAZE = 7 // qorachiq ko'z markazidan eng ko'pi necha birlik siljiydi

// Bosganda chiqadigan gaplar (navbat bilan)
const PHRASES = {
  uz: [
    'Salom! Men iQ-boyo‘g‘liman 🦉',
    'Bugun nimani o‘rganamiz? 🤔',
    'Matematika — aql gimnastikasi! 💪',
    'Parolingizni hech kimga aytmang 🤫',
    'Har kuni 15 daqiqa — katta natija! 🚀',
    '2 + 2 = 4. Buni bilardingiz-a? 😄',
    'Qitiqlamang! 🙈',
    'Kiring, darslar sizni kutmoqda! 📚',
    'Xato qilishdan qo‘rqmang — shunday o‘rganamiz ✨'
  ],
  ru: [
    'Привет! Я iQ-совёнок 🦉',
    'Что будем изучать сегодня? 🤔',
    'Математика — гимнастика для ума! 💪',
    'Никому не говорите свой пароль 🤫',
    '15 минут в день — большой результат! 🚀',
    '2 + 2 = 4. Вы же знали? 😄',
    'Не щекочите! 🙈',
    'Входите, уроки ждут вас! 📚',
    'Не бойтесь ошибок — так мы и учимся ✨'
  ]
}

// Qanot holatlari (yelka atrofida; qiymatlar ko'z markaziga mos hisoblangan)
const WINGS = {
  rest: { left: 'translate(0px,0px) rotate(0deg) scale(1)', right: 'translate(0px,0px) rotate(0deg) scale(1)' },
  hide: {
    left: 'translate(1px,-2px) rotate(-130deg) scale(1.18)',
    right: 'translate(-1px,-2px) rotate(130deg) scale(1.18)'
  },
  peek: {
    left: 'translate(1px,-2px) rotate(-130deg) scale(1.18)',
    right: 'translate(0px,2px) rotate(95deg) scale(1.08)' // ko'z ostiga tushgan — mo'ralayapti
  }
}

/** Ko'z: oq gavhar, qorachiq, qovoq (ko'z qisish/yopish) va quvnoq yoy */
const Eye = ({ x, pupilBase, gaze, closed, happy }) => (
  <g transform={`translate(${x}, -24)`}>
    <circle r="22.5" fill="#E2EEFF" />
    <circle r="21.5" fill="#FFFFFF" />
    <g style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)`, transition: 'transform .25s ease-out' }}>
      <circle cx={pupilBase} cy="1" r="12" fill="#0D1B2A" />
      <circle cx={pupilBase - 4.5} cy="-3.5" r="3.4" fill="#FFFFFF" />
      <circle cx={pupilBase + 3} cy="4.5" r="1.3" fill="#FFFFFF" opacity="0.65" />
    </g>
    {/* Qovoq */}
    <g style={{ opacity: closed ? 1 : 0, transition: 'opacity .08s' }}>
      <circle r="21.8" fill="#2E78F6" />
      <path d="M-14,2 Q0,11 14,2" fill="none" stroke="#0D1B2A" strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* Quvnoq ko'z */}
    <g style={{ opacity: happy ? 1 : 0, transition: 'opacity .12s' }}>
      <circle r="21.8" fill="#FFFFFF" />
      <path d="M-11,3 Q0,-10 11,3" fill="none" stroke="#0D1B2A" strokeWidth="3.8" strokeLinecap="round" />
    </g>
  </g>
)

/** Qanot (yelkadan osilib turadi); `side` = -1 chap, 1 o'ng */
const Wing = ({ side }) => (
  <g transform={`translate(${side === -1 ? 65 : 175}, 132)`}>
    <path
      d={
        side === -1
          ? 'M 4,-10 C -16,-6 -24,22 -15,49 C -11,60 -2,64 5,56 C 13,46 15,14 4,-10 Z'
          : 'M -4,-10 C 16,-6 24,22 15,49 C 11,60 2,64 -5,56 C -13,46 -15,14 -4,-10 Z'
      }
      fill="url(#iqowl-wing)"
    />
    <path
      d={side === -1 ? 'M -16,24 Q -3,29 9,23' : 'M 16,24 Q 3,29 -9,23'}
      fill="none"
      stroke="#60A5FA"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d={side === -1 ? 'M -15,38 Q -3,43 7,37' : 'M 15,38 Q 3,43 -7,37'}
      fill="none"
      stroke="#60A5FA"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </g>
)

/** iQmath maskoti — talaba shapkasidagi ko'k boyo'g'li */
export default function AuthMascot({ width = 220, className = '' }) {
  const { i18n } = useTranslation()
  const { mode, lookX, target } = useAuthMascot()
  const [blink, setBlink] = useState(false)

  // Qorachiqlar yo'nalishi: bo'sh turganda — sichqoncha, telefon yozilganda — maydon
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const svgRef = useRef(null)

  // Bosganda: sakrash, quvnoq ko'z va gap pufakchasi
  const [hopKey, setHopKey] = useState(0)
  const [happy, setHappy] = useState(false)
  const [bubble, setBubble] = useState(null)
  const phraseIndex = useRef(Math.floor(Math.random() * PHRASES.uz.length))
  const bubbleTimer = useRef(null)
  const happyTimer = useRef(null)

  // Oyna yopilganda holat tozalanadi
  useEffect(
    () => () => {
      useAuthMascot.getState().reset()
      clearTimeout(bubbleTimer.current)
      clearTimeout(happyTimer.current)
    },
    []
  )

  // Har 3–5 soniyada ko'z qisadi
  useEffect(() => {
    if (mode === 'hide') return undefined
    let timer
    const schedule = () => {
      timer = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        schedule()
      }, 3000 + Math.random() * 2000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [mode])

  // Ekrandagi nuqtaga qarab qorachiq siljishi (yaqin nuqtaga kamroq, uzoqqa to'liq)
  const gazeAt = (px, py) => {
    const svg = svgRef.current
    if (!svg) return
    const o = svg.getBoundingClientRect()
    const dx = px - (o.left + o.width / 2)
    const dy = py - (o.top + o.height * (116 / 235))
    const len = Math.hypot(dx, dy) || 1
    const k = Math.min(1, len / 160) * MAX_GAZE
    setGaze({ x: (dx / len) * k, y: (dy / len) * k })
  }

  // Bo'sh turganda ko'zlar sichqoncha kursoriga qarab aylanadi
  useEffect(() => {
    if (mode !== 'idle') return undefined
    let frame = 0
    const onMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => gazeAt(event.clientX, event.clientY))
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [mode])

  // Telefon yozilganda ko'zlar maydonga (kursor turgan joyga) qaraydi
  useEffect(() => {
    if (mode !== 'look' || !target?.getBoundingClientRect) return
    const f = target.getBoundingClientRect()
    // Kursor taxminiy o'rni: maydon chapidan yozilgan matn uzunligi bo'yicha
    gazeAt(f.left + Math.min(f.width - 12, 12 + lookX * 150), f.top + f.height / 2)
  }, [mode, lookX, target])

  const onPoke = () => {
    const list = PHRASES[i18n.language === 'ru' ? 'ru' : 'uz']
    phraseIndex.current = (phraseIndex.current + 1) % list.length
    setBubble({ id: Date.now(), text: list[phraseIndex.current] })
    setHopKey((key) => key + 1)
    clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setBubble(null), 3500)
    if (mode === 'idle' || mode === 'look') {
      setHappy(true)
      clearTimeout(happyTimer.current)
      happyTimer.current = setTimeout(() => setHappy(false), 1100)
    }
  }

  const wings = WINGS[mode === 'hide' || mode === 'peek' ? mode : 'rest']
  const eyeGaze = mode === 'idle' || mode === 'look' ? gaze : { x: 0, y: 0 }
  const leftClosed = blink || mode === 'hide' || mode === 'peek'
  const rightClosed = blink || mode === 'hide'
  const isHappy = happy && !leftClosed

  return (
    <div className={`relative ${className}`}>
      <style>{`
        @keyframes iqowl-hop { 0% { transform: translateY(0) } 35% { transform: translateY(-22px) scaleY(1.04) } 65% { transform: translateY(0) scaleY(.94) } 100% { transform: translateY(0) } }
        @keyframes iqowl-breathe { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.018) } }
        @keyframes iqowl-tassel { 0%,100% { transform: rotate(-9deg) } 50% { transform: rotate(9deg) } }
        @keyframes iqowl-bubble { 0% { opacity: 0; transform: translate(-50%, 8px) scale(.8) } 100% { opacity: 1; transform: translate(-50%, 0) scale(1) } }
        .iqowl-hop { animation: iqowl-hop .5s ease-out; }
        .iqowl-breathe { animation: iqowl-breathe 3.2s ease-in-out infinite; transform-origin: 50% 95%; }
        .iqowl-tassel { animation: iqowl-tassel 2.6s ease-in-out infinite; transform-origin: 83px 71px; }
        .iqowl-bubble { animation: iqowl-bubble .25s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .iqowl-hop, .iqowl-breathe, .iqowl-tassel { animation: none; }
        }
      `}</style>

      {/* Gap pufakchasi */}
      {bubble ? (
        <div
          key={bubble.id}
          role="status"
          className="iqowl-bubble pointer-events-none absolute left-1/2 z-10 w-max max-w-[220px] rounded-2xl bg-white px-3.5 py-2 text-center text-[13px] font-semibold leading-snug text-[#0B1B3F] shadow-[0_12px_28px_-12px_rgba(15,23,42,0.45)]"
          style={{ bottom: 'calc(100% - 30px)' }}
        >
          {bubble.text}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={onPoke}
        aria-label={i18n.language === 'ru' ? 'Нажмите на совёнка' : 'Boyo‘g‘lini bosing'}
        className="block cursor-pointer rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
      >
        <div key={hopKey} className={hopKey ? 'iqowl-hop' : undefined}>
          <div className="iqowl-breathe">
            <svg
              ref={svgRef}
              viewBox="0 0 240 235"
              width={width}
              height={(width * 235) / 240}
              aria-hidden="true"
              style={{ overflow: 'visible', display: 'block' }}
            >
              <defs>
                <linearGradient id="iqowl-body" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="55%" stopColor="#2E78F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="iqowl-wing" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D58D6" />
                </linearGradient>
                <linearGradient id="iqowl-cap-top" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="55%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="iqowl-cap-skull" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0F172A" />
                  <stop offset="50%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="iqowl-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <filter id="iqowl-part-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F1E36" floodOpacity="0.18" />
                </filter>
                <filter id="iqowl-cap-shadow" x="-25%" y="-25%" width="150%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.28" />
                </filter>
              </defs>

              {/* Yer soyasi */}
              <ellipse cx="120" cy="222" rx="54" ry="6.5" fill="#B6C9E8" opacity="0.78" />

              <g transform="translate(120, 140)">
                {/* Oyoqlar */}
                <g transform="translate(0, 65)">
                  <g>
                    <rect x="-26" y="-4" width="6.5" height="18" rx="3.25" transform="rotate(20 -23 4)" fill="#F59E0B" />
                    <rect x="-14" y="-3" width="6.5" height="18" rx="3.25" transform="rotate(4 -11 5)" fill="#F59E0B" />
                  </g>
                  <g>
                    <rect x="7.5" y="-3" width="6.5" height="18" rx="3.25" transform="rotate(-4 11 5)" fill="#F59E0B" />
                    <rect x="19.5" y="-4" width="6.5" height="18" rx="3.25" transform="rotate(-20 23 4)" fill="#F59E0B" />
                  </g>
                </g>

                {/* Quloq patlari */}
                <polygon points="-52,-46 -58,-85 -22,-64" fill="#2563EB" />
                <polygon points="-48,-48 -54,-78 -28,-63" fill="#1D4ED8" opacity="0.45" />
                <polygon points="52,-46 58,-85 22,-64" fill="#2563EB" />
                <polygon points="48,-48 54,-78 28,-63" fill="#1D4ED8" opacity="0.45" />

                {/* Tana */}
                <ellipse cx="0" cy="-2" rx="65" ry="70" fill="url(#iqowl-body)" />
                <ellipse cx="0" cy="-44" rx="42" ry="20" fill="#60A5FA" opacity="0.16" />

                {/* Qorin va patlar */}
                <path d="M-35,28 C-35,-2 35,-2 35,28 C35,54 20,67 0,67 C-20,67 -35,54 -35,28 Z" fill="#DCEBFF" />
                <path d="M-19,25 Q-11,32 -3,25" fill="none" stroke="#93C5FD" strokeWidth="3.6" strokeLinecap="round" />
                <path d="M3,25 Q11,32 19,25" fill="none" stroke="#93C5FD" strokeWidth="3.6" strokeLinecap="round" />
                <path d="M-8,41 Q0,48 8,41" fill="none" stroke="#93C5FD" strokeWidth="3.6" strokeLinecap="round" />

                {/* Ko'zoynak ko'prigi */}
                <path d="M-10,-25 Q0,-33 10,-25" fill="none" stroke="#93C5FD" strokeWidth="3.8" strokeLinecap="round" />

                {/* Ko'zlar */}
                <Eye x={-28} pupilBase={2} gaze={eyeGaze} closed={leftClosed} happy={isHappy} />
                <Eye x={28} pupilBase={-2} gaze={eyeGaze} closed={rightClosed} happy={isHappy} />

                {/* Tumshuq */}
                <g transform="translate(0, -3)">
                  <polygon
                    points="-11,0 11,0 0,19"
                    fill="#F59E0B"
                    stroke="#E08E0B"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <polygon points="-6.5,2.5 6.5,2.5 0,14" fill="#FBBF24" />
                </g>

                {/* Talaba shapkasi */}
                <g transform="translate(0, -68)" filter="url(#iqowl-cap-shadow)">
                  <path d="M-34,4 C-34,-12 34,-12 34,4 C22,0 -22,0 -34,4 Z" fill="url(#iqowl-cap-skull)" />
                  <path d="M-34,4 Q0,-2 34,4" fill="none" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
                  <polygon points="-58,-7 0,9 58,-7 58,-4 0,13 -58,-4" fill="#334155" />
                  <polygon points="-58,-7 0,9 0,13 -58,-4" fill="#475569" />
                  <polygon
                    points="0,-24 58,-7 0,9 -58,-7"
                    fill="url(#iqowl-cap-top)"
                    stroke="#475569"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="0,-19 44,-7 0,5 -44,-7"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="0.7"
                    strokeOpacity="0.35"
                  />
                  <ellipse cx="0" cy="-7" rx="5" ry="2.6" fill="#D97706" />
                  <ellipse cx="0" cy="-8" rx="4.2" ry="2.1" fill="#FDE047" />
                  <path d="M-2,-7 Q-22,-6 -37,-1" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
                </g>
              </g>

              {/* Tebranuvchi popuk (osilish nuqtasi: 83, 71) */}
              <g className="iqowl-tassel">
                <g transform="translate(83, 71)">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
                  <rect x="-2.8" y="14" width="5.6" height="3" rx="1.2" fill="#D97706" />
                  <polygon points="-2.5,17 2.5,17 5.5,31 -5.5,31" fill="url(#iqowl-gold)" />
                  <line x1="-1.5" y1="21" x2="-2.5" y2="30" stroke="#FEF08A" strokeWidth="0.9" opacity="0.8" />
                  <line x1="1.5" y1="21" x2="2.5" y2="30" stroke="#B45309" strokeWidth="0.9" opacity="0.6" />
                </g>
              </g>

              {/* Qanotlar (eng ustida — ko'zni yopish uchun); yelkalar: (65,132) va (175,132) */}
              <g
                filter="url(#iqowl-part-shadow)"
                style={{ transform: wings.left, transformOrigin: '65px 132px', transition: `transform .5s ${EASE}` }}
              >
                <Wing side={-1} />
              </g>
              <g
                filter="url(#iqowl-part-shadow)"
                style={{ transform: wings.right, transformOrigin: '175px 132px', transition: `transform .5s ${EASE}` }}
              >
                <Wing side={1} />
              </g>
            </svg>
          </div>
        </div>
      </button>
    </div>
  )
}
