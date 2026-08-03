import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import MyPurchasedBooks from '@/modules/library/components/MyPurchasedBooks'

const MyBooksPage = () => {
  const { t } = useTranslation()

  const { data: bookData, isLoading } = useGetQuery({
    key: KEYS.bookMyPurchases,
    url: URLS.bookMyPurchases
  })

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('library.myBooks')} />
      <MyPurchasedBooks data={bookData?.data} isLoading={isLoading} />
    </LayoutAdmin>
  )
}

export default MyBooksPage
