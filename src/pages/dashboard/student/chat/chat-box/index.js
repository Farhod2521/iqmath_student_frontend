import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'

import ChatBoxModule from '@/modules/chat-box/ChatBoxModule'

const ChatBox = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('messages')}>
      <ChatBoxModule />
    </LayoutAdmin>
  )
}

export default ChatBox
