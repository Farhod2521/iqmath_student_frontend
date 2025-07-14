import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('studentExamples')}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('studentExamples')}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{t('studentExamplesManagement')}</p>
          {/* Bu yerda o'quvchi misollari va namuna ishlar bo'ladi */}
        </CardBody>
      </Card>
    </MainWrapper>
  )
}

export default Index 