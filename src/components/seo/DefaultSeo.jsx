import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://iqmath.uz'

const SEO = {
  uz: {
    title: "IQMath — 1–11-sinflar uchun matematika: video darslar va mashqlar",
    description:
      "IQMath — maktab dasturi bo'yicha matematika: video darslar, mashqlar va testlar, ota-ona uchun natijalar. O'zbek va rus tillarida."
  },
  ru: {
    title: 'IQMath — математика для 1–11 классов: видеоуроки и упражнения',
    description:
      'IQMath — математика по школьной программе: видеоуроки, упражнения и тесты, результаты для родителей. На узбекском и русском языках.'
  }
}

// Barcha sahifalar uchun standart title/description/Open Graph.
// Sahifa o'zining <Head><title> ini bersa, u ustun turadi (key bir xil).
const DefaultSeo = () => {
  const { i18n } = useTranslation()
  const { asPath } = useRouter()
  const seo = SEO[i18n.language] || SEO.uz
  const url = `${SITE_URL}${(asPath || '/').split(/[?#]/)[0]}`

  return (
    <Head>
      <title key="title">{seo.title}</title>
      <meta key="description" name="description" content={seo.description} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content="IQMath" />
      <meta key="og:title" property="og:title" content={seo.title} />
      <meta key="og:description" property="og:description" content={seo.description} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={`${SITE_URL}/images/og-image.png`} />
      <meta key="og:locale" property="og:locale" content={i18n.language === 'ru' ? 'ru_RU' : 'uz_UZ'} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <link key="canonical" rel="canonical" href={url} />
    </Head>
  )
}

export default DefaultSeo
