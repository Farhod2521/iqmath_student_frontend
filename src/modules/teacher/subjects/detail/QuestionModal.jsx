// components/subject-detail/QuestionModal/index.jsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'
import QuestionForm from './QuestionForm'

const QuestionModal = ({ isOpen, onClose, formData, onFormChange, onSubmit, isEditMode = false }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2000] flex items-center justify-end bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // onClick={onClose}
      >
        {/* <button
          type="button"
          onClick={onClose}
          aria-label={t('close') || 'Close'}
          className="fixed right-4 top-4 z-[2020] flex h-11 w-11 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#111827] shadow-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5D87FF]"
        >
          <X size={24} strokeWidth={2.5} />
        </button> */}

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-screen w-full overflow-y-auto rounded-tl-2xl rounded-bl-2xl bg-white shadow-lg sm:w-2/3 lg:w-1/2"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-[2010] flex items-center justify-between gap-4 border-b border-[#E9E9E9] bg-white px-4 py-4">
            <h3 className="text-lg font-semibold">{isEditMode ? t('editQuestion') : t('createQuestion')}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close') || 'Close'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#111827] shadow-md transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5D87FF]"
            >
              <X size={22} strokeWidth={2.4} />
            </button>
          </div>

          {/* Form */}
          <QuestionForm
            formData={formData}
            onFormChange={onFormChange}
            questionType={formData.questionType}
            onQuestionTypeChange={(type) => onFormChange('questionType', type)}
          />

          {/* Footer */}
          <div className="border-t border-[#E9E9E9] px-4 py-3 flex justify-end sticky bottom-0 bg-white">
            <Button onclick={onSubmit} classname="!py-2">
              {t('complete')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default QuestionModal
