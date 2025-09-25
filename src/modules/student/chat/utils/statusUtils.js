import { useTranslation } from 'react-i18next'

export const useStatusUtils = () => {
  const { t } = useTranslation()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'answered':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return t('pending', 'Kutilmoqda')
      case 'answered':
        return t('answered', 'Javob berilgan')
      case 'rejected':
        return t('rejected', 'Rad etilgan')
      default:
        return status
    }
  }

  return {
    getStatusColor,
    getStatusText
  }
}
