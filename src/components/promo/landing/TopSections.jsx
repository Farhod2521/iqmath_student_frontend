import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  Menu,
  MonitorPlay,
  PlayCircle,
  Send,
  Shapes,
  UserRound,
  Users,
  X
} from 'lucide-react'
import { LINKS } from './content'
import { Container, Counter, PrimaryButton, Reveal, SectionTag, SectionTitle, scrollToId } from './ui'
import { ClipboardArt, CubesArt, InfinityArt, PyramidArt } from './Illustrations'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

/* ------------------------------------------------------------------ */
/* Sarlavha                                                           */
/* ------------------------------------------------------------------ */

const Flag = ({ code }) =>
  code === 'ru' ? (
    <svg
      viewBox="0 0 30 20"
      className="h-3.5 w-5 overflow-hidden rounded-[3px] ring-1 ring-black/10"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#fff" />
      <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
      <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 30 20"
      className="h-3.5 w-5 overflow-hidden rounded-[3px] ring-1 ring-black/10"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.4" fill="#1EB5E6" />
      <rect y="13.6" width="30" height="6.4" fill="#1EB53A" />
      <rect y="6.4" width="30" height="0.6" fill="#CE1126" />
      <rect y="13" width="30" height="0.6" fill="#CE1126" />
      <circle cx="5" cy="3.2" r="2" fill="#fff" />
      <circle cx="5.8" cy="3.2" r="2" fill="#1EB5E6" />
    </svg>
  )

