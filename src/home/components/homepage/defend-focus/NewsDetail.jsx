// HomePage.jsx
import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Skeleton,
  Pagination
} from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SparklesIcon from '@mui/icons-material/AutoAwesome'
import ZapIcon from '@mui/icons-material/Bolt'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination as SwiperPagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { request } from '@/services/api'
import { useTranslation } from 'react-i18next'

const newsApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/app/elon-list/')
    return data
  }
}

const HomePage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const {
    data: newsData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['data-news'],
    queryFn: newsApi.getAll,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 2
  })

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const language = 'uz'

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Bugun'
    if (diffDays === 1) return 'Kecha'
    if (diffDays < 7) return `${diffDays} kun oldin`
    return date.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' })
  }

  // Prepare slider news (minimum 5 items)
  const prepareSliderNews = () => {
    if (!newsData || newsData.length === 0) return []

    let sliderItems = [...newsData]

    // If less than 5, duplicate until we have at least 5
    while (sliderItems.length < 5) {
      sliderItems = [...sliderItems, ...newsData]
    }

    // Take latest 5 news
    return sliderItems.slice(0, 5)
  }

  const sliderNews = prepareSliderNews()

  // Pagination logic
  const totalPages = Math.ceil((newsData?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = newsData?.slice(startIndex, endIndex) || []

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 600, behavior: 'smooth' })
  }

  const handleNewsClick = (newsId) => {
    router.push(`/news`)
  }

  // Loading Skeleton Component
  const SliderSkeleton = () => (
    <Box
      sx={{
        height: { xs: 300, sm: 380, md: 450 },
        borderRadius: 6,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 6 }}
      />
    </Box>
  )

  // Error State
  if (isError) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center', color: '#fff' }}>
          <ErrorOutlineIcon sx={{ fontSize: 80, color: '#FF4785', mb: 2 }} />
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Xatolik yuz berdi
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.7)' }}>
            Yangiliklar yuklanmadi. Iltimos, qaytadan urinib ko'ring.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              background: 'linear-gradient(135deg, #FF4785 0%, #FFC700 100%)',
              px: 4,
              py: 1.5
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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // background: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 50%, #4c1d95 100%)',
        background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 40%, #312e81 100%)',
        minHeight: '50vh'
      }}
    >
      {/* Animated Background Effects */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,71,133,0.3) 0%, transparent 70%)',
            top: '10%',
            left: '70%',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(-50px, 50px) scale(1.1)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,199,0,0.2) 0%, transparent 70%)',
            bottom: '20%',
            left: '10%',
            animation: 'float 15s ease-in-out infinite 5s'
          }}
        />
      </Box>

      <Container
        sx={{
          maxWidth: '1400px !important',
          py: {
            xs: '20px',
            lg: '30px'
          },
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}

        <Box
          sx={{
            textAlign: 'center',
            pb: 2,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {' '}
          {/* <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">{t('PlatCapabilit')}</h2>
            <p className="text-xl text-gray-600">{t('everythingEducation')}</p>
          </div> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: '#f0f0f0',
                fontSize: { xs: '1.7rem', md: '2.25rem' },
                letterSpacing: '-0.02em'
              }}
            >
              Eng So'ngi Yangiliklar
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400
            }}
          >
            IQMath platformasidagi eng dolzarb yangiliklardan xabardor bo'ling
          </Typography>
        </Box>
        {/* News Slider */}
        {isLoading ? (
          <SliderSkeleton />
        ) : (
          <Box
            sx={{
              mb: 2,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true
              }}
              navigation={true}
              modules={[Autoplay, EffectCoverflow, SwiperPagination, Navigation]}
              className="newsSwiper"
              style={{
                paddingBottom: '60px',
                '--swiper-pagination-color': '#FF4785',
                '--swiper-pagination-bullet-inactive-color': '#fff',
                '--swiper-pagination-bullet-inactive-opacity': '0.3',
                '--swiper-navigation-color': '#FF4785',
                '--swiper-navigation-size': '44px'
              }}
            >
              {sliderNews.map((news, index) => (
                <SwiperSlide
                  key={`${news.id}-${index}`}
                  style={{
                    width: '85%',
                    maxWidth: '700px',
                    height: 'auto'
                  }}
                >
                  <Card
                    onClick={() => handleNewsClick(news.id)}
                    sx={{
                      height: { xs: 300, sm: 380, md: 450 },
                      borderRadius: 6,
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-10px) scale(1.02)',
                        border: '2px solid rgba(255,71,133,0.5)',
                        boxShadow: '0 30px 60px rgba(255,71,133,0.3)',
                        '& .news-overlay': {
                          background:
                            'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)'
                        },
                        '& .news-image': {
                          transform: 'scale(1.1)'
                        },
                        '& .arrow-icon': {
                          transform: 'translateX(10px)'
                        }
                      }
                    }}
                  >
                    {/* Background Image */}
                    <Box
                      className="news-image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${news.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1
                      }}
                    />

                    {/* Gradient Overlay */}
                    <Box
                      className="news-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)',
                        transition: 'background 0.5s ease',
                        zIndex: 2
                      }}
                    />

                    {/* Content */}
                    <CardContent
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        p: { xs: 2.5, sm: 3, md: 3.5 }
                      }}
                    >
                      {/* Badge */}
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          icon={<ZapIcon sx={{ fontSize: 18 }} />}
                          label="Yangilik"
                          sx={{
                            background: 'linear-gradient(135deg, #FF4785 0%, #FFC700 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            px: 1,
                            borderRadius: 3,
                            '& .MuiChip-icon': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h4"
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          mb: 1.5,
                          fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.8rem' },
                          lineHeight: 1.3,
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {news.title_uz}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.85)',
                          mb: 2,
                          fontSize: '0.95rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: news.text_uz.replace(/<[^>]+>/g, '')
                        }}
                      />

                      {/* Footer */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.6)' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                            {formatDate(news.created_at)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#FFC700',
                              fontWeight: 700,
                              fontSize: '1rem'
                            }}
                          >
                            Batafsil
                          </Typography>
                          <ArrowForwardIcon
                            className="arrow-icon"
                            sx={{
                              color: '#FFC700',
                              fontSize: 24,
                              transition: 'transform 0.3s ease'
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
        {/* Additional News Grid Section */}
        {newsData && newsData.length > 5 && (
          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#fff',
                mb: 6,
                textAlign: 'center'
              }}
            >
              Boshqa Yangiliklar
            </Typography>
            <Grid container spacing={4}>
              {currentNews.map((news) => (
                <Grid item xs={12} sm={6} md={4} key={news.id}>
                  <Card
                    onClick={() => handleNewsClick(news.id)}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 40px rgba(255,71,133,0.2)',
                        border: '1px solid rgba(255,71,133,0.3)'
                      }
                    }}
                  >
                    <CardMedia component="img" height="200" image={news.image} alt={news.title_uz} />
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#fff',
                          fontWeight: 700,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {news.title_uz}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {formatDate(news.created_at)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.2)',
                      '&:hover': {
                        background: 'rgba(255,71,133,0.2)'
                      }
                    },
                    '& .Mui-selected': {
                      background: 'linear-gradient(135deg, #FF4785 0%, #FFC700 100%) !important',
                      color: '#fff'
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default HomePage
