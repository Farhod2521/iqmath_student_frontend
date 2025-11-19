// components/exam/ExamAnswerImage.jsx
import React, { useEffect, useRef } from 'react'

function ExamAnswerImage({ selectedQuestion, setImageAnswers, imageAnswers }) {
  const questionKey = `question-${selectedQuestion?.id || 'default'}`
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedQuestion?.id])

  return (
    <div key={questionKey} className="space-y-4">
      {selectedQuestion?.choices?.map((item, index) => (
        <label
          key={`${questionKey}-${index}`}
          className={`block cursor-pointer border-2 rounded-lg p-4 transition-all hover:border-blue-400 ${
            imageAnswers[selectedQuestion?.id] === item.letter
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              ref={index === 0 ? inputRef : null}
              type="radio"
              name={`image-choice-${selectedQuestion.id}`}
              value={item.letter}
              checked={imageAnswers[selectedQuestion.id] === item.letter}
              onChange={() => {
                setImageAnswers((prev) => ({
                  ...prev,
                  [selectedQuestion.id]: item.letter
                }))
              }}
              className="w-5 h-5 mt-1 accent-blue-600 flex-shrink-0"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-lg text-gray-900">{item.letter}</span>
                {imageAnswers[selectedQuestion.id] === item.letter && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Tanlandi</span>
                )}
              </div>

              {item.image_url && (
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={item.image_url}
                    alt={`Variant ${item.letter}`}
                    className="w-full h-auto max-h-64 object-contain"
                    loading="lazy"
                  />
                </div>
              )}

              {!item.image_url && (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}

export default ExamAnswerImage
