import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const KeyMetric = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemSettings)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const settings = res.data[0]
          setData(settings)
        }
      })
      .catch((error) => {
        console.error('Error fetching social links:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <Box
      sx={{
        paddingTop: { xs: '40px', lg: '90px' },
        paddingBottom: { xs: '40px', lg: '90px' }
        // boxShadow: (theme) => theme.shadows[10]
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          {loading ? (
            <></>
          ) : (
            <Typography
              lineHeight={1.9}
              textAlign="justify"
              component="div"
              sx={{
                '& p': {
                  marginBottom: '15px',
                  marginTop: 0
                }
              }}
              dangerouslySetInnerHTML={{
                __html: language === 'uz' ? data?.about_uz ?? '' : data?.about_ru ?? ''
              }}
            />
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default KeyMetric
