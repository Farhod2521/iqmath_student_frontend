import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useChatData } from '@/modules/student/chat/hooks/useChatData'
import { useStatusUtils } from '@/modules/student/chat/utils/statusUtils'
import ChatFilters from '@/modules/student/chat/components/ChatFilters'
import ChatRequestList from '@/modules/student/chat/components/ChatRequestList'
import ChatPagination from '@/modules/student/chat/components/ChatPagination'

const ChatPage = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  // Custom hooks
  const {
    filteredRequests,
    totalPages,
    totalItems,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    getLocalizedField
  } = useChatData(session)

  const { getStatusColor, getStatusText } = useStatusUtils()

  if (isLoading) {
    return (
      <LayoutAdmin title={t('chat', 'Chat')}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('chat', 'Chat')}>
      <div className="space-y-6">
        {/* Filters */}
        {/* <ChatFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        /> */}

        {/* Requests List */}
        <ChatRequestList
          requests={filteredRequests}
          getLocalizedField={getLocalizedField}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />

        {/* Pagination */}
        <ChatPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </LayoutAdmin>
  )
}

export default ChatPage
