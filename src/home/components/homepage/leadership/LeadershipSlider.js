import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const leadershipApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/mobile/mathematicians/')
    return data
  },
  getDetail: async (id) => {
    const { data } = await request.get(`/api/v1/management/mobile/mathematicians/${id}/`)
    return data
  }
}

// API'da kasb maydoni yo'q — ma'lum olimlar uchun nomiga qarab ko'rsatiladi
const PROFESSIONS = [
  { match: /beruni|бируни/i, uz: 'Astronom · Matematik · Geograf', ru: 'Астроном · Математик · Географ' },
  { match: /xorazm|хорезм/i, uz: 'Matematik · Astronom · Geograf', ru: 'Математик · Астроном · Географ' },
  { match: /pifagor|пифагор/i, uz: 'Faylasuf · Matematik', ru: 'Философ · Математик' },
  { match: /arximed|архимед/i, uz: 'Matematik · Fizik · Muhandis', ru: 'Математик · Физик · Инженер' },
  { match: /nyuton|ньютон/i, uz: 'Fizik · Matematik · Astronom', ru: 'Физик · Математик · Астроном' },
  { match: /eyler|эйлер/i, uz: 'Matematik · Fizik', ru: 'Математик · Физик' },
  { match: /gauss|гаусс/i, uz: 'Matematik · Fizik · Astronom', ru: 'Математик · Физик · Астроном' },
  { match: /ulug.?bek|улугбек/i, uz: 'Astronom · Matematik', ru: 'Астроном · Математик' }
]

const AUTOPLAY_MS = 6000

