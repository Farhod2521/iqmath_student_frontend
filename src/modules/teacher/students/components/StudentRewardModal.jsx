import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { usePostQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

const StudentRewardModal = ({ isOpen, onClose, student, defaultRewardType = 'score', onSuccess }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    reward_type: defaultRewardType,
    amount: '',
    reason: ''
  })

  const { mutate: submitReward, isLoading } = usePostQuery({
    listKeyId: [KEYS.teacherRewardList, KEYS.teacherReward, KEYS.studentStatistics]
  })

  const rewardTypes = [ 
    { 
      value: 'score', 
      label: t('score'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      value: 'coin', 
      label: t('coins'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    { 
      value: 'subscription_day', 
      label: t('subscriptionDays'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.reason) {
      toast.error(t('fillAllFields'))
      return
    }

    const payload = {
      student_id: student.id,
      reward_type: formData.reward_type,
      amount: parseInt(formData.amount),
      reason: formData.reason
    }

    submitReward({
      url: URLS.teacherReward,
      attributes: payload
    }, {
      onSuccess: () => {
        onSuccess?.()
        handleClose()
      }
    })
  }

  const handleClose = () => {
    setFormData({
      reward_type: defaultRewardType,
      amount: '',
      reason: ''
    })
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        reward_type: defaultRewardType
      }))
    }
  }, [isOpen, defaultRewardType])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {t('giveReward')} - {student?.full_name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reward Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('rewardType')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {rewardTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, reward_type: type.value }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.reward_type === type.value
                      ? 'border-[#5D87FF] bg-[#ECF2FF] text-[#5D87FF]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mb-1 flex justify-center">{type.icon}</div>
                  <div className="text-xs font-medium text-center">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('amount')}
            </label>
            <input
              type="number"
              min="1"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D87FF] focus:border-[#5D87FF]"
              placeholder={formData.reward_type === 'subscription_day' ? '7' : '10'}
            />
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('reason')}
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D87FF] focus:border-[#5D87FF]"
              rows="3"
              placeholder={t('enterRewardReason')}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#5D87FF] text-white rounded-lg hover:bg-[#4570EA] disabled:bg-gray-400 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t('adding')}...
                </>
              ) : (
                t('giveReward')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentRewardModal 