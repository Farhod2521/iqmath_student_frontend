import React from 'react'
import { useTranslation } from 'react-i18next'
import PricingContent from '@/pages/prices/components/PricingContent'

const TEXTS = {
  uz: {
    badge: 'Maxsus taklif – bilim olishni bugunoq boshlang!',
    title: 'O‘quvchingizga mos',
    accent: 'tarifni tanlang',
    sub: 'IQmath platformasida matematikani tez va samarali o‘rganing'
  },
  ru: {
    badge: 'Специальное предложение – начните учиться уже сегодня!',
    title: 'Выберите тариф',
    accent: 'для вашего ученика',
    sub: 'Изучайте математику быстро и эффективно на платформе IQmath'
  }
}

/** Bosh sahifadagi "Tariflar" bo'limi: sarlavha + tarif kartalari */
const Pricing = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section id="prices" className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-white py-10 md:py-16">
      {/* fondagi yumshoq bezaklar */}
      <span className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full border border-[#E8EEF9]" />
      <span className="pointer-events-none absolute -right-48 bottom-10 h-[520px] w-[520px] rounded-full border border-[#E8EEF9]" />

      <div className="relative mx-auto max-w-[1280px] px-4 text-center">
        <h2 className="relative mx-auto w-fit text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:text-[42px] lg:text-[52px]">
          {text.title}
          <br />
          <span className="bg-gradient-to-r from-[#1D6BFF] to-[#3B8BFF] bg-clip-text text-transparent">{text.accent}</span>
          {/* Sarlavha yonidagi uchqunlar */}
          <svg viewBox="0 0 40 40" className="absolute -left-12 bottom-3 hidden h-9 w-9 text-[#3B8BFF] sm:block" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <path d="M30 8 L22 18 M14 6 L16 17 M34 26 L24 25" />
          </svg>
          <svg viewBox="0 0 40 40" className="absolute -right-12 bottom-3 hidden h-9 w-9 -scale-x-100 text-[#3B8BFF] sm:block" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <path d="M30 8 L22 18 M14 6 L16 17 M34 26 L24 25" />
          </svg>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[#475569] sm:text-[17px]">
          {text.sub}
        </p>
      </div>

      <PricingContent />
    </section>
  )
}

export default Pricing
