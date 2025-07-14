import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('chat')}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('chat')}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{t('chatWithStudents')}</p>
          {/* Bu yerda chat interfeysi bo'ladi */}
        </CardBody>
      </Card>
    </MainWrapper>
  )
}

export default Index 