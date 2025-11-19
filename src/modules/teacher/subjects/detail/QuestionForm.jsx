// components/subject-detail/QuestionModal/QuestionForm.jsx
import { useTranslation } from 'react-i18next'
import Input from '@/components/input'
import RichTextEditor from './RichTextEditor'
import QuestionTypeSelect from './QuestionTypeSelect'
import TextAnswerInput from './TextAnswerInput'
import ChoiceAnswerInput from './ChoiceAnswerInput'
import ImageChoiceInput from './ImageChoiceInput'
import CompositeAnswerInput from './CompositeAnswerInput'

const QuestionForm = ({ formData, onFormChange, questionType, onQuestionTypeChange }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 my-5">
      {/* Question Text - Uzbek */}
      <div className="px-4">
        <label className="block mb-2 font-medium">{t('question')} (O&apos;zbek tilida)</label>
        <RichTextEditor value={formData.questionText} onChange={(value) => onFormChange('questionText', value)} />
      </div>

      {/* Question Text - Russian */}
      <div className="px-4">
        <label className="block mb-2 font-medium">{t('question')} (Rus tilida)</label>
        <RichTextEditor value={formData.questionTextRu} onChange={(value) => onFormChange('questionTextRu', value)} />
      </div>

      {/* Video Links */}
      <div className="px-4">
        <label className="block mb-2 font-medium">{t('videoLink')} (o&apos;zbek tilida)</label>
        <Input
          value={formData.videoLink}
          onChange={(e) => onFormChange('videoLink', e.target.value)}
          placeholder={t('enterVideoLinkName')}
        />
      </div>

      <div className="px-4">
        <label className="block mb-2 font-medium">{t('videoLink')} (rus tilida)</label>
        <Input
          value={formData.videoLinkRu}
          onChange={(e) => onFormChange('videoLinkRu', e.target.value)}
          placeholder={t('enterVideoLinkName')}
        />
      </div>

      {/* Question Type and Level */}
      <div className="flex gap-4">
        <QuestionTypeSelect value={questionType} onChange={onQuestionTypeChange} />
        <div className="px-4 w-full space-y-2">
          <label className="block font-medium">{t('questionLevel')}</label>
          <select
            value={formData.questionLevel}
            onChange={(e) => onFormChange('questionLevel', e.target.value)}
            className="border border-[#E9E9E9] rounded-lg w-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              ----------
            </option>
            <option value="1">{t('level1Easy')}</option>
            <option value="2" disabled>
              {t('level2Medium')}
            </option>
            <option value="3" disabled>
              {t('level3Hard')}
            </option>
          </select>
        </div>
      </div>

      {/* Dynamic Answer Inputs Based on Question Type */}
      {questionType === 'text' && (
        <TextAnswerInput
          correctAnswer={formData.correctAnswer}
          correctAnswerRu={formData.correctAnswerRu}
          onChange={onFormChange}
        />
      )}

      {questionType === 'choice' && (
        <ChoiceAnswerInput
          choices={formData.choices}
          correctAnswers={formData.correctAnswers}
          onChange={onFormChange}
        />
      )}

      {questionType === 'image_choice' && (
        <ImageChoiceInput
          correctAnswer={formData.correctImageAnswer}
          imageUrls={formData.imageUrls}
          onChange={onFormChange}
          optionCount={formData.imageOptionCount}
        />
      )}

      {questionType === 'composite' && (
        <CompositeAnswerInput questions={formData.compositeQuestions} onChange={onFormChange} />
      )}
    </div>
  )
}

export default QuestionForm
