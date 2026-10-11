import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import {
  Brain,
  Calculator,
  Candy,
  Database,
  Gamepad2,
  GraduationCap,
  Grid3x3,
  LayoutGrid,
  Play,
  Puzzle,
  Target,
  Trophy
} from 'lucide-react'

import { openAuthWithReturn, closeAuthModal } from '@/home/components/auth/AuthGate'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { safekidSeeds } from '@/data/gamesData'

const TEXTS = {
  uz: {
    badge: 'O‘yin orqali rivojlanish',
    title: 'Aqliy',
    accent: 'o‘yinlar',
    subtitle: 'Tezkor fikrlash, xotira, diqqat va mantiqni rivojlantiruvchi o‘yinlar to‘plami.',
    play: 'O‘ynash',
    empty: 'Bu bo‘limda hozircha o‘yin yo‘q',
    filters: { all: 'Barchasi', logic: 'Mantiq', memory: 'Xotira', attention: 'Diqqat', math: 'Matematika', word: 'So‘zlar' }
  },
  ru: {
    badge: 'Развитие через игру',
    title: 'Интеллектуальные',
    accent: 'игры',
    subtitle: 'Коллекция игр для развития быстрого мышления, памяти, внимания и логики.',
    play: 'Играть',
    empty: 'В этом разделе пока нет игр',
    filters: { all: 'Все', logic: 'Логика', memory: 'Память', attention: 'Внимание', math: 'Математика', word: 'Слова' }
  }
}

// "Aa" belgisi (so'z o'yinlari uchun)
const WordIcon = ({ size = 18, className = '' }) => (
  <span className={`font-extrabold leading-none ${className}`} style={{ fontSize: size * 0.9 }}>
    Aa
  </span>
)

const FILTERS = [
  { key: 'all', Icon: LayoutGrid },
  { key: 'logic', Icon: Brain },
  { key: 'memory', Icon: Database },
  { key: 'attention', Icon: Target },
  { key: 'math', Icon: Calculator },
  { key: 'word', Icon: WordIcon }
]

const CATEGORY_ICONS = {
  action: Gamepad2,
  math: Calculator,
  word: WordIcon,
  puzzle: Puzzle,
  memory: Database,
  'match-3': Candy,
  board: Grid3x3,
  sports: Trophy,
  education: GraduationCap
}

// Har bir o'yin: qaysi filtrlarga tegishli va qisqa tavsifi (uz / ru)
const GAME_INFO = {
  'puzzle-math': {
    groups: ['math', 'logic'],
    uz: 'Mantiq, hisoblash va muammolarni yechish qobiliyatini oshiradi.',
    ru: 'Развивает логику, счёт и умение решать задачи.'
  },
  'word-sort': {
    groups: ['word'],
    uz: 'So‘z boyligini oshiruvchi va fikrlashni rivojlantiruvchi mini-o‘yin.',
    ru: 'Пополняет словарный запас и развивает мышление.'
  },
  'find-7-differences': {
    groups: ['attention', 'memory'],
    uz: 'Diqqat, xotira va kuzatuvchanlikni rivojlantiradi.',
    ru: 'Развивает внимание, память и наблюдательность.'
  },
  'puzzle-blocks-ancient': {
    groups: ['logic'],
    uz: 'Bloklarni joylashtirib, fazoviy tasavvurni charxlaydi.',
    ru: 'Тренирует пространственное мышление.'
  },
  'color-memory': {
    groups: ['memory'],
    uz: 'Ranglar ketma-ketligini eslab, xotirani mustahkamlaydi.',
    ru: 'Укрепляет память через последовательности цветов.'
  },
  'lollipops-match-3': {
    groups: ['attention'],
    uz: 'Bir xil shirinliklarni yig‘ib, diqqatni jamlashga o‘rgatadi.',
    ru: 'Учит концентрировать внимание.'
  },
  'word-cross': {
    groups: ['word'],
    uz: 'Krossvord orqali so‘z topish va imloni mustahkamlash.',
    ru: 'Кроссворд для поиска слов и закрепления орфографии.'
  },
  'where-is-the-ball': {
    groups: ['attention'],
    uz: 'To‘p qayerdaligini kuzatib, diqqatni oshiradi.',
    ru: 'Следите за шариком и тренируйте внимательность.'
  },
  'impossible-10': {
    groups: ['logic', 'math'],
    uz: 'Sonlarni birlashtirib, mantiqiy strategiya tuzishni o‘rgatadi.',
    ru: 'Учит строить логическую стратегию с числами.'
  },
  'halloween-word-search': {
    groups: ['word', 'attention'],
    uz: 'Harflar orasidan so‘zlarni topib, diqqatni charxlaydi.',
    ru: 'Поиск слов среди букв тренирует внимание.'
  },
  'math-up': {
    groups: ['math'],
    uz: 'Hisoblash tezligini oshiruvchi qiziqarli o‘yin.',
    ru: 'Увлекательная игра для скорости счёта.'
  },
  connector: {
    groups: ['logic'],
    uz: 'Nuqtalarni to‘g‘ri bog‘lab, mantiqiy fikrlashni rivojlantiradi.',
    ru: 'Соединяйте точки и развивайте логику.'
  },
  'shapes-airship': {
    groups: ['math'],
    uz: 'Geometrik shakllarni tanishga o‘rgatadigan ta’limiy o‘yin.',
    ru: 'Обучающая игра для изучения геометрических фигур.'
  },
  'word-frog': {
    groups: ['word'],
    uz: 'So‘z ma’nolarini topib, lug‘at boyligini oshiradi.',
    ru: 'Пополняет словарный запас через значения слов.'
  },
  'type-fast-words': {
    groups: ['word', 'attention'],
    uz: 'Tez va to‘g‘ri yozish ko‘nikmasini rivojlantiradi.',
    ru: 'Развивает навык быстрого и точного набора.'
  },
  'happy-halloween-memory': {
    groups: ['memory'],
    uz: 'Juft kartalarni topib, xotirani mustahkamlaydigan klassik o‘yin.',
    ru: 'Классическая игра на поиск пар для тренировки памяти.'
  },
  'master-checkers': {
    groups: ['logic'],
    uz: 'Shashka orqali strategik va mantiqiy fikrlashni o‘stiradi.',
    ru: 'Шашки развивают стратегическое мышление.'
  },
  'fishing-frenzy': {
    groups: ['attention'],
    uz: 'Tezkorlik va diqqatni rivojlantiruvchi qiziqarli mini-o‘yin.',
    ru: 'Развивает скорость реакции и внимание.'
  },
  'super-pongoal': {
    groups: ['attention'],
    uz: 'Reaksiya tezligi va aniqlikni oshiruvchi sport o‘yini.',
    ru: 'Спортивная игра на реакцию и точность.'
  },
  'animals-crush-match-3': {
    groups: ['attention'],
    uz: 'Hayvonlarni juftlab, diqqat va kuzatuvchanlikni oshiradi.',
    ru: 'Развивает внимание и наблюдательность.'
  }
}

