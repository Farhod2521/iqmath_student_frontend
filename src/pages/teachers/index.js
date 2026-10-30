import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import TeachersLanding from '@/home/components/teachers/TeachersLanding'

const SEO = {
  uz: {
    title: "O'qituvchilar uchun — IQMath",
    description:
      "Guruhlar yarating, o'quvchilarni promo havola orqali ulang va ularning natijalarini bir joyda kuzating. Har bir o'quvchi uchun bonus oling."
  },
  ru: {
    title: 'Учителям — IQMath',
    description:
      'Создавайте группы, подключайте учеников по промо-ссылке и следите за их результатами в одном месте. Получайте бонус за каждого ученика.'
  }
}

export default function TeachersPage() {
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
      <TeachersLanding />
    </>
  )
}
