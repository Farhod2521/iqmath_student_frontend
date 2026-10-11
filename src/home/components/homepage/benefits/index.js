import React from 'react'
import { BarChart3, Lightbulb } from 'lucide-react'
import { FaChartSimple, FaClipboardList, FaGraduationCap } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

const TEXTS = {
  uz: {
    badge: 'IQmath bilan erishish',
    title: ['IQmath', 'Bilan Erishish', 'Mumkin'],
    subtitle:
      'IQmath bilan o‘qish natijasida nafaqat akademik ko‘rsatkichlar yaxshilanadi, balki mantiqiy fikrlash ham kuchayadi.',
    items: [
      ['Akademik Natijalar', 'Sezilarli darajada yaxshi baholar va bilim darajasi.'],
      ['Mantiqiy Fikrlash', 'Muammolarni hal qilish va tahlil qilish ko‘nikmalari.'],
      ['Mustaqillik', 'O‘z-o‘zini rivojlantirish va mustaqil o‘rganish qobiliyati.'],
      ['Imtihonga tayyorgarlik', 'Har qanday test va imtihonlarga ishonch bilan kirish.']
    ]
  },
  ru: {
    badge: 'Чего можно достичь с IQmath',
    title: ['С IQmath', 'можно', 'достичь'],
    subtitle: 'Обучение с IQmath улучшает не только успеваемость, но и развивает логическое мышление.',
    items: [
      ['Академические результаты', 'Заметно лучшие оценки и уровень знаний.'],
      ['Логическое мышление', 'Навыки решения задач и анализа.'],
      ['Самостоятельность', 'Способность к саморазвитию и самостоятельному обучению.'],
      ['Подготовка к экзаменам', 'Уверенность на любых тестах и экзаменах.']
    ]
  }
}

const CARD_STYLES = [
  { Icon: FaGraduationCap, from: '#3B9BFF', to: '#1463F0', color: '#1D6BFF', soft: '#E6F0FF', corner: '#DCE9FF' },
  { Icon: Lightbulb, from: '#A970FF', to: '#7C3AED', color: '#8B3DF0', soft: '#F1E8FF', corner: '#EEDDFF' },
  { Icon: FaChartSimple, from: '#34D399', to: '#10B981', color: '#16B37A', soft: '#E3F8EE', corner: '#D6F5E6' },
  { Icon: FaClipboardList, from: '#FFB547', to: '#F28A0C', color: '#F28A0C', soft: '#FFF0DD', corner: '#FFE7C7' }
]

/** Bosh sahifa: "IQmath bilan erishish mumkin" — 4 ta raqamli karta */
const Benefits = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-[#F8FAFE] to-white py-14 md:py-20">
      {/* Fon bezaklari */}
      <span className="pointer-events-none absolute -left-24 top-6 h-[260px] w-[300px] rotate-[-20deg] rounded-[45%] bg-[#E6EEFB]/80" />
      <span className="pointer-events-none absolute -left-20 bottom-0 h-[260px] w-[160px] rounded-full bg-gradient-to-br from-[#BFD8FF] to-[#E5EEFF] opacity-70" />
      <span className="pointer-events-none absolute -right-24 bottom-24 h-[240px] w-[240px] rounded-full bg-[#E7E5FF]/80 blur-sm" />
      <span
        className="pointer-events-none absolute right-24 top-20 hidden h-[110px] w-[160px] opacity-60 lg:block"
        style={{ backgroundImage: 'radial-gradient(#C9D6EC 1.6px, transparent 1.6px)', backgroundSize: '27px 27px' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF0FB] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
            <BarChart3 size={17} className="text-[#1D6BFF]" strokeWidth={3} />
            {text.badge}
          </span>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:text-[44px] lg:text-[56px]">
            {text.title[0]} <span className="text-[#1D6BFF]">{text.title[1]}</span> {text.title[2]}
          </h2>
          <p className="mx-auto mt-4 max-w-[820px] text-[16px] leading-relaxed text-[#475569] sm:text-[19px]">
            {text.subtitle}
          </p>
        </div>

        <div className="relative mt-14">
          {/* Raqamlarni bog'lovchi nuqtali egri chiziq (kompyuterda) */}
          <svg
            className="pointer-events-none absolute -top-9 left-0 hidden h-12 w-full xl:block"
            viewBox="0 0 1000 48"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M150 26 C 240 -2, 300 -2, 350 26 M400 26 C 490 -2, 560 -2, 625 26 M650 26 C 740 -2, 800 -2, 850 26"
              stroke="#AFC4E8"
              strokeWidth="1.6"
              strokeDasharray="6 7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {text.items.map(([title, description], index) => {
              const style = CARD_STYLES[index % CARD_STYLES.length]
              return (
                <div
                  key={title}
                  className="relative flex flex-col rounded-[28px] border border-[#EEF1F7] bg-white px-6 pb-7 pt-12 text-center shadow-[0_24px_50px_-40px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1"
                >
                  {/* Yuqori o'ng burchakdagi rangli bezak */}
                  <span className="pointer-events-none absolute right-0 top-0 h-[150px] w-[170px] overflow-hidden rounded-tr-[28px]">
                    <span
                      className="absolute -right-10 -top-16 h-[200px] w-[200px] rounded-full opacity-70"
                      style={{ background: `radial-gradient(circle at 70% 30%, ${style.corner}, transparent 70%)` }}
                    />
                  </span>

                  {/* Raqam */}
                  <span
                    className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white text-[22px] font-extrabold text-white"
                    style={{
                      background: `linear-gradient(145deg, ${style.from}, ${style.to})`,
                      boxShadow: `0 12px 24px -10px ${style.to}`
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Ikonka */}
                  <span
                    className="relative mx-auto flex h-[100px] w-[100px] items-center justify-center rounded-[24px]"
                    style={{ backgroundColor: style.soft, color: style.color }}
                  >
                    <style.Icon size={50} strokeWidth={2.4} />
                  </span>

                  <h3 className="relative mt-6 text-[21px] font-extrabold text-[#0B1B3F] 2xl:text-[23px]">{title}</h3>
                  <p className="relative mx-auto mb-6 mt-2.5 max-w-[300px] text-[16px] leading-relaxed text-[#475569]">
                    {description}
                  </p>
                  <span className="mx-auto mt-auto block h-1.5 w-16 shrink-0 rounded-full" style={{ backgroundColor: style.color }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
