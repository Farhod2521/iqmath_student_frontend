import React from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ParentsManagement from '@/modules/teacher/parents/pages/ParentsManagement'
import HeaderTitle from '@/components/header-title'

const ParentsManagementPage = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4">
        <HeaderTitle title={t('parentsManagement')} />
      </div>
      <ParentsManagement />
    </LayoutAdmin>
  )
}

export default ParentsManagementPage
