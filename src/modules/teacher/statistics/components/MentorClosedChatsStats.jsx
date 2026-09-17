import { useEffect, useState } from 'react'
import { MessageSquare, TrendingUp, Star, Calendar, Clock, BarChart3, ChevronDown } from 'lucide-react'
import { request } from '@/services/api'
import { useTranslation } from 'react-i18next'

const formatDate = (date) =>
  date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')

const MentorClosedChatsStats = () => {
  const { t } = useTranslation()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request
      .get('/api/v1/func_chat/teacher/closed-chats-stats/')
      .then((res) => setData(res?.data))
      .finally(() => setLoading(false))

    // Simulated data for demo
    // setTimeout(() => {
    //   setData({
    //     today: { closed_chats_count: 12, average_rating: 4.8 },
    //     week: { closed_chats_count: 45, average_rating: 4.7 },
    //     month: { closed_chats_count: 156, average_rating: 4.6 },
    //     year: { closed_chats_count: 1240, average_rating: 4.5 },
    //     total: { closed_chats_count: 2580, average_rating: 4.6 }
    //   })
    //   setLoading(false)
    // }, 500)
  }, [])

  const STAT_ITEMS = [
    { key: 'today', label: t('today'), icon: Clock, accent: '#5D87FF', tint: 'bg-[#EFF4FF]' },
    { key: 'week', label: t('week'), icon: Calendar, accent: '#EC4899', tint: 'bg-[#FFF0F6]' },
    { key: 'month', label: t('monthly'), icon: TrendingUp, accent: '#13B981', tint: 'bg-[#ECFDF5]' },
    { key: 'year', label: t('yearly'), icon: BarChart3, accent: '#FF8A00', tint: 'bg-[#FFF6EC]' },
    { key: 'total', label: t('total'), icon: MessageSquare, accent: '#8B5CF6', tint: 'bg-[#F6F1FF]' }
  ]

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 dark:bg-[#2A3547] rounded-lg animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-[#2A3547] rounded w-60 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-[#2A3547] h-28 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2A3547] dark:text-white">{t('chatsResponsed')}</h3>
            <p className="text-xs text-[#7C8FAC]">{t('chatsResponsedSub')}</p>
          </div>
        </div>

        {/* Hozircha faqat vizual — API bu oraliqni parametr sifatida qabul
            qilmaydi, shu sababli filtrlamaydi, joriy oyni ko'rsatadi. */}
        <div className="flex items-center gap-2 rounded-xl border border-[#E9E9E9] dark:border-[#232D3A] bg-white dark:bg-[#202936] px-3.5 py-2 text-sm text-[#5A6A85]">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(monthStart)} - {formatDate(now)}
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {STAT_ITEMS.map((item) => {
          const Icon = item.icon
          const count = data?.[item.key]?.closed_chats_count ?? 0
          const rating = data?.[item.key]?.average_rating ?? 0

          return (
            <div
              key={item.key}
              className={`group relative overflow-hidden rounded-2xl border border-black/5 dark:border-[#232D3A] ${item.tint} dark:bg-[#202936] p-3 sm:p-4 transition-transform duration-300 hover:-translate-y-1`}
            >
              <Icon
                className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 opacity-10 sm:h-20 sm:w-20"
                style={{ color: item.accent }}
                strokeWidth={1.5}
              />

              <div className="relative flex items-center justify-between mb-2 sm:mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm sm:h-9 sm:w-9"
                  style={{ backgroundColor: item.accent }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-[#A3AED0] uppercase">
                  {item.label}
                </span>
              </div>

              <p className="relative mb-1 text-xl sm:text-2xl font-bold text-[#2A3547] dark:text-white">{count}</p>

              <div className="relative flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-[#7C8FAC]">{rating ? rating : '—'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MentorClosedChatsStats
