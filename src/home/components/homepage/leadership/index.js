import React from 'react'
import { Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LeadershipSlider from './LeadershipSlider'

const TEXTS = {
  uz: {
    badge: 'Buyuk olimlar',
    title: 'Matematika tarixidagi',
    accent: 'ulug‘ shaxslar',
    subtitle: 'O‘rta Osiyo va dunyo matematikasiga katta hissa qo‘shgan buyuk olimlar bilan tanishing.'
  },
  ru: {
    badge: 'Великие учёные',
    title: 'Великие личности',
    accent: 'в истории математики',
    subtitle: 'Познакомьтесь с великими учёными, внёсшими огромный вклад в математику Средней Азии и мира.'
  }
}

/** Bosh sahifa: "Matematika tarixidagi ulug' shaxslar" */
const Leadership = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFE] via-white to-[#F8FAFE] py-14 md:py-20">
      <span className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#EEF3FF]/70 blur-3xl" />
      <span className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F3EEFF]/70 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
            <Crown size={16} className="fill-[#FBBF24] text-[#D97706]" />
            {text.badge}
          </span>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#0B1B3F] sm:text-[44px] lg:text-[56px]">
            {text.title}
            <br />
            <span className="text-[#1D6BFF]">{text.accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#475569] sm:text-[19px]">
            {text.subtitle}
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <LeadershipSlider />
        </div>
      </div>
    </section>
  )
}

export default Leadership
