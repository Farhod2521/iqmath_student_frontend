import { Image } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SimpleModal from '@/components/modal/simple-modal'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const ModalConfidentiality = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone')
  console.log('phone', phone)
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(true)

  const handleCopy = () => {
    const text = `Login: ${session?.login}\nPassword: ${session?.password}`
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(console.error)
  }

  const closeModal = () => {
    setShowModal(false)
    router.push('/dashboard/student/diagnostics')
  }

  if (phone && showModal) {
    return (
      <SimpleModal open={showModal}>
        <div className="flex justify-between px-4 py-4">
          <h3 className="text-[19px] font-semibold">{t('confidentiality')}</h3>
          <button onClick={closeModal}>
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>

        <hr className="bg-[#E9E9E9] h-[1px]" />

        <div className="px-4 py-6">
          <h2 className="text-sm font-semibold mb-1">{t('userLoginandPassword')}</h2>
          <p className="text-sm font-medium text-[#7C8FAC] mb-2">
            {t('yourLogin')}: {session?.login}
          </p>
          <p className="text-sm font-medium text-[#7C8FAC] mb-4">
            {t('yourPassword')}: {session?.password}
          </p>
          <p className="text-xs font-medium text-[#7C8FAC]">{t('WantchangePassword')}</p>
        </div>

        <hr className="bg-[#E9E9E9] h-[1px]" />

        <div className="flex flex-col sm:flex-row justify-center gap-2 py-4">
          <button onClick={handleCopy} className="bg-[#5D87FF] text-white py-2 px-4 rounded w-full sm:w-auto">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
      </SimpleModal>
    )
  }

  return <></>
}

export default ModalConfidentiality
