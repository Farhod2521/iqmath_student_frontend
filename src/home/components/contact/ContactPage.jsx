import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BellRing, ChevronRight, Headset, Home, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { ADDRESS_MAP_URL, SOCIAL_LINKS } from '@/constants/socialLinks'

const PHONE = '+998 78 888 18 81'
const EMAIL = 'info@iqmath.uz'

const TEXTS = {
  uz: {
    home: 'Bosh sahifa',
    badge: 'Biz bilan aloqa',
    title: 'Bog‘lanish',
    subtitle: 'Savolingiz, taklifingiz yoki muammoingiz bormi? Biz bilan qulay usulda bog‘laning — tezda javob beramiz.',
    phone: 'Call-markaz',
    telegram: 'Telegram yordam',
    email: 'Elektron pochta',
    address: 'Manzil',
    addressValue: 'Toshkent, O‘zbekiston',
    channelTitle: 'Yangiliklardan birinchi bo‘lib xabardor bo‘ling',
    channelText: 'Telegram kanalimizda yangi darslar, musobaqalar va aksiyalar haqida ma’lumot oling.',
    channelButton: 'Telegram kanaliga o‘tish',
    helpTitle: 'Tez-tez beriladigan savollar',
    helpText: 'Ko‘p savollarga javobni FAQ bo‘limidan topishingiz mumkin.',
    helpButton: 'FAQ bo‘limiga o‘tish'
  },
  ru: {
    home: 'Главная',
    badge: 'Связь с нами',
    title: 'Контакты',
    subtitle: 'Есть вопрос, предложение или проблема? Свяжитесь с нами удобным способом — мы быстро ответим.',
    phone: 'Колл-центр',
    telegram: 'Поддержка в Telegram',
    email: 'Электронная почта',
    address: 'Адрес',
    addressValue: 'Ташкент, Узбекистан',
    channelTitle: 'Узнавайте новости первыми',
    channelText: 'В нашем Telegram-канале — новые уроки, соревнования и акции.',
    channelButton: 'Перейти в Telegram-канал',
    helpTitle: 'Частые вопросы',
    helpText: 'Ответы на многие вопросы есть в разделе FAQ.',
    helpButton: 'Перейти в FAQ'
  }
}

