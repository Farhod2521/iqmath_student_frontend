import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTimes } from 'react-icons/fa'

const ModalHeader = ({ activeTab, onClose }) => {
  const { t } = useTranslation()

  // O1/O3: sarlavha va izoh takrorlanmasin; to'lov bosqichi "Kuponlar" deb atalmasin
  const getTitle = () => {
    return activeTab === 'plans' ? t('selectPlan') : t('paymentStepTitle')
  }

  const getSubtitle = () => {
    return activeTab === 'plans' ? t('selectPlanHint') : t('paymentStepHint')
  }

  return (
    <div className="sticky top-0 bg-white dark:bg-[#202936] border-b border-[#EAEFF4] dark:border-[#2A3447] p-4 rounded-t-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2A3547] dark:text-white">{getTitle()}</h2>
          <p className="text-sm text-[#5A6A85] dark:text-gray-400 mt-0.5">{getSubtitle()}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EAEFF4] dark:bg-[#2A3447] hover:bg-[#DFE5EF] dark:hover:bg-[#333F55] transition-colors"
        >
          <FaTimes className="text-[#5A6A85] dark:text-[#7C8FAC] text-xs" />
        </button>
      </div>
    </div>
  )
}

export default ModalHeader
