export const CARD =
  'bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-5'
export const CARD_TITLE = 'text-base font-semibold text-[#2A3547] dark:text-white'

// Kategorik ranglar — doim shu tartibda (validatordan o'tgan)
export const COLORS = {
  blue: '#4F7CFF',
  teal: '#0FB39A',
  purple: '#9B5DE5',
  orange: '#F59E0B',
  gray: '#94A3B8'
}
export const SERIES = [COLORS.blue, COLORS.teal, COLORS.purple, COLORS.orange, COLORS.gray]

export const PERIODS = [
  { key: 'today', label: 'Bugun', previous: 'Kecha' },
  { key: '7d', label: '7 kun', previous: 'Oldingi 7 kun' },
  { key: '30d', label: '30 kun', previous: 'Oldingi 30 kun' },
  { key: '90d', label: '3 oy', previous: 'Oldingi 3 oy' },
  { key: '365d', label: '1 yil', previous: 'Oldingi yil' }
]

export const fmt = (n) => (Number(n) || 0).toLocaleString('ru-RU').replace(/,/g, ' ')

export const deltaPercent = (value, previous) => {
  if (previous === undefined || previous === null) return null
  if (!previous) return value ? 100 : 0
  return Math.round(((value - previous) / previous) * 1000) / 10
}

const MONTHS = ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek']
const MONTHS_FULL = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
]

export const formatLongDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  return `${d.getFullYear()}-yil ${d.getDate()}-${MONTHS_FULL[d.getMonth()]}`
}

export const shortDate = (iso) => {
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export const shortMonth = (iso) => {
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`)
  return `${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`
}

let regionNames
export const countryName = (code, fallback) => {
  if (!code || code === 'unknown') return "Aniqlanmagan"
  try {
    regionNames = regionNames || new Intl.DisplayNames(['uz'], { type: 'region' })
    return regionNames.of(code) || fallback || code
  } catch {
    return fallback || code
  }
}

export const flagUrl = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`

// Sahifa marshrutlari (Next.js pathname) uchun tushunarli nomlar
const PAGE_TITLES = {
  '/': 'Bosh sahifa',
  '/auth/login': 'Kirish',
  '/auth/register': "Ro'yxatdan o'tish",
  '/prices': 'Narxlar',
  '/about': 'Biz haqimizda',
  '/faqs': 'Savol-javoblar',
  '/news': 'Yangiliklar',
  '/dashboard/student/home': "O'quvchi bosh sahifasi",
  '/dashboard/student/subjects': 'Fanlar',
  '/dashboard/student/diagnostics': 'Diagnostika',
  '/dashboard/student/battle': 'Bellashuv',
  '/dashboard/student/products': 'Mahsulotlar',
  '/dashboard/student/profile': 'Profil',
  '/dashboard/student/chat': 'Chat',
  '/dashboard/library': 'Kutubxona'
}

export const pageTitle = (path) => {
  if (PAGE_TITLES[path]) return PAGE_TITLES[path]
  const match = Object.keys(PAGE_TITLES)
    .filter((p) => p !== '/' && path.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0]
  return match ? `${PAGE_TITLES[match]} (ichki)` : null
}
