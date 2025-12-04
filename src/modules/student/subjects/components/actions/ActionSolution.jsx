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
      return
    }

    setIsLoading(true)
    setError('')
    setData('')
    onOpen() // Modal darhol ochiladi

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
        className="px-8 rounded-md bg-[#EDEDF2] !text-black mx-4 transition-all duration-300 hover:bg-[#D1D1D6] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg" 
        onPress={handleSolution}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span>{t('loading')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg> */}
            <span>{t('showSolution')}</span>
          </div>
        )}
      </Button>
      <Modal 
        size="3xl" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm transition-all duration-300",
          base: "bg-white border border-gray-200 shadow-xl transition-all duration-300 transform",
          header: "bg-white",
          body: "bg-white",
          footer: "bg-white"
        }}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
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
                    <div className="py-8 w-full flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-600 text-lg font-medium">{t('solutionPreparing')}</p>
                      <p className="text-gray-400 text-sm mt-2">{t('solutionPreparingNote')}</p>
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
