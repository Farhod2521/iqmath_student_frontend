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
    <div className="h-[85vh] flex gap-1 bg-white rounded-2xl overflow-hidden">
      {/* CHAT LIST SIDEBAR */}
      <div
        className={`${
          showChatList ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 absolute md:relative w-full md:w-[380px] h-full border-r border-gray-200 flex flex-col bg-white transition-transform duration-300 z-10`}
      >
        <div className="px-6 pt-6 pb-3 border-b border-gray-100">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{t('messages')}</h2>
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
              />
            )}

            <MessageInput
              onSend={handleSend}
              onClose={handleClose}
              isSending={isSending}
              showCloseButton={!!activeChat}
              replyingTo={replyingTo}
              onCancelReply={cancelReply}
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
