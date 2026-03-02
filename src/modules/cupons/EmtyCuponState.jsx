import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const EmptyCuponState = ({ onAddNew }) => {
  const { t } = useTranslation()

  return (
    <div className="py-16 text-center">
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full">
        <PlusIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{t('noCoupon')}</h3>
      <p className="mb-6 text-gray-600">{t('manageFirstCoupon')}</p>
      <Button
        onPress={onAddNew}
        className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        {t('createFirstCoupon')}
      </Button>
    </div>
  )
}

export default EmptyCuponState
