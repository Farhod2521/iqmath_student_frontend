import Head from 'next/head'
import dynamic from 'next/dynamic'

// i18n tilni localStorage'dan aniqlaydi (faqat client), shuning uchun SSR o'chirilgan —
// bu hydration mos kelmasligi ogohlantirishlarining oldini oladi.
const MatematikaLanding = dynamic(() => import('@/components/promo/MatematikaLanding'), { ssr: false })

export default function MatematikaPage() {
  const title = 'IQmath — Matematika bilan kelajakni zabt eting'
  const description =
    "Zamonaviy platforma, shaxsiy o'quv yo'li va tajribali ustozlar bilan matematikani oson o'rganing. Bepul sinov darsiga yoziling."

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://api.iqmath.uz/system/logo/logo.png" />

        {/* Open Graph — reklama/ijtimoiy tarmoqlar uchun */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://api.iqmath.uz/system/logo/logo.png" />
        <meta property="og:url" content="https://iqmath.uz/matematika" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MatematikaLanding />
    </>
  )
}
