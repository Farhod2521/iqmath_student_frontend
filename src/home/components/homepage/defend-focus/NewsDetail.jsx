import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import NewsCard, { newsApi } from '@/home/components/news/NewsCard'

const TEXTS = {
  uz: {
    badge: 'So‘nggi yangiliklar',
    title: 'Yangiliklar',
    subtitle: 'IQmath olamidagi so‘nggi yangiliklar, yangilanishlar va muhim e’lonlar bilan doim xabardor bo‘lib turing.',
    all: 'Barcha yangiliklar',
    empty: 'Hozircha yangiliklar yo‘q'
  },
  ru: {
    badge: 'Последние новости',
    title: 'Новости',
    subtitle: 'Будьте в курсе последних новостей, обновлений и важных объявлений IQmath.',
    all: 'Все новости',
    empty: 'Пока новостей нет'
  }
}

const LIMIT = 3

/** Bosh sahifa: so'nggi yangiliklar (3 ta karta) */
const HomePage = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]

  const { data, isLoading } = useQuery({
    queryKey: ['data-news'],
    queryFn: newsApi.getAll,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 2
  })
  const news = (Array.isArray(data) ? data : []).slice(0, LIMIT)

  const open = (id) => router.push(`/news/${id}`)

  return (
    <section id="news-detail" className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-[#F8FAFE] py-14 md:py-20">
      <span className="pointer-events-none absolute -right-40 -top-24 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/80 blur-3xl" />

      <div className="relative mx-auto max-w-[1320px] px-4">
        {/* Sarlavha */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
              <Zap size={16} className="fill-[#1D6BFF] text-[#1D6BFF]" />
              {text.badge}
            </span>
            <h2 className="mt-4 text-[36px] font-extrabold leading-[1.05] tracking-tight text-[#0B1B3F] sm:text-[48px] lg:text-[58px]">
              {text.title}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#64748B] sm:text-[19px]">{text.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/news')}
            className="inline-flex h-12 w-fit shrink-0 items-center gap-2.5 rounded-full bg-[#1D6BFF] px-6 text-[15px] font-semibold text-white shadow-[0_14px_26px_-14px_rgba(29,107,255,0.9)] transition hover:bg-[#1557D6]"
          >
            {text.all}
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Kartalar */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [1, 2, 3].map((i) => <div key={i} className="h-[460px] animate-pulse rounded-[26px] bg-[#EEF2F8]" />)
            : null}

          {!isLoading && !news.length ? (
            <p className="col-span-full py-10 text-center text-[#64748B]">{text.empty}</p>
          ) : null}

          {news.map((item) => (
            <NewsCard key={item.id} item={item} lang={lang} onOpen={open} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
