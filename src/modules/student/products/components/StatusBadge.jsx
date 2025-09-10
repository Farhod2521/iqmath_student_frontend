import React from 'react'
import { FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa'

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          icon: <FaCheckCircle size={16} />,
          text: 'Tasdiqlangan',
          className: 'text-green-600'
        }
      case 'pending':
        return {
          icon: <FaClock size={16} />,
          text: 'Kutilmoqda',
          className: 'text-yellow-600'
        }
      case 'rejected':
        return {
          icon: <FaTimes size={16} />,
          text: 'Rad etilgan',
          className: 'text-red-600'
        }
      default:
        return {
          icon: <FaClock size={16} />,
          text: 'Noma\'lum',
          className: 'text-gray-600'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <div className="flex items-center gap-2">
      {config.icon}
      <span className={`text-sm font-medium ${config.className}`}>
        {config.text}
      </span>
    </div>
  )
}

export default StatusBadge
