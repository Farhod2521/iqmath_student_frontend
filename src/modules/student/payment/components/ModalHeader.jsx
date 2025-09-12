import React from 'react'
import { FaTimes } from 'react-icons/fa'

const ModalHeader = ({ 
  activeTab, 
  onClose 
}) => {
  const getTitle = () => {
    return activeTab === 'plans' ? 'Tarif Rejasini Tanlang' : 'Kupon Kodi'
  }

  const getSubtitle = () => {
    return activeTab === 'plans' 
      ? 'O\'zingizga mos tarifni tanlang' 
      : 'Kupon kodi kiriting (ixtiyoriy)'
  }

  return (
    <div className="sticky top-0 bg-white dark:bg-[#202936] border-b border-[#EAEFF4] dark:border-[#2A3447] p-6 rounded-t-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2A3547] dark:text-white">
            {getTitle()}
          </h1>
          <p className="text-[#5A6A85] dark:text-gray-400 mt-1">
            {getSubtitle()}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EAEFF4] dark:bg-[#2A3447] hover:bg-[#DFE5EF] dark:hover:bg-[#333F55] transition-colors"
        >
          <FaTimes className="text-[#5A6A85] dark:text-[#7C8FAC] text-sm" />
        </button>
      </div>
    </div>
  )
}

export default ModalHeader
