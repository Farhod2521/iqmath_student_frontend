import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LayoutHome from '@/home/Layout'

function NotFound() {
  const { t } = useTranslation()

  return (
    <LayoutHome>
      <Head>
        <title key="title">{`${t('notFoundTitle')} — IQMath`}</title>
        <meta key="robots" name="robots" content="noindex" />
      </Head>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-6xl font-extrabold text-[#2563EB]">404</p>
        <h1 className="mt-4 text-2xl font-bold text-[#0F172A] sm:text-3xl">{t('notFoundTitle')}</h1>
        <p className="mt-3 max-w-md text-[15px] text-[#475569]">{t('notFoundText')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-xl bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]"
        >
          {t('notFoundHome')}
        </Link>
      </section>
    </LayoutHome>
  )
}

export default NotFound
