import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('wallet')}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('wallet')}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{t('teacherWallet')}</p>
          {/* Bu yerda o'qituvchi hamyoni va to'lovlar bo'ladi */}
        </CardBody>
      </Card>
    </MainWrapper>
  )
}

export default Index 