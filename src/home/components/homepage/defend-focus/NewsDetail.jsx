import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, CalendarDays, Gift, GraduationCap, Newspaper, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'

const newsApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/app/elon-list/')
    return data
  }
}

const TEXTS = {
  uz: {
    badge: 'So‘nggi yangiliklar',
    title: 'Yangiliklar',
    subtitle: 'IQmath olamidagi so‘nggi yangiliklar, yangilanishlar va muhim e’lonlar bilan doim xabardor bo‘lib turing.',
    all: 'Barcha yangiliklar',
    details: 'Batafsil',
    empty: 'Hozircha yangiliklar yo‘q',
    update: 'Yangilanish',
    announce: 'E’lon',
    article: 'Foydali maqola',
    news: 'Yangilik'
  },
  ru: {
    badge: 'Последние новости',
    title: 'Новости',
    subtitle: 'Будьте в курсе последних новостей, обновлений и важных объявлений IQmath.',
    all: 'Все новости',
    details: 'Подробнее',
    empty: 'Пока новостей нет',
    update: 'Обновление',
    announce: 'Объявление',
    article: 'Полезная статья',
    news: 'Новость'
  }
}

// API'da toifa maydoni yo'q — sarlavhaga qarab yorliq tanlanadi
const categoryOf = (news) => {
  const title = `${news.title_uz || ''} ${news.title_ru || ''}`.toLowerCase()
  if (/versiya|yangila|верси|обнов/.test(title)) return { key: 'update', Icon: Zap, color: '#1D6BFF', from: '#5B9BFF' }
  if (/bonus|chegirma|aksiya|sovg|бонус|скидк|акци|подар/.test(title)) return { key: 'announce', Icon: Gift, color: '#EA580C', from: '#FFAA4D' }
  if (/maqola|maslahat|qanday|стать|совет|как /.test(title)) return { key: 'article', Icon: GraduationCap, color: '#1D4ED8', from: '#5B9BFF' }
  return { key: 'news', Icon: Newspaper, color: '#1D6BFF', from: '#5B9BFF' }
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

          {news.map((item) => {
            const category = categoryOf(item)
            const title = lang === 'ru' ? item.title_ru || item.title_uz : item.title_uz
            const body = ((lang === 'ru' ? item.text_ru || item.text_uz : item.text_uz) || '').replace(/<[^>]+>/g, ' ')
            return (
              <article
                key={item.id}
                onClick={() => open(item.id)}
                className="group flex cursor-pointer flex-col rounded-[26px] border border-[#EDF1F7] bg-white p-3.5 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(37,99,235,0.45)]"
              >
                <div className="relative h-[220px] overflow-hidden rounded-[20px] bg-[#EEF2F8] sm:h-[240px]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    // Rasm yuklanmagan yangilik uchun zaxira fon
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF1FF] via-[#E3ECFF] to-[#F1EBFF]">
                      <span className="absolute left-10 top-14 h-14 w-14 rotate-12 rounded-2xl bg-white/60" />
                      <span className="absolute bottom-10 right-12 h-10 w-10 rounded-full bg-white/70" />
                      <span
                        className="relative flex h-24 w-24 items-center justify-center rounded-[28px] text-white"
                        style={{
                          background: `linear-gradient(145deg, ${category.from} 0%, ${category.color} 100%)`,
                          boxShadow: `0 20px 36px -16px ${category.color}, inset 0 -8px 14px rgba(0,0,0,0.12), inset 0 8px 12px rgba(255,255,255,0.35)`
                        }}
                      >
                        <category.Icon size={44} className="fill-current" />
                      </span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-bold text-[#0B1B3F] shadow-sm backdrop-blur">
                    <category.Icon size={16} style={{ color: category.color }} className="fill-current" />
                    {text[category.key]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-1 pt-5">
                  <h3 className="line-clamp-2 text-[20px] font-extrabold leading-snug text-[#0B1B3F]">{title}</h3>
                  <p
                    className="mb-5 mt-2.5 line-clamp-3 text-[15.5px] leading-relaxed text-[#64748B]"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EEF1F6] pt-4">
                    <span className="inline-flex items-center gap-2.5 text-[14px] text-[#475569]">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF3FF] text-[#1D6BFF]">
                        <CalendarDays size={17} />
                      </span>
                      {String(item.created_at || '').slice(0, 10)}
                    </span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        open(item.id)
                      }}
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1D6BFF] px-5 text-[15px] font-semibold text-white shadow-[0_12px_22px_-12px_rgba(29,107,255,0.9)] transition group-hover:bg-[#1557D6]"
                    >
                      {text.details}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomePage
