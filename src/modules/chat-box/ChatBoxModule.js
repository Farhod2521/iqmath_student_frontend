import React, { useState } from 'react'
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

  // Tugmani ko'rsatish sharti
  const showNewChatButton = isStudent && chats.length === 0

  return (
    <div className="flex h-full gap-1 bg-white rounded-2xl overflow-hidden overflow-x-hidden">
      {/* CHAT LIST SIDEBAR */}
      <div
        className={`${
          showChatList ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 absolute min-[640px]:relative  w-[240px]
        min-[640px]:w-[280px]
        min-[768px]:w-[320px]
        min-[1024px]:w-[360px]
        min-[1280px]:w-[380px]
        min-[1536px]:w-[400px] 
        max-[640px]:max-w-none
        max-[640px]:w-[95%]  
        h-[87vh]
        border-r border-gray-200 flex flex-col bg-white transition-transform duration-300 z-10`}
      >
        <div className="px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 pb-2 xs:pb-2 sm:pb-3 md:pb-3 lg:pb-4 border-b border-gray-100">
          <h2 className="mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {t('messages')}
          </h2>
        </div>

        {/* SIZNING ChatsList KOMPONENTINGIZ */}
        <ChatsList
          chats={chats}
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
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {activeChat ? (
          <>
            <ChatHeader
              chat={activeChat}
              onBack={() => setShowChatList(true)}
              onTransfer={isAdmin ? handleTransfer : undefined}
              showTransfer={isAdmin}
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
      </div>

      {isRatingModalOpen && (
        <RatingModal
          closeMutation={{ mutate: closeChat, isPending: false }}
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
