import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Alert, Spinner } from '@heroui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'
import { request } from '@/services/api'

function ActionSolution({ selectedQuestion }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { t, i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')
  const [error, setError] = useState('')

  const handleSolution = () => {
    if (!selectedQuestion?.id) {
      console.error('selectedQuestion.id mavjud emas:', selectedQuestion)
      return
    }
    
    setIsLoading(true)
    setError('')
    setData('')
    
    console.log('API chaqiruvi:', {
      question_id: selectedQuestion.id,
      lang: i18n.language,
      question_type: selectedQuestion.question_type
    })
    
    request
      .post('/api/v1/func_teacher/openai/process/', {
        question_id: selectedQuestion.id,
        lang: i18n.language,
        question_type: selectedQuestion.question_type
      })
      .then((res) => {
        console.log('API javobi:', res.data)
        if (res.data?.ai_response) {
          setData(res.data.ai_response)
          onOpen() // Faqat yechim kelganda modal ochiladi
        } else {
          setError('Yechim topilmadi')
        }
      })
      .catch((err) => {
        console.error('API xatosi:', err)
        setError(err.response?.data?.message || 'Yechimni olishda xatolik yuz berdi')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Button 
        className="px-8 rounded-md bg-[#EDEDF2] !text-black mx-4" 
        onPress={handleSolution}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? t('loading') : t('showSolution')}
      </Button>
      <Modal 
        size="3xl" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white border border-gray-200 shadow-xl",
          header: "bg-white",
          body: "bg-white",
          footer: "bg-white"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                  <Alert hideIcon color="success">
                    <MathJax dynamic>
                      <div className="flex flex-col justify-center items-center w-full">
                        {parse(
                          i18n.language === 'uz'
                            ? selectedQuestion?.question_text_uz || ''
                            : selectedQuestion?.question_text_ru || ''
                        )}
                      </div>
                    </MathJax>
                  </Alert>
                  {isLoading ? (
                    <div className="py-4 w-full flex justify-center">
                      <Spinner />
                    </div>
                  ) : error ? (
                    <div className="py-4 px-4">
                      <Alert color="danger">
                        <p className="text-red-600">{error}</p>
                      </Alert>
                    </div>
                  ) : data ? (
                    <div className="py-4 px-4">
                      <MathJax dynamic>{data}</MathJax>
                    </div>
                  ) : (
                    <div className="py-4 px-4">
                      <p className="text-gray-500 text-center">Yechim mavjud emas</p>
                    </div>
                  )}
                </MathJaxContext>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ActionSolution
