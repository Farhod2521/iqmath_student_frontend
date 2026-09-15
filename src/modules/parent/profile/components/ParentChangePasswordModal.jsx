import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import SimpleModal from '@/components/modal/simple-modal'
import Input from '@/components/input'

const ParentChangePasswordModal = ({
  isOpen,
  onClose,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isSaving,
  onSave
}) => {
  const { t } = useTranslation()

  return (
    <SimpleModal open={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#191C1D]">{t('parentProfile.passwordModalTitle')}</h3>
          <button onClick={onClose} className="text-[#B0B6C9] hover:text-[#5A6A85]">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('parentProfile.currentPasswordLabel')}</p>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('parentProfile.newPasswordLabel')}</p>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#191C1D]">{t('parentProfile.confirmPasswordLabel')}</p>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

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
              disabled={isSaving}
              className="rounded-xl bg-[#5D87FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-60"
            >
              {isSaving ? '...' : t('save')}
            </button>
          </div>
        </form>
      </div>
    </SimpleModal>
  )
}

export default ParentChangePasswordModal
