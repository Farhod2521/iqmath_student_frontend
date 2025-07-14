import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('independent')}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('independent')}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{t('independentWork')}</p>
          {/* Bu yerda mustaqil ishlar va topshiriqlar bo'ladi */}
        </CardBody>
      </Card>
    </MainWrapper>
  )
}

export default Index 