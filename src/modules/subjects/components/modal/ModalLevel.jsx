import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react'
import { useTranslation } from 'react-i18next'

function ModalLevel({ handleTabChange, tab }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false })
  const { t } = useTranslation()
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{t('theory')}</ModalHeader>
            <ModalBody>
              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
              <div className="p-[24px]">
                <p className="text-[15px]">{t('chooseYourLevel')}</p>
                <ul className="flex mt-[16px] gap-x-[12px]">
                  <li className="flex-grow">
                    <button
                      onClick={() => handleTabChange(1)}
                      className={`border  ${
                        tab === 1 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                      } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                    >
                      {t('level1')}
                    </button>
                  </li>
                  <li className="flex-grow">
                    <button
                      onClick={() => handleTabChange(2)}
                      className={`border  ${
                        tab === 2 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                      } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                    >
                      {t('level2')}
                    </button>
                  </li>
                  <li className="flex-grow">
                    <button
                      onClick={() => handleTabChange(3)}
                      className={`border  ${
                        tab === 3 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                      } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                    >
                      {t('level3')}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
                <button
                  onClick={onClose}
                  className="bg-[#5D87FF] text-white py-[11px] px-[26px] rounded-[8px] w-full sm:w-auto"
                >
                  {t('takeTest')}
                </button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalLevel
