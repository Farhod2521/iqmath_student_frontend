import { useState } from 'react'
import { LuCalendar, LuEllipsis, LuLink, LuMonitor, LuMousePointerClick, LuSearch, LuSend, LuShare2, LuSmartphone, LuTablet } from 'react-icons/lu'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import StatCards from './components/StatCards'
import VisitsChart from './components/VisitsChart'
import RegionMap from './components/RegionMap'
import DonutCard from './components/DonutCard'
import BarList from './components/BarList'
import TopPages from './components/TopPages'
import NewUsersChart from './components/NewUsersChart'
import { COLORS, PERIODS, countryName, flagUrl, formatLongDate } from './utils'

const DEVICE_META = {
  mobile: { label: 'Mobil telefon', color: COLORS.blue, icon: <LuSmartphone /> },
  desktop: { label: 'Kompyuter', color: COLORS.purple, icon: <LuMonitor /> },
  tablet: { label: 'Planshet', color: COLORS.orange, icon: <LuTablet /> },
  other: { label: 'Boshqalar', color: COLORS.gray, icon: <LuEllipsis /> }
}

const SOURCE_META = {
  direct: { label: "To'g'ridan-to'g'ri (Direct)", color: COLORS.blue, icon: <LuMousePointerClick /> },
  search: { label: 'Qidiruv tizimlari (Google, Yandex)', color: COLORS.teal, icon: <LuSearch /> },
  social: { label: 'Ijtimoiy tarmoqlar', color: COLORS.purple, icon: <LuShare2 /> },
  telegram: { label: 'Telegram', color: '#229ED9', icon: <LuSend /> },
  referral: { label: 'Boshqa saytlardan', color: COLORS.orange, icon: <LuLink /> }
}

const USER_TYPE_META = {
  student: { label: "O'quvchilar", color: COLORS.blue },
  tutor: { label: "O'qituvchilar", color: COLORS.purple },
  parent: { label: 'Ota-onalar', color: COLORS.orange },
  teacher: { label: 'Mentorlar', color: COLORS.teal },
  other: { label: 'Boshqalar', color: COLORS.gray }
}

const TOP_COUNTRIES = 6

const todayIso = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

const SiteStatistics = () => {
  const [period, setPeriod] = useState('today')
  const [date, setDate] = useState(todayIso)

  const { data, isLoading, isFetching, isError } = useGetQuery({
    key: KEYS.siteStatistics,
    url: URLS.siteStatistics,
    params: { period, date },
    refetchOnWindowFocus: true
  })
  const stats = data?.data
  const periodMeta = PERIODS.find((p) => p.key === period)

  const devices = (stats?.devices?.items || []).map((d) => ({ ...d, ...(DEVICE_META[d.key] || DEVICE_META.other) }))
  const sources = (stats?.sources?.items || []).map((s) => ({ ...s, ...(SOURCE_META[s.key] || SOURCE_META.referral) }))
  const userTypes = (stats?.user_types?.items || []).map((u) => ({ ...u, ...USER_TYPE_META[u.key] }))

  // Davlatlar: eng ko'p 6 tasi + qolganlari "Boshqa davlatlar"
  const countryItems = stats?.countries?.items || []
  const countries = countryItems.slice(0, TOP_COUNTRIES).map((c) => ({
    key: c.key,
    label: countryName(c.key, c.name),
    count: c.count,
    percent: c.percent,
    color: c.key === 'UZ' ? COLORS.blue : '#9DB6FF',
    icon:
      c.key === 'unknown' ? (
        <LuEllipsis />
      ) : (
        <img src={flagUrl(c.key)} alt={c.key} width={20} height={14} className="rounded-[2px] object-cover shadow-sm" />
      )
  }))
  const restCountries = countryItems.slice(TOP_COUNTRIES)
  if (restCountries.length) {
    countries.push({
      key: 'rest',
      label: 'Boshqa davlatlar',
      count: restCountries.reduce((s, c) => s + c.count, 0),
      percent: Math.round(restCountries.reduce((s, c) => s + c.percent, 0) * 10) / 10,
      color: COLORS.gray,
      icon: <LuEllipsis />
    })
  }

  return (
    <div className="font-sf">
      {/* Sarlavha va filtrlar */}
      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2A3547] dark:text-white">Sayt statistikasi</h1>
          <p className="text-sm text-[#5A6A85] dark:text-[#7C8FAC]">iqmath.uz platformasining umumiy ko'rsatkichlari</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex items-center gap-2 rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-sm text-[#2A3547] dark:border-[#2A3447] dark:bg-[#202936] dark:text-white">
            <LuCalendar className="text-[#5A6A85]" />
            <span>{formatLongDate(date)}</span>
            <input
              type="date"
              value={date}
              max={todayIso()}
              onChange={(e) => e.target.value && setDate(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Sanani tanlash"
            />
          </label>

          <div className="flex overflow-hidden rounded-lg border border-[#E9E9E9] bg-white dark:border-[#2A3447] dark:bg-[#202936]">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPeriod(p.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  period === p.key
                    ? 'bg-[#4F7CFF] text-white'
                    : 'text-[#5A6A85] hover:bg-[#F6F8FB] dark:text-[#AAB7CF] dark:hover:bg-[#2A3447]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
        </div>
      ) : isError ? (
        <div className="flex h-[60vh] items-center justify-center text-[#5A6A85]">Sahifani qayta yuklang!</div>
      ) : (
        <div className={`transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          <StatCards cards={stats?.cards} previousLabel={periodMeta?.previous} />

          <div className="grid grid-cols-1 gap-6 mb-6 2xl:grid-cols-2">
            <VisitsChart data={stats?.timeline} />
            <RegionMap regions={stats?.regions} />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 2xl:grid-cols-3">
            <DonutCard
              title="Qurilmalar bo'yicha"
              items={devices}
              total={stats?.devices?.total}
              centerLabel="tashrifchi"
            />
            <BarList title="Tashrif manbalari" rows={sources} />
            <BarList title="Davlatlar bo'yicha" rows={countries} />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 2xl:grid-cols-3">
            <TopPages pages={stats?.top_pages} />
            <NewUsersChart registrations={stats?.registrations} />
            <DonutCard
              title="Foydalanuvchilar turi"
              items={userTypes}
              total={stats?.user_types?.total}
              centerLabel="foydalanuvchi"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SiteStatistics
