import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import ContentArea from './ContentArea'
import Key from './Key'
import { useTranslation } from 'react-i18next'

const KeyMetric = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        paddingTop: {
          xs: '40px',
          lg: '90px'
        },
        paddingBottom: {
          xs: '40px',
          lg: '90px'
        }
        // boxShadow: (theme) => theme.shadows[10]
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Typography lineHeight={1.9}>{t('aboutbody1')}</Typography>
          <Typography lineHeight={1.9}>{t('aboutbody2')}</Typography>
          <Typography lineHeight={1.9}>{t('aboutbody3')}</Typography>
        </Grid>
      </Container>
    </Box>
  )
}

export default KeyMetric
