import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import ParentsLanding from '@/home/components/parents/ParentsLanding'

const SEO = {
  uz: {
    title: 'Ota-onalar uchun — IQMath',
    description:
      "Farzandingiz matematikani video darslar va mashqlar orqali o'rganadi, siz esa ota-ona kabinetida uning natijalarini kuzatib borasiz."
  },
  ru: {
    title: 'Родителям — IQMath',
    description:
      'Ребёнок изучает математику по видеоурокам и упражнениям, а вы следите за его результатами в кабинете родителя.'
  }
}

export default function ParentsPage() {
  const { i18n } = useTranslation()
  const seo = SEO[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <>
      <Head>
        <title key="title">{seo.title}</title>
        <meta key="description" name="description" content={seo.description} />
        <meta key="og:title" property="og:title" content={seo.title} />
        <meta key="og:description" property="og:description" content={seo.description} />
      </Head>
      <ParentsLanding />
    </>
  )
}
