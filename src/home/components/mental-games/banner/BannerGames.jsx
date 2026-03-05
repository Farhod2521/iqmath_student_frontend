import { Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

function BannerGames() {
  const { t } = useTranslation()

  return (
    <div className="py-[60px] bg-[#5d87ff]">
      <h1 className="uppercase text-[28px] text-white text-center"> {t('games.hero.title')}</h1>
      <div className="flex items-center justify-center mt-4">
        <Breadcrumbs sx={{ color: 'white' }} aria-label="breadcrumb">
          <Link className="text-white/80" underline="hover" color="inherit" href="/">
            {t('homePage')}
          </Link>
          <Typography sx={{ color: 'text.primary' }}>
            <span className="text-white/80">{t('games.hero.title')}</span>
          </Typography>
        </Breadcrumbs>
      </div>
    </div>
  )
}

export default BannerGames