const LeadershipSlider = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(null)

  const { data } = useQuery({
    queryKey: ['data-leadership'],
    queryFn: leadershipApi.getAll,
    refetchOnWindowFocus: false
  })
  const scientists = Array.isArray(data) ? data : []
  const count = scientists.length

  const { data: detailData } = useQuery({
    queryKey: ['data-leadership-detail', selected?.id],
    queryFn: () => leadershipApi.getDetail(selected.id),
    enabled: !!selected,
    refetchOnWindowFocus: false
  })

  // Avtomatik aylanish (sichqoncha ustida yoki oyna ochiq bo'lsa to'xtaydi)
  useEffect(() => {
    if (count < 2 || paused || selected) return undefined
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [count, index, paused, selected])

  if (!count) {
    return <div className="mx-auto h-[330px] max-w-[880px] animate-pulse rounded-[28px] bg-[#EEF2F8]" />
  }

  const at = (offset) => scientists[(index + offset + count) % count]
  const title = (s) => (lang === 'ru' ? s?.title_ru || s?.title_uz : s?.title_uz) || ''
  const subtitle = (s) => (lang === 'ru' ? s?.subtitle_ru || s?.subtitle_uz : s?.subtitle_uz) || ''
  const years = (s) => (lang === 'ru' ? s?.life_years_ru || s?.life_years_uz : s?.life_years_uz) || ''
  const profession = (s) => PROFESSIONS.find((p) => p.match.test(`${s?.title_uz} ${s?.title_ru}`))?.[lang]

  const go = (next) => setIndex((next + count) % count)
  const current = at(0)

  /** Yon tomondagi xira karta (bosilsa o'sha olimga o'tadi) */
  const SideCard = ({ scientist, side }) => (
    <button
      type="button"
      onClick={() => go(index + (side === 'left' ? -1 : 1))}
      className={`absolute top-1/2 hidden w-[360px] items-center gap-5 rounded-[26px] border border-[#EEF1F6] bg-white/80 p-4 text-left opacity-60 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.5)] transition hover:opacity-80 lg:flex xl:w-[440px] ${
        side === 'left'
          ? 'right-[calc(50%+370px)] [transform:translateY(-50%)_perspective(900px)_rotateY(10deg)]'
          : 'left-[calc(50%+370px)] [transform:translateY(-50%)_perspective(900px)_rotateY(-10deg)]'
      }`}
    >
      <img
        src={scientist.image}
        alt={title(scientist)}
        loading="lazy"
        className="h-[220px] w-[140px] shrink-0 rounded-[18px] xl:h-[250px] xl:w-[160px] object-cover object-top grayscale-[35%]"
      />
      <span className="min-w-0">
        <span className="block text-[20px] font-extrabold leading-tight text-[#334155] xl:text-[24px]">{title(scientist)}</span>
        <span className="mt-1 flex items-center gap-1.5 text-[14px] text-[#64748B]">
          <CalendarDays size={15} />
          {years(scientist)}
        </span>
        <span className="mt-3 line-clamp-3 block text-[14px] leading-relaxed text-[#64748B]">{subtitle(scientist)}</span>
        <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#93B4FA] px-4 py-2.5 text-[13px] font-semibold text-white">
          {t('leadership.more')}
          <ArrowRight size={15} />
        </span>
      </span>
    </button>
  )

  const NavButton = ({ direction }) => (
    <button
      type="button"
      onClick={() => go(index + (direction === 'prev' ? -1 : 1))}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0B1B3F] shadow-[0_10px_28px_-10px_rgba(15,23,42,0.35)] transition hover:bg-[#1D6BFF] hover:text-white sm:h-14 sm:w-14"
    >
      {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  )

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative flex items-center justify-center lg:min-h-[360px]">
        {count > 2 ? <SideCard scientist={at(-1)} side="left" /> : null}
        {count > 1 ? <SideCard scientist={at(1)} side="right" /> : null}

        {/* Strelkalar (kompyuterda yon kartalar ustida) */}
        <div className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:left-[2%]">
          <NavButton direction="prev" />
        </div>
        <div className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:right-[2%]">
          <NavButton direction="next" />
        </div>

        {/* Markaziy karta */}
        <div
          key={current.id}
          className="relative z-10 grid w-full max-w-[780px] animate-[leaderFade_.45s_ease-out] grid-cols-1 gap-6 rounded-[28px] border border-[#E6EBF5] bg-gradient-to-br from-white via-white to-[#F6F2FF] p-4 shadow-[0_34px_70px_-40px_rgba(37,99,235,0.45)] sm:p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-8"
        >
          <img
            src={current.image}
            alt={title(current)}
            className="h-[280px] w-full rounded-[20px] object-cover object-top sm:h-[320px]"
          />
          <div className="px-1 pb-2 md:px-0 md:pb-0 md:pr-4">
            {profession(current) ? (
              <span className="inline-flex rounded-full bg-[#EEF2FF] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#475569]">
                {profession(current)}
              </span>
            ) : null}
            <h3 className="mt-3 text-[28px] font-extrabold leading-tight text-[#0B1B3F] sm:text-[34px]">
              {title(current)}
            </h3>
            <p className="mt-3 flex items-center gap-2.5 text-[16px] font-medium text-[#0B1B3F]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F4F9]">
                <CalendarDays size={16} />
              </span>
              {years(current)}
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">{subtitle(current)}</p>
            <button
              type="button"
              onClick={() => setSelected(current)}
              className="mt-6 inline-flex h-12 items-center gap-2.5 rounded-xl bg-[#1D6BFF] px-5 text-[15px] font-semibold text-white shadow-[0_14px_26px_-14px_rgba(29,107,255,0.9)] transition hover:bg-[#1557D6]"
            >
              {t('leadership.more')}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Sahifalash: telefonda strelkalar ham shu yerda */}
      <div className="mt-7 flex items-center justify-center gap-3">
        <div className="lg:hidden">
          <NavButton direction="prev" />
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {scientists.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={title(s)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-semibold transition sm:h-11 sm:w-11 ${
                i === index
                  ? 'bg-[#1D6BFF] text-white shadow-[0_10px_22px_-10px_rgba(29,107,255,0.9)]'
                  : 'border border-[#E6EBF5] bg-white text-[#0B1B3F] hover:border-[#BFD3FF]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="lg:hidden">
          <NavButton direction="next" />
        </div>
      </div>

      {/* Batafsil ma'lumot oynasi */}
      {selected && detailData ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1B3F]/50 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <MathJaxContext config={mathJaxConfig}>
            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EEF1F6] bg-white px-6 py-4">
                <h2 className="text-xl font-bold text-[#0B1B3F] md:text-2xl">{t('leadership.modalTitle')}</h2>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full p-2 transition hover:bg-[#F1F4F9]"
                >
                  <X className="h-5 w-5 text-[#475569] md:h-6 md:w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6 flex flex-col gap-6 md:flex-row">
                  <img
                    src={detailData.image}
                    alt={title(detailData)}
                    className="mx-auto h-[280px] w-full max-w-[240px] rounded-[20px] object-cover object-top md:mx-0"
                  />
                  <div className="flex-1 space-y-3">
                    {profession(detailData) ? (
                      <span className="inline-flex rounded-full bg-[#EEF2FF] px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#475569]">
                        {profession(detailData)}
                      </span>
                    ) : null}
                    <h3 className="text-2xl font-extrabold text-[#0B1B3F] md:text-3xl">{title(detailData)}</h3>
                    <p className="text-[16px] leading-relaxed text-[#334155]">{subtitle(detailData)}</p>
                    <div className="rounded-2xl bg-[#F5F8FF] p-4">
                      <p className="mb-1 text-sm text-[#64748B]">{t('leadership.periodLabel')}</p>
                      <p className="text-xl font-bold text-[#0B1B3F]">{years(detailData)}</p>
                    </div>
                  </div>
                </div>
                <h4 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#0B1B3F]">
                  <span className="h-6 w-1 rounded bg-[#1D6BFF]" /> {t('leadership.bioTitle')}
                </h4>
                <MathJax dynamic className="leading-relaxed text-[#334155]">
                  {lang === 'ru' ? detailData.description_ru : detailData.description_uz}
                </MathJax>
              </div>
              <div className="sticky bottom-0 border-t border-[#EEF1F6] bg-white p-5">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="h-12 w-full rounded-xl bg-[#1D6BFF] font-semibold text-white transition hover:bg-[#1557D6]"
                >
                  {t('leadership.close')}
                </button>
              </div>
            </div>
          </MathJaxContext>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes leaderFade {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default LeadershipSlider

// mathjax.config.js
export const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [['$$', '$$']]
  }
}
