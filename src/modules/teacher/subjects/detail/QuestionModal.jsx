// components/subject-detail/QuestionModal/index.jsx
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'
import QuestionForm from './QuestionForm'

const QuestionModal = ({ isOpen, onClose, formData, onFormChange, onSubmit, isEditMode = false }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-tl-2xl rounded-bl-2xl shadow-lg w-1/2 h-screen overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between px-4 py-5 sticky top-0 bg-white z-10 border-b border-[#E9E9E9]">
            <h3 className="text-lg font-semibold">{isEditMode ? t('editQuestion') : t('createQuestion')}</h3>
            <button onClick={onClose} className="rounded hover:bg-gray-100 p-1 transition-colors">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
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
    </AnimatePresence>
  )
}

export default QuestionModal
