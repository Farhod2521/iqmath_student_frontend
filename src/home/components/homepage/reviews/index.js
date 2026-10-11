import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FaBullseye, FaChartSimple, FaHeartPulse, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

const TEXTS = {
  uz: {
    badge: 'Nima uchun IQmath?',
    title: 'Nima uchun',
    accent: 'IQmath?',
    subtitle: 'O‘qish jarayonini qiziqarli, samarali va natijali qilish uchun barcha imkoniyatlar bir platformada.',
    items: [
      [
        'Mantiqiy va analitik fikrlash rivojlanadi',
        'Masalalar orqali tahlil qilish, mantiqiy fikrlash va muammoni hal qilish ko‘nikmalari shakllanadi.'
      ],
      [
        'Akademik ko‘rsatkichlar yaxshilanadi',
        'Maktab dasturiga mos darslar va diagnostik testlar natijasida bilim mustahkamlanadi.'
      ],
      [
        'Hayotiy muammolarni hal qilish ko‘nikmalari',
        'Nazariy bilim amaliy masalalar orqali real hayotda qo‘llashga o‘rgatadi.'
      ],
      [
        'O‘z tezligingizda o‘rganish imkoniyati',
        'Shaxsiy o‘quv rejasi, moslashuvchan darslar va istalgan vaqtda o‘qish imkoniyati.'
      ],
      [
        'Imtihonlarga professional tayyorgarlik',
        'DTM, maktab va xalqaro imtihonlar uchun maxsus kurslar va test bazalari.'
      ],
      [
        'Doimiy progress monitoring',
        'Natijalaringiz, kuchli va zaif tomonlaringizni tahlil qilib, shaxsiy tavsiyalar beriladi.'
      ]
    ]
  },
  ru: {
    badge: 'Почему IQmath?',
    title: 'Почему',
    accent: 'IQmath?',
    subtitle: 'Всё, чтобы учёба была интересной, эффективной и результативной, — на одной платформе.',
    items: [
      [
        'Развивается логическое и аналитическое мышление',
        'Через решение задач формируются навыки анализа, логики и поиска решений.'
      ],
      [
        'Улучшается успеваемость',
        'Уроки по школьной программе и диагностические тесты закрепляют знания.'
      ],
      [
        'Навыки решения жизненных задач',
        'Практические задачи учат применять теорию в реальной жизни.'
      ],
      [
        'Учёба в своём темпе',
        'Персональный план, гибкие уроки и возможность заниматься в любое время.'
      ],
      [
        'Профессиональная подготовка к экзаменам',
        'Специальные курсы и базы тестов для ДТМ, школьных и международных экзаменов.'
      ],
      [
        'Постоянный мониторинг прогресса',
        'Анализ результатов, сильных и слабых сторон с персональными рекомендациями.'
      ]
    ]
  }
}

// Har bir karta uchun: ikonka, gradient va o'q tugmasi ranglari (rasmdagi tartibda)
const CARD_STYLES = [
  { Icon: FaLightbulb, from: '#35C2FF', to: '#1D74F5', arrow: '#1D74F5', soft: '#EAF3FF' },
  { Icon: FaChartSimple, from: '#B26BFF', to: '#7C3AED', arrow: '#8B3DF0', soft: '#F3EAFF' },
  { Icon: FaHeartPulse, from: '#4ADE80', to: '#16A34A', arrow: '#16A34A', soft: '#E8F9EE' },
  { Icon: FaRocket, from: '#FFAA4D', to: '#F2600C', arrow: '#F2600C', soft: '#FFF1E6' },
  { Icon: FaUsers, from: '#FF7A8A', to: '#E11D48', arrow: '#E11D48', soft: '#FDEBEF' },
  { Icon: FaBullseye, from: '#8CC0FF', to: '#3B82F6', arrow: '#2563EB', soft: '#EAF1FF' }
]

/** Bosh sahifa: "Nima uchun IQmath?" — afzalliklar kartalari */
const Reviews = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section id="benefits" className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFE] to-white py-14 md:py-20">
      <span className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full border border-[#EEF2FA]" />
      <span className="pointer-events-none absolute -left-52 bottom-0 h-[480px] w-[480px] rounded-full border border-[#EEF2FA]" />

      <div className="relative mx-auto max-w-[1440px] px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[14px] font-semibold text-[#1E4FD8]">
            <Sparkles size={17} className="fill-[#2563EB] text-[#2563EB]" />
            {text.badge}
          </span>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:text-[44px] lg:text-[56px]">
            {text.title} <span className="text-[#1D6BFF]">{text.accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-relaxed text-[#64748B] sm:text-[19px]">
            {text.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {text.items.map(([title, description], index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length]
            return (
              <div
                key={title}
                className="group flex gap-4 rounded-[22px] sm:gap-5 border border-[#EDF1F7] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(37,99,235,0.35)] sm:p-7"
              >
                {/* 3D ko'rinishdagi gradient ikonka */}
                <span
                  className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] text-white"
                  style={{
                    background: `linear-gradient(145deg, ${style.from} 0%, ${style.to} 100%)`,
                    boxShadow: `0 16px 28px -14px ${style.to}, inset 0 -6px 12px rgba(0,0,0,0.12), inset 0 6px 10px rgba(255,255,255,0.35)`
                  }}
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                  <style.Icon size={32} className="relative drop-shadow-[0_3px_4px_rgba(0,0,0,0.2)]" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <h3 className="flex-1 text-[19px] font-bold leading-snug text-[#0B1B3F]">{title}</h3>
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5"
                      style={{ backgroundColor: style.soft, color: style.arrow }}
                    >
                      <ArrowRight size={20} strokeWidth={2.4} />
                    </span>
                  </div>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#64748B]">{description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Reviews
