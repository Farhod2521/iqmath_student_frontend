// components/subject-detail/QuestionModal/QuestionTypeSelect.jsx
import { useTranslation } from 'react-i18next'

const QuestionTypeSelect = ({ value, onChange }) => {
  const { t } = useTranslation()

  return (
    <div className="px-4 w-full space-y-2">
      <label className="block font-medium">{t('questionType')}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[#E9E9E9] rounded-lg w-full py-2.5 px-4"
      >
        <option value="" disabled>
          {t('selectType')}
        </option>
        <option value="text">{t('textInput')}</option>
        <option value="composite">{t('multipleInput')}</option>
        <option value="choice">{t('selectOption')}</option>
        <option value="image_choice">{t('imageOption')}</option>
      </select>
    </div>
  )
}

export default QuestionTypeSelect