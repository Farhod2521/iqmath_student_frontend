import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import SimpleModal from '@/components/modal/simple-modal'
import Input from '@/components/input'

const ParentEditInfoModal = ({
  isOpen,
  onClose,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  address,
  setAddress,
  phoneChanged,
  currentPassword,
  setCurrentPassword,
  onSave
}) => {
  const { t } = useTranslation()

  return (
    <SimpleModal open={isOpen} onClose={onClose} classname="modal-lg">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#191C1D]">{t('parentProfile.editModalTitle')}</h3>
          <button onClick={onClose} className="text-[#B0B6C9] hover:text-[#5A6A85]">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('fullName')}</p>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('phoneNumber')}</p>
            <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('email')}</p>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('address')}</p>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          {phoneChanged ? (
            <div>
              <p className="mb-2 text-sm font-medium text-[#191C1D]">
                {t('parentProfile.phoneChangePasswordHint')} <span className="text-[#FF3B30]">*</span>
              </p>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E9E9E9] px-4 py-2 text-sm font-semibold text-[#5A6A85] transition hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-[#5D87FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </SimpleModal>
  )
}

export default ParentEditInfoModal
