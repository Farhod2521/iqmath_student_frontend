import { Users2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EmptyState = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center py-16">
      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Users2Icon className="w-10 h-10 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noStudentsUsedCoupon')}</h3>

      <p className="text-gray-600 mb-6">{t('couponStudentListDescription')}</p>
    </div>
  )
}

export default EmptyState
