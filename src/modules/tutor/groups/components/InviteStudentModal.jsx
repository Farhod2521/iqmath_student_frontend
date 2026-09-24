import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Search, Send, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { get } from 'lodash'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import Modal from './Modal'
import { avatarColor, initialsOf } from '../utils'

const InviteStudentModal = ({ isOpen, onClose, groupId, groupName }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [tab, setTab] = useState('phone')
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [result, setResult] = useState(null)
  const [isInviting, setIsInviting] = useState(false)

  const reset = () => {
    setTab('phone')
    setQuery('')
    setHasSearched(false)
    setResult(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleTabChange = (nextTab) => {
    setTab(nextTab)
    setQuery('')
    setHasSearched(false)
    setResult(null)
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed || isSearching) return

    setIsSearching(true)
    setHasSearched(true)
    try {
      const { data } = await request.get(URLS.tutorStudentSearch, {
        params: { query: trimmed, type: tab, group_id: groupId }
      })
      setResult(data)
    } catch (error) {
      toast.error(get(error, 'response.data.detail', t('tutorGroups.errorGeneric')))
      setResult(null)
    } finally {
      setIsSearching(false)
    }
  }

  const handleInvite = async () => {
    if (!result?.student?.id || isInviting) return

    setIsInviting(true)
    try {
      await request.post(`${URLS.tutorGroups}${groupId}/invitations/`, {
        student_id: result.student.id
      })
      toast.success(t('tutorGroups.inviteSent'))
      queryClient.invalidateQueries(KEYS.tutorGroupInvitations)
      handleClose()
    } catch (error) {
      toast.error(get(error, 'response.data.error', t('tutorGroups.errorGeneric')))
    } finally {
      setIsInviting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('tutorGroups.inviteStudent')}
      subtitle={groupName}
      icon={<UserPlus size={18} />}
      maxWidth="max-w-lg"
    >
      <div className="flex rounded-xl bg-[#F6F8FB] p-1">
        <button
          type="button"
          onClick={() => handleTabChange('phone')}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
            tab === 'phone' ? 'bg-white text-[#5D87FF] shadow-sm' : 'text-[#8A8A8E]'
          }`}
        >
          {t('tutorGroups.searchByPhone')}
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('identification')}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
            tab === 'identification' ? 'bg-white text-[#5D87FF] shadow-sm' : 'text-[#8A8A8E]'
          }`}
        >
          {t('tutorGroups.searchById')}
        </button>
      </div>

      <p className="mt-3 text-xs text-[#8A8A8E]">{t('tutorGroups.inviteStudentSubtitle')}</p>

      <form onSubmit={handleSearch} className="mt-3 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#E9E9E9] bg-white px-3.5 py-2.5">
          {tab === 'phone' ? <span className="shrink-0 text-sm font-medium text-[#8A8A8E]">+998</span> : null}
          <input
            value={query}
            onChange={(event) => {
              const raw = event.target.value
              setQuery(tab === 'phone' ? raw.replace(/\D/g, '') : raw)
            }}
            placeholder={
              tab === 'phone' ? t('tutorGroups.searchPlaceholderPhone') : t('tutorGroups.searchPlaceholderId')
            }
            inputMode={tab === 'phone' ? 'numeric' : 'text'}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#191C1D] outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-[#B9C7F5]"
        >
          {isSearching ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Search size={16} />
          )}
        </button>
      </form>

      {hasSearched && !isSearching ? (
        result?.found ? (
          <div className="mt-4 rounded-xl border border-[#F0F0F0] p-3.5">
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: avatarColor(0) }}
              >
                {initialsOf(result.student.full_name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#191C1D]">{result.student.full_name || '-'}</p>
                <p className="truncate text-xs text-[#8A8A8E]">
                  ID: {result.student.identification || '-'}
                  {result.student.phone ? ` · ${result.student.phone}` : ''}
                  {result.student.class_uz ? ` · ${result.student.class_uz}` : ''}
                </p>
              </div>
            </div>

            {result.warning ? (
              <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-[#FFF8EC] px-3 py-2 text-xs leading-relaxed text-[#B45309]">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                {result.warning}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleInvite}
              disabled={!result.can_invite || isInviting}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-[#B9C7F5]"
            >
              {isInviting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send size={15} />
              )}
              {t('tutorGroups.sendInvite')}
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center py-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6F8FB] text-[#8A8A8E]">
              <Search size={20} />
            </span>
            <p className="mt-2 text-sm text-[#8A8A8E]">{t('tutorGroups.studentNotFound')}</p>
          </div>
        )
      ) : null}
    </Modal>
  )
}

export default InviteStudentModal
