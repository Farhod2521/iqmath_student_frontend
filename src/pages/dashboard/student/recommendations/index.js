import LayoutAdmin from '@/layout/LayoutAdmin'
import Recommendations from '@/modules/student/subjects/pages/Recommendations'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('recommended')}>
      <Recommendations />
    </LayoutAdmin>
  )
}

export default Index
