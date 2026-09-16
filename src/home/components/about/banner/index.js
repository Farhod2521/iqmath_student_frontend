import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import bannerImg from '@/assets/images/about/iqmath_banner_4k.png'

const Banner = () => {
  const { t } = useTranslation()

  return (
    <div
      className="relative overflow-hidden bg-cover bg-right py-12 sm:py-16"
      style={{ backgroundImage: `url(${bannerImg.src})` }}
    >
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full bg-[#EAF0FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#5D87FF]">
            {t('aboutBanner.badge')}
          </span>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl">
            <span className="text-[#162948]">{t('aboutBanner.titleLine1')}</span>{' '}
            <span className="bg-gradient-to-r from-[#3076FE] to-[#357BFD] bg-clip-text text-transparent">
              {t('aboutBanner.titleHighlight')}
            </span>
          </h1>

          <p className="mt-4 max-w-md text-lg text-[#5A6A85] sm:text-xl">{t('aboutBanner.description')}</p>

          <div className="mt-6 flex items-center gap-1.5 text-base font-medium text-[#5A6A85]">
            <Link href="/" className="flex items-center gap-1.5 hover:text-[#5D87FF]">
              <Home size={17} className="text-[#1B2C49]" />
              {t('homePage')}
            </Link>
            <ChevronRight size={16} className="text-[#B0B6C9]" />
            <span className="text-[#5D87FF]">{t('aboutus')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
