import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Box, Typography, Card, CardContent, Button, Chip, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CategoryIcon from '@mui/icons-material/Category'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { safekidSeeds } from '@/data/gamesData'

const normalizeTitle = (slug = '') => slug.replaceAll('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase())

export default function GamesSection() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()

  const [openAuth, setOpenAuth] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const swiperRef = useRef(null)

  useEffect(() => setIsVisible(true), [])

  const games = useMemo(() => {
    return (safekidSeeds || [])?.map((g) => {
      const img = g.cover || g.image || null
      const imgSrc = img ? (typeof img === 'string' ? img : img.src) : null

      return {
        ...g,
        title: g.title || normalizeTitle(g.slug),
        cover: imgSrc
      }
    })
  }, [])

  const sliderItems = useMemo(() => {
    if (!games?.length) return []
    const MIN = 18
    const out = []
    let dup = 0
    while (out.length < MIN) {
      for (const item of games) {
        out.push({ ...item, __dupId: dup++ })
        if (out.length >= MIN) break
      }
    }
    return out
  }, [games])

  const onPlay = (game) => {
    const returnUrl = `/mental-games/out?to=${encodeURIComponent(game.href)}`
    if (!session) {
      setOpenAuth(true)
      openAuthWithReturn(router, returnUrl, 'signUp')
      return
    }
    window.open(returnUrl, '_blank', 'noopener,noreferrer')
  }

  const onClose = () => {
    setOpenAuth(false)
    closeAuthModal(router)
  }

  const reviveLoopAndAutoplay = () => {
    const sw = swiperRef.current
    if (!sw) return
    try {
      sw.update()
      sw.loopDestroy()
      sw.loopCreate()
      sw.loopFix()
      sw.autoplay?.stop()
      sw.autoplay?.start()
    } catch (e) {}
  }

  const SliderSkeleton = () => (
    <Box
      sx={{
        height: { xs: 260, sm: 320, md: 360 },
        borderRadius: 4,
        background: 'rgba(17,24,39,0.03)',
        border: '1px solid rgba(17,24,39,0.08)',
        overflow: 'hidden'
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
    </Box>
  )

  return (
    <>
      {/* SLIDER SECTION */}
      <Box
        id="games-slider"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFF 100%)'
        }}
      >
        <Container sx={{ maxWidth: '1400px !important', py: { xs: 5, md: 7 }, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 5 }
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                color: '#111827',
                fontSize: { xs: '24px', sm: '2.3rem' },
                lineHeight: 1.15
              }}
            >
              {t('games.section.title')}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                mx: 'auto',
                maxWidth: 620,
                color: 'rgba(17,24,39,0.62)',
                fontWeight: 500,
                fontSize: { xs: 14, sm: 18 }
              }}
            >
              {t('games.hero.subtitle')}
            </Typography>
          </Box>
          {/* slider */}
          {!sliderItems.length ? (
            <SliderSkeleton />
          ) : (
            <Box
              sx={{
                mt: 1.5,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(18px)',
                transition: 'all 0.6s ease'
              }}
            >
              <Swiper
                onSwiper={(sw) => {
                  swiperRef.current = sw
                  setTimeout(reviveLoopAndAutoplay, 120)
                }}
                onResize={() => setTimeout(reviveLoopAndAutoplay, 120)}
                onSlideChangeTransitionEnd={() => {
                  const sw = swiperRef.current
                  if (sw?.autoplay && sw.autoplay.running === false) setTimeout(reviveLoopAndAutoplay, 80)
                }}
                slidesPerView={1.08}
                spaceBetween={12}
                breakpoints={{
                  480: { slidesPerView: 1.3, spaceBetween: 12 },
                  600: { slidesPerView: 1.75, spaceBetween: 14 },
                  900: { slidesPerView: 2.55, spaceBetween: 16 },
                  1200: { slidesPerView: 3.2, spaceBetween: 16 }
                }}
                loop={sliderItems.length > 1}
                loopPreventsSliding={false}
                speed={650}
                autoplay={{
                  delay: 2600,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false
                }}
                observer
                observeParents
                watchOverflow={false}
                modules={[Autoplay]}
                style={{ paddingBottom: '54px' }}
              >
                {sliderItems?.map((g) => (
                  <SwiperSlide key={`${g.slug}-${g.__dupId}`} style={{ height: '100%' }}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        overflow: 'hidden',
                        // border: '1px solid rgba(15,23,42,0.10)',
                        background: 'rgba(255,255,255,0.92)',
                        // backdropFilter: 'blur(10px)',
                        // boxShadow: '0 10px 22px rgba(15,23,42,0.06)',
                        transition: 'all .22s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)'
                          // boxShadow: '0 18px 36px rgba(15,23,42,0.10)',
                          // borderColor: 'rgba(99,102,241,0.24)'
                        }
                      }}
                    >
                      {/* media */}
                      <Box
                        sx={{
                          position: 'relative',
                          height: { xs: 165, sm: 180, md: 195 },
                          flexShrink: 0,
                          overflow: 'hidden',
                          background:
                            'linear-gradient(135deg, rgba(99,102,241,0.20) 0%, rgba(168,85,247,0.16) 60%, rgba(14,165,233,0.14) 100%)'
                        }}
                      >
                        {g.cover ? (
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              backgroundImage: `url(${g.cover})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              transform: 'scale(1.02)'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              display: 'grid',
                              placeItems: 'center',
                              color: 'rgba(15,23,42,0.55)'
                            }}
                          >
                            <Box sx={{ textAlign: 'center' }}>
                              <Box
                                sx={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: 3.2,
                                  display: 'grid',
                                  placeItems: 'center',
                                  background: 'rgba(255,255,255,0.92)',
                                  border: '1px solid rgba(15,23,42,0.10)',
                                  // boxShadow: '0 14px 26px rgba(15,23,42,0.08)',
                                  mx: 'auto'
                                }}
                              >
                                <SportsEsportsIcon sx={{ color: '#6366f1' }} />
                              </Box>
                              <Typography sx={{ mt: 1, fontSize: 12, fontWeight: 900 }}>
                                {t('games.card.noImage')}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(180deg, rgba(15,23,42,0.10) 0%, rgba(15,23,42,0.00) 40%, rgba(15,23,42,0.18) 100%)'
                          }}
                        />

                        {/* badge */}
                        <Box sx={{ position: 'absolute', left: 12, top: 12 }}>
                          <Chip
                            icon={<CategoryIcon sx={{ fontSize: 18 }} />}
                            label={(g.category || 'game').toUpperCase()}
                            sx={{
                              background: 'rgba(255,255,255,0.92)',
                              color: '#0f172a',
                              fontWeight: 900,
                              border: '1px solid rgba(15,23,42,0.10)',
                              '& .MuiChip-icon': { color: '#6366f1' }
                            }}
                          />
                        </Box>
                      </Box>

                      {/* content */}
                      <CardContent
                        sx={{
                          pt: 2,
                          pb: 1.2,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1.1,
                          flexGrow: 1
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: '#0f172a',
                            fontSize: { xs: '1.0rem', sm: '1.06rem' },
                            lineHeight: 1.25,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em'
                          }}
                        >
                          {g.title}
                        </Typography>

                        <Typography sx={{ color: 'rgba(15,23,42,0.55)', fontSize: 13, fontWeight: 700 }}>
                          {t('games.card.subtitle')}
                        </Typography>

                        <Box sx={{ mt: 'auto', pt: 1.2, borderTop: '1px solid rgba(15,23,42,0.08)' }}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<PlayArrowIcon />}
                            onClick={(e) => {
                              e.stopPropagation()
                              onPlay(g)
                            }}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 900,
                              borderRadius: '8px',
                              py: 1.15,
                              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                              // boxShadow: '0 12px 20px rgba(99,102,241,0.22)',
                              // '&:hover': { background: 'linear-gradient(135deg, #585cf0 0%, #9f4ff2 100%)' }
                            }}
                          >
                            {t('games.card.play')}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('/mental-games')}
                  sx={{
                    minWidth: 96,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: 12,
                    px: 2,
                    py: 0.9,
                    background: '#5b8def',
                    boxShadow: 'none',
                    '&:hover': {
                      background: '#4f83e8',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {t('games.section.all')}
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      <AuthModal open={openAuth} onClose={onClose} title={t('auth')}>
        <Auth />
      </AuthModal>
    </>
  )
}
