import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import LayoutHome from '@/home/Layout'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Prices() {
  const theme = ThemeSettings()
  const { t } = useTranslation()
  const router = useRouter()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
    if (!!session) {
      // keyinchalik payment page yoki modal
      console.log('Selected plan:', plan)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Header */}
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

        {/* Content */}
        <Container maxWidth="lg" sx={{ mt: 4, pb: { xs: 4, lg: 8 } }}>
          {isLoading ? (
            <div className="flex justify-center mt-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : data.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`h-full w-full flex flex-col rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl group ${
                    item.discount_percent ? 'border-2 border-blue-500' : 'border border-gray-200'
                  }`}
                >
                  <div className="flex-1 p-6">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900">{item.get_months_display}</h3>

                    {/* Subtitle */}
                    <p className="mt-2 text-gray-600">{t('pricePerMonth')}</p>

                    {/* Price */}
                    <p className="mt-2 text-2xl font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-500">
                      {Number(item.price_per_month).toLocaleString()} so'm
                    </p>

                    {item.discount_percent > 0 && (
                      <>
                        <p className="mt-2 text-gray-500 line-through">
                          {Number(item.sale_price).toLocaleString()} so'm
                        </p>

                        <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                          -{item.discount_percent}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Buy button */}
                  <div className="p-4">
                    <button
                      disabled={!item.is_active}
                      onClick={() => handleBuy(item)}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 group-hover:scale-[1.02] ${
                        item.is_active
                          ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer'
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

        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Prices
