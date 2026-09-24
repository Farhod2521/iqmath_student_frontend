import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Users2 } from 'lucide-react'
import Modal from './Modal'

const GroupFormModal = ({ isOpen, onClose, onSubmit, isLoading, group, showDescription = true }) => {
  const { t } = useTranslation()
  const isEdit = Boolean(group)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!isOpen) return
    setName(group?.name || '')
    setDescription(group?.description || '')
  }, [isOpen, group])

  const handleSubmit = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      toast.error(t('tutorGroups.nameRequired'))
      return
    }
    onSubmit({ name: trimmedName, description: description.trim() })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? t('tutorGroups.editGroup') : t('tutorGroups.createGroup')}
      subtitle={isEdit ? group?.name : t('tutorGroups.createGroupSubtitle')}
      icon={<Users2 size={18} />}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#F1F4FF] py-3 text-sm font-semibold text-[#5A6A85] transition hover:bg-[#E4EAFB]"
          >
            {t('tutorGroups.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !name.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5D87FF] py-3 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-[#B9C7F5]"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {isEdit ? t('tutorGroups.save') : t('tutorGroups.create')}
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#191C1D]">
            {t('tutorGroups.groupName')} <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmit()
            }}
            placeholder={t('tutorGroups.groupNamePlaceholder')}
            maxLength={200}
            autoFocus
            className="w-full rounded-xl border border-[#E9E9E9] bg-white px-4 py-3 text-sm text-[#191C1D] outline-none transition focus:border-[#5D87FF]"
          />
        </div>

        {showDescription ? (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#191C1D]">
              {t('tutorGroups.groupDescription')}
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t('tutorGroups.groupDescriptionPlaceholder')}
              rows={3}
              className="w-full resize-none rounded-xl border border-[#E9E9E9] bg-white px-4 py-3 text-sm text-[#191C1D] outline-none transition focus:border-[#5D87FF]"
            />
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default GroupFormModal
