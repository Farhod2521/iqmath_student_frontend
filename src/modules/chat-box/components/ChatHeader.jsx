import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeftRight, ChevronLeft, Flag, MoreVertical } from 'lucide-react'
import { ChatAvatar } from './ChatsList'

const ROLE_LABELS = {
  teacher: 'chatUi.roleTeacher',
  student: 'chatUi.roleStudent',
  admin: 'chatUi.roleAdmin',
  superadmin: 'chatUi.roleAdmin'
}

export const ChatHeader = ({ chat, isStudent, onBack, onTransfer, showTransfer, onCloseChat }) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined
    const close = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpen])

  const roleKey = ROLE_LABELS[chat?.other_user_role] || (isStudent ? 'chatUi.roleTeacher' : null)
  const status = chat.is_temp
    ? t('chatBox.newConversation')
    : chat.is_closed
      ? t('chatUi.closed')
      : [chat.chat_type === 'group' ? t('chatUi.group') : null, roleKey ? t(roleKey) : null].filter(Boolean).join(' • ')

  const actions = [
    showTransfer && onTransfer
      ? { key: 'transfer', icon: ArrowLeftRight, label: t('chatUi.transfer'), onClick: onTransfer }
      : null,
    onCloseChat && !chat.is_temp
      ? { key: 'close', icon: Flag, label: t('chatBox.closeConversation'), onClick: onCloseChat, danger: true }
      : null
  ].filter(Boolean)

  return (
    <div className="relative z-10 flex items-center gap-3 border-b border-[#E9EEF6] bg-white/95 px-4 py-4 backdrop-blur dark:border-[#1F2A3C] dark:bg-[#111A2B]/95 md:px-6">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#6B7385] transition hover:bg-[#F1F5FB] md:hidden"
      >
        <ChevronLeft size={22} />
      </button>

      <ChatAvatar chat={chat} size="h-12 w-12 text-lg md:h-14 md:w-14 md:text-xl" />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-bold text-[#0F172A] dark:text-white md:text-lg">
          {chat.other_user_name}
        </h3>
        {status ? (
          <p className="flex items-center gap-1.5 text-sm text-[#6B7385]">
            <span className={`h-2 w-2 rounded-full ${chat.is_closed ? 'bg-[#A0A8BA]' : 'bg-[#22C55E]'}`} />
            <span className="truncate">{status}</span>
          </p>
        ) : null}
      </div>

      {actions.length ? (
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2F6BFF] shadow-[0_6px_18px_-10px_rgba(15,23,42,0.4)] transition hover:bg-[#F1F5FB] dark:bg-[#1A2436]"
          >
            <MoreVertical size={20} />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-[#EEF1F6] bg-white py-1.5 shadow-xl dark:border-[#26324A] dark:bg-[#111A2B]">
              {actions.map(({ key, icon: Icon, label, onClick, danger }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onClick()
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition hover:bg-[#F6F8FC] dark:hover:bg-[#162033] ${
                    danger ? 'text-[#DC2626]' : 'text-[#191C1D] dark:text-white'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
