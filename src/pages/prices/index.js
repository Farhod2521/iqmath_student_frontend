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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : data.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative h-full flex flex-col rounded-xl transition-all duration-300 hover:shadow-xl ${
                    item.discount_percent ? 'border-2 border-blue-500' : 'border border-gray-200'
                  }`}
                >
                  {/* PROMO RIBBON */}
                  {idx === 0 && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <span className="absolute top-4 -right-8 rotate-45 bg-orange-500 text-white text-xs font-semibold px-8 py-1 shadow-md flex items-center gap-1">
                        <LocalOfferIcon sx={{ fontSize: 14 }} />
                        Promo
                      </span>
                    </div>
                  )}

                  {/* BEST CHOICE RIBBON */}
                  {idx === 1 && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <span className="absolute top-2 -right-8 rotate-45 bg-green-500 text-white text-xs font-semibold px-8 py-1 shadow-md flex items-center gap-1">
                        <StarIcon sx={{ fontSize: 14 }} />
                        Best
                      </span>
                    </div>
                  )}

                  {/* BODY */}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <CalendarMonthIcon sx={{ fontSize: 20, color: '#5d87ff' }} />
                      {item.get_months_display}
                    </h3>

                    <p className="mt-2 text-gray-600 flex items-center gap-2">
                      <PaymentsIcon sx={{ fontSize: 18 }} />
                      {t('pricePerMonth')}
                    </p>

                    <p className="mt-2 text-2xl font-medium text-gray-900 transition-colors duration-300 hover:text-blue-500">
                      {Number(item.price_per_month).toLocaleString()} so'm
                    </p>

                    {item.discount_percent > 0 && (
                      <>
                        <p className="mt-2 text-gray-500 line-through">
                          {Number(item.sale_price).toLocaleString()} so'm
                        </p>

                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                          <LocalOfferIcon sx={{ fontSize: 16 }} />-{item.discount_percent}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* BUY BUTTON */}
                  <div className="p-4">
                    <button
                      disabled={!item.is_active}
                      onClick={() => handleBuy(item)}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                        item.is_active
                          ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
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
            <p className="text-center text-gray-600 mt-12">{t('noData')}</p>
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
