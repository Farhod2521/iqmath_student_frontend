import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ProductsExchange from '@/modules/teacher/products/pages/ProductsExchange'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4">
        <HeaderTitle title={t('purchasedProducts')} />
      </div>
      <ProductsExchange />
    </LayoutAdmin>
  )
}

export default Index
