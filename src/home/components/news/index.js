import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Gift, GraduationCap, LayoutGrid, Newspaper, Zap } from 'lucide-react'
import NewsCard, { CARD_TEXTS, categoryOf, newsApi } from './NewsCard'

const TEXTS = {
  uz: {
    badge: 'So‘nggi yangiliklar',
    title: 'IQmath',
    accent: 'yangiliklari',
    subtitle: 'Platformadagi yangilanishlar, aksiyalar va muhim e’lonlar — hammasi bir joyda.',
    all: 'Barchasi',
    empty: 'Bu bo‘limda hozircha yangilik yo‘q'
  },
  ru: {
    badge: 'Последние новости',
    title: 'Новости',
    accent: 'IQmath',
    subtitle: 'Обновления платформы, акции и важные объявления — всё в одном месте.',
    all: 'Все',
    empty: 'В этом разделе пока нет новостей'
  }
}

const FILTERS = [
  { key: 'all', Icon: LayoutGrid },
  { key: 'news', Icon: Newspaper },
  { key: 'update', Icon: Zap },
  { key: 'announce', Icon: Gift },
  { key: 'article', Icon: GraduationCap }
]

/** "Yangiliklar" sahifasi: sarlavha, toifa filtrlari va barcha yangiliklar */
const NewsAll = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const [filter, setFilter] = useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['data-news'],
    queryFn: newsApi.getAll,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })
  const news = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // Faqat yangiligi bor toifalar filtrda ko'rinadi
  const filters = useMemo(() => {
    const keys = new Set(news.map((item) => categoryOf(item).key))
    return FILTERS.filter(({ key }) => key === 'all' || keys.has(key))
  }, [news])

  const visible = filter === 'all' ? news : news.filter((item) => categoryOf(item).key === filter)
  const open = (id) => router.push(`/news/${id}`)

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-[#F8FAFE] pb-16 pt-10 md:pt-14">
      <span className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/80 blur-3xl" />
      <span className="pointer-events-none absolute -right-40 top-60 h-[420px] w-[420px] rounded-full bg-[#F3EEFF]/70 blur-3xl" />

      <div className="relative mx-auto max-w-[1320px] px-4">
        {/* Sarlavha */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
            <Zap size={16} className="fill-[#1D6BFF] text-[#1D6BFF]" />
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
        {filters.length > 2 ? (
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible">
            {filters.map(({ key, Icon }) => {
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
                  {key === 'all' ? text.all : CARD_TEXTS[lang][key]}
                </button>
              )
            })}
          </div>
        ) : null}

        {/* Yangiliklar */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [1, 2, 3].map((i) => <div key={i} className="h-[460px] animate-pulse rounded-[26px] bg-[#EEF2F8]" />)
            : null}

          {!isLoading && !visible.length ? (
            <p className="col-span-full py-10 text-center text-[#64748B]">{text.empty}</p>
          ) : null}

          {visible.map((item) => (
            <NewsCard key={item.id} item={item} lang={lang} onOpen={open} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsAll
