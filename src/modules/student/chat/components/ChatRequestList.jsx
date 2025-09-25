import React from 'react'
import ChatRequestCard from './ChatRequestCard'
import ChatEmptyState from './ChatEmptyState'

const ChatRequestList = ({ 
  requests, 
  getLocalizedField, 
  getStatusColor, 
  getStatusText 
}) => {
  if (requests.length === 0) {
    return <ChatEmptyState />
  }

  return (
    <div className="space-y-4">
      {requests.map((request, index) => (
        <ChatRequestCard
          key={index}
          request={request}
          getLocalizedField={getLocalizedField}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      ))}
    </div>
  )
}

export default ChatRequestList
