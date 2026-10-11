import React from 'react'
import { Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PricingContent from '@/pages/prices/components/PricingContent'

const TEXTS = {
  uz: {
    badge: 'Maxsus taklif – bilim olishni bugunoq boshlang!',
    title: 'O‘quvchilaringizga mos',
    accent: 'tariflarni tanlang'
  },
  ru: {
    badge: 'Специальное предложение – начните учиться уже сегодня!',
    title: 'Выберите тарифы',
    accent: 'для ваших учеников'
  }
}

/** Bosh sahifadagi "Tariflar" bo'limi: sarlavha + tarif kartalari */
const Pricing = () => {
  const { t, i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section id="prices" className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-white py-10 md:py-16">
      {/* fondagi yumshoq bezaklar */}
      <span className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full border border-[#E8EEF9]" />
      <span className="pointer-events-none absolute -right-48 bottom-10 h-[520px] w-[520px] rounded-full border border-[#E8EEF9]" />

      <div className="relative mx-auto max-w-[1280px] px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-medium text-[#1E3A8A]">
          <Tag size={15} className="text-[#2563EB]" />
          {text.badge}
        </span>
        <h2 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:text-[42px] lg:text-[52px]">
          {text.title}
          <br />
          <span className="bg-gradient-to-r from-[#1D6BFF] to-[#3B8BFF] bg-clip-text text-transparent">{text.accent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[#475569] sm:text-[17px]">
          {t(
            'pricingPageSubHeader',
            'IQmath platformasidagi eng mos tariflarni tanlab, matematikani tez va samarali o‘rganing'
          )}
        </p>
      </div>

      <PricingContent />
    </section>
  )
}

export default Pricing
