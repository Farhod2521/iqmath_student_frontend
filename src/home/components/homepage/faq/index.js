import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, CircleHelp, Minus, PlayCircle, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const TEXTS = {
  uz: {
    badge: 'Savollarga javoblar',
    title: "Tez-tez so'raladigan",
    accent: 'savollar',
    subtitle: 'Platformadan foydalanish, to‘lovlar va darslar bo‘yicha eng ko‘p beriladigan savollarga javoblar',
    more: "Ko'proq savollar",
    less: 'Yopish',
    video: "Videoni ko'rish"
  },
  ru: {
    badge: 'Ответы на вопросы',
    title: 'Часто задаваемые',
    accent: 'вопросы',
    subtitle: 'Ответы на самые частые вопросы об использовании платформы, оплате и уроках',
    more: 'Больше вопросов',
    less: 'Свернуть',
    video: 'Смотреть видео'
  }
}

const LIMIT = 5

const isYoutube = (url) => /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(url || '')

/** 3D uslubidagi ko'k savol belgisi (chap tomondagi bezak) */
const QuestionBubble = () => (
  <div className="pointer-events-none absolute left-[3%] top-16 hidden xl:block" aria-hidden="true">
    <span className="absolute -left-16 top-6 h-24 w-24 rounded-full bg-[#DCE8FF]/70" />
    <div className="relative h-[130px] w-[140px] -rotate-6 rounded-[34px] bg-gradient-to-br from-[#7FB0FF] via-[#3F7DFF] to-[#2257E8] shadow-[0_30px_50px_-20px_rgba(37,99,235,0.7),inset_0_-10px_20px_rgba(15,40,140,0.35),inset_0_8px_16px_rgba(255,255,255,0.45)]">
      <span className="absolute inset-0 flex items-center justify-center text-[78px] font-black leading-none text-white drop-shadow-[0_6px_6px_rgba(15,40,140,0.35)]">
        ?
      </span>
      <span className="absolute -bottom-5 left-10 h-10 w-10 rotate-45 rounded-md bg-[#2C63EE]" />
    </div>
  </div>
)

/** Oq "chat" pufakchasi (o'ng tomondagi bezak) */
const ChatBubble = () => (
  <div className="pointer-events-none absolute right-[4%] top-40 hidden xl:block" aria-hidden="true">
    <span className="absolute -left-10 top-16 h-12 w-12 rounded-full bg-[#E3ECFF]" />
    <div className="relative flex h-[86px] w-[110px] rotate-6 items-center justify-center gap-2 rounded-[28px] bg-gradient-to-br from-white to-[#E6EEFF] shadow-[0_24px_40px_-20px_rgba(37,99,235,0.45)]">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className="h-3.5 w-3.5 rounded-full bg-[#BFD3FF]" />
      ))}
      <span className="absolute -bottom-3 right-6 h-7 w-7 rotate-45 rounded-sm bg-[#E9F0FF]" />
    </div>
  </div>
)

const FAQ = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const pathname = usePathname()
  const isFaqPage = pathname === '/faqs'

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemFaqs)
      .then((res) => setData(Array.isArray(res.data) ? res.data : []))
      .catch((error) => console.error('FAQ yuklanmadi:', error))
      .finally(() => setLoading(false))
  }, [])

  const visibleData = isFaqPage || showAll ? data : data.slice(0, LIMIT)
  const canToggle = !isFaqPage && data.length > LIMIT

  const handleToggle = () => {
    setShowAll((prev) => !prev)
    if (showAll) {
      // yig'ilganda ro'yxat boshiga qaytadi
      setTimeout(() => {
        document.getElementById('faq-list-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  return (
    <section
      id="faq-list-top"
      className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-white to-white pb-14 pt-12 md:pb-20 md:pt-16"
    >
      {/* Fon bezaklari */}
      <span className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[#EEF3FF]" />
      <span className="pointer-events-none absolute -right-32 -top-20 h-[340px] w-[340px] rounded-full bg-[#F1F5FF]" />
      <QuestionBubble />
      <ChatBubble />

      <div className="relative mx-auto max-w-[1100px] px-4">
        {/* Sarlavha */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-medium text-[#1E3A8A]">
            <CircleHelp size={17} className="fill-[#2563EB] text-white" />
            {text.badge}
          </span>
          <h2 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:text-[40px] lg:text-[48px]">
            {text.title} <span className="text-[#1D6BFF]">{text.accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[#475569] sm:text-[17px]">{text.subtitle}</p>
        </div>

        {/* Savollar */}
        <div className="mt-10 space-y-4">
          {loading
            ? [1, 2, 3, 4, 5].map((i) => <div key={i} className="h-[68px] animate-pulse rounded-2xl bg-[#EEF2F8]" />)
            : visibleData.map((item, index) => {
                const open = openIndex === index
                const question = lang === 'ru' ? item.question_ru || item.question_uz : item.question_uz
                const answer = lang === 'ru' ? item.answer_ru || item.answer_uz : item.answer_uz
                return (
                  <div
                    key={item.id ?? index}
                    className={`rounded-2xl border bg-white transition duration-300 ${
                      open
                        ? 'border-[#9DBBFF] shadow-[0_24px_50px_-34px_rgba(37,99,235,0.55)]'
                        : 'border-[#E6EBF5] shadow-[0_10px_30px_-28px_rgba(15,23,42,0.4)] hover:border-[#C9D9FF]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-6"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-[17px] font-bold text-[#2563EB]">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-[15px] font-bold text-[#0B1B3F] sm:text-[18px]">{question}</span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                          open ? 'bg-[#EAF1FF] text-[#2563EB]' : 'bg-[#F4F6FA] text-[#334155]'
                        }`}
                      >
                        {open ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                    </button>

                    {/* Javob: silliq ochilib-yopiladi */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-4 border-t border-[#EEF1F6] pb-5 pt-4 sm:mx-6">
                          {answer ? (
                            <div
                              className="faq-answer text-[15px] leading-relaxed text-[#334155]"
                              dangerouslySetInnerHTML={{ __html: answer }}
                            />
                          ) : null}
                          {isYoutube(item?.url) ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#FEECEC] px-3.5 py-2 text-sm font-semibold text-[#DC2626] transition hover:bg-[#FEE2E2]"
                            >
                              <PlayCircle size={18} />
                              {text.video}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
        </div>

        {canToggle ? (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#EAF1FF] py-2.5 pl-3 pr-6 text-[15px] font-semibold text-[#1D4ED8] shadow-[0_12px_24px_-16px_rgba(37,99,235,0.7)] transition hover:bg-[#DCE8FF]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                {showAll ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </span>
              {showAll ? text.less : text.more}
            </button>
          </div>
        ) : null}
      </div>

      <style jsx global>{`
        .faq-answer p {
          margin: 0 0 8px;
        }
        .faq-answer p:last-child {
          margin-bottom: 0;
        }
        .faq-answer a {
          color: #2563eb;
          text-decoration: underline;
        }
        .faq-answer ul,
        .faq-answer ol {
          margin: 6px 0;
          padding-left: 20px;
          list-style: disc;
        }
      `}</style>
    </section>
  )
}

export default FAQ
