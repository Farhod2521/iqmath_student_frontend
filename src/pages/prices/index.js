import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ChevronRight, Gem, Home } from 'lucide-react'

import Footer from '@/components/footer'
import LayoutHome from '@/home/Layout'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'

import PricingContent from './components/PricingContent'

const TEXTS = {
  uz: {
    home: 'Bosh sahifa',
    badge: 'Obuna rejalari',
    crumb: 'Tariflar',
    title: 'O‘zingizga mos',
    accent: 'tarifni tanlang'
  },
  ru: {
    home: 'Главная',
    badge: 'Планы подписки',
    crumb: 'Тарифы',
    title: 'Выберите',
    accent: 'подходящий тариф'
  }
}

function Prices() {
  const theme = ThemeSettings()
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <LayoutHome>
      <Head>
        <title key="title">{`${text.crumb} | IQMath`}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FE] via-[#F9FBFF] to-white font-['Manrope','Inter',system-ui,sans-serif]">
          {/* Fondagi yumshoq doiralar va 3D plitkalar (π, grafik) */}
          <span className="pointer-events-none absolute -left-[340px] top-24 h-[680px] w-[680px] rounded-full bg-gradient-to-br from-[#E3ECFF] to-transparent" />
          <span className="pointer-events-none absolute -right-[300px] top-[420px] h-[620px] w-[620px] rounded-full bg-gradient-to-bl from-[#E8EFFF] to-transparent" />
          <span className="pointer-events-none absolute left-[11%] top-24 hidden h-[130px] w-[130px] -rotate-12 items-center justify-center rounded-[32px] bg-gradient-to-br from-[#7FB2FF] to-[#3E7CF5] font-serif text-[78px] leading-none text-white shadow-[0_30px_50px_-20px_rgba(29,107,255,0.6),inset_0_-10px_18px_rgba(0,0,0,0.12),inset_0_10px_16px_rgba(255,255,255,0.45)] lg:flex">
            π
          </span>
          <span className="pointer-events-none absolute right-[12%] top-32 hidden h-[120px] w-[120px] rotate-12 items-end justify-center gap-2.5 rounded-[30px] bg-white/80 pb-7 shadow-[0_30px_50px_-24px_rgba(29,107,255,0.45),inset_0_2px_0_#fff] ring-1 ring-[#E3ECFF] backdrop-blur lg:flex">
            <span className="h-5 w-3.5 rotate-[20deg] rounded-full bg-[#5B9BFF]" />
            <span className="h-9 w-3.5 rotate-[20deg] rounded-full bg-[#3B82F6]" />
            <span className="h-14 w-3.5 rotate-[20deg] rounded-full bg-[#1D6BFF]" />
          </span>

          <section className="relative mx-auto max-w-[900px] px-4 pt-6 text-center sm:pt-10">
            <nav className="flex items-center justify-center gap-2 text-[14px] text-[#64748B]">
              <Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-[#1D6BFF]">
                <Home size={16} className="fill-[#94A3B8] text-[#94A3B8]" />
                {text.home}
              </Link>
              <ChevronRight size={15} />
              <span className="font-semibold text-[#0B1B3F]">{text.crumb}</span>
            </nav>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[14px] font-bold text-[#1D4FE0] sm:mt-6 sm:text-[15px]">
              <Gem size={17} />
              {text.badge}
            </span>
            <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] min-[400px]:text-[36px] sm:text-[52px] lg:text-[60px]">
              {text.title} <span className="text-[#1D6BFF]">{text.accent}</span>
            </h1>
          </section>

          <div className="relative pb-10 sm:pb-16">
            <PricingContent />
          </div>
        </div>

        <ScrollToTop />
        <Footer />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Prices
