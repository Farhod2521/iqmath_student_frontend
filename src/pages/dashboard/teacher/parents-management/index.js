import React from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ParentsManagement from '@/modules/teacher/parents/pages/ParentsManagement'

const ParentsManagementPage = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('parentsManagement')}>
      <ParentsManagement />
    </LayoutAdmin>
  )
}

export default ParentsManagementPage
