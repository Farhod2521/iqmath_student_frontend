import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BarChart3, BookOpen, CheckCircle2, GraduationCap, Layers, PlayCircle, Sparkles, Target, Users } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import iqmathImg from '@/assets/images/about/iqmath.png'

const TEXTS = {
  uz: {
    students: "O'quvchilar",
    lessons: 'Video darslar',
    subjects: 'Asosiy fanlar',
    experience: 'Yillik tajriba',
    activeStudents: 'faol o‘quvchi',
    lessonsChip: 'video dars',
    detailsBadge: 'Batafsil',
    detailsTitle: 'Platforma haqida',
    detailsSub: 'IQmath qanday ishlaydi va o‘quvchiga nima beradi',
    benefitsTitle: 'Asosiy afzalliklar',
    benefits: [
      'Video darslar va bosqichma-bosqich tushuntirishlar',
      'Har bir mavzu bo‘yicha amaliy mashqlar',
      'Diagnostika va shaxsiy o‘quv yo‘li',
      'Imtihon va testlarga tayyorgarlik',
      'Natijalarni kuzatish — ota-onalar uchun ham',
      'O‘z tezligingizda o‘rganish imkoniyati'
    ]
  },
  ru: {
    students: 'Учеников',
    lessons: 'Видеоуроков',
    subjects: 'Основных предмета',
    experience: 'Года опыта',
    activeStudents: 'активных учеников',
    lessonsChip: 'видеоуроков',
    detailsBadge: 'Подробнее',
    detailsTitle: 'О платформе',
    detailsSub: 'Как работает IQmath и что он даёт ученику',
    benefitsTitle: 'Основные преимущества',
    benefits: [
      'Видеоуроки и пошаговые объяснения',
      'Практические задания по каждой теме',
      'Диагностика и персональный план обучения',
      'Подготовка к экзаменам и тестам',
      'Отслеживание результатов — и для родителей',
      'Обучение в своём темпе'
    ]
  }
}

const FEATURES = [
  { key: 'goal', Icon: Target, color: '#2563EB', soft: '#EAF1FF' },
  { key: 'audience', Icon: Users, color: '#16A34A', soft: '#E7F8EE' },
  { key: 'offer', Icon: BarChart3, color: '#F59E0B', soft: '#FFF4DE' }
]

/** Admin paneldagi HTML matnni xatboshilarga ajratadi (inline uslublarsiz) */
const splitParagraphs = (html) => {
  const items = []
  html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => {
    if (inner.replace(/<[^>]+>|&nbsp;/g, '').trim()) items.push(inner.trim())
    return ''
  })
  return items.length ? items : html.trim() ? [html.trim()] : []
}

const highlightBrand = (html) =>
  html.replace(/IQmath/, '<strong class="font-extrabold text-[#2563EB]">IQmath</strong>')

const formatCount = (value) => Number(value || 0).toLocaleString('ru-RU').replace(/,/g, ' ')

