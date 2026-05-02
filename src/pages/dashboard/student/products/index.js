import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import Products from '@/modules/student/products/pages/Products'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b ml-6">
        <HeaderTitle title={t('allProducts')} />
      </div>
      <Products />
    </LayoutAdmin>
  )
}

export default Index
