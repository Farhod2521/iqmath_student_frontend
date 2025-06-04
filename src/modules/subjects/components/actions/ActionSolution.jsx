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

  const handleSolution = () => {
    onOpen()
    setIsLoading(true)
    request
      .post('/api/v1/func_teacher/openai/process/', {
        question_id: selectedQuestion.id,
        lang: i18n.language,
        question_type: selectedQuestion.question_type
      })
      .then((res) => {
        setData(res.data.ai_response)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Button className="px-8 rounded-md bg-[#EDEDF2] !text-black mx-4" onPress={handleSolution}>
        {t('showSolution')}
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                  ) : (
                    <div className="py-4 px-4">
                      <MathJax dynamic>{data}</MathJax>
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
