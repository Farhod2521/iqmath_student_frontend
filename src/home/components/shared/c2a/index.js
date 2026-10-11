import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Award, BookOpen, Sparkles, TrendingUp, Video } from 'lucide-react'

const TEXTS = {
  uz: {
    badge: 'Barcha imkoniyatlar',
    title: 'Platformaning',
    accent: 'Imkoniyatlari',
    subtitle: 'Zamonaviy ta’lim uchun kerak bo‘lgan barcha narsalar bitta platformada jamlangan.',
    more: 'Batafsil',
    items: [
      [
        'Video Darsliklar',
        'Har bir mavzu uchun batafsil video tushuntirishlar. Murakkab tushunchalarni oson va qiziqarli o‘rganing.'
      ],
      [
        'Keng Kurslar',
        'Algebra, geometriya, statistika va hisob bo‘yicha to‘liq kurslar to‘plami. Boshlang‘ichdan yuqori darajagacha.'
      ],
      [
        'Moslashuvchan Ta’lim',
        'O‘z tezligingizda o‘rganing. Platformamiz sizning darajangizga moslashadi va individual tavsiyalar beradi.'
      ],
      [
        'Test va Baholash',
        'Bilimingizni sinab ko‘ring va imtihonlarga tayyorlaning. Batafsil natijalar va tahlil oling.'
      ]
    ]
  },
  ru: {
    badge: 'Все возможности',
    title: 'Возможности',
    accent: 'платформы',
    subtitle: 'Всё необходимое для современного обучения собрано на одной платформе.',
    more: 'Подробнее',
    items: [
      [
        'Видеоуроки',
        'Подробные видеообъяснения по каждой теме. Изучайте сложные понятия легко и интересно.'
      ],
      [
        'Полные курсы',
        'Полный набор курсов по алгебре, геометрии, статистике и анализу. От начального до продвинутого уровня.'
      ],
      [
        'Гибкое обучение',
        'Учитесь в своём темпе. Платформа подстраивается под ваш уровень и даёт персональные рекомендации.'
      ],
      [
        'Тесты и оценка',
        'Проверяйте знания и готовьтесь к экзаменам. Получайте подробные результаты и анализ.'
      ]
    ]
  }
}

// Har bir karta: ikonka, gradient, och fon va bezak rangi
const CARD_STYLES = [
  { Icon: Video, from: '#3B9BFF', to: '#1463F0', text: '#1D6BFF', soft: '#E3EEFF', panel: 'from-[#EAF3FF] via-[#F4F8FF] to-white', blob: '#BFD8FF' },
  { Icon: BookOpen, from: '#A970FF', to: '#6D28D9', text: '#7C3AED', soft: '#EFE6FF', panel: 'from-[#F3EAFF] via-[#F9F5FF] to-white', blob: '#E2CCFF' },
  { Icon: TrendingUp, from: '#FFB547', to: '#F06A0C', text: '#EA580C', soft: '#FFEEDB', panel: 'from-[#FFF3E2] via-[#FFF9F1] to-white', blob: '#FFD89A' },
  { Icon: Award, from: '#34D399', to: '#059669', text: '#16A34A', soft: '#DDF7EA', panel: 'from-[#E4F8EE] via-[#F3FCF7] to-white', blob: '#B6EDD2' }
]

/** Bosh sahifa: "Platformaning imkoniyatlari" — 4 ta karta */
const C2a = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-white py-14 md:py-20">
      {/* Fon bezaklari */}
      <svg
        className="pointer-events-none absolute -left-10 top-16 hidden h-[260px] w-[300px] md:block"
        viewBox="0 0 300 260"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 40 C 120 20, 200 90, 230 250" stroke="#BFD3FF" strokeWidth="2" strokeDasharray="6 8" />
      </svg>
      <span className="pointer-events-none absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-[#EAF2FF]/80 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
            <Sparkles size={16} className="fill-[#1D6BFF] text-[#1D6BFF]" />
            {text.badge}
          </span>
          <div className="relative mx-auto mt-5 w-fit">
            {/* Sarlavha yonidagi chiziqchalar */}
            <span className="pointer-events-none absolute -left-16 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
              <span className="absolute -top-6 left-6 block h-2 w-9 rotate-[55deg] rounded-full bg-[#3B82F6]" />
              <span className="block h-2 w-10 rotate-[25deg] rounded-full bg-[#2563EB]" />
            </span>
            <span className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
              <span className="absolute -top-6 right-6 block h-2 w-9 -rotate-[55deg] rounded-full bg-[#3B82F6]" />
              <span className="block h-2 w-10 -rotate-[25deg] rounded-full bg-[#2563EB]" />
            </span>
            <h2 className="text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#0B1B3F] sm:text-[44px] lg:text-[56px]">
              {text.title} <span className="text-[#1D6BFF]">{text.accent}</span>
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-[#475569] sm:text-[19px]">
            {text.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {text.items.map(([title, description], index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length]
            return (
              <div
                key={title}
                className="group rounded-[28px] border border-[#EEF1F7] bg-white p-3 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1"
              >
                <div className={`relative flex h-full flex-col overflow-hidden rounded-[22px] bg-gradient-to-b ${style.panel} px-6 pb-6 pt-7`}>
                  {/* Kartadagi bezaklar */}
                  <span
                    className="pointer-events-none absolute -right-10 -top-12 h-40 w-48 rounded-[45%] opacity-50 blur-[2px]"
                    style={{ backgroundColor: style.blob }}
                  />
                  <span
                    className="pointer-events-none absolute right-12 top-6 h-12 w-12 rounded-full opacity-70"
                    style={{ backgroundColor: style.blob }}
                  />
                  <span
                    className="pointer-events-none absolute right-24 top-28 h-5 w-5 rounded-full opacity-80"
                    style={{ backgroundColor: style.blob }}
                  />

                  {/* 3D gradient ikonka */}
                  <span
                    className="relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[28px] text-white"
                    style={{
                      background: `linear-gradient(145deg, ${style.from} 0%, ${style.to} 100%)`,
                      boxShadow: `0 20px 34px -16px ${style.to}, inset 0 -8px 14px rgba(0,0,0,0.14), inset 0 8px 12px rgba(255,255,255,0.35)`
                    }}
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                    <style.Icon size={46} strokeWidth={2.4} className="relative" />
                  </span>

                  <h3 className="relative mt-6 text-[24px] font-extrabold text-[#0B1B3F]">{title}</h3>
                  <p className="relative mt-2.5 text-[16px] leading-relaxed text-[#475569]">{description}</p>

                  <Link
                    href="/about"
                    className="relative mt-auto inline-flex w-fit items-center gap-3 pt-6 text-[18px] font-bold"
                    style={{ color: style.text }}
                  >
                    {text.more}
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full transition group-hover:translate-x-1"
                      style={{ backgroundColor: style.soft }}
                    >
                      <ArrowRight size={22} strokeWidth={2.4} />
                    </span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default C2a