/** "Bog'lanish" sahifasi: sarlavha va konvert rasmi, aloqa kartalari, Telegram kanal va FAQ */
const ContactPage = () => {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  const cards = [
    { Icon: Phone, title: text.phone, value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
    { Icon: Send, title: text.telegram, value: '@iqmath_help', href: SOCIAL_LINKS.telegramHelp, external: true },
    { Icon: Mail, title: text.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { Icon: MapPin, title: text.address, value: text.addressValue, href: ADDRESS_MAP_URL, external: true }
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FD] via-[#F7F9FE] to-white font-['Manrope','Inter',system-ui,sans-serif]">
      {/* Fondagi yumshoq to'lqinlar */}
      <span className="pointer-events-none absolute -left-[260px] top-[120px] h-[560px] w-[760px] rounded-[50%] bg-gradient-to-br from-[#E6EEFC] to-transparent" />
      <span className="pointer-events-none absolute -right-[200px] -top-[180px] h-[620px] w-[760px] rounded-[50%] bg-gradient-to-bl from-[#E3ECFB] to-transparent" />

      {/* ================= Sarlavha ================= */}
      <section className="relative mx-auto grid max-w-[1260px] items-center gap-4 px-4 pt-6 sm:pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <nav className="flex items-center gap-2 text-[14px] text-[#64748B]">
            <Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-[#1D6BFF]">
              <Home size={16} className="text-[#1D6BFF]" />
              {text.home}
            </Link>
            <ChevronRight size={15} />
            <span className="font-semibold text-[#0B1B3F]">{text.title}</span>
          </nav>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[14px] font-bold text-[#1D4FE0] sm:mt-6 sm:text-[15px]">
            <Headset size={18} />
            {text.badge}
          </span>
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.05] tracking-tight text-[#0B1B3F] sm:text-[56px] lg:text-[64px]">
            {text.title}
          </h1>
          <p className="mt-4 max-w-[540px] text-[16px] leading-relaxed text-[#475569] sm:text-[19px]">{text.subtitle}</p>
        </div>
        <img
          src="/images/contact/hero.webp"
          alt=""
          className="mx-auto w-full max-w-[420px] [-webkit-mask-image:radial-gradient(closest-side,#000_70%,transparent)] [mask-image:radial-gradient(closest-side,#000_70%,transparent)] sm:max-w-[520px] lg:max-w-[560px]"
        />
      </section>

      {/* ================= Aloqa kartalari ================= */}
      <section className="relative mx-auto mt-2 grid max-w-[1260px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:mt-4 lg:grid-cols-4 lg:gap-5">
        {cards.map(({ Icon, title, value, href, external }) => (
          <a
            key={title}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex items-end justify-between gap-3 rounded-[24px] border border-[#E6EBF5] bg-white p-5 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD3FA] hover:shadow-[0_30px_60px_-34px_rgba(29,79,224,0.45)] sm:p-6"
          >
            <div className="min-w-0">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1D6BFF] shadow-[0_8px_20px_-8px_rgba(29,79,224,0.45)] ring-1 ring-[#E3ECFB]">
                <Icon size={24} />
              </span>
              <p className="mt-4 text-[14px] text-[#475569]">{title}</p>
              <p className="mt-0.5 truncate text-[18px] font-extrabold text-[#0B1B3F] sm:text-[19px]">{value}</p>
            </div>
            <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#1D6BFF] ring-1 ring-[#DCE6F8] transition group-hover:bg-[#1D6BFF] group-hover:text-white group-hover:ring-[#1D6BFF]">
              <ArrowRight size={17} />
            </span>
          </a>
        ))}
      </section>

      {/* ================= Telegram kanal va FAQ ================= */}
      <section className="relative mx-auto grid max-w-[1260px] grid-cols-1 gap-5 px-4 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#4D8BFF] via-[#2F6FF5] to-[#1D55EC] p-7 text-white shadow-[0_30px_60px_-30px_rgba(29,79,224,0.7)] sm:p-9">
          <span className="pointer-events-none absolute -bottom-32 right-[-60px] h-[300px] w-[420px] rounded-[50%] bg-white/10" />

          {/* Telefon va qo'ng'iroqcha (bezak) */}
          <div className="pointer-events-none absolute right-8 top-1/2 hidden h-[230px] w-[140px] -translate-y-1/2 rotate-[14deg] rounded-[30px] border-[5px] border-white/50 bg-gradient-to-b from-white/35 to-white/10 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur md:block xl:right-16">
            <span className="absolute left-1/2 top-3 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/50" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] items-center justify-center rounded-full bg-gradient-to-br from-[#4FA8FF] to-[#1D6BFF] shadow-[0_14px_26px_-10px_rgba(0,0,0,0.4)]">
              <Send size={36} className="-ml-1 fill-white text-white" />
            </span>
            <BellRing
              size={54}
              className="absolute -bottom-2 -right-9 -rotate-[14deg] fill-[#FFC233] text-[#F29A0B] drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="relative md:max-w-[58%]">
            <Send size={34} className="text-white" />
            <h2 className="mt-4 text-[24px] font-extrabold leading-tight sm:text-[30px]">{text.channelTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/90 sm:text-[16px]">{text.channelText}</p>
            <a
              href={SOCIAL_LINKS.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-[#0B1B3F] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)] transition hover:bg-[#EEF3FF] sm:text-[16px]"
            >
              <Send size={18} className="text-[#1D6BFF]" />
              {text.channelButton}
              <ArrowRight size={18} className="text-[#1D6BFF] transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="flex flex-col rounded-[28px] border border-[#E6EBF5] bg-white p-7 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.5)] sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1D6BFF] shadow-[0_8px_20px_-8px_rgba(29,79,224,0.45)] ring-1 ring-[#E3ECFB]">
            <MessageCircle size={24} />
          </span>
          <h2 className="mt-auto pt-6 text-[22px] font-extrabold text-[#0B1B3F] sm:text-[26px]">{text.helpTitle}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[#64748B] sm:text-[16px]">{text.helpText}</p>
          <Link
            href="/faqs"
            className="group mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#E8F0FF] px-6 py-3.5 text-[15px] font-bold text-[#1D4FE0] transition hover:bg-[#DCE7FF] sm:text-[16px]"
          >
            {text.helpButton}
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
