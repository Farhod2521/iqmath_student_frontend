import React, { useMemo, useState } from 'react'
import { MessagesSquare, Search } from 'lucide-react'
import ChatsList from './components/ChatsList'
import RatingModal from './components/RatingModal'
import TransferModal from './components/TransferModal'
import CLoseModal from './components/CLoseModal'
import EmptyMessage from './components/EmptyMessage'

// Yangi komponentlar
import { ChatHeader } from './components/ChatHeader'
import { MessagesList } from './components/MessagesList'
import { MessageInput } from './components/MessageInput'
import { NewChatButton } from './components/NewChatButton'
import { StartChatPrompt } from './components/StartChatPrompt'
import { useChat } from './hooks/useChat'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store'

const ChatBoxModule = () => {
  const { t } = useTranslation()

  const {
    activeChat,
    chats,
    chatsLoading,
    messages,
    messagesLoading,
    isStudent,
    isAdmin,
    isNewChatMode,
    replyingTo,
    teachers,
    teachersLoading,
    isTransferModalOpen,
    transferTeacherId,
    transferReason,
    setTransferTeacherId,
    setTransferReason,
    selectChat,
    startNewChat,
    handleSend,
    handleReply,
    cancelReply,
    isSending,
    closeChat,
    transferChat,
    requestClose,
    openTransferModal,
    closeTransferModal
  } = useChat()

  const [showChatList, setShowChatList] = useState(true)
  const { user, role: userRole } = useUserStore()

  // Modal state
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [isClosedModalOpen, setIsClosedModalOpen] = useState(false)

  // Form state
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [closedComment, setClosedComment] = useState('')

  // Modal handler'lar
  const handleClose = () => {
    if (isStudent) {
      setIsRatingModalOpen(true)
    } else {
      setIsClosedModalOpen(true)
    }
  }

  const handleTransfer = () => {
    openTransferModal()
  }

  // Qidiruv va filtr (Barchasi / O'qituvchilar yoki O'quvchilar / Guruhlar)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')
  const peopleRole = isStudent ? 'teacher' : 'student'
  const tabs = [
    { key: 'all', label: t('chatUi.tabAll') },
    { key: 'people', label: isStudent ? t('chatUi.tabTeachers') : t('chatUi.tabStudents') },
    { key: 'group', label: t('chatUi.tabGroups') }
  ]

  const visibleChats = useMemo(() => {
    const query = search.trim().toLowerCase()
    return (chats || []).filter((chat) => {
      if (tab === 'group' && chat.chat_type !== 'group') return false
      if (tab === 'people' && (chat.chat_type === 'group' || chat.other_user_role !== peopleRole)) return false
      if (!query) return true
      return `${chat.other_user_name || ''} ${chat.last_message || ''}`.toLowerCase().includes(query)
    })
  }, [chats, search, tab, peopleRole])

  // Tugmani ko'rsatish sharti
  const showNewChatButton = isStudent && chats.length === 0

  return (
    <div className="relative flex h-[calc(100vh-112px)] min-h-[520px] gap-4">
      {/* CHAT RO'YXATI */}
      <aside
        className={`${
          showChatList ? 'flex' : 'hidden'
        } w-full shrink-0 flex-col overflow-hidden rounded-3xl border border-[#EEF1F6] bg-white shadow-[0_8px_30px_-20px_rgba(15,23,42,0.3)] dark:border-[#1F2A3C] dark:bg-[#111A2B] md:flex md:w-[330px] lg:w-[370px] xl:w-[400px]`}
      >
        <div className="px-5 pb-3 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F6BFF] text-white shadow-[0_8px_18px_-8px_rgba(47,107,255,0.9)]">
              <MessagesSquare size={22} />
            </span>
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white">{t('chatUi.title')}</h2>
          </div>

          <label className="flex h-12 items-center gap-3 rounded-2xl bg-[#F1F5FB] px-4 text-[#6B7385] focus-within:ring-2 focus-within:ring-[#2F6BFF]/40 dark:bg-[#1A2436]">
            <Search size={19} className="shrink-0" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('chatUi.searchPlaceholder')}
              className="h-full w-full bg-transparent text-sm text-[#191C1D] outline-none placeholder:text-[#8A93A6] dark:text-white"
            />
          </label>

          <div className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`h-10 shrink-0 rounded-xl px-5 text-sm font-semibold transition ${
                  tab === item.key
                    ? 'bg-[#2F6BFF] text-white shadow-[0_8px_18px_-10px_rgba(47,107,255,0.9)]'
                    : 'bg-[#F1F5FB] text-[#5B6478] hover:text-[#2F6BFF] dark:bg-[#1A2436] dark:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ChatsList
          chats={visibleChats}
          chatsLoading={chatsLoading}
          setActiveChat={(chat) => {
            selectChat(chat)
            setShowChatList(false)
          }}
          setShowChatList={setShowChatList}
          cancelReply={cancelReply}
          activeChat={activeChat}
        />

        {/* Yangi chat tugmasi - faqat student va chatlist bo'sh bo'lganda */}
        {showNewChatButton && (
          <NewChatButton
            onClick={() => {
              startNewChat()
              setShowChatList(false)
            }}
          />
        )}
      </aside>

      {/* SUHBAT OYNASI */}
      <section
        className={`${
          showChatList ? 'hidden' : 'flex'
        } relative min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-[#E3EBF8] bg-[#EEF4FF] bg-[url('/images/chat-back.webp')] bg-cover bg-center shadow-[0_8px_30px_-20px_rgba(15,23,42,0.3)] dark:border-[#1F2A3C] dark:bg-[#0F172A] dark:bg-none md:flex`}
      >
        {activeChat ? (
          <>
            <ChatHeader
              chat={activeChat}
              isStudent={isStudent}
              onBack={() => setShowChatList(true)}
              onTransfer={isAdmin ? handleTransfer : undefined}
              showTransfer={isAdmin}
              onCloseChat={userRole === 'teacher' ? handleClose : undefined}
            />

            {isNewChatMode ? (
              <StartChatPrompt />
            ) : (
              <MessagesList
                messages={messages?.messages || []}
                otherUserId={activeChat.other_user_id}
                otherUserName={activeChat.other_user_name}
                onReply={handleReply}
                isLoading={messagesLoading}
                onRateClick={() => setIsRatingModalOpen(true)}
                teacher_close_request={messages.teacher_close_request}
                student_close_confir={messages.student_close_confirm}
                role={userRole}
              />
            )}

            <MessageInput
              onSend={handleSend}
              onClose={handleClose}
              isSending={isSending}
              showCloseButton={!!activeChat}
              replyingTo={replyingTo}
              onCancelReply={cancelReply}
              role={userRole}
            />
          </>
        ) : (
          <EmptyMessage />
        )}
      </section>

      {isRatingModalOpen && (
        <RatingModal
          // closeMutation={{ mutate: closeChat, isPending: false }}
          closeMutation={{
            mutate: (ratingData) => {
              closeChat(ratingData, {
                onSuccess: () => {
                  setIsRatingModalOpen(false)
                  setRating(0)
                  setComment('')
                }
              })
            },
            isPending: false
          }}
          rating={rating}
          setRating={setRating}
          setComment={setComment}
          comment={comment}
          setIsRatingModalOpen={setIsRatingModalOpen}
        />
      )}

      {isClosedModalOpen && (
        <CLoseModal
          closeMutation={{ mutate: requestClose, isPending: false }}
          setIsClosedModalOpen={setIsClosedModalOpen}
          setComment={setClosedComment}
          comment={closedComment}
        />
      )}

      {isTransferModalOpen && (
        <TransferModal
          transferTeacherId={transferTeacherId}
          setTransferTeacherId={setTransferTeacherId}
          transferReason={transferReason}
          setTransferReason={setTransferReason}
          transferMutation={{ mutate: transferChat, isPending: false }}
          handleCancel={closeTransferModal}
          activeChat={activeChat}
          teachers={teachers}
          teachersLoading={teachersLoading}
        />
      )}
    </div>
  )
}

export default ChatBoxModule
