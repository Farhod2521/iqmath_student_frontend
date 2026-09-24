import { useTranslation } from 'react-i18next'
import { Clock, X } from 'lucide-react'
import { avatarColor, initialsOf } from '../utils'

const PendingInvitationsList = ({ invitations, isLoading, onCancel, cancellingId }) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2].map((index) => (
          <div key={index} className="h-14 w-full animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!invitations || invitations.length === 0) {
    return <p className="py-3 text-center text-sm text-[#8A8A8E]">{t('tutorGroups.noPendingInvitations')}</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {invitations.map((invitation, index) => (
        <div key={invitation.id} className="flex items-center gap-3 rounded-xl border border-[#F0F0F0] bg-white p-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: avatarColor(index) }}
          >
            {initialsOf(invitation.student?.full_name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#191C1D]">{invitation.student?.full_name || '-'}</p>
            <p className="truncate text-xs text-[#8A8A8E]">
              ID: {invitation.student?.identification || '-'}
              {invitation.student?.phone ? ` · ${invitation.student.phone}` : ''}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#FFF3DD] px-2 py-1 text-[11px] font-semibold text-[#B45309]">
            <Clock size={11} />
            {t('tutorGroups.waitingResponse')}
          </span>
          <button
            type="button"
            onClick={() => onCancel(invitation.id)}
            disabled={cancellingId === invitation.id}
            title={t('tutorGroups.cancelInvite')}
            className="shrink-0 rounded-lg p-2 text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default PendingInvitationsList
