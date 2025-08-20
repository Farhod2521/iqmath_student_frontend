import SimpleModal from "@/components/modal/simple-modal"
import { Input } from "@heroui/react"
import { useTranslation } from "react-i18next"
import { LinkIcon } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { Copy } from "lucide-react"
import { Share2 } from "lucide-react"

const CreateReferalModal = ({
    isModalOpen,
    setIsModalOpen,
    inviteLink,
    handleCopyLink,
    handleShare,
    copied,
    setCopied
}) => {
    const { t } = useTranslation()
  return (
    <SimpleModal 
    open={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    classname="modal-lg"
  >
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-[#5D87FF] rounded-[8px] flex items-center justify-center">
          <LinkIcon className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold text-black">{t('inviteLink')}</h3>
          <p className="text-[14px] text-[#5A6A85]">{t('inviteLinkDescription')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex space-x-3 items-center">
          <Input
            value={inviteLink}
            readOnly
            className="flex-1"
            placeholder={t('inviteLink')}
            classNames={{
              input: "text-[15px] !outline-none",
              inputWrapper: "border !outline-none border-[#E9E9E9] rounded-[10px] bg-white"
            }}
          />
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              copied 
                ? 'bg-green-600 hover:bg-green-700 !p-3 text-white' 
                : 'bg-[#5D87FF] hover:bg-[#4570EA] !p-3 text-white'
            }`}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          </button>
        </div>
        
      
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-6 mt-6  justify-end ">
        <button
          onClick={() => setIsModalOpen(false)}
          className=" px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t('close')}
        </button>
        <button
          onClick={handleShare}
          className=" px-4 py-2 bg-[#5D87FF] hover:bg-[#4570EA] text-white rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Share2 size={16} className="mr-2" />
          {t('share')}
        </button>
      </div>
    </div>
  </SimpleModal>
  )
}

export default CreateReferalModal