// hooks/useQuestionForm.js
import { useState } from 'react'

const initialFormState = {
  questionText: '',
  questionTextRu: '',
  videoLink: '',
  videoLinkRu: '',
  questionType: '',
  questionLevel: '',
  correctAnswer: '',
  correctAnswerRu: '',
  correctAnswers: [],
  choices: {
    A: { text_uz: '', text_ru: '' },
    B: { text_uz: '', text_ru: '' },
    C: { text_uz: '', text_ru: '' },
    D: { text_uz: '', text_ru: '' }
  },
  // Image choice uchun
  correctImageAnswer: '',
  imageUrls: {}, // { A: 'url', B: 'url', ... }
  imageOptionCount: 4,
  compositeQuestions: [{ text1_uz: '', text1_ru: '', correct_answer: '', text2_uz: '', text2_ru: '' }]
}

export const useQuestionForm = () => {
  const [formData, setFormData] = useState(initialFormState)

  const updateFormField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData(initialFormState)
  }

  const loadQuestionData = (question) => {
    const questionType = question.question_type

    const baseData = {
      questionText: question.question_text_uz || '',
      questionTextRu: question.question_text_ru || '',
      videoLink: question.video_url_uz || '',
      videoLinkRu: question.video_url_ru || '',
      questionType,
      questionLevel: question.level || '',
      correctAnswer: questionType === 'text' ? question.correct_text_answer_uz || '' : '',
      correctAnswerRu: questionType === 'text' ? question.correct_text_answer_ru || '' : '',
      correctAnswers:
        questionType === 'choice' ? question.choices.filter((c) => c.is_correct).map((c) => c.letter) : [],
      choices:
        questionType === 'choice'
          ? question.choices.reduce(
              (acc, item) => ({
                ...acc,
                [item.letter]: { text_uz: item.text_uz, text_ru: item.text_ru }
              }),
              {
                A: { text_uz: '', text_ru: '' },
                B: { text_uz: '', text_ru: '' },
                C: { text_uz: '', text_ru: '' },
                D: { text_uz: '', text_ru: '' }
              }
            )
          : initialFormState.choices,
      compositeQuestions: questionType === 'composite' ? question.sub_questions : initialFormState.compositeQuestions
    }

    // Image choice uchun
    if (questionType === 'image_choice') {
      baseData.correctImageAnswer = question.choices?.find((c) => c.is_correct)?.letter || ''
      baseData.imageOptionCount = question.choices?.length || 4
      // Mavjud image URL larni yuklash
      baseData.imageUrls =
        question.choices?.reduce((acc, choice) => {
          if (choice.image_url) {
            acc[choice.letter] = choice.image_url
          }
          return acc
        }, {}) || {}
    } else {
      baseData.correctImageAnswer = ''
      baseData.imageUrls = {}
      baseData.imageOptionCount = 4
    }

    setFormData(baseData)
  }

  const buildFormData = (topicId) => {
    const formDataObj = new FormData()

    formDataObj.append('topic', topicId)
    formDataObj.append('question_text_uz', formData.questionText)
    formDataObj.append('question_text_ru', formData.questionTextRu)
    formDataObj.append('question_type', formData.questionType)
    formDataObj.append('video_url_uz', formData.videoLink)
    formDataObj.append('video_url_ru', formData.videoLinkRu)
    formDataObj.append('level', formData.questionLevel)

    if (formData.questionType === 'text') {
      formDataObj.append('correct_text_answer_uz', formData.correctAnswer)
      formDataObj.append('correct_text_answer_ru', formData.correctAnswerRu)
    } else if (formData.questionType === 'choice') {
      Object.entries(formData.choices).forEach(([letter, texts], index) => {
        formDataObj.append(`choices[${index}][letter]`, letter)
        formDataObj.append(`choices[${index}][text_uz]`, texts.text_uz)
        formDataObj.append(`choices[${index}][text_ru]`, texts.text_ru)
        formDataObj.append(`choices[${index}][is_correct]`, formData.correctAnswers.includes(letter))
      })
    } else if (formData.questionType === 'image_choice') {
      // Image choice - choices array yaratish
      const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      const availableLetters = LETTERS.slice(0, formData.imageOptionCount || 4)

      availableLetters.forEach((letter, index) => {
        formDataObj.append(`choices[${index}][letter]`, letter)
        formDataObj.append(`choices[${index}][text_uz]`, '')
        formDataObj.append(`choices[${index}][text_ru]`, '')
        formDataObj.append(`choices[${index}][is_correct]`, formData.correctImageAnswer === letter)

        // Image URL ni yuborish
        if (formData.imageUrls[letter]) {
          formDataObj.append(`choices[${index}][image_url]`, formData.imageUrls[letter])
        }
      })
    } else if (formData.questionType === 'composite') {
      formData.compositeQuestions.forEach((question, index) => {
        formDataObj.append(`sub_questions[${index}][text1_uz]`, question.text1_uz)
        formDataObj.append(`sub_questions[${index}][text1_ru]`, question.text1_ru)
        formDataObj.append(`sub_questions[${index}][correct_answer]`, question.correct_answer)
        formDataObj.append(`sub_questions[${index}][text2_uz]`, question.text2_uz)
        formDataObj.append(`sub_questions[${index}][text2_ru]`, question.text2_ru)
      })
    }

    return formDataObj
  }

  return {
    formData,
    updateFormField,
    resetForm,
    loadQuestionData,
    buildFormData
  }
}