const LangMenu = ({ lang, onChange }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-sm font-semibold text-[#0B1B3F] transition hover:bg-[#EEF3FF]"
      >
        <Flag code={lang} />
        {lang.toUpperCase()}
        <ChevronDown size={15} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-32 overflow-hidden rounded-xl border border-[#E3EAF6] bg-white py-1 shadow-xl">
          {[
            ['uz', "O'zbekcha"],
            ['ru', 'Русский']
          ].map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setOpen(false)
                onChange(code)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F5F8FF] ${
                code === lang ? 'font-bold text-[#2563EB]' : 'text-[#0B1B3F]'
              }`}
            >
              <Flag code={code} />
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export const SiteHeader = ({ c, lang, onLang }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'border-b border-[#E3EAF6] bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center gap-6">
        <a href="#top" onClick={scrollToId('top')} className="flex shrink-0 items-center gap-2">
          <img src={LOGO} alt="IQMath" className="h-9 w-9 object-contain" />
          <span className="text-[22px] font-extrabold tracking-tight text-[#0B1B3F]">IQMath</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {c.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollToId(item.id)}
              className="text-[14px] font-semibold text-[#334155] transition hover:text-[#2563EB]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <LangMenu lang={lang} onChange={onLang} />
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8] sm:inline-flex"
          >
            <Send size={16} />
            {c.telegram}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0B1B3F] hover:bg-[#EEF3FF] lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-[#E3EAF6] bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {c.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  setMobileOpen(false)
                  scrollToId(item.id)(event)
                }}
                className="rounded-lg px-2 py-2.5 font-semibold text-[#334155] hover:bg-[#F5F8FF]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] font-semibold text-white"
            >
              <Send size={16} />
              {c.telegram}
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

const STAT_ICONS = [Users, MonitorPlay, ClipboardCheck, CircleCheck]

export const Hero = ({ c, onVideo }) => (
  <section id="top" className="relative -mt-[72px] overflow-hidden bg-[#F3F7FF] pt-[72px]">
    {/* Katta ekranda rasm o'ng tomonda (asl nisbatda, kesilmaydi); chap chekkasi fonga singib ketadi */}
    <div className="pointer-events-none absolute right-0 top-0 hidden h-[640px] xl:block 2xl:h-[720px]">
      <img
        src="/images/landing-back.webp"
        alt=""
        fetchPriority="high"
        width={1774}
        height={887}
        className="h-full w-auto max-w-none"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F3F7FF] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3F7FF] to-transparent" />
    </div>

    <Container className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 pb-10 pt-8 xl:min-h-[640px] xl:grid-cols-2 xl:pb-24">
      <div className="max-w-[540px]">
        <SectionTag className="normal-case tracking-normal">{c.hero.badge}</SectionTag>
        <h1 className="mt-5 text-[40px] font-extrabold leading-[1.05] tracking-tight text-[#0B1B3F] sm:text-[52px] xl:text-[58px]">
          {c.hero.title[0]}
          <br />
          <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
            {c.hero.title[1]}
          </span>
          <br />
          {c.hero.title[2]}
        </h1>
        <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#475569]">{c.hero.subtitle}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton onClick={scrollToId('lead')} className="h-[52px] px-7">
            {c.hero.primary}
            <ArrowRight size={18} />
          </PrimaryButton>
          <button
            type="button"
            onClick={onVideo}
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-[#D6E2FF] bg-white px-6 text-[15px] font-semibold text-[#0B1B3F] shadow-sm transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            <PlayCircle size={20} className="text-[#2563EB]" />
            {c.hero.secondary}
          </button>
        </div>
        <ul className="mt-6 flex max-w-[480px] flex-wrap gap-x-5 gap-y-2">
          {c.hero.checks.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-sm text-[#475569]">
              <Check size={16} strokeWidth={3} className="text-[#16A34A]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobil va planshetda rasm matn ostida */}
      <picture className="xl:hidden">
        <source media="(max-width: 640px)" srcSet="/images/landing-back-mobile.webp" />
        <img
          src="/images/landing-back.webp"
          alt="IQMath platformasi"
          className="w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(37,99,235,0.5)]"
        />
      </picture>
    </Container>

    {/* Statistika */}
    <Container className="relative pb-10 xl:-mt-14">
      <div className="grid grid-cols-2 gap-y-6 rounded-3xl border border-white bg-white/90 px-6 py-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur md:grid-cols-4 md:px-10">
        {c.stats.map((stat, index) => {
          const Icon = STAT_ICONS[index]
          return (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#2563EB]">
                <Icon size={22} />
              </span>
              <span>
                <span className="block text-2xl font-extrabold text-[#0B1B3F]">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-[#64748B]">{stat.label}</span>
              </span>
            </div>
          )
        })}
      </div>
    </Container>
  </section>
)

/* ------------------------------------------------------------------ */
/* Ota-onalar uchun natijalar                                         */
/* ------------------------------------------------------------------ */

const BARS = [28, 38, 46, 58, 70, 84]

export const ResultsSection = ({ c }) => (
  <section id="results" className="scroll-mt-20 bg-white py-16 md:py-24">
    <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
        {/* Grafik */}
        <div className="rounded-3xl border border-[#EEF2F8] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-bold text-[#0B1B3F]">{c.results.chartTitle}</p>
            <span className="rounded-lg bg-[#DCFCE7] px-2 py-0.5 text-xs font-bold text-[#16A34A]">+67%</span>
          </div>
          <div className="flex h-44 items-end gap-3 border-b border-[#EEF2F8] pb-1">
            {BARS.map((height, index) => (
              <div key={index} className="flex h-full flex-1 flex-col items-center justify-end">
                <div
                  className="w-full max-w-[30px] rounded-t-lg bg-gradient-to-t from-[#93C5FD] to-[#2563EB]"
                  style={{ height: `${height + 10}%`, opacity: 0.55 + index * 0.09 }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            {c.results.months.map((month) => (
              <span key={month} className="flex-1 text-center text-[11px] text-[#94A3B8]">
                {month}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#EEF2F8] bg-white p-4 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
              <CircleCheck size={22} />
            </span>
            <span>
              <span className="block text-xs text-[#64748B]">{c.results.correct}</span>
              <span className="text-2xl font-extrabold text-[#0B1B3F]">92%</span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#EEF2F8] bg-white p-4 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
              <BarChart3 size={22} />
            </span>
            <span>
              <span className="block text-xs text-[#64748B]">{c.results.topics}</span>
              <span className="text-2xl font-extrabold text-[#0B1B3F]">24/30</span>
            </span>
          </div>
          <div className="rounded-2xl border border-[#EEF2F8] bg-white p-4 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)]">
            <p className="mb-2 text-sm font-bold text-[#0B1B3F]">{c.results.weak}</p>
            {c.results.weakItems.map((item, index) => (
              <div key={item} className="flex items-center gap-2 py-1 text-xs text-[#475569]">
                <span className={`h-2 w-2 rounded-full ${['bg-[#22C55E]', 'bg-[#F59E0B]', 'bg-[#EF4444]'][index]}`} />
                <span className="flex-1">{item}</span>
                <span className="h-1.5 w-12 overflow-hidden rounded-full bg-[#EEF2F8]">
                  <span
                    className={`block h-full rounded-full ${['bg-[#22C55E]', 'bg-[#F59E0B]', 'bg-[#EF4444]'][index]}`}
                    style={{ width: `${[75, 50, 30][index]}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <SectionTag>{c.results.tag}</SectionTag>
        <SectionTitle className="mt-4">{c.results.title}</SectionTitle>
        <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{c.results.text}</p>
        <PrimaryButton onClick={scrollToId('lead')} className="mt-7">
          {c.results.cta}
          <ArrowRight size={18} />
        </PrimaryButton>
      </Reveal>
    </Container>
  </section>
)

/* ------------------------------------------------------------------ */
/* 3 qadam                                                            */
/* ------------------------------------------------------------------ */

const STEP_ICONS = [UserRound, MonitorPlay, Shapes]

export const HowSection = ({ c }) => (
  <section id="how" className="scroll-mt-20 bg-gradient-to-b from-[#F5F8FF] to-white py-16 md:py-24">
    <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_300px]">
      <Reveal>
        <SectionTag>{c.how.tag}</SectionTag>
        <SectionTitle className="mt-4">{c.how.title}</SectionTitle>
        <p className="mt-2 text-[17px] text-[#475569]">{c.how.subtitle}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {c.how.steps.map((step, index) => {
            const Icon = STEP_ICONS[index]
            return (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.9)]">
                    {index + 1}
                  </span>
                  <Icon size={30} className="text-[#2563EB]" strokeWidth={1.8} />
                  {index < 2 ? (
                    <span className="hidden flex-1 border-t-2 border-dashed border-[#BFD3FF] md:block" />
                  ) : null}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0B1B3F]">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{step.text}</p>
              </div>
            )
          })}
        </div>
      </Reveal>
      <Reveal delay={150} className="hidden lg:block">
        <ClipboardArt className="w-full drop-shadow-[0_25px_30px_rgba(37,99,235,0.18)]" />
      </Reveal>
    </Container>
  </section>
)

