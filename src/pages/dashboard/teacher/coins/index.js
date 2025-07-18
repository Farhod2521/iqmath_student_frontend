import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'
import LayoutAdmin from '@/layout/LayoutAdmin'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('points')}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('points')}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{t('teacherPoints')}</p>
          {/* Bu yerda o'qituvchi ballari va reytingi bo'ladi */}
        </CardBody>
      </Card>
    </LayoutAdmin>
  )
}

export default Index
