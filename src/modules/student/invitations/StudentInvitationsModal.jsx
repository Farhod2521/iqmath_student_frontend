import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { get } from 'lodash'
import toast from 'react-hot-toast'
import { Check, Users2, X } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'

const StudentInvitationsModal = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [respondingId, setRespondingId] = useState(null)
  const [dismissedIds, setDismissedIds] = useState([])

  const { data } = useGetQuery({
    key: KEYS.studentMyInvitations,
    url: URLS.studentMyInvitations,
    staleTime: 30_000,
    refetchOnMount: true
  })

  const invitations = get(data, 'data', []).filter((item) => !dismissedIds.includes(item.id))
  const invitation = invitations[0]

  if (!invitation) return null

  const respond = async (action) => {
    if (respondingId) return
    setRespondingId(invitation.id)
    try {
      await request.post(`${URLS.studentMyInvitations}${invitation.id}/respond/`, { action })
      toast.success(action === 'accept' ? t('studentInvitations.accepted') : t('studentInvitations.rejected'))
      setDismissedIds((previous) => [...previous, invitation.id])
      queryClient.invalidateQueries(KEYS.studentMyInvitations)
    } catch (error) {
      toast.error(get(error, 'response.data.error', t('studentInvitations.errorGeneric')))
    } finally {
      setRespondingId(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FF] text-[#5D87FF]">
            <Users2 size={24} />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#191C1D]">{t('studentInvitations.title')}</h3>
            <p className="mt-0.5 text-sm text-[#8A8A8E]">{t('studentInvitations.subtitle')}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#F6F8FB] p-3.5 text-sm">
          <p className="flex items-center justify-between gap-3">
            <span className="text-[#8A8A8E]">{t('studentInvitations.fromTutor')}</span>
            <span className="truncate font-semibold text-[#191C1D]">{invitation.tutor?.full_name || '-'}</span>
          </p>
          <p className="mt-1.5 flex items-center justify-between gap-3">
            <span className="text-[#8A8A8E]">{t('studentInvitations.group')}</span>
            <span className="truncate font-semibold text-[#191C1D]">{invitation.group?.name || '-'}</span>
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => respond('reject')}
            disabled={respondingId === invitation.id}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FEF2F2] px-4 py-2.5 text-sm font-semibold text-[#DC2626] transition hover:bg-[#FEE2E2] disabled:opacity-60"
          >
            <X size={16} />
            {t('studentInvitations.reject')}
          </button>
          <button
            type="button"
            onClick={() => respond('accept')}
            disabled={respondingId === invitation.id}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-60"
          >
            {respondingId === invitation.id ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Check size={16} />
            )}
            {t('studentInvitations.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentInvitationsModal
