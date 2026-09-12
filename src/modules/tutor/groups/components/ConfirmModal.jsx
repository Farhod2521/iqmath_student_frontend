import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

const ConfirmModal = ({ isOpen, onClose, onConfirm, isLoading, title, message, confirmLabel, danger = true }) => {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<AlertTriangle size={18} />}
      iconClass={danger ? 'bg-[#FEE9E9] text-[#DC2626]' : 'bg-[#EAF0FF] text-[#5D87FF]'}
      maxWidth="max-w-md"
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#F1F4FF] py-3 text-sm font-semibold text-[#5A6A85] transition hover:bg-[#E4EAFB]"
          >
            {t('tutorGroups.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              danger ? 'bg-[#DC2626] hover:bg-[#B91C1C]' : 'bg-[#5D87FF] hover:bg-[#4570EA]'
            }`}
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {confirmLabel || t('tutorGroups.delete')}
          </button>
        </div>
      }
    >
      <p className="text-sm leading-relaxed text-[#5A6A85]">{message}</p>
    </Modal>
  )
}

export default ConfirmModal
