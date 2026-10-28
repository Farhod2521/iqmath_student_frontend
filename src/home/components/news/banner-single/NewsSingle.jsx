import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { CARD_TEXTS, NewsCover, categoryOf, newsText, newsTitle } from '../NewsCard'

const TEXTS = {
  uz: { back: 'Barcha yangiliklar', notFound: 'Yangilik topilmadi' },
  ru: { back: 'Все новости', notFound: 'Новость не найдена' }
}

const Shell = ({ children }) => (
  <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-[#F8FAFE] pb-16 pt-8 md:pt-12">
    <span className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/80 blur-3xl" />
    <span className="pointer-events-none absolute -right-40 top-60 h-[420px] w-[420px] rounded-full bg-[#F3EEFF]/70 blur-3xl" />
    <div className="relative mx-auto max-w-[860px] px-4">{children}</div>
  </section>
)

const NewsSingle = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { id } = router.query
  const lang = i18n.language?.slice(0, 2) === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]

  // Yangilik ochiq ma'lumot: useGetQuery faqat login bo'lganda so'rov yuboradi,
  // shuning uchun mehmonlarda sahifa bo'sh qolardi — to'g'ridan-to'g'ri so'raymiz
  const { data, isLoading, isError } = useQuery(
    [KEYS.news, id],
    () => request.get(`${URLS.newsTotal}${id}/`).then((res) => res.data),
    { enabled: !!id, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false, retry: 1 }
  )

  const back = (
    <Link
      href="/news"
      className="inline-flex h-11 items-center gap-2 rounded-full bg-[#EEF2F8] px-5 text-[15px] font-semibold text-[#0B1B3F] transition hover:bg-[#E3EAF6]"
    >
      <ArrowLeft size={18} className="text-[#1D6BFF]" />
      {text.back}
    </Link>
  )

  if (!id || isLoading) {
    return (
      <Shell>
        {back}
        <div className="mt-6 h-[320px] animate-pulse rounded-[26px] bg-[#EEF2F8]" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded-xl bg-[#EEF2F8]" />
        <p className="sr-only">{t('loading')}</p>
      </Shell>
    )
  }

  if (isError || !data) {
    return (
      <Shell>
        {back}
        <p className="py-16 text-center text-[17px] text-[#64748B]">{text.notFound}</p>
      </Shell>
    )
  }

  const category = categoryOf(data)
  const title = newsTitle(data, lang)

  return (
    <Shell>
      {back}

      <article className="mt-6 rounded-[28px] border border-[#EDF1F7] bg-white p-3.5 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.5)]">
        <div className="relative h-[220px] overflow-hidden rounded-[22px] bg-[#EEF2F8] sm:h-[340px]">
          {data.image ? (
            <img src={data.image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <NewsCover category={category} iconSize={56} boxClass="h-28 w-28 rounded-[32px]" />
          )}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-bold text-[#0B1B3F] shadow-sm backdrop-blur">
            <category.Icon size={16} style={{ color: category.color }} className="fill-current" />
            {CARD_TEXTS[lang][category.key]}
          </span>
        </div>

        <div className="px-3 pb-4 pt-6 sm:px-6 sm:pb-6">
          <span className="inline-flex items-center gap-2.5 text-[14px] text-[#475569]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF3FF] text-[#1D6BFF]">
              <CalendarDays size={17} />
            </span>
            {String(data.created_at || '').slice(0, 10)}
          </span>

          <h1 className="mt-4 text-[28px] font-extrabold leading-tight tracking-tight text-[#0B1B3F] sm:text-[38px]">
            {title}
          </h1>

          {data.video ? (
            <video src={data.video} controls className="mt-6 w-full rounded-2xl" />
          ) : null}

          {/* To'liq matn (admin paneldan HTML) */}
          <div
            className="mt-5 text-[17px] leading-[1.8] text-[#334155] [&_a]:text-[#1D6BFF] [&_a]:underline [&_img]:my-4 [&_img]:rounded-2xl [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: newsText(data, lang) }}
          />
        </div>
      </article>
    </Shell>
  )
}

export default NewsSingle
