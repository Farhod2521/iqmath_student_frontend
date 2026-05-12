import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { HiBell } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'
import { useGetQuery } from '@/hooks'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'

const NavbarNotification = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const dropdownRef = useRef(null)
  const [open, setOpen] = useState(false)

  // GET notifications
  const {
    data: mentorRequests,
    isLoading: isGetting,
    refetch
  } = useGetQuery({
    key: KEYS.mentorRequests,
    url: '/api/v1/func_teacher/my-notifications/',
    // headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  // POST hook (will toast on success by default). Invalidate KEYS.mentorRequests after success.
  const { mutate: postMutate, isLoading: isPosting } = usePostQuery({
    hideSuccessToast: false,
    listKeyId: KEYS.mentorRequests,
    hideErrorToast: false
  })

  const unread_count = useMemo(() => {
    return mentorRequests?.unread_count ?? mentorRequests?.data?.unread_count ?? 0
  }, [mentorRequests])

  const latest = useMemo(() => {
    return mentorRequests?.latest_requests ?? mentorRequests?.data?.latest_requests ?? []
  }, [mentorRequests])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Mark as seen using usePostQuery
  const markAsSeen = (ids = []) => {
    if (!session?.accessToken || !Array.isArray(ids) || ids.length === 0) return
    postMutate({
      url: '/api/v1/func_teacher/my-notifications/',
      attributes: { ids },
      config: {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      }
    })
    // No need to call refetch here because hook invalidates KEYS.mentorRequests;
    // but if your request backend doesn't return updated data quickly, you can optionally refetch:
    // setTimeout(() => refetch?.(), 500)
  }

  // Toggle dropdown; when opening, auto-mark visible unseen items as seen
  const handleOpenToggle = () => {
    const nextOpen = !open
    setOpen(nextOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpenToggle}
        className="relative p-2 text-[#5d87ff] hover:text-[#4a6fd9] transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5d87ff] focus:ring-opacity-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        aria-haspopup="true"
        aria-expanded={open}
        disabled={isGetting}
        title={t ? t('mentorRequests', 'Mentor murojaatlari') : 'Mentor murojaatlari'}
      >
        <div className={unread_count > 0 ? 'animate-ring' : ''}>
          <HiBell className="w-8 h-8 transition-transform duration-300" />
        </div>

        {unread_count > 0 && (
          <>
            <span
              className="absolute -top-1 -right-1 bg-[#5d87ff] rounded-full p-1 animate-ping opacity-75"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="absolute -top-1 -right-1 bg-[#5d87ff] text-white text-xs rounded-full min-w-[24px] h-6 px-1.5 shadow-lg flex items-center justify-center font-medium  animate-badge-appear border-2 border-white">
              {unread_count > 99 ? '99+' : unread_count}
            </span>
          </>
        )}

        {(isGetting || isPosting) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg bg-opacity-60">
            <div className="w-4 h-4 border-2 border-[#5d87ff] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-[420px] overflow-hidden rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Bildirishnomalar</span>
              <span className="text-xs text-gray-500">{unread_count} yangi</span>
            </div>
          </div>

          <div className="max-h-[340px] overflow-auto">
            {(!latest || latest.length === 0) && <div className="p-4 text-sm text-gray-500">{t('noMessage')}</div>}

            {latest?.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left p-3 border-b hover:bg-gray-50 flex items-start gap-3 ${
                  !item.is_seen ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">{item.student}</div>
                    {/* <div className="text-xs px-2 py-0.5 rounded-full border">{item.status}</div> */}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{item.subject}</div>
                  <div className="mt-1 text-xs text-gray-400">{item.created_at}</div>
                </div>
                {!item.is_seen && <div className="w-2 h-2 rounded-full bg-[#5d87ff] mt-2" />}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between p-2 border-t">
            <div></div>

            <button
              onClick={() => {
                const allIds = (latest || []).map((r) => r.id)
                markAsSeen(allIds)
              }}
              disabled={isPosting || !latest || latest.length === 0}
              className="text-sm text-gray-600 disabled:opacity-50"
            >
              Ko‘rilganlarni belgilash
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavbarNotification
