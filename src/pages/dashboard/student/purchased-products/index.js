import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import PurchasedProducts from '@/modules/student/products/pages/PurchasedProducts'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b ml-6">
        <HeaderTitle title={t('purchasedProducts')} />
      </div>
      <PurchasedProducts />
    </LayoutAdmin>
  )
}

export default Index
