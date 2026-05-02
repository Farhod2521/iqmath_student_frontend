import LayoutAdmin from '@/layout/LayoutAdmin'
import SomTransfer from '@/modules/student/transfer/pages/SomTransfer'
import { useTranslation } from 'react-i18next'

const TransferPage = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <SomTransfer />
    </LayoutAdmin>
  )
}

export default TransferPage
