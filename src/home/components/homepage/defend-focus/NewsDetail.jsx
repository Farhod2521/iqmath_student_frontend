// HomePage.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Box, Typography, Card, CardContent, Button, Chip, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ZapIcon from '@mui/icons-material/Bolt'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { request } from '@/services/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/shared/utils'

const newsApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/app/elon-list/')
    return data
  }
}

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const swiperRef = useRef(null)

  const {
    data: newsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['data-news'],
    queryFn: newsApi.getAll,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 2
  })

  useEffect(() => setIsVisible(true), [])

  // ✅ LOOP barqaror bo‘lishi uchun: yetarli slide + unique key (dupId)
  const sliderItems = useMemo(() => {
    if (!newsData?.length) return []
    const MIN = 18 // 1200 breakpoint'da slidesPerView=3 -> loop uchun yaxshi zaxira
    const out = []
    let dup = 0

    while (out.length < MIN) {
      for (const item of newsData) {
        out.push({ ...item, __dupId: dup++ })
        if (out.length >= MIN) break
      }
    }
    return out
  }, [newsData])

  const handleNewsClick = (newsId) => {
    router.push('/news')
    // agar detail route bo‘lsa:
    // router.push(`/news/${newsId}`)
  }

  const SliderSkeleton = () => (
    <Box
      sx={{
        height: { xs: 240, sm: 300, md: 360 },
        borderRadius: 4,
        background: 'rgba(0,0,0,0.03)',
        border: '1px solid rgba(17,24,39,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" sx={{ borderRadius: 4 }} />
    </Box>
  )

  const reviveLoopAndAutoplay = () => {
    const sw = swiperRef.current
    if (!sw) return
    try {
      sw.update()
      // loop ba’zan “stuck” bo‘ladi — qayta yaratib yuboramiz
      sw.loopDestroy()
      sw.loopCreate()
      sw.loopFix()
      sw.autoplay?.stop()
      sw.autoplay?.start()
    } catch (e) {}
  }

  if (isError) {
    return (
      <Box
        sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}
      >
        <Box sx={{ textAlign: 'center', color: '#111827', px: 2 }}>
          <ErrorOutlineIcon sx={{ fontSize: 70, color: '#ef4444', mb: 2 }} />
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
            Xatolik yuz berdi
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'rgba(17,24,39,0.7)' }}>
            Yangiliklar yuklanmadi. Iltimos, qaytadan urinib ko'ring.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              px: 4,
              py: 1.3,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 800
            }}
          >
            Qayta yuklash
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      id="news-detail"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F6F7FF 0%, #FFFFFF 45%, #F7FAFF 100%)',
        minHeight: '50vh'
      }}
    >
      <div className="py-10 md:py-16">
        {/* Soft background */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -120,
              right: -120,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 72%)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -140,
              left: -140,
              width: 420,
              height: 420,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 72%)'
            }}
          />
        </Box>

        <Container
          sx={{
            maxWidth: '1400px !important',
            py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' },
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 0 },
              mb: 1
            }}
          >
            <Typography variant="h1" fontWeight={600} sx={{ fontSize: { xs: '1.4rem', sm: '2rem' } }}>
              {t('news')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/news')}
              sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 800 }}
            >
              {t('allNews')}
            </Button>
          </Box>

          {/* Slider */}
          {isLoading ? (
            <SliderSkeleton />
          ) : (
            <Box
              sx={{
                mt: 2,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(18px)',
                transition: 'all 0.6s ease'
              }}
            >
              <Swiper
                onSwiper={(sw) => {
                  swiperRef.current = sw
                  // mount bo‘lganda loop/autoplay 100% ishga tushsin
                  setTimeout(reviveLoopAndAutoplay, 120)
                }}
                onResize={() => setTimeout(reviveLoopAndAutoplay, 120)}
                onSlideChangeTransitionEnd={() => {
                  const sw = swiperRef.current
                  if (sw?.autoplay && sw.autoplay.running === false) setTimeout(reviveLoopAndAutoplay, 80)
                }}
                slidesPerView={1.05}
                spaceBetween={12}
                breakpoints={{
                  480: { slidesPerView: 1.2, spaceBetween: 12 },
                  600: { slidesPerView: 1.6, spaceBetween: 14 },
                  900: { slidesPerView: 2.4, spaceBetween: 16 },
                  1200: { slidesPerView: 3, spaceBetween: 16 }
                }}
                loop={sliderItems.length > 1}
                loopPreventsSliding={false}
                speed={650}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false
                }}
                observer
                observeParents
                watchOverflow={false}
                modules={[Autoplay]}
                style={{ paddingBottom: 0 }}
              >
                {sliderItems.map((news) => (
                  <SwiperSlide key={`${news.id}-${news.__dupId}`} style={{ height: '100%' }}>
                    <Card
                      onClick={() => handleNewsClick(news.id)}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid rgba(17,24,39,0.08)',
                        background: '#fff',
                        boxShadow: '0 6px 16px rgba(17,24,39,0.06)',
                        transition: 'all .2s ease',
                        '&:hover': {
                          boxShadow: '0 10px 24px rgba(17,24,39,0.10)',
                          borderColor: 'rgba(99,102,241,0.25)'
                        }
                      }}
                    >
                      {/* Media (doim bir xil height) */}
                      <Box
                        sx={{
                          position: 'relative',
                          height: { xs: 150, sm: 170, md: 190 },
                          flexShrink: 0,
                          backgroundColor: '#f3f4f6',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${news.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.15) 100%)'
                          }}
                        />
                        <Box sx={{ position: 'absolute', left: 12, top: 12 }}>
                          <Chip
                            icon={<ZapIcon sx={{ fontSize: 18 }} />}
                            label="Yangilik"
                            sx={{
                              background: 'rgba(255,255,255,0.92)',
                              color: '#111827',
                              fontWeight: 800,
                              border: '1px solid rgba(17,24,39,0.10)',
                              '& .MuiChip-icon': { color: '#6366f1' }
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Content (hammasi tekis) */}
                      <CardContent
                        sx={{
                          p: { xs: 2, sm: 2.25 },
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1.2,
                          flexGrow: 1
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: '#111827',
                            fontSize: { xs: '0.95rem', sm: '1.02rem' },
                            lineHeight: 1.25,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em'
                          }}
                        >
                          {i18n.language === 'uz' ? news.title_uz : news.title_ru}
                        </Typography>

                        <Typography
                          sx={{
                            color: 'rgba(17,24,39,0.65)',
                            fontSize: { xs: '0.8rem', sm: '0.85rem' },
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '3em'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: ((i18n.language === 'uz' ? news.text_uz : news.text_ru) || '').replace(
                              /<[^>]+>/g,
                              ''
                            )
                          }}
                        />

                        {/* Bottom row (doim pastda) */}
                        <Box
                          sx={{
                            mt: 'auto',
                            pt: 1.2,
                            borderTop: '1px solid rgba(17,24,39,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1.5
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 18, color: 'rgba(17,24,39,0.45)' }} />
                            <Typography sx={{ fontSize: 13, color: 'rgba(17,24,39,0.55)', fontWeight: 600 }}>
                              {formatDate(news.created_at)}
                            </Typography>
                          </Box>

                          <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 800,
                              borderRadius: 999,
                              px: 2,
                              py: 0.7,
                              fontSize: { xs: '0.8rem', sm: '0.85rem' },
                              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                              boxShadow: '0 10px 20px rgba(99,102,241,0.25)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #585cf0 0%, #9f4ff2 100%)'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNewsClick(news.id)
                            }}
                          >
                            Batafsil
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
        </Container>
      </div>
    </Box>
  )
}

export default HomePage
