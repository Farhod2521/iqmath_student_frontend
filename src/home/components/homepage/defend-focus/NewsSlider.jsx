import { Box, Typography, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const CARD_WIDTH = 320

const NewsSlider = ({ news }) => {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [withTransition, setWithTransition] = useState(true)
  const sliderRef = useRef(null)

  const items = [...news, ...news]

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    setIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    setIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (index === news.length) {
      setTimeout(() => {
        setWithTransition(false)
        setIndex(0)
      }, 600)
    }

    if (index < 0) {
      setTimeout(() => {
        setWithTransition(false)
        setIndex(news.length - 1)
      }, 600)
    } else {
      setWithTransition(true)
    }
  }, [index, news.length])

  const handleLink = (id) => {
    // router.push(`/dashboard/parent/my-children/${id}`)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        // overflow: 'hidden',
        pb: 2,
        overflow: 'visible'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h1" fontWeight={600}>
          Yangiliklar
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/news')}>
          Barchasi
        </Button>
      </Box>
      <Box sx={{ overflow: 'hidden', py: 4 }}>
        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            transform: `translateX(-${index * CARD_WIDTH}px)`,
            transition: withTransition ? 'transform 0.6s ease' : 'none',
            mx: 'auto',
            maxWidth: '1300px'
          }}
        >
          {items.map((item, i) => (
            <Card
              key={`${item.id}-${i}`}
              sx={{
                minWidth: 300,
                mx: 1.5,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all .3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={item.image}
                  sx={{ objectFit: 'cover', borderRadius: '12px', width: '100%' }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 },
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push(`/news/${item.id}`)}
                >
                  Ko‘rish
                </Box>
              </Box>
              <CardContent>
                <Typography
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    fontSize: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                  <Typography variant="caption" color="primary" fontWeight={600}>
                    {item.readTime}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {/* Prev */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: { xs: 'auto', lg: '50%' }, // <1400px pastga, >=1400px markaz
          bottom: { xs: -50, lg: 'auto' }, // <1400px pastga, >=1400px auto
          left: { xs: '30%', lg: -56 }, // <1400px markazga yaqin, >=1400px yonida
          transform: { xs: 'translateX(-50%)', lg: 'translateY(-50%)' },
          bgcolor: '#fff',
          boxShadow: 3,
          zIndex: 20,
          '&:hover': {
            bgcolor: '#2563eb',
            color: '#fff'
          }
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: { xs: 'auto', lg: '50%' },
          bottom: { xs: -50, lg: 'auto' },
          right: { xs: '30%', lg: -56 },
          transform: { xs: 'translateX(50%)', lg: 'translateY(-50%)' },
          bgcolor: '#fff',
          boxShadow: 3,
          zIndex: 20,
          '&:hover': {
            bgcolor: '#2563eb',
            color: '#fff'
          }
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  )
}

export default NewsSlider
