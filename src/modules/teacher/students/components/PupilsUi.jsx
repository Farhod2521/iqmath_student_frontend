import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown } from 'lucide-react'

/** Foydalanuvchilar sahifasining yangi matnlari (uz/ru) */
const TEXTS = {
  uz: {
    subtitle: "Platformadagi barcha foydalanuvchilar ro'yxati va statistikasi",
    today: 'Bugun',
    totalStudents: "Jami o'quvchilar",
    activeStudents: "Faol o'quvchilar",
    parents: 'Ota-onalar',
    tutors: "O'qituvchilar",
    mentors: 'Mentorlar',
    share: 'ulush',
    totalUsers: 'Jami {count} ta foydalanuvchi',
    perPage: '{count} tadan',
    dailyTasks: 'Kunlik vazifalar',
    dailyTask: 'Kunlik vazifa',
    registered: "Ro'yxatdan o'tgan",
    lastLogin: 'Oxirgi kirish',
    empty: 'Foydalanuvchilar topilmadi',
    emptyHint: "Filtrlarni o'zgartirib ko'ring",
    filters: 'Filtrlar',
    registeredDate: "Ro'yxatdan o'tgan sana",
    dateFrom: 'dan',
    dateTo: 'gacha',
    yesterday: 'Kecha',
    last7: '7 kun',
    last30: '30 kun',
    thisMonth: 'Shu oy',
    language: 'Tili',
    device: 'Qurilma',
    resetFilters: 'Tozalash',
    close: 'Yopish',
    allShort: 'Hammasi',
    children: 'Farzandlari',
    childrenPending: '{count} tasi tasdiqlanmagan',
    broughtStudents: "Olib kelgan o'quvchilar",
    inGroups: 'Guruhlarda: {count}',
    pcs: '{count} ta'
  },
  ru: {
    subtitle: 'Список и статистика всех пользователей платформы',
    today: 'Сегодня',
    totalStudents: 'Всего учеников',
    activeStudents: 'Активные ученики',
    parents: 'Родители',
    tutors: 'Учителя',
    mentors: 'Менторы',
    share: 'доля',
    totalUsers: 'Всего {count} пользователей',
    perPage: 'по {count}',
    dailyTasks: 'Ежедневные задания',
    dailyTask: 'Ежедн. задание',
    registered: 'Регистрация',
    lastLogin: 'Последний вход',
    empty: 'Пользователи не найдены',
    emptyHint: 'Попробуйте изменить фильтры',
    filters: 'Фильтры',
    registeredDate: 'Дата регистрации',
    dateFrom: 'с',
    dateTo: 'по',
    yesterday: 'Вчера',
    last7: '7 дней',
    last30: '30 дней',
    thisMonth: 'Этот месяц',
    language: 'Язык',
    device: 'Устройство',
    resetFilters: 'Сбросить',
    close: 'Закрыть',
    allShort: 'Все',
    children: 'Дети',
    childrenPending: '{count} не подтверждено',
    broughtStudents: 'Привёл учеников',
    inGroups: 'В группах: {count}',
    pcs: '{count}'
  }
}

export const usePupilsText = () => {
  const { i18n } = useTranslation()
  const dict = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']
  return (key, args = {}) =>
    Object.entries(args).reduce((text, [name, value]) => text.replace(`{${name}}`, value), dict[key] ?? key)
}

/** Raqamni "10 248" ko'rinishida */
export const formatNumber = (value) => Number(value || 0).toLocaleString('ru-RU')

/**
 * Ochiladigan filtr (rasmdagi kabi): tugma + ro'yxat, tanlangan qator ko'k.
 * onChange avvalgi SelectBox bilan mos — { target: { value } } qaytaradi.
 */
export const FilterSelect = ({ label, options, value, onChange, className = '' }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find((option) => String(option.value) === String(value))
  const isDefault = !selected || selected.value === '' || selected.value === 'all'

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 text-sm font-medium transition ${
          open
            ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
            : 'border-[#E3E8F1] hover:border-[#C9D4E8]'
        } ${isDefault ? 'text-[#5B6478]' : 'text-[#0F1B3D]'}`}
      >
        <span className="truncate">{isDefault ? label : selected.label}</span>
        <ChevronDown size={16} className={`shrink-0 text-[#6B7385] transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <ul className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-72 min-w-full overflow-y-auto rounded-xl border border-[#E3E8F1] bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(15,27,61,0.35)]">
          {options.map((option) => {
            const active = String(option.value) === String(value)
            return (
              <li key={`${option.value}`}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onChange({ target: { value: option.value } })
                  }}
                  className={`flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition ${
                    active ? 'bg-[#2563EB] font-semibold text-white' : 'text-[#191C1D] hover:bg-[#F1F5FF]'
                  }`}
                >
                  {option.label}
                  {active ? <Check size={14} /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

const AVATAR_COLORS = [
  'bg-[#FEE2E2] text-[#DC2626]',
  'bg-[#EDE9FE] text-[#7C3AED]',
  'bg-[#DBEAFE] text-[#2563EB]',
  'bg-[#DCFCE7] text-[#16A34A]',
  'bg-[#FEF3C7] text-[#D97706]',
  'bg-[#FCE7F3] text-[#DB2777]',
  'bg-[#E0F2FE] text-[#0284C7]'
]

/** Ism bosh harfi bilan rangli avatar (rang ism bo'yicha doimiy) */
export const Avatar = ({ name = '' }) => {
  const text = String(name).trim()
  const hash = [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        AVATAR_COLORS[hash % AVATAR_COLORS.length]
      }`}
    >
      {(text[0] || '?').toUpperCase()}
    </span>
  )
}

/** Kichik bayroq: UZ — ko'k/oq/yashil, RU — oq/ko'k/qizil */
export const LangFlag = ({ lang }) => {
  const code = String(lang || '').toLowerCase()
  const stripes =
    code === 'ru' ? ['#FFFFFF', '#1C57A5', '#D52B1E'] : code === 'uz' ? ['#1EB5E8', '#FFFFFF', '#1EB53A'] : null
  if (!stripes) return null
  return (
    <span className="flex h-3.5 w-5 shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-black/10">
      {stripes.map((color) => (
        <span key={color} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </span>
  )
}

/** Statistika kartasi: ikonka, nom, son, ulush va bezak ustunlar */
export const StatCard = ({ icon: Icon, label, value, share, theme, loading }) => (
  <div className={`relative overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_10px_30px_-24px_rgba(15,27,61,0.45)] ${theme.border}`}>
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.wash}`} />
    <div className="relative flex items-start gap-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${theme.icon}`}>
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-[#5B6478]">{label}</p>
        {loading ? (
          <span className="mt-1.5 block h-7 w-16 animate-pulse rounded-lg bg-[#EEF1F6]" />
        ) : (
          <p className="text-[24px] font-extrabold leading-tight text-[#0F1B3D]">{formatNumber(value)}</p>
        )}
      </div>
    </div>
    <div className="relative mt-3 flex items-end justify-between gap-2">
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${theme.badge}`}>{share}</span>
      <span className="flex h-8 items-end gap-[3px]" aria-hidden="true">
        {[35, 50, 45, 65, 80, 100].map((height, index) => (
          <span
            key={index}
            className={`w-[5px] rounded-full ${theme.bar}`}
            style={{ height: `${height}%`, opacity: 0.35 + index * 0.13 }}
          />
        ))}
      </span>
    </div>
  </div>
)
