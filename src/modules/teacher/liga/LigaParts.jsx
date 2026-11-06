import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Trophy } from 'lucide-react'
import { BUTTON_LIGHT, TEST_STATUS, TH } from './utils'

const HERO_MASK = 'linear-gradient(to right, transparent, #000 14%)'
const PICKER = '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0'
const FIELD = `relative h-11 w-full rounded-xl border border-[#E8ECF3] bg-white pl-10 pr-3 text-sm text-[#191C1D] outline-none transition focus:border-[#5D87FF] disabled:bg-[#F5F6F8] disabled:text-[#8A8A8E] ${PICKER}`

const STATUS_COLORS = {
  draft: 'bg-[#F1F4F9] text-[#64748B]',
  upcoming: 'bg-[#FFF4DE] text-[#B7791F]',
  live: 'bg-[#DFF7EA] text-[#15803D]',
  finished: 'bg-[#E6EFFF] text-[#3B66E0]'
}

export const LigaHero = ({ image, width, height, title, subtitle, backHref }) => (
  <div className="relative -mx-3 -mt-3 min-h-[116px] overflow-hidden bg-gradient-to-r from-white via-[#F2F7FF] to-[#D5E7FD] sm:-mx-4 sm:-mt-4 sm:min-h-[130px] md:-mx-6 md:-mt-6 xl:-mx-8 xl:-mt-8">
    <svg viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true" className="absolute bottom-0 right-0 hidden h-full w-3/5 md:block">
      <defs>
        <linearGradient id="liga-hero-wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#E3EEFF" />
          <stop offset="1" stopColor="#B5D5FB" />
        </linearGradient>
      </defs>
      <path d="M0 130C120 125 180 40 270 40C360 40 380 85 460 80C520 76 570 40 600 30V130Z" fill="url(#liga-hero-wave)" />
    </svg>
    <Image
      src={image}
      alt=""
      width={width}
      height={height}
      priority
      style={{ WebkitMaskImage: HERO_MASK, maskImage: HERO_MASK }}
      className="absolute bottom-0 right-0 h-full w-[130px] object-cover sm:w-auto sm:max-w-[45%]"
    />
    <div className="relative flex min-h-[116px] flex-col justify-center gap-1 py-4 pl-3 pr-[136px] sm:min-h-[130px] sm:pl-4 sm:pr-[46%] md:pl-6 xl:pl-8">
      {backHref ? (
        <Link href={backHref} className="inline-flex items-center gap-1 self-start text-sm font-medium text-[#475569] transition hover:text-[#191C1D]">
          <ChevronLeft size={16} />
          Liga
        </Link>
      ) : null}
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6EFFF] text-[#5D87FF] sm:h-[62px] sm:w-[62px]">
          <Trophy className="h-6 w-6 sm:h-8 sm:w-8" />
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-[#191C1D] sm:text-[28px] sm:leading-9">{title}</h1>
          <div className="mt-0.5 text-xs text-[#64748B] sm:text-sm">{subtitle}</div>
        </div>
      </div>
    </div>
  </div>
)

export const LigaTable = ({ head, children }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-[#F5F8FD]">
        <tr>
          {head.map((title, index) => (
            <th key={index} className={`${TH} first:rounded-l-lg last:rounded-r-lg`}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&>tr:nth-child(even)]:bg-[#F9FBFE]">{children}</tbody>
    </table>
  </div>
)

export const PAGE_SIZE = 50

export const LigaPager = ({ page, total, onChange }) =>
  total > PAGE_SIZE ? (
    <div className="mt-3 flex items-center justify-end gap-2 text-sm text-[#8A8A8E]">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className={BUTTON_LIGHT}>
        Oldingi
      </button>
      <span>
        {page} / {Math.ceil(total / PAGE_SIZE)}
      </span>
      <button disabled={page * PAGE_SIZE >= total} onClick={() => onChange(page + 1)} className={BUTTON_LIGHT}>
        Keyingi
      </button>
    </div>
  ) : null

export const HeadCell = ({ Icon, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <Icon size={15} />
    {label}
  </span>
)

export const SectionHead = ({ Icon, title, text, children }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EFFF] text-[#5D87FF]">
      <Icon size={20} />
    </span>
    <div className="min-w-0">
      <h3 className="text-base font-bold text-[#191C1D] sm:text-lg">{title}</h3>
      {text ? <p className="text-xs text-[#64748B] sm:text-sm">{text}</p> : null}
    </div>
    {children}
  </div>
)

/** Chap tomonida ikonkasi bor maydon: children berilsa select bo'ladi */
export const IconField = ({ label, Icon, children, ...props }) => (
  <label className="flex min-w-0 flex-col gap-1.5 text-sm text-[#475569]">
    {label}
    <span className="relative block">
      <Icon size={18} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#64748B]" />
      {children ? (
        <select {...props} className={FIELD}>
          {children}
        </select>
      ) : (
        <input {...props} className={FIELD} />
      )}
    </span>
  </label>
)

export const StatusPill = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {TEST_STATUS[status]}
  </span>
)
