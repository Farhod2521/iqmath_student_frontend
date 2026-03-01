import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const NewsSingle = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const { id } = router.query

  const { data: item, isLoading } = useGetQuery({
    key: [KEYS.news, id],
    url: `${URLS.newsTotal}${id}/`,
    enabled: !!id
  })
  const data = item?.data ?? item

  const currentLang = i18n.language?.slice(0, 2) === 'ru' ? 'ru' : 'uz'

  const title = useMemo(() => {
    if (!data) return ''
    return currentLang === 'ru' ? data.title_ru : data.title_uz
  }, [data, currentLang])

  const text = useMemo(() => {
    if (!data) return ''
    return currentLang === 'ru' ? data.text_ru : data.text_uz
  }, [data, currentLang])

  if (isLoading) return null
  if (!data) return null

  console.log('RAW data:', data)

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Rasm */}
      {data?.image && (
        <Box
          component="img"
          src={data.image}
          alt={title}
          sx={{
            width: '100%',
            borderRadius: 3,
            mb: 4,
            objectFit: 'cover'
          }}
        />
      )}

      {/* Sarlavha */}
      <Typography variant="h4" fontWeight={700} mb={2}>
        {title}
      </Typography>

      {/* Sana */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        {dayjs(data.created_at).format('DD MMMM YYYY, HH:mm')}
      </Typography>

      {/* Video (agar bo‘lsa) */}
      {data?.video && (
        <Box mb={4}>
          <video src={data.video} controls style={{ width: '100%', borderRadius: 12 }} />
        </Box>
      )}

      {/* To‘liq matn (HTML) */}
      <Box
        sx={{
          lineHeight: 1.8,
          fontSize: '1.05rem',
          '& p': { mb: 2 }
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Container>
  )
}

export default NewsSingle
