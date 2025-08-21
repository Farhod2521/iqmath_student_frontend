import LayoutAdmin from '@/layout/LayoutAdmin'
import Products from '@/modules/student/products/pages/Products'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('allProducts')}>
      <Products />
    </LayoutAdmin>
  )
}

export default Index