const titleOf = (slug = '') => slug.replaceAll('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase())

export default function MentalGames() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const router = useRouter()
  const { data: session } = useSession()
  const [openAuth, setOpenAuth] = useState(false)
  const [filter, setFilter] = useState('all')

  const games = useMemo(
    () =>
      (safekidSeeds || []).map((g) => {
        const img = g.cover || g.image || null
        const info = GAME_INFO[g.slug] || {}
        return {
          ...g,
          title: g.title || titleOf(g.slug),
          cover: img ? (typeof img === 'string' ? img : img.src) : `/games/${g.slug}.png`,
          groups: info.groups || [],
          description: info[lang] || t('games.card.subtitle')
        }
      }),
    [lang, t]
  )

  const visible = filter === 'all' ? games : games.filter((g) => g.groups.includes(filter))

  const onPlay = (game) => {
    const returnUrl = `/mental-games/out?to=${encodeURIComponent(game.href)}`
    if (!session) {
      setOpenAuth(true)
      openAuthWithReturn(router, returnUrl, 'signUp')
      return
    }
    window.open(returnUrl, '_blank', 'noopener,noreferrer')
  }

  const onClose = () => {
    setOpenAuth(false)
    closeAuthModal?.(router)
  }

  const categoryLabel = (category) => {
    const label = t(`games.categories.${category}`, { defaultValue: category })
    return String(label || category).toUpperCase()
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-[#F8FAFE] pb-16 pt-10 md:pt-14">
        <span className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/80 blur-3xl" />
        <span className="pointer-events-none absolute -right-40 top-60 h-[420px] w-[420px] rounded-full bg-[#F3EEFF]/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-4">
          {/* Sarlavha */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
              <Gamepad2 size={18} className="text-[#1D6BFF]" />
              {text.badge}
            </span>
            <h1 className="mt-5 text-[36px] font-extrabold leading-[1.05] tracking-tight text-[#0B1B3F] sm:text-[48px] lg:text-[60px]">
              {text.title} <span className="text-[#1D6BFF]">{text.accent}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#64748B] sm:text-[19px]">
              {text.subtitle}
            </p>
          </div>

          {/* Filtrlar */}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible">
            {FILTERS.map(({ key, Icon }) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full px-6 text-[15px] font-semibold transition ${
                    active
                      ? 'bg-[#1D6BFF] text-white shadow-[0_14px_26px_-14px_rgba(29,107,255,0.9)]'
                      : 'bg-[#EEF2F8] text-[#0B1B3F] hover:bg-[#E3EAF6]'
                  }`}
                >
                  <Icon size={20} className={active ? 'text-white' : 'text-[#1D6BFF]'} />
                  {text.filters[key]}
                </button>
              )
            })}
          </div>

          {/* O'yinlar */}
          {visible.length === 0 ? (
            <p className="mt-12 text-center text-[#64748B]">{text.empty}</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((game) => {
                const CategoryIcon = CATEGORY_ICONS[game.category] || Gamepad2
                return (
                  <article
                    key={game.slug}
                    onClick={() => onPlay(game)}
                    className="group cursor-pointer rounded-[26px] border border-[#EDF1F7] bg-white p-3.5 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(37,99,235,0.45)]"
                  >
                    <div className="relative h-[180px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EAF1FF] to-[#F1EBFF] sm:h-[190px]">
                      <img
                        src={game.cover}
                        alt={game.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                        }}
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-[#0B1B3F] shadow-sm backdrop-blur">
                        <CategoryIcon size={16} className="text-[#1D6BFF]" />
                        {categoryLabel(game.category)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 px-2 pb-2 pt-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[20px] font-extrabold text-[#0B1B3F]">{game.title}</h3>
                        <p className="mt-1 line-clamp-2 text-[15px] leading-snug text-[#64748B]">{game.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onPlay(game)
                        }}
                        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#1D6BFF] px-5 text-[15px] font-semibold text-white shadow-[0_12px_22px_-12px_rgba(29,107,255,0.9)] transition group-hover:bg-[#1557D6]"
                      >
                        <Play size={17} className="fill-white" />
                        {text.play}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <AuthModal open={openAuth} onClose={onClose} title={t('auth')}>
        <Auth />
      </AuthModal>
    </>
  )
}
