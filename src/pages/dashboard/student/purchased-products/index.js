import LayoutAdmin from '@/layout/LayoutAdmin'
import PurchasedProducts from '@/modules/student/products/pages/PurchasedProducts'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('purchasedProducts')}>
      <PurchasedProducts />
    </LayoutAdmin>
  )
}

export default Index
