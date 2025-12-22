import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Box, Breadcrumbs, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material'

import LayoutHome from '@/home/Layout'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// ICONS
import StarIcon from '@mui/icons-material/Star'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import PaymentsIcon from '@mui/icons-material/Payments'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { PricingModal } from '@/modules/student/payment/components'
import toast from 'react-hot-toast'

function Prices() {
  const theme = ThemeSettings()
  const { t } = useTranslation()
  const router = useRouter()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const session = getSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await request.get(URLS.paymentPlans)
      setData(res.data ?? [])
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuy = async (plan) => {
    const session = await getSession()
    if (!session) {
      toast.success("Tarif rejani sotib qolish uchun avval ro'yxatdan o'ting")
      router.push('/')
      return
    }
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlan(null)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* HEADER */}
        <Box py={7} bgcolor="#5d87ff">
          <Typography variant="h5" align="center" color="white" fontWeight={600}>
            {t('prices')}
          </Typography>

          <Box mt={2} display="flex" justifyContent="center">
            <Breadcrumbs sx={{ color: 'white' }}>
              <Link href="/" className="text-white/80 hover:underline">
                {t('homePage')}
              </Link>
              <Typography color="white">{t('prices')}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="lg" sx={{ mt: 4, pb: { xs: 4, lg: 8 } }}>
          {isLoading ? (
            <div className="flex justify-center mt-12">
              <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin" />
            </div>
          ) : data.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data?.map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative cursor-pointer flex flex-col rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                   ${item.discount_percent > 0 ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gray-200'}`}
                >
                  <div className="flex flex-col h-full p-6 rounded-2xl bg-white/95 backdrop-blur">
                    {/* BADGE */}
                    {item.discount_percent > 0 && (
                      <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                        🔥 -{item.discount_percent}%
                      </span>
                    )}

                    {/* TITLE */}
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                      <CalendarMonthIcon sx={{ color: '#5d87ff' }} />
                      {item.months_display}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{t('pricePerMonth')}</p>

                    {/* PRICE */}
                    <div className="mt-4">
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-extrabold text-gray-900">
                          {Number(item.sale_price).toLocaleString()}
                        </span>
                        <span className="mb-1 text-sm text-gray-500">so'm</span>
                      </div>

                      {item.discount_percent > 0 && (
                        <span className="block mt-1 text-sm text-gray-400 line-through">
                          {Number(item.price_per_month).toLocaleString()} so'm
                        </span>
                      )}
                    </div>

                    {/* BENEFITS */}
                    <ul className="flex-1 mt-6 space-y-3">
                      {item.benefits.map((b) => (
                        <li
                          key={b.id}
                          className={`flex items-center gap-2 text-sm ${
                            b.is_selected ? 'text-gray-800' : 'text-gray-400 line-through'
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                ${b.is_selected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                          >
                            {b.is_selected ? '✓' : '✕'}
                          </span>
                          {b.title}
                        </li>
                      ))}
                    </ul>

                    {/* BUTTON */}
                    <button
                      disabled={!item.is_active}
                      onClick={() => handleBuy(item)}
                      className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all
          ${
            item.is_active
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
                    >
                      {item.is_active ? t('buy') : t('notAvailable')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-gray-600">{t('noData')}</p>
          )}
        </Container>
        <PricingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          originalPrice={selectedPlan?.price_per_month || 0}
        />
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Prices
