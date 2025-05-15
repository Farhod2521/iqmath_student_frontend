import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

const Banner = () => {
  const { t } = useTranslation()

  return (
    <div className="py-[60px] bg-[#5d87ff]">
      <h1 className="uppercase text-[28px] text-white text-center"> {t('aboutus')}</h1>
      <div className="flex mt-4 justify-center items-center">
        <Breadcrumbs sx={{ color: 'white' }} aria-label="breadcrumb">
          <Link className="text-white/80" underline="hover" color="inherit" href="/">
            {t('homePage')}
          </Link>
          <Typography sx={{ color: 'text.primary' }}>
            <span className="text-white/80">{t('aboutus')}</span>
          </Typography>
        </Breadcrumbs>
      </div>
    </div>
  )
}

export default Banner
