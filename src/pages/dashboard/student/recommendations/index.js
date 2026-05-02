import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import Recommendations from '@/modules/student/subjects/pages/Recommendations'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        <HeaderTitle title={t('recommended')} />
      </div>
      <Recommendations />
    </LayoutAdmin>
  )
}

export default Index
