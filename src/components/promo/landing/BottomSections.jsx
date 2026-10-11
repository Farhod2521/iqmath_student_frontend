import { useState } from 'react'
import { FaApple, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  CircleCheck,
  Coins,
  GraduationCap,
  ListChecks,
  MessageSquareText,
  Play,
  Target,
  Trophy,
  X
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import PricingContent from '@/pages/prices/components/PricingContent'
import { LINKS } from './content'
import { Container, PrimaryButton, Reveal, SectionTag, SectionTitle, scrollToId } from './ui'
import { FlameArt, GemArt, PhoneMock, TrophyArt } from './Illustrations'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

/* ------------------------------------------------------------------ */
/* Interaktiv ta'lim                                                  */
/* ------------------------------------------------------------------ */

const FEATURE_ICONS = [GraduationCap, ListChecks, MessageSquareText, Target]
const FEATURE_COLORS = ['#7C3AED', '#2563EB', '#0284C7', '#16A34A']

export const PlatformSection = ({ c }) => {
  const p = c.platform
  return (
    <section id="platform" className="scroll-mt-20 bg-gradient-to-b from-white to-[#F5F8FF] py-16 md:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionTag>{p.tag}</SectionTag>
          <SectionTitle className="mt-4">
            {p.title[0]}
            <br />
            {p.title[1]}
          </SectionTitle>
          <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{p.text}</p>
          <ul className="mt-7 space-y-3.5">
            {p.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index]
              return (
                <li key={feature} className="flex items-center gap-3 text-[15px] text-[#334155]">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${FEATURE_COLORS[index]}1A`, color: FEATURE_COLORS[index] }}
                  >
                    <Icon size={16} />
                  </span>
                  {feature}
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* Dars + mashq namunasi */}
        <Reveal delay={120}>
          <div className="relative rounded-[28px] bg-white p-4 shadow-[0_30px_70px_-35px_rgba(37,99,235,0.55)] ring-1 ring-[#E3EAF6] sm:p-5">
            <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[28px] bg-gradient-to-br from-[#BFD3FF] to-[#E9E3FF]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.5fr_1fr]">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#13233F]">
                <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full">
                  <polygon points="70,140 160,40 160,140" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                  <rect x="150" y="130" width="10" height="10" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
                  <text x="110" y="160" fill="#CBD5E1" fontSize="14" fontStyle="italic">
                    a
                  </text>
                  <text x="168" y="95" fill="#CBD5E1" fontSize="14" fontStyle="italic">
                    b
                  </text>
                  <text x="98" y="85" fill="#CBD5E1" fontSize="14" fontStyle="italic">
                    c
                  </text>
                  <text x="200" y="80" fill="#F8FAFC" fontSize="22" fontStyle="italic">
                    a² + b² = c²
                  </text>
                </svg>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg">
                  <Play size={20} fill="currentColor" />
                </span>
              </div>
              <ul className="space-y-2">
                {p.lessons.map((lesson, index) => (
                  <li
                    key={lesson}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
                      index === 1 ? 'bg-[#EEF3FF] text-[#2563EB]' : 'bg-[#F8FAFC] text-[#334155]'
                    }`}
                  >
                    {index < 2 ? (
                      <CircleCheck size={15} className="shrink-0 text-[#16A34A]" />
                    ) : (
                      <span className="h-[15px] w-[15px] shrink-0 rounded-full border-2 border-[#CBD5E1]" />
                    )}
                    {index + 1}. {lesson}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-[#EEF2F8] p-4">
                <p className="text-sm font-bold text-[#0B1B3F]">{p.exercise}</p>
                <p className="mt-1 text-xs text-[#64748B]">{p.question}</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[5, 6, 7, 8].map((option) => (
                    <span
                      key={option}
                      className={`flex h-9 items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold ${
                        option === 5 ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-[#E3EAF6] text-[#334155]'
                      }`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
                <span className="mt-3 flex h-9 items-center justify-center rounded-lg bg-[#2563EB] text-xs font-semibold text-white">
                  {p.check}
                </span>
              </div>
              <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
                <p className="flex items-center gap-1.5 text-sm font-bold text-[#15803D]">
                  <CircleCheck size={16} />
                  {p.correct}
                </p>
                <p className="mt-2 text-[11px] text-[#64748B]">{p.explain}</p>
                <p className="mt-1 font-mono text-xs text-[#0B1B3F]">c² = 3² + 4² = 25</p>
                <p className="mt-1 font-mono text-sm font-bold text-[#0B1B3F]">c = 5</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Motivatsiya                                                        */
/* ------------------------------------------------------------------ */

const PILL_ICONS = [Target, BadgeCheck, Coins, BarChart3]
const PILL_COLORS = ['#EF4444', '#2563EB', '#F59E0B', '#7C3AED']

export const MotivationSection = ({ c }) => {
  const m = c.motivation
  return (
    <section className="bg-[#F5F8FF] py-16 md:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionTag>{m.tag}</SectionTag>
          <SectionTitle className="mt-4">{m.title}</SectionTitle>
          <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{m.text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {m.pills.map((pill, index) => {
              const Icon = PILL_ICONS[index]
              return (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#334155] shadow-sm ring-1 ring-[#E3EAF6]"
                >
                  <Icon size={16} style={{ color: PILL_COLORS[index] }} />
                  {pill}
                </span>
              )
            })}
          </div>
        </Reveal>

        {/* Telefonda kartalar bir qatorda, kattaroq ekranda kubok atrofida "suzib" turadi */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-[460px] sm:h-[300px]">
          <div className="grid grid-cols-3 gap-2 sm:contents">
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-center shadow-[0_20px_40px_-25px_rgba(15,23,42,0.45)] sm:absolute sm:flex-row sm:gap-2 sm:px-4 sm:text-left sm:left-0 sm:top-6">
              <FlameArt className="h-9 w-9" />
              <span>
                <span className="block text-lg font-extrabold text-[#0B1B3F]">7 {m.streak}</span>
                <span className="text-xs text-[#64748B]">{m.streakLabel}</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-center shadow-[0_20px_40px_-25px_rgba(15,23,42,0.45)] sm:absolute sm:flex-row sm:gap-2 sm:px-4 sm:text-left sm:left-[38%] sm:top-0">
              <img src="/images/homepage/tanga.png" alt="" className="h-9 w-9 object-contain" loading="lazy" />
              <span>
                <span className="block text-lg font-extrabold text-[#F59E0B]">320</span>
                <span className="text-xs text-[#64748B]">{m.coins}</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-center shadow-[0_20px_40px_-25px_rgba(15,23,42,0.45)] sm:absolute sm:flex-row sm:gap-2 sm:px-4 sm:text-left sm:right-0 sm:top-10">
              <GemArt className="h-8 w-8" />
              <span>
                <span className="block text-lg font-extrabold text-[#0B1B3F]">12</span>
                <span className="text-xs text-[#64748B]">{m.gems}</span>
              </span>
            </div>
          </div>
          <TrophyArt className="mx-auto mt-6 block w-36 drop-shadow-[0_25px_30px_rgba(245,158,11,0.3)] sm:absolute sm:bottom-0 sm:left-1/2 sm:mt-0 sm:w-44 sm:-translate-x-1/2" />
          <span className="absolute bottom-16 left-[12%] hidden h-6 w-6 rotate-12 rounded-md bg-[#3B82F6]/80 sm:block" />
          <span className="absolute bottom-24 right-[14%] hidden h-5 w-5 rounded-full bg-[#FBBF24] sm:block" />
        </Reveal>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Mobil ilova                                                        */
/* ------------------------------------------------------------------ */

// Rangli Google Play belgisi (QR markazi va tugma uchun)
const PlayLogo = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
    <path fill="#00D7FE" d="M7.6 4.3 26.4 24 7.6 43.7c-.6-.4-1-1.1-1-2V6.3c0-.9.4-1.6 1-2Z" />
    <path fill="#FFCE00" d="m33 30.6-6.6-6.6 6.6-6.6 7.9 4.5c1.9 1.1 1.9 3.3 0 4.3L33 30.6Z" />
    <path fill="#FF3A44" d="M33 30.6 26.4 24 7.6 43.7c.7.5 1.7.5 2.6 0L33 30.6Z" />
    <path fill="#00F076" d="M33 17.4 10.2 4.3c-.9-.5-1.9-.5-2.6 0L26.4 24 33 17.4Z" />
  </svg>
)

const StoreCard = ({ href, logo, lines, hint }) => (
  <div className="w-full rounded-[26px] bg-white p-3 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)] ring-1 ring-[#EEF1F6] sm:w-[280px]">
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-[66px] items-center gap-3 rounded-2xl bg-[#0B0F19] px-5 text-white transition hover:bg-[#1A2235]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">{logo}</span>
      <span className="leading-tight">
        <span className="block text-[12px] text-white/80">{lines[0]}</span>
        <span className="block text-[20px] font-bold tracking-tight">{lines[1]}</span>
      </span>
    </a>
    <div className="flex items-center gap-4 px-2 pb-1 pt-3">
      <span className="relative flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-xl bg-white">
        <QRCodeSVG value={href} size={96} level="H" />
        <span className="absolute flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm">
          {logo}
        </span>
      </span>
      <p className="text-[14px] leading-snug text-[#2563EB]">{hint}</p>
    </div>
  </div>
)

export const AppSection = ({ c }) => (
  <section id="app" className="scroll-mt-20 overflow-hidden bg-white py-14 md:py-20">
    <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <Reveal>
        <SectionTag>{c.app.tag}</SectionTag>
        <SectionTitle className="mt-4">{c.app.title}</SectionTitle>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#475569]">{c.app.text}</p>
        <ul className="mt-5 space-y-2">
          {c.app.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-[15px] text-[#334155]">
              <CircleCheck size={18} className="shrink-0 text-[#16A34A]" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <StoreCard href={LINKS.googlePlay} logo={<PlayLogo size={26} />} lines={c.app.google} hint={c.app.qrHint} />
          <StoreCard
            href={LINKS.appStore}
            logo={<FaApple size={26} className="text-current" />}
            lines={c.app.apple}
            hint={c.app.qrHint}
          />
        </div>
      </Reveal>
      <Reveal
        delay={120}
        className="relative mx-auto hidden h-[380px] w-full max-w-[480px] items-end justify-center lg:flex"
      >
        <div className="absolute inset-x-6 bottom-6 top-16 rounded-[40px] bg-gradient-to-br from-[#DCE8FF] to-[#EDE7FF]" />
        <PhoneMock variant={0} className="relative z-10 mb-10 w-[130px] -rotate-6" />
        <PhoneMock variant={1} className="relative z-20 -mx-4 mb-16 w-[150px]" />
        <PhoneMock variant={2} className="relative z-10 mb-8 w-[130px] rotate-6" />
      </Reveal>
    </Container>
  </section>
)

/* ------------------------------------------------------------------ */
/* Tariflar — bosh sahifadagi bilan bir xil kartalar (haqiqiy API)    */
/* ------------------------------------------------------------------ */

export const PricingSection = ({ c }) => {
  const pr = c.pricing
  return (
    <section id="pricing" className="scroll-mt-20 bg-gradient-to-b from-[#F5F8FF] to-white pt-16 md:pt-24">
      <Container>
        <Reveal className="text-center">
          <SectionTag>{pr.tag}</SectionTag>
          <SectionTitle className="mt-4">
            {pr.title}{' '}
            <span className="bg-gradient-to-r from-[#1D6BFF] to-[#3B8BFF] bg-clip-text text-transparent">
              {pr.accent}
            </span>
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-2xl text-[17px] text-[#475569]">{pr.subtitle}</p>
        </Reveal>
      </Container>
      <PricingContent />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Savollar                                                           */
/* ------------------------------------------------------------------ */

export const FaqSection = ({ c }) => {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionTag>{c.faq.tag}</SectionTag>
          <SectionTitle className="mt-4">{c.faq.title}</SectionTitle>
          <div className="relative mt-8 hidden h-40 w-40 lg:block">
            <span className="absolute left-0 top-0 text-[120px] font-extrabold leading-none text-[#DCE8FF]">?</span>
            <span className="absolute bottom-0 right-0 flex h-20 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#60A5FA] to-[#2563EB] text-white shadow-lg">
              <MessageSquareText size={34} />
            </span>
          </div>
        </Reveal>

        <div className="space-y-3">
          {c.faq.items.map((item, index) => {
            const expanded = open === index
            return (
              <Reveal key={item.q} delay={index * 60}>
                <div
                  className={`rounded-2xl border transition ${
                    expanded ? 'border-[#BFD3FF] bg-[#F7FAFF]' : 'border-[#E3EAF6] bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? -1 : index)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-[#0B1B3F]"
                  >
                    {item.q}
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#64748B] transition ${expanded ? 'rotate-180 text-[#2563EB]' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <p className="overflow-hidden px-5 text-sm leading-relaxed text-[#475569]">
                      <span className="block pb-4">{item.a}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Yakuniy chaqiriq va pastki qism                                    */
/* ------------------------------------------------------------------ */

export const CtaBanner = ({ c }) => (
  <section className="bg-white pb-16 md:pb-24">
    <Container>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] px-6 py-10 text-white shadow-[0_30px_60px_-30px_rgba(37,99,235,0.9)] sm:px-12">
          <span className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <span className="absolute -bottom-16 right-24 h-48 w-48 rounded-full bg-white/10" />
          <Trophy size={120} className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-white/10 md:block" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-[30px]">{c.cta.title}</h2>
              <p className="mt-2 max-w-xl text-white/80">{c.cta.text}</p>
            </div>
            <button
              type="button"
              onClick={scrollToId('lead')}
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-6 font-semibold text-[#1D4ED8] shadow-lg transition hover:bg-[#EEF3FF]"
            >
              {c.cta.button}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
)

export const SiteFooter = ({ c }) => (
  <footer className="border-t border-[#E3EAF6] bg-[#F5F8FF] py-12">
    <Container>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="IQMath" className="h-8 w-8 object-contain" />
            <span className="text-xl font-extrabold text-[#0B1B3F]">MATH</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[#64748B]">{c.footer.tagline}</p>
        </div>
        {c.footer.columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-bold text-[#0B1B3F]">{column.title}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map(([label, href]) => {
                const external = href === 'telegram'
                const anchor = href.startsWith('#')
                return (
                  <li key={label}>
                    <a
                      href={external ? LINKS.telegram : href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      onClick={anchor ? scrollToId(href.slice(1)) : undefined}
                      className="text-sm text-[#64748B] transition hover:text-[#2563EB]"
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <div className="col-span-2 flex gap-2 md:col-span-1">
          {[
            [LINKS.telegramChannel, FaTelegramPlane],
            [LINKS.youtube, FaYoutube],
            [LINKS.instagram, FaInstagram]
          ].map(([href, Icon]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm ring-1 ring-[#E3EAF6] transition hover:bg-[#2563EB] hover:text-white"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-10 border-t border-[#E3EAF6] pt-6 text-center text-xs text-[#94A3B8]">
        © {new Date().getFullYear()} IQMath. {c.footer.rights}
      </p>
    </Container>
  </footer>
)

/** "Video haqida" — video oynasi */
export const VideoModal = ({ open, onClose }) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1B3F]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        >
          <X size={20} />
        </button>
        <video src={LINKS.video} controls autoPlay playsInline className="w-full rounded-2xl bg-black shadow-2xl" />
      </div>
    </div>
  )
}