const KeyMetric = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const [about, setAbout] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    request
      .get(URLS.systemSettings)
      .then((res) => setAbout(res.data || {}))
      .catch(() => setAbout({}))
    request
      .get('/api/v1/func_student/landing-stats/')
      .then((res) => setStats(res.data || null))
      .catch(() => setStats(null))
  }, [])

  const paragraphs = splitParagraphs((lang === 'ru' ? about?.about_ru : about?.about_uz) || '')
  const [lead, ...rest] = paragraphs
  const loading = about === null

  const numbers = [
    { Icon: GraduationCap, value: stats ? `${formatCount(stats.students)}+` : '—', label: text.students, color: '#2563EB' },
    { Icon: PlayCircle, value: stats ? `${formatCount(stats.lessons)}+` : '—', label: text.lessons, color: '#7C3AED' },
    { Icon: Layers, value: '3', label: text.subjects, color: '#16A34A' },
    { Icon: Sparkles, value: '3+', label: text.experience, color: '#F59E0B' }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFE] to-white pb-16 pt-10 lg:pb-24 lg:pt-16">
      <span className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/70 blur-3xl" />
      <span className="pointer-events-none absolute -right-40 bottom-40 h-[420px] w-[420px] rounded-full bg-[#F3EEFF]/70 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* 1. Kirish: rasm + sarlavha + raqamlar */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
            <img src={iqmathImg.src} alt="" className="w-full rounded-[32px]" />
            {/* Suzib turuvchi ko'rsatkichlar */}
            <div className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] sm:-right-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB]">
                <Users size={20} />
              </span>
              <span>
                <span className="block text-lg font-extrabold leading-tight text-[#0B1B3F]">
                  {stats ? `${formatCount(stats.students)}+` : '—'}
                </span>
                <span className="text-xs text-[#64748B]">{text.activeStudents}</span>
              </span>
            </div>
            <div className="absolute -left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] sm:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1EBFF] text-[#7C3AED]">
                <PlayCircle size={20} />
              </span>
              <span>
                <span className="block text-lg font-extrabold leading-tight text-[#0B1B3F]">
                  {stats ? `${formatCount(stats.lessons)}+` : '—'}
                </span>
                <span className="text-xs text-[#64748B]">{text.lessonsChip}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
              <Sparkles size={15} className="fill-[#2563EB] text-[#2563EB]" />
              {t('aboutContent.badge')}
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0B1B3F] sm:text-[38px] lg:text-[44px]">
              {t('aboutContent.headingLine1')}{' '}
              <span className="text-[#2563EB]">{t('aboutContent.headingLine2')}</span>
            </h2>

            {loading ? (
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-[#EEF2F8]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#EEF2F8]" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-[#EEF2F8]" />
              </div>
            ) : lead ? (
              <p
                className="mt-6 text-[17px] leading-[1.8] text-[#334155] sm:text-[18px]"
                dangerouslySetInnerHTML={{ __html: highlightBrand(lead) }}
              />
            ) : null}

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {numbers.map(({ Icon, value, label, color }) => (
                <div key={label} className="rounded-2xl border border-[#EEF1F7] bg-white p-4 shadow-[0_14px_34px_-30px_rgba(15,23,42,0.5)]">
                  <Icon size={20} style={{ color }} />
                  <p className="mt-2 text-[24px] font-extrabold leading-none text-[#0B1B3F]">{value}</p>
                  <p className="mt-1 text-[13px] text-[#64748B]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Maqsad, auditoriya, taklif */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-20">
          {FEATURES.map(({ key, Icon, color, soft }, index) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-[24px] border border-[#EEF1F7] bg-white p-7 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1"
            >
              <span className="pointer-events-none absolute -right-2 -top-4 text-[96px] font-extrabold leading-none text-[#F1F5FB]">
                0{index + 1}
              </span>
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: soft, color }}
              >
                <Icon size={26} />
              </span>
              <h3 className="relative mt-5 text-[20px] font-extrabold text-[#0B1B3F]">{t(`aboutContent.${key}Title`)}</h3>
              <p className="relative mt-2 text-[15.5px] leading-relaxed text-[#475569]">{t(`aboutContent.${key}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* 3. Batafsil matn + afzalliklar */}
        {rest.length ? (
          <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
                  <BookOpen size={15} />
                  {text.detailsBadge}
                </span>
                <h3 className="mt-4 text-[28px] font-extrabold leading-tight text-[#0B1B3F] sm:text-[34px]">
                  {text.detailsTitle}
                </h3>
                <p className="mt-2 text-[15.5px] text-[#64748B]">{text.detailsSub}</p>

                <div className="mt-6 rounded-[24px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-6 text-white shadow-[0_26px_50px_-30px_rgba(37,99,235,0.9)]">
                  <p className="text-[16px] font-bold">{text.benefitsTitle}</p>
                  <ul className="mt-4 space-y-3">
                    {text.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14.5px] leading-snug text-white/90">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#93C5FD]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-5">
                {rest.map((paragraph, index) => (
                  <div
                    key={index}
                    className="flex gap-5 rounded-[24px] border border-[#EEF1F7] bg-white p-6 shadow-[0_18px_40px_-36px_rgba(15,23,42,0.5)] sm:p-8"
                  >
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-[15px] font-extrabold text-[#2563EB] sm:flex">
                      {index + 1}
                    </span>
                    <p
                      className="text-left text-[16px] leading-[1.85] text-[#334155]"
                      dangerouslySetInnerHTML={{ __html: highlightBrand(paragraph) }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default KeyMetric
