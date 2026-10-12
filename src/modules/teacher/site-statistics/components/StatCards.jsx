import { LuUsers, LuUserPlus, LuUserCheck, LuCrown, LuEye, LuSparkles } from 'react-icons/lu'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { CARD, deltaPercent, fmt } from '../utils'

const ITEMS = [
  { key: 'visitors', label: 'Jami tashrif buyuruvchilar', icon: LuUsers, tone: 'bg-[#ECF2FF] text-[#4F7CFF]' },
  { key: 'page_views', label: "Sahifa ko'rishlar", icon: LuEye, tone: 'bg-[#E8F7FF] text-[#0EA5E9]' },
  { key: 'new_visitors', label: 'Yangi tashrifchilar', icon: LuSparkles, tone: 'bg-[#FEF5E5] text-[#D97706]' },
  { key: 'registrations', label: "Ro'yxatdan o'tganlar", icon: LuUserPlus, tone: 'bg-[#E6FFFA] text-[#0FB39A]' },
  { key: 'active_users', label: 'Login qilgan foydalanuvchilar', icon: LuUserCheck, tone: 'bg-[#F4ECFF] text-[#9B5DE5]' },
  { key: 'new_subscriptions', label: "Yangi obunalar", icon: LuCrown, tone: 'bg-[#FFF1F2] text-[#E11D48]' }
]

const Delta = ({ value, previous }) => {
  const d = deltaPercent(value, previous)
  if (d === null) return null
  const up = d >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${up ? 'text-[#13A97F]' : 'text-[#E5484D]'}`}>
      {up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      {up ? '+' : ''}
      {d}%
    </span>
  )
}

const StatCards = ({ cards, previousLabel }) => (
  <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
    {ITEMS.map(({ key, label, icon: Icon, tone }) => {
      const item = cards?.[key] || {}
      return (
        <div key={key} className={`${CARD} flex items-start gap-4`}>
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
            <Icon size={24} />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-[#5A6A85] dark:text-[#7C8FAC]">{label}</p>
            <div className="flex flex-wrap items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-[#2A3547] dark:text-white">{fmt(item.value)}</span>
              <Delta value={item.value} previous={item.previous} />
            </div>
            <p className="mt-1 text-xs text-[#7C8FAC]">
              {key === 'new_subscriptions'
                ? `Faol obunachilar: ${fmt(cards?.active_subscribers?.value)}`
                : `${previousLabel}: ${fmt(item.previous)}`}
            </p>
          </div>
        </div>
      )
    })}
  </div>
)

export default StatCards
