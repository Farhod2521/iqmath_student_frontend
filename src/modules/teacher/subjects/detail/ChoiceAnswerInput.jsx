// components/subject-detail/QuestionModal/ChoiceAnswerInput.jsx
import { useState } from 'react'

const ChoiceAnswerInput = ({ choices, correctAnswers, onChange }) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const [optionCount, setOptionCount] = useState(Object.keys(choices).length || 4)

  const handleChoiceChange = (letter, lang, value) => {
    const updatedChoices = {
      ...choices,
      [letter]: {
        ...choices[letter],
        [lang]: value
      }
    }
    onChange('choices', updatedChoices)
  }

  const handleCorrectAnswerToggle = (letter) => {
    const updatedAnswers = correctAnswers.includes(letter)
      ? correctAnswers.filter((ans) => ans !== letter)
      : [...correctAnswers, letter]
    onChange('correctAnswers', updatedAnswers)
  }

  const addOption = () => {
    if (optionCount < 8) {
      const newLetter = letters[optionCount]
      const updatedChoices = {
        ...choices,
        [newLetter]: { text_uz: '', text_ru: '' }
      }
      onChange('choices', updatedChoices)
      setOptionCount(optionCount + 1)
    }
  }

  const removeOption = () => {
    if (optionCount > 2) {
      const letterToRemove = letters[optionCount - 1]
      const updatedChoices = { ...choices }
      delete updatedChoices[letterToRemove]

      const updatedAnswers = correctAnswers.filter((ans) => ans !== letterToRemove)

      onChange('choices', updatedChoices)
      onChange('correctAnswers', updatedAnswers)
      setOptionCount(optionCount - 1)
    }
  }

  const currentOptions = letters.slice(0, optionCount)

  return (
    <div className="space-y-4">
      {currentOptions.map((option) => (
        <div key={option} className="space-y-2 px-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={correctAnswers.includes(option)}
              onChange={() => handleCorrectAnswerToggle(option)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="font-medium">{option}:</span>
          </div>
          <input
            type="text"
            value={choices[option]?.text_uz || ''}
            onChange={(e) => handleChoiceChange(option, 'text_uz', e.target.value)}
            className="border border-[#E9E9E9] rounded-lg py-2 px-3 w-full"
            placeholder={`${option} javobini o'zbek tilida kiriting`}
          />
          <input
            type="text"
            value={choices[option]?.text_ru || ''}
            onChange={(e) => handleChoiceChange(option, 'text_ru', e.target.value)}
            className="border border-[#E9E9E9] rounded-lg py-2 px-3 w-full"
            placeholder={`${option} javobini rus tilida kiriting`}
          />
        </div>
      ))}

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={removeOption}
          disabled={optionCount <= 2}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          - Variant o'chirish
        </button>
        <span className="text-sm text-gray-500">{optionCount} ta variant</span>
        <button
          type="button"
          onClick={addOption}
          disabled={optionCount >= 8}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Variant qo'shish
        </button>
      </div>
    </div>
  )
}

export default ChoiceAnswerInput
