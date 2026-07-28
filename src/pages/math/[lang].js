import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

// i18n tilni client'da aniqlaydi, shuning uchun SSR o'chirilgan — hydration mos kelmasligini oldini oladi.
const MatematikaLanding = dynamic(() => import('@/components/promo/MatematikaLanding'), { ssr: false })

// URL: /math/uz | /math/ru — path segmentidan til olinadi.
export default function MathLangPage() {
  const router = useRouter()
  const raw = router.query.lang
  const lang = raw === 'ru' ? 'ru' : 'uz' // faqat ru/uz, aks holda uz

  const meta = {
    uz: {
      title: 'IQmath — Matematika bilan kelajakni zabt eting',
      description:
        "Zamonaviy platforma, shaxsiy o'quv yo'li va tajribali ustozlar bilan matematikani oson o'rganing. Bepul sinov darsiga yoziling."
    },
    ru: {
      title: 'IQmath — Покорите будущее с математикой',
      description:
        'Изучайте математику легко с современной платформой, персональным планом обучения и опытными наставниками. Запишитесь на бесплатный пробный урок.'
    }
  }[lang]

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://api.iqmath.uz/system/logo/logo.png" />

        {/* Open Graph — reklama/ijtimoiy tarmoqlar uchun */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://api.iqmath.uz/system/logo/logo.png" />
        <meta property="og:url" content={`https://iqmath.uz/math/${lang}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MatematikaLanding lang={lang} />
    </>
  )
}
