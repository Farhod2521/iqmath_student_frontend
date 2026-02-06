import React from 'react'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { request } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { CalendarToday, Update } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const newsApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/app/elon-list/')
    return data
  }
}

const NewsAll = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const { data, isLoading } = useQuery({
    queryKey: ['data-news'],
    queryFn: newsApi.getAll,
    refetchOnWindowFocus: false
  })

  // Til tanlash (keyinchalik context dan olish mumkin)
  const language = i18n.language // yoki 'ru'

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleReadMore = (id) => {
    // router.push(`/news/${id}`)
  }

  if (isLoading) {
    return (
      <Container sx={{ maxWidth: '1300px !important', py: { xs: 6, md: 10 } }}>
        <Typography>Yuklanmoqda...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ maxWidth: '1300px !important', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.12)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease'
                },
                '&:hover::before': {
                  transform: 'scaleX(1)'
                }
              }}
              onClick={() => handleReadMore(item.id)}
            >
              {/* Rasm qismi */}
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={item.image || 'https://via.placeholder.com/800x600?text=No+Image'}
                  alt={language === 'uz' ? item.title_uz : item.title_ru}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.08)'
                    }
                  }}
                />

                {/* Status badge */}
                {item.news_status && (
                  <Chip
                    label="Yangi"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'rgba(102, 126, 234, 0.95)',
                      color: '#fff',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)'
                    }}
                  />
                )}

                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    opacity: 0.6
                  }}
                />
              </Box>

              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 1 }}>
                {/* Sarlavha */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    lineHeight: 1.4,
                    minHeight: 24,
                    color: '#1a202c',
                    mb: 1
                  }}
                >
                  {language === 'uz' ? item.title_uz : item.title_ru}
                </Typography>

                {/* Matn (HTML dan text ga) */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    mb: 3,
                    lineHeight: 1.7
                  }}
                  dangerouslySetInnerHTML={{
                    __html: language === 'uz' ? item.text_uz : item.text_ru
                  }}
                />

                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(item.created_at)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Update sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(item.updated_at)}
                    </Typography>
                  </Box>
                </Box>

                {/* Batafsil tugmasi */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 'auto',
                    py: 1.2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a4493 100%)',
                      boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
                    }
                  }}
                >
                  {t('details')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Agar data bo'sh bo'lsa */}
      {(!data || data.length === 0) && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            Hozircha yangiliklar yo'q
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default NewsAll
