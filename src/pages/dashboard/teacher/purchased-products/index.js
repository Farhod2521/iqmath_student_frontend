import LayoutAdmin from '@/layout/LayoutAdmin'
import ProductsExchange from '@/modules/teacher/products/pages/ProductsExchange'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('purchasedProducts')}>
      <ProductsExchange />
    </LayoutAdmin>
  )
}

export default Index