/* ------------------------------------------------------------------ */
/* Fanlar                                                             */
/* ------------------------------------------------------------------ */

const SUBJECT_STYLE = [
  { Art: CubesArt, bg: 'from-[#EEF4FF] to-[#DCE8FF]', accent: '#2563EB', button: 'bg-[#2563EB] hover:bg-[#1D4ED8]' },
  { Art: InfinityArt, bg: 'from-[#F4F0FF] to-[#E6DCFF]', accent: '#7C3AED', button: 'bg-[#7C3AED] hover:bg-[#6D28D9]' },
  { Art: PyramidArt, bg: 'from-[#EEF6FF] to-[#D8EBFF]', accent: '#0284C7', button: 'bg-[#0284C7] hover:bg-[#0369A1]' }
]

export const SubjectsSection = ({ c }) => (
  <section id="subjects" className="scroll-mt-20 bg-white py-16 md:py-24">
    <Container>
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionTag>{c.subjects.tag}</SectionTag>
          <SectionTitle className="mt-4">{c.subjects.title}</SectionTitle>
          <p className="mt-2 text-[17px] text-[#475569]">{c.subjects.subtitle}</p>
        </div>
        <a
          href="#lead"
          onClick={scrollToId('lead')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-2.5"
        >
          {c.subjects.all}
          <ArrowRight size={16} />
        </a>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {c.subjects.items.map((item, index) => {
          const { Art, bg, accent, button } = SUBJECT_STYLE[index]
          return (
            <Reveal key={item.name} delay={index * 100}>
              <div
                className={`group relative flex min-h-[230px] overflow-hidden rounded-3xl bg-gradient-to-br ${bg} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(37,99,235,0.6)]`}
              >
                <div className="relative z-10 flex max-w-[55%] flex-col">
                  <h3 className="text-2xl font-extrabold text-[#0B1B3F]">{item.name}</h3>
                  <span className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                    {item.grades}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{item.text}</p>
                  <button
                    type="button"
                    onClick={scrollToId('lead')}
                    className={`mt-auto inline-flex h-10 w-fit items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white transition ${button}`}
                  >
                    {c.subjects.cta}
                    <ArrowRight size={15} />
                  </button>
                </div>
                <Art className="pointer-events-none absolute -right-4 bottom-0 w-[55%] transition duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
              </div>
            </Reveal>
          )
        })}
      </div>
    </Container>
  </section>
)
