import MainWrapper from '@/layout/MainWrapper'
import Recommendations from '@/modules/student/subjects/pages/Recommendations'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  return (
    <MainWrapper title={t('recommended')}>
      <Recommendations />
    </MainWrapper>
  )
}

export default Index
