import LayoutAdmin from '@/layout/LayoutAdmin'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  return <LayoutAdmin title={t('payments')}>To'lovlar</LayoutAdmin>
}

export default Index
