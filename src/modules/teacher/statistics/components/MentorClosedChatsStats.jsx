import { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { MessageSquare, TrendingUp, Star, Calendar, Clock, BarChart3 } from 'lucide-react'
import { request } from '@/services/api'

const STAT_ITEMS = [
  { key: 'today', label: 'Bugun', icon: Clock, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  { key: 'week', label: 'Haftalik', icon: Calendar, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
  { key: 'month', label: 'Oylik', icon: TrendingUp, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
  { key: 'year', label: 'Yillik', icon: BarChart3, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
  { key: 'total', label: 'Jami', icon: MessageSquare, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50' }
]

const MentorClosedChatsStats = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request
      .get('/api/v1/func_chat/teacher/closed-chats-stats/')
      .then((res) => setData(res))
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

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-60 animate-pulse"></div>
        </div>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Grid item xs={12} sm={6} md={2.4} key={i}>
              <div className="bg-gray-200 h-28 rounded-xl animate-pulse"></div>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <Typography variant="h5" fontWeight={700} sx={{ color: '#1a1a1a' }}>
          Mentor javob bergan chatlar
        </Typography>
      </div>

      {/* Stats Grid */}
      <Grid container spacing={2}>
        {STAT_ITEMS.map((item) => {
          const Icon = item.icon
          const count = data?.[item.key]?.closed_chats_count ?? 0
          const rating = data?.[item.key]?.average_rating ?? 0

          return (
            <Grid item xs={12} sm={6} md={2.4} key={item.key}>
              <div className="relative h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-xl hover:shadow-lg hover:-translate-y-1">
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative p-4">
                  {/* Icon & Label */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <Icon className="w-4 h-4 text-gray-700" />
                    </div>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.7rem'
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>

                  {/* Count */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1a1a1a',
                      fontSize: '1.75rem'
                    }}
                  >
                    {count}
                  </Typography>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {rating ? rating.toFixed(1) : '—'}
                    </Typography>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default MentorClosedChatsStats
