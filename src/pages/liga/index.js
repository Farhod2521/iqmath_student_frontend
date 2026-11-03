import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import LeagueLanding from '@/home/components/league/LeagueLanding'

const SEO = {
  uz: {
    title: 'Matematik Liga — IQMath',
    description: '1–11-sinf o‘quvchilari o‘rtasida online matematika musobaqasi: har bir sinf uchun alohida liga, reyting va sovrinlar.'
  },
  ru: {
    title: 'Математическая лига — IQMath',
    description: 'Онлайн-соревнование по математике среди учеников 1–11 классов: отдельная лига для каждого класса, рейтинг и призы.'
  }
}

export default function LeaguePage() {
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
      <LeagueLanding />
    </>
  )
}
